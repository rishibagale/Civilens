"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Globe, Volume2, VolumeX } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";
import { historicalEvents } from "@/data/historicalEvents";

interface NavbarProps {
  activeEra: string;
  onSearchSelect: (type: "country" | "civilization" | "event", id: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export default function Navbar({
  activeEra,
  onSearchSelect,
  soundEnabled = false,
  onToggleSound,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const results: Array<{
      id: string;
      name: string;
      type: "country" | "civilization" | "event";
      subtitle: string;
      tag: string;
      tagClass: string;
    }> = [];

    // 1. Countries
    Object.values(countriesData).forEach((country) => {
      if (
        country.name.toLowerCase().includes(query) ||
        country.climate.type.toLowerCase().includes(query) ||
        country.religion.toLowerCase().includes(query) ||
        country.languages.some((lang) => lang.toLowerCase().includes(query))
      ) {
        results.push({
          id: country.id,
          name: country.name,
          type: "country",
          subtitle: `Country • ${country.capital} • ${country.climate.type}`,
          tag: "COUNTRY",
          tagClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        });
      }
    });

    // 2. Civilizations
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
          tag: "EMPIRE",
          tagClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        });
      }
    });

    // 3. Historical Events
    const allEvents = Object.values(historicalEvents).flat();
    allEvents.forEach((ev) => {
      if (
        ev.title.toLowerCase().includes(query) ||
        ev.description.toLowerCase().includes(query) ||
        ev.era.toLowerCase().includes(query)
      ) {
        results.push({
          id: ev.id,
          name: ev.title,
          type: "event",
          subtitle: `${ev.year < 0 ? Math.abs(ev.year) + " BC" : ev.year + " CE"} • ${ev.era.toUpperCase()} • ${ev.impact.toUpperCase()}`,
          tag: "EVENT",
          tagClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        });
      }
    });

    return results.slice(0, 6);
  };

  const searchResults = getSearchResults();

  return (
    <header className="relative w-full z-40 bg-panel-bg backdrop-blur border-b border-panel-border px-6 py-3 flex items-center justify-between font-mono">
      <div className="flex items-center space-x-3">
        <Link href="/app" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded border border-cyber-cyan flex items-center justify-center bg-cyber-cyan/5 group-hover:bg-cyber-cyan/25 transition-all">
            <Globe className="w-4 h-4 text-cyber-cyan animate-pulse" />
          </div>
          <div>
            <span className="block text-white text-sm font-bold tracking-widest neon-text-cyan font-cinzel">
              CIVILENS
            </span>
            <span className="block text-[8px] text-gray-500 tracking-tight">PLANETARY ANTHROPOLOGICAL ATLAS</span>
          </div>
        </Link>
      </div>

      <div className="relative flex-1 max-w-md mx-6">
        <div className="relative flex items-center bg-black/50 border border-panel-border rounded-md px-3 py-1.5 focus-within:border-cyber-cyan transition-all">
          <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
          <input
            id="civilens-desktop-search"
            type="text"
            placeholder="Search countries, empires, historical events, climates... (⌘K / /)"
            className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
            /
          </kbd>
        </div>

        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-[#060609]/95 border border-cyber-cyan/30 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl">
            <div className="text-[9px] text-cyber-cyan/80 border-b border-zinc-800/80 pb-1 mb-1 px-2 font-bold tracking-wider">
              MATCHES ({searchResults.length})
            </div>
            {searchResults.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-all text-xs flex items-center justify-between group"
                onClick={() => {
                  onSearchSelect(result.type, result.id);
                  setSearchQuery("");
                }}
              >
                <div className="flex flex-col min-w-0 mr-2">
                  <span className="text-white font-medium group-hover:text-[#00f0ff] transition-colors truncate">
                    {result.name}
                  </span>
                  <span className="text-[9.5px] text-zinc-500 mt-0.5 truncate">{result.subtitle}</span>
                </div>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded border uppercase font-bold shrink-0 ${result.tagClass}`}>
                  {result.tag}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-5 text-[10px] text-gray-400">
        {/* Generative Ambient Harmonics Toggle */}
        {onToggleSound && (
          <button
            onClick={onToggleSound}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border transition-all text-[9.5px] font-mono font-semibold ${
              soundEnabled
                ? "bg-[#00f0ff]/15 border-[#00f0ff]/50 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
            }`}
            title={soundEnabled ? "Mute ambient planetary audio" : "Enable ambient planetary audio"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? "AMBIENT AUDIO ON" : "AUDIO MUTED"}</span>
          </button>
        )}

        <div className="hidden md:flex flex-col text-right">
          <span className="text-gray-500">ACTIVE TIMELINE</span>
          <span className="text-cyber-cyan uppercase font-semibold">{activeEra} ERA</span>
        </div>
      </div>
    </header>
  );
}
