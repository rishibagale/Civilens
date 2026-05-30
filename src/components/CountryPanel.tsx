"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Globe, CloudRain, Trees, Compass, HeartHandshake, Briefcase, BookOpen, Scroll, Clock, Sparkles, type LucideIcon } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { countryEraData } from "@/data/empireData";
import { getCountryNarrative } from "@/data/country-narratives";

interface CountryPanelProps {
  countryId: string | null;
  onClose: () => void;
  activeEra?: "ancient" | "medieval" | "colonial" | "modern" | "future";
}

type TabType = "story" | "overview" | "geography" | "history" | "culture" | "ai_analysis";

export default function CountryPanel({ countryId, onClose, activeEra = "ancient" }: CountryPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("story");

  if (!countryId) return null;

  const data = countriesData[countryId];
  if (!data) return null;

  const tabs: Array<{ id: TabType; label: string; icon: LucideIcon }> = [
    { id: "story", label: "STORY", icon: Sparkles },
    { id: "overview", label: "OVERVIEW", icon: Globe },
    { id: "geography", label: "GEOGRAPHY", icon: CloudRain },
    { id: "history", label: "HISTORY", icon: Compass },
    { id: "culture", label: "CULTURE", icon: HeartHandshake },
    { id: "ai_analysis", label: "AI REPORT", icon: Scroll },
  ];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="absolute top-0 right-0 w-full md:w-[480px] h-full z-30 glass-panel-heavy shadow-2xl flex flex-col font-mono md:rounded-none rounded-tl-lg"
    >
      {/* Hero Header */}
      <div className="relative border-b border-panel-border bg-gradient-to-br from-black/50 to-black/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{data.id === "EG" ? "🇪🇬" : data.id === "JP" ? "🇯🇵" : data.id === "IS" ? "🇮🇸" : data.id === "IN" ? "🇮🇳" : data.id === "BR" ? "🇧🇷" : data.id === "NO" ? "🇳🇴" : "🌍"}</div>
              <div>
                <h2 className="text-2xl font-bold tracking-widest neon-text-cyan uppercase">
                  {data.name}
                </h2>
                <p className="text-[10px] text-gray-500 mt-1">INTEL RECORD SYSTEM ID: {data.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 border border-panel-border text-gray-400 hover:text-cyber-cyan transition-all hover:scale-110 active:scale-95"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            <div className="bg-black/40 border border-panel-border rounded px-2.5 py-1.5 backdrop-blur-sm">
              <span className="text-[7px] md:text-[8px] text-gray-500 uppercase block">Population</span>
              <span className="text-[9px] md:text-[10px] text-cyber-cyan font-bold">{data.population}</span>
            </div>
            <div className="bg-black/40 border border-panel-border rounded px-2.5 py-1.5 backdrop-blur-sm">
              <span className="text-[7px] md:text-[8px] text-gray-500 uppercase block">Climate</span>
              <span className="text-[9px] md:text-[10px] text-cyber-green font-bold truncate">{data.climate.type}</span>
            </div>
            <div className="bg-black/40 border border-panel-border rounded px-2.5 py-1.5 backdrop-blur-sm col-span-2 md:col-span-1">
              <span className="text-[7px] md:text-[8px] text-gray-500 uppercase block">Era</span>
              <span className="text-[9px] md:text-[10px] text-cyber-amber font-bold uppercase">{activeEra}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-panel-border bg-black/20 overflow-x-auto shrink-0 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 min-w-[75px] py-3 text-[9px] font-bold tracking-wider border-b-2 flex flex-col items-center justify-center transition-all space-y-1.5 relative group ${
                isActive
                  ? "border-cyber-cyan text-cyber-cyan bg-gradient-to-b from-cyber-cyan/10 to-black/20"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
              title={tab.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyber-cyan/5 rounded-t pointer-events-none"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              )}
              <Icon className={`w-4 h-4 transition-all ${isActive ? "drop-shadow-lg" : "group-hover:scale-110"}`} />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        {/* Tab 0: Story (NEW) */}
        {activeTab === "story" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {(() => {
              const narrative = getCountryNarrative(countryId, activeEra);

              if (!narrative) {
                return (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Sparkles className="w-8 h-8 mb-3 text-gray-600" />
                    <p className="text-xs font-mono">No narrative available for this era</p>
                  </div>
                );
              }

              return (
                <>
                  {/* Narrative Title */}
                  <div className="border-b border-panel-border pb-4 mb-2">
                    <h3 className="text-sm font-bold text-cyber-cyan mb-2 uppercase tracking-wider">{narrative.title}</h3>
                    <p className="text-[10px] text-gray-500">{narrative.era.toUpperCase()}</p>
                  </div>

                  {/* Main Narrative */}
                  <div className="space-y-4 py-2">
                    {narrative.narrative.split("\n\n").map((para, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-[11px] leading-relaxed text-gray-300"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>

                  {/* Key Insights */}
                  {narrative.keyInsights && narrative.keyInsights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border border-panel-border bg-gradient-to-br from-cyber-amber/5 to-black/30 rounded p-4 space-y-3 hover:border-cyber-amber/40 transition-colors"
                    >
                      <h4 className="text-[10px] font-bold text-cyber-amber tracking-wider uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyber-amber animate-pulse" />
                        Key Insights
                      </h4>
                      <ul className="space-y-2">
                        {narrative.keyInsights.map((insight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + i * 0.05 }}
                            className="text-[10px] text-gray-300 leading-relaxed flex gap-2 hover:text-cyber-amber transition-colors"
                          >
                            <span className="text-cyber-amber shrink-0 font-bold">→</span>
                            <span>{insight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Related Graph Nodes */}
                  {narrative.highlightedNodes && narrative.highlightedNodes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="border border-panel-border bg-gradient-to-br from-cyber-cyan/5 to-black/30 rounded p-4 space-y-3 hover:border-cyber-cyan/40 transition-colors"
                    >
                      <h4 className="text-[10px] font-bold text-cyber-cyan tracking-wider uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                        Connected Concepts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {narrative.highlightedNodes.slice(0, 8).map((node, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.03 }}
                            className="text-[9px] px-2.5 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan font-mono hover:bg-cyber-cyan/20 hover:border-cyber-cyan/60 hover:scale-110 hover:shadow-lg hover:shadow-cyber-cyan/20 transition-all cursor-pointer active:scale-95"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {node}
                          </motion.span>
                        ))}
                        {narrative.highlightedNodes.length > 8 && (
                          <span className="text-[9px] text-gray-600 px-1 py-1">
                            +{narrative.highlightedNodes.length - 8} more
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 border border-panel-border rounded p-3 text-xs">
                <span className="text-[9px] text-gray-500 uppercase block mb-1">Capital City</span>
                <span className="text-white font-semibold">{data.capital}</span>
              </div>
              <div className="bg-black/30 border border-panel-border rounded p-3 text-xs">
                <span className="text-[9px] text-gray-500 uppercase block mb-1">Population Metric</span>
                <span className="text-white font-semibold">{data.population}</span>
              </div>
              <div className="bg-black/30 border border-panel-border rounded p-3 text-xs">
                <span className="text-[9px] text-gray-500 uppercase block mb-1">Primary Tongues</span>
                <span className="text-white font-semibold block truncate" title={data.languages.join(", ")}>
                  {data.languages.join(", ")}
                </span>
              </div>
              <div className="bg-black/30 border border-panel-border rounded p-3 text-xs">
                <span className="text-[9px] text-gray-500 uppercase block mb-1">Religions Matrix</span>
                <span className="text-white font-semibold block truncate" title={data.religion}>
                  {data.religion}
                </span>
              </div>
            </div>

            {/* Economy Block */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Briefcase className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">ECONOMIC TELEMETRY</h3>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.economy.overview}
              </p>
              <div className="pt-2">
                <span className="text-[9px] text-gray-500 uppercase block mb-1">Anchor Industries</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.economy.keyIndustries.map((ind, i) => (
                    <span key={i} className="text-[9px] bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan px-2 py-0.5 rounded">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-1.5 text-[10px] text-gray-400">
                <span className="text-gray-500">Historical Trade Legacy:</span> {data.economy.tradeLegacy}
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
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-panel-border bg-gradient-to-br from-black/30 to-black/10 rounded p-4 space-y-3 hover:border-cyber-cyan/40 transition-colors"
            >
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <CloudRain className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">CLIMATE SYSTEM</h3>
              </div>
              <div className="text-xs">
                <span className="text-gray-500 uppercase text-[9px] block">CLIMATE TYPE</span>
                <span className="text-cyber-cyan font-bold">{data.climate.type}</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.climate.description}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-[10px]">
                <div className="bg-black/30 rounded p-2 hover:bg-black/40 transition-colors">
                  <span className="text-gray-500 uppercase text-[9px]">TEMP SPECTRUM</span>
                  <span className="text-white block mt-0.5 font-semibold">{data.climate.temperatureRange}</span>
                </div>
                <div className="bg-black/30 rounded p-2 hover:bg-black/40 transition-colors">
                  <span className="text-gray-500 uppercase text-[9px]">PRECIPITATION TYPE</span>
                  <span className="text-white block mt-0.5 font-semibold">{data.climate.rainfallPattern}</span>
                </div>
              </div>
            </motion.div>

            {/* Geography Details */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border border-panel-border bg-gradient-to-br from-black/30 to-black/10 rounded p-4 space-y-3 hover:border-cyber-green/40 transition-colors"
            >
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Trees className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">PHYSIOGRAPHIC PROPERTIES</h3>
              </div>
              <div className="text-xs">
                <span className="text-gray-500 uppercase text-[9px] block">Terrain Outline</span>
                <span className="text-white leading-relaxed text-[11px] block mt-0.5">{data.geography.terrain}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-black/30 rounded p-2 hover:bg-black/40 transition-colors">
                  <span className="text-gray-500 uppercase text-[9px]">Biodiversity Grade</span>
                  <span className="text-cyber-green block font-bold text-xs mt-0.5">{data.geography.biodiversityRating}</span>
                </div>
                <div className="bg-black/30 rounded p-2 hover:bg-black/40 transition-colors">
                  <span className="text-gray-500 uppercase text-[9px]">Ecosystem Matrices</span>
                  <span className="text-white block text-[10px] mt-0.5 font-semibold">{data.geography.ecosystems.length} Active Biospheres</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-gray-500 uppercase text-[9px] block mb-1">Key Geographic Features</span>
                <div className="flex flex-wrap gap-1">
                  {data.geography.features.map((feat, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.18 + i * 0.02 }}
                      className="text-[9px] bg-white/5 border border-panel-border text-gray-300 px-2 py-0.5 rounded hover:bg-white/10 hover:border-cyber-green/40 transition-all cursor-default"
                    >
                      {feat}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Environmental Adaptation */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-panel-border bg-gradient-to-br from-cyber-green/10 to-black/20 rounded p-4 space-y-3 hover:border-cyber-green/40 transition-colors"
            >
              <div className="flex items-center space-x-2 border-b border-cyber-green/30 pb-1.5">
                <Compass className="w-4 h-4 text-cyber-green animate-pulse" />
                <h3 className="text-[10px] text-cyber-green font-bold tracking-wider">CIVILIZATIONAL ADAPTATION</h3>
              </div>
              <div className="text-xs">
                <span className="text-cyber-green/60 uppercase text-[8px] block">CRITICAL ADAPTIVE STRATEGY</span>
                <span className="text-white font-semibold text-[11px] block mt-0.5">{data.adaptation.title}</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.adaptation.description}
              </p>
              {data.adaptation.physiologicalAdaptation && (
                <div className="pt-1.5 text-[10px] text-gray-400 border-t border-cyber-green/20">
                  <span className="text-cyber-green/60 font-semibold">Biochemical/Physiological:</span> {data.adaptation.physiologicalAdaptation}
                </div>
              )}
              {data.adaptation.technologicalAdaptation && (
                <div className="pt-1 text-[10px] text-gray-400">
                  <span className="text-cyber-green/60 font-semibold">Technological System:</span> {data.adaptation.technologicalAdaptation}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Tab 3: History & Anthropology */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* HISTORY BY ERA Timeline */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-4">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Clock className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">HISTORY BY ERA</h3>
              </div>

              <div className="space-y-3">
                {["ancient", "medieval", "colonial", "modern"].map((era) => {
                  const eraRecord = countryEraData.find(
                    (d) => d.countryId === countryId && d.era === era
                  );
                  if (!eraRecord) return null;

                  const eraColors = {
                    ancient: "border-amber-400/60 bg-amber-400/5",
                    medieval: "border-orange-400/60 bg-orange-400/5",
                    colonial: "border-rose-400/60 bg-rose-400/5",
                    modern: "border-cyber-cyan/60 bg-cyber-cyan/5",
                  };

                  return (
                    <div
                      key={era}
                      className={`border rounded p-3 space-y-2 ${eraColors[era as keyof typeof eraColors]}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase text-white">{era}</span>
                        <span className="text-[8px] text-gray-400">
                          {(eraRecord.populationEstimate / 1000000).toFixed(1)}M est. pop
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase text-[8px] block">Controlled By</span>
                        <span className="text-[10px] text-cyber-cyan font-semibold">{eraRecord.controlledBy}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase text-[8px] block">Active Cities & Trade Centers</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {eraRecord.majorCities.map((city, i) => (
                            <span key={i} className="text-[8px] bg-white/10 border border-white/20 text-gray-300 px-1.5 py-0.5 rounded">
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase text-[8px] block">Historic Events</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {eraRecord.historicalEvents.map((event, i) => (
                            <span key={i} className="text-[8px] bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet px-1.5 py-0.5 rounded">
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Historical Migration */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Compass className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">MIGRATIVE FOREBEARS</h3>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.anthropology.migrationHistory}
              </p>
            </div>

            {/* Empires and Ethnic */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <BookOpen className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">SOCIETAL ANTECEDENTS</h3>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[9px] block mb-1">Associated Empires</span>
                <div className="flex flex-wrap gap-1">
                  {data.anthropology.ancientEmpires.map((emp, i) => (
                    <span key={i} className="text-[9px] bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet px-2 py-0.5 rounded">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-1.5">
                <span className="text-gray-500 uppercase text-[9px] block">Ethnic Profile</span>
                <span className="text-white text-[10px] block mt-0.5">{data.anthropology.ethnicComposition.join(" • ")}</span>
              </div>
              <div className="pt-2 border-t border-panel-border/50">
                <span className="text-gray-500 uppercase text-[9px] block">Historical Social Hierarchy</span>
                <p className="text-[10px] text-gray-300 mt-1 leading-normal">
                  {data.anthropology.socialStructures}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Culture & Food */}
        {activeTab === "culture" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Cultural Insights */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <HeartHandshake className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">ETHNOGRAPHIC INSIGHT MATRIX</h3>
              </div>
              <ul className="space-y-3 text-[11px] text-gray-300">
                {data.culture.insights.map((ins, i) => (
                  <li key={i} className="relative pl-4 leading-relaxed">
                    <span className="absolute left-0 top-1 text-cyber-cyan">•</span>
                    {ins}
                  </li>
                ))}
              </ul>
            </div>

            {/* Food Culture */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <BookOpen className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">DIETARY & PRESERVATION ECOLOGY</h3>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {data.culture.foodCulture}
              </p>
              <div className="text-[9px] text-cyber-amber bg-cyber-amber/5 border border-cyber-amber/20 p-2 rounded leading-relaxed mt-1">
                <span>SYSTEM CONTEXT: Culinary systems are primary adaptation mechanisms to preserve energy and local biodiversity cycles.</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 5: AI Report */}
        {activeTab === "ai_analysis" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border border-cyber-cyan/35 bg-cyber-cyan/5 rounded p-5 space-y-4 relative overflow-hidden">
              {/* Scanline holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent pointer-events-none animate-scanline" />
              
              <div className="flex items-center space-x-2 border-b border-cyber-cyan/30 pb-2">
                <Scroll className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-widest neon-text-cyan">
                  AI CORE CIVILIZATIONAL INTEGRATION REPORT
                </h3>
              </div>

              <div className="font-mono text-xs text-gray-200 leading-relaxed space-y-3 text-justify">
                {data.aiAnalysis.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="border-t border-cyber-cyan/20 pt-3 flex justify-between items-center text-[8px] text-gray-500 font-mono">
                <span>MODEL: COGNITIVE SYNTHESIS V3.5</span>
                <span>TELEMETRY STABILITY: 99.86%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
