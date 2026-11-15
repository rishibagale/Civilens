"use client";

import React, { useState } from "react";
import { Sliders, Sun, ShieldAlert, Compass, Network, Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";

interface LayerControlProps {
  activeLayers: string[];
  onToggleLayer: (layerId: string) => void;
}

interface LayerItem {
  id: string;
  label: string;
  category: "environmental" | "human" | "historical";
  colorClass: string;
  description: string;
}

export default function LayerControl({ activeLayers, onToggleLayer }: LayerControlProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const layers: LayerItem[] = [
    // Environmental Layers
    {
      id: "earth_imagery",
      label: "Satellite Earth Imagery",
      category: "environmental",
      colorClass: "text-[#00f0ff] font-bold",
      description: "NASA Blue Marble photoreal surface, night city lights, and specular ocean glint.",
    },
    {
      id: "clouds",
      label: "Atmospheric Clouds",
      category: "environmental",
      colorClass: "text-blue-200",
      description: "Dynamic cloud layer with real-time rotational atmospheric drift.",
    },
    {
      id: "climate",
      label: "Climate Overlays",
      category: "environmental",
      colorClass: "text-cyber-cyan",
      description: "Visualizes global climate bands (arid, tropical, temperate, polar).",
    },
    {
      id: "biodiversity",
      label: "Biodiversity Zones",
      category: "environmental",
      colorClass: "text-cyber-green",
      description: "Highlights high-density species hotspots and ecological zones.",
    },
    {
      id: "ocean_currents",
      label: "Ocean Currents",
      category: "environmental",
      colorClass: "text-blue-400",
      description: "Maps core oceanic currents driving heat transport and navigation routes.",
    },
    {
      id: "paleoclimate",
      label: "Paleoclimate & Environmental Shifts",
      category: "environmental",
      colorClass: "text-[#10b981] font-bold",
      description: "Visualizes the Green Sahara lush savanna, 4.2k drought belt, and Last Glacial Maximum (LGM) ice sheets.",
    },
    // Human Layers
    {
      id: "genetics",
      label: "Human Genetics & Gene Flow",
      category: "human",
      colorClass: "text-[#ec4899] font-bold",
      description: "Animates selective allele sweeps (LCT lactase, EPAS1 hypoxia, HbS malaria) and ancient haplogroup corridors.",
    },
    {
      id: "population_density",
      label: "Population Densities",
      category: "human",
      colorClass: "text-cyber-amber",
      description: "Renders historical and modern centers of agricultural concentration.",
    },
    {
      id: "language_families",
      label: "Language Families",
      category: "human",
      colorClass: "text-orange-400",
      description: "Outlines geographic spans of major cognitive language groups.",
    },
    {
      id: "trade_routes",
      label: "Trade Routes",
      category: "human",
      colorClass: "text-cyber-cyan font-bold",
      description: "Animates primary historical commercial networks (Silk Road, spice routes).",
    },
    // Historical Layers
    {
      id: "ancient_civilizations",
      label: "Ancient Borders",
      category: "historical",
      colorClass: "text-cyber-violet",
      description: "Displays geographical spheres of influence of selected empires.",
    },
    {
      id: "migration_flows",
      label: "Migration Flows",
      category: "historical",
      colorClass: "text-pink-400",
      description: "Draws directional vectors mapping historical human dispersion.",
    },
  ];

  const categories = [
    { id: "environmental", label: "ENVIRONMENTAL SYSTEM", icon: Sun },
    { id: "human", label: "HUMAN SYSTEMS", icon: Network },
    { id: "historical", label: "HISTORICAL LAYERS", icon: Compass },
  ];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col bg-black/20 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      {/* Title with Collapse Button */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 flex-shrink-0 px-5 pt-5 bg-black/30">
        <div className="flex items-center space-x-2.5">
          <Sliders className="w-5 h-5 text-[#00f0ff]" />
          <h3 className="text-sm font-bold tracking-widest text-white uppercase">MAP LAYERS</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded hover:bg-zinc-800/50 transition-all text-zinc-400 hover:text-white"
          title={isCollapsed ? "Expand layers" : "Collapse layers"}
        >
          {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Layer Groups */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {/* Layer Groups */}
          {categories.map((cat) => {
            const Icon = cat.icon;
            const catLayers = layers.filter((l) => l.category === cat.id);

            return (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center space-x-2 text-xs text-zinc-400 font-bold tracking-widest uppercase">
                  <Icon className="w-4 h-4 text-zinc-500" />
                  <span>{cat.label}</span>
                </div>

                <div className="space-y-2">
                  {catLayers.map((layer) => {
                    const isActive = activeLayers.includes(layer.id);
                    return (
                      <button
                        key={layer.id}
                        onClick={() => onToggleLayer(layer.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between group ${
                          isActive
                            ? "bg-[#00f0ff]/10 border-[#00f0ff]/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                            : "bg-black/30 border-zinc-800/50 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700/70 hover:bg-black/40"
                        }`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[#00f0ff] animate-pulse" : "bg-zinc-600"}`} />
                            <span className={`text-xs font-semibold tracking-wide ${layer.colorClass}`}>{layer.label}</span>
                          </div>
                          <p className="text-xs text-zinc-500 group-hover:text-zinc-400 leading-relaxed">
                            {layer.description}
                          </p>
                        </div>

                        <div className="ml-3 shrink-0 flex-shrink-0">
                          {isActive ? (
                            <Eye className="w-4 h-4 text-[#00f0ff]" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-zinc-600 group-hover:text-zinc-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Footer system alert */}
          <div className="mt-auto pt-4 border-t border-zinc-800/40 flex items-start space-x-2.5 text-xs text-zinc-500 leading-relaxed flex-shrink-0">
            <ShieldAlert className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            <span>Toggle layers to update map overlays. Changes apply instantly to all eras.</span>
          </div>
        </div>
      )}
    </div>
  );
}
