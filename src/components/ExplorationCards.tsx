"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  accent: string;
  icon: string;
  countryFocus?: string;
}

const CARDS: CardData[] = [
  {
    id: "nordic",
    title: "Why Nordic Countries Evolved Differently",
    subtitle: "Geography × Social Structure",
    body: "Scandinavia's rugged fjord coastlines and harsh subarctic winters prevented the formation of large feudal estates. Land stayed in the hands of independent farmers and fishermen, cultivating an egalitarian ethos that centuries later became the Nordic Social Democratic model — the world's most redistributive and high-trust societies. The 800-year-old Althing Parliament of Iceland proves that flat social hierarchies are a direct consequence of ungovernable terrain.",
    tags: ["Norway", "Iceland", "Geography", "Democracy"],
    accent: "#00f0ff",
    icon: "❄️",
    countryFocus: "NO",
  },
  {
    id: "mountains",
    title: "How Mountains Shaped Civilizations",
    subtitle: "Topography × Defensibility × Isolation",
    body: "Mountains are both shields and prisons. They allowed the Swiss to maintain neutrality for 500 years, let the Tibetans develop unique high-altitude physiologies, and preserved the Basque language for 10,000 years against Indo-European replacement. But the same barriers that protect cultures also fragment them — the Caucasus mountain range contains more distinct languages per square kilometer than any other region on Earth.",
    tags: ["Alps", "Tibet", "Caucasus", "Isolation"],
    accent: "#bd00ff",
    icon: "⛰️",
  },
  {
    id: "oceans",
    title: "How Oceans Created Trade Empires",
    subtitle: "Maritime Technology × Global Trade",
    body: "Once mariners learned to read the wind patterns (Trade Winds, Roaring Forties, Monsoons), the ocean transformed from a barrier into a superhighway. Portugal's mastery of the Cape Route connected the Atlantic and Indian Oceans, funneling the wealth of Asia into a tiny Iberian nation. The Dutch East India Company, by controlling spice chokepoints, became the wealthiest corporation in human history — a direct consequence of mastering oceanic geography.",
    tags: ["Trade Routes", "Portugal", "Spice Trade", "Maritime"],
    accent: "#3b82f6",
    icon: "🌊",
  },
  {
    id: "deserts",
    title: "How Deserts Affect Social Structures",
    subtitle: "Scarcity × Tribalism × Hospitality Codes",
    body: "Deserts enforce a strict thermodynamics of survival. Extreme heat, scarce water, and vast distances between oases make cooperation between strangers a survival necessity — this is the origin of the Arab hospitality code (Diyafa), which obligates feeding and sheltering any traveler for three days. Desert societies also develop strong tribal structures because survival demands loyalty to a tight, traceable kin network, since anonymous strangers represent existential risk in a zero-sum resource environment.",
    tags: ["Sahara", "Arabia", "Tribalism", "Resource Scarcity"],
    accent: "#f59e0b",
    icon: "🏜️",
  },
  {
    id: "rivers",
    title: "Why Great River Valleys Became Empires",
    subtitle: "Hydraulics × Centralization × Bureaucracy",
    body: "The Nile, Tigris-Euphrates, Indus, and Yellow River valleys are the cradles of all early civilization not by accident — they provide predictable annual floods that renew soil fertility, and require massive cooperative engineering to manage. This hydraulic imperative selects for strong centralized states (what historian Karl Wittfogel called 'hydraulic despotism'): the ruler who controls the irrigation canals controls the food supply, and thereby the entire population.",
    tags: ["Egypt", "Mesopotamia", "Indus Valley", "Hydraulics"],
    accent: "#39ff14",
    icon: "🌊",
    countryFocus: "EG",
  },
  {
    id: "monsoon",
    title: "The Monsoon as a Civilizational Engine",
    subtitle: "Indian Ocean System × Collective Psychology",
    body: "The Southwest Monsoon is the largest singular weather system shaping human civilization. It delivered 80% of India's annual rainfall in 4 months, forcing agrarian societies to develop sophisticated water storage (stepwells, tanks, reservoirs) and cooperative management norms. The monsoon's geographic reach — connecting East Africa, Arabia, India, and Southeast Asia — also defined one of the world's oldest maritime trade circuits, enabling exchange of cotton, spices, and intellectual traditions millennia before European contact.",
    tags: ["India", "Monsoon", "Trade", "Psychology"],
    accent: "#06b6d4",
    icon: "🌧️",
    countryFocus: "IN",
  },
];

export default function ExplorationCards() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (newIdx: number) => {
    setDirection(newIdx > idx ? 1 : -1);
    setIdx(newIdx);
  };

  const prev = () => goTo((idx - 1 + CARDS.length) % CARDS.length);
  const next = () => goTo((idx + 1) % CARDS.length);

  const card = CARDS[idx];

  return (
    <div className="flex flex-col h-full font-mono bg-black/20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-panel-border flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyber-violet" />
          <h3 className="text-[11px] text-white font-bold tracking-wider" style={{ textShadow: "0 0 8px rgba(189,0,255,0.5)" }}>
            AI CIVILIZATION REPORTS
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={prev} className="p-1.5 rounded border border-panel-border hover:border-cyber-violet/60 text-gray-400 hover:text-white transition-all">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] text-gray-500">{idx + 1} / {CARDS.length}</span>
          <button onClick={next} className="p-1.5 rounded border border-panel-border hover:border-cyber-violet/60 text-gray-400 hover:text-white transition-all">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Carousel */}
      <div className="flex-1 p-4 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={card.id}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 60, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
            className="h-full rounded-lg border overflow-hidden flex flex-col"
            style={{ borderColor: card.accent + "40" }}
          >
            {/* Card header with gradient accent */}
            <div
              className="px-5 py-4 flex items-start space-x-3 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${card.accent}12 0%, transparent 100%)`,
                borderBottom: `1px solid ${card.accent}25`,
              }}
            >
              <span className="text-3xl shrink-0 mt-0.5">{card.icon}</span>
              <div>
                <h4 className="text-sm text-white font-bold leading-tight" style={{ textShadow: `0 0 12px ${card.accent}60` }}>
                  {card.title}
                </h4>
                <p className="text-[10px] mt-1" style={{ color: card.accent }}>
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 px-5 py-4 overflow-y-auto">
              <p className="text-[11px] text-gray-300 leading-relaxed">{card.body}</p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] px-2 py-0.5 rounded border font-bold"
                    style={{ borderColor: card.accent + "50", color: card.accent, background: card.accent + "10" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-5 py-3 shrink-0 flex items-center justify-between"
              style={{ borderTop: `1px solid ${card.accent}20` }}
            >
              <span className="text-[8px] text-gray-600">SYNTHESIS MODEL: COGNITIVE V3.5</span>
              <div
                className="text-[8px] font-bold px-2 py-0.5 rounded"
                style={{ color: card.accent, background: card.accent + "15" }}
              >
                {card.countryFocus ? `FOCUS: ${card.countryFocus}` : "GLOBAL SCOPE"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center space-x-1.5 pb-3 shrink-0">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-cyber-violet" : "bg-gray-700 hover:bg-gray-500"}`}
          />
        ))}
      </div>
    </div>
  );
}
