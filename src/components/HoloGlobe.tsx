"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";

interface HoloGlobeProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
}

export default function HoloGlobe({
  activeCountryId,
  activeEra,
  activeLayers,
  onSelectCountry,
  onSelectCivilization,
}: HoloGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  // Keep latest props in refs for rendering loop usage
  const propsRef = useRef({ activeCountryId, activeEra, activeLayers });
  useEffect(() => {
    propsRef.current = { activeCountryId, activeEra, activeLayers };
  }, [activeCountryId, activeEra, activeLayers]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030408, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Base Globe Elements
    const radius = 60;
    
    // Core Sphere (representing dark space/oceans)
    const oceanGeo = new THREE.SphereGeometry(radius - 0.5, 64, 64);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x050811,
      emissive: 0x020306,
      specular: 0x0b132b,
      shininess: 15,
      transparent: true,
      opacity: 0.85,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    scene.add(oceanMesh);

    // Wireframe Globe (for futuristic digital grid)
    const gridGeo = new THREE.SphereGeometry(radius, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    scene.add(gridMesh);

    // Atmosphere Ring (Outer Glow)
    const atmosGeo = new THREE.RingGeometry(radius + 0.1, radius + 4, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.05,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    atmosMesh.lookAt(camera.position);
    scene.add(atmosMesh);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight1.position.set(100, 50, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xbd00ff, 0.8);
    dirLight2.position.set(-100, -50, -100);
    scene.add(dirLight2);

    // 4. Coordinates Translation Utility
    function latLngToVector3(lat: number, lng: number, r: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.sin(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.cos(theta);
      return new THREE.Vector3(x, y, z);
    }

    // 5. Interactive Country Markers & Raycasting Setup
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    const markersDataMap = new Map<string, { id: string; name: string; isCountry: boolean }>();

    function rebuildMarkers() {
      // Clear existing markers
      while (markersGroup.children.length > 0) {
        markersGroup.remove(markersGroup.children[0]);
      }
      markersDataMap.clear();

      const { activeEra, activeLayers } = propsRef.current;

      // Add Country Markers
      Object.values(countriesData).forEach((country) => {
        const pos = latLngToVector3(country.coordinates[0], country.coordinates[1], radius);
        
        // Outer glowing ring
        const ringGeo = new THREE.RingGeometry(1.5, 2.5, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: country.id === propsRef.current.activeCountryId ? 0x39ff14 : 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: country.id === propsRef.current.activeCountryId ? 0.9 : 0.5,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ring);

        // Center Pin core
        const coreGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({
          color: country.id === propsRef.current.activeCountryId ? 0x39ff14 : 0x00f0ff,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.copy(pos);
        markersGroup.add(core);

        // Associate with mesh for raycasting
        markersDataMap.set(core.uuid, { id: country.id, name: country.name, isCountry: true });
        markersDataMap.set(ring.uuid, { id: country.id, name: country.name, isCountry: true });
      });

      // Add Historical Civilization Markers for active Era
      civilizationsData
        .filter((civ) => civ.era === activeEra)
        .forEach((civ) => {
          const pos = latLngToVector3(civ.centerCoordinates[0], civ.centerCoordinates[1], radius + 0.5);
          
          // Hexagon-like ring (represented as octagonal ring)
          const ringGeo = new THREE.RingGeometry(2.0, 3.2, 8);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xbd00ff, // Purple for civilizations
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.copy(pos);
          ring.lookAt(new THREE.Vector3(0, 0, 0));
          markersGroup.add(ring);

          const coreGeo = new THREE.ConeGeometry(0.8, 2.5, 4);
          const coreMat = new THREE.MeshBasicMaterial({
            color: 0xbd00ff,
          });
          const core = new THREE.Mesh(coreGeo, coreMat);
          core.position.copy(pos);
          // Point outward
          core.quaternion.copy(ring.quaternion);
          core.rotateX(Math.PI / 2);
          markersGroup.add(core);

          markersDataMap.set(core.uuid, { id: civ.id, name: civ.name, isCountry: false });
          markersDataMap.set(ring.uuid, { id: civ.id, name: civ.name, isCountry: false });
        });

      // Add Trade Routes & Migration Flows arcs
      if (activeLayers.includes("trade_routes") || activeLayers.includes("migration_flows")) {
        civilizationsData
          .filter((civ) => civ.era === activeEra)
          .forEach((civ) => {
            // Render Trade Routes
            if (activeLayers.includes("trade_routes")) {
              civ.tradeRoutes.forEach((route) => {
                for (let i = 0; i < route.path.length - 1; i++) {
                  createArc(route.path[i], route.path[i + 1], 0x00f0ff);
                }
              });
            }

            // Render Migration Flows
            if (activeLayers.includes("migration_flows")) {
              civ.migrationFlows.forEach((flow) => {
                for (let i = 0; i < flow.path.length - 1; i++) {
                  createArc(flow.path[i], flow.path[i + 1], 0xbd00ff, true);
                }
              });
            }
          });
      }
    }

    // Helper to create curved arcs on the globe
    const animatedDots: Array<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; progress: number }> = [];
    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);

    function createArc(p1: [number, number], p2: [number, number], colorCode: number, dashed = false) {
      const start = latLngToVector3(p1[0], p1[1], radius);
      const end = latLngToVector3(p2[0], p2[1], radius);
      
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      // Elevate the midpoint based on distance to create an arching vector
      mid.normalize().multiplyScalar(radius + distance * 0.18);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(30);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = dashed 
        ? new THREE.LineDashedMaterial({ color: colorCode, dashSize: 2, gapSize: 1, transparent: true, opacity: 0.6 })
        : new THREE.LineBasicMaterial({ color: colorCode, transparent: true, opacity: 0.7 });

      const line = new THREE.Line(geometry, material);
      if (dashed) line.computeLineDistances();
      arcsGroup.add(line);

      // Create a glowing packet animating along the route
      const dotGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: colorCode });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      arcsGroup.add(dot);

      animatedDots.push({
        mesh: dot,
        curve,
        speed: 0.005 + Math.random() * 0.008,
        progress: Math.random() // Start at random progress to offset dots
      });
    }

    rebuildMarkers();

    // 6. User Orbit Controls (Mouse Drag and Rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationVelocity = { x: 0.0005, y: 0.002 }; // Initial slow spin

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Handle Raycasting for hover tooltip
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);

      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) {
          setHoveredName(item.name);
          container.style.cursor = "pointer";
        }
      } else {
        setHoveredName(null);
        container.style.cursor = "default";
      }

      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Rotate group grids
      gridMesh.rotation.y += deltaMove.x * 0.005;
      gridMesh.rotation.x += deltaMove.y * 0.005;
      oceanMesh.rotation.y += deltaMove.x * 0.005;
      oceanMesh.rotation.x += deltaMove.y * 0.005;
      markersGroup.rotation.y += deltaMove.x * 0.005;
      markersGroup.rotation.x += deltaMove.y * 0.005;
      arcsGroup.rotation.y += deltaMove.x * 0.005;
      arcsGroup.rotation.x += deltaMove.y * 0.005;

      // Add velocity for momentum when released
      rotationVelocity.y = deltaMove.x * 0.001;
      rotationVelocity.x = deltaMove.y * 0.001;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);

      if (intersects.length > 0) {
        const item = markersDataMap.get(intersects[0].object.uuid);
        if (item) {
          if (item.isCountry) {
            onSelectCountry(item.id);
          } else if (onSelectCivilization) {
            onSelectCivilization(item.id);
          }
        }
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("click", handleClick);

    // 7. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Apply drag momentum/inertia or slow self-rotation
      if (!isDragging) {
        gridMesh.rotation.y += rotationVelocity.y;
        gridMesh.rotation.x += rotationVelocity.x;
        oceanMesh.rotation.y += rotationVelocity.y;
        oceanMesh.rotation.x += rotationVelocity.x;
        markersGroup.rotation.y += rotationVelocity.y;
        markersGroup.rotation.x += rotationVelocity.x;
        arcsGroup.rotation.y += rotationVelocity.y;
        arcsGroup.rotation.x += rotationVelocity.x;

        // Decelerate slightly
        rotationVelocity.y *= 0.95;
        rotationVelocity.x *= 0.95;

        // Maintain extremely slow drift
        if (Math.abs(rotationVelocity.y) < 0.0015) rotationVelocity.y = 0.0012;
      }

      // Pulse markers
      const time = Date.now() * 0.003;
      markersGroup.children.forEach((mesh) => {
        if (mesh instanceof THREE.Mesh && mesh.geometry instanceof THREE.RingGeometry) {
          const scale = 1 + Math.sin(time) * 0.08;
          mesh.scale.set(scale, scale, 1);
        }
      });

      // Animate dots along Bezier curves
      animatedDots.forEach((dot) => {
        dot.progress += dot.speed;
        if (dot.progress > 1) dot.progress = 0;
        
        // Grab the position on the Bezier curve and move the dot mesh there
        const pos = dot.curve.getPointAt(dot.progress);
        dot.mesh.position.copy(pos);
      });

      // Face atmosphere ring to camera
      atmosMesh.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    // 8. Handle Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. React to Props Updates (Rebuild markers and routes if active state shifts)
    let prevActiveCountry = activeCountryId;
    let prevActiveEra = activeEra;
    let prevActiveLayers = [...activeLayers].sort().join(",");

    const intervalId = setInterval(() => {
      const layersStr = propsRef.current.activeLayers.sort().join(",");
      if (
        propsRef.current.activeCountryId !== prevActiveCountry ||
        propsRef.current.activeEra !== prevActiveEra ||
        layersStr !== prevActiveLayers
      ) {
        prevActiveCountry = propsRef.current.activeCountryId;
        prevActiveEra = propsRef.current.activeEra;
        prevActiveLayers = layersStr;
        
        // Clean out old arcs
        while (arcsGroup.children.length > 0) {
          arcsGroup.remove(arcsGroup.children[0]);
        }
        animatedDots.length = 0;

        rebuildMarkers();
      }
    }, 100);

    // Clean Up
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      oceanGeo.dispose();
      oceanMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectCountry, onSelectCivilization]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={containerRef} className="w-full h-full min-h-[500px] select-none cursor-grab active:cursor-grabbing" />
      
      {/* Interactive Tooltip Overlay */}
      {hoveredName && (
        <div className="absolute pointer-events-none bg-panel-bg backdrop-blur border border-cyber-cyan/50 text-white font-mono px-3 py-1.5 rounded-md text-xs shadow-lg shadow-black/80 left-1/2 -translate-x-1/2 top-4 animate-pulse">
          <span className="text-cyber-cyan font-semibold">📡 TARGET DETECTED:</span> {hoveredName}
        </div>
      )}
    </div>
  );
}
