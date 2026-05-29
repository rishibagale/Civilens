"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lightbulb, Zap, Compass, Brain, Globe } from "lucide-react";
import { synthesizeInsight, type EraType } from "@/services/aiSynthesisEngine";
import { useRelatedInsights } from "@/hooks/useRelatedInsights";

interface CuriosityCardProps {
  question: string;
  category: string;
  stat?: string;
  tags: string[];
  index: number;
  onClick: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  climate: <Zap className="w-4 h-4" />,
  culture: <Brain className="w-4 h-4" />,
  geography: <Globe className="w-4 h-4" />,
  history: <Compass className="w-4 h-4" />,
  anthropology: <Lightbulb className="w-4 h-4" />,
  economics: <ChevronRight className="w-4 h-4" />,
  default: <Lightbulb className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  climate: "from-blue-500/20 to-blue-600/10 border-blue-400/30",
  culture: "from-purple-500/20 to-purple-600/10 border-purple-400/30",
  geography: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30",
  history: "from-amber-500/20 to-amber-600/10 border-amber-400/30",
  anthropology: "from-pink-500/20 to-pink-600/10 border-pink-400/30",
  economics: "from-cyan-500/20 to-cyan-600/10 border-cyan-400/30",
};

const categoryTextColors: Record<string, string> = {
  climate: "text-blue-300",
  culture: "text-purple-300",
  geography: "text-emerald-300",
  history: "text-amber-300",
  anthropology: "text-pink-300",
  economics: "text-cyan-300",
};

function CuriosityCard({
  question,
  category,
  stat,
  tags,
  index,
  onClick,
}: CuriosityCardProps) {
  const icon = categoryIcons[category] || categoryIcons.default;
  const gradClass = categoryColors[category] || categoryColors.default;
  const textClass = categoryTextColors[category] || categoryTextColors.default;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className={`text-left w-full p-4 rounded-lg border backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-lg group bg-gradient-to-br ${gradClass}`}
    >
      {/* Category badge + icon */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1.5 ${textClass} font-mono text-xs font-bold uppercase tracking-wider`}>
          {icon}
          {category}
        </div>
        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Question */}
      <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-200 transition-colors">
        {question}
      </h3>

      {/* Stat preview */}
      {stat && (
        <p className="text-xs text-gray-400 mb-2.5">{stat}</p>
      )}

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="inline-block px-2 py-0.5 text-[9px] font-mono rounded bg-black/30 text-gray-300 border border-gray-600/30">
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

interface CuriosityFeedProps {
  activeCountryId: string | null;
  activeEra: EraType;
  onSelectInsight?: (insight: { question: string; category: string }) => void;
  limit?: number; // How many cards to show (default 6)
}

export default function CuriosityFeed({
  activeCountryId,
  activeEra,
  onSelectInsight,
  limit = 6,
}: CuriosityFeedProps) {
  const [cards, setCards] = useState<
    Array<{
      id: string;
      question: string;
      category: string;
      stat?: string;
      tags: string[];
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const relatedInsights = useRelatedInsights(activeCountryId, activeEra);

  // Generate new curiosity cards whenever country/era changes
  useEffect(() => {
    const generateCards = async () => {
      setIsLoading(true);
      const newCards: typeof cards = [];

      // Generate 6 diverse curiosity questions
      for (let i = 0; i < Math.min(limit, 6); i++) {
        const insight = await synthesizeInsight({
          type: "curiosity_question",
          context: {
            countryId: activeCountryId || undefined,
            era: activeEra,
          },
          mode: "curated",
        });

        if (insight) {
          newCards.push({
            id: `card-${i}-${Date.now()}`,
            question: insight.text,
            category: insight.sources[0] || "geography",
            stat: insight.conversationStarters?.[0]
              ? undefined
              : `Explore ${insight.sources[0] || "this"}`,
            tags: ["explore", "discover", ...insight.sources],
          });
        }
      }

      // Add some follow-up questions if available
      if (relatedInsights.followUpQuestions.length > 0 && newCards.length < limit) {
        relatedInsights.followUpQuestions.slice(0, 2).forEach((q, idx) => {
          newCards.push({
            id: `followup-${idx}`,
            question: q,
            category: "history",
            tags: ["follow-up", "related"],
          });
        });
      }

      setCards(newCards.slice(0, limit));
      setIsLoading(false);
    };

    generateCards();
  }, [activeCountryId, activeEra, limit]);

  const handleCardClick = (card: (typeof cards)[0]) => {
    setSelectedCard(card.id);
    onSelectInsight?.(card);

    // Reset after click
    setTimeout(() => setSelectedCard(null), 600);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="px-1">
        <h3 className="text-xs font-mono font-bold text-cyan-400 tracking-widest mb-1">
          DISCOVER NEXT
        </h3>
        <p className="text-[11px] text-gray-500">
          {isLoading
            ? "Generating curiosities..."
            : `${cards.length} connections to explore`}
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {cards.map((card, idx) => (
            <CuriosityCard
              key={card.id}
              question={card.question}
              category={card.category}
              stat={card.stat}
              tags={card.tags}
              index={idx}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">Select a country to generate discoveries</p>
          </motion.div>
        )}
      </div>

      {/* Related highlights */}
      {relatedInsights.relatedCountries.length > 0 && (
        <div className="mt-2 pt-2 border-t border-panel-border">
          <p className="text-[10px] font-mono text-gray-600 mb-1.5">RELATED PLACES</p>
          <div className="space-y-1">
            {relatedInsights.relatedCountries.slice(0, 2).map((country) => (
              <div
                key={country.id}
                className="text-[11px] px-2 py-1.5 rounded bg-black/20 border border-panel-border text-gray-300 hover:text-gray-100 cursor-pointer transition-colors"
              >
                <span className="text-cyan-400">{country.name}</span>
                <span className="text-gray-600"> • {country.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refresh button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          // Trigger regeneration by updating a key
          setCards([]);
          setTimeout(() => {
            // Re-trigger the effect
            const event = new Event("curiosity-refresh");
            window.dispatchEvent(event);
          }, 100);
        }}
        className="mt-2 w-full py-2 px-3 rounded text-xs font-mono font-bold text-gray-400 border border-panel-border hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
      >
        ↻ REFRESH DISCOVERIES
      </motion.button>
    </div>
  );
}
