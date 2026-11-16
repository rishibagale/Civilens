"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Zap,
  Sparkles,
  Scroll,
  Share2,
  Volume2,
  Loader2,
  ImageOff,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Clock,
  Compass,
  Thermometer,
  Dna,
  CloudRain,
  CalendarCheck,
  Building,
  Globe,
} from "lucide-react";
import { historicalEvents, type HistoricalEvent } from "@/data/historicalEvents";
import { fetchEventImage, formatYear, type EventImage } from "@/services/eventImages";

interface EventDetailPanelProps {
  eventId: string | null;
  onClose: () => void;
  onSelectEvent: (id: string | null) => void;
  onAskAboutEvent?: (event: HistoricalEvent) => void;
}

// Era-specific accent palette (matches the timeline)
const ERA_ACCENT: Record<
  HistoricalEvent["era"],
  { chip: string; gradient: string }
> = {
  ancient: {
    chip: "bg-amber-400/15 border-amber-400/40 text-amber-300",
    gradient: "from-amber-500/30 via-amber-700/10 to-transparent",
  },
  medieval: {
    chip: "bg-orange-400/15 border-orange-400/40 text-orange-300",
    gradient: "from-orange-500/30 via-orange-700/10 to-transparent",
  },
  colonial: {
    chip: "bg-rose-400/15 border-rose-400/40 text-rose-300",
    gradient: "from-rose-500/30 via-rose-700/10 to-transparent",
  },
  modern: {
    chip: "bg-cyber-cyan/15 border-cyber-cyan/40 text-cyber-cyan",
    gradient: "from-cyber-cyan/30 via-cyan-700/10 to-transparent",
  },
  future: {
    chip: "bg-cyber-violet/15 border-cyber-violet/40 text-cyber-violet",
    gradient: "from-cyber-violet/30 via-violet-700/10 to-transparent",
  },
};

const IMPACT_STYLE: Record<
  HistoricalEvent["impact"],
  { label: string; cls: string; icon: string }
> = {
  major: { label: "MAJOR", cls: "bg-red-500/15 border-red-500/50 text-red-300", icon: "⚡" },
  significant: { label: "SIGNIFICANT", cls: "bg-amber-500/15 border-amber-500/50 text-amber-300", icon: "▪" },
  regional: { label: "REGIONAL", cls: "bg-cyan-500/15 border-cyan-500/50 text-cyan-300", icon: "◆" },
};

export default function EventDetailPanel({
  eventId,
  onClose,
  onSelectEvent,
  onAskAboutEvent,
}: EventDetailPanelProps) {
  // Look up event by id (search across all eras)
  const event = useMemo<HistoricalEvent | null>(() => {
    if (!eventId) return null;
    for (const era of Object.values(historicalEvents)) {
      const found = era.find((e) => e.id === eventId);
      if (found) return found;
    }
    return null;
  }, [eventId]);

  // Image state
  const [image, setImage] = useState<EventImage | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    setMobileExpanded(false);
  }, [eventId]);

  useEffect(() => {
    if (!event?.imageQuery) {
      setImage(null);
      setImageError(false);
      return;
    }
    let cancelled = false;
    setImageLoading(true);
    setImageError(false);
    fetchEventImage(event.id, event.imageQuery)
      .then((img) => {
        if (cancelled) return;
        setImage(img);
        setImageLoading(false);
        if (!img) setImageError(true);
      })
      .catch(() => {
        if (cancelled) return;
        setImageLoading(false);
        setImageError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [event?.id, event?.imageQuery]);

  // Stop speech when event changes or panel closes
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [eventId]);

  // Related events
  const relatedEvents = useMemo<HistoricalEvent[]>(() => {
    if (!event?.relatedEvents?.length) return [];
    const all = Object.values(historicalEvents).flat();
    return event.relatedEvents
      .map((id) => all.find((e) => e.id === id))
      .filter((e): e is HistoricalEvent => Boolean(e));
  }, [event]);

  // Contemporaneous events worldwide ("Meanwhile Across the Globe")
  const synchronousEvents = useMemo<HistoricalEvent[]>(() => {
    if (!event) return [];
    const all = Object.values(historicalEvents).flat();
    const windowYears = Math.abs(event.year) > 500 ? 350 : 120;
    return all
      .filter(
        (e) =>
          e.id !== event.id &&
          Math.abs(e.year - event.year) <= windowYears &&
          e.coordinates &&
          (!event.coordinates ||
            Math.hypot(e.coordinates[0] - event.coordinates[0], e.coordinates[1] - event.coordinates[1]) > 10)
      )
      .slice(0, 4);
  }, [event]);

  if (!event) return null;

  const accent = ERA_ACCENT[event.era];
  const impact = IMPACT_STYLE[event.impact];
  const yearLabel = formatYear(event.year);

  // ── Handlers ────────────────────────────────────────────
  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/app?event=${event.id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = `${event.title}. ${yearLabel}. ${event.description}. ${event.narrative ?? ""}`;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 0.9;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  return (
    <AnimatePresence>
      {eventId && (
        <>
          {/* Backdrop overlay — only on mobile when expanded, NEVER on desktop */}
          {mobileExpanded && (
            <motion.div
              key="event-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/40 z-[39]"
              onClick={() => setMobileExpanded(false)}
            />
          )}
          <motion.div
            key="event-detail"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className={`fixed bottom-0 left-0 w-full z-40 glass-panel-heavy shadow-2xl flex flex-col rounded-t-3xl md:rounded-t-none border-t md:border-t-0 md:border-l border-panel-border/40 overflow-hidden md:relative md:w-[480px] md:h-full md:shrink-0 transition-[height] duration-300 ease-out ${
              mobileExpanded ? "h-[85dvh]" : "h-[155px]"
            } md:h-full`}
          >
          {/* Era atmospheric gradient overlay */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accent.gradient} opacity-50`}
          />

          {/* Drag indicator / tap to toggle (mobile) */}
          <button
            onClick={() => setMobileExpanded((prev) => !prev)}
            className="w-full flex flex-col items-center justify-center py-2 md:hidden relative z-10 shrink-0 text-zinc-400 hover:text-white"
            aria-label={mobileExpanded ? "Collapse event details" : "Expand event details"}
          >
            <div className="w-12 h-1 bg-zinc-600 rounded-full mb-1" />
            {!mobileExpanded && (
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#f59e0b] uppercase tracking-wider font-semibold">
                <span>Story, Climate & Genetics</span>
                <ChevronUp className="w-3 h-3 animate-bounce" />
              </div>
            )}
          </button>

          {/* Header */}
          <div className="relative shrink-0 px-6 pt-2 pb-4 border-b border-panel-border/30 flex items-start justify-between gap-3 bg-black/40">
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <span
                  className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${accent.chip}`}
                >
                  {event.era}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${impact.cls}`}
                >
                  {impact.icon} {impact.label}
                </span>
              </div>
              <h2 className="text-white text-2xl md:text-[26px] font-serif font-bold leading-tight font-cinzel">
                {event.title}
              </h2>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1.5 text-[11px] font-mono text-zinc-400">
                <Clock className="w-3 h-3" />
                <span className="text-zinc-200 font-semibold">{yearLabel}</span>
                {event.coordinates && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <Compass className="w-3 h-3" />
                    <span>
                      {event.coordinates[0].toFixed(2)}°, {event.coordinates[1].toFixed(2)}°
                    </span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-full hover:bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
              aria-label="Close event detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin relative">
            {/* ── HERO IMAGE ─────────────────────────────────── */}
            <div className="relative w-full aspect-[16/9] bg-black/60 overflow-hidden border-b border-panel-border/30">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              )}
              {image?.url && !imageLoading && (
                <motion.img
                  key={image.url}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={image.thumbUrl || image.url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              {!imageLoading && (!image?.url || imageError) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 gap-1.5">
                  <ImageOff className="w-6 h-6" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    {event.era} • {yearLabel}
                  </span>
                </div>
              )}
              {/* Era gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              {event.imageCaption && image?.url && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-[10px] text-zinc-300 font-serif italic leading-snug">
                  {event.imageCaption}
                </div>
              )}
              {image?.attribution && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[8px] text-zinc-400 font-mono max-w-[60%] truncate">
                  {image.attribution}
                </div>
              )}
            </div>

            {/* ── ARCHAEOLOGICAL EXCAVATION & CALIBRATED CHRONOLOGY ── */}
            {(event.siteName || event.exactDate) && (
              <div className="px-6 py-3 border-b border-panel-border/20 bg-amber-500/[0.04]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                    <Building className="w-3 h-3 text-amber-400" /> Excavation Site & Chronology
                  </div>
                  {event.datingMethod && (
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      {event.datingMethod}
                    </span>
                  )}
                </div>
                {event.siteName && (
                  <div className="text-xs text-white font-semibold flex items-baseline gap-1.5">
                    <span>{event.siteName}</span>
                    {event.modernCountry && (
                      <span className="text-[10px] text-zinc-400 font-mono">({event.modernCountry})</span>
                    )}
                  </div>
                )}
                {event.exactDate && (
                  <div className="text-[11px] text-zinc-300 font-mono mt-0.5 flex items-center gap-1.5">
                    <CalendarCheck className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{event.exactDate}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── QUICK FACTS ROW ──────────────────────────── */}
            <div className="px-6 py-4 grid grid-cols-2 gap-2.5 border-b border-panel-border/20 bg-black/20">
              <div className="bg-black/40 border border-panel-border/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 uppercase tracking-widest font-mono mb-1.5">
                  <MapPin className="w-3 h-3" /> Location
                </div>
                <div className="text-xs text-white font-semibold">
                  {event.coordinates
                    ? `${event.coordinates[0].toFixed(2)}°, ${event.coordinates[1].toFixed(2)}°`
                    : "Global"}
                </div>
              </div>
              <div className="bg-black/40 border border-panel-border/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 uppercase tracking-widest font-mono mb-1.5">
                  <Users className="w-3 h-3" /> Regions
                </div>
                <div className="flex flex-wrap gap-1">
                  {event.affectedRegions.slice(0, 4).map((r) => (
                    <span
                      key={r}
                      className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded"
                    >
                      {r}
                    </span>
                  ))}
                  {event.affectedRegions.length > 4 && (
                    <span className="text-[9px] text-zinc-500">
                      +{event.affectedRegions.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── DESCRIPTION (always) ─────────────────────── */}
            <div className="px-6 pt-5 pb-3">
              <p className="text-sm text-zinc-200 font-serif leading-relaxed text-justify">
                {event.description}
              </p>
            </div>

            {/* ── NARRATIVE (rich events only) ─────────────── */}
            {event.narrative && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-6 pb-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Scroll className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    The Story
                  </h3>
                </div>
                <div className="border-l-2 border-[#f59e0b]/40 pl-4 space-y-3 font-serif text-[13.5px] text-zinc-200 leading-relaxed text-justify">
                  {event.narrative.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── PALEOCLIMATE & ENVIRONMENTAL SHIFT MODULE ── */}
            {event.environmentalShift && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="px-6 pb-5"
              >
                <div className="border border-emerald-500/30 bg-emerald-500/[0.05] rounded-xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                        Paleoclimate & Environmental Shift
                      </h3>
                    </div>
                    {event.environmentalShift.temperatureDelta && (
                      <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold">
                        <Thermometer className="w-2.5 h-2.5" />
                        {event.environmentalShift.temperatureDelta}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-white font-semibold mb-1">
                    {event.environmentalShift.climateEvent}
                  </div>

                  {event.environmentalShift.droughtOrPluvial && (
                    <div className="text-[10px] font-mono text-emerald-300/80 mb-2">
                      Regime: {event.environmentalShift.droughtOrPluvial}
                    </div>
                  )}

                  <p className="text-[12px] text-zinc-200 font-serif leading-relaxed text-justify border-t border-emerald-500/20 pt-2 mt-2">
                    {event.environmentalShift.ecologicalImpact}
                  </p>
                </div>
              </motion.section>
            )}

            {/* ── HUMAN GENETICS & ADAPTIVE DIVERGENCE MODULE ── */}
            {event.geneticContext && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 pb-5"
              >
                <div className="border border-pink-500/30 bg-pink-500/[0.05] rounded-xl p-4 shadow-[0_0_20px_rgba(236,72,153,0.08)]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Dna className="w-4 h-4 text-pink-400" />
                    <h3 className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-bold">
                      Human Genetics & Adaptive Divergence
                    </h3>
                  </div>

                  {/* Adaptive Alleles Pill Badges */}
                  {event.geneticContext.adaptiveAlleles && event.geneticContext.adaptiveAlleles.length > 0 && (
                    <div className="mb-3">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Selective Alleles & Metabolic Sweeps:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {event.geneticContext.adaptiveAlleles.map((allele, i) => (
                          <span
                            key={i}
                            className="text-[9.5px] font-mono px-2 py-0.5 bg-pink-500/15 border border-pink-500/40 text-pink-200 rounded-md font-semibold flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-pink-400" />
                            {allele}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Haplogroups */}
                  {event.geneticContext.haplogroups && event.geneticContext.haplogroups.length > 0 && (
                    <div className="mb-2.5">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Ancestral Haplogroup Lineages:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {event.geneticContext.haplogroups.map((hg, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-800/80 border border-zinc-700 text-zinc-300 rounded"
                          >
                            {hg}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[12px] text-zinc-200 font-serif leading-relaxed text-justify border-t border-pink-500/20 pt-2 mt-2">
                    {event.geneticContext.demographicPattern}
                  </p>
                </div>
              </motion.section>
            )}

            {/* ── CAUSES & EFFECTS ─────────────────────────── */}
            {(event.causes?.length || event.effects?.length) ? (
              <section className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.causes && event.causes.length > 0 && (
                  <div className="border border-amber-500/20 bg-amber-500/[0.04] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <h3 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                        Causes
                      </h3>
                    </div>
                    <ul className="space-y-2 text-[12px] text-zinc-300 leading-relaxed">
                      {event.causes.map((c, i) => (
                        <li
                          key={i}
                          className="relative pl-3.5 before:content-['—'] before:absolute before:left-0 before:text-amber-500/60 before:font-mono"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {event.effects && event.effects.length > 0 && (
                  <div className="border border-cyan-500/20 bg-cyan-500/[0.04] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                        Effects
                      </h3>
                    </div>
                    <ul className="space-y-2 text-[12px] text-zinc-300 leading-relaxed">
                      {event.effects.map((e, i) => (
                        <li
                          key={i}
                          className="relative pl-3.5 before:content-['—'] before:absolute before:left-0 before:text-cyan-500/60 before:font-mono"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ) : null}

            {/* ── KEY FIGURES ──────────────────────────────── */}
            {event.keyFigures && event.keyFigures.length > 0 && (
              <section className="px-6 pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    Key Figures
                  </h3>
                </div>
                <div className="space-y-2">
                  {event.keyFigures.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-black/30 border border-panel-border/20 rounded-lg p-3"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
                        {f.name
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-semibold leading-tight">
                          {f.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                          {f.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TRAIL (if any) ─────────────────────────────── */}
            {event.trailPath && event.trailPath.length > 1 && (
              <section className="px-6 pb-5">
                <div className="border border-cyber-cyan/20 bg-cyber-cyan/[0.04] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-3.5 h-3.5 text-cyber-cyan" />
                    <h3 className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest font-bold">
                      Animated Path ({event.trailPath.length} points)
                    </h3>
                  </div>
                  <p className="text-[12px] text-zinc-300 leading-relaxed">
                    Watch the dashed trail animate across the globe from the highlighted origin to its furthest reach.
                  </p>
                </div>
              </section>
            )}

            {/* ── RELATED EVENTS ─────────────────────────────── */}
            {relatedEvents.length > 0 && (
              <section className="px-6 pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    Related Events
                  </h3>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
                  {relatedEvents.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectEvent(rel.id)}
                      className="shrink-0 w-48 text-left bg-black/40 border border-panel-border/30 hover:border-[#f59e0b]/50 rounded-lg p-3 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-zinc-500">
                          {formatYear(rel.year)}
                        </span>
                        <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-[#f59e0b] transition-colors" />
                      </div>
                      <div className="text-xs text-white font-semibold leading-tight line-clamp-2 group-hover:text-[#f59e0b] transition-colors">
                        {rel.title}
                      </div>
                      <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider mt-1.5">
                        {rel.era}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* ── PLANETARY SYNCHRONICITY: MEANWHILE ACROSS THE GLOBE ── */}
            {synchronousEvents.length > 0 && (
              <section className="px-6 pb-5">
                <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/[0.04] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <h3 className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest font-bold font-cinzel">
                        Meanwhile Across the Globe (c. {yearLabel})
                      </h3>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase">
                      Synchronicity
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-serif leading-relaxed">
                    While &ldquo;{event.title}&rdquo; unfolded, humanity was simultaneously making civilizational leaps across distant continents:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {synchronousEvents.map((syn) => (
                      <button
                        key={syn.id}
                        onClick={() => onSelectEvent(syn.id)}
                        className="p-3 rounded-xl bg-black/50 border border-zinc-800 hover:border-[#00f0ff]/50 transition-all text-left flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-mono text-[#00f0ff] font-bold">
                              {formatYear(syn.year)}
                            </span>
                            <span className="text-[8px] font-mono uppercase text-zinc-500">
                              {syn.era}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#00f0ff] transition-colors line-clamp-1 font-serif">
                            {syn.title}
                          </div>
                          <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1 leading-snug font-serif">
                            {syn.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[8.5px] font-mono text-zinc-500 group-hover:text-amber-300 mt-2">
                          <Compass className="w-3 h-3" />
                          <span>Rotate Earth to Site →</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── SLIM MESSAGE (no rich data) ────────────────── */}
            {!event.narrative &&
              !event.causes?.length &&
              !event.effects?.length &&
              !event.keyFigures?.length && (
                <section className="px-6 pb-5">
                  <div className="border border-panel-border/20 bg-black/20 rounded-xl p-5 text-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                      Curated Event
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      A full narrative, causes, effects, and key figures will be added to this event in a future exploration update.
                    </p>
                  </div>
                </section>
              )}

            {/* bottom spacer so footer buttons don't cover content */}
            <div className="h-24" />
          </div>

          {/* ── FOOTER ACTIONS ───────────────────────────────── */}
          <div className="relative shrink-0 border-t border-panel-border/30 bg-black/60 backdrop-blur-md p-3 flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                speaking
                  ? "bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]"
                  : "bg-black/40 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
              }`}
              title={speaking ? "Stop narration" : "Read aloud"}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border bg-black/40 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
              title="Copy link to this event"
            >
              {copied ? (
                <span className="text-[8px] font-mono text-[#39ff14]">OK</span>
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            {onAskAboutEvent && (
              <button
                onClick={() => onAskAboutEvent(event)}
                className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 border border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#f59e0b] hover:bg-[#f59e0b]/20 hover:border-[#f59e0b] transition-all text-xs font-mono uppercase tracking-widest font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI
              </button>
            )}
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
