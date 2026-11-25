# Civilens (Earth Intelligence / Curios)

**Repository**: [https://github.com/rishibagale/Civilens](https://github.com/rishibagale/Civilens)

Interactive exploration app connecting geography, climate, migration, anthropology, and civilization through dual-lens Earth observation: historical anthropological intelligence and spaceborne 3D planetary rendering.

---

## 🌍 Dual-Engine 3D Globes (Free — No API Key Required)

Civilens includes two complementary visualization engines with instant one-click switching in the HUD:

1. **Three.js Earth & HoloGlobe (Primary)**:
   - **Photorealistic NASA Blue Marble**: Equirectangular day surface texture, ocean specular glint, and night-side city lights (amber sodium illumination).
   - **Atmospheric Clouds**: Floating cloud sphere with real-time slow rotational drift and limb atmospheric scattering.
   - **3 Visual Modes**:
     - **HYBRID (Default)**: Photorealistic satellite Earth underneath glowing neon continent outlines, trade routes, migration vectors, and historical event markers.
     - **EARTH**: Pure NASA Blue Marble satellite view with night lights.
     - **CYBER**: Classic HoloGlobe dark ocean with cyan wireframe grid.
   - **Physics-Based Orbital Controls**: Direct 1:1 surface dragging (`radiansPerPixel`), exponential momentum coasting on release, smooth logarithmic zoom easing, tilt/heading angles, and great-circle slerp camera flights to historical events.
   - **Real-Time Geodetic Telemetry**: Live cursor raycasting showing exact latitude/longitude, altitude in kilometers, animated precision targeting reticle, and ground distance magnitude.

2. **MapLibre GL JS 3D Globe**:
   - Uses the official free MapLibre demo style: `https://demotiles.maplibre.org/style.json`.
   - Free, zero-API-key vector tile exploration.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) (or `/app`) — Dashboard with 3D Globe & Earth Intelligence Explorer

---

## 🛠️ Scripts

- `npm run dev` — Start Next.js development server
- `npm run build` — Optimized Next.js 16 production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint verification

---

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **3D Visualization**: Three.js (HoloGlobe with custom Earth shader, clouds, and physics controls), MapLibre GL JS
- **Styling & Animation**: Tailwind CSS 4, Framer Motion, Lucide Icons
- **Data & Intelligence**: Curated historical events across 5 eras, civilization knowledge graphs, country narratives, and causal chains

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
