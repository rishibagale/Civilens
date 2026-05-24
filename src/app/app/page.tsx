"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CountryPanel from "@/components/CountryPanel";
import LayerControl from "@/components/LayerControl";
import TimelineSlider from "@/components/TimelineSlider";
import { MessageSquare, Network, BookOpen, LayoutGrid } from "lucide-react";
import { civilizationsData } from "@/data/civilizationsData";

// Heavy components loaded client-side only
const GlobeController = dynamic(() => import("@/components/GlobeController"), { ssr: false });
const AiInsightEngine = dynamic(() => import("@/components/AiInsightEngine"), { ssr: false });
const KnowledgeGraph = dynamic(() => import("@/components/KnowledgeGraph"), { ssr: false });
const ExplorationCards = dynamic(() => import("@/components/ExplorationCards"), { ssr: false });

type EraType = "ancient" | "medieval" | "colonial" | "modern" | "future";
type PanelType = "ai" | "graph" | "cards" | "layers" | null;

export default function AppDashboard() {
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<EraType>("ancient");
  const [activeLayers, setActiveLayers] = useState<string[]>(["trade_routes", "migration_flows"]);
  const [activePanel, setActivePanel] = useState<PanelType>("ai");

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSearchSelect = (type: "country" | "civilization", id: string) => {
    if (type === "country") {
      setActiveCountryId(id);
      return;
    }
    const civ = civilizationsData.find((c) => c.id === id);
    if (civ) {
      setActiveEra(civ.era);
      setActiveCountryId(null);
    }
  };

  const sidebarItems = [
    { id: "ai" as PanelType, icon: MessageSquare, label: "AI ENGINE" },
    { id: "graph" as PanelType, icon: Network, label: "GRAPH" },
    { id: "cards" as PanelType, icon: BookOpen, label: "REPORTS" },
    { id: "layers" as PanelType, icon: LayoutGrid, label: "LAYERS" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden select-none">
      {/* Top Navbar */}
      <Navbar activeEra={activeEra} onSearchSelect={handleSearchSelect} />

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Icon Sidebar */}
        <div className="w-14 shrink-0 border-r border-panel-border bg-black/40 flex flex-col items-center py-4 space-y-2 z-20">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(isActive ? null : item.id)}
                className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                  isActive
                    ? "bg-cyber-cyan/15 border border-cyber-cyan text-cyber-cyan"
                    : "border border-panel-border text-gray-500 hover:text-gray-200 hover:border-gray-500"
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[6px] font-mono font-bold tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Left Panel (conditional) */}
        <AnimatePresence mode="wait">
          {activePanel && (
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="w-80 shrink-0 border-r border-panel-border bg-black/60 flex flex-col min-h-0 h-full overflow-hidden z-30"
            >
              {activePanel === "ai" && <AiInsightEngine />}
              {activePanel === "graph" && <KnowledgeGraph />}
              {activePanel === "cards" && <ExplorationCards />}
              {activePanel === "layers" && (
                <div className="flex-1 min-h-0 overflow-y-auto p-2">
                  <LayerControl activeLayers={activeLayers} onToggleLayer={toggleLayer} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Globe Center */}
        <div className="flex-1 relative min-h-0 min-w-0 overflow-hidden z-0 isolate">
          <div className="absolute inset-0">
          <GlobeController
            activeCountryId={activeCountryId}
            activeEra={activeEra}
            activeLayers={activeLayers}
            onSelectCountry={setActiveCountryId}
          />
          </div>

          {/* Timeline at bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <TimelineSlider activeEra={activeEra} onEraChange={setActiveEra} />
          </div>

          {/* Telemetry HUD overlays */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-500 pointer-events-none space-y-1 z-10">
            <div className="flex items-center space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-cyber-green animate-ping" />
              <span className="text-gray-400">RENDER ENGINE: ACTIVE</span>
            </div>
            <div>PROJECTION: WEBGL HOLOGRAPH (FREE)</div>
            <div>ERA: <span className="text-cyber-cyan uppercase">{activeEra}</span></div>
            <div>LAYERS: <span className="text-white">{activeLayers.length} ACTIVE</span></div>
          </div>

          {/* Country Panel overlay */}
          <AnimatePresence>
            {activeCountryId && (
              <CountryPanel
                countryId={activeCountryId}
                onClose={() => setActiveCountryId(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
