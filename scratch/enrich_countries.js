const fs = require('fs');
const path = require('path');

// Target paths
const countriesDataPath = path.join(__dirname, '..', 'src', 'data', 'countriesData.ts');
const allCountriesPath = path.join(__dirname, '..', 'src', 'data', 'allCountriesComprehensive.ts');
const referencePath = path.join(__dirname, '..', 'src', 'data', 'UN_MEMBER_STATES_REFERENCE.ts');

// 1. Parse allCountriesComprehensive
let allCountriesContent = fs.readFileSync(allCountriesPath, 'utf8');
allCountriesContent = allCountriesContent.replace(/export interface[\s\S]*?\n\}/g, '');
allCountriesContent = allCountriesContent.replace(/: CountryComprehensive\[\]/g, '');
allCountriesContent = allCountriesContent.replace(/as Record<string, CountryComprehensive>/g, '');
allCountriesContent = allCountriesContent.replace(/\bexport\s+/g, '');
const parseAllCountries = new Function('exports', allCountriesContent + '\nreturn allCountriesComprehensive;');
const partialCountries = parseAllCountries({});

// 2. Parse existing countriesData
let countriesDataContent = fs.readFileSync(countriesDataPath, 'utf8');
countriesDataContent = countriesDataContent.replace(/export interface[\s\S]*?\n\}/g, '');
countriesDataContent = countriesDataContent.replace(/: Record<string, CountryData>/g, '');
countriesDataContent = countriesDataContent.replace(/export const countriesDataArray = [\s\S]*?$/g, '');
countriesDataContent = countriesDataContent.replace(/\bexport\s+/g, '');
const parseCountriesData = new Function('exports', countriesDataContent + '\nreturn countriesData;');
const existingCountries = parseCountriesData({});

console.log(`Loaded ${Object.keys(existingCountries).length} existing complete countries.`);

// 3. Definitions for promoted countries
const promotedCountryDetails = {
  ID: {
    aiAnalysis: "Indonesia is the world's largest archipelagic state, spanning over 17,000 islands. This extreme geographic fragmentation prevented the rise of a centralized, homogeneous empire, instead fostering an incredibly diverse tapestry of over 300 ethnic groups. However, the open seas served as corridors of connection rather than barriers. Maritime trade routes, especially the Malacca Strait, drew in Hindu-Buddhist, Islamic, and European colonial influences, each layer blending with indigenous animism. The necessity of navigating across islands forged a shared maritime consciousness, ultimately unified in the modern era under the national motto 'Bhinneka Tunggal Ika' (Unity in Diversity). Indonesia's contemporary economy leverages its volcanic soil fertility and strategic maritime position to emerge as Southeast Asia's leading economy.",
    physiologicalAdaptation: "Indigenous populations developed high resistance to tropical insect-borne diseases and humidity-induced heat stress over generations of forest and coastal living.",
    technologicalAdaptation: "Mastery of outrigger canoe design (pinisi ships) for long-distance inter-island navigation, and volcanic terrace farming to cultivate steep mountain slopes."
  },
  SG: {
    aiAnalysis: "Singapore represents the ultimate triumph of artificial geostrategic adaptation. Located at the narrowest bottleneck of the Straits of Malacca, the island was historically a swampy outpost prone to piracy. However, this chokepoint position meant that whoever controlled Singapore controlled the main gateway between the Indian Ocean and the South China Sea. Upon independence in 1965, devoid of natural resources or land, Singapore leveraged its location to construct the world's busiest container port and a premier global financial hub. Through highly centralized, meritocratic planning and massive land reclamation, the city-state transformed its physical limits into a hyper-dense, multicultural metropolis. Singapore's survival model is built on absolute economic openness and institutional efficiency, transforming a geographic constraint into a global trade fortress.",
    physiologicalAdaptation: "Urban population highly adapted to high-density living, showing high tolerance for compact spaces and rapid, clock-disciplined urban movement.",
    technologicalAdaptation: "Massive land reclamation expanding the island's territory by over 20%, state-of-the-art desalination and water recycling networks (NEWater), and high-density urban planning integrating green spaces (Biophilic urbanism)."
  },
  TH: {
    aiAnalysis: "Thailand's civilizational core is the fertile alluvial basin of the Chao Phraya River. The predictable monsoon flooding created an agricultural abundance that sustained the powerful kingdoms of Sukhothai and Ayutthaya. Unlike its neighbors, Thailand (historically Siam) avoided European colonization, serving as a buffer state between British Burma and French Indochina. This independence allowed the Thai monarchy and Theravada Buddhist institutions to maintain a unique, unbroken cultural continuity. Thai society developed a fluid, negotiation-based approach to external influences, absorbing Western modernization while keeping its traditional hierarchies and spiritual identity intact. The modern nation remains a major agricultural exporter and tourist destination, balancing its serene Buddhist values with a dynamic industrial economy.",
    physiologicalAdaptation: "Adaptation to warm, humid tropical conditions with diets rich in cooling spices, local herbs, and rice-based nutrition.",
    technologicalAdaptation: "Sophisticated canal networks (khlongs) in Bangkok and Ayutthaya for transport, irrigation, and flood mitigation, alongside traditional floating markets."
  },
  VN: {
    aiAnalysis: "Vietnam's geography is defined by an S-shaped coastline bracketed by two fertile river deltas: the Red River Delta in the north and the Mekong Delta in the south, separated by the rugged Annamite Range. This landscape forged a civilization of intense resilience, constant agricultural labor, and maritime exposure. Living in the shadow of imperial China, Vietnam developed a fiercely independent national identity, defending its borders through centuries of guerrilla warfare while simultaneously adopting Confucian administrative structures and wet-rice cultivation techniques. The trauma of the 20th-century Indochina wars and subsequent reunification under a single-party state cemented a collective, battle-hardened social cohesion. Today, Vietnam leverages its extensive coastline and hard-working population to undergo rapid industrialization, transforming itself into a global manufacturing powerhouse.",
    physiologicalAdaptation: "High heat-tolerance and physiological adaptation to working in waterlogged paddy fields, developing resistance to water-borne pathogens.",
    technologicalAdaptation: "Highly complex dike and dam networks in the Red River Delta to prevent catastrophic flooding, and traditional stilt-house architecture to manage seasonal river rises."
  },
  PH: {
    aiAnalysis: "The Philippines is an archipelago of over 7,000 islands situated along the Pacific Ring of Fire and the typhoon belt. This highly volatile geography exposed the population to frequent volcanic eruptions, earthquakes, and seasonal typhoons, cultivating a cultural trait of extreme resilience, optimism, and community solidarity, known as 'Bayanihan' (communal unity). Colonized by Spain for over 300 years and later by the United States, the archipelago experienced a deep cultural synthesis, merging Latin-Catholic traditions and American institutions with its Austronesian maritime roots. This created a unique, English-proficient, highly globalized population. The modern Philippines is a major source of global maritime and service labor, exporting its cultural adaptability worldwide while transforming its domestic economy through service-sector outsourcing.",
    physiologicalAdaptation: "Development of high psychological and social resilience (typhoon culture) and physical endurance in hot, marine environments.",
    technologicalAdaptation: "Elevated stilt houses (Bahay Kubo) designed to sway during earthquakes and allow floodwaters to pass underneath, alongside modern seismic building codes."
  },
  TR: {
    aiAnalysis: "Turkey is the definitive geographic bridge between Europe and Asia, controlling the vital Bosphorus and Dardanelles straits that link the Black Sea to the Mediterranean. This location made the Anatolian peninsula a contested crossroads for empires, from the Hittites and Greeks to the Byzantines and Ottomans. The Ottoman Empire capitalized on this strategic bottleneck to build a vast, multiethnic empire spanning three continents. Following its collapse, the modern Turkish republic was forged on a model of secular nationalism, attempting to pivot toward European institutions while maintaining its deep Islamic heritage. Turkey's modern identity is a continuous negotiation between East and West, secularism and religious conservatism. Its economy is highly diversified, leveraging its position as a manufacturing hub and transit corridor for Eurasian energy.",
    physiologicalAdaptation: "Adaptation to varied climates, from hot Mediterranean coasts to freezing Anatolian winters, with a diet rich in grains, olives, and dairy.",
    technologicalAdaptation: "Historical construction of defensible cave cities in Cappadocia, and modern engineering control of the Turkish Straits alongside extensive earthquake retrofitting."
  },
  SA: {
    aiAnalysis: "Saudi Arabia's civilization was forged in the hyper-arid wastes of the Arabian Desert. For millennia, the absolute scarcity of water restricted human habitation to scattered oases and forced the rise of Bedouin pastoralism. Survival demanded absolute loyalty to family and tribe, establishing an honor-based social structure where hospitality was a sacred duty to offset desert risks. The discovery of oil in 1938 dramatically rewrote Saudi history, transforming a poor desert kingdom into a global petro-superpower. The monarchy leveraged this immense wealth to rapidly construct ultra-modern cities, centralized infrastructure, and purchase regional influence, all while maintaining its alliance with conservative Wahhabi Islamic institutions. Today, Saudi Arabia is undergoing a major economic transition (Vision 2030) to diversify away from oil, representing a grand experiment in rapid modernization atop a deeply conservative tribal foundation.",
    physiologicalAdaptation: "Bedouin genetic adaptations to extreme heat, low water consumption, and metabolic efficiency during long periods of desert travel.",
    technologicalAdaptation: "Ancient oasis irrigation systems and camel domestication; modern deep-well water extraction, massive desalination plants, and climate-controlled urban glass towers."
  },
  IR: {
    aiAnalysis: "Iran (historically Persia) is a high, mountainous plateau ringed by the Zagros and Alborz ranges. This defensive, elevated geography allowed the Persians to maintain a distinct, continuous cultural and linguistic identity despite waves of conquests by Greeks, Arabs, Mongols, and Turks. To farm the arid plateau, ancient Persians invented the qanat—a system of underground aqueducts that transported water from mountain aquifers to plains, enabling agricultural surpluses that sustained the Achaemenid and Safavid empires. Iran's conversion to Shia Islam in the 16th century further set it apart from its Sunni neighbors, creating a unique synthesis of Persian imperial pride and Islamic revolutionary fervor. Modern Iran's theocratic regime navigates geopolitical isolation and international sanctions, leveraging its vast oil reserves and highly educated population to assert regional influence.",
    physiologicalAdaptation: "Tolerance to extreme thermal ranges between high-altitude mountain winters and scorching desert summers.",
    technologicalAdaptation: "Invention and maintenance of the Qanat water system (tunnels stretching tens of kilometers underground to prevent evaporation) and wind-catcher towers (badgirs) for passive air conditioning."
  },
  ZA: {
    aiAnalysis: "South Africa is situated at the southern tip of the African continent, defined by a high interior plateau (Highveld) separated from the narrow coastal plains by a dramatic escarpment (Great Escarpment). Its temperate climate and rich soils supported diverse indigenous populations, from the San hunter-gatherers to Bantu-speaking farmers. The discovery of the world's largest deposits of diamonds and gold in the late 19th century transformed South Africa from an agrarian frontier into an industrial powerhouse, attracting British and Dutch colonial exploitation. This resource wealth funded the brutal, centralized social engineering of the Apartheid regime. The transition to a multiracial democracy in 1994, led by Nelson Mandela, established a progressive constitutional republic. Today, South Africa represents Africa's most industrialized economy, struggling to reconcile its mineral wealth and diverse cultural tapestry with severe historical inequality.",
    physiologicalAdaptation: "Diverse adaptation across ethnic groups to varied sub-tropical and temperate climates, with high resilience to UV radiation.",
    technologicalAdaptation: "Advanced deep-level mining technology (mining gold kilometers underground) and extensive dryland coal-to-liquid fuel production infrastructure."
  },
  NG: {
    aiAnalysis: "Nigeria is the demographic giant of Africa, spanning a diverse landscape that transitions from tropical rainforests along the Gulf of Guinea to the semi-arid Sahel in the north. This ecological divide created distinct civilizational poles: the forest belt fostered centralized kingdoms like Benin and Oyo, while the northern savanna connected to Trans-Saharan Islamic trade routes. Amalgamated by British colonial rule in 1914, Nigeria brought together over 250 ethnic groups, dominated by the Hausa-Fulani north, Yoruba southwest, and Igbo southeast. Upon independence, these deep ethnic and religious splits led to a devastating civil war (1967-1970) and subsequent military regimes. The discovery of oil in the Niger Delta transformed Nigeria into a petro-state. Today, Nigeria projects soft power across Africa through Nollywood and Afrobeat, leveraging its highly entrepreneurial and youthful population to build a massive tech and services market.",
    physiologicalAdaptation: "High genetic resistance to malaria (sickle cell trait selection) and adaptation to high-humidity forest pathogen environments.",
    technologicalAdaptation: "Traditional delta canoe transport and forest crop cultivation (yams, cassava) adapted to low-nutrient soils, alongside modern offshore deepwater oil extraction platforms."
  },
  ES: {
    aiAnalysis: "Spain occupies the Iberian Peninsula, separated from Europe by the Pyrenees and situated at the western gateway of the Mediterranean. This location made it a historical battlefield and synthesis point for Phoenician, Roman, Visigothic, and Islamic (Al-Andalus) civilizations. The 800-year Christian Reconquista culminated in 1492, initiating the Spanish Empire—the world's first global maritime empire funded by silver from the Americas. This colonial wealth, however, led to domestic economic stagnation and subsequent centuries of decline, culminating in a brutal Civil War (1936-1939) and decades of fascist dictatorship under Franco. Spain's transition to a modern constitutional monarchy in 1978 ushered in rapid modernization and integration into the European Union. Spain's modern identity is a vibrant synthesis of regional passions (Catalan, Basque, Andalusian) and a relaxed Mediterranean lifestyle supported by a major tourism and services economy.",
    physiologicalAdaptation: "Adaptation to Mediterranean climate rhythms, including heat-avoidance schedules (siesta) and diets optimized for cardiovascular health (Mediterranean diet).",
    technologicalAdaptation: "Historical construction of extensive aqueducts and terrace farming on mountainous terrain, alongside modern high-speed rail networks (AVE) crossing challenging topography."
  }
};

const australiaData = {
  id: "AU",
  name: "Australia",
  capital: "Canberra",
  population: "26 Million",
  languages: ["English"],
  religion: "Christianity ~44%, Unaffiliated ~39%, Islam ~3.2%, Buddhism ~2.4%, Hinduism ~2.7%",
  coordinates: [-35.2809, 149.1300],
  climate: {
    type: "Arid Desert & Temperate Maritime",
    description: "Dry and arid across the vast interior (Outback), transitioning to temperate climates along the southern and eastern coasts.",
    temperatureRange: "5°C (winter night) to 45°C (summer day in Outback)",
    rainfallPattern: "Highly variable; heavy monsoonal rain in the tropical north, winter-dominant rainfall in the south, and extremely sparse rainfall in the interior."
  },
  geography: {
    terrain: "Low plateau with deserts in the center, fertile plains in the southeast, and the Great Dividing Range along the east coast.",
    features: ["Great Barrier Reef", "Uluru (Ayers Rock)", "Outback", "Murray-Darling River Basin", "Tasmania"],
    biodiversityRating: "Hyper-diverse (High rate of endemism due to isolation)",
    ecosystems: ["Eucalypt forests", "Spinifex desert grasslands", "Tropical rainforests (Daintree)", "Alpine shrublands", "Coral reefs"]
  },
  adaptation: {
    title: "Indigenous Firestick Farming & Dryland Water Management",
    description: "Adapting to an extremely arid land through controlled fire management and highly efficient coastal urban settlement.",
    physiologicalAdaptation: "Indigenous Australians developed metabolic adaptations to extreme heat and scarce water supplies over 65,000 years of continuous habitation.",
    technologicalAdaptation: "Controlled burning (firestick farming) to regenerate ecosystems and prevent catastrophic wildfires; modern dryland farming and desalination networks."
  },
  anthropology: {
    migrationHistory: "Inhabited by Aboriginal and Torres Strait Islander peoples for at least 65,000 years. British colonization began in 1788 as a penal colony, followed by gold rushes and post-WWII European and Asian immigration.",
    ethnicComposition: ["English/Irish/Scottish ~65%", "Other European ~15%", "Asian (Chinese, Indian, Vietnamese) ~12%", "Aboriginal and Torres Strait Islander ~3.8%"],
    ancientEmpires: ["Aboriginal nations (First Nations)", "British Colony of New South Wales", "Commonwealth of Australia"],
    socialStructures: "Egalitarian, multicultural federal democracy. Aboriginal culture maintains complex kinship and connection to country (Dreaming)."
  },
  culture: {
    insights: [
      "Indigenous connection to country and the concept of the Dreamtime (oral history of creation).",
      "Rugged egalitarianism and 'mateship' forged in the harsh frontier conditions.",
      "Outdoor-centric lifestyle focused on beaches, sports, and nature conservation."
    ],
    foodCulture: "Based on British heritage with heavy Mediterranean and Asian influences. Traditional foods include Vegemite, damper bread, and lamb roasts, alongside indigenous 'bush tucker' (kangaroo, macadamia nuts).",
    culturalIdentity: "A unique blend of the world's oldest continuous living culture, British institutional roots, and a modern, diverse Indo-Pacific outlook."
  },
  economy: {
    overview: "A wealthy, service-oriented economy driven by mineral exports, agriculture, and tourism.",
    keyIndustries: ["Mining (Iron Ore, Coal, Gold)", "Financial Services", "Education and Tourism", "Agriculture (Wheat, Beef, Wine)"],
    tradeLegacy: "Transitioned from exporting wool and gold to the British Empire to supplying raw resources to major East Asian economies (China, Japan, South Korea)."
  },
  aiAnalysis: "Australia's civilizational trajectory is a story of absolute geographical isolation. For 65,000 years, Indigenous Australians adapted to the continent's extreme aridity and nutrient-poor soils through nomadic fire-management, preserving ecological balance. The abrupt arrival of British colonization in 1788 introduced an urban, industrial system that clustered along the fertile coastlines, creating one of the most highly urbanized nations in the world. Australia's modern challenge is reconciling its ancient Indigenous heritage with its colonial institutional base, all while navigating its economic integration into the Indo-Pacific region as a resource superpower."
};

// 4. Augment and merge
const combinedCountries = { ...existingCountries };

for (const countryId of Object.keys(promotedCountryDetails)) {
  const details = promotedCountryDetails[countryId];
  const original = partialCountries.find(c => c.id === countryId);
  if (!original) {
    console.error(`Could not find partial country record for ${countryId}`);
    continue;
  }
  
  combinedCountries[countryId] = {
    ...original,
    adaptation: {
      ...original.adaptation,
      physiologicalAdaptation: details.physiologicalAdaptation,
      technologicalAdaptation: details.technologicalAdaptation
    },
    aiAnalysis: details.aiAnalysis
  };
}

// Add Australia
combinedCountries.AU = australiaData;

console.log(`Merged database. Total complete countries: ${Object.keys(combinedCountries).length}`);

// 5. Generate countriesData.ts file content
let outputData = `export interface KeyFigure {
  name: string;
  role: string;
}

export interface CountryData {
  id: string;
  name: string;
  capital: string;
  population: string;
  languages: string[];
  religion: string;
  coordinates: [number, number]; // [lat, lng]
  climate: {
    type: string;
    description: string;
    temperatureRange: string;
    rainfallPattern: string;
  };
  geography: {
    terrain: string;
    features: string[];
    biodiversityRating: string;
    ecosystems: string[];
  };
  adaptation: {
    title: string;
    description: string;
    physiologicalAdaptation?: string;
    technologicalAdaptation?: string;
  };
  anthropology: {
    migrationHistory: string;
    ethnicComposition: string[];
    ancientEmpires: string[];
    socialStructures: string;
  };
  culture: {
    insights: string[];
    foodCulture: string;
    culturalIdentity: string;
  };
  economy: {
    overview: string;
    keyIndustries: string[];
    tradeLegacy: string;
  };
  aiAnalysis: string;
}

export const countriesData: Record<string, CountryData> = {\n`;

// Format nicely as TS code
for (const [id, data] of Object.entries(combinedCountries)) {
  outputData += `  ${id}: ${JSON.stringify(data, null, 4).replace(/\n/g, '\n  ')},\n`;
}

outputData += `};

export const countriesDataArray = Object.values(countriesData);
`;

fs.writeFileSync(countriesDataPath, outputData, 'utf8');
console.log('Successfully wrote countriesData.ts');

// 6. Update reference list UN_MEMBER_STATES_REFERENCE.ts
let referenceContent = fs.readFileSync(referencePath, 'utf8');

const promotedCodes = ['AU', 'ID', 'SG', 'TH', 'VN', 'PH', 'TR', 'SA', 'IR', 'ZA', 'NG', 'ES'];

// Replace status to complete
promotedCodes.forEach(code => {
  const regex = new RegExp(`'${code}': \\{\\s*name:\\s*'([^']+)',\\s*code:\\s*'${code}',\\s*status:\\s*'[^']+'\\s*\\}`, 'g');
  referenceContent = referenceContent.replace(regex, (match, name) => {
    console.log(`Updating status for ${name} (${code}) to complete`);
    return `'${code}': { name: '${name}', code: '${code}', status: 'complete' }`;
  });
});

// Update countryStats block in UN_MEMBER_STATES_REFERENCE.ts
// Parse previous stats and update them
// Prev completed: 15. Adding 12: complete becomes 27.
// Prev partial: 26. Removing 11: partial becomes 15.
// Prev planned: 156. Removing 1 (AU): planned becomes 155.
// Total stays 197.
const completedCount = 27;
const partialCount = 15;
const plannedCount = 155;
const percentComplete = ((completedCount / 197) * 100).toFixed(1);
const percentPartial = ((partialCount / 197) * 100).toFixed(1);
const percentPlanned = ((plannedCount / 197) * 100).toFixed(1);

referenceContent = referenceContent.replace(/completed: \d+/, `completed: ${completedCount}`);
referenceContent = referenceContent.replace(/partial: \d+/, `partial: ${partialCount}`);
referenceContent = referenceContent.replace(/planned: \d+/, `planned: ${plannedCount}`);
referenceContent = referenceContent.replace(/percentComplete: \d+\.\d+/, `percentComplete: ${percentComplete}`);
referenceContent = referenceContent.replace(/percentPartial: \d+\.\d+/, `percentPartial: ${percentPartial}`);
referenceContent = referenceContent.replace(/percentPlanned: \d+\.\d+/, `percentPlanned: ${percentPlanned}`);
referenceContent = referenceContent.replace(/'countriesData\.ts': \d+/, `'countriesData.ts': ${completedCount}`);
referenceContent = referenceContent.replace(/'allCountriesComprehensive\.ts': \d+/, `'allCountriesComprehensive.ts': ${partialCount}`);
referenceContent = referenceContent.replace(/'planned': \d+/, `'planned': ${plannedCount}`);

fs.writeFileSync(referencePath, referenceContent, 'utf8');
console.log('Successfully wrote UN_MEMBER_STATES_REFERENCE.ts');
