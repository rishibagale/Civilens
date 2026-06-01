# Earth Intelligence Exploration Engine

## 🎯 Project Goal

Transform Earth Intelligence from a landing page + basic globe into an **addictive exploration engine** that generates continuous curiosity loops. Users should feel compelled to ask the next question at every interaction.

### Core Philosophy
- **Exploration First**: Build discovery mechanics before homepage refinements
- **Balanced AI**: 50% curated insights + 50% AI-generated (architecture ready for Claude API integration)
- **Progressive Architecture**: Start with static responses that feel AI-powered; plug real API later without refactoring
- **Zero Dead Ends**: Every interaction creates 5+ new exploration paths

---

## 📋 Strategic Approach

### Why This Works
1. **Curiosity Loops**: Each country selection reveals follow-up questions, keeping users engaged
2. **Hybrid Model**: Curated content ensures quality; templates provide personalization at scale
3. **API-Ready**: `aiSynthesisEngine` abstracts between 3 modes (curated/template/API) — drop in Claude API without code changes
4. **Fast to Market**: Pre-built narratives ship quickly; AI enhancement is optional layer

---

## ✅ COMPLETED: Week 1 & 2 Development

### Week 1: Discovery Engine Foundation

#### Systems Built

##### 1. **AI Synthesis Engine** (`src/services/aiSynthesisEngine.ts`)
Central abstraction layer supporting 3 modes:
- **Curated Mode**: Hand-written insights for 6 key countries (Egypt, India, Brazil, China, Saudi Arabia, Russia) across 5 eras
- **Template Mode**: Fill-in-the-blanks storytelling that feels personalized (8 causal patterns: climate→agriculture→civilization)
- **API Mode**: Ready for Claude API integration (no refactoring needed)

Features:
- Generate insights with contextual follow-up questions
- Match related countries (same climate, religion, geography)
- Identify contrasting regions for exploration paths

##### 2. **Dynamic Curiosity System** (`src/data/curiosity-prompts.ts`)
60+ curiosity questions indexed by:
- **Categories**: climate, culture, geography, history, anthropology, economics
- **Tags**: tropical, desert, island, trade, migration, etc.
- **Triggers**: by country, climate zone, era

Example questions:
- "Why is Brazil genetically diverse?"
- "Why are Mediterranean cultures different from Nordic?"
- "Why do deserts produce empires?"

##### 3. **Story Templates** (`src/data/insight-templates.ts`)
50+ narrative templates with dynamic placeholders:
- 8 causal connection patterns
- Climate + terrain data integration
- Enables template-based insight generation at scale

##### 4. **Related Insights Hook** (`src/hooks/useRelatedInsights.ts`)
Generates exploration paths:
- Follow-up questions based on selected country
- Related countries (climate/religion/geography matches)
- Contrasting regions (why did they diverge?)
- Structured exploration breadcrumbs

##### 5. **Curiosity Feed Component** (`src/components/CuriosityFeed.tsx`)
Beautiful card carousel UI:
- 6-8 dynamic curiosity cards
- Color-coded by category (climate=blue, culture=purple, geography=emerald)
- Each card: question, category label, preview stat, tags
- "Related places" section with contrasts
- Refresh button for new discoveries
- Integrated into sidebar as "DISCOVER" panel (Lightbulb icon)

### Week 2: UI Responsiveness & Temporal Features

#### 🔧 UI/UX Improvements

**1. Map Enhancements**
- Fixed map pitch from `0°` to `-12°` for better globe perspective
- Adjusted zoom from `1.5` to `1.8` to show full globe exposure
- Improved map container sizing for mobile/desktop responsiveness
- Added proper width/height constraints to prevent overflow

**2. Mobile Responsiveness Fixes**
- **Floating Action Buttons**: Now fully visible (all 4 buttons: ASK, CONNECT, DISCOVER, LAYERS)
  - Increased size to w-14 h-14 (56px)
  - Better positioning with z-index layering
  - Improved backdrop blur and border styling
  - Positioned at bottom-right with better spacing (bottom-6 right-4)
  
- **Left Drawer Panel**: 
  - Uses 85vw (viewport width) on mobile for better UX
  - Proper responsive widths: w-[85vw] sm:w-96 md:w-96
  - Smooth animations and transitions
  - Close button always visible

- **Map Container**:
  - Full width/height coverage on mobile and desktop
  - Proper overflow handling
  - Responsive image rendering across devices

**3. Desktop Layout Improvements**
- Sidebar redesigned with better spacing
  - Width reduced from w-20 to w-16
  - Icon sizing improved (w-5 h-5)
  - Better hover states and active indicators
  - Improved shadow and glow effects on active state
  - Added background color for better contrast

**4. Temporal Features** (`src/components/TimelineSlider.tsx`)
Complete redesign for better UX:
- **Header**: Shows era name and time span with better typography
  - Era labels now readable with proper font sizes
  - Clear display of era timeline duration
  
- **Era Timeline**:
  - Larger era nodes (w-8 h-8 instead of w-6 h-6)
  - Better progress line visualization
  - Improved hover states and transitions
  - Clear visual hierarchy (active/past/future states)
  
- **Event Carousel**:
  - Event cards expanded to w-56 (previously w-44)
  - Better padding and spacing (p-3 instead of p-1.5)
  - Improved readability (text-xs for title, text-xs for year)
  - New impact icons: ⚡ (major), ▪ (significant), ◆ (regional)
  - Better color-coding with proper opacity levels
  - Expanded descriptions visible on selection
  - Better hover animations and shadows

- **Layout Height**:
  - Changed from maxHeight: 30vh to height: 35vh with minHeight: 200px
  - Ensures timeline is always sufficiently visible
  - Better space allocation when layers panel is open

**5. Layer Control** (`src/components/LayerControl.tsx`)
Enhanced layer management panel:
- **Improved Typography**:
  - Section labels now text-xs (previously text-[9px])
  - Layer names text-xs font-semibold
  - Descriptions text-xs with better leading
  
- **Better Visual Hierarchy**:
  - Larger indicator dots (w-2 h-2)
  - Better spacing between sections
  - Improved border and background colors
  
- **Enhanced Interactivity**:
  - Larger touch targets for mobile (p-3)
  - Better hover effects with shadow and scale
  - Active state shows cyan glow effect
  - Icon sizing improved (Eye/EyeOff w-4 h-4)

- **Better Content Organization**:
  - 3 layer categories: Environmental, Human, Historical
  - Each category shows grouped layers
  - Descriptions now more readable
  - Footer alert about layer updates

### Files Created
```
src/services/aiSynthesisEngine.ts        (280 lines) — Core synthesis engine
src/data/curiosity-prompts.ts            (300 lines) — 60+ curiosity questions
src/data/insight-templates.ts            (200 lines) — 50+ story templates
src/hooks/useRelatedInsights.ts           (280 lines) — Related insights generation
src/components/CuriosityFeed.tsx          (250 lines) — Curiosity card component
src/components/TimelineSlider.tsx         (180 lines) — Improved temporal explorer
src/components/LayerControl.tsx           (160 lines) — Enhanced layer management
EARTH_INTELLIGENCE_APP.md                 (Comprehensive project documentation)
```

### Files Modified
```
src/app/app/page.tsx                     — Responsive layout, improved panels
src/components/MapLibreGlobeGlobe.tsx    — Map pitch/zoom fixes
```

---

## 🚀 Current State

### Dev Environment
- **Dev Server**: `http://localhost:3000`
- **Landing Page**: `http://localhost:3000`
- **Dashboard**: `http://localhost:3000/app`

### Testing Features

**Responsive UI**:
1. Open `http://localhost:3000/app` on mobile and desktop
2. Map should display full globe with proper 3D angle
3. Floating action buttons visible on mobile (bottom-right)
4. Desktop sidebar icons visible on left
5. All panels (ASK, CONNECT, DISCOVER, LAYERS) accessible

**Temporal Features**:
1. Click **LAYERS** button (bottom-right on mobile, left sidebar on desktop)
2. Toggle various map layers (climate, trade routes, migration flows, etc.)
3. Click **TEMPORAL** indicator at bottom to expand timeline
4. Select different eras (Ancient, Medieval, Colonial, Modern, Future)
5. Click on historical events to see details and fly-to location on map

**Curiosity Exploration**:
1. Click **DISCOVER** button (Lightbulb icon)
2. Select a country on the map
3. See dynamic curiosity questions appear
4. Click any question to explore
5. Related countries and exploration paths suggested

### What Works Now ✅
✅ Full responsive UI (mobile, tablet, desktop)
✅ Map displays full globe with proper perspective (pitch -12°, zoom 1.8)
✅ All 4 floating action buttons visible and functional on mobile
✅ Desktop sidebar with improved icon sizing and states
✅ Temporal Explorer with readable event cards (w-56)
✅ Layer Control with enhanced readability (text-xs)
✅ Left drawer panels responsive (85vw on mobile, 96px on desktop)
✅ AI Synthesis Layer (curated/template modes fully functional)
✅ 60+ curiosity prompts generated and indexed
✅ CuriosityFeed component rendering cards with proper styling
✅ Dashboard integration (DISCOVER, ASK, CONNECT, LAYERS panels live)
✅ Related insights and follow-up question generation
✅ Map layers toggle (climate, biodiversity, trade routes, migration flows, ocean currents, civilizations)
✅ Timeline events display and interaction (fly-to on selection)

---

## 📅 Upcoming Roadmap

### Week 2-3: Narrative-First Country Explorer (In Progress)
- Pre-write 80+ compelling country narratives (covering all major regions/climates)
- Country panel tabs:
  - The Story (narrative arc)
  - Geography (landforms, climate zones)
  - Climate & Adaptation (environmental drivers)
  - Culture & Identity (demographic/cultural markers)
  - AI Insights (template-generated explorations)
- Each section highlights knowledge graph nodes for deeper exploration
- Causal Chain Component for climate→agriculture→culture visualization

### Week 3-4: Visual Storytelling & Polish
- Causal Chain Visualization: Show climate→agriculture→population→culture chains
- Knowledge Graph Enhancement: Add relationship weights and causal direction
- Country Panel Redesign: Improved visual hierarchy
- UI Polish & Animations:
  - Micro-interactions (hover feedback, selection glow, smooth transitions)
  - Visual hierarchy refinement
  - Responsive mobile optimization
  - Animation sequences for chain visualizations

### Week 4+: API Integration (When Ready)
- Connect Claude API to `aiSynthesisEngine.synthesizeInsight()`
- A/B test AI-generated vs. curated insights
- Collect user engagement metrics to optimize prompts
- No code refactoring needed (architecture already supports it)

---

## 🏗️ Architecture Highlights

### Data-Driven Design
- **Separation of Concerns**: All prompts/narratives live in data files (easy iteration, A/B testing)
- **Component Composability**: `CuriosityFeed`, `CausalChain`, `CountryPanel` remain modular
- **Centralized Knowledge Graph**: Nodes link all content together

### API-Ready from Day 1
```typescript
// Same interface for all 3 modes
const insight = await aiSynthesisEngine.synthesizeInsight({
  country: "Egypt",
  mode: "curated" | "template" | "api", // Switch modes without refactoring
  era: "Ancient",
  format: "narrative"
});
```

### Zero Dead Ends
- Every country selection → 5+ follow-up curiosity questions
- Every question → related countries, contrasts, exploration paths
- Breadcrumb trail visible throughout user journey
- No "empty state" — always something to explore

### Responsive Design
- **Mobile**: Full-screen map with floating action buttons, drawer panels slide from left
- **Tablet**: Sidebar icons with panel drawer, map takes center space
- **Desktop**: Fixed sidebar + panel drawer + full-size map + timeline

### Performance
- Dynamic imports with `ssr: false` for heavy components
- Efficient marker rendering on map
- Lazy loading of layers and events
- Optimized GeoJSON feature collections

---

## 🔗 Repository & Deployment

**GitHub**: https://github.com/rishibagale/curios.git  
**Main Branch**: Production-ready with responsive UI and temporal features  

### Recent Commits
- `a50255c` - Improve temporal and layer features: enhance readability, fix layout, improve event card sizing
- `87b6e60` - Fix UI responsiveness: improve mobile layout, fix map pitch/zoom, enhance floating action buttons

---

## 📊 Progress Tracking

### Completed ✅
- AI Synthesis Layer (curated/template modes fully functional)
- Dynamic Curiosity System (60+ indexed questions)
- Story Templates (50+ narrative patterns)
- Related Insights Hook (follow-up path generation)
- CuriosityFeed Component (card carousel UI)
- Sidebar Integration (DISCOVER, ASK, CONNECT, LAYERS panels live)
- Knowledge Graph Foundation (country relationships)
- **Responsive UI** (mobile, tablet, desktop)
- **Map Pitch/Zoom Fixes** (full globe visibility)
- **Floating Action Buttons** (all 4 visible on mobile)
- **Temporal Explorer** (readable event cards, era timeline)
- **Layer Control** (enhanced readability)
- **Left Drawer Panels** (responsive sizing)

### In Progress 🚧
- Country Narrative Panel (80+ pre-written narratives)
- Causal Chain Visualization (Week 2-3)
- UI Polish & Animations (Week 3-4)

### Upcoming 📋
- Claude API Integration
- Analytics & Engagement Metrics
- Mobile Performance Optimization
- Advanced Knowledge Graph Features

---

## 🎨 Design Principles

### Curiosity-First
- Questions appear before answers
- Related explorations suggested at decision points
- Rewards exploration with layered insights

### Cinematic & Editorial
- Mysterious tone (not educational)
- Typography emphasizes storytelling
- Color coding creates visual pattern recognition
- Dark theme with glowing accents

### Progressive Disclosure
- Start with curiosity card → select country → see narrative → explore related themes
- Information revealed gradually to maintain engagement
- Always show next exploration path

### Responsive & Mobile-First
- Touch-friendly targets (44px minimum)
- Clear visual hierarchy at all sizes
- Smooth transitions and animations
- Accessible from any device

---

## 📝 Component Architecture

### Core Components

**Layout**:
- `src/app/app/page.tsx` - Main dashboard with responsive layout
- `Navbar.tsx` - Desktop navigation
- `CountryPanel.tsx` - Country details drawer

**Map**:
- `MapLibreGlobeGlobe.tsx` - 3D globe with layers, events, cities
- Supports trade routes, migration flows, climate, biodiversity, civilizations

**Discovery**:
- `CuriosityFeed.tsx` - Question carousel for exploration
- `ExplorationCards.tsx` - Wrapper for discovery features
- `AiInsightEngine.tsx` - AI-powered insights and responses

**Temporal**:
- `TimelineSlider.tsx` - Era timeline and historical events (improved)
- `LayerControl.tsx` - Map layers management (enhanced)

**Analytics**:
- `KnowledgeGraph.tsx` - Relationship visualization
- `CausalChain.tsx` - Causal relationship display

### Services & Data

**Services**:
- `aiSynthesisEngine.ts` - Multi-mode insight generation (curated/template/API)

**Data Files**:
- `curiosity-prompts.ts` - 60+ indexed questions
- `insight-templates.ts` - 50+ narrative templates
- `countriesData.ts` - Country information and coordinates
- `civilizationsData.ts` - Historical civilizations and empires
- `historicalEvents.ts` - Events by era
- `historicalCities.ts` - Major historical cities
- `empireData.ts` - Empire information and territories

**Hooks**:
- `useRelatedInsights.ts` - Generate related questions and countries

---

## 🎯 Success Metrics

**User Engagement**:
- Average questions explored per session (target: 5+)
- Time spent in exploration features (target: 10+ min)
- Country selections triggered by curiosity cards vs. direct map clicks
- Related insights click-through rate (target: 40%+)

**Content Quality**:
- User satisfaction ratings on generated insights (target: 4/5+)
- Deviation between curated vs. template-generated insights
- Template coverage (% of countries with pre-written narratives)

**Technical**:
- Insight generation latency (target: < 200ms)
- API mode transition time (target: < 0ms code changes)
- Cache hit rates on related country matches (target: 70%+)
- Mobile responsiveness score (target: 90+)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn
- Modern browser (Chrome 90+, Firefox 88+, Safari 15+)

### Installation
```bash
git clone https://github.com/rishibagale/curios.git
cd curios
npm install
npm run dev
```

### First Exploration
1. Open `http://localhost:3000/app`
2. **Mobile**: Click floating buttons at bottom-right
3. **Desktop**: Click sidebar icons on left
4. Try different panels:
   - **ASK**: Chat with AI insights
   - **CONNECT**: View knowledge graph
   - **DISCOVER**: Explore curiosity questions
   - **LAYERS**: Toggle map overlays
5. Click era buttons at bottom to change temporal view
6. Click historical events to fly-to locations on map

---

## 🛠️ Development Guide

### Adding New Curiosity Questions
Edit `src/data/curiosity-prompts.ts`:
```typescript
{
  question: "Your question here?",
  category: "climate" | "culture" | "geography" | "history" | "anthropology" | "economics",
  tags: ["tag1", "tag2"],
  triggers: { countries: ["egypt"], climates: ["desert"] }
}
```

### Adding Story Templates
Edit `src/data/insight-templates.ts`:
```typescript
{
  pattern: "causal_chain",
  template: "In [REGION], [CLIMATE] shaped [AGRICULTURE], which led to [POPULATION] patterns...",
  requiredFields: ["climate", "terrain", "region"]
}
```

### Toggling Map Layers
Modify `src/app/app/page.tsx`:
```typescript
const [activeLayers, setActiveLayers] = useState<string[]>([
  "trade_routes", 
  "migration_flows",
  "climate", // Add new defaults here
]);
```

---

## 📞 Support & Contribution

For questions or feature suggestions:
- Check existing issues in GitHub
- Review AGENTS.md for Next.js version specifics
- Refer to this document for architectural patterns

---

## 📱 Responsive Design Details

### Mobile (< 768px)
- Full-screen map with padding
- Floating action buttons at bottom-right (56px)
- Left drawer: 85vw width
- Timeline: 35vh height, scrollable events
- Collapse navbar into hamburger menu

### Tablet (768px - 1024px)
- Sidebar icons (w-16)
- Map takes center/right space
- Left drawer: w-96
- Timeline: 35vh height
- All features accessible

### Desktop (> 1024px)
- Fixed sidebar with icons (w-16)
- Left drawer: w-96 with close button
- Full-size map in center
- Timeline: 35vh at bottom
- Optimal spacing and typography

---

## 🔐 Security Notes

- All user inputs sanitized before map display
- No sensitive data stored in browser localStorage
- API keys (when integrated) stored in environment variables only
- GeoJSON data validated before rendering

---

**Last Updated**: June 1, 2026  
**Current Status**: Week 2 Complete — Responsive UI & Temporal Features Optimized  
**Next Phase**: Week 3 — Country Narratives & Causal Chain Visualization
