"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Globe, CloudRain, Trees, Compass, HeartHandshake, Briefcase, BookOpen, Scroll, type LucideIcon } from "lucide-react";
import { countriesData } from "@/data/countriesData";
import { countryEraData } from "@/data/empireData";


interface CountryPanelProps {
  countryId: string | null;
  onClose: () => void;
}

type TabType = "overview" | "geography" | "history" | "culture" | "ai_analysis";

export default function CountryPanel({ countryId, onClose }: CountryPanelProps) {
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

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="absolute top-0 right-0 w-full md:w-[480px] h-full z-30 glass-panel-heavy shadow-2xl flex flex-col font-mono"
    >
      {/* Header */}
      <div className="p-5 border-b border-panel-border flex items-center justify-between bg-black/30">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{data.id === "EG" ? "🇪🇬" : data.id === "JP" ? "🇯🇵" : data.id === "IS" ? "🇮🇸" : data.id === "IN" ? "🇮🇳" : data.id === "BR" ? "🇧🇷" : data.id === "NO" ? "🇳🇴" : "🌍"}</div>
          <div>
            <h2 className="text-white text-lg font-bold tracking-widest neon-text-cyan uppercase">
              {data.name}
            </h2>
            <p className="text-[9px] text-gray-500">INTEL RECORD SYSTEM ID: {data.id}-00{countryId === "EG" ? "1" : "2"}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/5 border border-panel-border text-gray-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-panel-border bg-black/10 overflow-x-auto shrink-0 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[75px] py-3 text-[9px] font-bold tracking-wider border-b-2 flex flex-col items-center justify-center transition-all space-y-1.5 ${
                activeTab === tab.id
                  ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/2"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        {/* Tab 1: Overview */}
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
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
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
                <div>
                  <span className="text-gray-500 uppercase text-[9px]">TEMP SPECTRUM</span>
                  <span className="text-white block mt-0.5">{data.climate.temperatureRange}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[9px]">PRECIPITATION TYPE</span>
                  <span className="text-white block mt-0.5">{data.climate.rainfallPattern}</span>
                </div>
              </div>
            </div>

            {/* Geography Details */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Trees className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">PHYSIOGRAPHIC PROPERTIES</h3>
              </div>
              <div className="text-xs">
                <span className="text-gray-500 uppercase text-[9px] block">Terrain Outline</span>
                <span className="text-white leading-relaxed text-[11px] block mt-0.5">{data.geography.terrain}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-gray-500 uppercase text-[9px]">Biodiversity Grade</span>
                  <span className="text-cyber-green block font-bold text-xs mt-0.5">{data.geography.biodiversityRating}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[9px]">Ecosystem Matrices</span>
                  <span className="text-white block text-[10px] mt-0.5">{data.geography.ecosystems.length} Active Biospheres</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-gray-500 uppercase text-[9px] block mb-1">Key Geographic Features</span>
                <div className="flex flex-wrap gap-1">
                  {data.geography.features.map((feat, i) => (
                    <span key={i} className="text-[9px] bg-white/5 border border-panel-border text-gray-300 px-2 py-0.5 rounded">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Environmental Adaptation */}
            <div className="border border-panel-border bg-cyber-green/5 rounded p-4 space-y-3">
              <div className="flex items-center space-x-2 border-b border-cyber-green/20 pb-1.5">
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
                <div className="pt-1.5 text-[10px] text-gray-400">
                  <span className="text-cyber-green/60">Biochemical/Physiological:</span> {data.adaptation.physiologicalAdaptation}
                </div>
              )}
              {data.adaptation.technologicalAdaptation && (
                <div className="pt-1 text-[10px] text-gray-400">
                  <span className="text-cyber-green/60">Technological System:</span> {data.adaptation.technologicalAdaptation}
                </div>
              )}
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

            {/* History by Era Section */}
            <div className="border border-panel-border bg-black/20 rounded p-4 space-y-4">
              <div className="flex items-center space-x-2 border-b border-panel-border pb-1.5">
                <Scroll className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-[10px] text-white font-bold tracking-wider">TERRITORIAL CONTROL BY ERA</h3>
              </div>
              <div className="space-y-4">
                {["ancient", "medieval", "colonial", "modern"].map((era) => {
                  const eraInfo = countryEraData.find(
                    (d) => d.countryId === data.id && d.era === era
                  );
                  if (!eraInfo) return null;

                  return (
                    <div key={era} className="border-l-2 border-cyber-cyan/35 pl-3 py-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[8.5px] text-cyber-cyan font-bold uppercase tracking-wider">{era} Era</span>
                        <span className="text-[7.5px] text-gray-500">Pop: {eraInfo.populationEstimate > 0 ? eraInfo.populationEstimate.toLocaleString() : "N/A"}</span>
                      </div>
                      <div className="text-[10px] text-white font-semibold">
                        Controlled By: <span className="text-cyber-violet font-bold">{eraInfo.controlledBy}</span>
                      </div>
                      {eraInfo.majorCities.length > 0 && (
                        <div className="text-[8.5px] text-gray-400 mt-1">
                          <span className="text-gray-500 uppercase text-[8px]">Major Cities:</span> {eraInfo.majorCities.join(", ")}
                        </div>
                      )}
                      {eraInfo.historicalEvents.length > 0 && (
                        <div className="text-[8.5px] text-gray-400">
                          <span className="text-gray-500 uppercase text-[8px]">Key Events:</span> {eraInfo.historicalEvents.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
