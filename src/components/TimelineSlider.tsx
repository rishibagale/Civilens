"use client";

import React from "react";
import { Clock } from "lucide-react";

type EraType = "ancient" | "medieval" | "colonial" | "modern" | "future";

interface TimelineSliderProps {
  activeEra: EraType;
  onEraChange: (era: EraType) => void;
}

interface EraItem {
  id: EraType;
  label: string;
  span: string;
  description: string;
  accent: string;
}

export default function TimelineSlider({ activeEra, onEraChange }: TimelineSliderProps) {
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
    <div className="w-full glass-panel px-6 py-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-cyber-cyan" />
          <span className="text-[10px] text-white font-bold tracking-widest uppercase">Temporal Navigator</span>
        </div>
        <div className="text-[9px] text-gray-500 font-mono">
          ACTIVE: <span className="text-cyber-cyan">{eras[activeIndex].span}</span>
        </div>
      </div>

      {/* Era buttons with connecting line */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-[1px] bg-panel-border z-0" />
        <div
          className="absolute top-5 left-0 h-[1px] bg-cyber-cyan z-0 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />

        {/* Era nodes */}
        <div className="relative z-10 flex justify-between">
          {eras.map((era, idx) => {
            const isActive = era.id === activeEra;
            const isPast = idx < activeIndex;

            return (
              <button
                key={era.id}
                onClick={() => onEraChange(era.id)}
                className="flex flex-col items-center group"
                title={era.description}
              >
                {/* Node circle */}
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 text-[9px] font-bold
                    ${isActive
                      ? `bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110`
                      : isPast
                        ? `bg-white/5 border-white/30 text-white/60`
                        : `bg-black/30 border-panel-border text-gray-500 group-hover:border-gray-400 group-hover:text-gray-300`
                    }`}
                >
                  {idx + 1}
                </div>

                {/* Label below node */}
                <div className="mt-2 flex flex-col items-center">
                  <span
                    className={`text-[9px] font-bold tracking-wider transition-all duration-300 ${
                      isActive ? era.accent.split(" ")[0] : isPast ? "text-white/50" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {era.label}
                  </span>
                  <span className="text-[7px] text-gray-600 mt-0.5 hidden md:block">{era.span}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active era description */}
      <div className="mt-4 pt-3 border-t border-panel-border/50">
        <p className="text-[9px] text-gray-400 text-center leading-relaxed">
          <span className="text-white font-semibold">{eras[activeIndex].label} ERA:</span>{" "}
          {eras[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
