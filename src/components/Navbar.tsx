"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Cpu, Globe } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";

interface NavbarProps {
  activeEra: string;
  onSearchSelect: (type: "country" | "civilization", id: string) => void;
}

export default function Navbar({ activeEra, onSearchSelect }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const results: Array<{ id: string; name: string; type: "country" | "civilization"; subtitle: string }> = [];

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
        });
      }
    });

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

  const searchResults = getSearchResults();

  return (
    <header className="relative w-full z-40 bg-panel-bg backdrop-blur border-b border-panel-border px-6 py-3 flex items-center justify-between font-mono">
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

      <div className="flex items-center space-x-6 text-[10px] text-gray-400">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-gray-500">ACTIVE TIMELINE</span>
          <span className="text-cyber-cyan uppercase font-semibold">{activeEra} ERA</span>
        </div>

        <div className="hidden lg:flex flex-col text-right">
          <span className="text-gray-500">GLOBE ENGINE</span>
          <span className="text-white">WEBGL · NO API KEY</span>
        </div>

        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
          <span className="text-cyber-green font-semibold">LIVE CONNECT</span>
        </div>
      </div>
    </header>
  );
}
