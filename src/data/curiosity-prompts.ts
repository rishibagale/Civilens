// Curiosity prompts indexed by category and trigger types
// These are the "next questions" that pull users deeper into exploration

export interface CuriosityPrompt {
  id: string;
  question: string;
  category: 'climate' | 'culture' | 'geography' | 'history' | 'anthropology' | 'economics';
  tags: string[]; // e.g., ['tropical', 'migration', 'trade']
  stat?: string; // e.g., "3 major migration waves"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  triggers?: {
    countries?: string[]; // which countries trigger this
    climates?: string[];
    tags?: string[];
    eras?: string[];
  };
}

export const curiosityPrompts: CuriosityPrompt[] = [
  // ─── GEOGRAPHIC CONTRASTS ───────────────────────────────────────────────
  {
    id: 'geography-01',
    question: 'Why is Brazil so genetically diverse?',
    category: 'anthropology',
    tags: ['tropical', 'colonization', 'migration', 'genetics'],
    stat: '3 major migration waves',
    difficulty: 'beginner',
    triggers: { countries: ['BR', 'AR', 'CL'] },
  },
  {
    id: 'geography-02',
    question: 'Why are Mediterranean cultures so different from Nordic?',
    category: 'culture',
    tags: ['climate', 'culture', 'agriculture', 'history'],
    stat: '2000+ years of divergent adaptation',
    difficulty: 'intermediate',
    triggers: { climates: ['Mediterranean', 'Arctic'] },
  },
  {
    id: 'geography-03',
    question: 'How did mountains shape civilizations so differently than plains?',
    category: 'geography',
    tags: ['terrain', 'culture', 'trade', 'isolation'],
    stat: '5x different population density patterns',
    difficulty: 'intermediate',
    triggers: { climates: ['Mountain', 'Plains'] },
  },
  {
    id: 'geography-04',
    question: 'Why are island nations unique societies?',
    category: 'anthropology',
    tags: ['geography', 'isolation', 'trade', 'culture'],
    stat: '10+ island civilizations with distinct traits',
    difficulty: 'beginner',
    triggers: { tags: ['island'] },
  },
  {
    id: 'geography-05',
    question: 'Why do deserts produce such distinct religions?',
    category: 'culture',
    tags: ['desert', 'religion', 'trade', 'adaptation'],
    stat: '3 major religions emerged from deserts',
    difficulty: 'intermediate',
    triggers: { climates: ['Desert'] },
  },
  {
    id: 'geography-06',
    question: 'How did rivers become the cradles of civilization?',
    category: 'history',
    tags: ['geography', 'agriculture', 'civilization', 'water'],
    stat: '6 major river valleys, 6 civilizations',
    difficulty: 'beginner',
    triggers: { tags: ['river'] },
  },
  {
    id: 'geography-07',
    question: 'Why are coastal cities always richer than inland?',
    category: 'economics',
    tags: ['trade', 'geography', 'commerce', 'ports'],
    stat: '80% of global trade flows through coastal zones',
    difficulty: 'intermediate',
    triggers: { tags: ['coast'] },
  },

  // ─── CLIMATE & ADAPTATION ──────────────────────────────────────────────
  {
    id: 'climate-01',
    question: 'How did monsoons sculpt entire civilizations?',
    category: 'climate',
    tags: ['monsoon', 'agriculture', 'population', 'culture'],
    stat: '500M+ people depend on monsoon cycles',
    difficulty: 'intermediate',
    triggers: { climates: ['Tropical Monsoon'] },
  },
  {
    id: 'climate-02',
    question: 'Why do deserts produce empires, not villages?',
    category: 'history',
    tags: ['desert', 'trade', 'empire', 'adaptation'],
    stat: '7 desert empires controlled 40% of ancient world trade',
    difficulty: 'advanced',
    triggers: { climates: ['Desert'] },
  },
  {
    id: 'climate-03',
    question: 'How did ice ages divide humanity into different peoples?',
    category: 'anthropology',
    tags: ['ice-age', 'migration', 'genetics', 'adaptation'],
    stat: '12,000 year divergence period',
    difficulty: 'advanced',
    triggers: { eras: ['ancient', 'prehistoric'] },
  },
  {
    id: 'climate-04',
    question: 'Why do temperate zones produce the most developed nations?',
    category: 'economics',
    tags: ['temperate', 'agriculture', 'development', 'trade'],
    stat: '60% of global GDP from temperate zone nations',
    difficulty: 'advanced',
    triggers: { climates: ['Temperate'] },
  },
  {
    id: 'climate-05',
    question: 'How did oceans currents become invisible highways?',
    category: 'geography',
    tags: ['ocean', 'trade', 'navigation', 'climate'],
    stat: '5 major currents shaped all naval empires',
    difficulty: 'intermediate',
    triggers: { tags: ['ocean', 'coast'] },
  },
  {
    id: 'climate-06',
    question: 'Why do tropical regions have different disease patterns?',
    category: 'geography',
    tags: ['tropical', 'disease', 'adaptation', 'health'],
    stat: '90% of endemic diseases in tropics',
    difficulty: 'advanced',
    triggers: { climates: ['Tropical'] },
  },

  // ─── CULTURE & IDENTITY ───────────────────────────────────────────────
  {
    id: 'culture-01',
    question: 'Why did rice cultivation create different societies than wheat?',
    category: 'anthropology',
    tags: ['agriculture', 'culture', 'organization', 'society'],
    stat: '2 distinct social structures emerged',
    difficulty: 'advanced',
    triggers: { tags: ['rice', 'wheat'] },
  },
  {
    id: 'culture-02',
    question: 'How did cuisine become a mirror of geography and trade?',
    category: 'culture',
    tags: ['food', 'trade', 'culture', 'migration'],
    stat: '4 spice routes shaped global cuisine',
    difficulty: 'beginner',
    triggers: { tags: ['trade', 'culture'] },
  },
  {
    id: 'culture-03',
    question: 'Why do language families match migration patterns?',
    category: 'anthropology',
    tags: ['language', 'migration', 'genetics', 'culture'],
    stat: '7 major language families = 7 migration waves',
    difficulty: 'advanced',
    triggers: { tags: ['migration', 'language'] },
  },
  {
    id: 'culture-04',
    question: 'How did religions emerge from specific climates?',
    category: 'culture',
    tags: ['religion', 'climate', 'culture', 'adaptation'],
    stat: '5 religions map to 5 distinct climate zones',
    difficulty: 'advanced',
    triggers: { tags: ['religion', 'climate'] },
  },
  {
    id: 'culture-05',
    question: 'Why do honor cultures emerge in deserts and steppes?',
    category: 'culture',
    tags: ['culture', 'honor', 'nomadic', 'desert'],
    stat: '8 honor-based cultures in harsh environments',
    difficulty: 'advanced',
    triggers: { climates: ['Desert', 'Steppe'] },
  },

  // ─── HISTORY & EMPIRES ────────────────────────────────────────────────
  {
    id: 'history-01',
    question: 'Why did trade routes become the highways of history?',
    category: 'history',
    tags: ['trade', 'empire', 'commerce', 'culture'],
    stat: '5 great trade routes shaped 3000 years',
    difficulty: 'beginner',
    triggers: { tags: ['trade'] },
  },
  {
    id: 'history-02',
    question: 'How did the Mongol Empire control 2x Earth\'s landmass?',
    category: 'history',
    tags: ['empire', 'steppe', 'cavalry', 'organization'],
    stat: '13% of Earth\'s land under one ruler',
    difficulty: 'intermediate',
    triggers: { countries: ['MN'] },
  },
  {
    id: 'history-03',
    question: 'Why did empires built on monsoons last longest?',
    category: 'history',
    tags: ['empire', 'agriculture', 'stability', 'monsoon'],
    stat: '3 monsoon empires lasted 500+ years',
    difficulty: 'advanced',
    triggers: { climates: ['Tropical Monsoon'] },
  },
  {
    id: 'history-04',
    question: 'How did Africa become divided into so many ethnic groups?',
    category: 'history',
    tags: ['africa', 'geography', 'migration', 'ethnicity'],
    stat: '2000+ ethnic groups across geography barriers',
    difficulty: 'advanced',
    triggers: { countries: ['NG', 'KE', 'CG'] },
  },
  {
    id: 'history-05',
    question: 'Why did the Silk Road create cultural fusion?',
    category: 'history',
    tags: ['trade-route', 'culture', 'commerce', 'exchange'],
    stat: '4 religions met on one trade route',
    difficulty: 'beginner',
    triggers: { tags: ['silk-road'] },
  },

  // ─── MIGRATION & GENETICS ─────────────────────────────────────────────
  {
    id: 'migration-01',
    question: 'Why did Polynesians conquer the Pacific?',
    category: 'anthropology',
    tags: ['migration', 'navigation', 'ocean', 'culture'],
    stat: 'Settled 1000 islands across 10M square km',
    difficulty: 'intermediate',
    triggers: { tags: ['ocean', 'pacific'] },
  },
  {
    id: 'migration-02',
    question: 'How did out-of-Africa migration create human diversity?',
    category: 'anthropology',
    tags: ['migration', 'genetics', 'adaptation', 'diversity'],
    stat: '70,000 year dispersal created all modern humans',
    difficulty: 'beginner',
    triggers: { eras: ['ancient'] },
  },
  {
    id: 'migration-03',
    question: 'Why do indigenous Americas have distinct genetics?',
    category: 'anthropology',
    tags: ['migration', 'genetics', 'americas', 'isolation'],
    stat: '15,000 years isolated = genetic distinction',
    difficulty: 'advanced',
    triggers: { countries: ['US', 'MX', 'PE'] },
  },
  {
    id: 'migration-04',
    question: 'How did Indo-Europeans reshape Eurasia?',
    category: 'history',
    tags: ['migration', 'empire', 'language', 'culture'],
    stat: '1000 year expansion covered 60% of Eurasia',
    difficulty: 'advanced',
    triggers: { tags: ['indo-european', 'steppe'] },
  },
  {
    id: 'migration-05',
    question: 'Why do certain regions absorb migrants differently?',
    category: 'anthropology',
    tags: ['migration', 'culture', 'integration', 'geography'],
    stat: '3x variance in assimilation rates by geography',
    difficulty: 'advanced',
    triggers: { tags: ['migration'] },
  },

  // ─── ECONOMICS & TRADE ────────────────────────────────────────────────
  {
    id: 'economics-01',
    question: 'How did spice trade drive global exploration?',
    category: 'economics',
    tags: ['trade', 'spices', 'commerce', 'exploration'],
    stat: '5 spice routes worth 10x annual GDP',
    difficulty: 'beginner',
    triggers: { tags: ['spice', 'trade'] },
  },
  {
    id: 'economics-02',
    question: 'Why do some regions have natural resource wealth vs poverty?',
    category: 'economics',
    tags: ['resources', 'geography', 'development', 'economics'],
    stat: 'Resource curse affects 40+ nations',
    difficulty: 'advanced',
    triggers: { tags: ['resources'] },
  },
  {
    id: 'economics-03',
    question: 'How did cotton become the fabric of empires?',
    category: 'economics',
    tags: ['agriculture', 'trade', 'industry', 'labor'],
    stat: 'Drove slavery expansion and industrial revolution',
    difficulty: 'intermediate',
    triggers: { tags: ['agriculture', 'empire'] },
  },
  {
    id: 'economics-04',
    question: 'Why did landlocked nations develop differently?',
    category: 'economics',
    tags: ['geography', 'trade', 'landlocked', 'development'],
    stat: '2-3x lower trade volumes vs coastal nations',
    difficulty: 'advanced',
    triggers: { tags: ['landlocked'] },
  },

  // ─── BIODIVERSITY & ECOLOGY ───────────────────────────────────────────
  {
    id: 'bio-01',
    question: 'Why are tropical rainforests so biodiverse?',
    category: 'geography',
    tags: ['tropical', 'biodiversity', 'climate', 'ecology'],
    stat: '50% of all species in 7% of land',
    difficulty: 'beginner',
    triggers: { climates: ['Tropical'] },
  },
  {
    id: 'bio-02',
    question: 'How did megafauna extinction shape human settlement?',
    category: 'history',
    tags: ['extinction', 'migration', 'hunting', 'adaptation'],
    stat: 'Drove cultural shift from hunting to farming',
    difficulty: 'advanced',
    triggers: { eras: ['ancient'] },
  },
  {
    id: 'bio-03',
    question: 'Why do island ecosystems collapse so easily?',
    category: 'geography',
    tags: ['island', 'ecology', 'isolation', 'biodiversity'],
    stat: '80% of extinctions on islands',
    difficulty: 'intermediate',
    triggers: { tags: ['island'] },
  },

  // ─── SURPRISING CONTRADICTIONS ────────────────────────────────────────
  {
    id: 'contradiction-01',
    question: 'Why are some poor countries geographically rich?',
    category: 'economics',
    tags: ['geography', 'resources', 'poverty', 'contradiction'],
    stat: 'Resource curse affects 40+ nations',
    difficulty: 'advanced',
  },
  {
    id: 'contradiction-02',
    question: 'Why did smaller civilizations outlast bigger empires?',
    category: 'history',
    tags: ['empire', 'stability', 'size', 'strategy'],
    stat: 'Small states lasted 2x longer on average',
    difficulty: 'advanced',
  },
  {
    id: 'contradiction-03',
    question: 'Why do diverse societies sometimes outperform homogeneous?',
    category: 'anthropology',
    tags: ['diversity', 'culture', 'innovation', 'economics'],
    stat: '2-3x higher innovation rates in mixed societies',
    difficulty: 'advanced',
  },
  {
    id: 'contradiction-04',
    question: 'Why do harsh climates produce more resilient cultures?',
    category: 'culture',
    tags: ['climate', 'culture', 'adaptation', 'resilience'],
    stat: '4x longer cultural continuity in harsh zones',
    difficulty: 'advanced',
  },

  // ─── FUTURE PROJECTIONS ───────────────────────────────────────────────
  {
    id: 'future-01',
    question: 'How will climate change reshape civilization geography?',
    category: 'geography',
    tags: ['climate-change', 'future', 'migration', 'adaptation'],
    stat: '1B+ climate migrants projected by 2050',
    difficulty: 'intermediate',
    triggers: { eras: ['future'] },
  },
  {
    id: 'future-02',
    question: 'Which regions will become uninhabitable by 2100?',
    category: 'geography',
    tags: ['climate', 'habitability', 'future', 'geography'],
    stat: '20-30 million sq km at risk',
    difficulty: 'advanced',
    triggers: { eras: ['future'] },
  },
];

// Index prompts by category for fast lookup
export const promptsByCategory = curiosityPrompts.reduce(
  (acc, prompt) => {
    if (!acc[prompt.category]) acc[prompt.category] = [];
    acc[prompt.category].push(prompt);
    return acc;
  },
  {} as Record<string, CuriosityPrompt[]>
);

// Index by tags for trigger-based lookup
export const promptsByTag = curiosityPrompts.reduce(
  (acc, prompt) => {
    prompt.tags.forEach((tag) => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(prompt);
    });
    return acc;
  },
  {} as Record<string, CuriosityPrompt[]>
);

// Helper: Get related curiosity prompts based on current context
export function getRelatedPrompts(
  currentPromptId: string,
  limit: number = 3
): CuriosityPrompt[] {
  const current = curiosityPrompts.find((p) => p.id === currentPromptId);
  if (!current) return [];

  // Find prompts with shared tags or category, excluding current
  const scored = curiosityPrompts
    .filter((p) => p.id !== currentPromptId)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      score += sharedTags * 1;
      return { prompt: p, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => p.prompt);

  return scored;
}
