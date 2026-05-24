"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Wind, Mountain, Users, Leaf, Cpu, Compass } from "lucide-react";

// ─── Tiny holographic globe for the hero background ────────────────────────
function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    el.appendChild(renderer.domElement);

    const R = 70;

    // Ocean core
    const oceanMesh = new THREE.Mesh(
      new THREE.SphereGeometry(R - 0.5, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x05090f,
        emissive: 0x020510,
        specular: 0x0d1f3c,
        shininess: 10,
        transparent: true,
        opacity: 0.9,
      })
    );
    scene.add(oceanMesh);

    // Grid wireframe
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(R, 36, 36),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.08 })
    );
    scene.add(grid);

    // Outer atmosphere glow (billboard ring)
    const atmos = new THREE.Mesh(
      new THREE.SphereGeometry(R + 3, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.04, side: THREE.BackSide })
    );
    scene.add(atmos);

    // Particle starfield
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 900;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.55 })
      )
    );

    // Accent lights
    scene.add(Object.assign(new THREE.DirectionalLight(0x00f0ff, 1.5), { position: new THREE.Vector3(120, 60, 120) }));
    scene.add(Object.assign(new THREE.DirectionalLight(0xbd00ff, 0.9), { position: new THREE.Vector3(-120, -60, -120) }));
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    // Orbiting sample city dots
    const cityCoords = [
      [40.7128, -74.006],   // New York
      [51.5074, -0.1278],   // London
      [35.6762, 139.6503],  // Tokyo
      [28.6139, 77.209],    // Delhi
      [31.2001, 29.9187],   // Alexandria
      [-33.8688, 151.2093], // Sydney
      [-22.9068, -43.1729], // Rio
      [55.7558, 37.6176],   // Moscow
      [1.3521, 103.8198],   // Singapore
      [-1.2921, 36.8219],   // Nairobi
    ];

    const cityGroup = new THREE.Group();
    scene.add(cityGroup);
    cityCoords.forEach(([lat, lng]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const pos = new THREE.Vector3(
        -(R * Math.sin(phi) * Math.sin(theta)),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.cos(theta)
      );
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff })
      );
      dot.position.copy(pos);
      cityGroup.add(dot);
    });

    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      grid.rotation.y += 0.0014;
      oceanMesh.rotation.y += 0.0014;
      cityGroup.rotation.y += 0.0014;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}

// ─── Feature sections ──────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Globe,
    title: "Geography",
    color: "#00f0ff",
    description: "Explore how rivers, mountains, deserts, and coastlines determined where civilizations flourished and where they perished.",
  },
  {
    icon: Users,
    title: "Anthropology",
    color: "#bd00ff",
    description: "Trace migration routes, ethnic composition, social hierarchies, and how populations adapted to their environments across millennia.",
  },
  {
    icon: Wind,
    title: "Climate",
    color: "#38bdf8",
    description: "Understand how monsoons, ice ages, droughts, and ocean currents became the invisible architects of human civilization.",
  },
  {
    icon: Compass,
    title: "Migration",
    color: "#f472b6",
    description: "Follow the paths of ancient peoples — from the Out-of-Africa dispersal to the Polynesian mastery of the Pacific.",
  },
  {
    icon: Mountain,
    title: "Culture",
    color: "#fb923c",
    description: "Discover how cuisine, religion, language, art, and governance systems emerge from a society's relationship with its land.",
  },
  {
    icon: Leaf,
    title: "Biodiversity",
    color: "#39ff14",
    description: "Map the flora, fauna, and ecosystems that fed, inspired, and threatened human societies across every biome on Earth.",
  },
  {
    icon: Cpu,
    title: "AI Insights",
    color: "#a78bfa",
    description: "Ask interdisciplinary questions and receive synthesized analyses connecting geography, climate, history, and culture.",
  },
];

// ─── Civilization preview cards ────────────────────────────────────────────
const CIVI_CARDS = [
  { label: "The Silk Road", span: "130 BC – 1453 CE", color: "#f59e0b" },
  { label: "Polynesian Navigation", span: "800 – 1400 CE", color: "#00f0ff" },
  { label: "Nile Hydraulic Empire", span: "3100 – 30 BC", color: "#39ff14" },
  { label: "Mongol Steppe Cavalry", span: "1206 – 1368 CE", color: "#bd00ff" },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Globe background */}
        <HeroGlobe />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#030408_80%)] pointer-events-none" />

        {/* Animated grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
            <span>AI CIVILIZATION INTELLIGENCE SYSTEM — ONLINE</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4"
            style={{
              textShadow: "0 0 60px rgba(0,240,255,0.3), 0 0 120px rgba(189,0,255,0.15)",
            }}
          >
            Earth
            <span className="block" style={{ color: "#00f0ff" }}>
              Intelligence
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl md:text-2xl text-gray-300 mb-3 font-light"
          >
            Explore how Earth shaped humanity.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 font-mono mb-10 max-w-xl mx-auto leading-relaxed"
          >
            An interactive exploration engine connecting geography, climate, migration, anthropology, and civilization into a unified model of how our world works.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/app"
              className="group relative inline-flex items-center space-x-3 bg-cyber-cyan text-black font-bold font-mono text-sm px-8 py-4 rounded-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-105"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center space-x-2 border border-panel-border text-gray-300 hover:text-white hover:border-gray-400 font-mono text-sm px-8 py-4 rounded-lg transition-all"
            >
              <span>Learn More</span>
            </a>
          </motion.div>
        </div>

        {/* Floating civilization preview cards */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-3 z-10 overflow-x-auto px-6 max-w-full">
          {CIVI_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="shrink-0 glass-panel rounded-lg px-4 py-2.5 font-mono"
              style={{ borderColor: card.color + "35" }}
            >
              <div className="text-[10px] font-bold" style={{ color: card.color }}>{card.label}</div>
              <div className="text-[8px] text-gray-500 mt-0.5">{card.span}</div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-600 font-mono text-[9px]"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-px h-6 bg-gradient-to-b from-gray-600 to-transparent mt-1" />
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-mono text-cyber-cyan tracking-widest mb-4">SYSTEM MODULES</div>
          <h2 className="text-4xl font-bold text-white mb-4">Seven Lenses on Humanity</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each lens reveals a different layer of how the physical world sculpted human identity, culture, and civilization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card rounded-xl p-6 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: feat.color + "18", border: `1px solid ${feat.color}35` }}
                >
                  <Icon className="w-5 h-5" style={{ color: feat.color }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="text-xs font-mono text-cyber-cyan tracking-widest mb-4">READY TO EXPLORE?</div>
          <h2 className="text-5xl font-bold text-white mb-6">
            The entire story of humanity is written in Earth&apos;s geography.
          </h2>
          <p className="text-gray-400 mb-10 font-mono text-sm">
            Start with a country, a climate, an empire, or a question — and follow the connections wherever they lead.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center space-x-3 bg-cyber-cyan text-black font-bold font-mono text-sm px-10 py-4 rounded-lg hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] hover:scale-105 transition-all"
          >
            <span>Launch Earth Intelligence</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-panel-border py-8 px-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-gray-600">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <Globe className="w-4 h-4 text-cyber-cyan" />
          <span className="text-white font-bold tracking-widest">EARTH INTELLIGENCE</span>
          <span>© 2026</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
          <span>ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </main>
  );
}
