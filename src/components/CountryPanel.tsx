"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, CloudRain, Compass, HeartHandshake, Briefcase, BookOpen, Scroll, Flame, HelpCircle, ChevronUp, ChevronDown, type LucideIcon } from "lucide-react";
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
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    setMobileExpanded(false);
  }, [countryId]);

  if (!countryId) return null;

  const data = countriesData[countryId];
  if (!data) return null;

  const tabs: Array<{ id: TabType; label: string; icon: LucideIcon }> = [
    { id: "overview", label: "Essence", icon: Globe },
    { id: "geography", label: "Landscape", icon: CloudRain },
    { id: "history", label: "Timeline", icon: Compass },
    { id: "culture", label: "Spirit", icon: HeartHandshake },
    { id: "ai_analysis", label: "Insight", icon: Scroll },
  ];

  // Retrieve rabbit holes for current country, fall back if missing
  const rabbitHoles = COUNTRY_RABBIT_HOLES[data.id] || [
    `How does ${data.name}'s specific landscape influence its modern political systems?`,
    `What are the invisible climate connections that bind ${data.name} to its neighbors?`
  ];

  return (
    <>
      {/* Backdrop overlay — only on mobile when expanded, NEVER on desktop */}
      {mobileExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-black/40 z-[39]"
          onClick={() => setMobileExpanded(false)}
        />
      )}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 180 }}
        className={`fixed bottom-0 left-0 w-full z-40 glass-panel-heavy shadow-2xl flex flex-col rounded-t-3xl md:rounded-t-none md:relative md:w-[480px] md:h-full md:shrink-0 border-t md:border-t-0 md:border-l border-panel-border/40 overflow-hidden transition-[height] duration-300 ease-out ${
          mobileExpanded ? "h-[82dvh]" : "h-[148px]"
        } md:h-full`}
      >
      {/* Visual drag indicator / tap to toggle for mobile */}
      <button
        onClick={() => setMobileExpanded((prev) => !prev)}
        className="w-full flex flex-col items-center justify-center py-2 md:hidden shrink-0 text-zinc-400 hover:text-white"
        aria-label={mobileExpanded ? "Collapse country details" : "Expand country details"}
      >
        <div className="w-12 h-1 bg-zinc-600 rounded-full mb-1" />
        {!mobileExpanded && (
          <div className="flex items-center gap-1 text-[9px] font-mono text-[#00f0ff] uppercase tracking-wider font-semibold">
            <span>Essence, Landscape & History</span>
            <ChevronUp className="w-3 h-3 animate-bounce" />
          </div>
        )}
      </button>

      {/* Header */}
      <div className="px-6 py-5 border-b border-panel-border/30 flex items-center justify-between bg-black/40">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">
            {data.id === "EG" ? "🇪🇬" : data.id === "JP" ? "🇯🇵" : data.id === "IS" ? "🇮🇸" : data.id === "IN" ? "🇮🇳" : data.id === "BR" ? "🇧🇷" : data.id === "NO" ? "🇳🇴" : "🌍"}
          </div>
          <div>
            <h2 className="text-white text-xl md:text-2xl font-serif font-bold tracking-wide">
              {data.name}
            </h2>
            <p className="text-[10px] text-zinc-500 font-serif">A story written in stone and sky</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
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
              className={`flex-1 min-w-[80px] py-4 text-xs font-serif font-medium tracking-wide border-b-2 flex flex-col items-center justify-center transition-all space-y-2 ${
                activeTab === tab.id
                  ? "border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline-block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin pb-24">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#050508] border border-panel-border/30 rounded-2xl p-4">
                <span className="text-[10px] text-zinc-500 uppercase block mb-2 font-serif">Capital</span>
                <span className="text-white font-semibold text-sm">{data.capital}</span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded-2xl p-4">
                <span className="text-[10px] text-zinc-500 uppercase block mb-2 font-serif">Population</span>
                <span className="text-white font-semibold text-sm">{data.population}</span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded-2xl p-4">
                <span className="text-[10px] text-zinc-500 uppercase block mb-2 font-serif">Languages</span>
                <span className="text-white font-semibold text-sm block truncate" title={data.languages.join(", ")}>
                  {data.languages.join(", ")}
                </span>
              </div>
              <div className="bg-[#050508] border border-panel-border/30 rounded-2xl p-4">
                <span className="text-[10px] text-zinc-500 uppercase block mb-2 font-serif">Beliefs</span>
                <span className="text-white font-semibold text-sm block truncate" title={data.religion}>
                  {data.religion}
                </span>
              </div>
            </div>

            {/* Economy Block */}
            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <Briefcase className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Economic Essence</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-serif">
                {data.economy.overview}
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-zinc-500 uppercase block mb-3 font-serif">Key Resources</span>
                <div className="flex flex-wrap gap-2">
                  {data.economy.keyIndustries.map((ind, i) => (
                    <span key={i} className="text-[10px] bg-[#f59e0b]/5 border border-[#f59e0b]/20 text-[#f59e0b] px-3 py-1.5 rounded-full">
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
            className="space-y-8"
          >
            {/* Climate Card */}
            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <CloudRain className="w-5 h-5 text-[#00f0ff]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Climate</h3>
              </div>
              <div className="text-sm">
                <span className="text-zinc-500 uppercase text-[10px] block font-serif">Type</span>
                <span className="text-[#00f0ff] font-semibold">{data.climate.type}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-serif">
                {data.climate.description}
              </p>
            </div>

            {/* Geography Details */}
            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <Globe className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Terrain</h3>
              </div>
              <div className="text-sm">
                <span className="text-zinc-500 uppercase text-[10px] block font-serif">Landscape</span>
                <p className="text-zinc-300 leading-relaxed text-sm block mt-1 font-serif">{data.geography.terrain}</p>
              </div>
              <div className="pt-3">
                <span className="text-zinc-500 uppercase text-[10px] block mb-3 font-serif">Features</span>
                <div className="flex flex-wrap gap-2">
                  {data.geography.features.map((feat, i) => (
                    <span key={i} className="text-[10px] bg-white/5 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Environmental Adaptation */}
            <div className="border border-[#00f0ff]/20 bg-[#00f0ff]/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-[#00f0ff]/10 pb-3">
                <Flame className="w-5 h-5 text-[#00f0ff] animate-pulse" />
                <h3 className="text-sm text-[#00f0ff] font-serif font-bold tracking-wide">Adaptation</h3>
              </div>
              <div className="text-sm">
                <span className="text-[#00f0ff]/60 uppercase text-[10px] block font-serif">Strategy</span>
                <span className="text-white font-semibold text-sm block mt-1">{data.adaptation.title}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-serif">
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
            className="space-y-8"
          >
            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <Compass className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Migration</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-serif">
                {data.anthropology.migrationHistory}
              </p>
            </div>

            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <BookOpen className="w-5 h-5 text-[#00f0ff]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Ancestry</h3>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block mb-3 font-serif">Empires</span>
                <div className="flex flex-wrap gap-2">
                  {data.anthropology.ancientEmpires.map((emp, i) => (
                    <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-900/50">
                <span className="text-zinc-500 uppercase text-[10px] block font-serif">Social Structure</span>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed text-justify font-serif">
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
            className="space-y-8"
          >
            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <HeartHandshake className="w-5 h-5 text-[#00f0ff]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Cultural Insights</h3>
              </div>
              <ul className="space-y-4 text-sm text-zinc-300">
                {data.culture.insights.map((ins, i) => (
                  <li key={i} className="relative pl-5 leading-relaxed text-justify font-serif">
                    <span className="absolute left-0 top-1 text-[#00f0ff]">•</span>
                    {ins}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-panel-border/20 bg-black/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 border-b border-panel-border/10 pb-3">
                <BookOpen className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">Food & Tradition</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-serif">
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
            className="space-y-6"
          >
            <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 rounded-2xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/5 to-transparent pointer-events-none animate-scanline" />

              <div className="flex items-center space-x-3 border-b border-[#00f0ff]/20 pb-4">
                <Scroll className="w-5 h-5 text-[#00f0ff]" />
                <h3 className="text-sm text-white font-serif font-bold tracking-wide">
                  Deep Insight
                </h3>
              </div>

              <div className="font-serif text-sm md:text-base text-zinc-200 leading-relaxed space-y-5 text-justify">
                {data.aiAnalysis.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="border-t border-[#00f0ff]/10 pt-4 flex justify-between items-center text-[10px] text-zinc-500 font-serif">
                <span>Civilens Model</span>
                <span>Analysis Complete</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── INTERACTIVE RABBIT HOLE SECTION ── */}
        <div className="border border-[#f59e0b]/30 bg-[#f59e0b]/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#f59e0b]/10 pb-3">
            <HelpCircle className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-sm text-white font-serif font-bold tracking-wide">✦ Fall Deeper</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed font-serif">
            Click to activate the AI and explore the mysteries of this land:
          </p>
          <div className="flex flex-col gap-3 pt-2">
            {rabbitHoles.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskQuestion?.(q)}
                className="w-full text-left font-serif text-sm text-[#00f0ff] hover:text-[#f59e0b] bg-black/40 hover:bg-black/80 px-5 py-3 rounded-xl border border-zinc-900 hover:border-[#f59e0b]/30 transition-all leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
