// Story templates and insight patterns
// These are the narrative building blocks that get filled with country/era data

export interface InsightTemplate {
  id: string;
  template: string;
  category: 'geography' | 'climate' | 'culture' | 'history' | 'anthropology' | 'economics';
  placeholders: string[]; // Variables like {COUNTRY}, {CLIMATE}, {TERRAIN}
  tags: string[];
}

export interface ConnectionPattern {
  id: string;
  pattern: string; // e.g., "{GEOGRAPHY} → {AGRICULTURE} → {POPULATION} → {CULTURE}"
  description: string;
  example: string;
}

// ─── INSIGHT TEMPLATES ─────────────────────────────────────────────────
// These get filled with country/climate/era data to create personalized narratives

export const insightTemplates: InsightTemplate[] = [
  // Geography & Terrain
  {
    id: 'template-geo-01',
    template:
      '{COUNTRY} was fundamentally shaped by its {TERRAIN}. This geography forced its people to develop unique {ADAPTATION_1} and {ADAPTATION_2}. Over centuries, this constraint became {CULTURAL_FEATURE}, which defines the nation today.',
    category: 'geography',
    placeholders: ['COUNTRY', 'TERRAIN', 'ADAPTATION_1', 'ADAPTATION_2', 'CULTURAL_FEATURE'],
    tags: ['geography', 'terrain', 'adaptation'],
  },
  {
    id: 'template-geo-02',
    template:
      'The {TERRAIN} of {COUNTRY} acted as both a fortress and a prison. It protected the population from invasion but limited trade, creating a unique {CULTURAL_IDENTITY}.',
    category: 'geography',
    placeholders: ['TERRAIN', 'COUNTRY', 'CULTURAL_IDENTITY'],
    tags: ['geography', 'isolation', 'culture'],
  },
  {
    id: 'template-geo-03',
    template:
      '{COUNTRY} sits at the intersection of {GEOGRAPHIC_FEATURES}. This position made it a natural {ROLE} and shaped its {CULTURAL_CHARACTERISTIC}.',
    category: 'geography',
    placeholders: ['COUNTRY', 'GEOGRAPHIC_FEATURES', 'ROLE', 'CULTURAL_CHARACTERISTIC'],
    tags: ['geography', 'crossroads', 'trade'],
  },

  // Climate & Adaptation
  {
    id: 'template-climate-01',
    template:
      '{COUNTRY}\'s {CLIMATE} determined everything: its agriculture ({CROP_1}, {CROP_2}), its population density, its settlement patterns, and ultimately its civilization.',
    category: 'climate',
    placeholders: ['COUNTRY', 'CLIMATE', 'CROP_1', 'CROP_2'],
    tags: ['climate', 'agriculture', 'adaptation'],
  },
  {
    id: 'template-climate-02',
    template:
      'The {CLIMATE_PATTERN} of {COUNTRY} made predictable {RESOURCE} flows possible. This reliability allowed people to organize into {ORGANIZATION_TYPE}, leading to {CIVILIZATION_CHARACTERISTIC}.',
    category: 'climate',
    placeholders: ['CLIMATE_PATTERN', 'COUNTRY', 'RESOURCE', 'ORGANIZATION_TYPE', 'CIVILIZATION_CHARACTERISTIC'],
    tags: ['climate', 'organization', 'civilization'],
  },
  {
    id: 'template-climate-03',
    template:
      'Unlike {CONTRASTING_REGION}, {COUNTRY}\'s {CLIMATE} was {CHARACTERISTIC}. This difference led to {OUTCOME_DIFFERENCE}.',
    category: 'climate',
    placeholders: ['CONTRASTING_REGION', 'COUNTRY', 'CLIMATE', 'CHARACTERISTIC', 'OUTCOME_DIFFERENCE'],
    tags: ['climate', 'contrast', 'causation'],
  },

  // Agriculture & Society
  {
    id: 'template-agri-01',
    template:
      'The development of {AGRICULTURE_TYPE} in {COUNTRY} did more than feed people—it created {SOCIAL_STRUCTURE}. This organizational model lasted for {DURATION} and shaped modern {MODERN_CHARACTERISTIC}.',
    category: 'history',
    placeholders: ['AGRICULTURE_TYPE', 'COUNTRY', 'SOCIAL_STRUCTURE', 'DURATION', 'MODERN_CHARACTERISTIC'],
    tags: ['agriculture', 'society', 'organization'],
  },
  {
    id: 'template-agri-02',
    template:
      '{COUNTRY}\'s {CROP} became so important that it determined settlement patterns, trade routes, and even political power. Whoever controlled the {CROP} controlled {REGION}.',
    category: 'history',
    placeholders: ['COUNTRY', 'CROP', 'REGION'],
    tags: ['agriculture', 'power', 'trade'],
  },

  // Religion & Culture
  {
    id: 'template-religion-01',
    template:
      '{RELIGION} thrived in {COUNTRY} because {REASON}. The {CLIMATE} and {GEOGRAPHY} made {RELIGIOUS_PRACTICE} not just possible but necessary.',
    category: 'culture',
    placeholders: ['RELIGION', 'COUNTRY', 'REASON', 'CLIMATE', 'GEOGRAPHY', 'RELIGIOUS_PRACTICE'],
    tags: ['religion', 'culture', 'adaptation'],
  },
  {
    id: 'template-religion-02',
    template:
      'Three religions converged in {COUNTRY} due to its {GEOGRAPHIC_FEATURE}. This created {CULTURAL_OUTCOME}.',
    category: 'culture',
    placeholders: ['COUNTRY', 'GEOGRAPHIC_FEATURE', 'CULTURAL_OUTCOME'],
    tags: ['religion', 'culture', 'crossroads'],
  },

  // Migration & Diversity
  {
    id: 'template-migration-01',
    template:
      '{COUNTRY}\'s genetic and cultural diversity came from {MIGRATION_EVENT}. {NUM} distinct groups settled {TIMEFRAME}, each contributing {CONTRIBUTION}.',
    category: 'anthropology',
    placeholders: ['COUNTRY', 'MIGRATION_EVENT', 'NUM', 'TIMEFRAME', 'CONTRIBUTION'],
    tags: ['migration', 'diversity', 'genetics'],
  },
  {
    id: 'template-migration-02',
    template:
      'Unlike {CONTRASTING_COUNTRY}, {COUNTRY} was a {MIGRANT_DESTINATION_TYPE}. This created {DIVERSITY_CHARACTERISTIC}.',
    category: 'anthropology',
    placeholders: ['CONTRASTING_COUNTRY', 'COUNTRY', 'MIGRANT_DESTINATION_TYPE', 'DIVERSITY_CHARACTERISTIC'],
    tags: ['migration', 'contrast', 'culture'],
  },

  // Trade & Power
  {
    id: 'template-trade-01',
    template:
      '{COUNTRY} became powerful not because of resources, but because of its {GEOGRAPHIC_ADVANTAGE} on the {TRADE_ROUTE}. Controlling {TRADE_ROUTE} meant controlling {REGION}\'s wealth.',
    category: 'economics',
    placeholders: ['COUNTRY', 'GEOGRAPHIC_ADVANTAGE', 'TRADE_ROUTE', 'REGION'],
    tags: ['trade', 'power', 'geography'],
  },
  {
    id: 'template-trade-02',
    template:
      '{COMMODITY} from {ORIGIN} changed {DESTINATION}. What started as trade became {TRANSFORMATION}.',
    category: 'economics',
    placeholders: ['COMMODITY', 'ORIGIN', 'DESTINATION', 'TRANSFORMATION'],
    tags: ['trade', 'commodities', 'transformation'],
  },

  // Contrasts & Causation
  {
    id: 'template-contrast-01',
    template:
      '{COUNTRY_1} and {COUNTRY_2} share {SIMILARITY}, but diverged because {DIVERGENCE_REASON}. This explains why {OUTCOME_1} became {OUTCOME_1_STATE} while {OUTCOME_2} became {OUTCOME_2_STATE}.',
    category: 'history',
    placeholders: [
      'COUNTRY_1',
      'COUNTRY_2',
      'SIMILARITY',
      'DIVERGENCE_REASON',
      'OUTCOME_1',
      'OUTCOME_1_STATE',
      'OUTCOME_2',
      'OUTCOME_2_STATE',
    ],
    tags: ['contrast', 'causation', 'history'],
  },
  {
    id: 'template-contrast-02',
    template:
      'Two nations, {COUNTRY_1} and {COUNTRY_2}, started with {SHARED_CONDITION}. Today they\'re completely different because of {KEY_DIFFERENCE}.',
    category: 'history',
    placeholders: ['COUNTRY_1', 'COUNTRY_2', 'SHARED_CONDITION', 'KEY_DIFFERENCE'],
    tags: ['contrast', 'history'],
  },

  // Psychological & Modern
  {
    id: 'template-psychology-01',
    template:
      'The {CULTURAL_TRAIT} of {COUNTRY}\'s people comes directly from {HISTORICAL_REASON}. What once was {ORIGINAL_FUNCTION} is now embedded in their {MODERN_EXPRESSION}.',
    category: 'culture',
    placeholders: ['CULTURAL_TRAIT', 'COUNTRY', 'HISTORICAL_REASON', 'ORIGINAL_FUNCTION', 'MODERN_EXPRESSION'],
    tags: ['culture', 'psychology', 'history'],
  },
  {
    id: 'template-psychology-02',
    template:
      'The honor-based culture of {COUNTRY} isn\'t random—it emerged from {GEOGRAPHIC_NECESSITY}. In {HARSH_CONDITION}, your reputation was your survival mechanism.',
    category: 'culture',
    placeholders: ['COUNTRY', 'GEOGRAPHIC_NECESSITY', 'HARSH_CONDITION'],
    tags: ['culture', 'psychology', 'adaptation'],
  },
];

// ─── CONNECTION PATTERNS ──────────────────────────────────────────────
// These show the causal chains that drive discovery

export const connectionPatterns: ConnectionPattern[] = [
  {
    id: 'pattern-01',
    pattern: 'Geography → Agriculture → Population → Organization → Civilization',
    description: 'The fundamental chain of how landscape determines civilization.',
    example: 'Nile Valley → Hydraulic Agriculture → High Density → Centralized State → Pharaonic Civilization',
  },
  {
    id: 'pattern-02',
    pattern: 'Climate → Crops → Culture → Religion → Identity',
    description: 'How environment shapes cultural and spiritual practices.',
    example: 'Monsoon → Rice → Collectivism → Buddhism → East Asian Values',
  },
  {
    id: 'pattern-03',
    pattern: 'Terrain → Settlement → Trade → Power → Empire',
    description: 'How geography creates trade chokepoints and empires.',
    example: 'Mountain Passes → Crossroads → Silk Road Control → Mongol Empire',
  },
  {
    id: 'pattern-04',
    pattern: 'Isolation → Divergence → Unique Culture → Distinct Genetics',
    description: 'How geographic isolation creates distinct peoples.',
    example: 'Island → 1000 Years Separated → Unique Language → Distinct Genetics',
  },
  {
    id: 'pattern-05',
    pattern: 'Resources → Trade → Wealth → Power → Influence',
    description: 'How commodities drive global power dynamics.',
    example: 'Spices → Indian Ocean Trade → Portuguese Navy → Global Exploration',
  },
  {
    id: 'pattern-06',
    pattern: 'Harsh Climate → Adaptation → Resilience → Long-term Stability',
    description: 'Why harsher regions sometimes last longer.',
    example: 'Desert → Water Conservation Culture → Efficient Organization → 3000-Year Empire',
  },
  {
    id: 'pattern-07',
    pattern: 'Migration → Mixing → Diversity → Innovation → Growth',
    description: 'How human movement creates dynamism.',
    example: 'New World Colonization → Diverse Gene Pool → New Ideas → Modern Society',
  },
  {
    id: 'pattern-08',
    pattern: 'Trade Route → Cultural Fusion → New Religions → Transformed Society',
    description: 'How trade becomes cultural exchange.',
    example: 'Silk Road → Arab Traders + Buddhist Monks → Islam Spreads → New Civilizations',
  },
];

// Helper: Get follow-up questions based on insight
export function getFollowUpQuestions(
  templateId: string,
  context: Record<string, string>
): string[] {
  const template = insightTemplates.find((t) => t.id === templateId);
  if (!template) return [];

  // Generate follow-up questions based on the placeholders that were filled
  const followUps: string[] = [];

  if (context['COUNTRY']) {
    followUps.push(`What other countries share similar geography to ${context['COUNTRY']}?`);
    followUps.push(`How has ${context['COUNTRY']} changed over different eras?`);
  }

  if (context['CLIMATE']) {
    followUps.push(`How did the ${context['CLIMATE']} climate shape neighboring regions?`);
    followUps.push(`What other civilizations developed in ${context['CLIMATE']} climates?`);
  }

  if (context['AGRICULTURE_TYPE']) {
    followUps.push(`Which other regions developed ${context['AGRICULTURE_TYPE']}?`);
    followUps.push(`How did ${context['AGRICULTURE_TYPE']} change social hierarchies?`);
  }

  if (context['TRADE_ROUTE']) {
    followUps.push(`What other empires fought over the ${context['TRADE_ROUTE']}?`);
    followUps.push(`How did ${context['TRADE_ROUTE']} influence different cultures?`);
  }

  return followUps.slice(0, 3); // Return top 3
}

// Helper: Fill a template with context data
export function fillTemplate(template: InsightTemplate, context: Record<string, string>): string {
  let filled = template.template;
  template.placeholders.forEach((placeholder) => {
    const value = context[placeholder] || `[${placeholder}]`;
    filled = filled.replace(`{${placeholder}}`, value);
  });
  return filled;
}
