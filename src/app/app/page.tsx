"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CountryPanel from "@/components/CountryPanel";
import LayerControl from "@/components/LayerControl";
import TimelineSlider from "@/components/TimelineSlider";
import EventDetailPanel from "@/components/EventDetailPanel";
import { MessageSquare, Network, BookOpen, LayoutGrid, Search, X, Compass, Map, ArrowLeft } from "lucide-react";
import { historicalEvents, type HistoricalEvent } from "@/data/historicalEvents";
import { civilizationsData } from "@/data/civilizationsData";
import { countriesData } from "@/data/countriesData";
import MapLibreGlobeGlobe from "@/components/MapLibreGlobeGlobe";
import MobileBottomNav from "@/components/MobileBottomNav";

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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Track which timeline event is selected (used for map fly-to)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Listen for toggle-timeline custom event from MobileBottomNav
  useEffect(() => {
    const handler = () => setTimelineExpanded((prev) => !prev);
    window.addEventListener("toggle-timeline", handler);
    return () => window.removeEventListener("toggle-timeline", handler);
  }, []);

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
    // Mutually exclusive: opening an event closes any open country panel
    if (id) setActiveCountryId(null);
  };

  const handleSelectCountry = (id: string | null) => {
    setActiveCountryId(id);
    // Mutually exclusive: opening a country closes any open event panel
    if (id) setSelectedEventId(null);
  };

  const handleAskAboutEvent = (event: HistoricalEvent) => {
    setPendingQuery(`Tell me more about ${event.title} (${event.era} era). ${event.description}`);
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
    <div className="flex flex-col bg-[#020204] overflow-hidden select-none relative selection:bg-[#f59e0b]/30" style={{ height: "100dvh" }}>
      
      {/* ── DESKTOP ONLY: TOP NAVBAR ── */}
      <div className="hidden md:block shrink-0">
        <Navbar activeEra={activeEra} onSearchSelect={handleSearchSelect} />
      </div>

      {/* ── MOBILE ONLY: SIMPLE HEADER BAR ── */}
      <div className="md:hidden shrink-0 flex items-center justify-between px-4 py-2.5 bg-[#020204]/90 backdrop-blur-sm border-b border-zinc-900/60 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full border border-[#f59e0b]/50 bg-[#f59e0b]/5 flex items-center justify-center">
            <Map className="w-3 h-3 text-[#f59e0b]" />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Civilens</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-[#00f0ff] uppercase border border-[#00f0ff]/30 px-2 py-0.5 rounded bg-[#00f0ff]/5">
            {activeEra}
          </span>
        </div>
      </div>

      {/* ── MOBILE: SEARCH MODAL ── */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-[#030408]/98 z-[60] flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60">
              <button
                onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }}
                className="shrink-0 p-2 rounded-full hover:bg-white/5 text-zinc-400"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center bg-black/50 border border-zinc-800 rounded-lg px-3 py-2.5 focus-within:border-[#f59e0b] transition-all">
                <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search countries, empires, climates..."
                  className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-3 space-y-1">
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      className="w-full text-left px-4 py-3 hover:bg-[#f59e0b]/10 rounded-xl text-sm text-zinc-300 flex flex-col font-mono transition-all"
                      onClick={() => {
                        handleSearchSelect(res.type, res.id);
                        setSearchQuery("");
                        setMobileSearchOpen(false);
                      }}
                    >
                      <span className="text-white font-semibold">{res.name}</span>
                      <span className="text-[10px] text-zinc-500 mt-0.5">{res.subtitle}</span>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-sm font-mono">
                  No results found
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">Quick Access</div>
                  {Object.values(countriesData).slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl flex items-center gap-3 transition-all"
                      onClick={() => { handleSearchSelect("country", c.id); setMobileSearchOpen(false); }}
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-mono font-bold">
                        {c.name.slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm text-white font-semibold">{c.name}</div>
                        <div className="text-[10px] text-zinc-500">{c.capital}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
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
              onSelectCountry={handleSelectCountry}
              onSelectCivilization={(civId) => {
                const civ = civilizationsData.find((c) => c.id === civId);
                if (civ) {
                  setActiveEra(civ.era);
                  setActiveCountryId(null);
                  setSelectedEventId(null);
                }
              }}
              onSelectEvent={handleSelectEvent}
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
              <div className="text-zinc-600">GLOBE ENGINE</div>
              <div>
                LAYERS: <span className="text-[#f59e0b] uppercase font-bold">{activeLayers.length}</span>
              </div>
            </div>

            {/* Mobile: no FABs — bottom nav handles navigation */}

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

            {/* Event Detail Panel — mutually exclusive with CountryPanel */}
            <EventDetailPanel
              eventId={selectedEventId}
              onClose={() => setSelectedEventId(null)}
              onSelectEvent={handleSelectEvent}
              onAskAboutEvent={handleAskAboutEvent}
            />
          </div>

          {/* Timeline Slider — bottom strip */}
          {/* Mobile: collapsible timeline, Desktop: fixed height */}
          <div className="md:shrink-0 border-t border-zinc-800/60 bg-black/50 z-20 md:block" style={{ height: timelineExpanded ? "55vh" : undefined, minHeight: undefined }}>
            {/* Mobile: show compact era strip when collapsed, full timeline when expanded */}
            {!timelineExpanded && (
              <div className="md:hidden">
                <TimelineSlider
                  activeEra={activeEra}
                  onEraChange={setActiveEra}
                  selectedEventId={selectedEventId}
                  onSelectEvent={handleSelectEvent}
                  compact
                />
              </div>
            )}
            {!timelineExpanded && (
              <div className="hidden md:block" style={{ height: "35vh", minHeight: "200px" }}>
                <TimelineSlider
                  activeEra={activeEra}
                  onEraChange={setActiveEra}
                  selectedEventId={selectedEventId}
                  onSelectEvent={handleSelectEvent}
                />
              </div>
            )}
            {timelineExpanded && (
              <div className="md:hidden" style={{ height: "55vh" }}>
                <TimelineSlider
                  activeEra={activeEra}
                  onEraChange={setActiveEra}
                  selectedEventId={selectedEventId}
                  onSelectEvent={handleSelectEvent}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ── MOBILE: BOTTOM NAV BAR ── */}
      <MobileBottomNav
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onSearchOpen={() => setMobileSearchOpen(true)}
      />
    </div>
  );
}
