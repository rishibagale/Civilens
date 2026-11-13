"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Compass } from "lucide-react";
import { fmtLat, fmtLon, fmtDistanceKm } from "@/lib/geoMath";

export type GlobeVisualMode = "hybrid" | "satellite" | "cyber";

export interface CoordinateTelemetryHandle {
  setCursorCoords: (coords: { lat: number; lon: number } | null) => void;
  setAltitudeKm: (altKm: number) => void;
  setDistanceKm: (distKm?: number) => void;
}

interface CoordinateTelemetryProps {
  cursorCoords?: { lat: number; lon: number } | null;
  selectedTarget?: {
    name: string;
    lat: number;
    lon: number;
    distanceKm?: number;
    subtitle?: string;
  } | null;
  cameraAltitudeKm?: number;
  visualMode: GlobeVisualMode;
  onSetVisualMode: (mode: GlobeVisualMode) => void;
}

const CoordinateTelemetry = forwardRef<CoordinateTelemetryHandle, CoordinateTelemetryProps>(
  function CoordinateTelemetry(
    {
      cursorCoords: initialCursorCoords = null,
      selectedTarget,
      cameraAltitudeKm: initialAltitudeKm = 20000,
      visualMode,
      onSetVisualMode,
    },
    ref,
  ) {
    const coordsContainerRef = useRef<HTMLDivElement>(null);
    const altitudeSpanRef = useRef<HTMLSpanElement>(null);
    const distanceSpanRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        setCursorCoords: (coords) => {
          if (!coordsContainerRef.current) return;
          if (coords) {
            coordsContainerRef.current.innerHTML = `
              <span class="text-zinc-500">COORDINATES</span>
              <span class="text-amber-200 font-semibold tracking-wide">${fmtLat(coords.lat, 4)}</span>
              <span class="text-amber-200 font-semibold tracking-wide">${fmtLon(coords.lon, 4)}</span>
            `;
          } else {
            coordsContainerRef.current.innerHTML = `
              <span class="text-zinc-500 tracking-wider">CARTOGRAPHIC SURVEY ACTIVE</span>
            `;
          }
        },

        setAltitudeKm: (altKm) => {
          if (altitudeSpanRef.current) {
            altitudeSpanRef.current.textContent = `${Math.round(altKm).toLocaleString()} KM`;
          }
        },

        setDistanceKm: (distKm) => {
          if (distanceSpanRef.current) {
            distanceSpanRef.current.textContent = distKm !== undefined ? fmtDistanceKm(distKm) : "--";
          }
        },
      }),
      [],
    );

    return (
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex flex-col gap-2 font-mono select-none">
        {/* Inspected Locus Card (Astrolabe Cartographic Telemetry) */}
        {selectedTarget && (
          <div className="bg-black/90 backdrop-blur-md border border-[#f59e0b]/50 shadow-xl shadow-black/80 px-3.5 py-2.5 rounded-lg text-[10px] text-zinc-300 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center space-x-2 text-[#f59e0b]">
              <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="font-serif font-bold tracking-wider uppercase text-amber-100 truncate max-w-[150px]">
                {selectedTarget.name}
              </span>
            </div>
            <div className="h-3 w-[1px] bg-zinc-700/60" />
            <div className="text-zinc-400 font-mono text-[9.5px]">
              <span className="text-amber-200/90 font-medium">
                {fmtLat(selectedTarget.lat, 2)}, {fmtLon(selectedTarget.lon, 2)}
              </span>
            </div>
            {selectedTarget.distanceKm !== undefined && (
              <>
                <div className="h-3 w-[1px] bg-zinc-700/60" />
                <div className="text-zinc-400 font-mono text-[9.5px]">
                  <span className="text-zinc-500">DISTANCE: </span>
                  <span ref={distanceSpanRef} className="text-amber-300 font-semibold">
                    {fmtDistanceKm(selectedTarget.distanceKm)}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Main Bottom Astrolabe Cartographic Survey Bar */}
        <div className="bg-black/90 backdrop-blur-md border border-zinc-800/80 shadow-2xl px-3.5 py-2 rounded-lg flex items-center space-x-4 text-[10px] text-zinc-400">
          {/* Live Geodetic Survey Telemetry (Imperatively updated without React re-renders) */}
          <div className="flex items-center space-x-2 font-mono">
            <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
            <div ref={coordsContainerRef} className="flex space-x-2">
              {initialCursorCoords ? (
                <>
                  <span className="text-zinc-500">COORDINATES</span>
                  <span className="text-amber-200 font-semibold tracking-wide">
                    {fmtLat(initialCursorCoords.lat, 4)}
                  </span>
                  <span className="text-amber-200 font-semibold tracking-wide">
                    {fmtLon(initialCursorCoords.lon, 4)}
                  </span>
                </>
              ) : (
                <span className="text-zinc-500 tracking-wider">
                  CARTOGRAPHIC SURVEY ACTIVE
                </span>
              )}
            </div>
          </div>

          {/* Altitude Readout (Imperatively updated) */}
          <div className="h-3 w-[1px] bg-zinc-800" />
          <div className="hidden sm:flex items-center space-x-1 text-zinc-400 font-mono">
            <span className="text-zinc-500">ALT:</span>
            <span ref={altitudeSpanRef} className="text-white font-medium">
              {Math.round(initialAltitudeKm).toLocaleString()} KM
            </span>
          </div>

          <div className="h-3 w-[1px] bg-zinc-800" />

          {/* Visual Mode Selector Pills */}
          <div className="flex items-center space-x-1 bg-zinc-900/80 p-0.5 rounded border border-zinc-800">
            <button
              onClick={() => onSetVisualMode("hybrid")}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                visualMode === "hybrid"
                  ? "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/50 shadow-sm shadow-[#f59e0b]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Cartographic Hybrid: Satellite Earth with warm historical overlays"
            >
              HYBRID
            </button>
            <button
              onClick={() => onSetVisualMode("satellite")}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                visualMode === "satellite"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Satellite: NASA Blue Marble photoreal Earth & night lights"
            >
              EARTH
            </button>
            <button
              onClick={() => onSetVisualMode("cyber")}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                visualMode === "cyber"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm shadow-purple-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Cyber: Classic armillary grid & neon vectors"
            >
              CYBER
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default CoordinateTelemetry;
