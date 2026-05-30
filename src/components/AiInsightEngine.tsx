"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Send, ChevronDown, Sparkles, Network } from "lucide-react";
import { staticAiResponses, generateDynamicResponse } from "@/data/aiResponses";
import { graphNodes, graphLinks } from "@/data/knowledgeGraphData";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  nodes?: string[];
  relatedQuestions?: string[];
}

const SUGGESTED_QUESTIONS = [
  "Why did Japan become Japan?",
  "How did climate shape civilizations?",
  "Why do island nations evolve differently?",
  "How does geography affect psychology?",
  "How did the Nile build a hydraulic empire?"
];

interface AiInsightEngineProps {
  externalQuery?: string | null;
  onClearExternalQuery?: () => void;
}

export default function AiInsightEngine({ externalQuery, onClearExternalQuery }: AiInsightEngineProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "EARTH INTELLIGENCE COGNITIVE ENGINE ONLINE.\n\nI am a multi-disciplinary synthesis engine analyzing the deep-time connections between geography, climate, migration, and the tapestry of human civilization. Ask me how the physical world has sculpted our minds and empires.\n\nType an inquiry below, select a suggested path, or select a country to begin our journey.",
      relatedQuestions: [
        "How does geography shape our collective psychology?",
        "Why do civilizations arise along active geological rifts?"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [showGraph, setShowGraph] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const nextMessageId = () => `msg-${++messageIdRef.current}`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (query: string) => {
    if (!query.trim()) return;

    const userMsg: Message = { id: nextMessageId(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate streaming delay
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 600));

    // Look up static or generate dynamic response
    const normalized = query.toLowerCase().replace(/[^a-z\s]/g, "");
    let response = Object.values(staticAiResponses).find((r) =>
      normalized.includes(r.query.toLowerCase().replace(/[^a-z\s]/g, "").slice(0, 15))
    );
    if (!response) response = generateDynamicResponse(query);

    const aiMsg: Message = {
      id: nextMessageId(),
      role: "ai",
      content: response.response,
      nodes: response.nodesToHighlight,
      relatedQuestions: response.relatedQuestions
    };

    setMessages((prev) => [...prev, aiMsg]);
    if (response.nodesToHighlight) {
      setHighlightedNodes(response.nodesToHighlight);
    }
    setIsTyping(false);
  };

  // Handle external queries seamlessly (e.g. from clicking "Rabbit Hole" questions on countries)
  useEffect(() => {
    if (externalQuery) {
      handleSend(externalQuery);
      onClearExternalQuery?.();
    }
  }, [externalQuery]);

  return (
    <div className="flex flex-col h-full min-h-0 font-mono bg-[#030408]/30 border-l border-panel-border/20">
      {/* Header */}
      <div className="border-b border-panel-border px-4 py-3 flex items-center justify-between shrink-0 bg-black/40">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded border border-[#f59e0b]/40 flex items-center justify-center bg-[#f59e0b]/5">
            <Cpu className="w-4 h-4 text-[#f59e0b] animate-pulse" />
          </div>
          <div>
            <h3 className="text-[11px] text-white font-bold tracking-wider uppercase">SYNAPTIC SYNTHESIS ENGINE</h3>
            <p className="text-[8px] text-[#f59e0b]/70 font-mono">COGNITIVE CIVILIZATION ANALYZER</p>
          </div>
        </div>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="flex items-center space-x-1.5 text-[9px] text-[#a1a1aa] hover:text-[#00f0ff] border border-panel-border hover:border-[#00f0ff]/30 px-2.5 py-1.5 rounded transition-all"
        >
          <Network className="w-3 h-3 text-[#00f0ff]" />
          <span>GRAPH</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showGraph ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Concept graph mini-view */}
      <AnimatePresence>
        {showGraph && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 140, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-[#f59e0b]/10 overflow-hidden shrink-0 bg-black/60"
          >
            <div className="p-3 h-full overflow-y-auto">
              <div className="text-[8px] text-[#f59e0b] mb-2 font-semibold">ACTIVE COGNITIVE NODES</div>
              <div className="flex flex-wrap gap-1.5">
                {graphNodes.map((node) => {
                  const isHighlighted = highlightedNodes.includes(node.id);
                  return (
                    <div
                      key={node.id}
                      className={`text-[8px] px-2 py-1 rounded border transition-all duration-500 ${
                        isHighlighted
                          ? "bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.2)] font-bold"
                          : "bg-black/20 border-zinc-900 text-zinc-600"
                      }`}
                    >
                      {node.label}
                    </div>
                  );
                })}
              </div>
              {highlightedNodes.length > 0 && (
                <div className="mt-3 text-[8px] border-t border-zinc-900 pt-2 flex flex-col gap-0.5">
                  {graphLinks
                    .filter((l) => highlightedNodes.includes(l.source) && highlightedNodes.includes(l.target))
                    .slice(0, 2)
                    .map((l, i) => (
                      <div key={i} className="text-zinc-500">
                        {l.source.replace(/_/g, " ")} <span className="text-[#00f0ff]">→</span> {l.target.replace(/_/g, " ")}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested questions */}
      <div className="px-4 py-2.5 border-b border-panel-border/20 shrink-0 overflow-x-auto bg-black/10 scrollbar-none">
        <div className="flex space-x-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="shrink-0 text-[9px] bg-zinc-950/40 border border-zinc-900 hover:border-[#f59e0b]/40 hover:text-[#f59e0b] text-zinc-400 px-3 py-1.5 rounded transition-all whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-[#020204]/25">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="mr-2 mt-0.5 w-6 h-6 rounded border border-[#00f0ff]/20 bg-[#00f0ff]/5 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-[#00f0ff]" />
              </div>
            )}
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3.5 text-xs leading-relaxed border ${
                msg.role === "user"
                  ? "bg-[#f59e0b]/10 border-[#f59e0b]/40 text-white"
                  : "bg-[#060609]/60 border-zinc-900 text-zinc-200"
              }`}
            >
              <p className="whitespace-pre-wrap font-sans text-xs md:text-[13px] leading-relaxed text-zinc-200 text-justify">
                {msg.content}
              </p>

              {/* Related node markers */}
              {msg.nodes && msg.nodes.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-zinc-900 flex flex-wrap gap-1.5">
                  {msg.nodes.map((nid) => {
                    const node = graphNodes.find((n) => n.id === nid);
                    return node ? (
                      <span
                        key={nid}
                        className="text-[8px] font-mono bg-[#00f0ff]/5 border border-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded"
                      >
                        {node.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}

              {/* Related interactive questions (the visual rabbit hole trigger!) */}
              {msg.role === "ai" && msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                <div className="mt-4 pt-3.5 border-t border-zinc-900">
                  <div className="text-[9px] font-mono text-[#f59e0b] font-semibold tracking-widest uppercase mb-2">
                    ✦ FALL DEEPER INTO THE RABBIT HOLE:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {msg.relatedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="w-full text-left font-mono text-[10px] text-[#00f0ff] hover:text-[#f59e0b] hover:bg-white/5 px-2.5 py-2 rounded border border-zinc-900 hover:border-[#f59e0b]/20 transition-all leading-normal"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-6 h-6 rounded border border-[#f59e0b]/30 bg-[#f59e0b]/5 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-[#f59e0b] animate-spin" />
            </div>
            <div className="bg-[#050508]/40 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-zinc-500 font-mono">
              <span className="animate-pulse">SYNTHESIZING INTERDISCIPLINARY COGNITIVE MATRICES...</span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-panel-border/20 p-4 shrink-0 bg-black/40">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="How did ocean currents shape trade empires?"
            className="flex-1 bg-[#020204]/60 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono outline-none focus:border-[#f59e0b]/60 transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="bg-[#f59e0b]/15 hover:bg-[#f59e0b]/30 border border-[#f59e0b]/50 text-[#f59e0b] px-3.5 py-2 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
