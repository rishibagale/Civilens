export interface AIResponse {
  query: string;
  response: string;
  nodesToHighlight: string[]; // Node IDs to highlight in the Knowledge Graph
  references: string[];
  relatedQuestions?: string[]; // Provocative rabbit hole questions
}

export const staticAiResponses: Record<string, AIResponse> = {
  mediterranean: {
    query: "Why are Mediterranean cultures different?",
    response: "Consider the Mediterranean not as a barrier, but as a liquid highway. Here, the land is fragmented into a thousand islands and jagged coastlines, washed by a temperate sun that nurtures a delicate trilogy: wheat, olives, and vines. Unlike the vast, mud-slicked river plains of the East, these crops demanded no great central bureaucracies or absolute despots to organize irrigation. Instead, independent household orchards flourished. The sea, calm and navigable, invited early mariners to leap from island to island. Thus, a civilization of debate, maritime trade, and individual agency emerged around the ancient city-states. It was a world forged in the crucible of constant contact, where culture was traded as easily as wine and olive oil.",
    nodesToHighlight: ["sea_straits", "ship_building", "trade_empires"],
    references: ["Braudel, F. (1949). The Mediterranean.", "Wittfogel, K. (1957). Hydraulic Empires."],
    relatedQuestions: [
      "Why did the fragmented coastlines of Greece prevent a single centralized empire?",
      "How did the olive tree shape early notions of private property?",
      "Why did maritime cities develop democratic systems faster than inland agrarian empires?"
    ]
  },
  climate: {
    query: "How did climate shape civilizations?",
    response: "Climate is the silent, celestial choreographer of human history, establishing the thermodynamic boundaries of what we can achieve. Where the monsoon rains sweep across Asia, the predictable deluge made wet-rice cultivation the inevitable technology of survival. But a rice paddy is a demanding master; it requires massive canal networks, drawing communities together into tight, cooperative nodes and necessitating centralized, highly coordinated state bureaucracies. Meanwhile, in the cold, pine-scented fjords of Scandinavia, the short growing seasons offered no such luxury. Here, resources were sparse and scattered, forcing people to take to the seas for fishing and raiding. These northern winters bred decentralized, voluntary collaborations—societies of independent clan-assemblies rather than absolute pharaohs.",
    nodesToHighlight: ["climate_monsoon", "wet_rice_agri", "pop_density_high", "social_coop", "central_state"],
    references: ["Diamond, J. (1997). Guns, Germs, and Steel.", "Turchin, P. (2016). Ultrasociety."],
    relatedQuestions: [
      "How did the Indian monsoon construct a rigid social hierarchy?",
      "Why did the cold northern climates select for egalitarian clan-assemblies rather than divine kings?",
      "What happens to a hydraulic state when the rains unpredictably fail for a decade?"
    ]
  },
  islands: {
    query: "Why do island nations evolve differently?",
    response: "Islands are evolutionary laboratories of the human spirit. Surrounded by the infinite horizon of the ocean, island societies like Japan or Iceland are protected by a giant liquid moat, allowing cultural traditions to incubate continuously, undisturbed by the chaotic waves of continental conquests. Yet, islands are also defined by absolute boundaries. When an island's population meets the rigid ecological ceilings of its shores, it faces a profound fork in the road. It must either cultivate a philosophy of extreme self-preservation and internal harmony, or build magnificent vessels to venture outward, re-engineering the sea into a global empire. They become hyper-protective of their inner sanctuaries, yet daringly outward-looking in their search for the world's riches.",
    nodesToHighlight: ["sea_straits", "ship_building", "trade_empires", "seafood_diet"],
    references: ["MacArthur, R. & Wilson, E. (1967). Island Biogeography.", "Totman, C. (1989). The Green Archipelago."],
    relatedQuestions: [
      "How did Japan's centuries of seclusion under Sakoku forge its modern precision engineering?",
      "Why did Great Britain's resource scarcity trigger the industrial age?",
      "How does living on a geologically active volcanic island alter a culture's concept of time?"
    ]
  },
  geography_psychology: {
    query: "How does geography affect psychology?",
    response: "The landscapes we inhabit eventually inhabit us. Our minds are molded by the contours of our home terrain. In the wide, flat riverine plains where survival hinges on collaborative irrigation, the human mind learns to see the world holistically—relationships, context, and group harmony become paramount. But in rugged mountain valleys or along fractured coasts, where a family's livelihood depends on their own orchards or fishing vessels, cognitive styles lean toward the analytical and the individualistic. Even our relationship with impermanence is written in the earth: those who live on seismically active fault lines learn the wisdom of wabi-sabi—the fragile beauty of things that cannot last—while stable agricultural plains foster a deep reverence for permanence and ancestral lineage.",
    nodesToHighlight: ["rugged_mountain", "cultural_divergence", "social_coop"],
    references: ["Nisbett, R. (2003). The Geography of Thought.", "Talhelm, T. (2014). The Rice Theory."],
    relatedQuestions: [
      "Why do rugged mountain terrains split dialects and preserve ancient languages?",
      "How did earthquake cycles teach Japanese culture to embrace impermanence?",
      "Why are flat plains more vulnerable to authoritarian political structures?"
    ]
  },
  migration_latin_america: {
    query: "How did migration shape Latin America?",
    response: "Latin America is a magnificent and tragic palimpsest, a canvas where waves of human movement have overwritten and merged into one another across millennia. It began with the quiet footsteps of ancient explorers crossing the Bering land bridge, adapting to high-altitude Andean peaks and deep Amazon biomes. Then came the violent shockwave of European colonization, importing foreign pathogens and steel, causing devastating demographic shifts. To sustain their colonial sugar and gold engines, empires forced the migration of millions of West Africans, who brought with them rich, indestructible spiritual and musical systems. In the centuries that followed, waves of global migrations blended into this tapestry. The result is a hyper-hybrid civilization, adapting effortlessly to altitude and jungle alike, with a spirit defined by resilience.",
    nodesToHighlight: ["volcanic_soil", "pop_density_high", "cultural_divergence"],
    references: ["Galeano, E. (1971). Open Veins of Latin America.", "Crosby, A. (1972). The Columbian Exchange."],
    relatedQuestions: [
      "How did Andean altitude adapt the biological systems of the Inca?",
      "Why did the Amazon rainforest prevent the rise of stone-walled cities?",
      "How did African spiritual syncretism survive the brutal plantation system?"
    ]
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
  let synthesizedText = "";
  const highlighted: string[] = [];
  let related: string[] = [];

  if (normalized.includes("mountain") || normalized.includes("terrain") || normalized.includes("height")) {
    synthesizedText = "Let us contemplate the rugged spine of our planet—the mountain ranges. Mountains are the grand buffers of human empire. They act as formidable natural fortresses, shielding smaller, distinct cultures from being devoured by massive, homogenizing continental states. In the high valleys of the Caucasus or the Swiss Alps, minority languages and ancient rituals survived for centuries because the cost of invading them was far too high.\n\nYet, this physical sanctuary comes with a cognitive price. The sheer friction of steep climbs isolates neighbors, creating a mosaic of highly local, independent-minded clans who rely on terraced slopes or animal herding, naturally suspicious of centralized authority.";
    highlighted.push("rugged_mountain", "defensive_fortress", "cultural_divergence");
    related = [
      "Why do mountain communities resist central taxation and empire building?",
      "How did the Andes shape the physical lung capacities of the Quechua people?",
      "Why do valley cultures and highlander cultures always view each other with suspicion?"
    ];
  } else if (normalized.includes("river") || normalized.includes("nile") || normalized.includes("water") || normalized.includes("agriculture")) {
    synthesizedText = "A river is more than water; it is a ribbon of concentrated solar energy flowing through the landscape. In the great river basins—the Nile, the Indus, the Yangtze—human civilization was born not of ease, but of cooperative stress. These rivers flooded with violent predictability. Surviving and harnessing these torrents required canal networks, mathematical foresight, and highly organized, hierarchical statecraft.\n\nThis hydraulic consolidation created massive food surpluses, leading to explosive population densities. It forged societies where the collective project—a pyramid, a grand reservoir, a massive levee—was far more important than the individual's fleeting desire.";
    highlighted.push("climate_monsoon", "wet_rice_agri", "pop_density_high", "central_state");
    related = [
      "How did the predictable flooding of the Nile shape the ancient Egyptian concept of order?",
      "Why did water management in China favor the rise of a vast, meritocratic bureaucracy?",
      "What happens to a riverine civilization when its geological water source dries up?"
    ];
  } else if (normalized.includes("ocean") || normalized.includes("sea") || normalized.includes("trade") || normalized.includes("coast")) {
    synthesizedText = "Oceans are the infinite, shifting boundaries of our world. To land-dwelling primates, they are initially terrifying barriers—but once we unlock the secrets of wood, wind, and navigation, they transform into hyper-efficient highways of commerce.\n\nMaritime civilizations bypass the brutal physical friction of mountain passes and deserts. They develop mercantile political structures where power is held not by feudal lords who own the soil, but by bold merchants who master the currents. This seafaring existence shapes dietary traditions based on marine proteins, forcing early cultures to invent complex preservation techniques—drying, smoking, salting—which became the foundation of modern global culinary culture.";
    highlighted.push("sea_straits", "ship_building", "trade_empires", "seafood_diet");
    related = [
      "How did trade currents determine which colonial ports became global metropolises?",
      "Why did naval power give rise to democratic assemblies faster than land power?",
      "How does salt preservation link early ocean sailing to modern culinary techniques?"
    ];
  } else {
    synthesizedText = "Look closely at the sphere of our world. Every human endeavor is bound up in a deep, planetary conversation. Geography establishes the hard limits—the fertility of the soil, the steepness of the mountains, the presence of harbors. Climate sets the seasonal rhythms of energy and caloric harvests. And culture is the beautiful, diverse, poetic collection of technologies we have invented to survive and find meaning within those limits.\n\nAsk me about a mountain, a river, a climate, or a sea, and let us trace the hidden threads that bind them to our modern minds.";
    highlighted.push("climate_monsoon", "sea_straits", "rugged_mountain", "volcanic_soil");
    related = [
      "How does a volcanic soil foundation accelerate agricultural civilizations?",
      "Why did the absence of pack animals in the Americas limit geographic trade networks?",
      "How does a temperate climate zone encourage the rapid exchange of technological ideas?"
    ];
  }

  return {
    query: prompt,
    response: synthesizedText,
    nodesToHighlight: highlighted,
    references: ["Carl Sagan (Synthesized Travel Guide Concept)", "Diamond, J. (2005). Collapse."],
    relatedQuestions: related
  };
}
