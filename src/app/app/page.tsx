"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CountryPanel from "@/components/CountryPanel";
import LayerControl from "@/components/LayerControl";
import TimelineSlider from "@/components/TimelineSlider";
import { MessageSquare, Network, BookOpen, LayoutGrid, Search, X, Compass } from "lucide-react";
import { civilizationsData } from "@/data/civilizationsData";
import { countriesData } from "@/data/countriesData";
import MapLibreGlobeGlobe from "@/components/MapLibreGlobeGlobe";

// Heavy components loaded client-side only
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
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleAskQuestion = (question: string) => {
    setPendingQuery(question);
    setActivePanel("ai");
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{ id: string; name: string; type: "country" | "civilization"; subtitle: string }> = [];

    Object.values(countriesData).forEach((country) => {
      if (
        country.name.toLowerCase().includes(query) ||
        country.climate.type.toLowerCase().includes(query) ||
        country.religion.toLowerCase().includes(query)
      ) {
        results.push({
          id: country.id,
          name: country.name,
          type: "country",
          subtitle: `Country • ${country.capital}`,
        });
      }
    });

    civilizationsData.forEach((civ) => {
      if (civ.name.toLowerCase().includes(query) || civ.era.toLowerCase().includes(query)) {
        results.push({
          id: civ.id,
          name: civ.name,
          type: "civilization",
          subtitle: `Empire • ${civ.timeSpan}`,
        });
      }
    });

    return results.slice(0, 5);
  };

  const sidebarItems = [
    { id: "ai" as PanelType, icon: MessageSquare, label: "ASK" },
    { id: "graph" as PanelType, icon: Network, label: "CONNECT" },
    { id: "cards" as PanelType, icon: BookOpen, label: "DISCOVER" },
    { id: "layers" as PanelType, icon: LayoutGrid, label: "LAYERS" },
  ];

  const searchResults = getSearchResults();

  return (
    <div className="flex flex-col h-screen bg-[#020204] overflow-hidden select-none relative selection:bg-[#f59e0b]/30">
      
      {/* ── DESKTOP ONLY: TOP NAVBAR ── */}
      <div className="hidden md:block">
        <Navbar activeEra={activeEra} onSearchSelect={handleSearchSelect} />
      </div>

      {/* ── MOBILE ONLY: MINIMAL FLOATING COMPASS ICON NAVIGATION ── */}
      <div className="md:hidden absolute top-4 right-4 z-50 flex items-center gap-2">
        {/* Floating trigger button collapses to a single icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-12 h-12 rounded-full border border-[#f59e0b]/40 bg-[#060609]/90 flex items-center justify-center shadow-lg text-[#f59e0b] hover:text-white hover:border-[#00f0ff]/50 transition-all"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#00f0ff]" /> : <Compass className="w-5 h-5 animate-spin-slow" />}
        </button>
      </div>

      {/* Mobile Menu Expanded Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute inset-0 bg-[#030408]/95 z-40 p-6 flex flex-col pt-20"
          >
            {/* Minimal Mobile Search */}
            <div className="relative w-full mb-6">
              <div className="flex items-center bg-black/50 border border-zinc-800 rounded-lg px-3.5 py-2.5 focus-within:border-[#f59e0b] transition-all">
                <Search className="w-4 h-4 text-zinc-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search countries, empires, climates..."
                  className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-[#060609] border border-[#f59e0b]/30 rounded-md shadow-2xl p-2 z-50">
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      className="w-full text-left px-2 py-2 hover:bg-[#f59e0b]/10 rounded text-xs text-zinc-300 flex flex-col font-mono border-b border-zinc-900/50 last:border-0"
                      onClick={() => {
                        handleSearchSelect(res.type, res.id);
                        setSearchQuery("");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="text-white font-semibold">{res.name}</span>
                      <span className="text-[9px] text-zinc-500 mt-0.5">{res.subtitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Floating Navigation Buttons inside overlay */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePanel === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePanel(isActive ? null : item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-3 border text-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#f59e0b]/20 border-2 border-[#f59e0b] text-[#f59e0b] scale-105"
                        : "border-zinc-800/50 bg-black/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-bold tracking-widest">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Era Selection inside mobile overlay */}
            <div className="border-t border-zinc-900 pt-6 font-mono text-center">
              <span className="text-[10px] text-zinc-600 block tracking-widest uppercase mb-3">SELECT ERA FOCUS</span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {(["ancient", "medieval", "colonial", "modern", "future"] as EraType[]).map((era) => (
                  <button
                    key={era}
                    onClick={() => {
                      setActiveEra(era);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-[9px] rounded uppercase border tracking-widest transition-all ${
                      activeEra === era
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                        : "border-zinc-900 bg-black/20 text-zinc-500"
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT (MAP, HUD, TIMELINE) ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        
        {/* DESKTOP: Minimal floating exploration tools */}
        <div className="hidden md:flex w-20 shrink-0 flex-col items-center justify-center py-8 space-y-6 z-20">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(isActive ? null : item.id)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-[#f59e0b]/20 border-2 border-[#f59e0b] text-[#f59e0b] scale-110 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                    : "border border-zinc-900/50 bg-black/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 hover:scale-105"
                }`}
                title={item.label}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </div>

        {/* LEFT COMPONENT DRAWER OVERLAY (Cinematic travel-like slide) */}
        <AnimatePresence mode="wait">
          {activePanel && (
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 h-full w-full sm:w-96 z-30 shrink-0 border-r border-zinc-900/50 bg-[#020204]/98 flex flex-col min-h-0 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <div className="absolute right-3 top-3 z-50 sm:hidden">
                <button
                  onClick={() => setActivePanel(null)}
                  className="p-1.5 rounded-full bg-zinc-950 border border-zinc-900 text-zinc-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activePanel === "ai" && (
                <AiInsightEngine
                  externalQuery={pendingQuery}
                  onClearExternalQuery={() => setPendingQuery(null)}
                />
              )}
              {activePanel === "graph" && <KnowledgeGraph />}
              {activePanel === "cards" && <ExplorationCards />}
              {activePanel === "layers" && (
                <div className="flex-1 min-h-0 overflow-y-auto p-6 bg-black/40">
                  <div className="text-sm font-serif font-bold tracking-wide text-zinc-400 mb-6">View Layers</div>
                  <LayerControl activeLayers={activeLayers} onToggleLayer={toggleLayer} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE MAP LIBRE CENTER ENVIRONMENT */}
        <div className="flex-1 relative min-h-0 min-w-0 overflow-hidden z-0 isolate flex flex-col">
          <div className="flex-1 relative min-h-0 min-w-0 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
              <MapLibreGlobeGlobe 
                activeEra={activeEra}
                activeLayers={activeLayers}
                activeCountryId={activeCountryId}
                onSelectCountry={setActiveCountryId}
                onSelectCivilization={(civId) => {
                  const civ = civilizationsData.find((c) => c.id === civId);
                  if (civ) {
                    setActiveEra(civ.era);
                    setActiveCountryId(null);
                  }
                }}
              />
            </div>

            {/* Cinematic Telemetry HUD overlays (Floating natively on the globe) */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-500 pointer-events-none space-y-1.5 z-10 bg-black/25 backdrop-blur-sm p-3 rounded-lg border border-zinc-900/45">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-zinc-400 font-semibold uppercase tracking-wider">LENS FOCUS // {activeEra} ERA</span>
              </div>
              <div className="text-zinc-600">
                PROJECTION: MAPLIBRE 3D GLOBE
              </div>
              <div>LAYERS ENGAGED: <span className="text-[#f59e0b] uppercase font-bold">{activeLayers.length} FILTERS</span></div>
            </div>

            {/* Responsive Country Panel overlay (Bottom sheet on mobile, Right slider on desktop) */}
            <AnimatePresence>
              {activeCountryId && (
                <CountryPanel
                  countryId={activeCountryId}
                  onClose={() => setActiveCountryId(null)}
                  onAskQuestion={handleAskQuestion}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Immersive bottom timeline overlay */}
          <div className="shrink-0 p-4 border-t border-zinc-900 bg-[#020204]/80 backdrop-blur-md z-20">
            <TimelineSlider 
              activeEra={activeEra} 
              onEraChange={setActiveEra} 
              selectedEventId={null} 
              onSelectEvent={function (id: string | null): void {
                throw new Error("Function not implemented.");
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
