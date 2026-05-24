"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Settings, ShieldAlert, Cpu, Globe, Sliders } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";

interface NavbarProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  activeEra: string;
  onSearchSelect: (type: "country" | "civilization", id: string) => void;
}

export default function Navbar({
  mapboxToken,
  setMapboxToken,
  activeEra,
  onSearchSelect,
}: NavbarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenInput, setTokenInput] = useState(mapboxToken);

  // Simple search filter
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const results: Array<{ id: string; name: string; type: "country" | "civilization"; subtitle: string }> = [];

    // Search countries
    Object.values(countriesData).forEach((country) => {
      if (
        country.name.toLowerCase().includes(query) ||
        country.climate.type.toLowerCase().includes(query) ||
        country.religion.toLowerCase().includes(query) ||
        country.languages.some(lang => lang.toLowerCase().includes(query))
      ) {
        results.push({
          id: country.id,
          name: country.name,
          type: "country",
          subtitle: `Country • ${country.capital} • ${country.climate.type}`,
        });
      }
    });

    // Search civilizations
    civilizationsData.forEach((civ) => {
      if (
        civ.name.toLowerCase().includes(query) ||
        civ.era.toLowerCase().includes(query) ||
        civ.description.toLowerCase().includes(query)
      ) {
        results.push({
          id: civ.id,
          name: civ.name,
          type: "civilization",
          subtitle: `Empire • Era: ${civ.era} (${civ.timeSpan})`,
        });
      }
    });

    return results.slice(0, 5);
  };

  const handleSaveToken = () => {
    setMapboxToken(tokenInput);
    setShowSettings(false);
  };

  const searchResults = getSearchResults();

  return (
    <header className="relative w-full z-40 bg-panel-bg backdrop-blur border-b border-panel-border px-6 py-3 flex items-center justify-between font-mono">
      {/* 1. App Logo / Title */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded border border-cyber-cyan flex items-center justify-center bg-cyber-cyan/5 group-hover:bg-cyber-cyan/25 transition-all">
            <Globe className="w-4 h-4 text-cyber-cyan animate-pulse" />
          </div>
          <div>
            <span className="block text-white text-sm font-bold tracking-widest neon-text-cyan">
              EARTH INTELLIGENCE
            </span>
            <span className="block text-[8px] text-gray-500 tracking-tight">CIVILIZATION TELEMETRY SYSTEM v1.2</span>
          </div>
        </Link>
      </div>

      {/* 2. Global Search Bar */}
      <div className="relative flex-1 max-w-md mx-6">
        <div className="relative flex items-center bg-black/40 border border-panel-border rounded-md px-3 py-1.5 focus-within:border-cyber-cyan transition-all">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search countries, empires, climates, religions..."
            className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-panel-bg border border-cyber-cyan/30 rounded-md shadow-2xl p-2 z-50 backdrop-blur-md">
            <div className="text-[9px] text-cyber-cyan/80 border-b border-panel-border pb-1 mb-1 px-2">
              SYSTEM SEARCH MATCHES
            </div>
            {searchResults.map((result) => (
              <button
                key={result.id}
                className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded transition-all text-xs flex flex-col"
                onClick={() => {
                  onSearchSelect(result.type, result.id);
                  setSearchQuery("");
                }}
              >
                <span className="text-white font-medium font-mono">{result.name}</span>
                <span className="text-[9px] text-gray-500 mt-0.5">{result.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Telemetry HUD Indicators & Controls */}
      <div className="flex items-center space-x-6 text-[10px] text-gray-400">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-gray-500">ACTIVE TIMELINE</span>
          <span className="text-cyber-cyan uppercase font-semibold">{activeEra} ERA</span>
        </div>

        <div className="hidden lg:flex flex-col text-right">
          <span className="text-gray-500">COORDINATE MESH</span>
          <span className="text-white">SYS: SECURE</span>
        </div>

        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
          <span className="text-cyber-green font-semibold">LIVE CONNECT</span>
        </div>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-md border transition-all ${
            showSettings || mapboxToken === ""
              ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan"
              : "border-panel-border text-gray-400 hover:text-white hover:border-cyber-cyan/50"
          }`}
          title="Telemetry Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Modal (Overlay) */}
      {showSettings && (
        <div className="absolute right-6 top-16 w-80 glass-panel-heavy p-4 rounded-md z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center space-x-2 border-b border-panel-border pb-2 mb-3">
            <Sliders className="w-4 h-4 text-cyber-cyan" />
            <h3 className="text-xs text-white font-bold tracking-wider">SYSTEM CONFIGURATION</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-[10px] text-gray-500 mb-1">MAPBOX ACCESS TOKEN</label>
              <input
                type="password"
                className="w-full bg-black/40 border border-panel-border rounded p-2 text-white outline-none focus:border-cyber-cyan font-mono text-[10px]"
                placeholder="Paste pk.eyJ..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <p className="text-[8px] text-gray-500 mt-1.5 leading-normal">
                If empty, the app defaults to the **Three.js WebGL Holographic Globe**. Paste a valid Mapbox token starting with `pk.` to enable the **3D Geographic Mapbox Globe** and visual overlay maps.
              </p>
            </div>

            {mapboxToken === "" && (
              <div className="flex items-start space-x-2 bg-cyber-amber/10 border border-cyber-amber/30 p-2 rounded text-[9px] text-cyber-amber leading-normal">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Hologram fallback active. Add token to unlock geographical overlays (climate, biodiversity).</span>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={handleSaveToken}
                className="flex-1 bg-cyber-cyan/15 hover:bg-cyber-cyan/35 border border-cyber-cyan text-cyber-cyan text-[10px] font-bold py-1.5 rounded transition-all"
              >
                INITIALIZE CORE
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-transparent hover:bg-white/5 border border-panel-border text-gray-400 py-1.5 px-3 rounded text-[10px]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
