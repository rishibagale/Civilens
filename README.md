# Earth Intelligence (Curios)

Interactive exploration app connecting geography, climate, migration, anthropology, and civilization.

## Globe (free — no API key)

The dashboard uses **[MapLibre GL JS](https://maplibre.org/)** with the official free demo style:

`https://demotiles.maplibre.org/style.json`

No Mapbox account or paid plan required. If MapLibre fails to load (offline, blocked CDN), the app falls back to the built-in **Three.js holographic globe**.

## Getting Started

```bash
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — landing page  
- [http://localhost:3000/app](http://localhost:3000/app) — dashboard with 3D globe

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Stack

- Next.js 16, React 19
- MapLibre GL JS (primary map)
- Three.js (fallback globe)
- Framer Motion, Tailwind CSS 4
