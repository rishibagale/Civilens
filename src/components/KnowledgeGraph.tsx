"use client";

import React, { useEffect, useRef, useState } from "react";
import { graphNodes, graphLinks, GraphNode } from "@/data/knowledgeGraphData";
import { Network } from "lucide-react";

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Node positions (computed once)
  const nodePositions = useRef<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Compute circular + clustered positions
    const positions = nodePositions.current;
    if (positions.size === 0) {
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) * 0.36;
      graphNodes.forEach((node, i) => {
        const angle = (i / graphNodes.length) * Math.PI * 2 - Math.PI / 2;
        // Slight radial jitter by category
        const rJitter = r * (node.category === "environment" ? 0.6 : node.category === "culture" ? 1 : 0.82);
        positions.set(node.id, {
          x: cx + Math.cos(angle) * rJitter,
          y: cy + Math.sin(angle) * rJitter,
        });
      });
    }

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
      ctx.clearRect(0, 0, W, H);

      // Draw links
      graphLinks.forEach((link) => {
        const from = positions.get(link.source);
        const to = positions.get(link.target);
        if (!from || !to) return;

        const isRelated =
          hoveredId &&
          (link.source === hoveredId || link.target === hoveredId);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = isRelated
          ? "rgba(0,240,255,0.75)"
          : "rgba(255,255,255,0.06)";
        ctx.lineWidth = isRelated ? 1.5 : 0.8;
        ctx.stroke();

        // Animated dot along link when hovered
        if (isRelated) {
          const prog = (Math.sin(t) * 0.5 + 0.5);
          const px = from.x + (to.x - from.x) * prog;
          const py = from.y + (to.y - from.y) * prog;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#00f0ff";
          ctx.fill();
        }
      });

      // Draw nodes
      graphNodes.forEach((node) => {
        const pos = positions.get(node.id);
        if (!pos) return;

        const color = categoryColors[node.category] || "#ffffff";
        const isHovered = hoveredId === node.id;
        const isSelected = selected?.id === node.id;
        const radius = isHovered || isSelected ? 10 : 6.5;

        // Glow
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
        ctx.fillStyle = isSelected || isHovered ? color : color.replace(")", ",0.45)").replace("rgb(", "rgba(");
        ctx.strokeStyle = color;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = `bold ${isHovered || isSelected ? 10 : 8.5}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = isHovered || isSelected ? "#ffffff" : "rgba(255,255,255,0.55)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, pos.x, pos.y + radius + 12);
      });
    };

    draw();

    // Mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      graphNodes.forEach((node) => {
        const pos = positions.get(node.id);
        if (!pos) return;
        const dist = Math.hypot(mx - pos.x, my - pos.y);
        if (dist < 14) found = node.id;
      });
      setHoveredId(found);
      canvas.style.cursor = found ? "pointer" : "default";
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: GraphNode | null = null;
      graphNodes.forEach((node) => {
        const pos = positions.get(node.id);
        if (!pos) return;
        const dist = Math.hypot(mx - pos.x, my - pos.y);
        if (dist < 14) found = node;
      });
      setSelected(found);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredId, selected]);

  // Related links for selected node
  const relatedLinks = selected
    ? graphLinks.filter((l) => l.source === selected.id || l.target === selected.id)
    : [];

  return (
    <div className="flex flex-col h-full font-mono bg-black/20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-panel-border flex items-center space-x-2 shrink-0">
        <Network className="w-4 h-4 text-cyber-cyan" />
        <h3 className="text-[11px] text-white font-bold tracking-wider neon-text-cyan">
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
      <div className="relative flex-1 min-h-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      {/* Selected node details */}
      {selected && (
        <div className="border-t border-panel-border p-4 shrink-0 bg-black/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyber-cyan font-bold tracking-wider">{selected.label}</span>
            <button
              onClick={() => setSelected(null)}
              className="text-[8px] text-gray-500 hover:text-gray-300"
            >
              ✕ CLOSE
            </button>
          </div>
          <p className="text-[10px] text-gray-300 leading-relaxed">{selected.description}</p>
          {selected.telemetryMetrics && (
            <div className="text-[8px] text-gray-500 font-mono bg-black/30 px-2 py-1 rounded border border-panel-border/50">
              {selected.telemetryMetrics}
            </div>
          )}
          {relatedLinks.length > 0 && (
            <div className="pt-1 space-y-1">
              <div className="text-[8px] text-gray-500 uppercase tracking-wider">Linked Systems</div>
              {relatedLinks.map((l, i) => (
                <div key={i} className="text-[9px] text-gray-400 leading-normal">
                  <span className="text-cyber-cyan">{l.relationship.toUpperCase()}</span>{" "}
                  → {l.explanation}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
