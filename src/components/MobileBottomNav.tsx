"use client";

import React from "react";
import { Globe, MessageSquare, Clock, Layers, Sparkles } from "lucide-react";

type PanelType = "ai" | "graph" | "cards" | "layers" | null;

interface MobileBottomNavProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  timelineOpen?: boolean;
  onToggleTimeline?: () => void;
  hidden?: boolean;
}

export default function MobileBottomNav({
  activePanel,
  onPanelChange,
  timelineOpen = false,
  onToggleTimeline,
  hidden = false,
}: MobileBottomNavProps) {
  const tabs = [
    {
      id: "globe",
      icon: Globe,
      label: "Globe",
      isActive: activePanel === null && !timelineOpen,
      onClick: () => {
        onPanelChange(null);
        if (timelineOpen && onToggleTimeline) onToggleTimeline();
      },
    },
    {
      id: "timeline",
      icon: Clock,
      label: "Eras",
      isActive: timelineOpen,
      onClick: () => {
        onPanelChange(null);
        if (onToggleTimeline) onToggleTimeline();
        else window.dispatchEvent(new CustomEvent("toggle-timeline"));
      },
    },
    {
      id: "layers",
      icon: Layers,
      label: "Layers",
      isActive: activePanel === "layers",
      onClick: () => {
        if (timelineOpen && onToggleTimeline) onToggleTimeline();
        onPanelChange(activePanel === "layers" ? null : "layers");
      },
    },
    {
      id: "ai",
      icon: Sparkles,
      label: "Ask AI",
      isActive: activePanel === "ai",
      onClick: () => {
        if (timelineOpen && onToggleTimeline) onToggleTimeline();
        onPanelChange(activePanel === "ai" ? null : "ai");
      },
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className={`md:hidden fixed bottom-4 inset-x-4 max-w-sm mx-auto z-40 bg-[#060609]/92 backdrop-blur-xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.85)] rounded-2xl py-1.5 px-2 flex items-center justify-around transition-all duration-300 ${
        hidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.isActive;

        return (
          <button
            key={tab.id}
            onClick={tab.onClick}
            aria-label={tab.label}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 min-w-[64px] touch-manipulation active:scale-95 ${
              isActive
                ? "text-[#f59e0b] bg-[#f59e0b]/15 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                : "text-zinc-500 hover:text-zinc-300 active:text-white"
            }`}
          >
            <Icon
              className={`w-4 h-4 transition-transform duration-200 ${
                isActive ? "scale-110 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]" : ""
              }`}
            />
            <span
              className={`text-[9.5px] font-mono font-semibold tracking-wider ${
                isActive ? "text-[#f59e0b]" : ""
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}