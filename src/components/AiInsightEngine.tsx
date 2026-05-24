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
}

const SUGGESTED_QUESTIONS = [
  "Why are Mediterranean cultures different?",
  "How did climate shape civilizations?",
  "Why do island nations evolve differently?",
  "How does geography affect psychology?",
  "How did migration shape Latin America?",
];

export default function AiInsightEngine() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "EARTH INTELLIGENCE CORE ONLINE.\n\nI am a multi-disciplinary synthesis engine analyzing geography, anthropology, climate, migration, and civilizational systems. Ask me any question about how the physical world shaped humanity.\n\nSelected queries will trigger concept node highlights in the Knowledge Graph.",
      nodes: [],
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
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

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
    };

    setMessages((prev) => [...prev, aiMsg]);
    setHighlightedNodes(response.nodesToHighlight);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full font-mono bg-black/20">
      {/* Header */}
      <div className="border-b border-panel-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded border border-cyber-cyan flex items-center justify-center bg-cyber-cyan/5">
            <Cpu className="w-4 h-4 text-cyber-cyan animate-pulse" />
          </div>
          <div>
            <h3 className="text-[11px] text-white font-bold tracking-wider neon-text-cyan">AI INSIGHT ENGINE</h3>
            <p className="text-[8px] text-gray-500">MULTI-DIMENSIONAL CIVILIZATION ANALYSIS</p>
          </div>
        </div>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="flex items-center space-x-1.5 text-[9px] text-gray-400 hover:text-cyber-cyan border border-panel-border hover:border-cyber-cyan/50 px-2 py-1.5 rounded transition-all"
        >
          <Network className="w-3 h-3" />
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
            className="border-b border-panel-border overflow-hidden shrink-0 bg-black/40"
          >
            <div className="p-3 h-full overflow-x-auto">
              <div className="text-[8px] text-gray-500 mb-2">ACTIVE CONCEPT NODES</div>
              <div className="flex flex-wrap gap-1.5">
                {graphNodes.map((node) => {
                  const isHighlighted = highlightedNodes.includes(node.id);
                  return (
                    <div
                      key={node.id}
                      className={`text-[8px] px-2 py-1 rounded border transition-all duration-500 ${
                        isHighlighted
                          ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                          : "bg-black/20 border-panel-border text-gray-600"
                      }`}
                    >
                      {node.label}
                    </div>
                  );
                })}
              </div>
              {highlightedNodes.length > 0 && (
                <div className="mt-2 text-[8px] text-gray-500">
                  {graphLinks
                    .filter((l) => highlightedNodes.includes(l.source) && highlightedNodes.includes(l.target))
                    .slice(0, 2)
                    .map((l, i) => (
                      <div key={i} className="text-gray-400">
                        {l.source.replace(/_/g, " ")} <span className="text-cyber-cyan">→</span> {l.target.replace(/_/g, " ")}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested questions */}
      <div className="px-4 py-2 border-b border-panel-border shrink-0 overflow-x-auto">
        <div className="flex space-x-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="shrink-0 text-[8px] bg-white/3 border border-panel-border hover:border-cyber-cyan/50 hover:text-cyber-cyan text-gray-400 px-2.5 py-1.5 rounded transition-all whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="mr-2 mt-0.5 w-6 h-6 rounded border border-cyber-cyan/50 bg-cyber-cyan/5 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-cyber-cyan" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-cyber-cyan/10 border border-cyber-cyan/40 text-white"
                  : "bg-black/40 border border-panel-border text-gray-200"
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono text-[11px]">{msg.content}</pre>
              {msg.nodes && msg.nodes.length > 0 && (
                <div className="mt-2 pt-2 border-t border-panel-border/50 flex flex-wrap gap-1">
                  {msg.nodes.map((nid) => {
                    const node = graphNodes.find((n) => n.id === nid);
                    return node ? (
                      <span
                        key={nid}
                        className="text-[8px] bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan px-1.5 py-0.5 rounded"
                      >
                        {node.label}
                      </span>
                    ) : null;
                  })}
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
            <div className="w-6 h-6 rounded border border-cyber-cyan/50 bg-cyber-cyan/5 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-cyber-cyan animate-spin" />
            </div>
            <div className="bg-black/40 border border-panel-border rounded-lg px-4 py-3 text-xs text-gray-400 font-mono">
              <span className="animate-pulse">SYNTHESIZING INTERDISCIPLINARY CORRELATION MATRICES...</span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-panel-border p-4 shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="How did ocean currents shape trade empires?"
            className="flex-1 bg-black/40 border border-panel-border rounded px-3 py-2 text-xs text-white placeholder-gray-500 font-mono outline-none focus:border-cyber-cyan transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="bg-cyber-cyan/15 hover:bg-cyber-cyan/30 border border-cyber-cyan text-cyber-cyan px-3 py-2 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
