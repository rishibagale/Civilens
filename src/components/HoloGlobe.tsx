"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";
import { continentOutlines } from "@/data/continentOutlines";
import { historicalCities } from "@/data/historicalCities";
import { historicalEvents } from "@/data/historicalEvents";
import { empireData } from "@/data/empireData";
import type { HistoricalEvent } from "@/data/historicalEvents";

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
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ y: number; x: number } | null>(null);
  const flyToEnabledRef = useRef(false);

  const propsRef = useRef({ activeCountryId, activeEra, activeLayers, onSelectCountry, onSelectCivilization, onSelectEvent, selectedEventId });
  useEffect(() => {
    propsRef.current = { activeCountryId, activeEra, activeLayers, onSelectCountry, onSelectCivilization, onSelectEvent, selectedEventId };
  }, [activeCountryId, activeEra, activeLayers, onSelectCountry, onSelectCivilization, onSelectEvent, selectedEventId]);

  function latLngToVector3(lat: number, lng: number, r: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(r * Math.sin(phi) * Math.sin(theta));
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.cos(theta);
    return new THREE.Vector3(x, y, z);
  }

  function createGlobeCircle(lat: number, lng: number, radiusKm: number, globeRadius: number, segments = 48): number[][] {
    const coords: number[][] = [];
    const distanceRadians = radiusKm / 6371;
    const latRadians = (lat * Math.PI) / 180;
    const lngRadians = (lng * Math.PI) / 180;
    for (let i = 0; i <= segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      const drawLatRadians = Math.asin(Math.sin(latRadians) * Math.cos(distanceRadians) + Math.cos(latRadians) * Math.sin(distanceRadians) * Math.cos(angle));
      const drawLngRadians = lngRadians + Math.atan2(Math.sin(angle) * Math.sin(distanceRadians) * Math.cos(latRadians), Math.cos(distanceRadians) - Math.sin(latRadians) * Math.sin(drawLatRadians));
      const pos = latLngToVector3((drawLatRadians * 180) / Math.PI, (drawLngRadians * 180) / Math.PI, globeRadius);
      coords.push([pos.x, pos.y, pos.z]);
    }
    return coords;
  }

  function flyToLatLng(lat: number, lng: number) {
    const globeRadius = 60;
    const target = latLngToVector3(lat, lng, globeRadius);
    const dir = target.clone().normalize();
    targetRotationRef.current = { y: -Math.atan2(dir.x, dir.z), x: -Math.asin(dir.y) };
    flyToEnabledRef.current = true;
  }

  useEffect(() => {
    if (!selectedEventId || !cameraRef.current) return;
    const allEvents = Object.values(historicalEvents).flat();
    const ev = allEvents.find((e) => e.id === selectedEventId);
    if (!ev || !ev.coordinates) return;
    flyToLatLng(ev.coordinates[0], ev.coordinates[1]);
  }, [selectedEventId]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = Math.max(container.clientWidth, 2);
    const height = Math.max(container.clientHeight, 2);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030408, 0.00035);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030408, 1);
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const globeRadius = 60;

    const oceanGeo = new THREE.SphereGeometry(globeRadius - 0.5, 64, 64);
    const oceanMat = new THREE.MeshPhongMaterial({ color: 0x050811, emissive: 0x020306, specular: 0x0b132b, shininess: 15, transparent: true, opacity: 0.85 });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);

    const gridGeo = new THREE.SphereGeometry(globeRadius, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.28 });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;
    globeGroup.add(oceanMesh, gridMesh);

    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 900;
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.65, transparent: true, opacity: 0.5 })));

    const atmosGeo = new THREE.RingGeometry(globeRadius + 0.1, globeRadius + 4, 64);
    const atmosMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.05 });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    atmosMesh.lookAt(camera.position);
    scene.add(atmosMesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight1.position.set(100, 50, 100);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xbd00ff, 0.8);
    dirLight2.position.set(-100, -50, -100);
    scene.add(dirLight2);

    const continentsGroup = new THREE.Group();
    const continentMat = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.5 });
    continentOutlines.forEach((ring) => {
      const pts = ring.map(([lat, lng]) => latLngToVector3(lat, lng, globeRadius + 0.15));
      if (pts.length > 2) pts.push(pts[0].clone());
      continentsGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), continentMat));
    });
    globeGroup.add(continentsGroup);

    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    const labelsGroup = new THREE.Group();
    globeGroup.add(labelsGroup);
    const overlaysGroup = new THREE.Group();
    globeGroup.add(overlaysGroup);

    const markersDataMap = new Map<string, { id: string; name: string; isCountry: boolean }>();

    function clearGroup(group: THREE.Group) { while (group.children.length > 0) group.remove(group.children[0]); }

    function rebuildMarkers() {
      clearGroup(markersGroup);
      clearGroup(arcsGroup);
      clearGroup(labelsGroup);
      clearGroup(overlaysGroup);
      markersDataMap.clear();
      const { activeEra: era, activeLayers: layers, activeCountryId: selectedId } = propsRef.current;

      Object.values(countriesData).forEach((country) => {
        const pos = latLngToVector3(country.coordinates[0], country.coordinates[1], globeRadius);
        const isSelected = country.id === selectedId;

        const ring = new THREE.Mesh(new THREE.RingGeometry(1.5, 2.5, 32), new THREE.MeshBasicMaterial({ color: isSelected ? 0x39ff14 : 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: isSelected ? 0.9 : 0.5 }));
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ring);

        const core = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshBasicMaterial({ color: isSelected ? 0x39ff14 : 0x00f0ff }));
        core.position.copy(pos);
        markersGroup.add(core);

        markersDataMap.set(core.uuid, { id: country.id, name: country.name, isCountry: true });
        markersDataMap.set(ring.uuid, { id: country.id, name: country.name, isCountry: true });

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

      civilizationsData.filter((civ) => civ.era === era).forEach((civ) => {
        const pos = latLngToVector3(civ.centerCoordinates[0], civ.centerCoordinates[1], globeRadius + 0.5);
        const ring = new THREE.Mesh(new THREE.RingGeometry(2.0, 3.2, 8), new THREE.MeshBasicMaterial({ color: 0xbd00ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ring);
        const core = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.5, 4), new THREE.MeshBasicMaterial({ color: 0xbd00ff }));
        core.position.copy(pos);
        core.quaternion.copy(ring.quaternion);
        core.rotateX(Math.PI / 2);
        markersGroup.add(core);
        markersDataMap.set(core.uuid, { id: civ.id, name: civ.name, isCountry: false });
        markersDataMap.set(ring.uuid, { id: civ.id, name: civ.name, isCountry: false });
      });

      historicalCities.filter((city) => city.eraInfo.some((info) => info.era === era)).forEach((city) => {
        const pos = latLngToVector3(city.coordinates[0], city.coordinates[1], globeRadius + 0.3);
        const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9 }));
        diamond.position.copy(pos);
        markersGroup.add(diamond);
        markersDataMap.set(diamond.uuid, { id: city.id, name: city.name, isCountry: false });
      });

      (historicalEvents[era] || []).forEach((event) => {
        if (!event.coordinates) return;
        const [lat, lng] = event.coordinates;
        if (lat === 0 && lng === 0) return;
        const pos = latLngToVector3(lat, lng, globeRadius + 0.5);
        const color = event.impact === "major" ? 0xff3b30 : event.impact === "significant" ? 0xf59e0b : 0x00f0ff;
        const ring = new THREE.Mesh(new THREE.RingGeometry(1.8, 2.8, 32), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ring);
        const core = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), new THREE.MeshBasicMaterial({ color }));
        core.position.copy(pos);
        markersGroup.add(core);
        markersDataMap.set(core.uuid, { id: event.id, name: event.title, isCountry: false });
        markersDataMap.set(ring.uuid, { id: event.id, name: event.title, isCountry: false });
      });

      if (layers.includes("trade_routes") || layers.includes("migration_flows")) {
        const animatedDots: Array<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; progress: number }> = [];
        civilizationsData.filter((civ) => civ.era === era).forEach((civ) => {
          if (layers.includes("trade_routes")) civ.tradeRoutes.forEach((route) => {
            for (let i = 0; i < route.path.length - 1; i++) createArc(route.path[i], route.path[i + 1], 0x00f0ff, false, globeRadius, arcsGroup, animatedDots);
          });
          if (layers.includes("migration_flows")) civ.migrationFlows.forEach((flow) => {
            for (let i = 0; i < flow.path.length - 1; i++) createArc(flow.path[i], flow.path[i + 1], 0xbd00ff, true, globeRadius, arcsGroup, animatedDots);
          });
        });
        (globeGroup as any).userData.animatedDots = animatedDots;
      }

      if (layers.includes("climate")) renderClimateOverlay(globeRadius, overlaysGroup);
      if (layers.includes("biodiversity")) renderBiodiversityOverlay(globeRadius, overlaysGroup);
      if (layers.includes("population_density")) renderPopulationOverlay(globeRadius, overlaysGroup);
      if (layers.includes("language_families")) renderLanguageOverlay(globeRadius, overlaysGroup);
      if (layers.includes("ancient_civilizations")) renderEmpireOverlay(globeRadius, overlaysGroup, era);
    }

    function createArc(p1: [number, number], p2: [number, number], colorCode: number, dashed: boolean, globeRadius: number, parentGroup: THREE.Group, animatedDots: any[]) {
      const start = latLngToVector3(p1[0], p1[1], globeRadius);
      const end = latLngToVector3(p2[0], p2[1], globeRadius);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.18);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(30);
      const material = dashed ? new THREE.LineDashedMaterial({ color: colorCode, dashSize: 2, gapSize: 1, transparent: true, opacity: 0.6 }) : new THREE.LineBasicMaterial({ color: colorCode, transparent: true, opacity: 0.7 });
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
      if (dashed) line.computeLineDistances();
      parentGroup.add(line);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshBasicMaterial({ color: colorCode }));
      parentGroup.add(dot);
      animatedDots.push({ mesh: dot, curve, speed: 0.005 + Math.random() * 0.008, progress: Math.random() });
    }

    function renderClimateOverlay(globeRadius: number, parentGroup: THREE.Group) {
      Object.values(countriesData).forEach((country) => {
        const type = country.climate.type;
        let color = 0x00f0ff;
        let radiusKm = 1000;
        if (type.includes("Desert") || type.includes("Arid")) { color = 0xeab308; radiusKm = 1200; }
        else if (type.includes("Temperate Maritime")) { color = 0x2dd4bf; radiusKm = 1000; }
        else if (type.includes("Subpolar") || type.includes("Tundra")) { color = 0x93c5fd; radiusKm = 1100; }
        else if (type.includes("Monsoon") || type.includes("Tropical wet")) { color = 0x10b981; radiusKm = 1300; }
        else if (type.includes("Tropical")) { color = 0x16a34a; radiusKm = 1400; }

        const coords = createGlobeCircle(country.coordinates[0], country.coordinates[1], radiusKm, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(coords.map((c) => new THREE.Vector3(c[0], c[1], c[2])));
        const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.15, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        parentGroup.add(mesh);
      });
    }

    function renderBiodiversityOverlay(globeRadius: number, parentGroup: THREE.Group) {
      Object.values(countriesData).forEach((country) => {
        const rating = country.geography.biodiversityRating.toLowerCase();
        let color = 0x22c55e;
        let radiusKm = 1200;
        if (rating.includes("hyper") || rating.includes("mega")) { color = 0x22c55e; radiusKm = 1500; }
        else if (rating.includes("moderate")) { color = 0xa3e635; radiusKm = 1100; }
        else if (rating.includes("low")) { color = 0xcbd5e1; radiusKm = 800; }

        const coords = createGlobeCircle(country.coordinates[0], country.coordinates[1], radiusKm, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(coords.map((c) => new THREE.Vector3(c[0], c[1], c[2])));
        const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.18, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        parentGroup.add(mesh);
      });
    }

    function renderPopulationOverlay(globeRadius: number, parentGroup: THREE.Group) {
      Object.values(countriesData).forEach((country) => {
        const pop = parseFloat(country.population.replace(/[^0-9.]/g, ""));
        const radiusKm = Math.max(350, Math.min(1800, 280 + Math.sqrt(isNaN(pop) ? 1 : pop) * 40));
        const coords = createGlobeCircle(country.coordinates[0], country.coordinates[1], radiusKm, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(coords.map((c) => new THREE.Vector3(c[0], c[1], c[2])));
        const mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.15, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        parentGroup.add(mesh);
      });
    }

    function renderLanguageOverlay(globeRadius: number, parentGroup: THREE.Group) {
      const colorMap: Record<string, number> = {
        english: 0x38bdf8, german: 0x38bdf8, dutch: 0x38bdf8, swedish: 0x38bdf8,
        spanish: 0xf97316, portuguese: 0xf97316, french: 0xf97316, italian: 0xf97316,
        arabic: 0xf59e0b, hebrew: 0xf59e0b, amharic: 0xf59e0b,
        hindi: 0xa855f7, urdu: 0xa855f7, bengali: 0xa855f7, nepali: 0xa855f7,
        mandarin: 0xef4444, chinese: 0xef4444, japanese: 0xef4444, korean: 0xef4444,
        thai: 0x10b981, vietnamese: 0x10b981, filipino: 0x10b981, indonesian: 0x10b981,
        swahili: 0x84cc16, zulu: 0x84cc16, xhosa: 0x84cc16, yoruba: 0x84cc16, hausa: 0x84cc16,
      };
      Object.values(countriesData).forEach((country) => {
        const primary = (country.languages[0] || "").toLowerCase();
        const color = colorMap[primary] || 0x00f0ff;
        const coords = createGlobeCircle(country.coordinates[0], country.coordinates[1], 700, globeRadius);
        const geo = new THREE.BufferGeometry().setFromPoints(coords.map((c) => new THREE.Vector3(c[0], c[1], c[2])));
        const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.14, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        parentGroup.add(mesh);
      });
    }

    function renderEmpireOverlay(globeRadius: number, parentGroup: THREE.Group, era: string) {
      const activeEmpires = empireData.filter((emp) => emp.era === era);
      activeEmpires.forEach((emp) => {
        const rings: number[][][] = [];
        emp.controlledCountries.forEach((code) => {
          const coords = countriesData[code]?.coordinates;
          if (coords) rings.push(createGlobeCircle(coords[0], coords[1], 650, globeRadius));
        });
        if (rings.length > 0) {
          const geo = new THREE.BufferGeometry().setFromPoints(rings.flat().map((c) => new THREE.Vector3(c[0], c[1], c[2])));
          const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(emp.color || "rgba(189,0,255,0.3)"), side: THREE.DoubleSide, transparent: true, opacity: 0.35, depthWrite: false });
          const mesh = new THREE.Mesh(geo, mat);
          parentGroup.add(mesh);
        }
      });
    }

    rebuildMarkers();

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationVelocity = { x: 0.0005, y: 0.002 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => { isDragging = true; previousMousePosition = { x: e.clientX, y: e.clientY }; };
    const handleMouseUp = () => { isDragging = false; };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);
      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) { setHoveredName(item.name); container.style.cursor = "pointer"; }
        else { setHoveredName(null); container.style.cursor = "default"; }
      } else { setHoveredName(null); container.style.cursor = "default"; }

      if (!isDragging) return;
      const deltaMove = { x: e.clientX - previousMousePosition.x, y: e.clientY - previousMousePosition.y };
      globeGroup.rotation.y += deltaMove.x * 0.005;
      globeGroup.rotation.x += deltaMove.y * 0.005;
      rotationVelocity.y = deltaMove.x * 0.001;
      rotationVelocity.x = deltaMove.y * 0.001;
      previousMousePosition = { x: e.clientX, y: e.clientY };
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
          if (item.isCountry) onSelectCountry(item.id);
          else if (item.id && onSelectEvent) {
            const event = Object.values(historicalEvents).flat().find((ev) => ev.id === item.id);
            if (event) {
              onSelectEvent(event.id);
              if (event.coordinates) flyToLatLng(event.coordinates[0], event.coordinates[1]);
            }
          } else if (onSelectCivilization) onSelectCivilization(item.id);
        }
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("click", handleClick);

    const handleWheel = (e: WheelEvent) => { e.preventDefault(); camera.position.z = Math.max(150, Math.min(400, camera.position.z + e.deltaY * 0.5)); };
    container.addEventListener("wheel", handleWheel, { passive: false });

    const animate = () => {
      if (!isDragging) {
        globeGroup.rotation.y += rotationVelocity.y;
        globeGroup.rotation.x += rotationVelocity.x;
        rotationVelocity.y *= 0.95;
        rotationVelocity.x *= 0.95;

        if (flyToEnabledRef.current && targetRotationRef.current && globeGroupRef.current) {
          const g = globeGroupRef.current;
          g.rotation.y += (targetRotationRef.current.y - g.rotation.y) * 0.05;
          g.rotation.x += (targetRotationRef.current.x - g.rotation.x) * 0.05;
          if (Math.abs(g.rotation.y - targetRotationRef.current.y) < 0.0005 && Math.abs(g.rotation.x - targetRotationRef.current.x) < 0.0005) {
            g.rotation.y = targetRotationRef.current.y;
            g.rotation.x = targetRotationRef.current.x;
            flyToEnabledRef.current = false;
          }
        }
      }

      const time = Date.now() * 0.003;
      markersGroup.children.forEach((mesh) => {
        if (mesh instanceof THREE.Mesh && mesh.geometry instanceof THREE.RingGeometry) {
          const scale = 1 + Math.sin(time) * 0.08;
          mesh.scale.set(scale, scale, 1);
        }
      });

      const animatedDots = (globeGroup as any).userData.animatedDots || [];
      animatedDots.forEach((dot: any) => {
        dot.progress += dot.speed;
        if (dot.progress > 1) dot.progress = 0;
        const pos = dot.curve.getPointAt(dot.progress);
        dot.mesh.position.copy(pos);
      });

      atmosMesh.lookAt(camera.position);
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

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
    handleResize();

    const intervalId = setInterval(() => {
      const { activeCountryId: cid, activeEra: er, activeLayers: ly } = propsRef.current;
      if (cid !== activeCountryId || er !== activeEra || [...ly].sort().join(",") !== [...activeLayers].sort().join(",")) rebuildMarkers();
    }, 100);

    return () => {
      renderer.setAnimationLoop(null);
      clearInterval(intervalId);
      resizeObserver.disconnect();
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [activeLayers, activeCountryId, activeEra, onSelectCountry, onSelectCivilization, onSelectEvent, selectedEventId]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0 select-none cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button onClick={() => { if (cameraRef.current) cameraRef.current.position.z = Math.max(150, cameraRef.current.position.z - 20); }} className="w-10 h-10 bg-panel-bg/90 backdrop-blur border border-panel-border rounded flex items-center justify-center text-white hover:bg-white/10 transition-all text-lg font-bold">+</button>
        <button onClick={() => { if (cameraRef.current) cameraRef.current.position.z = Math.min(400, cameraRef.current.position.z + 20); }} className="w-10 h-10 bg-panel-bg/90 backdrop-blur border border-panel-border rounded flex items-center justify-center text-white hover:bg-white/10 transition-all text-lg font-bold">−</button>
      </div>
      <div className="absolute bottom-4 right-20 bg-panel-bg/90 backdrop-blur border border-panel-border px-3 py-2 rounded font-mono text-[9px] text-gray-400 pointer-events-none z-10">
        <div className="flex items-center space-x-1.5 mb-0.5"><span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" /><span className="text-white">HOLOGRAPHIC GLOBE</span></div>
        <div>ENGINE: THREE.JS · NO API KEY</div>
        <div>DRAG TO ORBIT · SCROLL TO ZOOM</div>
      </div>
      {hoveredName && <div className="absolute pointer-events-none bg-panel-bg backdrop-blur border border-cyber-cyan/50 text-white font-mono px-3 py-1.5 rounded-md text-xs shadow-lg shadow-black/80 left-1/2 -translate-x-1/2 top-4 animate-pulse z-20"><span className="text-cyber-cyan font-semibold">📡 TARGET DETECTED:</span> {hoveredName}</div>}
    </div>
  );
}