"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Eye, Map, Shield, Award, Zap, Anchor, Globe } from "lucide-react";

// ─── Cinematic Holographic Globe (THREE.js) ────────────────────────
function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;
    const scene = new THREE.Scene();
    
    // Deeper fog for a cinematic space horizon
    scene.fog = new THREE.FogExp2(0x020204, 0.002);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    el.appendChild(renderer.domElement);

    const R = 72;

    // Outer atmosphere glow
    const atmosGeo = new THREE.SphereGeometry(R + 4, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // electric teal
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    const atmos = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmos);

    // Earth Core (Dark space velvet)
    const coreGeo = new THREE.SphereGeometry(R - 1, 64, 64);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x050402, // Deep charcoal with gold undertone
      emissive: 0x030201,
      specular: 0xd4af37, // gold specular reflections
      shininess: 15,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Glowing coordinate lines (electric teal & amber gold grid)
    const gridGeo = new THREE.SphereGeometry(R, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff, // electric teal
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    scene.add(grid);

    // Golden amber equator ring
    const ringGeo = new THREE.RingGeometry(R + 10, R + 10.4, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Gold/amber
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Beautiful stars/particles (amber and teal cosmic dust)
    const particleCount = 2400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorTeal = new THREE.Color(0x00f0ff);
    const colorGold = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = R + 10 + Math.random() * 150; // scatter outside the globe

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      const mixedColor = Math.random() > 0.6 ? colorGold : colorTeal;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });

    const starfield = new THREE.Points(particleGeo, particleMat);
    scene.add(starfield);

    // Cinematic amber and electric teal lights
    const amberLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    amberLight.position.set(150, 80, 100);
    scene.add(amberLight);

    const tealLight = new THREE.DirectionalLight(0x00f0ff, 1.4);
    tealLight.position.set(-150, -80, -100);
    scene.add(tealLight);

    scene.add(new THREE.AmbientLight(0x101015, 0.4));

    // Dynamic cities/nodes glowing on the globe
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodesData = [
      [35.6762, 139.6503],  // Tokyo
      [31.2001, 29.9187],   // Alexandria
      [1.3521, 103.8198],   // Singapore
      [-33.8688, 151.2093], // Sydney
      [40.7128, -74.006],   // New York
      [51.5074, -0.1278],   // London
      [-22.9068, -43.1729], // Rio
    ];

    nodesData.forEach(([lat, lng]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const pos = new THREE.Vector3(
        -(R * Math.sin(phi) * Math.sin(theta)),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.cos(theta)
      );

      // Gold dot
      const nodeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.85 })
      );
      nodeMesh.position.copy(pos);
      nodesGroup.add(nodeMesh);

      // Connection arc simulation
      const ringGlow = new THREE.Mesh(
        new THREE.RingGeometry(1.8, 2.2, 16),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      );
      ringGlow.position.copy(pos);
      ringGlow.lookAt(0, 0, 0);
      nodesGroup.add(ringGlow);
    });

    const animate = () => {
      grid.rotation.y += 0.0009;
      core.rotation.y += 0.0009;
      nodesGroup.rotation.y += 0.0009;
      starfield.rotation.y += 0.0003;
      ring.rotation.z -= 0.0004;

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(el);
    onResize();

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none min-h-[400px] z-0" />;
}

// ─── Insight Example: Why did Japan become Japan? ──────────────────────
const JAPAN_CHAIN = [
  {
    step: "01",
    phase: "GEOGRAPHY",
    title: "The Volcanic Moat",
    desc: "A cluster of 6,000 rugged, resource-poor volcanic islands isolated in the volatile Pacific. Mountains left less than 15% of the land arable, making survival inherently highly coordinated and challenging.",
    icon: Compass,
    color: "#f59e0b", // Amber
    highlight: "ARCHIPELAGO FREQUENCY"
  },
  {
    step: "02",
    phase: "ISOLATION",
    title: "The Locked Border",
    desc: "Treacherous ocean boundaries enabled geopolitical seclusion. Under Tokugawa, the country enacted 'Sakoku' (closed country) for 250 years, completely sealing off external influences and consolidating a hyper-homogenous society.",
    icon: Shield,
    color: "#d4af37", // Gold
    highlight: "SAKOKU BOUNDARY"
  },
  {
    step: "03",
    phase: "CULTURE",
    title: "Efficiency as Art",
    desc: "Under strict ecological ceilings and zero resource expansion, communities turned inward. Discipline, micro-cooperation, and 'monozukuri' (the spiritual art of making things) became the core social operating system.",
    icon: Award,
    color: "#00f0ff", // Electric Teal
    highlight: "ECO-EFFICIENCY RATIO"
  },
  {
    step: "04",
    phase: "TECHNOLOGY",
    title: "Industrial Mastery",
    desc: "When isolation abruptly ended, Japan did not collapse. Instead, it re-engineered its centuries of deep cooperative discipline, spatial efficiency, and craftsmanship to spearhead a global industrial and technological miracle.",
    icon: Zap,
    color: "#eab308", // Vivid Amber
    highlight: "HYPER-EVOLUTION PHASE"
  }
];

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="relative min-h-screen bg-[#020204] text-[#f1f5f9] overflow-x-hidden selection:bg-[#f59e0b]/30">
      {/* ── MINIMAL FLOATING NAVIGATION ── */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-5 h-5 rounded-full border border-[#f59e0b]/50 bg-[#f59e0b]/5 flex items-center justify-center transition-all group-hover:border-[#00f0ff]">
            <Globe className="w-2.5 h-2.5 text-[#f59e0b] group-hover:text-[#00f0ff] transition-colors" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#f1f5f9] block uppercase">
              EARTH INTELLIGENCE
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-6 text-[10px] font-mono tracking-widest text-[#a1a1aa]">
          <span className="hidden sm:inline-block text-[#f59e0b]/70 font-semibold">● TELEMETRY LIVE</span>
          <span className="border border-[#e1e1e9]/10 px-2 py-1 rounded bg-[#111]/30">v1.2</span>
        </div>
      </nav>

      {/* ── HERO SECTION (CINEMATIC, GLOBE FRONT AND CENTER) ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(15,10,5,0.45)_0%,_rgba(2,2,4,1)_85%)]">
        {/* Alive, rotating 3D globe */}
        <HeroGlobe />

        {/* Ambient grids and scan lines */}
        <div className="absolute inset-0 cyber-grid-bg opacity-[0.15] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020204_75%)] pointer-events-none" />

        {/* Cinematic Content overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center select-none">
          {/* Question-provoking opening line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-[11px] sm:text-xs font-mono tracking-[0.4em] text-[#f59e0b] uppercase mb-4 text-shadow-glow"
          >
            How does land write our destiny?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight text-white mb-8 leading-[1.1] font-serif"
            style={{
              textShadow: "0 0 80px rgba(245,158,11,0.15), 0 0 120px rgba(0,240,255,0.1)"
            }}
          >
            A silent architect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#00f0ff] filter drop-shadow-[0_2px_20px_rgba(0,240,255,0.15)]">
              of human civilization.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.8 }}
            className="text-[11px] sm:text-xs font-mono text-zinc-500 max-w-md mx-auto leading-relaxed uppercase tracking-wider mb-12"
          >
            Connecting climate, geography, migration, and culture into a singular model of exploration.
          </motion.p>

          {/* ONE Clear CTA: Explore Earth - Nothing else above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <Link
              href="/app"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-[#f59e0b] to-[#d4af37] hover:from-[#00f0ff] hover:to-[#00d2ff] text-black font-bold font-mono tracking-widest text-[11px] uppercase px-10 py-5 rounded-full transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] transform hover:scale-[1.03]"
            >
              <span>Explore Earth</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 pointer-events-none">
          <span className="font-mono text-[8px] tracking-[0.3em] text-[#a1a1aa] mb-2 uppercase">THE INTELLIGENCE LOOP</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#f59e0b] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── VISCERAL INSIGHT EXAMPLE: WHY DID JAPAN BECOME JAPAN? ── */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#020204] via-[#080604] to-[#020204]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.03)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono text-[#00f0ff] tracking-[0.4em] uppercase block mb-3">SYNAPTIC DEMONSTRATION</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white mb-4">
              Why did Japan become Japan?
            </h2>
            <p className="text-zinc-500 text-xs font-mono max-w-xl mx-auto uppercase tracking-wide leading-relaxed">
              Trace how geographic constraints cascade into cultural philosophies and technological superpowers.
            </p>
          </div>

          {/* Interactive Causal Chain Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Step navigation & text details */}
            <div className="lg:col-span-5 space-y-3">
              {JAPAN_CHAIN.map((item, idx) => {
                const isSelected = activeStep === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start space-x-4 ${
                      isSelected
                        ? "bg-[#14110f] border-[#f59e0b]/40 shadow-[0_4px_30px_rgba(245,158,11,0.05)]"
                        : "bg-[#050508]/40 border-zinc-900/50 hover:border-zinc-800 hover:bg-[#07070b]/60"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: isSelected ? `${item.color}15` : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isSelected ? `${item.color}40` : "rgba(255,255,255,0.05)"}`
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: isSelected ? item.color : "#71717a" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-mono text-[#a1a1aa] tracking-widest uppercase">{item.phase}</span>
                        <span className="text-[9px] font-mono text-[#f59e0b]" style={{ color: isSelected ? item.color : "#52525b" }}>{item.step}</span>
                      </div>
                      <h3 className={`text-sm font-semibold tracking-wide ${isSelected ? "text-white" : "text-zinc-400"}`}>
                        {item.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated live visual dashboard/report card (Revealed content) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.98, x: 15 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -15 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#060608] p-8 md:p-10 shadow-2xl flex flex-col justify-between min-h-[360px]"
                >
                  {/* Holographic glowing lines */}
                  <div className="absolute inset-0 cyber-grid-bg opacity-[0.1] pointer-events-none" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />

                  {/* Telemetry metadata */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                      <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">
                        SYNAPSE REPORT // REGION: JP
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#00f0ff] border border-[#00f0ff]/20 px-2.5 py-0.5 rounded bg-[#00f0ff]/5">
                      {JAPAN_CHAIN[activeStep].highlight}
                    </span>
                  </div>

                  {/* Body description */}
                  <div className="flex-1 space-y-6">
                    <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-[0.2em]">
                      {JAPAN_CHAIN[activeStep].phase} ANALYSIS
                    </span>
                    <h3 className="text-2xl font-serif text-white leading-snug">
                      {JAPAN_CHAIN[activeStep].title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-mono leading-relaxed text-justify">
                      {JAPAN_CHAIN[activeStep].desc}
                    </p>
                  </div>

                  {/* Footer node details */}
                  <div className="border-t border-zinc-900 pt-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <Anchor className="w-4 h-4 text-zinc-600" />
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        Linked Factors: Climate, Sea Straits, Isolation, Technology
                      </span>
                    </div>
                    <Link
                      href="/app"
                      className="text-[9px] font-mono text-[#00f0ff] hover:text-[#f59e0b] transition-colors flex items-center space-x-1 uppercase tracking-widest"
                    >
                      <span>Observe Live Model</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900/50 py-12 px-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-zinc-600 bg-black">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#f59e0b]" />
          </div>
          <span className="text-zinc-400 font-semibold tracking-wider">EARTH INTELLIGENCE</span>
          <span>© 2026</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="tracking-widest">COGNITIVE ECOSYSTEM NOMINAL</span>
        </div>
      </footer>
    </main>
  );
}
