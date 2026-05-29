"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getCausalChain, type EraType, type ChainStep } from "@/data/causal-chains";

interface CausalChainProps {
  countryId: string | null;
  era: EraType;
  onStepClick?: (stepId: string, category: string) => void;
}

// Category colors for visual consistency
const categoryColors: Record<ChainStep["category"], { bg: string; border: string; text: string; icon: string }> = {
  geography: { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-400/30", text: "text-emerald-300", icon: "🌍" },
  climate: { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-400/30", text: "text-blue-300", icon: "⛅" },
  agriculture: { bg: "from-green-500/20 to-green-600/10", border: "border-green-400/30", text: "text-green-300", icon: "🌾" },
  demographics: { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-400/30", text: "text-cyan-300", icon: "👥" },
  institutions: { bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-400/30", text: "text-purple-300", icon: "🏛️" },
  culture: { bg: "from-pink-500/20 to-pink-600/10", border: "border-pink-400/30", text: "text-pink-300", icon: "🎭" },
  economics: { bg: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-400/30", text: "text-yellow-300", icon: "💰" },
};

function ChainStepCard({
  step,
  index,
  total,
  onClick,
}: {
  step: ChainStep;
  index: number;
  total: number;
  onClick: () => void;
}) {
  const config = categoryColors[step.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Step card */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={`w-full p-4 rounded-lg border backdrop-blur-xl transition-all text-left group bg-gradient-to-br ${config.bg} ${config.border}`}
      >
        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-xl shrink-0">{step.icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm ${config.text} mb-0.5`}>{step.title}</h4>
            <p className="text-xs text-gray-400">{step.category}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] text-gray-300 leading-relaxed mb-2">{step.description}</p>

        {/* Related nodes preview */}
        {step.relatedGraphNodes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {step.relatedGraphNodes.slice(0, 2).map((node) => (
              <span key={node} className={`inline-block text-[8px] px-1.5 py-0.5 rounded bg-black/30 ${config.text}`}>
                {node}
              </span>
            ))}
            {step.relatedGraphNodes.length > 2 && (
              <span className="text-[8px] text-gray-500">+{step.relatedGraphNodes.length - 2}</span>
            )}
          </div>
        )}
      </motion.button>

      {/* Arrow between steps */}
      {index < total - 1 && (
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center gap-1">
            <div className="text-xs text-gray-600">↓</div>
            <div className="w-0.5 h-4 bg-gradient-to-b from-gray-600 to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function CausalChain({ countryId, era, onStepClick }: CausalChainProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const chain = countryId ? getCausalChain(countryId, era) : null;

  if (!chain) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <span className="text-3xl mb-2">🔗</span>
        <p className="text-xs font-mono">Select a country to see causal chains</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="px-1">
        <h3 className="text-sm font-bold text-white mb-1">{chain.title}</h3>
        <p className="text-[10px] text-gray-500">{chain.shortDescription}</p>
      </div>

      {/* Chain visualization */}
      <div className="space-y-0.5">
        <AnimatePresence mode="wait">
          {chain.chain.map((step, idx) => (
            <ChainStepCard
              key={step.id}
              step={step}
              index={idx}
              total={chain.chain.length}
              onClick={() => {
                setExpandedStep(expandedStep === step.id ? null : step.id);
                onStepClick?.(step.id, step.category);
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: chain.chain.length * 0.1 }}
        className="mt-4 p-3 rounded-lg bg-black/30 border border-panel-border"
      >
        <h4 className="text-[10px] font-mono font-bold text-cyan-400 mb-2 tracking-wider">IMPACT ANALYSIS</h4>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-gray-600">Steps: </span>
            <span className="text-white font-bold">{chain.chain.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Era: </span>
            <span className="text-white font-bold uppercase">{era}</span>
          </div>
          <div>
            <span className="text-gray-600">Related Nodes: </span>
            <span className="text-white font-bold">{chain.chain.reduce((sum, s) => sum + s.relatedGraphNodes.length, 0)}</span>
          </div>
          <div>
            <span className="text-gray-600">Related Regions: </span>
            <span className="text-white font-bold">{new Set(chain.chain.flatMap((s) => s.relatedCountries)).size}</span>
          </div>
        </div>
      </motion.div>

      {/* Interaction hint */}
      <p className="text-[9px] text-gray-600 text-center italic">
        Click steps to highlight in knowledge graph
      </p>
    </div>
  );
}
