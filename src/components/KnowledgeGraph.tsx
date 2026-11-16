"use client";

import React, { useEffect, useRef, useState } from "react";
import { graphNodes, graphLinks, type GraphNode } from "@/data/knowledgeGraphData";
import { Network, Sparkles, X } from "lucide-react";

interface KnowledgeGraphProps {
  onAskAboutNode?: (node: GraphNode) => void;
}

export default function KnowledgeGraph({ onAskAboutNode }: KnowledgeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);

  // High-performance animation refs (eliminates 60 FPS React re-renders and effect teardown)
  const hoveredIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const nodePositions = useRef<Map<string, { x: number; y: number }>>(new Map());

  // Keep selectedIdRef in sync with state
  useEffect(() => {
    selectedIdRef.current = selected?.id ?? null;
  }, [selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const computePositions = () => {
      const W = container.clientWidth || 380;
      const H = container.clientHeight || 450;
      canvas.width = W;
      canvas.height = H;

      const positions = nodePositions.current;
      positions.clear();
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) * 0.36;

      graphNodes.forEach((node, i) => {
        const angle = (i / graphNodes.length) * Math.PI * 2 - Math.PI / 2;
        const rJitter = r * (node.category === "environment" ? 0.62 : node.category === "culture" ? 0.98 : 0.82);
        positions.set(node.id, {
          x: cx + Math.cos(angle) * rJitter,
          y: cy + Math.sin(angle) * rJitter,
        });
      });
    };

    computePositions();

    const categoryColors: Record<string, string> = {
      environment: "#00f0ff",
      agriculture: "#39ff14",
      demography: "#f59e0b",
      economy: "#fb923c",
      institutions: "#bd00ff",
      culture: "#f472b6",
    };

    let animId: number;
    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.012;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const positions = nodePositions.current;
      const currentHovered = hoveredIdRef.current;
      const currentSelected = selectedIdRef.current;

      // 1. Draw Links
      graphLinks.forEach((link) => {
        const from = positions.get(link.source);
        const to = positions.get(link.target);
        if (!from || !to) return;

        const isRelated =
          (currentHovered && (link.source === currentHovered || link.target === currentHovered)) ||
          (currentSelected && (link.source === currentSelected || link.target === currentSelected));

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = isRelated
          ? "rgba(0, 240, 255, 0.75)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isRelated ? 1.8 : 0.8;
        ctx.stroke();

        // Animated traveling impulse along link
        if (isRelated) {
          const prog = (Math.sin(t * 1.5) * 0.5 + 0.5);
          const px = from.x + (to.x - from.x) * prog;
          const py = from.y + (to.y - from.y) * prog;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#00f0ff";
          ctx.fill();
        }
      });

      // 2. Draw Nodes
      graphNodes.forEach((node) => {
        const pos = positions.get(node.id);
        if (!pos) return;

        const color = categoryColors[node.category] || "#ffffff";
        const isHovered = currentHovered === node.id;
        const isSelected = currentSelected === node.id;
        const radius = isHovered || isSelected ? 10 : 6.5;

        // Radial glow
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius * 2.5);
        grd.addColorStop(0, color.replace(")", ", 0.35)").replace("rgb", "rgba"));
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected || isHovered ? color : "rgba(10, 15, 25, 0.85)";
        ctx.strokeStyle = color;
        ctx.lineWidth = isSelected ? 2.5 : 1.2;
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = `${isHovered || isSelected ? "bold 10px" : "8.5px"} var(--font-mono), monospace`;
        ctx.fillStyle = isHovered || isSelected ? "#ffffff" : "rgba(255,255,255,0.65)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, pos.x, pos.y + radius + 12);
      });
    };

    draw();

    // Mouse Interactions (Updates ref with zero component re-render overhead)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      nodePositions.current.forEach((pos, id) => {
        const dist = Math.hypot(mx - pos.x, my - pos.y);
        if (dist < 14) found = id;
      });
      hoveredIdRef.current = found;
      canvas.style.cursor = found ? "pointer" : "default";
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: GraphNode | null = null;
      nodePositions.current.forEach((pos, id) => {
        const dist = Math.hypot(mx - pos.x, my - pos.y);
        if (dist < 14) {
          found = graphNodes.find((n) => n.id === id) || null;
        }
      });
      setSelected(found);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const resizeObserver = new ResizeObserver(() => {
      computePositions();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  // Related links for selected node
  const relatedLinks = selected
    ? graphLinks.filter((l) => l.source === selected.id || l.target === selected.id)
    : [];

  return (
    <div className="flex flex-col h-full font-mono bg-black/20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-panel-border flex items-center space-x-2 shrink-0">
        <Network className="w-4 h-4 text-cyber-cyan" />
        <h3 className="text-[11px] text-white font-bold tracking-wider neon-text-cyan font-cinzel">
          SYSTEMS KNOWLEDGE GRAPH
        </h3>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-panel-border shrink-0 flex flex-wrap gap-2">
        {[
          { cat: "environment", color: "#00f0ff" },
          { cat: "agriculture", color: "#39ff14" },
          { cat: "demography", color: "#f59e0b" },
          { cat: "economy", color: "#fb923c" },
          { cat: "institutions", color: "#bd00ff" },
          { cat: "culture", color: "#f472b6" },
        ].map((item) => (
          <div key={item.cat} className="flex items-center space-x-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[8px] text-gray-400 capitalize">{item.cat}</span>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="relative flex-1 min-h-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      {/* Selected node details */}
      {selected && (
        <div className="border-t border-panel-border p-4 shrink-0 bg-black/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-cyber-cyan font-bold tracking-wider">{selected.label}</span>
            <button
              onClick={() => setSelected(null)}
              className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              aria-label="Close details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed font-serif">{selected.description}</p>
          {selected.telemetryMetrics && (
            <div className="text-[8.5px] text-zinc-400 font-mono bg-black/40 px-2.5 py-1.5 rounded border border-panel-border/40">
              {selected.telemetryMetrics}
            </div>
          )}
          {relatedLinks.length > 0 && (
            <div className="pt-1 space-y-1.5">
              <div className="text-[8.5px] text-zinc-500 uppercase tracking-widest font-bold">Causal Linkages</div>
              {relatedLinks.map((l, i) => (
                <div key={i} className="text-[9.5px] text-gray-400 leading-normal">
                  <span className="text-cyber-cyan font-bold">{l.relationship.toUpperCase()}</span>{" "}
                  → {l.explanation}
                </div>
              ))}
            </div>
          )}
          {onAskAboutNode && (
            <button
              onClick={() => onAskAboutNode(selected)}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff]/20 text-[10px] font-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3 h-3" />
              Ask Civilens About This Dynamic
            </button>
          )}
        </div>
      )}
    </div>
  );
}
