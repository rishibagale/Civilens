"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";
import { continentOutlines } from "@/data/continentOutlines";
import { historicalCities } from "@/data/historicalCities";
import { historicalEvents } from "@/data/historicalEvents";
import {
  latLonToWorld,
  createGlobeCircle,
  pickSurface,
  haversineKm,
  EARTH_RADIUS_KM,
} from "@/lib/geoMath";
import {
  createControlInput,
  createControlState,
  attachOrbitControls,
  updateCameraAndGlobe,
  startFlightTo,
  MIN_CAMERA_RANGE,
  MAX_CAMERA_RANGE,
  DEFAULT_CAMERA_RANGE,
  type ControlInput,
  type ControlState,
} from "@/lib/cameraDirector";
import CoordinateTelemetry, {
  type GlobeVisualMode,
} from "./CoordinateTelemetry";

interface HoloGlobeProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  onSelectEvent?: (id: string | null) => void;
  selectedEventId?: string | null;
}

export default function HoloGlobe({
  activeCountryId,
  activeEra,
  activeLayers,
  onSelectCountry,
  onSelectCivilization,
  onSelectEvent,
  selectedEventId = null,
}: HoloGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [visualMode, setVisualMode] = useState<GlobeVisualMode>("hybrid");
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [cameraAltitudeKm, setCameraAltitudeKm] = useState<number>(20000);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const cyberGridGroupRef = useRef<THREE.Group | null>(null);
  const reticleGroupRef = useRef<THREE.Group | null>(null);

  const controlInputRef = useRef<ControlInput>(createControlInput());
  const controlStateRef = useRef<ControlState>(createControlState());

  const propsRef = useRef({
    activeCountryId,
    activeEra,
    activeLayers,
    onSelectCountry,
    onSelectCivilization,
    onSelectEvent,
    selectedEventId,
  });

  useEffect(() => {
    propsRef.current = {
      activeCountryId,
      activeEra,
      activeLayers,
      onSelectCountry,
      onSelectCivilization,
      onSelectEvent,
      selectedEventId,
    };
  }, [
    activeCountryId,
    activeEra,
    activeLayers,
    onSelectCountry,
    onSelectCivilization,
    onSelectEvent,
    selectedEventId,
  ]);

  const globeRadius = 60;

  // Selected Target Info for Telemetry
  const selectedTarget = React.useMemo(() => {
    if (selectedEventId) {
      const allEvents = Object.values(historicalEvents).flat();
      const ev = allEvents.find((e) => e.id === selectedEventId);
      if (ev && ev.coordinates) {
        const dist = cursorCoords
          ? haversineKm(cursorCoords.lat, cursorCoords.lon, ev.coordinates[0], ev.coordinates[1])
          : undefined;
        return {
          name: ev.title,
          lat: ev.coordinates[0],
          lon: ev.coordinates[1],
          distanceKm: dist,
        };
      }
    }
    if (activeCountryId && countriesData[activeCountryId]) {
      const c = countriesData[activeCountryId];
      const dist = cursorCoords
        ? haversineKm(cursorCoords.lat, cursorCoords.lon, c.coordinates[0], c.coordinates[1])
        : undefined;
      return {
        name: c.name,
        lat: c.coordinates[0],
        lon: c.coordinates[1],
        distanceKm: dist,
      };
    }
    return null;
  }, [selectedEventId, activeCountryId, cursorCoords]);

  // Smooth Camera Fly-To on Event Selection
  useEffect(() => {
    if (!selectedEventId || !cameraRef.current || !globeGroupRef.current) return;
    const allEvents = Object.values(historicalEvents).flat();
    const ev = allEvents.find((e) => e.id === selectedEventId);
    if (!ev || !ev.coordinates) return;

    startFlightTo(
      globeGroupRef.current,
      cameraRef.current,
      ev.coordinates[0],
      ev.coordinates[1],
      controlStateRef.current,
      1.35,
      140,
    );
  }, [selectedEventId]);

  // Smooth Camera Fly-To on Country Selection
  useEffect(() => {
    if (!activeCountryId || !cameraRef.current || !globeGroupRef.current) return;
    const c = countriesData[activeCountryId];
    if (!c || !c.coordinates) return;

    startFlightTo(
      globeGroupRef.current,
      cameraRef.current,
      c.coordinates[0],
      c.coordinates[1],
      controlStateRef.current,
      1.35,
      160,
    );
  }, [activeCountryId]);

  // Visual Mode Switching updates shader uniforms & visibility
  useEffect(() => {
    if (earthMatRef.current) {
      const mat = earthMatRef.current;
      if (visualMode === "cyber") {
        mat.uniforms.uOpacity.value = 0.0;
      } else if (visualMode === "satellite") {
        mat.uniforms.uOpacity.value = 1.0;
        mat.uniforms.uOceanDarkness.value = 0.0;
      } else {
        // hybrid
        mat.uniforms.uOpacity.value = 1.0;
        mat.uniforms.uOceanDarkness.value = 0.75;
      }
    }

    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.visible = visualMode !== "cyber";
    }

    if (cyberGridGroupRef.current) {
      cyberGridGroupRef.current.visible = visualMode === "cyber";
    }
  }, [visualMode]);

  // Main Three.js Setup
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = Math.max(container.clientWidth, 2);
    const height = Math.max(container.clientHeight, 2);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030408, 0.00035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
    camera.position.z = DEFAULT_CAMERA_RANGE;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030408, 1);
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Deep Space Stars
    const starCount = 2400;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 1100;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Ambient Space Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.22));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.3);
    sunLight.position.set(120, 45, 90);
    scene.add(sunLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Load Earth Textures
    const texLoader = new THREE.TextureLoader();
    const dayTex = texLoader.load("/textures/earth-day-2k.webp");
    const nightTex = texLoader.load("/textures/earth-night-2k.webp");
    const cloudsTex = texLoader.load("/textures/earth-clouds-2k.webp");
    const dataTex = texLoader.load("/textures/earth-data-1k.webp");

    dayTex.colorSpace = THREE.SRGBColorSpace;
    nightTex.colorSpace = THREE.SRGBColorSpace;
    dayTex.wrapS = THREE.RepeatWrapping;
    nightTex.wrapS = THREE.RepeatWrapping;
    cloudsTex.wrapS = THREE.RepeatWrapping;
    dataTex.wrapS = THREE.RepeatWrapping;

    // Earth Photoreal / Hybrid Surface Shader
    const earthGeo = new THREE.SphereGeometry(globeRadius - 0.2, 64, 64);
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uDay: { value: dayTex },
        uNight: { value: nightTex },
        uData: { value: dataTex },
        uSunDir: { value: new THREE.Vector3(1.2, 0.45, 0.9).normalize() },
        uOceanDarkness: { value: 0.75 },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uDay;
        uniform sampler2D uNight;
        uniform sampler2D uData;
        uniform vec3 uSunDir;
        uniform float uOceanDarkness;
        uniform float uOpacity;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          if (uOpacity < 0.01) discard;

          vec3 N = normalize(vNormal);
          vec3 L = normalize(uSunDir);
          vec3 V = normalize(cameraPosition - vWorldPos);

          float NdL = dot(N, L);
          float dayFactor = smoothstep(-0.2, 0.25, NdL);

          vec3 dayCol = texture2D(uDay, vUv).rgb;
          vec3 nightCol = texture2D(uNight, vUv).rgb;
          vec4 dataCol = texture2D(uData, vUv); // G = ocean mask, R = elevation

          // Specular Glint on Ocean
          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N, H)), 24.0) * dataCol.g * 0.38 * dayFactor;

          // In Hybrid mode: darken oceans to deep ink navy so glowing routes & borders shine
          if (uOceanDarkness > 0.01) {
            vec3 deepOcean = dayCol * 0.18 + vec3(0.015, 0.025, 0.055);
            dayCol = mix(dayCol, deepOcean, dataCol.g * uOceanDarkness);
          }

          // Warm sodium amber city lights on the night hemisphere
          vec3 nightLights = nightCol * (1.0 - dayFactor) * 1.85 * vec3(1.0, 0.88, 0.65);

          vec3 baseColor = dayCol * dayFactor + nightLights + vec3(spec);

          // Atmospheric limb glow
          float rim = 1.0 - max(0.0, dot(V, N));
          vec3 atmosphere = pow(rim, 3.2) * vec3(0.0, 0.94, 1.0) * 0.42 * max(0.25, dayFactor);

          gl_FragColor = vec4(baseColor + atmosphere, uOpacity);
        }
      `,
      transparent: true,
    });
    earthMatRef.current = earthMat;
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Floating Atmospheric Cloud Sphere
    const cloudsGeo = new THREE.SphereGeometry(globeRadius + 0.45, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMeshRef.current = cloudsMesh;
    globeGroup.add(cloudsMesh);

    // Cyber Wireframe Group (active in Cyber mode)
    const cyberGridGroup = new THREE.Group();
    cyberGridGroupRef.current = cyberGridGroup;
    cyberGridGroup.visible = false;

    const oceanGeo = new THREE.SphereGeometry(globeRadius - 0.5, 64, 64);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x050811,
      emissive: 0x020306,
      specular: 0x0b132b,
      shininess: 15,
      transparent: true,
      opacity: 0.85,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);

    const gridGeo = new THREE.SphereGeometry(globeRadius, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    cyberGridGroup.add(oceanMesh, gridMesh);
    globeGroup.add(cyberGridGroup);

    // Outer Atmospheric Halo Ring
    const atmosGeo = new THREE.RingGeometry(globeRadius + 0.1, globeRadius + 4.5, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.06,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    atmosMesh.lookAt(camera.position);
    scene.add(atmosMesh);

    // Neon Continent Outlines
    const continentsGroup = new THREE.Group();
    const continentMat = new THREE.LineBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.55,
    });
    continentOutlines.forEach((ring) => {
      const pts = ring.map(([lat, lng]) =>
        latLonToWorld(lat, lng, globeRadius + 0.2),
      );
      if (pts.length > 2) pts.push(pts[0].clone());
      continentsGroup.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), continentMat),
      );
    });
    globeGroup.add(continentsGroup);

    // Dynamic Markers, Arcs, and Reticle Groups
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    const labelsGroup = new THREE.Group();
    globeGroup.add(labelsGroup);
    const overlaysGroup = new THREE.Group();
    globeGroup.add(overlaysGroup);

    // Precision Targeting Reticle Group
    const reticleGroup = new THREE.Group();
    reticleGroupRef.current = reticleGroup;
    globeGroup.add(reticleGroup);

    const reticleRing = new THREE.Mesh(
      new THREE.RingGeometry(2.0, 2.5, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      }),
    );
    const reticleBrackets = new THREE.Mesh(
      new THREE.RingGeometry(3.0, 3.6, 4, 1, Math.PI / 4, Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: 0x39ff14,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      }),
    );
    reticleGroup.add(reticleRing, reticleBrackets);
    reticleGroup.visible = false;

    const markersDataMap = new Map<string, { id: string; name: string; isCountry: boolean }>();

    function clearGroup(group: THREE.Group) {
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }
    }

    // Rebuild Interactive Markers and Layers
    function rebuildMarkers() {
      clearGroup(markersGroup);
      clearGroup(arcsGroup);
      clearGroup(labelsGroup);
      clearGroup(overlaysGroup);
      markersDataMap.clear();

      const {
        activeEra: era,
        activeLayers: layers,
        activeCountryId: selectedId,
        selectedEventId: selectedEvId,
      } = propsRef.current;

      // 1. Countries
      Object.values(countriesData).forEach((country) => {
        const pos = latLonToWorld(country.coordinates[0], country.coordinates[1], globeRadius);
        const isSelected = country.id === selectedId;

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.5, 2.4, 32),
          new THREE.MeshBasicMaterial({
            color: isSelected ? 0x39ff14 : 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: isSelected ? 0.95 : 0.5,
          }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        markersGroup.add(ring);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 16, 16),
          new THREE.MeshBasicMaterial({ color: isSelected ? 0x39ff14 : 0x00f0ff }),
        );
        core.position.copy(pos);
        markersGroup.add(core);

        markersDataMap.set(core.uuid, { id: country.id, name: country.name, isCountry: true });
        markersDataMap.set(ring.uuid, { id: country.id, name: country.name, isCountry: true });

        // Country Sprite Label
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 256, 128);
        ctx.font = "bold 28px monospace";
        ctx.fillStyle = isSelected ? "#39ff14" : "#00f0ff";
        ctx.textAlign = "center";
        ctx.fillText(country.name, 128, 40);
        ctx.font = "20px monospace";
        ctx.fillStyle = "#9ca3af";
        ctx.fillText(country.capital, 128, 70);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: false, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(pos.clone().multiplyScalar(1.15));
        sprite.scale.set(12, 6, 1);
        labelsGroup.add(sprite);
      });

      // 2. Civilizations
      civilizationsData
        .filter((civ) => civ.era === era)
        .forEach((civ) => {
          const pos = latLonToWorld(civ.centerCoordinates[0], civ.centerCoordinates[1], globeRadius + 0.5);
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(2.0, 3.2, 8),
            new THREE.MeshBasicMaterial({
              color: 0xbd00ff,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.8,
            }),
          );
          ring.position.copy(pos);
          ring.lookAt(pos.clone().multiplyScalar(2));
          markersGroup.add(ring);

          const core = new THREE.Mesh(
            new THREE.ConeGeometry(0.8, 2.5, 4),
            new THREE.MeshBasicMaterial({ color: 0xbd00ff }),
          );
          core.position.copy(pos);
          core.quaternion.copy(ring.quaternion);
          core.rotateX(Math.PI / 2);
          markersGroup.add(core);

          markersDataMap.set(core.uuid, { id: civ.id, name: civ.name, isCountry: false });
          markersDataMap.set(ring.uuid, { id: civ.id, name: civ.name, isCountry: false });
        });

      // 3. Historical Cities
      historicalCities
        .filter((city) => city.eraInfo.some((info) => info.era === era))
        .forEach((city) => {
          const pos = latLonToWorld(city.coordinates[0], city.coordinates[1], globeRadius + 0.3);
          const diamond = new THREE.Mesh(
            new THREE.OctahedronGeometry(1.2, 0),
            new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9 }),
          );
          diamond.position.copy(pos);
          markersGroup.add(diamond);
          markersDataMap.set(diamond.uuid, { id: city.id, name: city.name, isCountry: false });
        });

      // 4. Historical Events
      (historicalEvents[era] || []).forEach((event) => {
        if (!event.coordinates) return;
        const [lat, lng] = event.coordinates;
        if (lat === 0 && lng === 0) return;
        const pos = latLonToWorld(lat, lng, globeRadius + 0.5);
        const isSelected = event.id === selectedEvId;
        const color = isSelected
          ? 0x39ff14
          : event.impact === "major"
          ? 0xff3b30
          : event.impact === "significant"
          ? 0xf59e0b
          : 0x00f0ff;

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.8, 2.8, 32),
          new THREE.MeshBasicMaterial({
            color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: isSelected ? 1.0 : 0.8,
          }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        markersGroup.add(ring);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(isSelected ? 1.4 : 1.0, 16, 16),
          new THREE.MeshBasicMaterial({ color }),
        );
        core.position.copy(pos);
        markersGroup.add(core);

        markersDataMap.set(core.uuid, { id: event.id, name: event.title, isCountry: false });
        markersDataMap.set(ring.uuid, { id: event.id, name: event.title, isCountry: false });
      });

      // 5. Targeting Reticle Placement
      let targetPos: THREE.Vector3 | null = null;
      if (selectedEvId) {
        const ev = Object.values(historicalEvents).flat().find((e) => e.id === selectedEvId);
        if (ev && ev.coordinates) {
          targetPos = latLonToWorld(ev.coordinates[0], ev.coordinates[1], globeRadius + 0.8);
        }
      } else if (selectedId && countriesData[selectedId]) {
        const c = countriesData[selectedId];
        targetPos = latLonToWorld(c.coordinates[0], c.coordinates[1], globeRadius + 0.8);
      }

      if (targetPos) {
        reticleGroup.position.copy(targetPos);
        reticleGroup.lookAt(targetPos.clone().multiplyScalar(2));
        reticleGroup.visible = true;
      } else {
        reticleGroup.visible = false;
      }

      // 6. Animated Trade Routes & Migration Flows
      if (layers.includes("trade_routes") || layers.includes("migration_flows")) {
        const animatedDots: Array<{
          mesh: THREE.Mesh;
          curve: THREE.QuadraticBezierCurve3;
          speed: number;
          progress: number;
        }> = [];

        civilizationsData
          .filter((civ) => civ.era === era)
          .forEach((civ) => {
            if (layers.includes("trade_routes")) {
              civ.tradeRoutes.forEach((route) => {
                for (let i = 0; i < route.path.length - 1; i++) {
                  createArc(
                    route.path[i],
                    route.path[i + 1],
                    0x00f0ff,
                    false,
                    globeRadius,
                    arcsGroup,
                    animatedDots,
                  );
                }
              });
            }
            if (layers.includes("migration_flows")) {
              civ.migrationFlows.forEach((flow) => {
                for (let i = 0; i < flow.path.length - 1; i++) {
                  createArc(
                    flow.path[i],
                    flow.path[i + 1],
                    0xbd00ff,
                    true,
                    globeRadius,
                    arcsGroup,
                    animatedDots,
                  );
                }
              });
            }
          });
        (globeGroup as any).userData.animatedDots = animatedDots;
      }

      // 7. Overlays (Climate, Biodiversity)
      if (layers.includes("climate")) renderClimateOverlay(globeRadius, overlaysGroup);
      if (layers.includes("biodiversity")) renderBiodiversityOverlay(globeRadius, overlaysGroup);
    }

    function createArc(
      p1: [number, number],
      p2: [number, number],
      colorCode: number,
      dashed: boolean,
      globeRadius: number,
      parentGroup: THREE.Group,
      animatedDots: any[],
    ) {
      const start = latLonToWorld(p1[0], p1[1], globeRadius);
      const end = latLonToWorld(p2[0], p2[1], globeRadius);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.18);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(30);
      const material = dashed
        ? new THREE.LineDashedMaterial({
            color: colorCode,
            dashSize: 2,
            gapSize: 1,
            transparent: true,
            opacity: 0.6,
          })
        : new THREE.LineBasicMaterial({ color: colorCode, transparent: true, opacity: 0.7 });

      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
      if (dashed) line.computeLineDistances();
      parentGroup.add(line);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 8, 8),
        new THREE.MeshBasicMaterial({ color: colorCode }),
      );
      parentGroup.add(dot);
      animatedDots.push({
        mesh: dot,
        curve,
        speed: 0.005 + Math.random() * 0.008,
        progress: Math.random(),
      });
    }

    function renderClimateOverlay(globeRadius: number, parentGroup: THREE.Group) {
      Object.values(countriesData).forEach((country) => {
        const type = country.climate.type;
        let color = 0x00f0ff;
        let radiusKm = 1000;
        if (type.includes("Desert") || type.includes("Arid")) {
          color = 0xeab308;
          radiusKm = 1200;
        } else if (type.includes("Temperate Maritime")) {
          color = 0x2dd4bf;
          radiusKm = 1000;
        } else if (type.includes("Subpolar") || type.includes("Tundra")) {
          color = 0x93c5fd;
          radiusKm = 1100;
        } else if (type.includes("Monsoon") || type.includes("Tropical wet")) {
          color = 0x10b981;
          radiusKm = 1300;
        } else if (type.includes("Tropical")) {
          color = 0x16a34a;
          radiusKm = 1400;
        }

        const pts = createGlobeCircle(country.coordinates[0], country.coordinates[1], radiusKm, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.MeshBasicMaterial({
          color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.15,
          depthWrite: false,
        });
        parentGroup.add(new THREE.Mesh(geo, mat));
      });
    }

    function renderBiodiversityOverlay(globeRadius: number, parentGroup: THREE.Group) {
      Object.values(countriesData).forEach((country) => {
        const rating = country.geography.biodiversityRating.toLowerCase();
        let color = 0x22c55e;
        let radiusKm = 1200;
        if (rating.includes("hyper") || rating.includes("mega")) {
          color = 0x22c55e;
          radiusKm = 1500;
        } else if (rating.includes("moderate")) {
          color = 0xa3e635;
          radiusKm = 1100;
        } else if (rating.includes("low")) {
          color = 0xcbd5e1;
          radiusKm = 800;
        }

        const pts = createGlobeCircle(country.coordinates[0], country.coordinates[1], radiusKm, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.MeshBasicMaterial({
          color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.18,
          depthWrite: false,
        });
        parentGroup.add(new THREE.Mesh(geo, mat));
      });
    }

    // Attach Physics Orbit Controls
    const detachControls = attachOrbitControls(container, controlInputRef.current, () => {
      controlStateRef.current.isFlying = false;
    });

    // Raycaster for Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Surface Coordinates Raycast
      const hit = pickSurface(ndcX, ndcY, camera, globeGroup, globeRadius);
      if (hit) {
        setCursorCoords({ lat: hit.lat, lon: hit.lon });
      }

      // Marker Tooltip Hover
      mouse.set(ndcX, ndcY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) setHoveredName(item.name);
        else setHoveredName(null);
      } else {
        setHoveredName(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) {
          if (item.isCountry) {
            onSelectCountry(item.id);
          } else if (item.id && onSelectEvent) {
            const ev = Object.values(historicalEvents).flat().find((event) => event.id === item.id);
            if (ev) onSelectEvent(ev.id);
          } else if (onSelectCivilization) {
            onSelectCivilization(item.id);
          }
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // Main 60 FPS Render Loop
    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Update Physics Orbital Controls & Inertia
      updateCameraAndGlobe(
        globeGroup,
        camera,
        controlInputRef.current,
        controlStateRef.current,
        dt,
        container.clientHeight,
      );

      // Rotate Clouds Atmosphere slowly
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.00015;
      }

      // Animate Precision Reticle
      if (reticleGroup.visible) {
        reticleBrackets.rotation.z += 0.015;
        const pulse = 1 + Math.sin(now * 0.004) * 0.06;
        reticleRing.scale.set(pulse, pulse, 1);
      }

      // Pulse Selection Rings
      const time = now * 0.003;
      markersGroup.children.forEach((mesh) => {
        if (mesh instanceof THREE.Mesh && mesh.geometry instanceof THREE.RingGeometry) {
          const scale = 1 + Math.sin(time) * 0.07;
          mesh.scale.set(scale, scale, 1);
        }
      });

      // Animate Trade Route Dots
      const animatedDots = (globeGroup as any).userData.animatedDots || [];
      animatedDots.forEach((dot: any) => {
        dot.progress += dot.speed;
        if (dot.progress > 1) dot.progress = 0;
        const pos = dot.curve.getPointAt(dot.progress);
        dot.mesh.position.copy(pos);
      });

      atmosMesh.lookAt(camera.position);

      // Altitude Calculation
      const altKm = Math.max(0, (camera.position.z - globeRadius) * (EARTH_RADIUS_KM / globeRadius));
      setCameraAltitudeKm(altKm);

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Rebuild markers when props change
    rebuildMarkers();
    const intervalId = setInterval(() => {
      const {
        activeCountryId: cid,
        activeEra: er,
        activeLayers: ly,
        selectedEventId: seid,
      } = propsRef.current;
      if (
        cid !== activeCountryId ||
        er !== activeEra ||
        seid !== selectedEventId ||
        [...ly].sort().join(",") !== [...activeLayers].sort().join(",")
      ) {
        rebuildMarkers();
      }
    }, 150);

    return () => {
      renderer.setAnimationLoop(null);
      clearInterval(intervalId);
      resizeObserver.disconnect();
      detachControls();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    activeLayers,
    activeCountryId,
    activeEra,
    selectedEventId,
    onSelectCountry,
    onSelectCivilization,
    onSelectEvent,
  ]);

  // Zoom Button Handlers with smooth log targets
  const handleZoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    const cur = controlStateRef.current.zoomTarget ?? Math.log(cameraRef.current.position.z);
    controlStateRef.current.zoomTarget = Math.max(
      Math.log(MIN_CAMERA_RANGE),
      cur - 0.25,
    );
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    const cur = controlStateRef.current.zoomTarget ?? Math.log(cameraRef.current.position.z);
    controlStateRef.current.zoomTarget = Math.min(
      Math.log(MAX_CAMERA_RANGE),
      cur + 0.25,
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      />

      {/* Cyberpunk Telemetry HUD Widget */}
      <CoordinateTelemetry
        cursorCoords={cursorCoords}
        selectedTarget={selectedTarget}
        cameraAltitudeKm={cameraAltitudeKm}
        visualMode={visualMode}
        onSetVisualMode={setVisualMode}
      />

      {/* Zoom Controls (+ / -) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-black/80 backdrop-blur-md border border-zinc-800 hover:border-[#00f0ff]/60 rounded-md flex items-center justify-center text-white hover:text-[#00f0ff] transition-all text-lg font-bold shadow-lg"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-black/80 backdrop-blur-md border border-zinc-800 hover:border-[#00f0ff]/60 rounded-md flex items-center justify-center text-white hover:text-[#00f0ff] transition-all text-lg font-bold shadow-lg"
          title="Zoom Out"
        >
          −
        </button>
      </div>

      {/* Target Detected Floating Badge */}
      {hoveredName && (
        <div className="absolute pointer-events-none bg-black/90 backdrop-blur-md border border-[#00f0ff]/60 text-white font-mono px-3.5 py-1.5 rounded-md text-xs shadow-xl shadow-black/80 left-1/2 -translate-x-1/2 top-4 animate-in fade-in duration-200 z-30">
          <span className="text-[#00f0ff] font-semibold">📡 TARGET DETECTED:</span>{" "}
          <span className="font-bold text-white tracking-wide">{hoveredName}</span>
        </div>
      )}
    </div>
  );
}
