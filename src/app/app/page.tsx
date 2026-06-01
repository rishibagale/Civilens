"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CountryPanel from "@/components/CountryPanel";
import LayerControl from "@/components/LayerControl";
import TimelineSlider from "@/components/TimelineSlider";
import { MessageSquare, Network, BookOpen, LayoutGrid, Search, X, Compass, Map } from "lucide-react";
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
  const [activeLayers, setActiveLayers] = useState<string[]>([
    "climate",
    "biodiversity",
    "trade_routes",
    "migration_flows",
  ]);
  // Default null so map is immediately visible — user opens panels by tapping icons
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Track which timeline event is selected (used for map fly-to)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSearchSelect = (type: "country" | "civilization", id: string) => {
    if (type === "country") {
      setActiveCountryId(id);
      setMobileMenuOpen(false);
      return;
    }
    const civ = civilizationsData.find((c) => c.id === id);
    if (civ) {
      setActiveEra(civ.era);
      setActiveCountryId(null);
    }
    setMobileMenuOpen(false);
  };

  const handleAskQuestion = (question: string) => {
    setPendingQuery(question);
    setActivePanel("ai");
  };

  const handleSelectEvent = (id: string | null) => {
    setSelectedEventId(id);
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
    <div className="flex flex-col bg-[#020204] overflow-hidden select-none relative selection:bg-[#f59e0b]/30" style={{ height: "100dvh" }}>
      
      {/* ── DESKTOP ONLY: TOP NAVBAR ── */}
      <div className="hidden md:block shrink-0">
        <Navbar activeEra={activeEra} onSearchSelect={handleSearchSelect} />
      </div>

      {/* ── MOBILE ONLY: FLOATING HEADER BAR ── */}
      <div className="md:hidden shrink-0 flex items-center justify-between px-4 py-3 bg-[#020204]/90 backdrop-blur-sm border-b border-zinc-900/60 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full border border-[#f59e0b]/50 bg-[#f59e0b]/5 flex items-center justify-center">
            <Map className="w-3 h-3 text-[#f59e0b]" />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Earth Intelligence</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Era indicator */}
          <span className="text-[9px] font-mono text-[#00f0ff] uppercase border border-[#00f0ff]/30 px-2 py-0.5 rounded bg-[#00f0ff]/5">
            {activeEra}
          </span>
          {/* Menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full border border-[#f59e0b]/40 bg-[#060609]/90 flex items-center justify-center text-[#f59e0b] hover:border-[#00f0ff]/50 transition-all"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#00f0ff]" /> : <Compass className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute inset-0 bg-[#030408]/97 z-50 p-5 flex flex-col pt-16 overflow-y-auto"
            style={{ top: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Mobile Search */}
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
                      }}
                    >
                      <span className="text-white font-semibold">{res.name}</span>
                      <span className="text-[9px] text-zinc-500 mt-0.5">{res.subtitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Panel Navigation Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
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
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border text-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#f59e0b]/20 border-2 border-[#f59e0b] text-[#f59e0b] scale-105"
                        : "border-zinc-800/50 bg-black/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-bold tracking-widest">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Era Selection */}
            <div className="border-t border-zinc-900 pt-5 font-mono text-center">
              <span className="text-[10px] text-zinc-600 block tracking-widest uppercase mb-3">SELECT ERA</span>
              <div className="flex flex-wrap justify-center gap-2">
                {(["ancient", "medieval", "colonial", "modern", "future"] as EraType[]).map((era) => (
                  <button
                    key={era}
                    onClick={() => {
                      setActiveEra(era);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-[9px] rounded-lg uppercase border tracking-widest transition-all ${
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

            {/* View Map CTA */}
            <div className="mt-auto pt-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl border border-zinc-800 bg-black/40 text-zinc-300 text-sm font-serif tracking-wide flex items-center justify-center gap-2 hover:border-[#f59e0b]/40 hover:text-[#f59e0b] transition-all"
              >
                <Map className="w-4 h-4" />
                Back to Globe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT (MAP, SIDEBAR, TIMELINE) ── */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden relative">

        {/* DESKTOP: Floating sidebar icon strip */}
        <div className="hidden md:flex w-16 shrink-0 flex-col items-center justify-center py-8 space-y-4 z-20 bg-black/30">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(isActive ? null : item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-[#f59e0b]/25 border-2 border-[#f59e0b] text-[#f59e0b] scale-110 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                    : "border border-zinc-800/60 bg-black/40 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 hover:scale-105"
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>

        {/* LEFT COMPONENT DRAWER OVERLAY (slides in from left) */}
        <AnimatePresence mode="wait">
          {activePanel && (
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 h-full w-[85vw] sm:w-96 md:w-96 z-30 shrink-0 border-r border-zinc-900/60 bg-[#020204]/98 flex flex-col min-h-0 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              {/* Close button visible on all screens */}
              <div className="absolute right-3 top-3 z-50">
                <button
                  onClick={() => setActivePanel(null)}
                  className="p-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
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
                <LayerControl activeLayers={activeLayers} onToggleLayer={toggleLayer} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE MAP CENTER */}
        <div className="flex-1 relative min-h-0 w-full overflow-hidden z-0 isolate flex flex-col">
          {/* Map Area */}
          <div className="flex-1 relative w-full min-h-0 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <MapLibreGlobeGlobe
                activeEra={activeEra}
                activeLayers={activeLayers}
                activeCountryId={activeCountryId}
                onSelectCountry={(id) => {
                  setActiveCountryId(id);
                }}
                onSelectCivilization={(civId) => {
                  const civ = civilizationsData.find((c) => c.id === civId);
                  if (civ) {
                    setActiveEra(civ.era);
                    setActiveCountryId(null);
                  }
                }}
                selectedEventId={selectedEventId}
              />
            </div>

            {/* Cinematic HUD Overlays */}
            <div className="absolute top-3 left-3 font-mono text-[8px] text-zinc-500 pointer-events-none space-y-1 z-10 bg-black/30 backdrop-blur-sm p-2.5 rounded-lg border border-zinc-900/50">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-zinc-400 font-semibold uppercase tracking-wider">
                  {activeEra} ERA
                </span>
              </div>
              <div className="text-zinc-600">MAPLIBRE 3D GLOBE</div>
              <div>
                LAYERS: <span className="text-[#f59e0b] uppercase font-bold">{activeLayers.length}</span>
              </div>
            </div>

            {/* Mobile: floating action buttons on map (visible when menu is closed) */}
            <div className="md:hidden absolute bottom-6 right-4 z-20 flex flex-col gap-3">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePanel === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePanel(isActive ? null : item.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-xl transition-all backdrop-blur-sm ${
                      isActive
                        ? "bg-[#f59e0b]/30 border-[#f59e0b] text-[#f59e0b] scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        : "bg-[#020204]/80 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:scale-105"
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                );
              })}
            </div>

            {/* Country Panel (bottom sheet on mobile, right slide on desktop) */}
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

          {/* Timeline Slider — bottom strip */}
          <div className="shrink-0 border-t border-zinc-800/60 bg-black/50 z-20" style={{ height: "35vh", minHeight: "200px" }}>
            <TimelineSlider
              activeEra={activeEra}
              onEraChange={setActiveEra}
              selectedEventId={selectedEventId}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
