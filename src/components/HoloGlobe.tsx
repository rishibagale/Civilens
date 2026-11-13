"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { Compass } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";
import { continentOutlines } from "@/data/continentOutlines";
import { historicalCities } from "@/data/historicalCities";
import { historicalEvents } from "@/data/historicalEvents";
import {
  latLonToWorld,
  createGlobeCircle,
  pickSurface,
  occludedByEarth,
  EARTH_RADIUS_KM,
} from "@/lib/geoMath";
import {
  createControlInput,
  createControlState,
  attachOrbitControls,
  updateCameraAndGlobe,
  startFlightTo,
  applyLensShift,
  MIN_CAMERA_RANGE,
  MAX_CAMERA_RANGE,
  DEFAULT_CAMERA_RANGE,
  type ControlInput,
  type ControlState,
} from "@/lib/cameraDirector";
import { findNearestEntity } from "@/lib/proximityIndexer";
import CoordinateTelemetry, {
  type GlobeVisualMode,
  type CoordinateTelemetryHandle,
} from "./CoordinateTelemetry";
import GlobeOverlay, { type GlobeOverlayHandle } from "./GlobeOverlay";

interface HoloGlobeProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  onSelectEvent?: (id: string | null) => void;
  selectedEventId?: string | null;
  panelOpen?: boolean;
}

interface AnimatedRouteDot {
  mesh: THREE.Mesh;
  curve: THREE.QuadraticBezierCurve3;
  speed: number;
  progress: number;
}

export default function HoloGlobe({
  activeCountryId,
  activeEra,
  activeLayers,
  onSelectCountry,
  onSelectCivilization,
  onSelectEvent,
  selectedEventId = null,
  panelOpen = false,
}: HoloGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<GlobeOverlayHandle>(null);
  const telemetryRef = useRef<CoordinateTelemetryHandle>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);

  const [visualMode, setVisualMode] = useState<GlobeVisualMode>("hybrid");
  const [customLocus, setCustomLocus] = useState<{
    name: string;
    lat: number;
    lon: number;
    subtitle?: string;
  } | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const cyberGridGroupRef = useRef<THREE.Group | null>(null);
  const astrolabeGroupRef = useRef<THREE.Group | null>(null);
  const astrolabeArrivalStartRef = useRef<number>(0);
  const astrolabeWorldPosRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // Optical lens shift smoothing refs
  const lensShiftRef = useRef<{ currentX: number; currentY: number }>({ currentX: 0, currentY: 0 });

  const controlInputRef = useRef<ControlInput>(createControlInput());
  const controlStateRef = useRef<ControlState>(createControlState());

  const rebuildMarkersRef = useRef<() => void>(() => {});

  const propsRef = useRef({
    activeCountryId,
    activeEra,
    activeLayers,
    onSelectCountry,
    onSelectCivilization,
    onSelectEvent,
    selectedEventId,
    panelOpen,
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
      panelOpen,
    };
  }, [
    activeCountryId,
    activeEra,
    activeLayers,
    onSelectCountry,
    onSelectCivilization,
    onSelectEvent,
    selectedEventId,
    panelOpen,
  ]);

  const globeRadius = 60;

  // Selected Target Info for Telemetry & Overlay
  const selectedTarget = useMemo(() => {
    if (selectedEventId) {
      const allEvents = Object.values(historicalEvents).flat();
      const ev = allEvents.find((e) => e.id === selectedEventId);
      if (ev && ev.coordinates) {
        return {
          name: ev.title,
          lat: ev.coordinates[0],
          lon: ev.coordinates[1],
          subtitle: `${ev.era.toUpperCase()} ERA · ${ev.impact.toUpperCase()}`,
        };
      }
    }
    if (customLocus) {
      return {
        name: customLocus.name,
        lat: customLocus.lat,
        lon: customLocus.lon,
        subtitle: customLocus.subtitle || "Cartographic Survey Site",
      };
    }
    if (activeCountryId && countriesData[activeCountryId]) {
      const c = countriesData[activeCountryId];
      return {
        name: c.name,
        lat: c.coordinates[0],
        lon: c.coordinates[1],
        subtitle: `${c.capital} · ${c.climate.type}`,
      };
    }
    return null;
  }, [selectedEventId, customLocus, activeCountryId]);

  // Update Screen-Space DOM Overlay with Inspected Locus
  useEffect(() => {
    if (!overlayRef.current) return;
    if (selectedTarget) {
      overlayRef.current.setInspectedLocus({
        name: selectedTarget.name,
        lat: selectedTarget.lat,
        lon: selectedTarget.lon,
        subtitle: selectedTarget.subtitle,
      });
    } else {
      overlayRef.current.setInspectedLocus(null);
    }
  }, [selectedTarget]);

  // Update Astrolabe Locus Ring 3D position reactively without recreating Three.js scene
  useEffect(() => {
    if (!astrolabeGroupRef.current) return;
    if (selectedTarget) {
      const pos = latLonToWorld(selectedTarget.lat, selectedTarget.lon, globeRadius + 0.7);
      astrolabeGroupRef.current.position.copy(pos);
      astrolabeGroupRef.current.lookAt(pos.clone().multiplyScalar(2));
      astrolabeGroupRef.current.visible = true;
      astrolabeArrivalStartRef.current = performance.now();
    } else {
      astrolabeGroupRef.current.visible = false;
    }
  }, [selectedTarget, globeRadius]);

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

  // Smooth Camera Fly-To on Country Selection (when not already covered by city locus)
  useEffect(() => {
    if (!activeCountryId || !cameraRef.current || !globeGroupRef.current) return;
    if (customLocus) return; // Keep city/locus focus
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
  }, [activeCountryId, customLocus]);

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

  // Rebuild interactive markers when active Era, Layers, Country, or Event change
  useEffect(() => {
    rebuildMarkersRef.current();
  }, [activeEra, activeLayers, activeCountryId, selectedEventId]);

  // Main Three.js Engine Lifecycle (Runs ONCE on mount)
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
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Ambient Space Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambientLight);
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
          vec4 dataCol = texture2D(uData, vUv);

          // Specular Glint on Ocean
          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N, H)), 24.0) * dataCol.g * 0.38 * dayFactor;

          // In Hybrid mode: darken oceans to deep ink navy
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

    // Dynamic Markers, Arcs, and Overlays Groups
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    const overlaysGroup = new THREE.Group();
    globeGroup.add(overlaysGroup);

    // ────────────────────────────────────────────────────────
    // Classical Astrolabe Locus Ring (Double Hairline + Cardinal Ticks)
    // ────────────────────────────────────────────────────────
    const astrolabeGroup = new THREE.Group();
    astrolabeGroupRef.current = astrolabeGroup;
    globeGroup.add(astrolabeGroup);

    // 1. Inner Ring (Antique Gold Hairline)
    const innerRingGeo = new THREE.RingGeometry(1.65, 1.8, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthTest: true,
      depthWrite: false,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);

    // 2. Outer Ring (Warm Ivory Hairline)
    const outerRingGeo = new THREE.RingGeometry(2.35, 2.5, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xfef3c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthTest: true,
      depthWrite: false,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);

    // 3. Four Cardinal Ticks (N, S, E, W)
    const tickPoints: THREE.Vector3[] = [
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0, 3.25, 0),
      new THREE.Vector3(0, -2.5, 0),
      new THREE.Vector3(0, -3.25, 0),
      new THREE.Vector3(2.5, 0, 0),
      new THREE.Vector3(3.25, 0, 0),
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(-3.25, 0, 0),
    ];
    const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPoints);
    const tickMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.9,
      depthTest: true,
      depthWrite: false,
    });
    const cardinalTicks = new THREE.LineSegments(tickGeo, tickMat);

    // 4. Subtle Armillary Crosshair at Center
    const crossPoints: THREE.Vector3[] = [
      new THREE.Vector3(-0.6, 0, 0),
      new THREE.Vector3(0.6, 0, 0),
      new THREE.Vector3(0, -0.6, 0),
      new THREE.Vector3(0, 0.6, 0),
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
      depthTest: true,
      depthWrite: false,
    });
    const armillaryCross = new THREE.LineSegments(crossGeo, crossMat);

    astrolabeGroup.add(innerRing, outerRing, cardinalTicks, armillaryCross);
    astrolabeGroup.visible = false;

    const markersDataMap = new Map<string, { id: string; name: string; isCountry: boolean; isEvent: boolean }>();

    // Dispose geometries and materials cleanly to prevent VRAM memory leaks
    function clearGroup(group: THREE.Group) {
      while (group.children.length > 0) {
        const child = group.children[0];
        group.remove(child);
        if (child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.Points) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      }
    }

    // Rebuild Interactive Markers and Layers (Clean geometry, zero DOM canvas text leaks)
    function rebuildMarkers() {
      clearGroup(markersGroup);
      clearGroup(arcsGroup);
      clearGroup(overlaysGroup);
      markersDataMap.clear();

      const {
        activeEra: era,
        activeLayers: layers,
        activeCountryId: selectedId,
        selectedEventId: selectedEvId,
      } = propsRef.current;

      // 1. Countries (Crisp geometric markers)
      Object.values(countriesData).forEach((country) => {
        const pos = latLonToWorld(country.coordinates[0], country.coordinates[1], globeRadius);
        const isSelected = country.id === selectedId;

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.4, 2.2, 32),
          new THREE.MeshBasicMaterial({
            color: isSelected ? 0xf59e0b : 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: isSelected ? 0.95 : 0.45,
          }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        markersGroup.add(ring);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 16, 16),
          new THREE.MeshBasicMaterial({ color: isSelected ? 0xf59e0b : 0x00f0ff }),
        );
        core.position.copy(pos);
        markersGroup.add(core);

        markersDataMap.set(core.uuid, { id: country.id, name: country.name, isCountry: true, isEvent: false });
        markersDataMap.set(ring.uuid, { id: country.id, name: country.name, isCountry: true, isEvent: false });
      });

      // 2. Civilizations
      civilizationsData
        .filter((civ) => civ.era === era)
        .forEach((civ) => {
          const pos = latLonToWorld(civ.centerCoordinates[0], civ.centerCoordinates[1], globeRadius + 0.5);
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(1.8, 2.8, 8),
            new THREE.MeshBasicMaterial({
              color: 0xd97706,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.8,
            }),
          );
          ring.position.copy(pos);
          ring.lookAt(pos.clone().multiplyScalar(2));
          markersGroup.add(ring);

          const core = new THREE.Mesh(
            new THREE.ConeGeometry(0.75, 2.2, 4),
            new THREE.MeshBasicMaterial({ color: 0xd97706 }),
          );
          core.position.copy(pos);
          core.quaternion.copy(ring.quaternion);
          core.rotateX(Math.PI / 2);
          markersGroup.add(core);

          markersDataMap.set(core.uuid, { id: civ.id, name: civ.name, isCountry: false, isEvent: false });
          markersDataMap.set(ring.uuid, { id: civ.id, name: civ.name, isCountry: false, isEvent: false });
        });

      // 3. Historical Cities
      historicalCities
        .filter((city) => city.eraInfo.some((info) => info.era === era))
        .forEach((city) => {
          const pos = latLonToWorld(city.coordinates[0], city.coordinates[1], globeRadius + 0.3);
          const diamond = new THREE.Mesh(
            new THREE.OctahedronGeometry(1.1, 0),
            new THREE.MeshBasicMaterial({ color: 0xfef3c7, transparent: true, opacity: 0.85 }),
          );
          diamond.position.copy(pos);
          markersGroup.add(diamond);
          markersDataMap.set(diamond.uuid, { id: city.id, name: city.name, isCountry: false, isEvent: false });
        });

      // 4. Historical Events
      (historicalEvents[era] || []).forEach((event) => {
        if (!event.coordinates) return;
        const [lat, lng] = event.coordinates;
        if (lat === 0 && lng === 0) return;
        const pos = latLonToWorld(lat, lng, globeRadius + 0.5);
        const isSelected = event.id === selectedEvId;
        const color = isSelected
          ? 0xf59e0b
          : event.impact === "major"
          ? 0xef4444
          : event.impact === "significant"
          ? 0xf59e0b
          : 0x38bdf8;

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.6, 2.5, 32),
          new THREE.MeshBasicMaterial({
            color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: isSelected ? 1.0 : 0.75,
          }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        markersGroup.add(ring);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(isSelected ? 1.3 : 0.9, 16, 16),
          new THREE.MeshBasicMaterial({ color }),
        );
        core.position.copy(pos);
        markersGroup.add(core);

        markersDataMap.set(core.uuid, { id: event.id, name: event.title, isCountry: false, isEvent: true });
        markersDataMap.set(ring.uuid, { id: event.id, name: event.title, isCountry: false, isEvent: true });
      });

      // 5. Animated Trade Routes & Migration Flows
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
                    0xf59e0b,
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
                    0x818cf8,
                    true,
                    globeRadius,
                    arcsGroup,
                    animatedDots,
                  );
                }
              });
            }
          });
        globeGroup.userData.animatedDots = animatedDots;
      }

      // 6. Overlays (Climate, Biodiversity)
      if (layers.includes("climate")) renderClimateOverlay(globeRadius, overlaysGroup);
      if (layers.includes("biodiversity")) renderBiodiversityOverlay(globeRadius, overlaysGroup);
    }

    rebuildMarkersRef.current = rebuildMarkers;

    function createArc(
      p1: [number, number],
      p2: [number, number],
      colorCode: number,
      dashed: boolean,
      globeRadius: number,
      parentGroup: THREE.Group,
      animatedDots: AnimatedRouteDot[],
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

    // Raycaster for Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Zero-React-re-render Pointer Move: Direct DOM updates for coordinates and hover tooltip
    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Surface Coordinates Raycast -> updates CoordinateTelemetry via imperative handle
      const hit = pickSurface(ndcX, ndcY, camera, globeGroup, globeRadius);
      telemetryRef.current?.setCursorCoords(hit);

      // Marker Tooltip Hover -> direct style mutation without setState
      mouse.set(ndcX, ndcY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item && tooltipRef.current && tooltipTextRef.current) {
          tooltipTextRef.current.textContent = item.name;
          tooltipRef.current.style.display = "flex";
        } else if (tooltipRef.current) {
          tooltipRef.current.style.display = "none";
        }
      } else if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
      }
    };

    // Clean Gesture-Filtered Selection (Invoked only on true clicks, never on drag release)
    const handleCleanClick = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // 1. Check direct hit on interactive marker meshes
      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) {
          if (item.isCountry) {
            setCustomLocus(null);
            propsRef.current.onSelectCountry(item.id);
          } else if (item.isEvent && propsRef.current.onSelectEvent) {
            setCustomLocus(null);
            propsRef.current.onSelectEvent(item.id);
          } else if (propsRef.current.onSelectCivilization) {
            setCustomLocus(null);
            propsRef.current.onSelectCivilization(item.id);
          }
          return;
        }
      }

      // 2. Raycast surface of globe: check proximity indexer (<250 km threshold)
      const hit = pickSurface(mouse.x, mouse.y, camera, globeGroup, globeRadius);
      if (hit) {
        const nearby = findNearestEntity(hit.lat, hit.lon, 250, propsRef.current.activeEra);
        if (nearby) {
          if (nearby.type === "country") {
            setCustomLocus(null);
            propsRef.current.onSelectCountry(nearby.countryId || nearby.id);
          } else if (nearby.type === "event" && propsRef.current.onSelectEvent) {
            setCustomLocus(null);
            propsRef.current.onSelectEvent(nearby.id);
          } else if (nearby.type === "city") {
            // Keep specific city locus active with exact city coordinates
            setCustomLocus({
              name: nearby.name,
              lat: nearby.coordinates[0],
              lon: nearby.coordinates[1],
              subtitle: nearby.snippet,
            });
            if (nearby.countryId) propsRef.current.onSelectCountry(nearby.countryId);

            startFlightTo(
              globeGroup,
              camera,
              nearby.coordinates[0],
              nearby.coordinates[1],
              controlStateRef.current,
              1.35,
              140,
            );
          }
        } else {
          // Open Sea / Wilderness click: cleanly display geodetic coordinates, dismiss open panels
          (propsRef.current.onSelectCountry as (id: string | null) => void)?.(null);
          if (propsRef.current.onSelectEvent) propsRef.current.onSelectEvent(null);

          setCustomLocus({
            name: "Geodetic Locus",
            lat: hit.lat,
            lon: hit.lon,
            subtitle: "Open Horizon · Uncharted Coordinate",
          });
        }
      } else {
        // Space click outside Earth: dismiss panels and clear locus
        (propsRef.current.onSelectCountry as (id: string | null) => void)?.(null);
        if (propsRef.current.onSelectEvent) propsRef.current.onSelectEvent(null);
        setCustomLocus(null);
      }
    };

    // Attach Physics Orbit Controls with gesture slop filter
    const detachControls = attachOrbitControls(
      container,
      controlInputRef.current,
      () => {
        controlStateRef.current.isFlying = false;
      },
      (coords) => {
        handleCleanClick(coords.clientX, coords.clientY);
      },
    );

    container.addEventListener("mousemove", handlePointerMove);

    // Initial marker construction
    rebuildMarkers();

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

      // Off-Axis Optical Lens Shift: Glide globe smoothly to the unobstructed view
      const isPanelOpen = propsRef.current.panelOpen;
      const isDesktop = container.clientWidth >= 768;
      let targetShiftX = 0;
      let targetShiftY = 0;

      if (isPanelOpen) {
        if (isDesktop) {
          // Desktop panel width ~500px on the right
          const panelWidthFraction = 500 / Math.max(1, container.clientWidth);
          targetShiftX = panelWidthFraction * 0.95;
        } else {
          // Mobile bottom sheet covers ~75% at bottom; shift content upward
          targetShiftY = -0.45;
        }
      }

      const shiftSmoothing = 1 - Math.exp(-dt / 0.18);
      lensShiftRef.current.currentX += (targetShiftX - lensShiftRef.current.currentX) * shiftSmoothing;
      lensShiftRef.current.currentY += (targetShiftY - lensShiftRef.current.currentY) * shiftSmoothing;
      applyLensShift(camera, lensShiftRef.current.currentX, lensShiftRef.current.currentY);

      // Rotate Clouds Atmosphere slowly
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.00015;
      }

      // Animate Astrolabe Locus Ring with 280ms arrival contraction ease & subtle breathing
      if (astrolabeGroup.visible) {
        // Horizon occlusion check: hide astrolabe if site is on the opposite side of Earth
        astrolabeWorldPosRef.current.copy(astrolabeGroup.position).applyMatrix4(globeGroup.matrixWorld);
        const isOccluded = occludedByEarth(camera.position, astrolabeWorldPosRef.current, globeRadius);

        if (isOccluded) {
          innerRingMat.opacity = 0;
          outerRingMat.opacity = 0;
          tickMat.opacity = 0;
          crossMat.opacity = 0;
        } else {
          const elapsed = now - astrolabeArrivalStartRef.current;
          const t = Math.min(1, elapsed / 280);
          // easeOutCubic: 1 - (1 - t)^3
          const ease = 1 - Math.pow(1 - t, 3);
          const arrivalScale = 2.0 - 1.0 * ease;

          // Subtle classical breathing pulse (±2%)
          const pulse = 1 + Math.sin(now * 0.0025) * 0.02;
          const totalScale = arrivalScale * pulse;
          astrolabeGroup.scale.set(totalScale, totalScale, 1);

          const ringOpacity = Math.min(1, ease * 1.2);
          innerRingMat.opacity = 0.95 * ringOpacity;
          outerRingMat.opacity = 0.85 * ringOpacity;
          tickMat.opacity = 0.9 * ringOpacity;
          crossMat.opacity = 0.6 * ringOpacity;
        }
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
      const animatedDots = (globeGroup.userData.animatedDots as AnimatedRouteDot[]) || [];
      animatedDots.forEach((dot: AnimatedRouteDot) => {
        dot.progress += dot.speed;
        if (dot.progress > 1) dot.progress = 0;
        const pos = dot.curve.getPointAt(dot.progress);
        dot.mesh.position.copy(pos);
      });

      atmosMesh.lookAt(camera.position);

      // Altitude Calculation -> Direct DOM write via CoordinateTelemetry imperative handle
      const altKm = Math.max(0, (camera.position.z - globeRadius) * (EARTH_RADIUS_KM / globeRadius));
      telemetryRef.current?.setAltitudeKm(altKm);

      // Update Screen-Space DOM Labels & Locus Pin without React re-render
      overlayRef.current?.update(
        camera,
        globeGroup,
        container.clientWidth,
        container.clientHeight,
        altKm,
      );

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
      applyLensShift(camera, lensShiftRef.current.currentX, lensShiftRef.current.currentY);
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      detachControls();
      container.removeEventListener("mousemove", handlePointerMove);

      // Deep GPU resource disposal
      dayTex.dispose();
      nightTex.dispose();
      cloudsTex.dispose();
      dataTex.dispose();

      earthGeo.dispose();
      earthMat.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      oceanGeo.dispose();
      oceanMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      continentMat.dispose();

      innerRingGeo.dispose();
      innerRingMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      tickGeo.dispose();
      tickMat.dispose();
      crossGeo.dispose();
      crossMat.dispose();

      clearGroup(markersGroup);
      clearGroup(arcsGroup);
      clearGroup(overlaysGroup);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [globeRadius]);

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

      {/* Screen-Space DOM Overlay Layer (Crisp Typography, Horizon Occlusion, Zero Re-renders) */}
      <GlobeOverlay
        ref={overlayRef}
        onSelectLocus={(lat, lon, name) => {
          if (globeGroupRef.current && cameraRef.current) {
            startFlightTo(
              globeGroupRef.current,
              cameraRef.current,
              lat,
              lon,
              controlStateRef.current,
              1.3,
              155,
            );
            setCustomLocus({
              name,
              lat,
              lon,
              subtitle: "Civilizational Hearth",
            });
          }
        }}
      />

      {/* Astrolabe Cartographic Telemetry Bar (Zero React Re-renders on mousemove / altitude) */}
      <CoordinateTelemetry
        ref={telemetryRef}
        selectedTarget={selectedTarget}
        visualMode={visualMode}
        onSetVisualMode={setVisualMode}
      />

      {/* Zoom Controls (+ / -) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-black/80 backdrop-blur-md border border-zinc-800 hover:border-[#f59e0b]/60 rounded-md flex items-center justify-center text-white hover:text-[#f59e0b] transition-all text-lg font-bold shadow-lg"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-black/80 backdrop-blur-md border border-zinc-800 hover:border-[#f59e0b]/60 rounded-md flex items-center justify-center text-white hover:text-[#f59e0b] transition-all text-lg font-bold shadow-lg"
          title="Zoom Out"
        >
          −
        </button>
      </div>

      {/* Cartographic Hover Tooltip (Imperative DOM mutation, Zero React Re-render) */}
      <div
        ref={tooltipRef}
        style={{ display: "none" }}
        className="absolute pointer-events-none bg-black/90 backdrop-blur-md border border-[#f59e0b]/60 text-white font-serif px-3.5 py-1.5 rounded-lg text-xs shadow-xl shadow-black/80 left-1/2 -translate-x-1/2 top-4 animate-in fade-in duration-200 z-30 items-center space-x-2"
      >
        <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
        <span ref={tooltipTextRef} className="font-bold text-amber-100 tracking-wide" />
      </div>
    </div>
  );
}
