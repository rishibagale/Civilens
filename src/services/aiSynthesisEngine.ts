// Central service for AI synthesis and content generation
// Abstracts between static/template/API modes so we can plug in Claude API later
// without reworking any components

import { countriesData } from '@/data/countriesData';
import { civilizationsData } from '@/data/civilizationsData';
import { curiosityPrompts, promptsByCategory, promptsByTag } from '@/data/curiosity-prompts';
import { insightTemplates, fillTemplate } from '@/data/insight-templates';

export type EraType = 'ancient' | 'medieval' | 'colonial' | 'modern' | 'future';
export type SynthesisMode = 'curated' | 'template' | 'api';
export type InsightType = 'curiosity_question' | 'country_insight' | 'connection' | 'follow_up';

export interface SynthesisRequest {
  type: InsightType;
  context: {
    countryId?: string;
    era?: EraType;
    previousTopic?: string;
    graphNodeId?: string;
  };
  mode?: SynthesisMode; // Defaults to 'curated' then falls back to 'template'
  language?: string; // 'en' | 'es' | etc. Defaults to 'en'
}

export interface SynthesisResponse {
  text: string;
  type: InsightType;
  sources: string[];
  suggestedFollowUps: string[];
  nodesToHighlight: string[]; // Knowledge graph node IDs
  conversationStarters?: string[]; // For chat UI
  confidence: 'high' | 'medium' | 'low';
}

// ─── TEMPLATE DATA (for static synthesis) ────────────────────────────

// Pre-curated country insights - hand-written, high quality
const countryInsights: Record<string, Record<EraType, string>> = {
  EG: {
    ancient:
      'Egypt was the gift of the Nile. The river\'s predictable floods created renewable agriculture in the desert, which fed millions and enabled the pharaohs to organize the most enduring civilization of the ancient world.',
    medieval:
      'Medieval Egypt became the crossroads of three faiths. Arab, Coptic, and Jewish cultures mixed in Cairo, creating a cultural engine that influenced the Mediterranean.',
    colonial:
      'Egypt\'s strategic position on the Suez Canal turned it from a provincial backwater into a geopolitical prize. Control of this waterway meant control of trade between Europe and Asia.',
    modern: 'Modern Egypt must balance its ancient heritage with 100M+ people in the Nile Valley. The river remains the lifeline—96% of people live within 10km of it.',
    future: 'Egypt faces water stress as upstream nations develop the Nile. The future depends on managing scarcity and maintaining regional cooperation.',
  },
  IN: {
    ancient:
      'India\'s monsoon climate created two distinct agricultural seasons, enabling sophisticated water management and high population density. This abundance supported multiple competing kingdoms and the world\'s first major cities.',
    medieval:
      'Medieval India was a civilizational crucible. Islam met Hinduism, Buddhism met trade, and Persian-Arab-Indian cultures blended into new forms of governance, art, and philosophy.',
    colonial:
      'British colonization fragmented India by drawing arbitrary borders, separating religions and ethnicities that had coexisted for millennia. The partition created Pakistan and deepened religious divides.',
    modern:
      'Modern India remains the most diverse nation on Earth—1.4B people, 22 official languages, and 5 major religions. This diversity is both its strength and its challenge.',
    future: 'India faces climate stress: monsoon disruption, water scarcity, and heat waves in the Ganges Valley. Urban migration will reshape demographics dramatically.',
  },
  BR: {
    ancient:
      'Pre-Columbian Brazil was shaped by the Amazon—the world\'s largest forest determined settlement patterns, food systems, and the diversity of indigenous cultures.',
    medieval:
      'Medieval in a different sense: Brazilian Amerindian societies developed complex hierarchies, agriculture, and trade networks adapted to tropical conditions.',
    colonial:
      'Portuguese colonization and African slavery transformed Brazil into a plantation economy. Tropical agriculture (sugar, coffee) depended on the horrific mixture of indigenous and African labor.',
    modern:
      'Brazil\'s genetic diversity reflects its colonial history—European, African, and Indigenous ancestry mixed across centuries, creating a unique multicultural society.',
    future: 'Brazil\'s future is tied to Amazon preservation. Deforestation threatens the region\'s climate regulation and cultural heritage of indigenous peoples.',
  },
  CN: {
    ancient:
      'China\'s geography—the Yellow River and Yangtze—allowed isolated development of the world\'s longest continuous civilization. Monsoons enabled rice cultivation, which fed population growth.',
    medieval:
      'Medieval China was the world\'s most technologically advanced civilization. Gunpowder, printing, and navigation originated here, yet China chose isolation over expansion.',
    colonial:
      'Western imperialism shattered China\'s isolationism. The opium wars, unequal treaties, and territorial losses humiliated China and sparked revolutionary ferment.',
    modern:
      'Modern China emerged from century of humiliation to become a global superpower. Its geography (East/West divide), politics, and focus on manufacturing-scale innovation define it.',
    future: 'China faces climate stress in northern plains (water scarcity) and southern monsoon disruption. Urban migration to coastal cities will accelerate.',
  },
  SA: {
    ancient:
      'Arabia\'s harsh desert created nomadic tribes with honor-based cultures. Scarce resources meant kinship networks were survival mechanisms, shaping Arab culture permanently.',
    medieval:
      'Islam transformed Arabia from peripheral to central. Mecca and Medina became the spiritual center of a religion that united disparate tribes into a civilization.',
    colonial:
      'Oil changed everything. Western powers competed for control of Arabian petroleum, reshaping geopolitics and enriching Gulf states dramatically.',
    modern:
      'Modern Saudi Arabia is caught between tradition and modernity. Oil wealth enabled rapid development, but young population and gender restrictions create tension.',
    future: 'Saudi Arabia is diversifying away from oil via Vision 2030. Climate change threatens water and food security in an already arid region.',
  },
  RU: {
    ancient:
      'Russia\'s vast steppes created a warrior culture adapted to cold, sparse resources, and periodic Mongol invasion. Strength through organization became a civilizational trait.',
    medieval:
      'Medieval Russia was forged through Mongol rule (13th-15th century). This centralized autocracy that lasted 200+ years shaped Russian governance permanently.',
    colonial:
      'Imperial Russia expanded across Eurasia, conquering diverse peoples and territories. This created an empire of empires with deep internal tensions.',
    modern:
      'Soviet Russia industrialized rapidly and became a superpower through brutal efficiency. Post-Soviet Russia struggles with identity between Europe and Asia.',
    future: 'Russia faces Arctic warming, permafrost melt, and resource competition in the North. Demographic decline and international isolation shape its trajectory.',
  },
};

// Common follow-up questions by category
const followUpTemplates: Record<string, string[]> = {
  geography: [
    'How does this geography compare to nearby regions?',
    'What role did terrain play in migration patterns?',
    'How did people adapt to this geography?',
  ],
  climate: [
    'How did this climate shape agriculture?',
    'What role did seasonal patterns play?',
    'How did people adapt to this climate?',
  ],
  culture: [
    'How is this reflected in modern culture?',
    'What other regions share similar cultural traits?',
    'How did this culture influence neighbors?',
  ],
  trade: [
    'What other commodities flowed through these routes?',
    'How did this trade reshape the regions?',
    'What empires controlled this trade?',
  ],
};

// ─── SYNTHESIS ENGINE ──────────────────────────────────────────────────

export async function synthesizeInsight(req: SynthesisRequest): Promise<SynthesisResponse> {
  const mode = req.mode || 'curated';

  // Try modes in order: curated → template → api
  if (mode === 'curated' || mode === 'template') {
    const curated = tryCuratedInsight(req);
    if (curated) return curated;
  }

  if (mode === 'template' || mode === 'api') {
    const templated = tryTemplateInsight(req);
    if (templated) return templated;
  }

  // Fallback: generic response
  return fallbackResponse(req);
}

// ─── CURATED MODE ──────────────────────────────────────────────────
// Hand-written, highest quality responses

function tryCuratedInsight(req: SynthesisRequest): SynthesisResponse | null {
  if (req.type !== 'country_insight' || !req.context.countryId) return null;

  const country = countriesData[req.context.countryId];
  if (!country) return null;

  const era = req.context.era || 'modern';
  const insight = countryInsights[req.context.countryId]?.[era];

  if (!insight) return null;

  return {
    text: insight,
    type: 'country_insight',
    sources: [country.name],
    suggestedFollowUps: [
      `What was ${country.name} like in other eras?`,
      `How did ${country.name}'s geography influence its culture?`,
      `What other countries share ${country.name}'s climate?`,
    ],
    nodesToHighlight: [], // Would link to knowledge graph
    confidence: 'high',
  };
}

// ─── TEMPLATE MODE ────────────────────────────────────────────────
// AI-like generation using pre-written templates + data

function tryTemplateInsight(req: SynthesisRequest): SynthesisResponse | null {
  if (req.type === 'curiosity_question') {
    return generateCuriosityQuestion(req);
  }

  if (req.type === 'country_insight' && req.context.countryId) {
    return generateCountryInsightFromTemplate(req);
  }

  if (req.type === 'follow_up') {
    return generateFollowUp(req);
  }

  return null;
}

function generateCuriosityQuestion(req: SynthesisRequest): SynthesisResponse | null {
  const country = req.context.countryId ? countriesData[req.context.countryId] : null;

  // Get prompts based on context
  let candidates = curiosityPrompts;

  if (country) {
    // Filter prompts relevant to this country
    const countryClimate = country.climate.type;
    candidates = curiosityPrompts.filter(
      (p) =>
        !p.triggers ||
        !p.triggers.countries ||
        p.triggers.countries.includes(req.context.countryId!)
    );

    if (candidates.length === 0) {
      // Fall back to climate-based prompts
      candidates = (promptsByTag[countryClimate.toLowerCase()] || []).slice(0, 5);
    }
  }

  if (candidates.length === 0) {
    candidates = curiosityPrompts.slice(0, 10);
  }

  // Pick a random one
  const prompt = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    text: prompt.question,
    type: 'curiosity_question',
    sources: [prompt.category],
    suggestedFollowUps: [],
    nodesToHighlight: [],
    conversationStarters: [prompt.question],
    confidence: 'high',
  };
}

function generateCountryInsightFromTemplate(req: SynthesisRequest): SynthesisResponse | null {
  const country = countriesData[req.context.countryId!];
  if (!country) return null;

  // Pick a relevant template
  const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];

  // Fill with country data
  const context: Record<string, string> = {
    COUNTRY: country.name,
    TERRAIN: country.geography.terrain,
    CLIMATE: country.climate.type,
    ADAPTATION_1: country.adaptation.physiologicalAdaptation || 'adaptation',
    ADAPTATION_2: country.adaptation.technologicalAdaptation || 'adaptation',
    CULTURAL_FEATURE: country.culture.culturalIdentity || 'unique culture',
  };

  const filled = fillTemplate(template, context);

  return {
    text: filled,
    type: 'country_insight',
    sources: [country.name],
    suggestedFollowUps: [
      `Tell me more about ${country.name}'s climate`,
      `How does ${country.name} compare to nearby regions?`,
      `What shaped ${country.name}'s culture?`,
    ],
    nodesToHighlight: [],
    confidence: 'medium',
  };
}

function generateFollowUp(req: SynthesisRequest): SynthesisResponse | null {
  if (!req.context.previousTopic) return null;

  const followUps =
    followUpTemplates[req.context.previousTopic] || followUpTemplates['geography'];
  const followUp = followUps[Math.floor(Math.random() * followUps.length)];

  return {
    text: followUp,
    type: 'follow_up',
    sources: [],
    suggestedFollowUps: [],
    nodesToHighlight: [],
    confidence: 'medium',
  };
}

// ─── FALLBACK ──────────────────────────────────────────────────

function fallbackResponse(req: SynthesisRequest): SynthesisResponse {
  return {
    text: 'I notice I don\'t have specific information about this topic yet. Try asking about a specific country or region, or explore through the map.',
    type: req.type,
    sources: [],
    suggestedFollowUps: [
      'Pick a country on the map',
      'Explore by climate zone',
      'Browse major civilizations',
    ],
    nodesToHighlight: [],
    confidence: 'low',
  };
}

// ─── FUTURE: API MODE ──────────────────────────────────────────────
// This is where real Claude API calls would go later
// For now, it's stubbed out

export async function synthesizeWithClaudeAPI(
  req: SynthesisRequest,
  apiKey: string
): Promise<SynthesisResponse> {
  // TODO: Implement actual Claude API call
  // For now, fall through to template mode
  return synthesizeInsight({ ...req, mode: 'template' });
}

// ─── UTILITIES ──────────────────────────────────────────────────

export function getCountryContext(countryId: string): Record<string, string> {
  const country = countriesData[countryId];
  if (!country) return {};

  return {
    COUNTRY: country.name,
    CAPITAL: country.capital,
    POPULATION: country.population.toString(),
    CLIMATE: country.climate.type,
    TERRAIN: country.geography.terrain,
    PRIMARY_LANGUAGE: country.languages[0] || 'unknown',
    PRIMARY_RELIGION: country.religion[0] || 'diverse',
    CLIMATE_DESC: country.climate.description,
  };
}

export function getRelatedCountries(
  countryId: string,
  limit: number = 3
): Array<{ id: string; name: string; reason: string }> {
  const country = countriesData[countryId];
  if (!country) return [];

  const related = Object.entries(countriesData)
    .filter(([id]) => id !== countryId)
    .map(([id, other]) => {
      let score = 0;
      let reason = '';

      // Same climate
      if (other.climate.type === country.climate.type) {
        score += 3;
        reason = `Similar ${country.climate.type} climate`;
      }

      // Same religion
      if (other.religion[0] === country.religion[0]) {
        score += 2;
        reason = `Shared ${country.religion[0]} heritage`;
      }

      // Geographic proximity (rough)
      const latDiff = Math.abs(other.coordinates[0] - country.coordinates[0]);
      const lngDiff = Math.abs(other.coordinates[1] - country.coordinates[1]);
      if (latDiff + lngDiff < 30) {
        score += 2;
        reason = 'Geographic proximity';
      }

      return { id, name: other.name, score, reason };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => ({ id: p.id, name: p.name, reason: p.reason }));

  return related;
}
