export interface AIResponse {
  query: string;
  response: string;
  nodesToHighlight: string[]; // Node IDs to highlight in the Knowledge Graph
  references: string[];
}

export const staticAiResponses: Record<string, AIResponse> = {
  mediterranean: {
    query: "Why are Mediterranean cultures different?",
    response: "Mediterranean cultures (like Italy, Greece, and Spain) evolved a unique societal framework because of their specific climate and geography. The Mediterranean climate features hot, dry summers and mild, wet winters, which supports a triple agrosystem of olives, wheat, and wine. Since these crops do not require the continuous, intensive, group-wide coordination of wet rice paddies, farming was organized around independent household estates or local micro-corporations. Furthermore, the fragmented coastlines and numerous islands made land transport difficult but maritime transport extremely efficient. This encouraged the early development of sea trade networks, city-states (poleis), individual property rights, and commercial law. The culture became outward-looking, mercantile, and highly interactive, celebrating debate, public assemblies, and syncretism through constant maritime contact.",
    nodesToHighlight: ["sea_straits", "ship_building", "trade_empires"],
    references: ["Braudel, F. (1949). The Mediterranean and the Mediterranean World in the Age of Philip II.", "Wittfogel, K. (1957). Oriental Despotism: A Comparative Study of Total Power."]
  },
  climate: {
    query: "How did climate shape civilizations?",
    response: "Climate dictates the caloric boundaries and energy cycles of any human society. In monsoon regions (such as India and East Asia), the predictable but intense rainfall pattern made rice cultivation the dominant agricultural technology. Because rice paddies require massive canal networks, they demanded a high level of community synchronization, giving rise to cooperative social norms and highly centralized state bureaucracies. In contrast, in cold, northern boreal climates (such as Norway and Iceland), the short growing seasons and low agricultural productivity forced communities to diversify into fishing, maritime raiding, and forestry. Because these resources were dispersed, northern societies could not support massive centralized empires, leading instead to egalitarian Assemblies (like the Viking Althing) and decentralized social structures based on voluntary collaboration (like Dugnad).",
    nodesToHighlight: ["climate_monsoon", "wet_rice_agri", "pop_density_high", "social_coop", "central_state"],
    references: ["Diamond, J. (1997). Guns, Germs, and Steel.", "Turchin, P. (2016). Ultrasociety: How 10,000 Years of War Made Humans the Greatest Cooperators on Earth."]
  },
  islands: {
    query: "Why do island nations evolve differently?",
    response: "Island nations (like Japan, Iceland, and Great Britain) exhibit distinct developmental trajectories due to geographical isolation and maritime exposure. First, isolation shields island societies from frequent continental invasions, allowing cultural and political institutions to evolve continuously without sudden disruptions (e.g., Japan's Tokugawa peace, or Iceland's linguistic preservation). Second, the scarcity of land resources acts as a strict ecological ceiling. When populations grow, island nations are forced to either implement strict local conservation systems (like Japan's Edo-period forest replanting) or look outward, developing advanced shipbuilding and naval warfare to build global trade empires (like Great Britain and Portugal). This creates a dual cultural psyche: highly protective of internal customs, yet aggressively outward-looking in trade and exploration.",
    nodesToHighlight: ["sea_straits", "ship_building", "trade_empires", "seafood_diet"],
    references: ["MacArthur, R. & Wilson, E. (1967). The Theory of Island Biogeography.", "Totman, C. (1989). The Green Archipelago: Forestry in Pre-Industrial Japan."]
  },
  geography_psychology: {
    query: "How does geography affect psychology?",
    response: "Environmental psychology shows that physical landscapes directly shape cognitive styles and social relationships. Research suggests that communities in flat, riverine plains that require collective irrigation (like rice-growing valleys) develop a holistic, context-dependent cognitive style that prioritizes group harmony and relationships. Conversely, communities in mountainous, forested, or coastal regions that rely on individual grazing, fishing, or orchard farming develop an analytical cognitive style focused on individual agency, categorization, and formal logic. Furthermore, living in geologically active regions (such as Japan or Iceland) instills a cultural acceptance of impermanence (wabi-sabi) and high risk tolerance, whereas living in stable, predictable agricultural plains fosters an emphasis on permanence, ancestral lineage, and long-term storage.",
    nodesToHighlight: ["rugged_mountain", "cultural_divergence", "social_coop"],
    references: ["Talhelm, T. et al. (2014). Large-Scale Psychological Differences Within China Explained by Rice vs. Wheat Agriculture.", "Nisbett, R. (2003). The Geography of Thought: How Asians and Westerners Think Differently."]
  },
  migration_latin_america: {
    query: "How did migration shape Latin America?",
    response: "Latin America's civilization is a complex palimpsest shaped by multiple waves of migration. The initial wave consisted of indigenous peoples who crossed the Bering land bridge and adapted to diverse ecosystems—from the high Andes to the Amazon basin. In 1500, Spanish and Portuguese colonization initiated a massive influx of European institutions, languages, and disease vectors, leading to dramatic indigenous demographic declines. To replace this labor, colonizers forced the migration of over 5 million enslaved West Africans, who imported rich musical, agricultural, and religious traditions (like Candomblé and Santería). In the 19th and 20th centuries, economic instability drew massive waves of Italian, German, Japanese, and Levantine immigrants. The resulting society is hyper-hybridized, defined by racial syncretism, cultural fluidity, and a unique adaptation to both tropical rainforests and high-altitude mountain chains.",
    nodesToHighlight: ["volcanic_soil", "pop_density_high", "cultural_divergence"],
    references: ["Galeano, E. (1971). Open Veins of Latin America.", "Crosby, A. (1972). The Columbian Exchange: Biological and Cultural Consequences of 1492."]
  }
};

export function generateDynamicResponse(prompt: string): AIResponse {
  const normalized = prompt.toLowerCase();
  
  // Custom keyword mappings
  const keywords = [
    { key: "mediterranean", responseKey: "mediterranean" },
    { key: "italy", responseKey: "mediterranean" },
    { key: "greece", responseKey: "mediterranean" },
    { key: "climate", responseKey: "climate" },
    { key: "weather", responseKey: "climate" },
    { key: "monsoon", responseKey: "climate" },
    { key: "island", responseKey: "islands" },
    { key: "japan", responseKey: "islands" },
    { key: "iceland", responseKey: "islands" },
    { key: "psychology", responseKey: "geography_psychology" },
    { key: "culture", responseKey: "geography_psychology" },
    { key: "mind", responseKey: "geography_psychology" },
    { key: "migration", responseKey: "migration_latin_america" },
    { key: "latin america", responseKey: "migration_latin_america" },
    { key: "brazil", responseKey: "migration_latin_america" }
  ];

  for (const item of keywords) {
    if (normalized.includes(item.key)) {
      return staticAiResponses[item.responseKey];
    }
  }

  // Generative synthesis if no direct match
  let synthesizedText = "ANALYZING SYSTEMS CONNECTIONS...\n\n";
  const highlighted: string[] = [];

  if (normalized.includes("mountain") || normalized.includes("terrain") || normalized.includes("height")) {
    synthesizedText += "GEOGRAPHICAL CORRELATION DETECTED: Rugged Mountain Topography.\n\n" +
      "Mountain systems enforce physical isolation. In our civilizational models, mountains act as defensive shields that protect minority cultures from being assimilated by continental empires (e.g., the survival of Coptic culture in the Ethiopian Highlands or Swiss neutrality in the Alps).\n\n" +
      "However, this isolation forces cultural divergence, splitting languages and dialects over very short distances. Economically, mountains prevent flat, large-scale wheat farming, driving societies to adopt terraced agriculture or nomadic animal husbandry, which shapes a decentralized, independent clan psychology.";
    highlighted.push("rugged_mountain", "defensive_fortress", "cultural_divergence");
  } else if (normalized.includes("river") || normalized.includes("nile") || normalized.includes("water") || normalized.includes("agriculture")) {
    synthesizedText += "AGRICULTURAL CORRELATION DETECTED: Hydrological Basin Management.\n\n" +
      "Great river systems (like the Nile, Indus, and Yangtze) serve as the cradles of centralization. Because managing floods and constructing irrigation networks requires cooperative coordination, river valleys naturally select for highly organized, hierarchical statecraft.\n\n" +
      "This hydraulic consolidation leads to high calorie yields, triggering massive demographic growth. The cultural result is a group-centric society where public works (temples, pyramids, reservoirs) serve as the structural anchor of daily life.";
    highlighted.push("climate_monsoon", "wet_rice_agri", "pop_density_high", "central_state");
  } else if (normalized.includes("ocean") || normalized.includes("sea") || normalized.includes("trade") || normalized.includes("coast")) {
    synthesizedText += "ECONOMIC CORRELATION DETECTED: Maritime Shipping & Trade Networks.\n\n" +
      "Oceans are barriers that become highways once shipbuilding technology is unlocked. Maritime nations bypass the physical friction of land travel, enabling high-value trade over long distances.\n\n" +
      "This shapes oligarchic, mercantile political structures where merchants hold power, rather than agricultural feudal lords. The dietary system adapts to marine proteins, creating preservation methods (drying, pickling, smoking) that influence culinary cultures globally.";
    highlighted.push("sea_straits", "ship_building", "trade_empires", "seafood_diet");
  } else {
    synthesizedText += "SYSTEM TELEMETRY SYNTHESIS COMPLETE.\n\n" +
      "Humanity's developmental paths are a feedback loop between Earth's physical geography and human adaptation. Geography sets the resource limits (soil fertility, water access, mountain barricades), climate establishes the energy limits (temperature, growing seasons, rainfall cycles), and culture represents the accumulated historical technologies developed to survive and thrive within those boundaries.\n\n" +
      "Ask specific questions about climates, mountains, islands, or trade routes to trigger detailed correlation mappings on the knowledge graph.";
    highlighted.push("climate_monsoon", "sea_straits", "rugged_mountain", "volcanic_soil");
  }

  return {
    query: prompt,
    response: synthesizedText,
    nodesToHighlight: highlighted,
    references: ["Earth Intelligence Synthesizer Model v1.2", "Diamond, J. (2005). Collapse: How Societies Choose to Fail or Succeed."]
  };
}
