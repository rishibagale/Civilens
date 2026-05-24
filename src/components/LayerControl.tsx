"use client";

import React from "react";
import { Sliders, Sun, ShieldAlert, Compass, Network, Eye, EyeOff } from "lucide-react";

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
  const layers: LayerItem[] = [
    // Environmental Layers
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
    // Human Layers
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
    <div className="w-64 glass-panel p-4 font-mono text-xs flex flex-col space-y-4 max-h-[85vh] overflow-y-auto scrollbar-none shrink-0 z-20">
      {/* Title */}
      <div className="flex items-center space-x-2 border-b border-panel-border pb-2">
        <Sliders className="w-4 h-4 text-cyber-cyan" />
        <h3 className="text-white font-bold tracking-widest uppercase">MAP LAYERS HUD</h3>
      </div>

      {/* Layer Groups */}
      {categories.map((cat) => {
        const Icon = cat.icon;
        const catLayers = layers.filter((l) => l.category === cat.id);

        return (
          <div key={cat.id} className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[9px] text-gray-500 font-bold tracking-wider">
              <Icon className="w-3 h-3 text-gray-500" />
              <span>{cat.label}</span>
            </div>

            <div className="space-y-1.5">
              {catLayers.map((layer) => {
                const isActive = activeLayers.includes(layer.id);
                return (
                  <button
                    key={layer.id}
                    onClick={() => onToggleLayer(layer.id)}
                    className={`w-full text-left p-2 rounded border transition-all flex items-center justify-between group ${
                      isActive
                        ? "bg-cyber-cyan/5 border-cyber-cyan/45 text-white"
                        : "bg-black/20 border-panel-border text-gray-400 hover:text-gray-200 hover:border-panel-border/70"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyber-cyan animate-pulse" : "bg-gray-700"}`} />
                        <span className={`text-[10px] font-semibold tracking-wide ${layer.colorClass}`}>{layer.label}</span>
                      </div>
                      <p className="text-[8px] text-gray-500 group-hover:text-gray-400 leading-tight">
                        {layer.description}
                      </p>
                    </div>

                    <div className="ml-2 shrink-0">
                      {isActive ? (
                        <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400" />
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
      <div className="pt-2 border-t border-panel-border/50 flex items-start space-x-1.5 text-[8px] text-gray-500 leading-normal">
        <ShieldAlert className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
        <span>Toggling layers updates GIS map overlays and WebGL holographic arcs automatically.</span>
      </div>
    </div>
  );
}
