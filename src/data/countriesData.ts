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
    coordinates: [28.6139, 77.2090],
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
      ancientEmpires: ["Indus Valley Civilization", "Maurya Empire", "Gupta Empire", "Chola Dynasty", "Mughal Empire", "Maratha Confederacy", "India"],
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
  },
  US: {
    id: "US",
    name: "United States",
    capital: "Washington, D.C.",
    population: "331 Million",
    languages: ["English"],
    religion: "Christianity ~65%, Unaffiliated ~23%, Judaism ~1.9%, Islam ~1.1%",
    coordinates: [38.8951, -77.0369],
    climate: {
      type: "Diverse (Subtropical, Mediterranean, Arid, Temperate)",
      description: "Extremely varied climate zones from tropical Florida to arctic Alaska, Mediterranean California to humid Eastern seaboard.",
      temperatureRange: "-60°C (Alaska) to 57°C (Death Valley)",
      rainfallPattern: "Highly regional: Pacific Northwest wet, Southwest arid, South humid subtropical"
    },
    geography: {
      terrain: "Vast continental landmass with Great Plains, Rocky Mountains, Appalachians, and coastal plains.",
      features: ["Rocky Mountains", "Mississippi River", "Grand Canyon", "Great Lakes", "Appalachian Mountains"],
      biodiversityRating: "High (Megadiverse continent spanning multiple ecosystems)",
      ecosystems: ["Temperate deciduous forests", "Great Plains grasslands", "Desert ecosystems", "Boreal forests", "Wetlands and swamps"]
    },
    adaptation: {
      title: "Continental Scale Land Utilization & Mobility Innovation",
      description: "Adapting to vast distances and varied climates through technological innovation.",
      technologicalAdaptation: "Automobile culture, transcontinental railways, interstate highway system enabling rapid resource distribution across continental scales."
    },
    anthropology: {
      migrationHistory: "Populated by indigenous peoples for 15,000+ years. European colonization from 1600s, slavery-driven agricultural development, mass immigration waves.",
      ethnicComposition: ["White ~60%", "Hispanic/Latino ~18%", "African American ~12%", "Asian ~6%", "Native American ~2%", "Other ~2%"],
      ancientEmpires: ["Pre-Columbian civilizations (Ancestral Puebloans, Mississippian, Iroquois Confederacy)", "United States of America"],
      socialStructures: "Highly individualistic, capitalist, federal system with strong regional variation."
    },
    culture: {
      insights: ["Emphasis on innovation and entrepreneurship", "Cultural exports dominate global entertainment", "Multicultural fusion as defining characteristic"],
      foodCulture: "Highly diverse and globalized: BBQ, fast food culture, regional specialties (Cajun, Tex-Mex, Southern comfort food).",
      culturalIdentity: "Defined by frontier spirit, innovation, diversity, and global cultural influence."
    },
    economy: {
      overview: "World's largest economy; diversified across finance, technology, energy, and services.",
      keyIndustries: ["Technology and Software", "Finance and Banking", "Energy", "Aerospace and Defense", "Entertainment"],
      tradeLegacy: "Industrial powerhouse; current global financial and technological hegemon."
    },
    aiAnalysis: "The US geography enabled the development of a continental superpower. The Atlantic barrier, vast interior, and diverse climates created a nation-scale laboratory for capitalism. The frontier mythology (despite its costs) drove innovation and risk-taking. The combination of immigrant diversity, resource abundance, and technological innovation created the world's dominant 20th-21st century power."
  },
  MX: {
    id: "MX",
    name: "Mexico",
    capital: "Mexico City",
    population: "128 Million",
    languages: ["Spanish (official)"],
    religion: "Roman Catholicism ~82%, Protestantism ~9%, Unaffiliated ~6%",
    coordinates: [19.4326, -99.1332],
    climate: {
      type: "Tropical and Temperate Mountain",
      description: "Mountainous terrain creates distinct climate zones with tropical coasts and temperate highlands.",
      temperatureRange: "5°C (highlands winter) to 40°C (coasts summer)",
      rainfallPattern: "Seasonal monsoon with wet summers; variation from wet coasts to arid interior."
    },
    geography: {
      terrain: "Mountainous tableland flanked by coastal plains and tropical jungles.",
      features: ["Sierra Madre ranges", "Mexico City Basin", "Yucatan Peninsula", "Pacific Coast", "Chiapas Highlands"],
      biodiversityRating: "Mega-diverse (17 of 17 megadiverse countries)",
      ecosystems: ["Tropical rainforests", "Deciduous forests", "Cloud forests", "Deserts", "Mangrove wetlands"]
    },
    adaptation: {
      title: "Mountain Terrace Agriculture & Altitude Adaptation",
      description: "Adapting to extreme elevation variations and seismic activity.",
      technologicalAdaptation: "Pre-Columbian terraced agriculture on steep slopes; modern seismic building codes."
    },
    anthropology: {
      migrationHistory: "Home to sophisticated pre-Columbian civilizations (Aztec, Maya). Spanish conquest created mestizo society.",
      ethnicComposition: ["Mestizo ~62%", "European ~12%", "Indigenous ~10%", "Other ~16%"],
      ancientEmpires: ["Aztec Empire", "Maya Civilization", "Spanish New Spain", "Mexico"],
      socialStructures: "Hierarchical colonial legacy mixed with indigenous community structures."
    },
    culture: {
      insights: ["Rich pre-Columbian heritage intertwined with Spanish Catholicism", "Day of Dead (Día de Muertos) as defining cultural expression", "Powerful artistic tradition (Muralism, Frida Kahlo)"],
      foodCulture: "Complex, UNESCO-recognized. Mole, tamales, street tacos, chile peppers as cultural cornerstone.",
      culturalIdentity: "Ancient roots meeting modern vibrancy; spiritual connection to death and life cycles."
    },
    economy: {
      overview: "Mixed emerging market; USMCA (NAFTA) integration drives manufacturing and trade.",
      keyIndustries: ["Manufacturing", "Petroleum", "Tourism", "Agriculture"],
      tradeLegacy: "Gateway between Pacific and Atlantic trade; silver mining wealth."
    },
    aiAnalysis: "Mexico's civilization was built on mountains. The Aztec built Tenochtitlan on an island in Lake Texcoco, creating an engineering marvel. The difficult terrain allowed for isolated pre-Columbian empires but also left them vulnerable to Spanish conquest from coastal beachheads. Modern Mexico struggles with the legacy of colonial exploitation and geographic barriers (northern deserts, southern jungles) that create regional inequality and provide routes for illicit trade."
  },
  CA: {
    id: "CA",
    name: "Canada",
    capital: "Ottawa",
    population: "38 Million",
    languages: ["English", "French"],
    religion: "Christianity ~55%, Unaffiliated ~27%, Islam ~3.2%, Judaism ~1%",
    coordinates: [45.4215, -75.6972],
    climate: {
      type: "Subarctic and Temperate Maritime",
      description: "Vast country ranging from arctic tundra to temperate Pacific coast; dominated by cold winters.",
      temperatureRange: "-50°C (Northern territories) to 35°C (Southern summer)",
      rainfallPattern: "Highly variable; west coast very wet, prairie dry, east receives moderate precipitation."
    },
    geography: {
      terrain: "Shield (ancient Precambrian rock), prairie plains, mountains (Rockies), and Arctic islands.",
      features: ["Canadian Shield", "Rocky Mountains", "Niagara Falls", "Great Lakes (shared)", "Arctic tundra"],
      biodiversityRating: "High (Boreal and temperate ecosystems, Arctic fauna)",
      ecosystems: ["Boreal forests", "Grasslands", "Arctic tundra", "Temperate rainforests", "Freshwater lakes and rivers"]
    },
    adaptation: {
      title: "Arctic Survival & Northern Resource Extraction",
      description: "Adapting to extreme cold, vast distances, and harsh northern environment.",
      technologicalAdaptation: "Advanced heating systems, snowmobile transportation, expertise in resource extraction in permafrost."
    },
    anthropology: {
      migrationHistory: "Populated by Indigenous peoples for 12,000+ years. French and British colonization. British dominance after 1763.",
      ethnicComposition: ["European descent ~72%", "Asian ~17%", "Indigenous ~5%", "Black ~3%", "Latin American ~3%"],
      ancientEmpires: ["Pre-Columbian Indigenous nations", "New France", "British North America", "Canada"],
      socialStructures: "Federal bilingual system; Indigenous reconciliation ongoing."
    },
    culture: {
      insights: ["Multiculturalism as official policy", "Strong regional variation (French Quebec, Western provinces)", "Winter sports culture"],
      foodCulture: "Poutine (fries, gravy, cheese), Tourtière, Beaver Tails pastry, salmon fishing heritage.",
      culturalIdentity: "Defined by diversity, Northern frontier spirit, and bicultural (English-French) identity."
    },
    economy: {
      overview: "Advanced economy integrated with US via USMCA; resource-rich (oil, minerals, timber).",
      keyIndustries: ["Oil and Gas Extraction", "Mining", "Forestry", "Technology", "Manufacturing"],
      tradeLegacy: "Fur trade drove early exploration; timber, minerals, and oil exports continue."
    },
    aiAnalysis: "Canada is geography divided against itself. The Canadian Shield and northern wilderness prevented easy consolidation. French colonization in the St. Lawrence valley created a distinct Francophone enclave. The true Canadian economy developed around resource extraction in the Shield and prairies, tied intrinsically to US markets. The northern climate created cultural resilience and outdoor recreation as defining traits. Indigenous land claims remain unresolved."
  },
  GB: {
    id: "GB",
    name: "United Kingdom",
    capital: "London",
    population: "67 Million",
    languages: ["English"],
    religion: "Christianity ~50%, Unaffiliated ~37%, Islam ~3.1%, Hinduism ~1.5%",
    coordinates: [51.5074, -0.1278],
    climate: {
      type: "Temperate Maritime",
      description: "Mild winters and cool summers moderated by Atlantic Gulf Stream; frequent rain.",
      temperatureRange: "0°C (winter) to 20°C (summer)",
      rainfallPattern: "Year-round precipitation; west coast wetter than east due to Atlantic moisture."
    },
    geography: {
      terrain: "Island archipelago; rolling hills, uplands (Scotland, Wales), lowlands (England), moorlands.",
      features: ["Thames River", "Scottish Highlands", "Peak District", "Lake District", "Cliffs of Dover"],
      biodiversityRating: "Moderate (Temperate and marine biodiversity)",
      ecosystems: ["Temperate deciduous forests", "Heathlands and moorlands", "Coastal wetlands", "Marine ecosystems"]
    },
    adaptation: {
      title: "Island Maritime Commerce & Naval Dominance",
      description: "Geographic isolation enabled naval supremacy and mercantile capitalism.",
      technologicalAdaptation: "Advanced shipbuilding, global trade networks, later industrialization."
    },
    anthropology: {
      migrationHistory: "Celtic, Roman, Anglo-Saxon, Viking, and Norman invasions. Colonial empire. Brexit reflects contemporary identity questions.",
      ethnicComposition: ["White British ~80%", "Asian ~8%", "Black ~3%", "Mixed ~3%", "Other ~6%"],
      ancientEmpires: ["Celtic tribes", "Roman Britain", "Anglo-Saxon kingdoms", "Norman England", "British Empire"],
      socialStructures: "Historically feudal; later parliamentary democracy. Class system remains culturally significant."
    },
    culture: {
      insights: ["Shakespeare and literary tradition", "Tea culture and afternoon tea", "Reserved politeness as cultural norm"],
      foodCulture: "Fish and chips, Sunday roast, Yorkshire pudding; modern multiculturalism adds Indian, Chinese influences.",
      culturalIdentity: "Reserve, tradition, heritage, and historical consciousness of empire."
    },
    economy: {
      overview: "Advanced post-industrial economy; financial services (London), technology, creative industries.",
      keyIndustries: ["Financial Services", "Technology", "Creative Industries", "Pharmaceuticals", "Education"],
      tradeLegacy: "Former imperial superpower; still significant global economic influence via finance and culture."
    },
    aiAnalysis: "Britain's island geography was transformative. Separated from European power struggles, Britain developed as a maritime trading civilization. This enabled a naval-industrial dominance that created the world's first truly global empire. The empire enriched Britain but deindustrialization in the late 20th century shifted it toward financial services. The vote to leave the EU reflects geographic insularity reasserting itself."
  },
  FR: {
    id: "FR",
    name: "France",
    capital: "Paris",
    population: "68 Million",
    languages: ["French"],
    religion: "Christianity ~60%, Unaffiliated ~32%, Islam ~5%",
    coordinates: [48.8566, 2.3522],
    climate: {
      type: "Temperate Mediterranean & Oceanic",
      description: "Mediterranean south, oceanic west, continental east. Generally mild winters and warm summers.",
      temperatureRange: "0°C (east/north winter) to 30°C (south summer)",
      rainfallPattern: "Variable; Mediterranean south dry in summer, Atlantic west year-round wet."
    },
    geography: {
      terrain: "Hexagonal landmass with Pyrenees, Alps, Massif Central, fertile plains.",
      features: ["Alps", "Pyrenees", "Loire River", "Rhone Valley", "Normandy Coast"],
      biodiversityRating: "High (Multiple climate zones and Mediterranean biodiversity)",
      ecosystems: ["Temperate deciduous forests", "Alpine meadows", "Mediterranean scrublands", "Wetlands"]
    },
    adaptation: {
      title: "Agricultural Optimization & Wine Culture",
      description: "Geographic and climatic diversity enabled sophisticated regional agricultural specialization.",
      technologicalAdaptation: "Terraced vineyards, cheese-making traditions tied to regional terroirs."
    },
    anthropology: {
      migrationHistory: "Celtic Gaul, Roman conquest, Frankish kingdom, feudal structure, Revolutionary transformation.",
      ethnicComposition: ["French ~92%", "Other European ~5%", "North African ~2%", "Sub-Saharan African ~1%"],
      ancientEmpires: ["Gaul (Celtic)", "Roman Gaul", "Frankish Kingdom", "France"],
      socialStructures: "Highly centralized state; revolutionary transformation created modern civil society concepts."
    },
    culture: {
      insights: ["Culinary tradition and gastronomy as central to identity", "Enlightenment intellectual legacy", "Art and fashion dominance"],
      foodCulture: "Sophisticated regional cuisines; wine, cheese, bread as cultural pillars. Haute cuisine tradition.",
      culturalIdentity: "Sophistication, rationalism, cultural refinement, and Revolutionary ideals of liberty."
    },
    economy: {
      overview: "Advanced economy; strong in agriculture, tourism, aerospace, luxury goods, pharmaceuticals.",
      keyIndustries: ["Tourism", "Agriculture", "Aerospace (Airbus)", "Luxury Goods", "Pharmaceuticals"],
      tradeLegacy: "Former imperial power; current strength in culture and soft power rather than hard power."
    },
    aiAnalysis: "France's geographic diversity created a fragmented medieval landscape unified by strong centralized states. The French Revolution represented a philosophical turn inward from imperial expansion toward abstract universal ideals. The country's geographic position as a crossroads created cultural synthesis. Today, France projects power through language, culture, and philosophy rather than military might."
  },
  DE: {
    id: "DE",
    name: "Germany",
    capital: "Berlin",
    population: "84 Million",
    languages: ["German"],
    religion: "Christianity ~56%, Unaffiliated ~38%, Islam ~5%",
    coordinates: [52.5200, 13.4050],
    climate: {
      type: "Temperate Continental",
      description: "Mild oceanic west transitions to cold continental east; snowy winters, warm summers.",
      temperatureRange: "-5°C (winter) to 25°C (summer)",
      rainfallPattern: "Year-round precipitation; west wetter, east drier."
    },
    geography: {
      terrain: "North German Plain, Central Highlands, Bavarian Alps in south.",
      features: ["Rhine River", "Danube River", "Bavarian Alps", "Black Forest", "Ruhr Valley"],
      biodiversityRating: "Moderate (Central European temperate forests)",
      ecosystems: ["Temperate deciduous forests", "Grasslands", "Alpine meadows", "Wetlands"]
    },
    adaptation: {
      title: "River Basin Integration & Industrial Organization",
      description: "Rhine and Danube river basins enabled trade and industrial development.",
      technologicalAdaptation: "Precision engineering, industrial organization, chemical industries."
    },
    anthropology: {
      migrationHistory: "Germanic tribes, Holy Roman Empire fragmentation, Prussian militarization, Nazi period, division/reunification.",
      ethnicComposition: ["German ~87%", "Turkish ~3%", "Polish ~2%", "Other European/Asian ~8%"],
      ancientEmpires: ["Germanic tribes", "Holy Roman Empire", "Prussia", "German Empire", "Nazi Germany", "East/West Germany", "Germany"],
      socialStructures: "Previously highly militarized and hierarchical; post-WWII emphasis on democracy and federalism."
    },
    culture: {
      insights: ["Engineering precision and craftsmanship", "Philosophy and intellectual tradition", "Beer culture and Oktoberfest"],
      foodCulture: "Sausages, pretzels, sauerkraut, beer; hearty meat-and-potato traditions.",
      culturalIdentity: "Work ethic, precision, intellectual rigor; complicated relationship with historical legacy."
    },
    economy: {
      overview: "Europe's largest economy; manufacturing powerhouse (cars, machinery), chemical, and pharmaceutical industries.",
      keyIndustries: ["Automotive", "Machinery and Engineering", "Chemicals and Pharmaceuticals", "Industrial Manufacturing"],
      tradeLegacy: "Industrial revolution drove rise to power; automotive and precision engineering define modern economy."
    },
    aiAnalysis: "Germany's position at Europe's crossroads created a contested space. The fragmentation of the Holy Roman Empire prevented early unification. Prussian militarization unified the north and created a militaristic state. Industrial development in the Ruhr Valley created economic power. Geographic centrality and power struggles led to two world wars. Post-war division and reunification create ongoing identity questions. Modern Germany represents Europe's industrial heart and intellectual tradition."
  },
  IT: {
    id: "IT",
    name: "Italy",
    capital: "Rome",
    population: "58 Million",
    languages: ["Italian"],
    religion: "Christianity ~87%, Unaffiliated ~10%, Islam ~1%",
    coordinates: [41.9028, 12.4964],
    climate: {
      type: "Mediterranean",
      description: "Hot, dry summers and mild winters; regional variation north to south.",
      temperatureRange: "-5°C (northern winter) to 35°C (southern summer)",
      rainfallPattern: "Mediterranean pattern; concentrated in winter/spring; very dry summers."
    },
    geography: {
      terrain: "Mountainous peninsula with northern Alps, central Apennines, island Sicily and Sardinia.",
      features: ["Alps", "Apennines", "Mount Vesuvius", "Po River", "Sicily", "Sardinia"],
      biodiversityRating: "High (Mediterranean biodiversity hotspot)",
      ecosystems: ["Mediterranean scrublands", "Deciduous forests", "Alpine meadows", "Coastal wetlands"]
    },
    adaptation: {
      title: "Mediterranean Terrace Agriculture & Maritime Trade",
      description: "Adapting to mountainous terrain and Mediterranean climate through terracing and naval trade.",
      technologicalAdaptation: "Terraced vineyards and olive groves; historical maritime city-states."
    },
    anthropology: {
      migrationHistory: "Greek colonization in south, Etruscan north, Roman unification, fragmentation, Renaissance, unification 1861.",
      ethnicComposition: ["Italian ~91%", "European ~5%", "North African ~2%", "Other ~2%"],
      ancientEmpires: ["Etruscan", "Roman Empire", "Italian City-States", "Papal States", "Italy"],
      socialStructures: "Strong regional identity (north vs south); family-centered society."
    },
    culture: {
      insights: ["Renaissance birthplace; art and design heritage", "Catholic tradition and Vatican influence", "Fashion and style leadership"],
      foodCulture: "Regionalized cuisine: northern risotto/butter, central wild boar/pecorino, southern pasta/olive oil. UNESCO heritage.",
      culturalIdentity: "Beauty, art, history, and dolce vita (sweet life) philosophy."
    },
    economy: {
      overview: "Advanced economy; strengths in fashion, design, tourism, manufacturing, and agriculture.",
      keyIndustries: ["Fashion and Luxury Goods", "Tourism", "Mechanical Engineering", "Automotive", "Agriculture"],
      tradeLegacy: "Medieval city-state commerce (Venice, Genoa); Renaissance artistic tradition; modern fashion industry."
    },
    aiAnalysis: "Italy's peninsula geography created fragmentation. The difficult alpine terrain prevented early unification; the Mediterranean coast enabled maritime city-states. Roman unification proved temporary. Medieval fragmentation into city-states fostered competition and creativity, leading to the Renaissance. Geographic fragmentation persists in north-south economic divide. Italy's strength lies in cultural production and design rather than raw industrial might."
  },
  RU: {
    id: "RU",
    name: "Russia",
    capital: "Moscow",
    population: "146 Million",
    languages: ["Russian"],
    religion: "Orthodox Christianity ~71%, Islam ~14%, Unaffiliated ~15%",
    coordinates: [55.7558, 37.6173],
    climate: {
      type: "Subarctic to Temperate Continental",
      description: "Vast territory with extreme continental climate; very cold winters, varying summers.",
      temperatureRange: "-50°C (Siberia) to 25°C (Moscow summer)",
      rainfallPattern: "Variable; east Siberia dry, west and Caucasus wetter."
    },
    geography: {
      terrain: "World's largest country; Ural Mountains divide Europe from Asia; vast Siberian plateaus.",
      features: ["Ural Mountains", "Siberia", "Caucasus Mountains", "Volga River", "Lake Baikal"],
      biodiversityRating: "Very High (Boreal forests, Arctic tundra, steppes)",
      ecosystems: ["Boreal forests (Taiga)", "Arctic tundra", "Steppes", "Temperate deciduous forests", "Mountain ecosystems"]
    },
    adaptation: {
      title: "Continental Conquest & Transcontinental Integration",
      description: "Adapting to vast scale and extreme cold through expansion and centralization.",
      technologicalAdaptation: "Trans-Siberian Railway, Arctic resource extraction, cold-weather engineering."
    },
    anthropology: {
      migrationHistory: "Slavic migrations from Central Asia, Viking traders (Varangians), Mongol conquest, Tsarist expansion, Soviet period, modern Russia.",
      ethnicComposition: ["Russian ~81%", "Tatar ~3.9%", "Ukrainian ~2.3%", "Other Slavic and Asian groups ~12%"],
      ancientEmpires: ["Kyivan Rus", "Mongol Khanate period", "Moscow Principality", "Russian Empire", "Soviet Union", "Russia"],
      socialStructures: "Historically highly centralized autocratic rule; Soviet period state dominance; post-Soviet oligarchy."
    },
    culture: {
      insights: ["Literature and philosophical tradition (Dostoevsky, Tolstoy)", "Balancing Western and Eastern cultural influences", "Complex relationship with authority"],
      foodCulture: "Rye bread, borscht, cabbage, potatoes, smoked fish; hearty preservation-based cuisine from long winters.",
      culturalIdentity: "Vast scale, power, depth, and struggle with modernization and global integration."
    },
    economy: {
      overview: "Natural resource economy; heavily dependent on oil and gas exports; declining post-Soviet.",
      keyIndustries: ["Oil and Gas Extraction", "Minerals and Metals", "Timber", "Military-Industrial Complex"],
      tradeLegacy: "Post-Soviet decline; current economy heavily sanctioned and dependent on resource extraction."
    },
    aiAnalysis: "Russia's vastness created both opportunity and constraint. The Trans-Siberian conquest gave Russia access to enormous resources but created an empire difficult to govern. The brutal continental climate demanded centralization and strong state apparatus. Geographic isolation from Western Europe fostered distinct Orthodox Christian civilization. The vast scale enabled Soviet industrialization but also inefficiency. Modern Russia struggles with transitioning from resource-based economy to diversified modern economy while managing imperial ambitions."
  },
  CN: {
    id: "CN",
    name: "China",
    capital: "Beijing",
    population: "1.43 Billion",
    languages: ["Mandarin Chinese (official)"],
    religion: "Officially atheist; Buddhism, Taoism, folk religion significant (~10-15%), Christianity ~5%",
    coordinates: [39.9042, 116.4074],
    climate: {
      type: "Diverse: Subtropical, Temperate, Subarctic",
      description: "Massive country with variation from tropical south to subarctic north, arid west to wet east.",
      temperatureRange: "-45°C (Manchuria) to 40°C (southern coast)",
      rainfallPattern: "Extreme variation; southeastern coast wet monsoon, western interior desert, northern plains seasonal."
    },
    geography: {
      terrain: "Mountainous west (Himalayas, Tibetan Plateau), river valleys center, plains east and north.",
      features: ["Himalayas", "Yangtze River", "Yellow River", "Gobi Desert", "Tibetan Plateau"],
      biodiversityRating: "Mega-diverse (17 megadiverse countries list)",
      ecosystems: ["Tropical rainforests (south)", "Deciduous forests", "Grasslands and steppes", "Alpine meadows", "Desert", "Wetlands"]
    },
    adaptation: {
      title: "River Basin Civilization & State Continuity",
      description: "Yellow and Yangtze River valleys created earliest sustained civilizations; continuity across millennia.",
      technologicalAdaptation: "Terrace agriculture, porcelain, silk production, state hydraulic systems."
    },
    anthropology: {
      migrationHistory: "Ancient civilizations in Yellow River valley; unified empire under Qin; continuous state through dynasties; Cultural Revolution disruption; modern market reforms.",
      ethnicComposition: ["Han Chinese ~92%", "Zhuang ~1.3%", "Hui ~0.8%", "Manchu ~0.7%", "Uyghur ~0.6%", "Other ethnic minorities ~4%"],
      ancientEmpires: ["Yellow River civilizations", "Xia", "Shang", "Zhou", "Qin", "Han", "Tang", "Song", "Yuan", "Ming", "Qing", "China"],
      socialStructures: "Confucian hierarchy historically; Communist period egalitarian rhetoric; modern authoritarian capitalism."
    },
    culture: {
      insights: ["Continuous written tradition spanning 3000+ years", "Philosophy (Confucianism, Taoism, Buddhism)", "Arts: calligraphy, painting, martial arts"],
      foodCulture: "Extremely regionalized; Cantonese dim sum, Sichuan spice, Beijing duck, regional rice/noodle traditions.",
      culturalIdentity: "Historical pride, civilizational continuity, modern national renaissance."
    },
    economy: {
      overview: "World's second-largest economy; manufacturing powerhouse, rapid tech sector growth, massive population market.",
      keyIndustries: ["Manufacturing and Assembly", "Technology", "Real Estate", "Agriculture", "Energy"],
      tradeLegacy: "Ancient Silk Road trade; 20th century extraction by imperial powers; 21st century manufacturing dominance."
    },
    aiAnalysis: "China's geography enabled the world's oldest continuous civilization. The Yellow and Yangtze Rivers created agricultural surplus allowing centralized state development. Geographic barriers (mountains, deserts) created a bounded civilization distinct from Europe. The 'Middle Kingdom' psychological identity stems from geographic isolation. Modern China's rise stems from its massive population base and manufacturing advantages. The party-state structure reflects millennia of centralized bureaucratic tradition adapted to modern communism-capitalism."
  },
  AU: {
    id: "AU",
    name: "Australia",
    capital: "Canberra",
    population: "26 Million",
    languages: ["English"],
    religion: "Christianity ~52%, Unaffiliated ~30%, Buddhism ~2%, Islam ~2.6%",
    coordinates: [-25.2744, 133.7751],
    climate: {
      type: "Diverse: Tropical, Desert, Mediterranean, Temperate",
      description: "Extremely variable; tropical north, vast arid interior, temperate south and east, Mediterranean southwest.",
      temperatureRange: "-10°C (Tasmania winter) to 50°C (inland summer)",
      rainfallPattern: "Most of interior is desert; coasts and south temperate receive regular rain."
    },
    geography: {
      terrain: "Vast, flat continent with limited mountain ranges; extensive deserts in interior; tropical northeast.",
      features: ["Great Barrier Reef", "Uluru (Ayers Rock)", "Great Dividing Range", "Sydney Harbour", "Tasmania"],
      biodiversityRating: "High (Unique marsupial and monotreme fauna; endemic species)",
      ecosystems: ["Tropical rainforests (far north)", "Dry eucalyptus forests and woodlands", "Grasslands and semi-arid scrubland", "Alpine meadows (Tasmania)", "Coral reef ecosystems"]
    },
    adaptation: {
      title: "Desert Survival & Island Isolation",
      description: "Adapting to world's driest inhabited continent through indigenous knowledge and modern technology.",
      technologicalAdaptation: "Bore wells, desalination, advanced agricultural irrigation, mining deep underground minerals."
    },
    anthropology: {
      migrationHistory: "Indigenous peoples for 65,000+ years (longest continuous culture). British penal colony 1788, immigration waves.",
      ethnicComposition: ["European ancestry ~72%", "Asian ~10%", "Aboriginal and Torres Strait Islander ~3%", "Other ~15%"],
      ancientEmpires: ["Aboriginal nations (pre-colonial)", "British colonial settlements", "Australia"],
      socialStructures: "Egalitarian frontier culture; indigenous dispossession and ongoing reconciliation."
    },
    culture: {
      insights: ["Laid-back, egalitarian ethos", "Strong outdoor/sports culture", "Aboriginal art and Dreamtime traditions"],
      foodCulture: "BBQ culture, meat pies, lamingtons (chocolate coconut cakes); Aboriginal bush tucker traditions.",
      culturalIdentity: "Frontier egalitarianism, outdoor lifestyle, unique nature, and unresolved indigenous relationships."
    },
    economy: {
      overview: "Developed economy; strong in mining, agriculture, tourism, education, and services.",
      keyIndustries: ["Mining (iron, coal, gold)", "Agriculture", "Tourism", "Education", "Financial Services"],
      tradeLegacy: "Colonial agricultural and pastoral economy; modern commodity exports and service economy."
    },
    aiAnalysis: "Australia is geographic isolation taken to extreme. The vast, dry interior prevented rapid European colonization beyond coasts. Indigenous peoples developed sustainable desert survival over 65,000 years. Modern Australia developed as a British colonial project importing European systems to an alien landscape. The continent's isolation created unique endemic fauna (kangaroos, koalas, platypuses) but also ecological fragility from invasive species. Australia's wealth comes from mining extracted from ancient geology rather than renewable resources, creating long-term sustainability questions."
  },
  NZ: {
    id: "NZ",
    name: "New Zealand",
    capital: "Wellington",
    population: "5 Million",
    languages: ["English", "Māori"],
    religion: "Christianity ~38%, Unaffiliated ~48%, Buddhism ~2%, Hinduism ~1%",
    coordinates: [-41.2865, 174.7762],
    climate: {
      type: "Temperate Oceanic",
      description: "Mild temperatures year-round; very high rainfall; four distinct seasons.",
      temperatureRange: "5°C (winter) to 20°C (summer)",
      rainfallPattern: "Very high precipitation especially on western slopes; moderate east side."
    },
    geography: {
      terrain: "Two main islands (North and South) with volcanic North Island and mountainous South Island.",
      features: ["Southern Alps", "Fjordland", "Bay of Islands", "Mount Cook", "Geysers (Rotorua)"],
      biodiversityRating: "High (Unique endemic birds and flora; limited native mammals)",
      ecosystems: ["Temperate rainforests", "Alpine meadows", "Fjord valleys", "Glacial landscapes", "Coastal forests"]
    },
    adaptation: {
      title: "Island Isolation & Volcanic Geology Management",
      description: "Adapting to isolated island environment and active volcanic zones.",
      technologicalAdaptation: "Geothermal energy utilization, seismic engineering, conservation of unique endemic species."
    },
    anthropology: {
      migrationHistory: "Polynesian settlement ~1280 CE. British colonization 1840. Māori land dispossession and ongoing Treaty of Waitangi negotiations.",
      ethnicComposition: ["New Zealand European (Pākehā) ~71%", "Māori ~17%", "Asian ~15%", "Pacific Islander ~9%", "Other ~2%"],
      ancientEmpires: ["Māori iwi (tribes)", "British colonial New Zealand", "Dominion of New Zealand", "New Zealand"],
      socialStructures: "Bicultural nation incorporating Māori and Pākehā; indigenous rights and language revitalization ongoing."
    },
    culture: {
      insights: ["Māori cultural renaissance", "Environmental conservation ethic", "Egalitarian 'tall poppy' culture"],
      foodCulture: "Hangi (earth oven cooking), meat pies, pavlova; Māori traditional foods (kaimoana - seafood).",
      culturalIdentity: "Progressive bicultural society; strong environmental stewardship; small-nation identity."
    },
    economy: {
      overview: "Developed economy; strengths in agriculture (dairy, sheep), tourism, forestry, and education.",
      keyIndustries: ["Dairy and Agriculture", "Tourism", "Forestry", "Film and Creative Industries", "Education"],
      tradeLegacy: "Colonial agricultural exports; modern services and tourism focus."
    },
    aiAnalysis: "New Zealand's isolation from any continent for 80 million years created unique fauna (only mammals were bats). Human arrival 700 years ago created Māori civilization. British colonization created bicultural tensions still being resolved. The small population and island isolation fostered egalitarian culture and progressive policies (women's suffrage first, Treaty settlements). Geographic remoteness from major markets drove creative independence and film industry success."
  },
};

export const countriesDataArray = Object.values(countriesData);
