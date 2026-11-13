"use client";

import React from "react";
import { Compass, Globe, Eye, MapPin } from "lucide-react";
import { fmtLat, fmtLon, fmtDistanceKm } from "@/lib/geoMath";

export type GlobeVisualMode = "hybrid" | "satellite" | "cyber";

interface CoordinateTelemetryProps {
  cursorCoords: { lat: number; lon: number } | null;
  selectedTarget?: {
    name: string;
    lat: number;
    lon: number;
    distanceKm?: number;
  } | null;
  cameraAltitudeKm?: number;
  visualMode: GlobeVisualMode;
  onSetVisualMode: (mode: GlobeVisualMode) => void;
}

export default function CoordinateTelemetry({
  cursorCoords,
  selectedTarget,
  cameraAltitudeKm,
  visualMode,
  onSetVisualMode,
}: CoordinateTelemetryProps) {
  return (
    <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex flex-col gap-2 font-mono select-none">
      {/* Target Lock Card (if an event or country is selected) */}
      {selectedTarget && (
        <div className="bg-black/85 backdrop-blur-md border border-[#00f0ff]/50 shadow-lg shadow-black/80 px-3 py-2 rounded-md text-[10px] text-zinc-300 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center space-x-1.5 text-[#00f0ff]">
            <MapPin className="w-3.5 h-3.5 animate-pulse text-[#39ff14]" />
            <span className="font-bold tracking-wider uppercase text-white truncate max-w-[130px]">
              {selectedTarget.name}
            </span>
          </div>
          <div className="h-3 w-[1px] bg-zinc-700" />
          <div className="text-zinc-400">
            <span className="text-white font-medium">
              {fmtLat(selectedTarget.lat, 2)}, {fmtLon(selectedTarget.lon, 2)}
            </span>
          </div>
          {selectedTarget.distanceKm !== undefined && (
            <>
              <div className="h-3 w-[1px] bg-zinc-700" />
              <div className="text-[#39ff14] text-[9.5px]">
                <span className="text-zinc-400">MAG: </span>
                {fmtDistanceKm(selectedTarget.distanceKm)}
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Bottom HUD Bar */}
      <div className="bg-black/90 backdrop-blur-md border border-zinc-800/80 shadow-2xl px-3.5 py-2 rounded-md flex items-center space-x-4 text-[10px] text-zinc-400">
        {/* Live Coordinate Telemetry */}
        <div className="flex items-center space-x-2">
          <Compass className="w-3.5 h-3.5 text-[#00f0ff] animate-spin-slow" />
          <div className="flex space-x-2">
            {cursorCoords ? (
              <>
                <span className="text-zinc-500">POS</span>
                <span className="text-[#00f0ff] font-semibold tracking-wide">
                  {fmtLat(cursorCoords.lat, 4)}
                </span>
                <span className="text-[#00f0ff] font-semibold tracking-wide">
                  {fmtLon(cursorCoords.lon, 4)}
                </span>
              </>
            ) : (
              <span className="text-zinc-500 tracking-wider">
                ORBIT STABLE · TRACKING ON
              </span>
            )}
          </div>
        </div>

        {/* Altitude Readout */}
        {cameraAltitudeKm && (
          <>
            <div className="h-3 w-[1px] bg-zinc-800" />
            <div className="hidden sm:flex items-center space-x-1 text-zinc-400">
              <span className="text-zinc-500">ALT:</span>
              <span className="text-white font-medium">
                {Math.round(cameraAltitudeKm).toLocaleString()} KM
              </span>
            </div>
          </>
        )}

        <div className="h-3 w-[1px] bg-zinc-800" />

        {/* Visual Mode Selector Pills */}
        <div className="flex items-center space-x-1 bg-zinc-900/80 p-0.5 rounded border border-zinc-800">
          <button
            onClick={() => onSetVisualMode("hybrid")}
            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
              visualMode === "hybrid"
                ? "bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 shadow-sm shadow-[#00f0ff]/20"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Cyber-Hybrid: Satellite Earth with glowing historical overlays"
          >
            HYBRID
          </button>
          <button
            onClick={() => onSetVisualMode("satellite")}
            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
              visualMode === "satellite"
                ? "bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/50 shadow-sm shadow-[#39ff14]/20"
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
            title="Cyber: Classic HoloGlobe dark grid & neon vectors"
          >
            CYBER
          </button>
        </div>
      </div>
    </div>
  );
}

