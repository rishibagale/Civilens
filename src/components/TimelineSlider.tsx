"use client";

import React from "react";
import { Clock } from "lucide-react";
import { historicalEvents } from "@/data/historicalEvents";

type EraType = "ancient" | "medieval" | "colonial" | "modern" | "future";

interface TimelineSliderProps {
  activeEra: EraType;
  onEraChange: (era: EraType) => void;
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;
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
}: TimelineSliderProps) {
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
    <div className="w-full h-full flex flex-col font-mono bg-black/30 border-t border-panel-border overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-3 py-2 flex-shrink-0 border-b border-panel-border/50 gap-2">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3 h-3 text-cyber-cyan" />
          <span className="text-[7px] text-white font-bold tracking-widest uppercase">TEMPORAL</span>
        </div>
        <div className="text-[6.5px] text-gray-400 font-mono">
          <span className="text-cyber-cyan uppercase">{eras[activeIndex].label}</span> / {eras[activeIndex].span}
        </div>
      </div>

      {/* Compact Era Timeline */}
      <div className="relative px-3 py-2 flex-shrink-0 border-b border-panel-border/50">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-panel-border z-0" />
        <div
          className="absolute top-1/2 left-0 h-px bg-cyber-cyan z-0 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />

        {/* Era nodes - Tiny Version */}
        <div className="relative z-10 flex justify-between gap-1">
          {eras.map((era, idx) => {
            const isActive = era.id === activeEra;
            const isPast = idx < activeIndex;

            return (
              <button
                key={era.id}
                onClick={() => onEraChange(era.id)}
                className="group flex-1"
                title={`${era.label} (${era.span}): ${era.description}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 text-[6px] font-bold mx-auto
                    ${isActive
                      ? `bg-cyber-cyan/25 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.3)]`
                      : isPast
                        ? `bg-white/10 border-white/20 text-white/50`
                        : `bg-black/50 border-panel-border text-gray-500 group-hover:border-gray-400`
                    }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[6px] font-bold text-center mt-0.5 block truncate text-gray-500 group-hover:text-gray-300 transition-colors">
                  {era.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Carousel - Takes all remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col px-2 py-1.5">
        <div className="text-[6px] font-bold text-gray-400 tracking-widest uppercase mb-1 flex-shrink-0">
          {historicalEvents[activeEra].length} events
        </div>
        <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-1.5 min-w-min h-full pb-1">
            {historicalEvents[activeEra].length > 0 ? (
              historicalEvents[activeEra].map((event) => {
                const isSelected = selectedEventId === event.id;
                const impactIcon = {
                  major: "🔴",
                  significant: "🟠",
                  regional: "🔵",
                }[event.impact];
                
                const impactColor = isSelected
                  ? "border-cyber-cyan bg-cyber-cyan/15 ring-1 ring-cyber-cyan/50 shadow-[0_0_8px_rgba(0,240,255,0.2)] scale-[0.98]"
                  : {
                      major: "border-red-500/60 bg-red-500/8 hover:border-red-500",
                      significant: "border-orange-500/60 bg-orange-500/8 hover:border-orange-500",
                      regional: "border-cyan-500/60 bg-cyan-500/8 hover:border-cyan-500",
                    }[event.impact];

                return (
                  <button
                    key={event.id}
                    onClick={() => onSelectEvent(isSelected ? null : event.id)}
                    className={`flex-shrink-0 w-44 border rounded px-1.5 py-1 cursor-pointer transition-all duration-150 flex flex-col gap-0.5 hover:shadow-lg ${impactColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[6.5px] font-mono text-gray-400">{event.year}</span>
                      <span className="text-[8px]">{impactIcon}</span>
                    </div>
                    <div className="text-[6.5px] font-semibold leading-tight line-clamp-2 text-white">
                      {event.title}
                    </div>
                    {isSelected && (
                      <div className="text-[5.5px] text-gray-300 leading-tight pt-0.5 border-t border-cyber-cyan/30 mt-0.5 text-left">
                        {event.description}
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-[6px] text-gray-500 flex items-center">–</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

