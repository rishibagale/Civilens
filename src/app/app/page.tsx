"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CountryPanel from "@/components/CountryPanel";
import LayerControl from "@/components/LayerControl";
import TimelineSlider from "@/components/TimelineSlider";
import EventDetailPanel from "@/components/EventDetailPanel";
import { MessageSquare, Network, BookOpen, LayoutGrid, Search, X, Compass, Map, ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { historicalEvents, type HistoricalEvent } from "@/data/historicalEvents";
import { civilizationsData } from "@/data/civilizationsData";
import { countriesData } from "@/data/countriesData";
import MapLibreGlobe from "@/components/MapLibreGlobe";
import HoloGlobe from "@/components/HoloGlobe";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ambientAudio } from "@/services/ambientAudio";
import Fuse from "fuse.js";

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
    "earth_imagery",
    "clouds",
    "paleoclimate",
    "genetics",
    "climate",
    "biodiversity",
    "trade_routes",
    "migration_flows",
  ]);
  const [globeEngine, setGlobeEngine] = useState<"holo" | "maplibre">("holo");
  // Default null so map is immediately visible — user opens panels by tapping icons
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Track which timeline event is selected (used for map fly-to)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Subscribe to procedural ambient audio state
  useEffect(() => {
    return ambientAudio.subscribe((enabled) => setSoundEnabled(enabled));
  }, []);

  // URL Deep-Linking: read initial event / country / era from URL query parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get("event");
    const countryParam = params.get("country");
    const eraParam = params.get("era") as EraType | null;

    if (eraParam && ["ancient", "medieval", "colonial", "modern", "future"].includes(eraParam)) {
      setActiveEra(eraParam);
    }
    if (eventParam) {
      const allEvents = Object.values(historicalEvents).flat();
      const ev = allEvents.find((e) => e.id === eventParam);
      if (ev) {
        setActiveEra(ev.era);
        setSelectedEventId(eventParam);
        setActiveCountryId(null);
      }
    } else if (countryParam && countriesData[countryParam]) {
      setActiveCountryId(countryParam);
      setSelectedEventId(null);
    }
  }, []);

  // Synchronize active selections with browser URL without reloading
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (activeEra && activeEra !== "ancient") params.set("era", activeEra);
    if (selectedEventId) params.set("event", selectedEventId);
    else if (activeCountryId) params.set("country", activeCountryId);

    const queryStr = params.toString();
    const nextUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [selectedEventId, activeCountryId, activeEra]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / / to search)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
        } else {
          const searchInput = document.getElementById("civilens-desktop-search") as HTMLInputElement | null;
          searchInput?.focus();
        }
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
        } else {
          const searchInput = document.getElementById("civilens-desktop-search") as HTMLInputElement | null;
          searchInput?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, []);

  // Listen for toggle-timeline custom event from MobileBottomNav
  useEffect(() => {
    const handler = () => setTimelineExpanded((prev) => !prev);
    window.addEventListener("toggle-timeline", handler);
    return () => window.removeEventListener("toggle-timeline", handler);
  }, []);

  // Google Maps pattern: auto-collapse timeline when event is selected
  useEffect(() => {
    if (selectedEventId) setTimelineExpanded(false);
  }, [selectedEventId]);

  // Auto-collapse timeline when another panel opens
  useEffect(() => {
    if (activePanel) setTimelineExpanded(false);
  }, [activePanel]);

  // Google Maps pattern: tap map = dismiss everything
  const handleMapClick = useCallback(() => {
    setTimelineExpanded(false);
    setSelectedEventId(null);
    setActiveCountryId(null);
  }, []);

  // ESC key dismiss everything (Material Design + accessibility pattern)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        setSelectedEventId(null);
        setActiveCountryId(null);
        setTimelineExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSearchSelect = (type: "country" | "civilization" | "event", id: string) => {
    if (type === "country") {
      setActiveCountryId(id);
      setSelectedEventId(null);
      ambientAudio.playArrivalChime();
    } else if (type === "civilization") {
      const civ = civilizationsData.find((c) => c.id === id);
      if (civ) {
        setActiveEra(civ.era);
        setActiveCountryId(null);
        setSelectedEventId(null);
        ambientAudio.playArrivalChime();
      }
    } else if (type === "event") {
      const allEvents = Object.values(historicalEvents).flat();
      const ev = allEvents.find((e) => e.id === id);
      if (ev) {
        setActiveEra(ev.era);
        setSelectedEventId(id);
        setActiveCountryId(null);
        ambientAudio.playArrivalChime();
      }
    }
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleAskQuestion = (question: string) => {
    setPendingQuery(question);
    setActivePanel("ai");
  };

  const handleSelectEvent = (id: string | null) => {
    setSelectedEventId(id);
    if (id) {
      setActiveCountryId(null);
      ambientAudio.playArrivalChime();
    }
  };

  const handleSelectCountry = (id: string | null) => {
    setActiveCountryId(id);
    if (id) {
      setSelectedEventId(null);
      ambientAudio.playArrivalChime();
    }
  };

  const handleAskAboutEvent = (event: HistoricalEvent) => {
    setPendingQuery(`Tell me more about ${event.title} (${event.era} era). ${event.description}`);
    setActivePanel("ai");
  };

  type SearchResultItem = {
    id: string;
    name: string;
    type: "country" | "civilization" | "event";
    subtitle: string;
    tag: string;
    tagClass: string;
  };

  // Comprehensive Fuzzy Omnisearch with fuse.js across countries, empires, and historical events
  const searchResults: SearchResultItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const countryItems: SearchResultItem[] = Object.values(countriesData).map((c) => ({
      id: c.id,
      name: c.name,
      type: "country",
      subtitle: `Country • ${c.capital} • ${c.climate.type}`,
      tag: "COUNTRY",
      tagClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    }));

    const civItems: SearchResultItem[] = civilizationsData.map((civ) => ({
      id: civ.id,
      name: civ.name,
      type: "civilization",
      subtitle: `Empire • ${civ.era.toUpperCase()} (${civ.timeSpan})`,
      tag: "EMPIRE",
      tagClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    }));

    const allEvents = Object.values(historicalEvents).flat();
    const eventItems: SearchResultItem[] = allEvents.map((ev) => ({
      id: ev.id,
      name: ev.title,
      type: "event",
      subtitle: `${ev.year < 0 ? Math.abs(ev.year) + " BC" : ev.year + " CE"} • ${ev.era.toUpperCase()} • ${ev.impact.toUpperCase()}`,
      tag: "EVENT",
      tagClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    }));

    const allItems = [...countryItems, ...civItems, ...eventItems];

    const fuse = new Fuse(allItems, {
      keys: ["name", "subtitle", "id"],
      threshold: 0.38,
      distance: 90,
      minMatchCharLength: 1,
    });

    return fuse.search(searchQuery).map((r) => r.item).slice(0, 8);
  }, [searchQuery]);

  const sidebarItems = [
    { id: "ai" as PanelType, icon: MessageSquare, label: "ASK" },
    { id: "graph" as PanelType, icon: Network, label: "CONNECT" },
    { id: "cards" as PanelType, icon: BookOpen, label: "DISCOVER" },
    { id: "layers" as PanelType, icon: LayoutGrid, label: "LAYERS" },
  ];

  return (
    <div className="flex flex-col bg-[#020204] overflow-hidden select-none relative selection:bg-[#f59e0b]/30" style={{ height: "100dvh" }}>
      
      {/* ── DESKTOP ONLY: TOP NAVBAR ── */}
      <div className="hidden md:block shrink-0">
        <Navbar
          activeEra={activeEra}
          onSearchSelect={handleSearchSelect}
          soundEnabled={soundEnabled}
          onToggleSound={() => ambientAudio.toggleSound()}
        />
      </div>

      {/* ── MOBILE ONLY: FLOATING TOP SEARCH & ERA PILL (Overlays 100dvh Canvas) ── */}
      <div className="md:hidden absolute top-3 inset-x-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        {/* Search Pill */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="pointer-events-auto flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#060609]/85 backdrop-blur-xl border border-zinc-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-left touch-manipulation active:scale-[0.98] transition-all"
        >
          <Search className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
          <span className="text-xs font-mono text-zinc-400 truncate">Search Civilens...</span>
        </button>

        {/* Quick Audio Pill on Mobile */}
        <button
          onClick={() => ambientAudio.toggleSound()}
          className={`pointer-events-auto shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#060609]/85 backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.6)] touch-manipulation active:scale-95 transition-all ${
            soundEnabled
              ? "border-[#00f0ff]/50 text-[#00f0ff]"
              : "border-zinc-800/80 text-zinc-500"
          }`}
          title={soundEnabled ? "Mute ambient audio" : "Enable ambient audio"}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Quick Era Pill */}
        <button
          onClick={() => setTimelineExpanded((prev) => !prev)}
          className="pointer-events-auto shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#060609]/85 backdrop-blur-xl border border-[#00f0ff]/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-[10px] font-mono font-bold text-[#00f0ff] uppercase tracking-wider touch-manipulation active:scale-95 transition-all"
          title="Toggle Timeline"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          <span>{activeEra}</span>
        </button>
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
                  placeholder="Search countries, empires, events..."
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
                      key={`${res.type}-${res.id}`}
                      className="w-full text-left px-4 py-3 hover:bg-[#f59e0b]/10 rounded-xl text-sm text-zinc-300 flex items-center justify-between font-mono transition-all group"
                      onClick={() => {
                        handleSearchSelect(res.type, res.id);
                        setSearchQuery("");
                        setMobileSearchOpen(false);
                      }}
                    >
                      <div className="flex flex-col min-w-0 mr-2">
                        <span className="text-white font-semibold group-hover:text-[#f59e0b] transition-colors">{res.name}</span>
                        <span className="text-[10px] text-zinc-500 mt-0.5">{res.subtitle}</span>
                      </div>
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded border uppercase font-bold shrink-0 ${res.tagClass}`}>
                        {res.tag}
                      </span>
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

        {/* DESKTOP: Floating sidebar icon strip — VS Code activity bar pattern */}
        <div className="hidden md:flex w-16 shrink-0 flex-col items-center justify-center py-6 space-y-3 z-20 bg-black/30">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(isActive ? null : item.id)}
                className={`w-full flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 border-l-2 ${
                  isActive
                    ? "border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/8"
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" : ""}`} />
                <span className={`text-[8px] font-mono font-semibold tracking-wider mt-1 ${isActive ? "text-[#f59e0b]" : "text-zinc-500"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Backdrop for left drawer — visible on all screens */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 z-20"
              onClick={() => setActivePanel(null)}
            />
          )}
        </AnimatePresence>

        {/* LEFT COMPONENT DRAWER OVERLAY (slides in from left on desktop, bottom sheet on mobile) */}
        <AnimatePresence mode="wait">
          {activePanel && (
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 h-[82dvh] max-h-[85vh] rounded-t-3xl border-t border-zinc-800 bg-[#060609]/98 z-50 flex flex-col min-h-0 overflow-hidden shadow-2xl backdrop-blur-2xl md:absolute md:inset-auto md:left-0 md:top-0 md:h-full md:w-96 md:rounded-none md:border-t-0 md:border-r md:border-zinc-900/60 md:z-30"
            >
              {/* Drag indicator on mobile */}
              <div className="w-12 h-1 bg-zinc-600 rounded-full mx-auto my-2.5 shrink-0 md:hidden" />
              {/* Close button visible on all screens */}
              <div className="absolute right-3 top-3 z-50">
                <button
                  onClick={() => setActivePanel(null)}
                  className="p-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                  aria-label="Close panel"
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
              {activePanel === "graph" && (
                <KnowledgeGraph
                  onAskAboutNode={(node) => {
                    setPendingQuery(`Explain how ${node.label} (${node.category}) shapes civilizational development: ${node.description}`);
                    setActivePanel("ai");
                  }}
                />
              )}
              {activePanel === "cards" && <ExplorationCards />}
              {activePanel === "layers" && (
                <LayerControl activeLayers={activeLayers} onToggleLayer={toggleLayer} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE MAP CENTER + DETAIL COLUMN */}
        <div className="flex-1 relative min-h-0 w-full overflow-hidden z-0 isolate flex flex-col">
          {/* Map Area + Side Panel Container (Side-by-side flex row on desktop) */}
          <div className="flex-1 relative w-full min-h-0 overflow-hidden flex flex-col md:flex-row">
            {/* 3D Globe Container (shrinks smoothly when panel is open on desktop) */}
            <div className="flex-1 relative h-full min-w-0 overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                {globeEngine === "holo" ? (
                  <HoloGlobe
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
                    panelOpen={Boolean(activeCountryId || selectedEventId)}
                  />
                ) : (
                  <MapLibreGlobe
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
                    onMapClick={handleMapClick}
                  />
                )}
              </div>

              {/* Cinematic HUD Overlays (Desktop only) */}
              <div className="hidden md:block absolute top-3 left-3 font-mono text-[8px] text-zinc-500 pointer-events-auto space-y-1.5 z-20 bg-black/80 backdrop-blur-md p-2.5 rounded-lg border border-zinc-800 shadow-xl">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider">
                    {activeEra} ERA
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-zinc-500">ENGINE:</span>
                  <button
                    onClick={() => setGlobeEngine((prev) => (prev === "holo" ? "maplibre" : "holo"))}
                    className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#00f0ff] hover:text-white font-bold tracking-wider uppercase transition-all text-[8px]"
                    title="Switch between Three.js Earth and MapLibre"
                  >
                    {globeEngine === "holo" ? "THREE.JS EARTH" : "MAPLIBRE 3D"}
                  </button>
                </div>
                <div className="text-zinc-500">
                  LAYERS: <span className="text-[#f59e0b] uppercase font-bold">{activeLayers.length} ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Country Panel (bottom sheet on mobile, right column on desktop) */}
            <AnimatePresence>
              {activeCountryId && (
                <CountryPanel
                  countryId={activeCountryId}
                  onClose={() => setActiveCountryId(null)}
                  onAskQuestion={handleAskQuestion}
                  activeEra={activeEra}
                />
              )}
            </AnimatePresence>

            {/* Event Detail Panel (bottom sheet on mobile, right column on desktop) */}
            <EventDetailPanel
              eventId={selectedEventId}
              onClose={() => setSelectedEventId(null)}
              onSelectEvent={handleSelectEvent}
              onAskAboutEvent={handleAskAboutEvent}
            />
          </div>

          {/* Desktop Timeline Slider — fixed bottom strip */}
          <div className="hidden md:block shrink-0 border-t border-zinc-800/60 bg-black/50 z-20" style={{ height: "35vh", minHeight: "200px" }}>
            <TimelineSlider
              activeEra={activeEra}
              onEraChange={setActiveEra}
              selectedEventId={selectedEventId}
              onSelectEvent={handleSelectEvent}
            />
          </div>

          {/* Mobile Collapsible Timeline Drawer (Zero pixel footprint when closed) */}
          <AnimatePresence>
            {timelineExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
                  onClick={() => setTimelineExpanded(false)}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 220 }}
                  className="md:hidden fixed inset-x-0 bottom-0 z-50 h-[58dvh] rounded-t-3xl border-t border-zinc-800 bg-[#060609]/98 backdrop-blur-2xl flex flex-col min-h-0 overflow-hidden shadow-2xl"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60 shrink-0">
                    <div className="w-10 h-1 bg-zinc-600 rounded-full" />
                    <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-[#f59e0b]">
                      Civilizational Eras
                    </span>
                    <button
                      onClick={() => setTimelineExpanded(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                      aria-label="Close timeline"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden p-2">
                    <TimelineSlider
                      activeEra={activeEra}
                      onEraChange={(era) => {
                        setActiveEra(era);
                      }}
                      selectedEventId={selectedEventId}
                      onSelectEvent={handleSelectEvent}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE: FLOATING BOTTOM DOCK ── */}
      <MobileBottomNav
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        timelineOpen={timelineExpanded}
        onToggleTimeline={() => setTimelineExpanded((prev) => !prev)}
        hidden={selectedEventId !== null || activeCountryId !== null || activePanel !== null || timelineExpanded}
      />
    </div>
  );
}
