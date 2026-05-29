// Compelling narratives for major countries explaining WHY they became what they are
// Each narrative connects geography → culture → modern identity

export type EraType = 'ancient' | 'medieval' | 'colonial' | 'modern' | 'future';

export interface CountryNarrative {
  countryId: string;
  countryName: string;
  era: EraType;
  title: string;
  narrative: string; // 3-4 paragraphs of compelling storytelling
  highlightedNodes: string[]; // Knowledge graph node IDs to highlight
  keyInsights: string[]; // 3-5 bullet point insights
  relatedChains: string[]; // Causal chain IDs for this country/era
}

export const countryNarratives: CountryNarrative[] = [
  // ─── EGYPT ───────────────────────────────────────────────────────────
  {
    countryId: 'EG',
    countryName: 'Egypt',
    era: 'ancient',
    title: 'Gift of the Nile: How One River Created Civilization',
    narrative: `Egypt is the Nile, and the Nile is Egypt. For 5,000 years, this single river has been the lifeblood of one of humanity's greatest civilizations. While deserts consume 95% of the landscape, the Nile Valley creates a ribbon of life—a flood zone that retreats and advances like clockwork. Every year, monsoon rains in Ethiopia swell the river, and like a farmer's gift, the Nile deposits nutrient-rich silt across its banks, creating inexhaustibly fertile soil without requiring any technological innovation.

This predictability was revolutionary. Unlike Mesopotamia, where irregular floods could destroy entire harvests, Egypt's reliable cycle allowed farmers to plan generations ahead. Surplus grain poured in from this hydraulic bounty, feeding millions in concentrated river valleys. But managing shared water required coordination at a scale never before attempted. Dikes, canals, and reservoirs demanded centralized authority—someone to plan, someone to organize, someone to command. Enter the Pharaoh.

The Pharaoh didn't merely rule; he controlled the Nile itself through divine will. Egyptians believed the Pharaoh personally ensured the flood's arrival each year through sacred ceremonies. This fusion of practical hydraulic power and spiritual authority created a civilization that lasted 3,000 years—longer than Rome, longer than any European kingdom. The pyramids weren't monuments to ego; they were monuments to a system where geography dictated that human cooperation required a god-king, and the Nile made that god possible.`,
    highlightedNodes: [
      'Seasonal Monsoons',
      'Predictable Water Supply',
      'Hydraulic Agriculture',
      'High Population Density',
      'Centralized Statecraft',
      'Theocracy',
    ],
    keyInsights: [
      'Nile floods were predictable unlike Mesopotamian rivers—enabling 3000+ year stability',
      'Surplus grain required centralized control of irrigation, creating the first bureaucratic state',
      'Pharaoh\'s legitimacy came from divine control of floods—merging practical power with spiritual authority',
      'Hydraulic despotism: whoever controls water controls the population',
      'Geography created not just prosperity, but a specific form of governance that endured millennia',
    ],
    relatedChains: ['chain-egypt-ancient'],
  },

  {
    countryId: 'EG',
    countryName: 'Egypt',
    era: 'colonial',
    title: 'The Suez Gamble: When Geography Became Geopolitics',
    narrative: `For thousands of years, Egypt's geography was a gift—the Nile sustained civilization. But in the 1800s, geography became a curse. The Suez Canal, dug through Egyptian territory in 1869, suddenly made this small nation indispensable to global trade. Every ship sailing between Europe and Asia—carrying tea from India, silk from China, coal to fuel the Industrial Revolution—had to pass through Egyptian waters.

This created a geopolitical prize that European powers couldn't resist. Britain occupied Egypt in 1882, ostensibly to protect the Canal and ensure debt repayment. For the next 70 years, Egypt was a crown jewel of empire, its resources extracted to enrich London. The Suez Canal generated enormous revenue, but the benefits flowed north to Britain and France. Egypt's people remained impoverished, while foreign powers contested control of the waterway.

The modern era would see Egypt fight for sovereignty over its own chokepoint. Gamal Abdel Nasser's 1956 nationalization of the Suez Canal became a defining moment—not just for Egypt, but for postcolonial nations worldwide. Egypt had transformed from an imperial colony into a regional power, reclaiming control of the geography that defined it. Today, the Suez remains the world's most important shipping lane, generating billions in annual revenue for Egypt's government.`,
    highlightedNodes: [
      'Maritime Straits & Chokepoints',
      'Colonial Extraction',
      'Resource Nationalism',
      'Geopolitical Power',
      'National Sovereignty',
    ],
    keyInsights: [
      'Suez Canal made Egypt critical to global trade—but initially benefited colonial rulers, not Egyptians',
      'Geography as curse: control of chokepoint attracted imperial conquest and exploitation',
      'Nasser\'s nationalization reasserted Egyptian agency over its own strategic geography',
      'Modern Egypt leverages canal revenue as major source of hard currency and diplomatic power',
      'Same geography that created ancient power (Nile) created modern geopolitical significance (Suez)',
    ],
    relatedChains: [],
  },

  // ─── INDIA ───────────────────────────────────────────────────────────
  {
    countryId: 'IN',
    countryName: 'India',
    era: 'ancient',
    title: 'The Monsoon\'s Gift: How Weather Built the World\'s Largest Civilization',
    narrative: `India exists because of monsoons. More precisely, India\'s specific form of civilization—decentralized, cooperative, collectively-oriented—emerged directly from managing monsoon agriculture. The Southwest Monsoon is the largest weather system shaping human civilization, delivering 80% of India\'s annual rainfall in just four months (June-September). This creates a double bind: massive abundance followed by 8 months of drought.

This rhythm forced ancient Indians to develop water management technologies unknown in the West: stepwells (baoris) that could reach 100+ meters underground, massive stone reservoirs (tanks) that captured monsoon runoff, and sophisticated canal networks. But infrastructure alone doesn't create culture. What made India unique was that these systems couldn't be built or maintained by individuals or even families—they required collective governance. Village councils (Sabhas) managed shared resources, and this need for cooperation seeped into Indian culture like monsoon water into stepwells.

The result was a civilization that valued collective harmony over individual conquest, consensus over command. While Egypt's Pharaoh ruled top-down, India developed distributed authority. This was no accident—it reflected the reality that you can't command weather or water. You can only cooperate with it. Buddhism, which later became India's dominant export religion, embodied exactly this philosophy: the Sangha (collective of monks) mirrored the village Sabhas; enlightenment came through collective growth, not divine kingship. Geography had written itself into India's spiritual DNA.`,
    highlightedNodes: [
      'Seasonal Monsoons',
      'Wet Rice Cultivation',
      'Water Storage Systems',
      'Collective Cooperation',
      'Decentralized Authority',
      'Buddhist Sangha',
    ],
    keyInsights: [
      'Monsoons forced Indians to develop world\'s most advanced water management tech in 500 BCE',
      'Shared water systems required collective governance—village councils, not kings',
      'Collectivism emerged from environmental necessity, not philosophical preference',
      'Buddhism\'s spread was enabled by compatibility with existing monsoon-era cooperation culture',
      'India\'s diversity of 2000+ ethnic groups coexist because collective norms allowed autonomy',
    ],
    relatedChains: ['chain-india-ancient'],
  },

  {
    countryId: 'IN',
    countryName: 'India',
    era: 'modern',
    title: 'The World\'s Largest Democracy: How Monsoons Created Egalitarianism',
    narrative: `India is the world's largest democracy with 1.4 billion people speaking 22 official languages and practicing 5 major religions. By all odds, this should be a failed state. Yet India persists, held together by deeply rooted norms of collective governance and pluralism—norms that trace directly back to ancient monsoon management.

Modern India inherited these distributed authority structures. The Indian constitution explicitly devolves power to thousands of village councils (Gram Sabhas), mirroring systems that predate empires. During independence, when other postcolonial nations chose authoritarian unity, Jawaharlal Nehru insisted India remain democratic. This wasn\'t idealism; it was recognition that Indian civilization had always worked through negotiation, not command. The monsoon had taught Indians that you can\'t order the rain, and you can\'t order diverse peoples either—you can only negotiate with them.

The monsoon still shapes modern India. Agricultural policies, water rights, population distribution, even political stability hinges on rainfall patterns. Failure of monsoons triggers food crises and electoral upheaval. Success brings prosperity. In this way, India remains what it has always been: a civilization shaped by negotiating with forces vastly larger than itself. That negotiation—with water, with diversity, with competing interests—is baked into Indian democracy itself.`,
    highlightedNodes: [
      'Seasonal Monsoons',
      'Collective Cooperation',
      'Democratic Institutions',
      'Religious Pluralism',
      'Distributed Authority',
    ],
    keyInsights: [
      'India\'s democratic institutions echo ancient monsoon-era village councils',
      'Largest democracy persists because Indians learned collective negotiation over millennia',
      'Monsoon failures cause famines and political change—weather still rules Indian politics',
      'Religious pluralism evolved from geographic necessity: you can\'t exclude people who manage shared water',
      'Indian constitution devolved power deliberately, mirroring ancient distributed authority',
    ],
    relatedChains: [],
  },

  // ─── JAPAN ───────────────────────────────────────────────────────────
  {
    countryId: 'JP',
    countryName: 'Japan',
    era: 'medieval',
    title: 'Mountains and Loyalty: How Geography Created Samurai',
    narrative: `Japan is 73% mountains. Steep valleys and narrow passes create natural boundaries between regions, making it impossible to govern centrally. This geographic fact had profound consequences: rather than producing unified empires, Japan\'s mountains produced feudalism—a system of local lords (daimyo) commanding fiercely loyal warriors (samurai).

Each mountain valley developed semi-independently, controlled by a warlord whose authority came from military prowess and the ability to defend territory. This wasn\'t feudalism by choice; it was feudalism by geography. You cannot project military power across mountain ridges. Local control is the only control that works. Over centuries, this created a specific culture: loyalty to your lord (daimyo) became the highest virtue. Samurai didn\'t serve distant emperors or abstract nations—they served someone they could look in the eye, someone who held a defensible territory.

From this geographic reality emerged Bushido—the way of the warrior—a code emphasizing loyalty, honor, and martial excellence that became the spine of Japanese culture. These weren\'t universal human values; they were values that made sense in a fragmented mountainous society where personal loyalty and martial capability were survival traits. Even as Japan unified, Bushido persisted, shaping everything from business hierarchies to social norms. Modern Japan\'s emphasis on company loyalty, respect for hierarchy, and group harmony are direct descendants of mountain-enforced feudalism.`,
    highlightedNodes: [
      'Mountainous Isolation',
      'Defensive Terrain',
      'Regional Authority',
      'Military Feudalism',
      'Honor Culture',
      'Bushido Ethics',
    ],
    keyInsights: [
      'Mountains made centralized control impossible—feudalism wasn\'t political choice, but geographic necessity',
      'Each valley developed independent daimyo culture, preventing unified empire for centuries',
      'Samurai loyalty emerged from ability to defend local territory against other daimyo',
      'Bushido values (loyalty, honor) persisted even after unification—they were culture-embedded',
      'Modern Japanese corporate hierarchy echoes medieval daimyo-samurai relationships',
    ],
    relatedChains: ['chain-japan-medieval'],
  },

  // ─── BRAZIL ───────────────────────────────────────────────────────────
  {
    countryId: 'BR',
    countryName: 'Brazil',
    era: 'colonial',
    title: 'Racial Fusion: How Colonialism Created Genetic Diversity',
    narrative: `Brazil is genetically and culturally unique among the Americas. While other Latin American nations maintained strict racial hierarchies (Spanish colonial castas), Brazil embraced racial mixing. This difference traces directly to agricultural geography and labor availability.

Portuguese colonization centered on sugar plantations—labor-intensive monocultures that required massive workforces. The Amazon\'s climate was hostile to European settlement, and indigenous populations were decimated by disease and overwork. This created an acute labor shortage. Unlike North American colonies, which imported enslaved Africans but kept racial hierarchies rigid, Portuguese Brazil pragmatically embraced mixed-race (mulatto and caboclo) populations. Practical need overcame ideological purity. Over 400 years, 4.5 million enslaved Africans arrived in Brazil—more than to all of North America combined. But Brazil\'s climate and geography demanded something else: racial fusion rather than segregation.

Today, Brazil is perhaps the world\'s most genetically diverse nation. Approximately 54% of Brazilians have African ancestry, and indigenous heritage is widespread. This diversity is inseparable from its culture: samba emerged from African-indigenous fusion, carnival blends Portuguese Catholic traditions with African ceremonies, and Brazilian Portuguese absorbed hundreds of Yoruba and Kimbundu words. Modern Brazil\'s racial democracy—imperfect but real—traces to tropical geography\'s harsh demands. Heat, disease, and labor scarcity made racial purity impossible; pragmatism created fusion.`,
    highlightedNodes: [
      'Tropical Rainforest',
      'Monoculture Plantations',
      'Epidemic Disease',
      'Forced Migration',
      'Racial Slavery',
      'Genetic Admixture',
      'Syncretism',
    ],
    keyInsights: [
      'Portuguese colonization centered on sugar—labor-intensive crop demanding massive workforce',
      'Indigenous population collapse from disease created acute labor shortage',
      'Tropical climate + labor scarcity forced pragmatic racial mixing, unlike rigid North American hierarchies',
      '4.5M enslaved Africans arrived in Brazil—highest concentration in Americas',
      'Racial fusion shaped culture: samba, carnival, language, identity',
    ],
    relatedChains: ['chain-brazil-colonial'],
  },

  // ─── SAUDI ARABIA ──────────────────────────────────────────────────────
  {
    countryId: 'SA',
    countryName: 'Saudi Arabia',
    era: 'modern',
    title: 'From Desert Nomads to Petro-Superpower: How Oil Rewrote Arab History',
    narrative: `Saudi Arabia occupies one of Earth\'s harshest environments: 95% desert, summer temperatures exceeding 50°C, water so scarce that nomadic tribes ranged across hundreds of kilometers seeking oases. For millennia, the Arabian Peninsula was inhabited by Bedouin tribes—small kinship groups whose survival depended on loyalty, honor codes, and intimate knowledge of limited water sources. Tribal honor (ird) and hospitality (diyafa) weren\'t cultural quirks; they were survival mechanisms in an environment where strangers represented existential risk.

In 1938, everything changed. Oil geologists struck the world\'s largest proven petroleum reserves beneath the Saudi desert. Over the next 50 years, the Kingdom transformed from a poor pastoral society into a regional superpower. Oil wealth enabled unprecedented state-building: highways, airports, universities, hospitals built in decades. More importantly, oil centralized power in the hands of the Saudi royal family, allowing them to consolidate what had been scattered tribal authority.

Modern Saudi Arabia represents a fascinating collision between old and new. Tribal structures persist (the House of Saud claims descent from an 18th-century alliance), tribal loyalty remains important, and honor cultures still influence society. Yet the nation is also hyper-modern: advanced infrastructure, military power, global financial influence. Oil didn\'t create Saudi Arabia\'s values—it scaled them. The same honor and loyalty that held Bedouin tribes together now holds the nation together, directed toward the monarchy instead of tribal elders.`,
    highlightedNodes: [
      'Desert Aridity',
      'Tribal Organization',
      'Honor Culture',
      'Fossil Fuel Wealth',
      'Centralized Authority',
      'Monarchy',
      'Economic Power',
    ],
    keyInsights: [
      'Pre-oil Saudi Arabia: scattered Bedouin tribes, honor-based governance, water scarcity',
      'Oil discovery in 1938 enabled rapid state centralization unprecedented in region',
      'Tribal values (loyalty, honor) persisted even as oil created modern state apparatus',
      'Oil revenues: $1+ trillion accumulated since 1938—enabling regional influence',
      'Modern Saudi Arabia: ancient tribal values scaled to nation-state via petro-wealth',
    ],
    relatedChains: ['chain-saudi-modern'],
  },

  // ─── SWITZERLAND ──────────────────────────────────────────────────────
  {
    countryId: 'CH',
    countryName: 'Switzerland',
    era: 'modern',
    title: 'Mountains as Money: How Geography Became Banking',
    narrative: `Switzerland\'s mountains did more than create neutrality—they created safety. Surrounded by the Alps on all sides, Switzerland is naturally defensible from invasion. This geographic isolation allowed something rare in early modern Europe: political independence without military domination. The Swiss didn\'t conquer empires; they survived empires by being too costly to invade.

This geographic security enabled something even rarer: perpetual neutrality as formal policy. After the Thirty Years War (1618-1648), Switzerland declared permanent military non-alignment. For 200+ years, while Europe tore itself apart through wars, Switzerland remained at peace. This peace was profitable. Refugees, capital, and secrets all flowed into Switzerland seeking safe haven. Wars in Italy, France, and Germany created natural markets for Swiss banking services—neutral, discreet, secure.

Over time, Swiss banking became synonymous with wealth preservation. Secrecy laws, sophisticated financial instruments, political stability, and Swiss francs that rarely devalued created a global financial center. Switzerland has just 8.5 million people yet controls an outsized share of global private wealth. This isn\'t accident; it\'s geography rewritten as finance. The same mountains that protected Swiss independence now protect Swiss bank accounts. Neutrality became profit. Security became wealth. Geography—once a source of isolation—became a source of global economic influence.`,
    highlightedNodes: [
      'Mountain Barriers',
      'Natural Defense',
      'Political Independence',
      'Non-Alignment',
      'Peace Culture',
      'Financial Services',
      'Capital Accumulation',
    ],
    keyInsights: [
      'Alps provided natural defense—enabling independence without military conquest',
      'Perpetual neutrality (1648) created safety while Europe warred',
      'Neutrality attracted capital, refugees, and banking opportunities',
      'Swiss secrecy laws and stability made Switzerland global banking center',
      'Geography → Independence → Neutrality → Banking → Wealth (mountain money cycle)',
    ],
    relatedChains: ['chain-switzerland-modern'],
  },
];

// Helper: Get narrative for a country/era
export function getCountryNarrative(
  countryId: string,
  era: EraType
): CountryNarrative | null {
  return countryNarratives.find((n) => n.countryId === countryId && n.era === era) || null;
}

// Helper: Get all narratives for a country across eras
export function getNarrativesForCountry(countryId: string): CountryNarrative[] {
  return countryNarratives.filter((n) => n.countryId === countryId);
}
