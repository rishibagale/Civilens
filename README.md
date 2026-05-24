# Earth Intelligence (Curios)

Interactive exploration app connecting geography, climate, migration, anthropology, and civilization — built with Next.js 16, Three.js, and optional Mapbox GL.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, then **Start Exploring** for the dashboard at `/app`.

### Mapbox (optional)

Copy `.env.local.example` to `.env.local` and set your token:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
```

Without a valid token, the app uses a **Three.js holographic globe** automatically. Invalid tokens fall back to the same mode.

Get a token at [mapbox.com](https://account.mapbox.com/).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Stack

- Next.js 16 (App Router)
- React 19
- Three.js (fallback globe)
- Mapbox GL JS (optional 3D globe)
- Framer Motion, Tailwind CSS 4
