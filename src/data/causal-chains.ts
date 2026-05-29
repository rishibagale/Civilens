// Pre-computed causal chains showing how geography determines civilization
// Each chain tells the story: Geography → Agriculture → Demographics → Institutions → Culture

export type EraType = 'ancient' | 'medieval' | 'colonial' | 'modern' | 'future';

export interface ChainStep {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'geography' | 'climate' | 'agriculture' | 'demographics' | 'institutions' | 'culture' | 'economics';
  relatedGraphNodes: string[];
  relatedCountries: string[];
}

export interface CausalChain {
  id: string;
  countryId: string;
  countryName: string;
  era: EraType;
  title: string;
  shortDescription: string;
  chain: ChainStep[];
}

export const causalChains: CausalChain[] = [
  // EGYPT - Ancient Era
  {
    id: 'chain-egypt-ancient',
    countryId: 'EG',
    countryName: 'Egypt',
    era: 'ancient',
    title: 'How the Nile Created Pharaonic Civilization',
    shortDescription: 'Geography → Hydraulic Agriculture → Dense Population → Centralized Power → Divine Kingship',
    chain: [
      {
        id: 'step-1',
        title: 'Nile Valley',
        icon: '🏔️',
        description: 'Desert landscape with predictable annual floods creating fertile ribbons along the river',
        category: 'geography',
        relatedGraphNodes: ['Seasonal Monsoons', 'River Systems'],
        relatedCountries: ['SD', 'ET'],
      },
      {
        id: 'step-2',
        title: 'Hydraulic Agriculture',
        icon: '🌾',
        description: 'Annual floods enable surplus grain production without irrigation technology',
        category: 'agriculture',
        relatedGraphNodes: ['Predictable Water Supply', 'Wet Flood Agriculture'],
        relatedCountries: ['IQ', 'SY'],
      },
      {
        id: 'step-3',
        title: 'High Population Density',
        icon: '👥',
        description: 'Abundant food supports millions in a narrow valley, creating dense settlements',
        category: 'demographics',
        relatedGraphNodes: ['High Population Density', 'Agricultural Surplus'],
        relatedCountries: ['IN', 'CN'],
      },
      {
        id: 'step-4',
        title: 'Centralized Statecraft',
        icon: '👑',
        description: 'Managing shared irrigation requires powerful central authority to coordinate labor',
        category: 'institutions',
        relatedGraphNodes: ['Centralized Statecraft', 'Organized Labor'],
        relatedCountries: ['CN', 'IN'],
      },
      {
        id: 'step-5',
        title: 'Divine Kingship',
        icon: '🏛️',
        description: 'Pharaoh controls Nile floods, claiming divine power—legitimizing absolute rule for 3000 years',
        category: 'culture',
        relatedGraphNodes: ['Religion as Social Control', 'Theocracy'],
        relatedCountries: [],
      },
    ],
  },

  // INDIA - Ancient Era
  {
    id: 'chain-india-ancient',
    countryId: 'IN',
    countryName: 'India',
    era: 'ancient',
    title: 'How Monsoons Shaped Indian Civilization',
    shortDescription: 'Climate → Seasonal Agriculture → Water Management Culture → Collective Organization → Buddhism',
    chain: [
      {
        id: 'step-1',
        title: 'Southwest Monsoon',
        icon: '🌧️',
        description: '80% of annual rainfall arrives in 4 months, creating feast-or-famine cycles',
        category: 'climate',
        relatedGraphNodes: ['Seasonal Monsoons', 'Tropical Monsoon'],
        relatedCountries: ['TH', 'MM', 'BD'],
      },
      {
        id: 'step-2',
        title: 'Seasonal Rice Cultivation',
        icon: '🍚',
        description: 'Rice farming requires water management—stepwells, tanks, reservoirs to store monsoon water',
        category: 'agriculture',
        relatedGraphNodes: ['Wet Rice Cultivation', 'Water Storage Systems'],
        relatedCountries: ['CN', 'SE'],
      },
      {
        id: 'step-3',
        title: 'Cooperative Water Norms',
        icon: '🤝',
        description: 'Shared water systems require collective governance and trust between farmers',
        category: 'demographics',
        relatedGraphNodes: ['Collective Cooperation', 'Shared Resource Management'],
        relatedCountries: ['JP', 'PH'],
      },
      {
        id: 'step-4',
        title: 'Collective Decision-Making',
        icon: '⚖️',
        description: 'Village councils (Sabhas) govern shared resources, creating decentralized governance',
        category: 'institutions',
        relatedGraphNodes: ['Decentralized Authority', 'Village Governance'],
        relatedCountries: ['TH', 'ID'],
      },
      {
        id: 'step-5',
        title: 'Buddhist Collectivism',
        icon: '🧘',
        description: 'Collective agricultural values translate to Buddhist philosophy emphasizing community harmony',
        category: 'culture',
        relatedGraphNodes: ['Collectivism', 'Buddhist Sangha'],
        relatedCountries: ['TH', 'MM', 'SG'],
      },
    ],
  },

  // JAPAN - Medieval Era
  {
    id: 'chain-japan-medieval',
    countryId: 'JP',
    countryName: 'Japan',
    era: 'medieval',
    title: 'How Geography Created Feudalism',
    shortDescription: 'Mountainous Terrain → Isolated Valleys → Regional Lords → Feudal System → Samurai Code',
    chain: [
      {
        id: 'step-1',
        title: 'Mountainous Terrain',
        icon: '⛰️',
        description: '73% of Japan is mountainous, creating isolated valleys and natural fortifications',
        category: 'geography',
        relatedGraphNodes: ['Mountain Barriers', 'Defensive Terrain'],
        relatedCountries: ['KR', 'NP', 'SW'],
      },
      {
        id: 'step-2',
        title: 'Regional Isolation',
        icon: '🏞️',
        description: 'Each valley develops independently with limited trade between regions',
        category: 'geography',
        relatedGraphNodes: ['Geographic Isolation', 'Regional Fragmentation'],
        relatedCountries: ['CH', 'AL'],
      },
      {
        id: 'step-3',
        title: 'Local Warlords (Daimyo)',
        icon: '⚔️',
        description: 'Power concentrates in regional rulers who defend their territory and collect taxes',
        category: 'institutions',
        relatedGraphNodes: ['Regional Authority', 'Military Feudalism'],
        relatedCountries: ['FR', 'DE'],
      },
      {
        id: 'step-4',
        title: 'Samurai Warrior Class',
        icon: '🗡️',
        description: 'Hereditary warriors serve daimyo, creating honor-based feudal hierarchy',
        category: 'culture',
        relatedGraphNodes: ['Honor Culture', 'Military Hierarchy'],
        relatedCountries: ['KR', 'EU'],
      },
      {
        id: 'step-5',
        title: 'Bushido Code',
        icon: '🏯',
        description: 'Samurai values become central to Japanese identity—loyalty, honor, martial excellence',
        category: 'culture',
        relatedGraphNodes: ['Bushido Ethics', 'Feudal Loyalty'],
        relatedCountries: [],
      },
    ],
  },

  // BRAZIL - Colonial Era
  {
    id: 'chain-brazil-colonial',
    countryId: 'BR',
    countryName: 'Brazil',
    era: 'colonial',
    title: 'How Tropical Geography Drove Slavery',
    shortDescription: 'Tropical Climate → Labor-Intensive Crops → African Slavery → Genetic Diversity → Modern Society',
    chain: [
      {
        id: 'step-1',
        title: 'Tropical Rainforest',
        icon: '🌳',
        description: 'Amazon rainforest climate enables year-round growing but difficult to clear',
        category: 'climate',
        relatedGraphNodes: ['Tropical Rainforest', 'High Biodiversity'],
        relatedCountries: ['CO', 'PE', 'VE'],
      },
      {
        id: 'step-2',
        title: 'Sugar Cane Plantations',
        icon: '🎋',
        description: 'European demand for sugar drives plantation expansion, requiring massive labor',
        category: 'agriculture',
        relatedGraphNodes: ['Monoculture Plantations', 'Export Commodity'],
        relatedCountries: ['CU', 'DO'],
      },
      {
        id: 'step-3',
        title: 'Indigenous Labor Collapse',
        icon: '💀',
        description: 'Disease and overwork kill indigenous population, creating labor shortage',
        category: 'demographics',
        relatedGraphNodes: ['Epidemic Disease', 'Population Collapse'],
        relatedCountries: [],
      },
      {
        id: 'step-4',
        title: 'African Slave Trade',
        icon: '⛓️',
        description: '4.5M enslaved Africans forced to Brazil to replace indigenous labor',
        category: 'demographics',
        relatedGraphNodes: ['Forced Migration', 'Racial Slavery'],
        relatedCountries: ['AO', 'MZ'],
      },
      {
        id: 'step-5',
        title: 'Racial & Cultural Fusion',
        icon: '🌍',
        description: 'European, African, and indigenous mixing creates unique genetic and cultural diversity',
        category: 'culture',
        relatedGraphNodes: ['Genetic Admixture', 'Syncretism'],
        relatedCountries: [],
      },
    ],
  },

  // SAUDI ARABIA - Modern Era
  {
    id: 'chain-saudi-modern',
    countryId: 'SA',
    countryName: 'Saudi Arabia',
    era: 'modern',
    title: 'How Oil Transformed Desert Arabia',
    shortDescription: 'Harsh Desert → Tribal Culture → Oil Discovery → Petro-State → Global Power',
    chain: [
      {
        id: 'step-1',
        title: 'Arid Desert Climate',
        icon: '🏜️',
        description: '95% of Saudi Arabia is desert with extreme heat and minimal water',
        category: 'climate',
        relatedGraphNodes: ['Desert Aridity', 'Water Scarcity'],
        relatedCountries: ['AE', 'QA', 'EG'],
      },
      {
        id: 'step-2',
        title: 'Nomadic Tribalism',
        icon: '🐪',
        description: 'Extreme scarcity forces small kinship groups (tribes) for survival cooperation',
        category: 'culture',
        relatedGraphNodes: ['Tribal Organization', 'Honor Culture'],
        relatedCountries: ['AE', 'JO'],
      },
      {
        id: 'step-3',
        title: 'Oil Reserves Discovered',
        icon: '🛢️',
        description: 'World\'s largest proven oil reserves found beneath Saudi desert in 1930s',
        category: 'economics',
        relatedGraphNodes: ['Fossil Fuel Wealth', 'Resource Extraction'],
        relatedCountries: ['IQ', 'IR'],
      },
      {
        id: 'step-4',
        title: 'Petro-State Formation',
        icon: '💰',
        description: 'Oil wealth enables rapid state-building, infrastructure, and military expansion',
        category: 'institutions',
        relatedGraphNodes: ['Centralized Authority', 'Monarchy'],
        relatedCountries: ['AE', 'KW'],
      },
      {
        id: 'step-5',
        title: 'Regional Superpower',
        icon: '👑',
        description: 'Oil revenues fund influence across Middle East and global geopolitics',
        category: 'economics',
        relatedGraphNodes: ['Economic Power', 'Geopolitical Influence'],
        relatedCountries: [],
      },
    ],
  },

  // SWITZERLAND - Modern Era
  {
    id: 'chain-switzerland-modern',
    countryId: 'CH',
    countryName: 'Switzerland',
    era: 'modern',
    title: 'How Mountains Created Neutrality',
    shortDescription: 'Alpine Terrain → Defensibility → Independence → Neutrality → Banking Hub',
    chain: [
      {
        id: 'step-1',
        title: 'Alpine Mountain Fortress',
        icon: '⛰️',
        description: 'Surrounded by Alps, Switzerland is naturally defensible from invasion',
        category: 'geography',
        relatedGraphNodes: ['Mountain Barriers', 'Natural Defense'],
        relatedCountries: ['AT', 'IT', 'FR'],
      },
      {
        id: 'step-2',
        title: 'Political Independence',
        icon: '🏛️',
        description: 'Terrain enabled independence from larger powers (1648 Treaty of Westphalia)',
        category: 'institutions',
        relatedGraphNodes: ['Sovereignty', 'Political Independence'],
        relatedCountries: ['NL', 'BE'],
      },
      {
        id: 'step-3',
        title: 'Perpetual Neutrality',
        icon: '⚖️',
        description: 'Protected by terrain, Switzerland maintains military neutrality for 200+ years',
        category: 'institutions',
        relatedGraphNodes: ['Non-Alignment', 'Peace Culture'],
        relatedCountries: ['AT', 'SE'],
      },
      {
        id: 'step-4',
        title: 'Safe Haven Banking',
        icon: '🏦',
        description: 'Neutrality + stability attract global wealth, creating banking sector',
        category: 'economics',
        relatedGraphNodes: ['Financial Services', 'Capital Accumulation'],
        relatedCountries: ['LU', 'HK'],
      },
      {
        id: 'step-5',
        title: 'Global Financial Center',
        icon: '💼',
        description: 'Banking expertise and secrecy laws make Switzerland a global financial hub',
        category: 'economics',
        relatedGraphNodes: ['Capital Markets', 'International Finance'],
        relatedCountries: [],
      },
    ],
  },

  // POLYNESIA - Ancient Era
  {
    id: 'chain-polynesia-ancient',
    countryId: 'PF',
    countryName: 'Polynesia',
    era: 'ancient',
    title: 'How Ocean Navigation Created Island Empires',
    shortDescription: 'Ocean Environment → Seafaring Skills → Long-Distance Migration → Island Settlement → Unique Cultures',
    chain: [
      {
        id: 'step-1',
        title: 'Pacific Ocean Trade Winds',
        icon: '💨',
        description: 'Predictable trade winds and currents enable long-distance ocean navigation',
        category: 'climate',
        relatedGraphNodes: ['Ocean Currents', 'Trade Winds'],
        relatedCountries: ['SG', 'ID'],
      },
      {
        id: 'step-2',
        title: 'Double-Hulled Canoes',
        icon: '⛵',
        description: 'Polynesians develop advanced seafaring technology for ocean voyaging',
        category: 'agriculture',
        relatedGraphNodes: ['Maritime Technology', 'Navigation Innovation'],
        relatedCountries: [],
      },
      {
        id: 'step-3',
        title: 'Intentional Migration',
        icon: '🗺️',
        description: 'Planned voyages settle 1000+ islands across 10 million square kilometers',
        category: 'demographics',
        relatedGraphNodes: ['Long-Distance Migration', 'Polynesian Expansion'],
        relatedCountries: [],
      },
      {
        id: 'step-4',
        title: 'Island Isolation',
        icon: '🏝️',
        description: 'Each island develops independent culture, language, and governance',
        category: 'culture',
        relatedGraphNodes: ['Geographic Isolation', 'Cultural Divergence'],
        relatedCountries: [],
      },
      {
        id: 'step-5',
        title: 'Distinct Pacific Cultures',
        icon: '🎭',
        description: 'Shared Polynesian heritage but unique languages, art, and social structures per island',
        category: 'culture',
        relatedGraphNodes: ['Cultural Identity', 'Austronesian Languages'],
        relatedCountries: [],
      },
    ],
  },
];

// Helper: Get causal chain for a country/era combination
export function getCausalChain(countryId: string, era: EraType): CausalChain | null {
  return causalChains.find((c) => c.countryId === countryId && c.era === era) || null;
}

// Helper: Get all chains for a country across all eras
export function getChainsForCountry(countryId: string): CausalChain[] {
  return causalChains.filter((c) => c.countryId === countryId);
}

// Helper: Get chains by category (for discovery)
export function getChainsByCategory(category: ChainStep['category']): CausalChain[] {
  return causalChains.filter((chain) => chain.chain.some((step) => step.category === category));
}
