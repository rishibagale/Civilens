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

## ✅ Week 1: Discovery Engine Foundation

### Systems Built

#### 1. **AI Synthesis Engine** (`src/services/aiSynthesisEngine.ts`)
Central abstraction layer supporting 3 modes:
- **Curated Mode**: Hand-written insights for 6 key countries (Egypt, India, Brazil, China, Saudi Arabia, Russia) across 5 eras
- **Template Mode**: Fill-in-the-blanks storytelling that feels personalized (8 causal patterns: climate→agriculture→civilization)
- **API Mode**: Ready for Claude API integration (no refactoring needed)

Features:
- Generate insights with contextual follow-up questions
- Match related countries (same climate, religion, geography)
- Identify contrasting regions for exploration paths

#### 2. **Dynamic Curiosity System** (`src/data/curiosity-prompts.ts`)
60+ curiosity questions indexed by:
- **Categories**: climate, culture, geography, history, anthropology, economics
- **Tags**: tropical, desert, island, trade, migration, etc.
- **Triggers**: by country, climate zone, era

Example questions:
- "Why is Brazil genetically diverse?"
- "Why are Mediterranean cultures different from Nordic?"
- "Why do deserts produce empires?"

#### 3. **Story Templates** (`src/data/insight-templates.ts`)
50+ narrative templates with dynamic placeholders:
- 8 causal connection patterns
- Climate + terrain data integration
- Enables template-based insight generation at scale

#### 4. **Related Insights Hook** (`src/hooks/useRelatedInsights.ts`)
Generates exploration paths:
- Follow-up questions based on selected country
- Related countries (climate/religion/geography matches)
- Contrasting regions (why did they diverge?)
- Structured exploration breadcrumbs

#### 5. **Curiosity Feed Component** (`src/components/CuriosityFeed.tsx`)
Beautiful card carousel UI:
- 6-8 dynamic curiosity cards
- Color-coded by category (climate=blue, culture=purple, geography=emerald)
- Each card: question, category label, preview stat, tags
- "Related places" section with contrasts
- Refresh button for new discoveries
- Integrated into sidebar as "DISCOVER" panel (Lightbulb icon)

### Files Created
```
src/services/aiSynthesisEngine.ts        (280 lines) — Core synthesis engine
src/data/curiosity-prompts.ts            (300 lines) — 60+ curiosity questions  
src/data/insight-templates.ts            (200 lines) — 50+ story templates
src/hooks/useRelatedInsights.ts           (280 lines) — Related insights generation
src/components/CuriosityFeed.tsx          (250 lines) — Curiosity card component
```

### Files Modified
```
src/app/app/page.tsx                     — Added DISCOVER panel to sidebar
```

---

## 🚀 Current State

### Dev Environment
- **Dev Server**: `http://localhost:3000`
- **Landing Page**: `http://localhost:3000`
- **Dashboard**: `http://localhost:3000/app`

### Testing Discovery Engine
1. Navigate to `/app`
2. Click **DISCOVER** button (Lightbulb icon, left sidebar)
3. Select a country on the map
4. Dynamic curiosity cards appear with follow-up questions
5. Click any card to explore that topic

### What Works Now
✅ AI Synthesis Layer (curated/template modes fully functional)
✅ 60+ curiosity prompts generated and indexed
✅ CuriosityFeed component rendering cards with proper styling
✅ Dashboard integration (DISCOVER panel live in sidebar)
✅ Related insights and follow-up question generation

---

## 📅 Upcoming Roadmap

### Week 2: Visual Storytelling & Conceptual Chains
- **Causal Chain Component**: Visualize climate→agriculture→population→culture chains
- **Knowledge Graph Enhancement**: Add relationship weights and causal direction indicators
- **Country Panel Redesign**: "The Story" tab explaining "why this country became this way"
- **Insight Contextualization**: Connect curiosity questions to causal chains

### Week 2-3: Narrative-First Country Explorer
- Pre-write 80+ compelling country narratives (covering all major regions/climates)
- Country panel tabs:
  - The Story (narrative arc)
  - Geography (landforms, climate zones)
  - Climate & Adaptation (environmental drivers)
  - Culture & Identity (demographic/cultural markers)
  - AI Insights (template-generated explorations)
- Each section highlights knowledge graph nodes for deeper exploration

### Week 3-4: UI Polish & Interactions
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

### Scalability
- Narrative templates reduce content creation overhead
- Hook-based insight generation (cache-friendly)
- Component structure supports adding new discovery types later

---

## 🔗 Repository & Deployment

**GitHub**: https://github.com/rishibagale/curios.git  
**Main Branch**: Production-ready discovery engine foundation  
**Latest Commit**: Week 1 discovery engine implementation

---

## 📊 Progress Tracking

### Completed ✅
- AI Synthesis Layer (curated/template modes fully functional)
- Dynamic Curiosity System (60+ indexed questions)
- Story Templates (50+ narrative patterns)
- Related Insights Hook (follow-up path generation)
- CuriosityFeed Component (card carousel UI)
- Sidebar Integration (DISCOVER panel live)
- Knowledge Graph Foundation (country relationships)

### In Progress 🚧
- Causal Chain Visualization (Week 2)
- Country Narrative Panel (Week 2-3)
- UI Polish & Animations (Week 3-4)

### Upcoming 📋
- 80+ Pre-written Country Narratives
- Claude API Integration
- Analytics & Engagement Metrics
- Mobile Optimization

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

### Progressive Disclosure
- Start with curiosity card → select country → see narrative → explore related themes
- Information revealed gradually to maintain engagement

---

## 📝 Usage Examples

### For Product Managers
- Track curiosity engagement metrics (questions clicked, paths explored, dwell time)
- A/B test different prompt categories or story templates
- Monitor which countries/climates drive most exploration

### For Engineers
- Extend `aiSynthesisEngine` with new synthesis modes
- Add new template categories to `insight-templates.ts`
- Expand curiosity prompts in `curiosity-prompts.ts` (no component changes needed)
- Swap static data for API calls in `synthesizeInsight()` without touching UI layer

### For Content Teams
- Pre-write narratives directly in `src/data/` files
- Update templates to match editorial voice
- Generate new curiosity questions using category/tag system

---

## 🎯 Success Metrics

**User Engagement**:
- Average questions explored per session
- Time spent in curiosity card carousel
- Country selections triggered by curiosity cards vs. direct map clicks
- Related insights click-through rate

**Content Quality**:
- User satisfaction ratings on generated insights
- Deviation between curated vs. template-generated insights
- Template coverage (% of countries with pre-written narratives)

**Technical**:
- Insight generation latency (< 200ms target)
- API mode transition time (< 0 if code-ready)
- Cache hit rates on related country matches

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn

### Installation
```bash
git clone https://github.com/rishibagale/curios.git
cd curios
npm install
npm run dev
```

### First Exploration
1. Open `http://localhost:3000/app`
2. Click the Lightbulb icon (DISCOVER) in the left sidebar
3. Select any country on the globe
4. Explore curiosity questions and follow-up paths

---

## 📞 Questions & Contributions

For questions or feature suggestions:
- Check existing issues in GitHub
- Review AGENTS.md for Next.js version specifics
- Refer to this document for architectural patterns

---

**Last Updated**: June 1, 2026  
**Status**: Week 1 Foundation Complete — Week 2 Visual Storytelling In Progress
