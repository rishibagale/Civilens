"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Globe, CloudRain, Compass, HeartHandshake, Briefcase, BookOpen, Scroll, Flame, HelpCircle, type LucideIcon } from "lucide-react";
import { countriesData } from "@/data/countriesData";

interface CountryPanelProps {
  countryId: string | null;
  onClose: () => void;
  onAskQuestion?: (question: string) => void;
}

type TabType = "overview" | "geography" | "history" | "culture" | "ai_analysis";

// Provocative, curated country-specific questions (Carl Sagan/interdisciplinary tone)
const COUNTRY_RABBIT_HOLES: Record<string, string[]> = {
  EG: [
    "How did the Nile flood shape ancient Egyptian concepts of mathematical order?",
    "Why was Egypt uniquely vulnerable to sudden solar cycle fluctuations?",
    "How did desert boundary geography inspire Pharaonic absolute state structures?"
  ],
  JP: [
    "Why did Japan's tectonic volatile setting foster a cultural appreciation for wabi-sabi?",
    "How did island self-preservation during Sakoku transform into technical micro-precision?",
    "Why did Japan's rugged volcanic slopes prevent the rise of horizontal land-owning lords?"
  ],
  IS: [
    "How did Iceland's volcanic-subarctic setting shape early concepts of law and isolation?",
    "Why did the lack of grains in historical Iceland lead to a hyper-rich oral literary tradition?",
    "How does sub-glacial geothermal energy rewrite modern clean-technology boundaries?"
  ],
  IN: [
    "How did the Indian monsoon dual caloric cycles trigger the rise of rigid social hierarchies?",
    "Why did the high biodiversity of India's river systems select for strong vegetarian philosophies?",
    "How did mountain range barriers shape India's immense linguistic fragmentation?"
  ],
  BR: [
    "How does the Amazonian hydrological basin act as a global climate flywheel?",
    "Why did early Brazilian plantation landscapes trigger a deeply syncretic racial matrix?",
    "How did the lack of heavy pack animals alter indigenous migration pathways?"
  ],
  NO: [
    "How did cold coastal fjord terrain forge the decentralized Viking assembly structures?",
    "Why did marine protein dependence force early Norse deep-sea exploration?",
    "How did the long winter isolation cycle affect historical Norse social cooperation?"
  ]
};

export default function CountryPanel({ countryId, onClose, onAskQuestion }: CountryPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  if (!countryId) return null;

  const data = countriesData[countryId];
  if (!data) return null;

  const tabs: Array<{ id: TabType; label: string; icon: LucideIcon }> = [
    { id: "overview", label: "OVERVIEW", icon: Globe },
    { id: "geography", label: "GEOGRAPHY", icon: CloudRain },
    { id: "history", label: "HISTORY", icon: Compass },
    { id: "culture", label: "CULTURE", icon: HeartHandshake },
    { id: "ai_analysis", label: "AI REPORT", icon: Scroll },
  ];

  // Retrieve rabbit holes for current country, fall back if missing
  const rabbitHoles = COUNTRY_RABBIT_HOLES[data.id] || [
    `How does ${data.name}'s specific landscape influence its modern political systems?`,
    `What are the invisible climate connections that bind ${data.name} to its neighbors?`
  ];

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 180 }}
      // Bottom sheet layout on mobile, sliding right panel on desktop
      className="fixed bottom-0 left-0 w-full h-[75vh] md:absolute md:top-0 md:right-0 md:w-[480px] md:h-full z-40 glass-panel-heavy shadow-2xl flex flex-col rounded-t-3xl md:rounded-t-none"
    >
      {/* Visual drag indicator for mobile */}
      <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto my-3 shrink-0 md:hidden" />

      {/* Header */}
      <div className="px-5 py-4 border-b border-panel-border/30 flex items-center justify-between bg-black/40">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">
            {data.id === "EG" ? "🇪🇬" : data.id === "JP" ? "🇯🇵" : data.id === "IS" ? "🇮🇸" : data.id === "IN" ? "🇮🇳" : data.id === "BR" ? "🇧🇷" : data.id === "NO" ? "🇳🇴" : "🌍"}
          </div>
          <div>
            <h2 className="text-white text-base md:text-lg font-bold tracking-widest uppercase">
              {data.name}
            </h2>
            <p className="text-[8px] text-zinc-500 font-mono">CORE SYSTEM DATA RECORD: {data.id}-ALPHA</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white transition-all focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-panel-border/20 bg-black/10 overflow-x-auto shrink-0 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[70px] py-3 text-[9px] font-bold tracking-wider border-b-2 flex flex-col items-center justify-center transition-all space-y-1.5 ${
                activeTab === tab.id
                  ? "border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/5 font-extrabold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-thin pb-24">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#050508] border border-panel-border/30 rounded p-3 text-xs">
                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Capital City</span>
                <span className="text-white font-semibold">{data.capital}</span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded p-3 text-xs">
                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Population Metric</span>
                <span className="text-white font-semibold">{data.population}</span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded p-3 text-xs">
                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Primary Tongues</span>
                <span className="text-white font-semibold block truncate" title={data.languages.join(", ")}>
                  {data.languages.join(", ")}
                </span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded p-3 text-xs">
                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Religions Matrix</span>
                <span className="text-white font-semibold block truncate" title={data.religion}>
                  {data.religion}
                </span>
              </div>
            </div>

            {/* Economy Block */}
            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <Briefcase className="w-4 h-4 text-[#f59e0b]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">ECONOMIC CONTEXT</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                {data.economy.overview}
              </p>
              <div className="pt-1">
                <span className="text-[9px] text-zinc-500 uppercase block mb-1.5">Key Resource Pillars</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.economy.keyIndustries.map((ind, i) => (
                    <span key={i} className="text-[9px] bg-[#f59e0b]/5 border border-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Geography & Ecology */}
        {activeTab === "geography" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Climate Card */}
            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <CloudRain className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">CLIMATIC ENERGY</h3>
              </div>
              <div className="text-xs">
                <span className="text-zinc-500 uppercase text-[9px] block">CLIMATE CLASSIFICATION</span>
                <span className="text-[#00f0ff] font-bold">{data.climate.type}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                {data.climate.description}
              </p>
            </div>

            {/* Geography Details */}
            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <Globe className="w-4 h-4 text-[#f59e0b]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">PHYSIOGRAPHIC PROPERTIES</h3>
              </div>
              <div className="text-xs">
                <span className="text-zinc-500 uppercase text-[9px] block">Terrain Matrix</span>
                <p className="text-zinc-300 leading-relaxed text-xs block mt-0.5">{data.geography.terrain}</p>
              </div>
              <div className="pt-2">
                <span className="text-zinc-500 uppercase text-[9px] block mb-1">Key Landscapes</span>
                <div className="flex flex-wrap gap-1">
                  {data.geography.features.map((feat, i) => (
                    <span key={i} className="text-[9px] bg-white/5 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Environmental Adaptation */}
            <div className="border border-[#00f0ff]/20 bg-[#00f0ff]/5 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-[#00f0ff]/10 pb-1.5">
                <Flame className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                <h3 className="text-[10px] text-[#00f0ff] font-bold tracking-wider">CIVILIZATIONAL ADAPTATION</h3>
              </div>
              <div className="text-xs">
                <span className="text-[#00f0ff]/60 uppercase text-[8px] block">CRITICAL ADAPTIVE STRATEGY</span>
                <span className="text-white font-semibold text-xs block mt-0.5">{data.adaptation.title}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                {data.adaptation.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 3: History & Anthropology */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <Compass className="w-4 h-4 text-[#f59e0b]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">MIGRATION PATTERNS</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                {data.anthropology.migrationHistory}
              </p>
            </div>

            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <BookOpen className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">SOCIETAL FOREBEARS</h3>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[9px] block mb-1.5">Associated Empires</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.anthropology.ancientEmpires.map((emp, i) => (
                    <span key={i} className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-900/50">
                <span className="text-zinc-500 uppercase text-[9px] block">Historical Social Hierarchy</span>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed text-justify">
                  {data.anthropology.socialStructures}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Culture & Preservation */}
        {activeTab === "culture" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <HeartHandshake className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">ETHNOGRAPHIC INSIGHT MATRIX</h3>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                {data.culture.insights.map((ins, i) => (
                  <li key={i} className="relative pl-4 leading-relaxed text-justify">
                    <span className="absolute left-0 top-1 text-[#00f0ff]">•</span>
                    {ins}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-panel-border/20 bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border/10 pb-1.5">
                <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">DIETARY & PRESERVATION COGNITION</h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                {data.culture.foodCulture}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 5: AI Integration Report */}
        {activeTab === "ai_analysis" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 rounded p-5 space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/5 to-transparent pointer-events-none animate-scanline" />

              <div className="flex items-center space-x-2 border-b border-[#00f0ff]/20 pb-2.5">
                <Scroll className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="text-[10px] text-white font-bold tracking-widest uppercase">
                  AI INTEGRATED REPORT // DEEP SATELLITE SYNTHESIS
                </h3>
              </div>

              <div className="font-sans text-xs md:text-[13px] text-zinc-200 leading-relaxed space-y-4 text-justify">
                {data.aiAnalysis.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="border-t border-[#00f0ff]/10 pt-3 flex justify-between items-center text-[8px] text-zinc-500 font-mono">
                <span>SYNAPSE MODEL: SAGAN-EXPLORER v3.5</span>
                <span>MATCH COMPATIBILITY: 99.98%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── INTERACTIVE RABBIT HOLE SECTION ── */}
        <div className="border border-[#f59e0b]/30 bg-[#f59e0b]/5 rounded p-4 space-y-3">
          <div className="flex items-center space-x-2 border-b border-[#f59e0b]/10 pb-1.5">
            <HelpCircle className="w-4 h-4 text-[#f59e0b]" />
            <h3 className="text-[10px] text-white font-bold tracking-wider uppercase">✦ Curiosities to Fall Into</h3>
          </div>
          <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
            Click to activate the AI Insight Engine and dive down a localized rabbit hole:
          </p>
          <div className="flex flex-col gap-2 pt-1">
            {rabbitHoles.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskQuestion?.(q)}
                className="w-full text-left font-mono text-[11px] text-[#00f0ff] hover:text-[#f59e0b] bg-black/40 hover:bg-black/80 px-3 py-2.5 rounded border border-zinc-900 hover:border-[#f59e0b]/30 transition-all leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
