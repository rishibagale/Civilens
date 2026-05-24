# Earth Intelligence (Curios)

Interactive exploration app connecting geography, climate, migration, anthropology, and civilization — built with **Next.js 16** and a **free Three.js holographic globe** (no Mapbox, no API keys).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, then **Start Exploring** for the dashboard at `/app`.

The globe is rendered entirely in the browser with WebGL: wireframe sphere, stylized continent outlines, country/civilization markers, trade routes, and migration arcs. **Nothing to pay for.**

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Stack

- Next.js 16 (App Router)
- React 19
- Three.js (3D globe)
- Framer Motion, Tailwind CSS 4
