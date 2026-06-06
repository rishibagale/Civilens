"use client";

import React from "react";
import { Globe, MessageSquare, Clock, Layers, Search } from "lucide-react";

type PanelType = "ai" | "graph" | "cards" | "layers" | null;

interface MobileBottomNavProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  onSearchOpen: () => void;
}

const tabs = [
  { id: "globe" as const, icon: Globe, label: "Globe" },
  { id: "ai" as PanelType, icon: MessageSquare, label: "Ask AI" },
  { id: "timeline" as const, icon: Clock, label: "Eras" },
  { id: "layers" as PanelType, icon: Layers, label: "Layers" },
];

export default function MobileBottomNav({
  activePanel,
  onPanelChange,
  onSearchOpen,
}: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060609]/95 backdrop-blur-xl border-t border-zinc-800/60">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.id === "globe"
              ? activePanel === null
              : tab.id === "timeline"
                ? false
                : activePanel === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "globe") {
                  onPanelChange(null);
                } else if (tab.id === "timeline") {
                  window.dispatchEvent(new CustomEvent("toggle-timeline"));
                } else {
                  onPanelChange(isActive ? null : tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? "text-[#f59e0b] bg-[#f59e0b]/10"
                  : "text-zinc-500 active:text-zinc-300"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" : ""}`} />
              <span className={`text-[9px] font-mono font-semibold tracking-wider ${isActive ? "text-[#f59e0b]" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={onSearchOpen}
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl text-zinc-500 active:text-zinc-300 transition-all duration-200 min-w-[56px]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] font-mono font-semibold tracking-wider">Search</span>
        </button>
      </div>
    </div>
  );
}