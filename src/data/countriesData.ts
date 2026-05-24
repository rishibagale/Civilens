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

export const countriesData: Record<string, CountryData> = {
  EG: {
    id: "EG",
    name: "Egypt",
    capital: "Cairo",
    population: "116 Million",
    languages: ["Arabic (official)", "English", "French"],
    religion: "Islam (primarily Sunni) ~90%, Christian (primarily Coptic) ~10%",
    coordinates: [26.8206, 30.8025],
    climate: {
      type: "Arid Desert",
      description: "Hot, dry summers and moderate winters. Rainfall is extremely sparse, occurring mostly along the Mediterranean coast.",
      temperatureRange: "14°C (winter night) to 40°C+ (summer day)",
      rainfallPattern: "Less than 20mm annually in inland areas; up to 200mm on the northern coast."
    },
    geography: {
      terrain: "Vast desert plateau bisected by the fertile Nile River Valley and Delta.",
      features: ["Nile River", "Sahara Desert", "Sinai Peninsula", "Suez Canal", "Qattara Depression"],
      biodiversityRating: "Low to Moderate (Highly concentrated in the Nile corridor)",
      ecosystems: ["Hyper-arid desert dunes", "Riverine wetlands", "Mangrove estuaries (Red Sea)", "Coral reefs"]
    },
    adaptation: {
      title: "Nilotic Riverine Hydrology & Desert Oasis Systems",
      description: "Survival in Egypt required managing the annual flooding of the Nile and creating localized irrigation systems to farm the desert's edge.",
      physiologicalAdaptation: "Generations of farmers developed resistance to heat-related stress and water-borne pathogens common in standing canal irrigation systems.",
      technologicalAdaptation: "Ancient Basin Irrigation (directing floodwaters using earthen dykes) evolved into modern perennial irrigation with the construction of the Aswan High Dam."
    },
    anthropology: {
      migrationHistory: "A key land bridge between Africa, Asia, and Europe. Populated by early hominids out of Africa, later experiencing Arab conquests, Ottoman rule, and European colonial encounters.",
      ethnicComposition: ["Egyptian ~99%", "Nubian, Bedouin, Beja, Berber ~1%"],
      ancientEmpires: ["Early Dynastic Egypt", "New Kingdom Empire", "Ptolemaic Kingdom", "Fatimid Caliphate", "Mamluk Sultanate"],
      socialStructures: "Historically highly centralized and hierarchical, driven by the need for cooperative labor to manage Nile irrigation (what Karl Wittfogel termed a 'hydraulic empire')."
    },
    culture: {
      insights: [
        "A cultural synthesis of Pharaonic heritage, Islamic traditions, and modern Arab nationalism.",
        "Deep respect for the cycle of water and seasons, historically linked to the afterlife and cosmic order.",
        "Strong collective community bonds rooted in agrarian farming villages (Fellaheen)."
      ],
      foodCulture: "Heavy reliance on legumes, vegetables, and grains. National dishes include Koshary (lentils, rice, pasta) and Ful Medames (slow-cooked fava beans). Flatbread (Eish Baladi, literally 'life bread') is a daily staple.",
      culturalIdentity: "Known as 'Umm al-Dunya' (Mother of the World), reflecting its position as a cradle of human civilization."
    },
    economy: {
      overview: "A diversified economy relying on services, agriculture, tourism, and Suez Canal shipping transit tariffs.",
      keyIndustries: ["Petroleum and Natural Gas", "Tourism", "Suez Canal Shipping Services", "Textiles (Egyptian Cotton)"],
      tradeLegacy: "The ancient crossroad of the Incense and Spice Routes connecting East Africa, India, and the Mediterranean basin."
    },
    aiAnalysis: "Egypt represents the archetype of a hydraulic civilization. Without the Nile, the region would be uninhabitable. The strict geographic boundaries of the Nile Valley compressed the population, fostering an early need for writing, centralized tax systems, and calendar technology. This high concentration of population allowed for massive labor mobilization (pyramids, canals) but also left the state vulnerable to climate variations that disrupted Nile flows, causing dynastic collapses throughout history."
  },
  JP: {
    id: "JP",
    name: "Japan",
    capital: "Tokyo",
    population: "123 Million",
    languages: ["Japanese"],
    religion: "Shintoism and Buddhism syncretism ~80%, Christianity ~1.5%",
    coordinates: [36.2048, 138.2529],
    climate: {
      type: "Temperate Maritime",
      description: "Four distinct seasons with humid summers, snow-heavy winters in the north and west, and mild conditions in the south.",
      temperatureRange: "-5°C (Hokkaido winter) to 35°C (Tokyo summer)",
      rainfallPattern: "Heavy precipitation, particularly during the summer monsoon (Tsuyu) and autumn typhoons."
    },
    geography: {
      terrain: "Volcanic, mountainous archipelago (~73% mountainous terrain) with narrow, highly populated coastal plains.",
      features: ["Mount Fuji", "Japanese Alps", "Kanto Plain", "Shinano River", "Ryukyu Islands"],
      biodiversityRating: "High (Temperate forest and marine biodiversity)",
      ecosystems: ["Deciduous and coniferous mountain forests", "Subtropical rainforests (Okinawa)", "Deep-sea trenches", "Volcanic thermal vents"]
    },
    adaptation: {
      title: "Volcanic Risk Mitigation & Terraced Agrosystems",
      description: "Adapting to active volcanoes, frequent earthquakes, tsunamis, and lack of flat arable land.",
      physiologicalAdaptation: "Cultural and psychological adaptations to high-density living, including spatial awareness and heightened community cooperation.",
      technologicalAdaptation: "Seismic-resistant engineering (pioneered in ancient pagodas with central pillars called shinbashira), terraced rice paddies to maximize mountain slopes, and advanced early warning networks."
    },
    anthropology: {
      migrationHistory: "Populated by the Jomon hunter-gatherers, followed by the Yayoi wet-rice farmers from mainland Asia. The country underwent long periods of isolation (Sakoku) under the Tokugawa Shogunate.",
      ethnicComposition: ["Japanese 97.9%", "Korean 0.5%", "Chinese 0.6%", "Ainu and Ryukyu minorities"],
      ancientEmpires: ["Yamato Dynasty", "Kamakura Shogunate", "Muromachi Shogunate", "Tokugawa Shogunate", "Empire of Japan"],
      socialStructures: "Characterized by strong group cohesion, collective accountability (Giri), and respect for hierarchy, derived from historical samurai structures and collaborative rice cultivation."
    },
    culture: {
      insights: [
        "Aesthetic appreciation of impermanence ('Mono no Aware') and natural imperfection ('Wabi-Sabi'), influenced by earthquakes.",
        "Harmonious integration of nature and synthetic interfaces.",
        "Shinto belief in animism, where spirits (Kami) inhabit rivers, trees, and mountains."
      ],
      foodCulture: "Based on rice, seasonal vegetables, and marine proteins. Heavy emphasis on preservation and presentation (Sushi, Sashimi, Miso, Tempura). A rich tea culture centered on Matcha.",
      culturalIdentity: "An intense synthesis of ancient ritualism and high-tech futurism."
    },
    economy: {
      overview: "High-tech powerhouse focusing on advanced manufacturing, electronics, automotive engineering, and financial services.",
      keyIndustries: ["Automotive Engineering", "Robotics and Automation", "Consumer Electronics", "Precision Machinery"],
      tradeLegacy: "Transitioned from isolation to a maritime trading empire, exporting advanced cultural and industrial goods globally."
    },
    aiAnalysis: "Japan's civilization was molded by its island geography and geological volatility. The ring of fire forged a collective consciousness highly attuned to natural disasters, leading to an aesthetic that values the beauty of fleeting moments. The extreme mountain terrain left only small coastal pockets for agriculture, forcing intense cooperation for water management and rice distribution. This localized collaboration, reinforced during centuries of political isolation, translated directly into Japan's highly organized corporate structures and precision engineering capabilities in the modern era."
  },
  IS: {
    id: "IS",
    name: "Iceland",
    capital: "Reykjavik",
    population: "390,000",
    languages: ["Icelandic"],
    religion: "Evangelical Lutheran Church of Iceland ~60%, Other Christian ~15%, Heathenry (Asatru) ~1.5%",
    coordinates: [64.9631, -19.0208],
    climate: {
      type: "Subpolar Oceanic / Tundra",
      description: "Cold and windy, mitigated by the warm North Atlantic Current. Cool summers and relatively mild winters for its latitude.",
      temperatureRange: "-10°C (highlands winter) to 15°C (coastal summer)",
      rainfallPattern: "Frequent rain, sleet, and snow, varying from 400mm in the north to 2000mm in the south."
    },
    geography: {
      terrain: "Volcanic plateau with active hot springs, geysers, vast lava fields, glaciers, and deep fjords along the coast.",
      features: ["Vatnajökull Glacier", "Gullfoss Waterfall", "Blue Lagoon", "Mount Hekla", "Geysir Geothermal Area"],
      biodiversityRating: "Low (Very few native terrestrial mammals, but rich marine and bird life)",
      ecosystems: ["Subarctic tundra", "Glacial rivers", "Fjord estuaries", "Geothermal hot springs", "Basalt lava deserts"]
    },
    adaptation: {
      title: "Geothermal Harnessing & Extreme Subarctic Survival",
      description: "Surviving in a landscape of volcanic eruptions and dark subarctic winters using thermal energy and unique preservation styles.",
      physiologicalAdaptation: "Enhanced metabolic tolerance to cold and long winter darkness (low sunlight adaptation).",
      technologicalAdaptation: "Historical turf houses (insulating against freezing winds with sod and grass) replaced by modern geothermal district heating networks, powering 90%+ of all homes and greenhouses."
    },
    anthropology: {
      migrationHistory: "Settled in the late 9th century by Norse Vikings and Celtic slaves. Isolated for centuries, maintaining an exceptionally pure linguistic lineage and genetic profile.",
      ethnicComposition: ["Icelandic ~86%", "Polish ~6%", "Other European/Asian ~8%"],
      ancientEmpires: ["Althing (Early Commonwealth)", "Norwegian Rule", "Danish Kingdom"],
      socialStructures: "Egalitarian social structure with a historic lack of feudalism. Decisions were traditionally made collectively at the Althing, the world's oldest surviving parliament (est. 930 CE)."
    },
    culture: {
      insights: [
        "A nation of storytellers, with a literary tradition stretching back to the 12th-century Icelandic Sagas.",
        "Deep respect for folklore, including the belief in Huldufólk (hidden people / elves) inhabiting volcanic rock formations.",
        "Strong cultural emphasis on independence, resilience, and literary creation."
      ],
      foodCulture: "Traditionally centered on preservation due to short growing seasons: fermentation, pickling, and smoking. Specialties include Hákarl (fermented shark), Skyr (thick dairy product), and fresh lamb/Atlantic cod.",
      culturalIdentity: "The Land of Fire and Ice, defined by a culture that blends rugged survivalism with an active creative society."
    },
    economy: {
      overview: "A highly developed economy based on fisheries, renewable energy, tourism, and aluminum smelting.",
      keyIndustries: ["Commercial Fishing and Fish Processing", "Eco-Tourism", "Geothermal & Hydroelectric Power Generation", "Tech & Software Startups"],
      tradeLegacy: "Historically reliant on exporting cod and wool to mainland Europe in exchange for wood and grain."
    },
    aiAnalysis: "Iceland presents a unique study of human adaptation to absolute isolation. The settlers encountered an ecosystem with no trees (which they quickly depleted for firewood and boats) and high volcanic instability, requiring them to invent turf-based architecture to survive the winters. The extreme environment limited the carrying capacity of the land, keeping the population small and preventing the development of a complex hierarchy. This flat social structure, paired with a long dark winter that encouraged indoor storytelling, created a highly literate, egalitarian society that today leads in green energy technology and cultural output."
  },
  IN: {
    id: "IN",
    name: "India",
    capital: "New Delhi",
    population: "1.43 Billion",
    languages: ["Hindi (official)", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "22 Scheduled Languages"],
    religion: "Hinduism ~79.8%, Islam ~14.2%, Christianity ~2.3%, Sikhism ~1.7%, Buddhism ~0.7%, Jainism ~0.4%",
    coordinates: [20.5937, 78.9629],
    climate: {
      type: "Tropical Monsoon & Diverse Regional Climates",
      description: "Varies from alpine tundra in the Himalayas to tropical wet in the south and arid desert in the west. Dominated by the seasonal monsoon winds.",
      temperatureRange: "-10°C (Himalayan winter) to 48°C (Thar Desert summer)",
      rainfallPattern: "Extremely seasonal. The southwest monsoon (June-September) delivers 80% of the country's annual rainfall."
    },
    geography: {
      terrain: "High mountain ranges in the north, fertile Indo-Gangetic plains, central dry plateau, and long coastal strips.",
      features: ["Himalayas", "Ganges River", "Deccan Plateau", "Thar Desert", "Western Ghats"],
      biodiversityRating: "Mega-diverse (One of the top 17 mega-diverse countries)",
      ecosystems: ["Alpine meadows", "Alluvial grasslands", "Tropical rainforests", "Dry deciduous forests", "Thar desert scrub", "Sundarbans mangrove delta"]
    },
    adaptation: {
      title: "Stepwell Hydrology & Monsoon Crop Rotation",
      description: "Managing severe dry seasons followed by massive monsoons through water conservation architecture and agrarian calendars.",
      physiologicalAdaptation: "High heat-tolerance and physiological efficiency in processing a plant-based diet in hot conditions.",
      technologicalAdaptation: "Construction of thousands of elaborate stepwells (Baoris) to store rainwater deep underground, and advanced drainage systems in the ancient Indus Valley cities."
    },
    anthropology: {
      migrationHistory: "A crucial crossroads of global human migration. Home to the ancient Indus Valley Civilization. Experiencing migrations of Indo-Aryans, Greco-Bactrians, Islamic dynasties, and British colonial rule.",
      ethnicComposition: ["Indo-Aryan ~72%", "Dravidian ~25%", "Austroasiatic and Tibeto-Burman ~3%"],
      ancientEmpires: ["Indus Valley Civilization", "Maurya Empire", "Gupta Empire", "Chola Dynasty", "Mughal Empire", "Maratha Confederacy"],
      socialStructures: "Historically characterized by highly structured, localized village systems and the complex, controversial caste (Varna/Jati) social system, which originally coordinated labor specialization."
    },
    culture: {
      insights: [
        "A highly pluralistic civilization with continuous traditions dating back over 5000 years.",
        "Concepts of Dharma (cosmic order/duty) and Karma (cause and effect) are deeply woven into daily life.",
        "Artistic expressions include intricate temple architecture, classical dance forms (Bharatanatyam), and epic literature (Ramayana, Mahabharata)."
      ],
      foodCulture: "Extremely regional, characterized by sophisticated spice blends (Garam Masala, Turmeric). High rate of vegetarianism. Staple foods include rice in the south/east, wheat flatbreads (Roti, Naan) in the north, and lentils (Dal) nationwide.",
      culturalIdentity: "A vibrant mosaic of languages, festivals (Diwali, Holi), clothing (Sari, Dhoti), and philosophies."
    },
    economy: {
      overview: "A fast-growing major economy transitioning from agriculture to a major services, software, manufacturing, and pharmaceutical hub.",
      keyIndustries: ["Information Technology & Software Services", "Pharmaceuticals & Biotechnology", "Textiles and Apparel", "Heavy Manufacturing & Agriculture"],
      tradeLegacy: "The anchor of the Silk Road and Indian Ocean trade networks, exporting spices, textiles (muslin, calico), and gemstones for millennia."
    },
    aiAnalysis: "India's civilization is fundamentally tied to the monsoon cycle. The predictability yet volatility of the rains created a culture focused on cycles, time, and cosmic scales, influencing Indian mathematics, philosophy, and religion. The fertile alluvial plains of the Ganges allowed for massive population densities, fostering rich linguistic and cultural diversity rather than a single homogeneous state. Its geographical boundary of the Himalayas acted as a wall, isolating it enough to develop a distinct civilizational identity, while the passes in the northwest and its open oceans ensured constant, rich cultural infusions."
  },
  BR: {
    id: "BR",
    name: "Brazil",
    capital: "Brasilia",
    population: "215 Million",
    languages: ["Portuguese (official)"],
    religion: "Roman Catholicism ~64.6%, Protestantism ~22.2%, Spiritism ~2%, Candomblé/Umbanda ~0.3%",
    coordinates: [-14.2350, -51.9253],
    climate: {
      type: "Tropical and Subtropical",
      description: "Mostly hot and humid, with tropical wet and dry seasons. The southern regions transition into temperate climates with cold winters.",
      temperatureRange: "10°C (southern winter frost) to 40°C (Amazon summer)",
      rainfallPattern: "Very high rainfall in the Amazon basin (exceeding 3000mm annually), while the northeast semi-arid region (Sertão) experiences severe droughts."
    },
    geography: {
      terrain: "Extensive plains, low hills, and plateaus, dominated by the massive Amazon River Basin and the Guiana Highlands.",
      features: ["Amazon River", "Pantanal Wetlands", "Cerrado Savannah", "Atlantic Forest", "Brazilian Highlands"],
      biodiversityRating: "Hyper-diverse (Holds the highest biodiversity of any nation on Earth)",
      ecosystems: ["Amazon rainforest", "Flooded savannah (Pantanal)", "Wooded grasslands (Cerrado)", "Semi-arid thorn forest (Caatinga)", "Atlantic coastal forest"]
    },
    adaptation: {
      title: "Rainforest Silviculture & Agro-ecological Adaptations",
      description: "Indigenous tribes adapted to live inside the Amazon without destroying it, using terra preta soil, while modern populations manage soil acidity in the Cerrado.",
      physiologicalAdaptation: "Indigenous populations evolved immunities and genetic adaptations to humid tropical climates and forest pathogens.",
      technologicalAdaptation: "Ancient creation of 'Terra Preta' (highly fertile, human-made dark earth created by adding charcoal, bone, and manure to nutrient-poor forest soils) and modern agricultural engineering to fertilize the acid-heavy Cerrado savannah."
    },
    anthropology: {
      migrationHistory: "Inhabited by hundreds of nomadic and semi-nomadic indigenous tribes (Tupi, Guarani). Colonized by the Portuguese in 1500, followed by the largest forced migration of enslaved Africans in history, and later massive waves of Italian, German, Japanese, and Middle Eastern immigrants.",
      ethnicComposition: ["White ~47.7%", "Mixed (Pardo) ~43.1%", "Black ~7.6%", "East Asian ~1.1%", "Indigenous ~0.5%"],
      ancientEmpires: ["Kingdom/Empire of Brazil (1822–1889)"],
      socialStructures: "Complex, highly syncresized social structure. Highly urbanized coastal populations juxtaposed with isolated indigenous territories in the interior."
    },
    culture: {
      insights: [
        "A highly syncretic society blending Portuguese institutions, West African music, dance, and spiritualism, and Indigenous land practices.",
        "Deep cultural devotion to public festivities, most famously Carnaval, showcasing regional samba and axé rhythms.",
        "Candomblé and Umbanda represent unique Afro-Brazilian syncretic religions combining Catholic saints with African Orixás."
      ],
      foodCulture: "Based on cassava, beans, rice, and meat. The national dish is Feijoada (a rich black bean stew with pork and beef). In the south, Churrasco (barbecue) dominates, while northeastern cuisine features Acarajé (black-eyed pea fritters fried in dende palm oil).",
      culturalIdentity: "Defined by 'Jeitinho Brasileiro' (the Brazilian way of finding creative, informal solutions to problems) and a joyful, expressive lifestyle."
    },
    economy: {
      overview: "A major global economy driven by vast agricultural exports, mining, manufacturing, and aerospace.",
      keyIndustries: ["Agribusiness (Soy, Beef, Sugar, Coffee)", "Iron Ore and Oil Extraction", "Aerospace Manufacturing (Embraer)", "Biofuels (Ethanol)"],
      tradeLegacy: "Shaped by colonial commodity cycles (Brazilwood, Sugar, Gold, Rubber, Coffee) which dictated domestic infrastructure and migration paths."
    },
    aiAnalysis: "Brazil represents an ecological superpower. Its developmental history is a story of human interaction with massive, complex forest and savannah systems. The Amazon rainforest acted as an internal ocean, preventing centralization and fostering diverse, sustainable indigenous micro-societies. The modern state's expansion into the interior required massive infrastructure projects (like building the capital Brasilia in the geographic center) and scientific agricultural breakthroughs to turn the infertile Cerrado savannah into a global breadbasket, showcasing how technological adaptation can unlock previously unproductive climates."
  },
  NO: {
    id: "NO",
    name: "Norway",
    capital: "Oslo",
    population: "5.5 Million",
    languages: ["Norwegian (Bokmål and Nynorsk)", "Sámi (regional)"],
    religion: "Church of Norway (Lutheran) ~67.5%, Other Christian ~7%, Islam ~3.4%, Humanism ~2%",
    coordinates: [60.4720, 8.4689],
    climate: {
      type: "Temperate Maritime & Subarctic Tundra",
      description: "Mitigated by the Gulf Stream, the coast remains ice-free, but inland areas experience extreme, snowy subarctic winters. Cool summers.",
      temperatureRange: "-15°C (inland winter) to 22°C (Oslo summer)",
      rainfallPattern: "Heavy precipitation along the western coast (up to 3000mm in Bergen due to orographic lift), drier in the interior rain shadows."
    },
    geography: {
      terrain: "Extremely rugged, mountainous coastline carved by glaciers, forming thousands of deep fjords, islands, and waterfalls.",
      features: ["Sognefjord", "Jotunheimen Mountains", "Lofoten Islands", "Hardangervidda Plateau", "Glama River"],
      biodiversityRating: "Moderate (Well-adapted boreal and marine ecosystems)",
      ecosystems: ["Glacial mountain plateaus", "Boreal coniferous forests", "Cold-water coral reefs", "Deep fjord trenches"]
    },
    adaptation: {
      title: "Fjord Navigation & Boreal Resource Management",
      description: "Utilizing deep sea access to offset poor agricultural land and surviving cold dark winters via seasonal energy storage and building styles.",
      physiologicalAdaptation: "High density of genetic adaptations to low sunlight (vitamin D synthesis efficiency) and tolerance to cold.",
      technologicalAdaptation: "Ancient mastery of maritime clinker shipbuilding (Viking longships) which transformed fjords from barriers into highways, and modern hydro-electric and offshore deepwater drilling technologies."
    },
    anthropology: {
      migrationHistory: "Inhabited by hunter-gatherers following the melting glaciers of the last Ice Age. Home to the Sámi people in the north. Norse Viking clans expanded across Europe in the 8th-11th centuries.",
      ethnicComposition: ["Norwegian ~81.5%", "Other European ~12%", "Asian, African, American ~6.5%", "Sámi indigenous minority"],
      ancientEmpires: ["Norse Earldoms", "Kingdom of Norway (1030–1397)", "Kalmar Union", "Denmark-Norway Union", "Sweden-Norway Union"],
      socialStructures: "Highly egalitarian, shaped by historically isolated farming/fishing communities that required mutual cooperation to survive winter. This evolved into the modern Nordic Social Model."
    },
    culture: {
      insights: [
        "Strong cultural concept of 'Friluftsliv' (free-air life), representing a deep philosophical connection to outdoor activity regardless of weather.",
        "'Dugnad' — a community-wide tradition of unpaid cooperative voluntary work to help neighbors or improve public spaces.",
        "Deep history of woodworking, visible in the 800-year-old wooden stave churches (Stavkirke)."
      ],
      foodCulture: "Heavy focus on preserved seafood, game, and dairy. Staples include smoked salmon, Rakfisk (fermented trout), Brunost (sweet brown whey cheese), and Lefse (potato flatbread).",
      culturalIdentity: "Minimalist, nature-focused, and community-oriented, valuing equality, modesty (Law of Jante), and environmental stewardship."
    },
    economy: {
      overview: "High-income welfare state powered by offshore petroleum, maritime shipping, aquaculture, and green energy.",
      keyIndustries: ["Offshore Oil and Gas", "Hydroelectric Power Generation", "Commercial Fisheries and Aquaculture", "Maritime Shipping & Hydropower Engineering"],
      tradeLegacy: "Viking-era maritime trade networks developed into one of the world's largest modern shipping and seafood exporting operations."
    },
    aiAnalysis: "Norway is a masterclass in using maritime technology to conquer rugged terrain. The inland mountains and glaciers are so impassable that land travel was virtually impossible for most of history; the sea-filled fjords became the primary highways. This dependency on the ocean forged a maritime culture that led to the Viking expansions and, centuries later, enabled Norway to become an expert in offshore drilling and aquaculture. The harsh climate also prevented massive feudal estates, leaving land in the hands of independent farmers and fishermen, which laid the foundation for the high trust, low hierarchy society seen today."
  }
};
