"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, Sparkles, Network } from "lucide-react";
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
  "What whispers does the desert carry?",
  "How do mountains shape the human soul?",
  "Why do rivers birth the first stories?",
  "What secrets do the winds hold?",
  "How does the ocean write our destiny?"
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
        "Welcome, traveler.\n\nI am here to help you see the invisible threads that bind our world together—the way a mountain range shapes a language, how a river carves a philosophy, why the wind carries memories across oceans.\n\nAsk me anything about how this planet has written the story of us. Choose a path below, or select a country on the globe to begin our journey into the deep connections of civilization.",
      relatedQuestions: [
        "How does the land beneath our feet shape the thoughts in our minds?",
        "Why do civilizations bloom where the earth is most restless?"
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
      // Defer to avoid synchronous setState in effect
      setTimeout(() => {
        handleSend(externalQuery);
        onClearExternalQuery?.();
      }, 0);
    }
  }, [externalQuery, handleSend, onClearExternalQuery]);

  return (
    <div className="flex flex-col h-full min-h-0 font-mono bg-[#030408]/30 border-l border-panel-border/20">
      {/* Header */}
      <div className="border-b border-panel-border/30 px-5 py-4 flex items-center justify-between shrink-0 bg-black/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-[#f59e0b]/40 flex items-center justify-center bg-[#f59e0b]/5">
            <Sparkles className="w-4 h-4 text-[#f59e0b] animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold tracking-wide text-white">Earth Intelligence</h3>
            <p className="text-[10px] text-zinc-500">Exploring the deep connections of our world</p>
          </div>
        </div>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="flex items-center space-x-1.5 text-[10px] text-zinc-500 hover:text-[#00f0ff] border border-zinc-800 hover:border-[#00f0ff]/30 px-3 py-2 rounded-full transition-all"
        >
          <Network className="w-3.5 h-3.5" />
          <span>Connections</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showGraph ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Concept graph mini-view */}
      <AnimatePresence>
        {showGraph && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 160, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-zinc-900/30 overflow-hidden shrink-0 bg-black/60"
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="text-[10px] font-serif text-zinc-400 mb-3">Active Connections</div>
              <div className="flex flex-wrap gap-2">
                {graphNodes.map((node) => {
                  const isHighlighted = highlightedNodes.includes(node.id);
                  return (
                    <div
                      key={node.id}
                      className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-500 ${
                        isHighlighted
                          ? "bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.2)] font-semibold"
                          : "bg-black/30 border-zinc-800 text-zinc-500"
                      }`}
                    >
                      {node.label}
                    </div>
                  );
                })}
              </div>
              {highlightedNodes.length > 0 && (
                <div className="mt-4 text-[10px] border-t border-zinc-900 pt-3 flex flex-col gap-1.5">
                  {graphLinks
                    .filter((l) => highlightedNodes.includes(l.source) && highlightedNodes.includes(l.target))
                    .slice(0, 2)
                    .map((l, i) => (
                      <div key={i} className="text-zinc-400 flex items-center gap-2">
                        <span className="text-[#00f0ff]">→</span>
                        {l.source.replace(/_/g, " ")} connects to {l.target.replace(/_/g, " ")}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested questions */}
      <div className="px-5 py-3 border-b border-zinc-900/30 shrink-0 overflow-x-auto bg-black/10">
        <div className="flex space-x-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="shrink-0 text-[11px] bg-zinc-950/40 border border-zinc-800 hover:border-[#f59e0b]/40 hover:text-[#f59e0b] text-zinc-400 px-4 py-2 rounded-full transition-all whitespace-nowrap font-serif"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6 bg-[#020204]/25">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="mr-3 mt-1 w-8 h-8 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed border ${
                msg.role === "user"
                  ? "bg-[#f59e0b]/10 border-[#f59e0b]/30 text-white"
                  : "bg-[#060609]/70 border-zinc-900/50 text-zinc-200"
              }`}
            >
              <p className="whitespace-pre-wrap font-serif text-sm md:text-base leading-relaxed text-zinc-200 text-justify">
                {msg.content}
              </p>

              {/* Related node markers */}
              {msg.nodes && msg.nodes.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-900/50 flex flex-wrap gap-2">
                  {msg.nodes.map((nid) => {
                    const node = graphNodes.find((n) => n.id === nid);
                    return node ? (
                      <span
                        key={nid}
                        className="text-[10px] font-serif bg-[#00f0ff]/5 border border-[#00f0ff]/20 text-[#00f0ff] px-3 py-1 rounded-full"
                      >
                        {node.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}

              {/* Related interactive questions (the visual rabbit hole trigger!) */}
              {msg.role === "ai" && msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                <div className="mt-5 pt-4 border-t border-zinc-900/50">
                  <div className="text-[11px] font-serif text-[#f59e0b] font-semibold tracking-wide mb-3">
                    ✦ Fall deeper into the mystery:
                  </div>
                  <div className="flex flex-col gap-2">
                    {msg.relatedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="w-full text-left font-serif text-sm text-[#00f0ff] hover:text-[#f59e0b] hover:bg-white/5 px-4 py-3 rounded-xl border border-zinc-900/50 hover:border-[#f59e0b]/20 transition-all leading-relaxed"
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
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#f59e0b] animate-pulse" />
            </div>
            <div className="bg-[#050508]/40 border border-zinc-900/50 rounded-2xl px-5 py-3 text-sm text-zinc-500 font-serif">
              <span className="animate-pulse">Exploring the connections...</span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-900/30 p-5 shrink-0 bg-black/40">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="What mysteries shall we explore together?"
            className="flex-1 bg-[#020204]/60 border border-zinc-800 rounded-2xl px-5 py-3 text-sm text-white placeholder-zinc-600 font-serif outline-none focus:border-[#f59e0b]/50 transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="bg-[#f59e0b]/15 hover:bg-[#f59e0b]/30 border border-[#f59e0b]/50 text-[#f59e0b] px-5 py-3 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
