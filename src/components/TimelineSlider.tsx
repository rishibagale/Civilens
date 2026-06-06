"use client";

import React, { useState } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import { historicalEvents } from "@/data/historicalEvents";

type EraType = "ancient" | "medieval" | "colonial" | "modern" | "future";

interface TimelineSliderProps {
  activeEra: EraType;
  onEraChange: (era: EraType) => void;
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;
  /** Compact mode: shows only the era selector strip (no event cards) */
  compact?: boolean;
}

interface EraItem {
  id: EraType;
  label: string;
  span: string;
  description: string;
  accent: string;
}

export default function TimelineSlider({
  activeEra,
  onEraChange,
  selectedEventId,
  onSelectEvent,
  compact = false,
}: TimelineSliderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const eras: EraItem[] = [
    {
      id: "ancient",
      label: "ANCIENT",
      span: "3000 BC – 500 CE",
      description: "Pharaohs, Greek city-states, Roman Empire, Silk Road origins",
      accent: "text-amber-400 border-amber-400/60",
    },
    {
      id: "medieval",
      label: "MEDIEVAL",
      span: "500 – 1500 CE",
      description: "Viking expansion, Mongol Empire, Islamic Golden Age, Feudal Japan",
      accent: "text-orange-400 border-orange-400/60",
    },
    {
      id: "colonial",
      label: "COLONIAL",
      span: "1500 – 1950 CE",
      description: "Age of Discovery, Atlantic slave trade, Industrial Revolution",
      accent: "text-rose-400 border-rose-400/60",
    },
    {
      id: "modern",
      label: "MODERN",
      span: "1950 – Present",
      description: "Cold War, decolonization, globalization, digital revolution",
      accent: "text-cyber-cyan border-cyber-cyan/60",
    },
    {
      id: "future",
      label: "FUTURE",
      span: "2050+ CE",
      description: "Climate migrations, AI civilizations, post-nation state systems",
      accent: "text-cyber-violet border-cyber-violet/60",
    },
  ];

  const activeIndex = eras.findIndex((e) => e.id === activeEra);
  const progressPct = (activeIndex / (eras.length - 1)) * 100;

  return (
    <div className="w-full h-full flex flex-col font-mono bg-black/40 border-t border-zinc-800/60 overflow-hidden">
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b border-zinc-800/40 gap-3 bg-black/50">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-xs text-white font-bold tracking-widest uppercase">TEMPORAL EXPLORER</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-zinc-400 font-mono hidden sm:block">
            <span className="text-[#00f0ff] uppercase font-semibold">{eras[activeIndex].label}</span> • {eras[activeIndex].span}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded hover:bg-zinc-800/50 transition-all text-zinc-400 hover:text-white"
            title={isCollapsed ? "Expand timeline" : "Collapse timeline"}
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <>
          {/* Era Timeline — always shown */}
          <div className={`relative px-4 py-3 flex-shrink-0 ${compact ? "" : "border-b border-zinc-800/40"} bg-black/30`}>
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800/50 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-[#00f0ff] z-0 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />

            {/* Era nodes */}
            <div className="relative z-10 flex justify-between gap-2">
              {eras.map((era, idx) => {
                const isActive = era.id === activeEra;
                const isPast = idx < activeIndex;

                return (
                  <button
                    key={era.id}
                    onClick={() => onEraChange(era.id)}
                    className="group flex-1 flex flex-col items-center gap-1"
                    title={`${era.label} (${era.span}): ${era.description}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 text-xs font-bold
                        ${isActive
                          ? `bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]`
                          : isPast
                            ? `bg-white/10 border-white/20 text-white/60`
                            : `bg-black/50 border-zinc-700 text-zinc-500 group-hover:border-zinc-500 group-hover:text-zinc-300`
                        }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[7px] font-bold text-center truncate text-zinc-500 group-hover:text-zinc-300 transition-colors w-full">
                      {era.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Carousel — hidden in compact mode */}
          {!compact && (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col px-4 py-2">
            <div className="text-[8px] font-bold text-zinc-400 tracking-widest uppercase mb-2 flex-shrink-0">
              {historicalEvents[activeEra].length} HISTORICAL EVENTS
            </div>
            <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
              <div className="flex gap-2 min-w-min h-full pb-2">
                {historicalEvents[activeEra].length > 0 ? (
                  historicalEvents[activeEra].map((event) => {
                    const isSelected = selectedEventId === event.id;
                    const impactIcon = {
                      major: "⚡",
                      significant: "▪",
                      regional: "◆",
                    }[event.impact];

                    const impactColor = isSelected
                      ? "border-[#00f0ff] bg-[#00f0ff]/15 ring-1 ring-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                      : {
                          major: "border-red-500/50 bg-red-500/10 hover:border-red-500/70 hover:bg-red-500/15",
                          significant: "border-amber-500/50 bg-amber-500/10 hover:border-amber-500/70 hover:bg-amber-500/15",
                          regional: "border-cyan-500/50 bg-cyan-500/10 hover:border-cyan-500/70 hover:bg-cyan-500/15",
                        }[event.impact];

                    return (
                      <button
                        key={event.id}
                        onClick={() => onSelectEvent(isSelected ? null : event.id)}
                        className={`flex-shrink-0 w-56 border rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 flex flex-col gap-1.5 hover:shadow-lg ${impactColor}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[7px] font-mono text-zinc-400 font-semibold">{event.year}</span>
                          <span className="text-sm">{impactIcon}</span>
                        </div>
                        <div className="text-xs font-semibold leading-snug line-clamp-2 text-white group-hover:text-[#00f0ff] transition-colors">
                          {event.title}
                        </div>
                        {isSelected && (
                          <div className="text-[7px] text-zinc-300 leading-snug pt-1.5 border-t border-[#00f0ff]/30 mt-1 text-left">
                            {event.description}
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="text-xs text-zinc-500 flex items-center">No events this era</div>
                )}
              </div>
            </div>
          </div>
          )}
        </>
      )}
    </div>
  );
}

