export interface GraphNode {
  id: string;
  label: string;
  category: "environment" | "agriculture" | "demography" | "economy" | "institutions" | "culture";
  description: string;
  telemetryMetrics?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  relationship: string;
  explanation: string;
}

export const graphNodes: GraphNode[] = [
  {
    id: "climate_monsoon",
    label: "Seasonal Monsoons",
    category: "environment",
    description: "Highly seasonal wind systems that dump large volumes of water over a concentrated period of a few months.",
    telemetryMetrics: "Atmospheric Moisture: High | Periodicity: Annual"
  },
  {
    id: "wet_rice_agri",
    label: "Wet Rice Cultivation",
    category: "agriculture",
    description: "An intensive crop system that requires flooded fields (paddies) and complex irrigation canals to grow high-yield rice.",
    telemetryMetrics: "Arable Land Yield: Very High | Water Demand: Massive"
  },
  {
    id: "pop_density_high",
    label: "High Population Density",
    category: "demography",
    description: "High caloric yields per acre allow land to support high concentrations of human communities in small, structured river plains.",
    telemetryMetrics: "Calories/Acre: 5x Wheat | Inhabitants/sqkm: Heavy"
  },
  {
    id: "social_coop",
    label: "Cooperative Collectivism",
    category: "culture",
    description: "Cultural values focused on group harmony and collective accountability, arising from the need to build and maintain shared water infrastructure.",
    telemetryMetrics: "Cultural Paradigm: Group-centric | Trust Index: High"
  },
  {
    id: "central_state",
    label: "Centralized Statecraft",
    category: "institutions",
    description: "Highly structured bureaucracies needed to distribute water, compile calendars, tax grain stores, and organize labor for infrastructure.",
    telemetryMetrics: "Administrative Scale: Imperial | Tax Collection: Grain Reserves"
  },
  {
    id: "volcanic_soil",
    label: "Volcanic Hot-spots",
    category: "environment",
    description: "Geologically active zones containing volcanic ash deposits rich in minerals (potassium, phosphorus), creating highly fertile soils.",
    telemetryMetrics: "Mineral Concentration: Extreme | Soil Productivity: High"
  },
  {
    id: "rugged_mountain",
    label: "Mountainous Isolation",
    category: "environment",
    description: "Steep valleys and mountain ridges that act as barriers to military movement and communication networks.",
    telemetryMetrics: "Topography Slope: >35 degrees | Physical Connectivity: Low"
  },
  {
    id: "defensive_fortress",
    label: "Natural Defensibility",
    category: "institutions",
    description: "Natural geological barricades that allow communities to defend territory with minimal military overhead.",
    telemetryMetrics: "Strategic Defensibility: High | Invasion Cost: Very High"
  },
  {
    id: "cultural_divergence",
    label: "Cultural Fragmentary Splintering",
    category: "culture",
    description: "Development of unique dialects, customs, and laws due to geographic barriers preventing assimilation into standard imperial zones.",
    telemetryMetrics: "Linguistic Dialects: High Count | Dialect Divergence: Rapid"
  },
  {
    id: "sea_straits",
    label: "Maritime Straits & Fjords",
    category: "environment",
    description: "Deep sea inlets bordered by cliffs or narrow ocean straits that force travel into specific shipping corridors.",
    telemetryMetrics: "Navigable Depth: Deep | Wind Corridors: Channeled"
  },
  {
    id: "ship_building",
    label: "Advanced Shipbuilding",
    category: "economy",
    description: "Developing vessels capable of traversing deep open water to bypass impassable land terrain.",
    telemetryMetrics: "Structural Integrity: High | Keel Strength: Reinforced"
  },
  {
    id: "trade_empires",
    label: "Maritime Trade Oligarchies",
    category: "institutions",
    description: "Political powers ruled by merchant coalitions that control narrow shipping lanes and build port networks rather than territorial holdings.",
    telemetryMetrics: "Revenue: Tariff-dominated | Navy Strength: Dominant"
  },
  {
    id: "seafood_diet",
    label: "Seafood Preservation Culture",
    category: "culture",
    description: "Culinary habits centered on pickling, fermenting, and drying marine proteins to survive winters or long sea journeys.",
    telemetryMetrics: "Preservation Shelf-life: Multi-year | Protein Intake: Marine-dominant"
  }
];

export const graphLinks: GraphLink[] = [
  {
    source: "climate_monsoon",
    target: "wet_rice_agri",
    relationship: "enables",
    explanation: "Seasonal monsoon rainfall provides the massive volume of water required to flood fields for intensive rice farming."
  },
  {
    source: "wet_rice_agri",
    target: "pop_density_high",
    relationship: "supports",
    explanation: "Wet rice yields significantly more calories per acre than wheat or barley, allowing land to support highly dense populations."
  },
  {
    source: "wet_rice_agri",
    target: "social_coop",
    relationship: "demands",
    explanation: "Unlike wheat farming, which can be done individually, rice farming requires building dams and clearing canals collectively, necessitating high social cooperation."
  },
  {
    source: "pop_density_high",
    target: "central_state",
    relationship: "precipitates",
    explanation: "Dense populations grouped along river plains require laws, court systems, and registries to arbitrate land rights and coordinate massive public works."
  },
  {
    source: "volcanic_soil",
    target: "pop_density_high",
    relationship: "fertilizes",
    explanation: "Volcanic ash continuously replenishes minerals in the soil, allowing generations to farm the same land intensively without depleting it."
  },
  {
    source: "rugged_mountain",
    target: "defensive_fortress",
    relationship: "creates",
    explanation: "Mountain passes and steep valleys act as natural choke points, allowing small militias to fend off larger imperial forces."
  },
  {
    source: "rugged_mountain",
    target: "cultural_divergence",
    relationship: "enforces",
    explanation: "Lack of easy land travel keeps clans physically separated, leading to rapid development of distinct languages and cultural practices."
  },
  {
    source: "defensive_fortress",
    target: "cultural_divergence",
    relationship: "protects",
    explanation: "By keeping invading empires at bay, natural fortifications allow localized, minority cultures to survive for centuries without assimilation."
  },
  {
    source: "sea_straits",
    target: "ship_building",
    relationship: "incentivizes",
    explanation: "When land is mountainous and deep water channels connect cities, populations build advanced boats to navigate their geography."
  },
  {
    source: "ship_building",
    target: "trade_empires",
    relationship: "empowers",
    explanation: "Mastery of open ocean shipping allows city-states to control narrow oceanic straits, taxing global trade networks to accumulate massive wealth."
  },
  {
    source: "ship_building",
    target: "seafood_diet",
    relationship: "popularizes",
    explanation: "Boats allow access to deep-sea fish, and the need for preservation on long oceanic journeys leads to culinary traditions of fermented/dried fish."
  },
  {
    source: "trade_empires",
    target: "seafood_diet",
    relationship: "disseminates",
    explanation: "Maritime merchants establish networks that carry cured fish and spices globally, institutionalizing maritime dietary practices."
  }
];
