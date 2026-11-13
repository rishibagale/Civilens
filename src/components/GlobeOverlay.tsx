"use client";

import React, { useImperativeHandle, forwardRef, useRef } from "react";
import * as THREE from "three";
import { latLonToWorld, occludedByEarth, fmtLat, fmtLon } from "@/lib/geoMath";

export interface InspectedLocusInfo {
  name: string;
  lat: number;
  lon: number;
  subtitle?: string;
  category?: string;
}

export interface GlobeOverlayHandle {
  update: (
    camera: THREE.PerspectiveCamera,
    globeGroup: THREE.Group,
    width: number,
    height: number,
    altitudeKm: number,
  ) => void;
  setInspectedLocus: (locus: InspectedLocusInfo | null) => void;
}

interface CradleDefinition {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lon: number;
  isCradle: boolean;
  minAltKm: number;
  maxAltKm: number;
}

const OVERLAY_LOCATIONS: CradleDefinition[] = [
  // Primary Civilizational Cradles (Visible globally & mid-range)
  {
    id: "nile",
    name: "Nile Valley",
    subtitle: "Pharaonic Hearth",
    lat: 26.8,
    lon: 31.8,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "mesopotamia",
    name: "Mesopotamia",
    subtitle: "Tigris-Euphrates",
    lat: 33.3,
    lon: 44.4,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "indus",
    name: "Indus Valley",
    subtitle: "Harappan Basin",
    lat: 27.5,
    lon: 68.5,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "yellow_river",
    name: "Yellow River",
    subtitle: "Zhongyuan Hearth",
    lat: 34.8,
    lon: 113.6,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "mesoamerica",
    name: "Mesoamerica",
    subtitle: "Olmec & Maya",
    lat: 19.4,
    lon: -99.1,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    subtitle: "Aegean & Classical",
    lat: 37.9,
    lon: 23.7,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "andean",
    name: "Andean Highlands",
    subtitle: "Chavín & Incan",
    lat: -13.5,
    lon: -71.9,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },
  {
    id: "ganges",
    name: "Ganges Basin",
    subtitle: "Vedic & Mauryan",
    lat: 25.3,
    lon: 83.0,
    isCradle: true,
    minAltKm: 4000,
    maxAltKm: 45000,
  },

  // Historical Metropolises (Visible when zoomed in closer, <= 14,000 km)
  {
    id: "alexandria",
    name: "Alexandria",
    subtitle: "Ptolemaic Port",
    lat: 31.2,
    lon: 29.9,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "rome",
    name: "Rome",
    subtitle: "Caput Mundi",
    lat: 41.9,
    lon: 12.5,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "babylon",
    name: "Babylon",
    subtitle: "Euphrates Gateway",
    lat: 32.54,
    lon: 44.42,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "changan",
    name: "Chang'an",
    subtitle: "Silk Road Eastern Terminal",
    lat: 34.34,
    lon: 108.94,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "constantinople",
    name: "Constantinople",
    subtitle: "Bosphorus Crossroad",
    lat: 41.01,
    lon: 28.98,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "pataliputra",
    name: "Pataliputra",
    subtitle: "Mauryan Imperial Seat",
    lat: 25.61,
    lon: 85.14,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
  {
    id: "kyoto",
    name: "Heian-kyō",
    subtitle: "Classical Capital",
    lat: 35.01,
    lon: 135.76,
    isCradle: false,
    minAltKm: 500,
    maxAltKm: 14000,
  },
];

interface GlobeOverlayProps {
  onSelectLocus?: (lat: number, lon: number, name: string) => void;
}

const _surfacePos = new THREE.Vector3();
const _localPos = new THREE.Vector3();
const _worldPos = new THREE.Vector3();
const _screenPos = new THREE.Vector3();

const GlobeOverlay = forwardRef<GlobeOverlayHandle, GlobeOverlayProps>(function GlobeOverlay(
  { onSelectLocus },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMapRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const locusElementRef = useRef<HTMLDivElement>(null);
  const locusDataRef = useRef<InspectedLocusInfo | null>(null);

  // Pre-calculate 3D local coordinates on the surface (for occlusion) and elevated (for projection)
  const locationsWithVectors = useRef(
    OVERLAY_LOCATIONS.map((loc) => ({
      ...loc,
      surfaceVector: latLonToWorld(loc.lat, loc.lon, 60.0),
      renderVector: latLonToWorld(loc.lat, loc.lon, 60.5),
    })),
  );

  useImperativeHandle(
    ref,
    () => ({
      setInspectedLocus: (locus: InspectedLocusInfo | null) => {
        locusDataRef.current = locus;
        if (!locusElementRef.current) return;
        if (!locus) {
          locusElementRef.current.style.display = "none";
          return;
        }

        const nameEl = locusElementRef.current.querySelector("[data-locus-name]");
        const coordsEl = locusElementRef.current.querySelector("[data-locus-coords]");
        const subEl = locusElementRef.current.querySelector("[data-locus-subtitle]");

        if (nameEl) nameEl.textContent = locus.name;
        if (coordsEl) {
          coordsEl.textContent = `${fmtLat(locus.lat, 2)}, ${fmtLon(locus.lon, 2)}`;
        }
        if (subEl) {
          subEl.textContent = locus.subtitle || locus.category || "Cartographic Survey Site";
        }
        locusElementRef.current.style.display = "block";
      },

      update: (camera, globeGroup, width, height, altitudeKm) => {
        const globeRadius = 60;
        const camPos = camera.position;
        const activeScreenCoords: Array<{ x: number; y: number }> = [];

        // 1. Update Fixed Civilizational and City Labels
        for (const loc of locationsWithVectors.current) {
          const el = elementsMapRef.current.get(loc.id);
          if (!el) continue;

          // Altitude gating
          if (altitudeKm < loc.minAltKm || altitudeKm > loc.maxAltKm) {
            el.style.display = "none";
            continue;
          }

          // Exact surface anchor horizon occlusion check
          _surfacePos.copy(loc.surfaceVector).applyMatrix4(globeGroup.matrixWorld);
          if (occludedByEarth(camPos, _surfacePos, globeRadius)) {
            el.style.display = "none";
            continue;
          }

          // Screen-space projection from render vector
          _worldPos.copy(loc.renderVector).applyMatrix4(globeGroup.matrixWorld);
          _screenPos.copy(_worldPos).project(camera);

          // Frustum clipping
          if (_screenPos.z >= 1 || _screenPos.z <= -1) {
            el.style.display = "none";
            continue;
          }

          const px = ((_screenPos.x + 1) * width) / 2;
          const py = ((-_screenPos.y + 1) * height) / 2;

          if (px < -120 || px > width + 120 || py < -60 || py > height + 60) {
            el.style.display = "none";
            continue;
          }

          // Declutter collision guard: avoid overlapping labels within 45px
          let collides = false;
          for (const existing of activeScreenCoords) {
            if (Math.hypot(existing.x - px, existing.y - py) < 45) {
              collides = true;
              break;
            }
          }
          if (collides) {
            el.style.display = "none";
            continue;
          }

          activeScreenCoords.push({ x: px, y: py });
          el.style.display = "flex";
          el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        }

        // 2. Update Inspected Locus Pin Label
        const locus = locusDataRef.current;
        const locusEl = locusElementRef.current;
        if (locus && locusEl) {
          _localPos.copy(latLonToWorld(locus.lat, locus.lon, globeRadius));
          _surfacePos.copy(_localPos).applyMatrix4(globeGroup.matrixWorld);

          // Use surface anchor for physical horizon occlusion
          if (occludedByEarth(camPos, _surfacePos, globeRadius)) {
            locusEl.style.display = "none";
          } else {
            _localPos.copy(latLonToWorld(locus.lat, locus.lon, globeRadius + 1.2));
            _worldPos.copy(_localPos).applyMatrix4(globeGroup.matrixWorld);
            _screenPos.copy(_worldPos).project(camera);

            if (_screenPos.z >= 1 || _screenPos.z <= -1) {
              locusEl.style.display = "none";
            } else {
              const px = ((_screenPos.x + 1) * width) / 2;
              const py = ((-_screenPos.y + 1) * height) / 2;

              if (px < -150 || px > width + 150 || py < -80 || py > height + 80) {
                locusEl.style.display = "none";
              } else {
                locusEl.style.display = "flex";
                locusEl.style.transform = `translate3d(${px}px, ${py}px, 0)`;
              }
            }
          }
        }
      },
    }),
    [],
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-10"
      style={{ willChange: "transform" }}
    >
      {/* Inspected Locus Badge */}
      <div
        ref={locusElementRef}
        style={{ display: "none", top: 0, left: 0 }}
        className="absolute -translate-x-1/2 -translate-y-[calc(100%+14px)] flex flex-col items-center pointer-events-none transition-opacity duration-200"
      >
        <div className="bg-black/90 backdrop-blur-md border border-[#f59e0b]/70 shadow-2xl shadow-black/90 rounded-lg px-3 py-1.5 flex flex-col items-center text-center">
          <div className="flex items-center space-x-1.5 text-[#f59e0b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
            <span
              data-locus-name
              className="font-serif font-bold text-xs text-amber-100 tracking-wide uppercase truncate max-w-[200px]"
            >
              Locus
            </span>
          </div>
          <div
            data-locus-coords
            className="font-mono text-[9.5px] text-amber-200/90 tracking-tight mt-0.5"
          >
            0.00° N, 0.00° E
          </div>
          <div
            data-locus-subtitle
            className="text-[8.5px] text-zinc-400 font-serif tracking-wider uppercase mt-0.5 truncate max-w-[190px]"
          >
            Cartographic Survey
          </div>
        </div>
        {/* Needle connector */}
        <div className="w-[1px] h-3 bg-gradient-to-b from-[#f59e0b] to-transparent" />
      </div>

      {/* Fixed Geographical & Civilizational Labels */}
      {locationsWithVectors.current.map((loc) => {
        const isCradle = loc.isCradle;
        return (
          <div
            key={loc.id}
            ref={(el) => {
              if (el) elementsMapRef.current.set(loc.id, el);
              else elementsMapRef.current.delete(loc.id);
            }}
            style={{ display: "none", top: 0, left: 0 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 pointer-events-auto cursor-pointer group transition-transform duration-100 ${
              isCradle ? "z-20" : "z-10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLocus?.(loc.lat, loc.lon, loc.name);
            }}
          >
            {/* Small subtle dot indicator */}
            <span
              className={`rounded-full transition-transform duration-200 group-hover:scale-125 ${
                isCradle
                  ? "w-2 h-2 bg-[#f59e0b] border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  : "w-1.5 h-1.5 bg-[#00f0ff] border border-cyan-300 shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              }`}
            />

            {/* Typography */}
            <div className="flex flex-col">
              <span
                className={`font-serif tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors ${
                  isCradle
                    ? "text-[11px] font-bold text-amber-100 group-hover:text-amber-300"
                    : "text-[9.5px] font-semibold text-zinc-200 group-hover:text-[#00f0ff]"
                }`}
              >
                {loc.name}
              </span>
              {isCradle && (
                <span className="text-[8px] font-serif text-amber-300/70 tracking-widest uppercase -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {loc.subtitle}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default GlobeOverlay;
