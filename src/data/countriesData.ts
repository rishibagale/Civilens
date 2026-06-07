export interface KeyFigure {
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

export const countriesData: Record<string, CountryData> = {
  EG: {
      "id": "EG",
      "name": "Egypt",
      "capital": "Cairo",
      "population": "116 Million",
      "languages": [
          "Arabic (official)",
          "English",
          "French"
      ],
      "religion": "Islam (primarily Sunni) ~90%, Christian (primarily Coptic) ~10%",
      "coordinates": [
          26.8206,
          30.8025
      ],
      "climate": {
          "type": "Arid Desert",
          "description": "Hot, dry summers and moderate winters. Rainfall is extremely sparse, occurring mostly along the Mediterranean coast.",
          "temperatureRange": "14°C (winter night) to 40°C+ (summer day)",
          "rainfallPattern": "Less than 20mm annually in inland areas; up to 200mm on the northern coast."
      },
      "geography": {
          "terrain": "Vast desert plateau bisected by the fertile Nile River Valley and Delta.",
          "features": [
              "Nile River",
              "Sahara Desert",
              "Sinai Peninsula",
              "Suez Canal",
              "Qattara Depression"
          ],
          "biodiversityRating": "Low to Moderate (Highly concentrated in the Nile corridor)",
          "ecosystems": [
              "Hyper-arid desert dunes",
              "Riverine wetlands",
              "Mangrove estuaries (Red Sea)",
              "Coral reefs"
          ]
      },
      "adaptation": {
          "title": "Nilotic Riverine Hydrology & Desert Oasis Systems",
          "description": "Survival in Egypt required managing the annual flooding of the Nile and creating localized irrigation systems to farm the desert's edge.",
          "physiologicalAdaptation": "Generations of farmers developed resistance to heat-related stress and water-borne pathogens common in standing canal irrigation systems.",
          "technologicalAdaptation": "Ancient Basin Irrigation (directing floodwaters using earthen dykes) evolved into modern perennial irrigation with the construction of the Aswan High Dam."
      },
      "anthropology": {
          "migrationHistory": "A key land bridge between Africa, Asia, and Europe. Populated by early hominids out of Africa, later experiencing Arab conquests, Ottoman rule, and European colonial encounters.",
          "ethnicComposition": [
              "Egyptian ~99%",
              "Nubian, Bedouin, Beja, Berber ~1%"
          ],
          "ancientEmpires": [
              "Early Dynastic Egypt",
              "New Kingdom Empire",
              "Ptolemaic Kingdom",
              "Fatimid Caliphate",
              "Mamluk Sultanate"
          ],
          "socialStructures": "Historically highly centralized and hierarchical, driven by the need for cooperative labor to manage Nile irrigation (what Karl Wittfogel termed a 'hydraulic empire')."
      },
      "culture": {
          "insights": [
              "A cultural synthesis of Pharaonic heritage, Islamic traditions, and modern Arab nationalism.",
              "Deep respect for the cycle of water and seasons, historically linked to the afterlife and cosmic order.",
              "Strong collective community bonds rooted in agrarian farming villages (Fellaheen)."
          ],
          "foodCulture": "Heavy reliance on legumes, vegetables, and grains. National dishes include Koshary (lentils, rice, pasta) and Ful Medames (slow-cooked fava beans). Flatbread (Eish Baladi, literally 'life bread') is a daily staple.",
          "culturalIdentity": "Known as 'Umm al-Dunya' (Mother of the World), reflecting its position as a cradle of human civilization."
      },
      "economy": {
          "overview": "A diversified economy relying on services, agriculture, tourism, and Suez Canal shipping transit tariffs.",
          "keyIndustries": [
              "Petroleum and Natural Gas",
              "Tourism",
              "Suez Canal Shipping Services",
              "Textiles (Egyptian Cotton)"
          ],
          "tradeLegacy": "The ancient crossroad of the Incense and Spice Routes connecting East Africa, India, and the Mediterranean basin."
      },
      "aiAnalysis": "Egypt represents the archetype of a hydraulic civilization. Without the Nile, the region would be uninhabitable. The strict geographic boundaries of the Nile Valley compressed the population, fostering an early need for writing, centralized tax systems, and calendar technology. This high concentration of population allowed for massive labor mobilization (pyramids, canals) but also left the state vulnerable to climate variations that disrupted Nile flows, causing dynastic collapses throughout history."
  },
  JP: {
      "id": "JP",
      "name": "Japan",
      "capital": "Tokyo",
      "population": "123 Million",
      "languages": [
          "Japanese"
      ],
      "religion": "Shintoism and Buddhism syncretism ~80%, Christianity ~1.5%",
      "coordinates": [
          36.2048,
          138.2529
      ],
      "climate": {
          "type": "Temperate Maritime",
          "description": "Four distinct seasons with humid summers, snow-heavy winters in the north and west, and mild conditions in the south.",
          "temperatureRange": "-5°C (Hokkaido winter) to 35°C (Tokyo summer)",
          "rainfallPattern": "Heavy precipitation, particularly during the summer monsoon (Tsuyu) and autumn typhoons."
      },
      "geography": {
          "terrain": "Volcanic, mountainous archipelago (~73% mountainous terrain) with narrow, highly populated coastal plains.",
          "features": [
              "Mount Fuji",
              "Japanese Alps",
              "Kanto Plain",
              "Shinano River",
              "Ryukyu Islands"
          ],
          "biodiversityRating": "High (Temperate forest and marine biodiversity)",
          "ecosystems": [
              "Deciduous and coniferous mountain forests",
              "Subtropical rainforests (Okinawa)",
              "Deep-sea trenches",
              "Volcanic thermal vents"
          ]
      },
      "adaptation": {
          "title": "Volcanic Risk Mitigation & Terraced Agrosystems",
          "description": "Adapting to active volcanoes, frequent earthquakes, tsunamis, and lack of flat arable land.",
          "physiologicalAdaptation": "Cultural and psychological adaptations to high-density living, including spatial awareness and heightened community cooperation.",
          "technologicalAdaptation": "Seismic-resistant engineering (pioneered in ancient pagodas with central pillars called shinbashira), terraced rice paddies to maximize mountain slopes, and advanced early warning networks."
      },
      "anthropology": {
          "migrationHistory": "Populated by the Jomon hunter-gatherers, followed by the Yayoi wet-rice farmers from mainland Asia. The country underwent long periods of isolation (Sakoku) under the Tokugawa Shogunate.",
          "ethnicComposition": [
              "Japanese 97.9%",
              "Korean 0.5%",
              "Chinese 0.6%",
              "Ainu and Ryukyu minorities"
          ],
          "ancientEmpires": [
              "Yamato Dynasty",
              "Kamakura Shogunate",
              "Muromachi Shogunate",
              "Tokugawa Shogunate",
              "Empire of Japan"
          ],
          "socialStructures": "Characterized by strong group cohesion, collective accountability (Giri), and respect for hierarchy, derived from historical samurai structures and collaborative rice cultivation."
      },
      "culture": {
          "insights": [
              "Aesthetic appreciation of impermanence ('Mono no Aware') and natural imperfection ('Wabi-Sabi'), influenced by earthquakes.",
              "Harmonious integration of nature and synthetic interfaces.",
              "Shinto belief in animism, where spirits (Kami) inhabit rivers, trees, and mountains."
          ],
          "foodCulture": "Based on rice, seasonal vegetables, and marine proteins. Heavy emphasis on preservation and presentation (Sushi, Sashimi, Miso, Tempura). A rich tea culture centered on Matcha.",
          "culturalIdentity": "An intense synthesis of ancient ritualism and high-tech futurism."
      },
      "economy": {
          "overview": "High-tech powerhouse focusing on advanced manufacturing, electronics, automotive engineering, and financial services.",
          "keyIndustries": [
              "Automotive Engineering",
              "Robotics and Automation",
              "Consumer Electronics",
              "Precision Machinery"
          ],
          "tradeLegacy": "Transitioned from isolation to a maritime trading empire, exporting advanced cultural and industrial goods globally."
      },
      "aiAnalysis": "Japan's civilization was molded by its island geography and geological volatility. The ring of fire forged a collective consciousness highly attuned to natural disasters, leading to an aesthetic that values the beauty of fleeting moments. The extreme mountain terrain left only small coastal pockets for agriculture, forcing intense cooperation for water management and rice distribution. This localized collaboration, reinforced during centuries of political isolation, translated directly into Japan's highly organized corporate structures and precision engineering capabilities in the modern era."
  },
  IS: {
      "id": "IS",
      "name": "Iceland",
      "capital": "Reykjavik",
      "population": "390,000",
      "languages": [
          "Icelandic"
      ],
      "religion": "Evangelical Lutheran Church of Iceland ~60%, Other Christian ~15%, Heathenry (Asatru) ~1.5%",
      "coordinates": [
          64.9631,
          -19.0208
      ],
      "climate": {
          "type": "Subpolar Oceanic / Tundra",
          "description": "Cold and windy, mitigated by the warm North Atlantic Current. Cool summers and relatively mild winters for its latitude.",
          "temperatureRange": "-10°C (highlands winter) to 15°C (coastal summer)",
          "rainfallPattern": "Frequent rain, sleet, and snow, varying from 400mm in the north to 2000mm in the south."
      },
      "geography": {
          "terrain": "Volcanic plateau with active hot springs, geysers, vast lava fields, glaciers, and deep fjords along the coast.",
          "features": [
              "Vatnajökull Glacier",
              "Gullfoss Waterfall",
              "Blue Lagoon",
              "Mount Hekla",
              "Geysir Geothermal Area"
          ],
          "biodiversityRating": "Low (Very few native terrestrial mammals, but rich marine and bird life)",
          "ecosystems": [
              "Subarctic tundra",
              "Glacial rivers",
              "Fjord estuaries",
              "Geothermal hot springs",
              "Basalt lava deserts"
          ]
      },
      "adaptation": {
          "title": "Geothermal Harnessing & Extreme Subarctic Survival",
          "description": "Surviving in a landscape of volcanic eruptions and dark subarctic winters using thermal energy and unique preservation styles.",
          "physiologicalAdaptation": "Enhanced metabolic tolerance to cold and long winter darkness (low sunlight adaptation).",
          "technologicalAdaptation": "Historical turf houses (insulating against freezing winds with sod and grass) replaced by modern geothermal district heating networks, powering 90%+ of all homes and greenhouses."
      },
      "anthropology": {
          "migrationHistory": "Settled in the late 9th century by Norse Vikings and Celtic slaves. Isolated for centuries, maintaining an exceptionally pure linguistic lineage and genetic profile.",
          "ethnicComposition": [
              "Icelandic ~86%",
              "Polish ~6%",
              "Other European/Asian ~8%"
          ],
          "ancientEmpires": [
              "Althing (Early Commonwealth)",
              "Norwegian Rule",
              "Danish Kingdom"
          ],
          "socialStructures": "Egalitarian social structure with a historic lack of feudalism. Decisions were traditionally made collectively at the Althing, the world's oldest surviving parliament (est. 930 CE)."
      },
      "culture": {
          "insights": [
              "A nation of storytellers, with a literary tradition stretching back to the 12th-century Icelandic Sagas.",
              "Deep respect for folklore, including the belief in Huldufólk (hidden people / elves) inhabiting volcanic rock formations.",
              "Strong cultural emphasis on independence, resilience, and literary creation."
          ],
          "foodCulture": "Traditionally centered on preservation due to short growing seasons: fermentation, pickling, and smoking. Specialties include Hákarl (fermented shark), Skyr (thick dairy product), and fresh lamb/Atlantic cod.",
          "culturalIdentity": "The Land of Fire and Ice, defined by a culture that blends rugged survivalism with an active creative society."
      },
      "economy": {
          "overview": "A highly developed economy based on fisheries, renewable energy, tourism, and aluminum smelting.",
          "keyIndustries": [
              "Commercial Fishing and Fish Processing",
              "Eco-Tourism",
              "Geothermal & Hydroelectric Power Generation",
              "Tech & Software Startups"
          ],
          "tradeLegacy": "Historically reliant on exporting cod and wool to mainland Europe in exchange for wood and grain."
      },
      "aiAnalysis": "Iceland presents a unique study of human adaptation to absolute isolation. The settlers encountered an ecosystem with no trees (which they quickly depleted for firewood and boats) and high volcanic instability, requiring them to invent turf-based architecture to survive the winters. The extreme environment limited the carrying capacity of the land, keeping the population small and preventing the development of a complex hierarchy. This flat social structure, paired with a long dark winter that encouraged indoor storytelling, created a highly literate, egalitarian society that today leads in green energy technology and cultural output."
  },
  IN: {
      "id": "IN",
      "name": "India",
      "capital": "New Delhi",
      "population": "1.43 Billion",
      "languages": [
          "Hindi (official)",
          "English",
          "Bengali",
          "Telugu",
          "Marathi",
          "Tamil",
          "Urdu",
          "22 Scheduled Languages"
      ],
      "religion": "Hinduism ~79.8%, Islam ~14.2%, Christianity ~2.3%, Sikhism ~1.7%, Buddhism ~0.7%, Jainism ~0.4%",
      "coordinates": [
          20.5937,
          78.9629
      ],
      "climate": {
          "type": "Tropical Monsoon & Diverse Regional Climates",
          "description": "Varies from alpine tundra in the Himalayas to tropical wet in the south and arid desert in the west. Dominated by the seasonal monsoon winds.",
          "temperatureRange": "-10°C (Himalayan winter) to 48°C (Thar Desert summer)",
          "rainfallPattern": "Extremely seasonal. The southwest monsoon (June-September) delivers 80% of the country's annual rainfall."
      },
      "geography": {
          "terrain": "High mountain ranges in the north, fertile Indo-Gangetic plains, central dry plateau, and long coastal strips.",
          "features": [
              "Himalayas",
              "Ganges River",
              "Deccan Plateau",
              "Thar Desert",
              "Western Ghats"
          ],
          "biodiversityRating": "Mega-diverse (One of the top 17 mega-diverse countries)",
          "ecosystems": [
              "Alpine meadows",
              "Alluvial grasslands",
              "Tropical rainforests",
              "Dry deciduous forests",
              "Thar desert scrub",
              "Sundarbans mangrove delta"
          ]
      },
      "adaptation": {
          "title": "Stepwell Hydrology & Monsoon Crop Rotation",
          "description": "Managing severe dry seasons followed by massive monsoons through water conservation architecture and agrarian calendars.",
          "physiologicalAdaptation": "High heat-tolerance and physiological efficiency in processing a plant-based diet in hot conditions.",
          "technologicalAdaptation": "Construction of thousands of elaborate stepwells (Baoris) to store rainwater deep underground, and advanced drainage systems in the ancient Indus Valley cities."
      },
      "anthropology": {
          "migrationHistory": "A crucial crossroads of global human migration. Home to the ancient Indus Valley Civilization. Experiencing migrations of Indo-Aryans, Greco-Bactrians, Islamic dynasties, and British colonial rule.",
          "ethnicComposition": [
              "Indo-Aryan ~72%",
              "Dravidian ~25%",
              "Austroasiatic and Tibeto-Burman ~3%"
          ],
          "ancientEmpires": [
              "Indus Valley Civilization",
              "Maurya Empire",
              "Gupta Empire",
              "Chola Dynasty",
              "Mughal Empire",
              "Maratha Confederacy"
          ],
          "socialStructures": "Historically characterized by highly structured, localized village systems and the complex, controversial caste (Varna/Jati) social system, which originally coordinated labor specialization."
      },
      "culture": {
          "insights": [
              "A highly pluralistic civilization with continuous traditions dating back over 5000 years.",
              "Concepts of Dharma (cosmic order/duty) and Karma (cause and effect) are deeply woven into daily life.",
              "Artistic expressions include intricate temple architecture, classical dance forms (Bharatanatyam), and epic literature (Ramayana, Mahabharata)."
          ],
          "foodCulture": "Extremely regional, characterized by sophisticated spice blends (Garam Masala, Turmeric). High rate of vegetarianism. Staple foods include rice in the south/east, wheat flatbreads (Roti, Naan) in the north, and lentils (Dal) nationwide.",
          "culturalIdentity": "A vibrant mosaic of languages, festivals (Diwali, Holi), clothing (Sari, Dhoti), and philosophies."
      },
      "economy": {
          "overview": "A fast-growing major economy transitioning from agriculture to a major services, software, manufacturing, and pharmaceutical hub.",
          "keyIndustries": [
              "Information Technology & Software Services",
              "Pharmaceuticals & Biotechnology",
              "Textiles and Apparel",
              "Heavy Manufacturing & Agriculture"
          ],
          "tradeLegacy": "The anchor of the Silk Road and Indian Ocean trade networks, exporting spices, textiles (muslin, calico), and gemstones for millennia."
      },
      "aiAnalysis": "India's civilization is fundamentally tied to the monsoon cycle. The predictability yet volatility of the rains created a culture focused on cycles, time, and cosmic scales, influencing Indian mathematics, philosophy, and religion. The fertile alluvial plains of the Ganges allowed for massive population densities, fostering rich linguistic and cultural diversity rather than a single homogeneous state. Its geographical boundary of the Himalayas acted as a wall, isolating it enough to develop a distinct civilizational identity, while the passes in the northwest and its open oceans ensured constant, rich cultural infusions."
  },
  BR: {
      "id": "BR",
      "name": "Brazil",
      "capital": "Brasilia",
      "population": "215 Million",
      "languages": [
          "Portuguese (official)"
      ],
      "religion": "Roman Catholicism ~64.6%, Protestantism ~22.2%, Spiritism ~2%, Candomblé/Umbanda ~0.3%",
      "coordinates": [
          -14.235,
          -51.9253
      ],
      "climate": {
          "type": "Tropical and Subtropical",
          "description": "Mostly hot and humid, with tropical wet and dry seasons. The southern regions transition into temperate climates with cold winters.",
          "temperatureRange": "10°C (southern winter frost) to 40°C (Amazon summer)",
          "rainfallPattern": "Very high rainfall in the Amazon basin (exceeding 3000mm annually), while the northeast semi-arid region (Sertão) experiences severe droughts."
      },
      "geography": {
          "terrain": "Extensive plains, low hills, and plateaus, dominated by the massive Amazon River Basin and the Guiana Highlands.",
          "features": [
              "Amazon River",
              "Pantanal Wetlands",
              "Cerrado Savannah",
              "Atlantic Forest",
              "Brazilian Highlands"
          ],
          "biodiversityRating": "Hyper-diverse (Holds the highest biodiversity of any nation on Earth)",
          "ecosystems": [
              "Amazon rainforest",
              "Flooded savannah (Pantanal)",
              "Wooded grasslands (Cerrado)",
              "Semi-arid thorn forest (Caatinga)",
              "Atlantic coastal forest"
          ]
      },
      "adaptation": {
          "title": "Rainforest Silviculture & Agro-ecological Adaptations",
          "description": "Indigenous tribes adapted to live inside the Amazon without destroying it, using terra preta soil, while modern populations manage soil acidity in the Cerrado.",
          "physiologicalAdaptation": "Indigenous populations evolved immunities and genetic adaptations to humid tropical climates and forest pathogens.",
          "technologicalAdaptation": "Ancient creation of 'Terra Preta' (highly fertile, human-made dark earth created by adding charcoal, bone, and manure to nutrient-poor forest soils) and modern agricultural engineering to fertilize the acid-heavy Cerrado savannah."
      },
      "anthropology": {
          "migrationHistory": "Inhabited by hundreds of nomadic and semi-nomadic indigenous tribes (Tupi, Guarani). Colonized by the Portuguese in 1500, followed by the largest forced migration of enslaved Africans in history, and later massive waves of Italian, German, Japanese, and Middle Eastern immigrants.",
          "ethnicComposition": [
              "White ~47.7%",
              "Mixed (Pardo) ~43.1%",
              "Black ~7.6%",
              "East Asian ~1.1%",
              "Indigenous ~0.5%"
          ],
          "ancientEmpires": [
              "Kingdom/Empire of Brazil (1822–1889)"
          ],
          "socialStructures": "Complex, highly syncresized social structure. Highly urbanized coastal populations juxtaposed with isolated indigenous territories in the interior."
      },
      "culture": {
          "insights": [
              "A highly syncretic society blending Portuguese institutions, West African music, dance, and spiritualism, and Indigenous land practices.",
              "Deep cultural devotion to public festivities, most famously Carnaval, showcasing regional samba and axé rhythms.",
              "Candomblé and Umbanda represent unique Afro-Brazilian syncretic religions combining Catholic saints with African Orixás."
          ],
          "foodCulture": "Based on cassava, beans, rice, and meat. The national dish is Feijoada (a rich black bean stew with pork and beef). In the south, Churrasco (barbecue) dominates, while northeastern cuisine features Acarajé (black-eyed pea fritters fried in dende palm oil).",
          "culturalIdentity": "Defined by 'Jeitinho Brasileiro' (the Brazilian way of finding creative, informal solutions to problems) and a joyful, expressive lifestyle."
      },
      "economy": {
          "overview": "A major global economy driven by vast agricultural exports, mining, manufacturing, and aerospace.",
          "keyIndustries": [
              "Agribusiness (Soy, Beef, Sugar, Coffee)",
              "Iron Ore and Oil Extraction",
              "Aerospace Manufacturing (Embraer)",
              "Biofuels (Ethanol)"
          ],
          "tradeLegacy": "Shaped by colonial commodity cycles (Brazilwood, Sugar, Gold, Rubber, Coffee) which dictated domestic infrastructure and migration paths."
      },
      "aiAnalysis": "Brazil represents an ecological superpower. Its developmental history is a story of human interaction with massive, complex forest and savannah systems. The Amazon rainforest acted as an internal ocean, preventing centralization and fostering diverse, sustainable indigenous micro-societies. The modern state's expansion into the interior required massive infrastructure projects (like building the capital Brasilia in the geographic center) and scientific agricultural breakthroughs to turn the infertile Cerrado savannah into a global breadbasket, showcasing how technological adaptation can unlock previously unproductive climates."
  },
  NO: {
      "id": "NO",
      "name": "Norway",
      "capital": "Oslo",
      "population": "5.5 Million",
      "languages": [
          "Norwegian (Bokmål and Nynorsk)",
          "Sámi (regional)"
      ],
      "religion": "Church of Norway (Lutheran) ~67.5%, Other Christian ~7%, Islam ~3.4%, Humanism ~2%",
      "coordinates": [
          60.472,
          8.4689
      ],
      "climate": {
          "type": "Temperate Maritime & Subarctic Tundra",
          "description": "Mitigated by the Gulf Stream, the coast remains ice-free, but inland areas experience extreme, snowy subarctic winters. Cool summers.",
          "temperatureRange": "-15°C (inland winter) to 22°C (Oslo summer)",
          "rainfallPattern": "Heavy precipitation along the western coast (up to 3000mm in Bergen due to orographic lift), drier in the interior rain shadows."
      },
      "geography": {
          "terrain": "Extremely rugged, mountainous coastline carved by glaciers, forming thousands of deep fjords, islands, and waterfalls.",
          "features": [
              "Sognefjord",
              "Jotunheimen Mountains",
              "Lofoten Islands",
              "Hardangervidda Plateau",
              "Glama River"
          ],
          "biodiversityRating": "Moderate (Well-adapted boreal and marine ecosystems)",
          "ecosystems": [
              "Glacial mountain plateaus",
              "Boreal coniferous forests",
              "Cold-water coral reefs",
              "Deep fjord trenches"
          ]
      },
      "adaptation": {
          "title": "Fjord Navigation & Boreal Resource Management",
          "description": "Utilizing deep sea access to offset poor agricultural land and surviving cold dark winters via seasonal energy storage and building styles.",
          "physiologicalAdaptation": "High density of genetic adaptations to low sunlight (vitamin D synthesis efficiency) and tolerance to cold.",
          "technologicalAdaptation": "Ancient mastery of maritime clinker shipbuilding (Viking longships) which transformed fjords from barriers into highways, and modern hydro-electric and offshore deepwater drilling technologies."
      },
      "anthropology": {
          "migrationHistory": "Inhabited by hunter-gatherers following the melting glaciers of the last Ice Age. Home to the Sámi people in the north. Norse Viking clans expanded across Europe in the 8th-11th centuries.",
          "ethnicComposition": [
              "Norwegian ~81.5%",
              "Other European ~12%",
              "Asian, African, American ~6.5%",
              "Sámi indigenous minority"
          ],
          "ancientEmpires": [
              "Norse Earldoms",
              "Kingdom of Norway (1030–1397)",
              "Kalmar Union",
              "Denmark-Norway Union",
              "Sweden-Norway Union"
          ],
          "socialStructures": "Highly egalitarian, shaped by historically isolated farming/fishing communities that required mutual cooperation to survive winter. This evolved into the modern Nordic Social Model."
      },
      "culture": {
          "insights": [
              "Strong cultural concept of 'Friluftsliv' (free-air life), representing a deep philosophical connection to outdoor activity regardless of weather.",
              "'Dugnad' — a community-wide tradition of unpaid cooperative voluntary work to help neighbors or improve public spaces.",
              "Deep history of woodworking, visible in the 800-year-old wooden stave churches (Stavkirke)."
          ],
          "foodCulture": "Heavy focus on preserved seafood, game, and dairy. Staples include smoked salmon, Rakfisk (fermented trout), Brunost (sweet brown whey cheese), and Lefse (potato flatbread).",
          "culturalIdentity": "Minimalist, nature-focused, and community-oriented, valuing equality, modesty (Law of Jante), and environmental stewardship."
      },
      "economy": {
          "overview": "High-income welfare state powered by offshore petroleum, maritime shipping, aquaculture, and green energy.",
          "keyIndustries": [
              "Offshore Oil and Gas",
              "Hydroelectric Power Generation",
              "Commercial Fisheries and Aquaculture",
              "Maritime Shipping & Hydropower Engineering"
          ],
          "tradeLegacy": "Viking-era maritime trade networks developed into one of the world's largest modern shipping and seafood exporting operations."
      },
      "aiAnalysis": "Norway is a masterclass in using maritime technology to conquer rugged terrain. The inland mountains and glaciers are so impassable that land travel was virtually impossible for most of history; the sea-filled fjords became the primary highways. This dependency on the ocean forged a maritime culture that led to the Viking expansions and, centuries later, enabled Norway to become an expert in offshore drilling and aquaculture. The harsh climate also prevented massive feudal estates, leaving land in the hands of independent farmers and fishermen, which laid the foundation for the high trust, low hierarchy society seen today."
  },
  US: {
      "id": "US",
      "name": "United States",
      "capital": "Washington, D.C.",
      "population": "331 Million",
      "languages": [
          "English"
      ],
      "religion": "Christianity ~65%, Unaffiliated ~23%, Judaism ~1.9%, Islam ~1.1%",
      "coordinates": [
          38.8951,
          -77.0369
      ],
      "climate": {
          "type": "Diverse (Subtropical, Mediterranean, Arid, Temperate)",
          "description": "Extremely varied climate zones from tropical Florida to arctic Alaska, Mediterranean California to humid Eastern seaboard.",
          "temperatureRange": "-60°C (Alaska) to 57°C (Death Valley)",
          "rainfallPattern": "Highly regional: Pacific Northwest wet, Southwest arid, South humid subtropical"
      },
      "geography": {
          "terrain": "Vast continental landmass with Great Plains, Rocky Mountains, Appalachians, and coastal plains.",
          "features": [
              "Rocky Mountains",
              "Mississippi River",
              "Grand Canyon",
              "Great Lakes",
              "Appalachian Mountains"
          ],
          "biodiversityRating": "High (Megadiverse continent spanning multiple ecosystems)",
          "ecosystems": [
              "Temperate deciduous forests",
              "Great Plains grasslands",
              "Desert ecosystems",
              "Boreal forests",
              "Wetlands and swamps"
          ]
      },
      "adaptation": {
          "title": "Continental Scale Land Utilization & Mobility Innovation",
          "description": "Adapting to vast distances and varied climates through technological innovation.",
          "technologicalAdaptation": "Automobile culture, transcontinental railways, interstate highway system enabling rapid resource distribution across continental scales."
      },
      "anthropology": {
          "migrationHistory": "Populated by indigenous peoples for 15,000+ years. European colonization from 1600s, slavery-driven agricultural development, mass immigration waves.",
          "ethnicComposition": [
              "White ~60%",
              "Hispanic/Latino ~18%",
              "African American ~12%",
              "Asian ~6%",
              "Native American ~2%",
              "Other ~2%"
          ],
          "ancientEmpires": [
              "Pre-Columbian civilizations (Ancestral Puebloans, Mississippian, Iroquois Confederacy)",
              "United States of America"
          ],
          "socialStructures": "Highly individualistic, capitalist, federal system with strong regional variation."
      },
      "culture": {
          "insights": [
              "Emphasis on innovation and entrepreneurship",
              "Cultural exports dominate global entertainment",
              "Multicultural fusion as defining characteristic"
          ],
          "foodCulture": "Highly diverse and globalized: BBQ, fast food culture, regional specialties (Cajun, Tex-Mex, Southern comfort food).",
          "culturalIdentity": "Defined by frontier spirit, innovation, diversity, and global cultural influence."
      },
      "economy": {
          "overview": "World's largest economy; diversified across finance, technology, energy, and services.",
          "keyIndustries": [
              "Technology and Software",
              "Finance and Banking",
              "Energy",
              "Aerospace and Defense",
              "Entertainment"
          ],
          "tradeLegacy": "Industrial powerhouse; current global financial and technological hegemon."
      },
      "aiAnalysis": "The US geography enabled the development of a continental superpower. The Atlantic barrier, vast interior, and diverse climates created a nation-scale laboratory for capitalism. The frontier mythology (despite its costs) drove innovation and risk-taking. The combination of immigrant diversity, resource abundance, and technological innovation created the world's dominant 20th-21st century power."
  },
  MX: {
      "id": "MX",
      "name": "Mexico",
      "capital": "Mexico City",
      "population": "128 Million",
      "languages": [
          "Spanish (official)"
      ],
      "religion": "Roman Catholicism ~82%, Protestantism ~9%, Unaffiliated ~6%",
      "coordinates": [
          19.4326,
          -99.1332
      ],
      "climate": {
          "type": "Tropical and Temperate Mountain",
          "description": "Mountainous terrain creates distinct climate zones with tropical coasts and temperate highlands.",
          "temperatureRange": "5°C (highlands winter) to 40°C (coasts summer)",
          "rainfallPattern": "Seasonal monsoon with wet summers; variation from wet coasts to arid interior."
      },
      "geography": {
          "terrain": "Mountainous tableland flanked by coastal plains and tropical jungles.",
          "features": [
              "Sierra Madre ranges",
              "Mexico City Basin",
              "Yucatan Peninsula",
              "Pacific Coast",
              "Chiapas Highlands"
          ],
          "biodiversityRating": "Mega-diverse (17 of 17 megadiverse countries)",
          "ecosystems": [
              "Tropical rainforests",
              "Deciduous forests",
              "Cloud forests",
              "Deserts",
              "Mangrove wetlands"
          ]
      },
      "adaptation": {
          "title": "Mountain Terrace Agriculture & Altitude Adaptation",
          "description": "Adapting to extreme elevation variations and seismic activity.",
          "technologicalAdaptation": "Pre-Columbian terraced agriculture on steep slopes; modern seismic building codes."
      },
      "anthropology": {
          "migrationHistory": "Home to sophisticated pre-Columbian civilizations (Aztec, Maya). Spanish conquest created mestizo society.",
          "ethnicComposition": [
              "Mestizo ~62%",
              "European ~12%",
              "Indigenous ~10%",
              "Other ~16%"
          ],
          "ancientEmpires": [
              "Aztec Empire",
              "Maya Civilization",
              "Spanish New Spain",
              "Mexico"
          ],
          "socialStructures": "Hierarchical colonial legacy mixed with indigenous community structures."
      },
      "culture": {
          "insights": [
              "Rich pre-Columbian heritage intertwined with Spanish Catholicism",
              "Day of Dead (Día de Muertos) as defining cultural expression",
              "Powerful artistic tradition (Muralism, Frida Kahlo)"
          ],
          "foodCulture": "Complex, UNESCO-recognized. Mole, tamales, street tacos, chile peppers as cultural cornerstone.",
          "culturalIdentity": "Ancient roots meeting modern vibrancy; spiritual connection to death and life cycles."
      },
      "economy": {
          "overview": "Mixed emerging market; USMCA (NAFTA) integration drives manufacturing and trade.",
          "keyIndustries": [
              "Manufacturing",
              "Petroleum",
              "Tourism",
              "Agriculture"
          ],
          "tradeLegacy": "Gateway between Pacific and Atlantic trade; silver mining wealth."
      },
      "aiAnalysis": "Mexico's civilization was built on mountains. The Aztec built Tenochtitlan on an island in Lake Texcoco, creating an engineering marvel. The difficult terrain allowed for isolated pre-Columbian empires but also left them vulnerable to Spanish conquest from coastal beachheads. Modern Mexico struggles with the legacy of colonial exploitation and geographic barriers (northern deserts, southern jungles) that create regional inequality and provide routes for illicit trade."
  },
  CA: {
      "id": "CA",
      "name": "Canada",
      "capital": "Ottawa",
      "population": "38 Million",
      "languages": [
          "English",
          "French"
      ],
      "religion": "Christianity ~55%, Unaffiliated ~27%, Islam ~3.2%, Judaism ~1%",
      "coordinates": [
          45.4215,
          -75.6972
      ],
      "climate": {
          "type": "Subarctic and Temperate Maritime",
          "description": "Vast country ranging from arctic tundra to temperate Pacific coast; dominated by cold winters.",
          "temperatureRange": "-50°C (Northern territories) to 35°C (Southern summer)",
          "rainfallPattern": "Highly variable; west coast very wet, prairie dry, east receives moderate precipitation."
      },
      "geography": {
          "terrain": "Shield (ancient Precambrian rock), prairie plains, mountains (Rockies), and Arctic islands.",
          "features": [
              "Canadian Shield",
              "Rocky Mountains",
              "Niagara Falls",
              "Great Lakes (shared)",
              "Arctic tundra"
          ],
          "biodiversityRating": "High (Boreal and temperate ecosystems, Arctic fauna)",
          "ecosystems": [
              "Boreal forests",
              "Grasslands",
              "Arctic tundra",
              "Temperate rainforests",
              "Freshwater lakes and rivers"
          ]
      },
      "adaptation": {
          "title": "Arctic Survival & Northern Resource Extraction",
          "description": "Adapting to extreme cold, vast distances, and harsh northern environment.",
          "technologicalAdaptation": "Advanced heating systems, snowmobile transportation, expertise in resource extraction in permafrost."
      },
      "anthropology": {
          "migrationHistory": "Populated by Indigenous peoples for 12,000+ years. French and British colonization. British dominance after 1763.",
          "ethnicComposition": [
              "European descent ~72%",
              "Asian ~17%",
              "Indigenous ~5%",
              "Black ~3%",
              "Latin American ~3%"
          ],
          "ancientEmpires": [
              "Pre-Columbian Indigenous nations",
              "New France",
              "British North America",
              "Canada"
          ],
          "socialStructures": "Federal bilingual system; Indigenous reconciliation ongoing."
      },
      "culture": {
          "insights": [
              "Multiculturalism as official policy",
              "Strong regional variation (French Quebec, Western provinces)",
              "Winter sports culture"
          ],
          "foodCulture": "Poutine (fries, gravy, cheese), Tourtière, Beaver Tails pastry, salmon fishing heritage.",
          "culturalIdentity": "Defined by diversity, Northern frontier spirit, and bicultural (English-French) identity."
      },
      "economy": {
          "overview": "Advanced economy integrated with US via USMCA; resource-rich (oil, minerals, timber).",
          "keyIndustries": [
              "Oil and Gas Extraction",
              "Mining",
              "Forestry",
              "Technology",
              "Manufacturing"
          ],
          "tradeLegacy": "Fur trade drove early exploration; timber, minerals, and oil exports continue."
      },
      "aiAnalysis": "Canada is geography divided against itself. The Canadian Shield and northern wilderness prevented easy consolidation. French colonization in the St. Lawrence valley created a distinct Francophone enclave. The true Canadian economy developed around resource extraction in the Shield and prairies, tied intrinsically to US markets. The northern climate created cultural resilience and outdoor recreation as defining traits. Indigenous land claims remain unresolved."
  },
  GB: {
      "id": "GB",
      "name": "United Kingdom",
      "capital": "London",
      "population": "67 Million",
      "languages": [
          "English"
      ],
      "religion": "Christianity ~50%, Unaffiliated ~37%, Islam ~3.1%, Hinduism ~1.5%",
      "coordinates": [
          51.5074,
          -0.1278
      ],
      "climate": {
          "type": "Temperate Maritime",
          "description": "Mild winters and cool summers moderated by Atlantic Gulf Stream; frequent rain.",
          "temperatureRange": "0°C (winter) to 20°C (summer)",
          "rainfallPattern": "Year-round precipitation; west coast wetter than east due to Atlantic moisture."
      },
      "geography": {
          "terrain": "Island archipelago; rolling hills, uplands (Scotland, Wales), lowlands (England), moorlands.",
          "features": [
              "Thames River",
              "Scottish Highlands",
              "Peak District",
              "Lake District",
              "Cliffs of Dover"
          ],
          "biodiversityRating": "Moderate (Temperate and marine biodiversity)",
          "ecosystems": [
              "Temperate deciduous forests",
              "Heathlands and moorlands",
              "Coastal wetlands",
              "Marine ecosystems"
          ]
      },
      "adaptation": {
          "title": "Island Maritime Commerce & Naval Dominance",
          "description": "Geographic isolation enabled naval supremacy and mercantile capitalism.",
          "technologicalAdaptation": "Advanced shipbuilding, global trade networks, later industrialization."
      },
      "anthropology": {
          "migrationHistory": "Celtic, Roman, Anglo-Saxon, Viking, and Norman invasions. Colonial empire. Brexit reflects contemporary identity questions.",
          "ethnicComposition": [
              "White British ~80%",
              "Asian ~8%",
              "Black ~3%",
              "Mixed ~3%",
              "Other ~6%"
          ],
          "ancientEmpires": [
              "Celtic tribes",
              "Roman Britain",
              "Anglo-Saxon kingdoms",
              "Norman England",
              "British Empire"
          ],
          "socialStructures": "Historically feudal; later parliamentary democracy. Class system remains culturally significant."
      },
      "culture": {
          "insights": [
              "Shakespeare and literary tradition",
              "Tea culture and afternoon tea",
              "Reserved politeness as cultural norm"
          ],
          "foodCulture": "Fish and chips, Sunday roast, Yorkshire pudding; modern multiculturalism adds Indian, Chinese influences.",
          "culturalIdentity": "Reserve, tradition, heritage, and historical consciousness of empire."
      },
      "economy": {
          "overview": "Advanced post-industrial economy; financial services (London), technology, creative industries.",
          "keyIndustries": [
              "Financial Services",
              "Technology",
              "Creative Industries",
              "Pharmaceuticals",
              "Education"
          ],
          "tradeLegacy": "Former imperial superpower; still significant global economic influence via finance and culture."
      },
      "aiAnalysis": "Britain's island geography was transformative. Separated from European power struggles, Britain developed as a maritime trading civilization. This enabled a naval-industrial dominance that created the world's first truly global empire. The empire enriched Britain but deindustrialization in the late 20th century shifted it toward financial services. The vote to leave the EU reflects geographic insularity reasserting itself."
  },
  FR: {
      "id": "FR",
      "name": "France",
      "capital": "Paris",
      "population": "68 Million",
      "languages": [
          "French"
      ],
      "religion": "Christianity ~60%, Unaffiliated ~32%, Islam ~5%",
      "coordinates": [
          48.8566,
          2.3522
      ],
      "climate": {
          "type": "Temperate Mediterranean & Oceanic",
          "description": "Mediterranean south, oceanic west, continental east. Generally mild winters and warm summers.",
          "temperatureRange": "0°C (east/north winter) to 30°C (south summer)",
          "rainfallPattern": "Variable; Mediterranean south dry in summer, Atlantic west year-round wet."
      },
      "geography": {
          "terrain": "Hexagonal landmass with Pyrenees, Alps, Massif Central, fertile plains.",
          "features": [
              "Alps",
              "Pyrenees",
              "Loire River",
              "Rhone Valley",
              "Normandy Coast"
          ],
          "biodiversityRating": "High (Multiple climate zones and Mediterranean biodiversity)",
          "ecosystems": [
              "Temperate deciduous forests",
              "Alpine meadows",
              "Mediterranean scrublands",
              "Wetlands"
          ]
      },
      "adaptation": {
          "title": "Agricultural Optimization & Wine Culture",
          "description": "Geographic and climatic diversity enabled sophisticated regional agricultural specialization.",
          "technologicalAdaptation": "Terraced vineyards, cheese-making traditions tied to regional terroirs."
      },
      "anthropology": {
          "migrationHistory": "Celtic Gaul, Roman conquest, Frankish kingdom, feudal structure, Revolutionary transformation.",
          "ethnicComposition": [
              "French ~92%",
              "Other European ~5%",
              "North African ~2%",
              "Sub-Saharan African ~1%"
          ],
          "ancientEmpires": [
              "Gaul (Celtic)",
              "Roman Gaul",
              "Frankish Kingdom",
              "France"
          ],
          "socialStructures": "Highly centralized state; revolutionary transformation created modern civil society concepts."
      },
      "culture": {
          "insights": [
              "Culinary tradition and gastronomy as central to identity",
              "Enlightenment intellectual legacy",
              "Art and fashion dominance"
          ],
          "foodCulture": "Sophisticated regional cuisines; wine, cheese, bread as cultural pillars. Haute cuisine tradition.",
          "culturalIdentity": "Sophistication, rationalism, cultural refinement, and Revolutionary ideals of liberty."
      },
      "economy": {
          "overview": "Advanced economy; strong in agriculture, tourism, aerospace, luxury goods, pharmaceuticals.",
          "keyIndustries": [
              "Tourism",
              "Agriculture",
              "Aerospace (Airbus)",
              "Luxury Goods",
              "Pharmaceuticals"
          ],
          "tradeLegacy": "Former imperial power; current strength in culture and soft power rather than hard power."
      },
      "aiAnalysis": "France's geographic diversity created a fragmented medieval landscape unified by strong centralized states. The French Revolution represented a philosophical turn inward from imperial expansion toward abstract universal ideals. The country's geographic position as a crossroads created cultural synthesis. Today, France projects power through language, culture, and philosophy rather than military might."
  },
  DE: {
      "id": "DE",
      "name": "Germany",
      "capital": "Berlin",
      "population": "84 Million",
      "languages": [
          "German"
      ],
      "religion": "Christianity ~56%, Unaffiliated ~38%, Islam ~5%",
      "coordinates": [
          52.52,
          13.405
      ],
      "climate": {
          "type": "Temperate Continental",
          "description": "Mild oceanic west transitions to cold continental east; snowy winters, warm summers.",
          "temperatureRange": "-5°C (winter) to 25°C (summer)",
          "rainfallPattern": "Year-round precipitation; west wetter, east drier."
      },
      "geography": {
          "terrain": "North German Plain, Central Highlands, Bavarian Alps in south.",
          "features": [
              "Rhine River",
              "Danube River",
              "Bavarian Alps",
              "Black Forest",
              "Ruhr Valley"
          ],
          "biodiversityRating": "Moderate (Central European temperate forests)",
          "ecosystems": [
              "Temperate deciduous forests",
              "Grasslands",
              "Alpine meadows",
              "Wetlands"
          ]
      },
      "adaptation": {
          "title": "River Basin Integration & Industrial Organization",
          "description": "Rhine and Danube river basins enabled trade and industrial development.",
          "technologicalAdaptation": "Precision engineering, industrial organization, chemical industries."
      },
      "anthropology": {
          "migrationHistory": "Germanic tribes, Holy Roman Empire fragmentation, Prussian militarization, Nazi period, division/reunification.",
          "ethnicComposition": [
              "German ~87%",
              "Turkish ~3%",
              "Polish ~2%",
              "Other European/Asian ~8%"
          ],
          "ancientEmpires": [
              "Germanic tribes",
              "Holy Roman Empire",
              "Prussia",
              "German Empire",
              "Nazi Germany",
              "East/West Germany",
              "Germany"
          ],
          "socialStructures": "Previously highly militarized and hierarchical; post-WWII emphasis on democracy and federalism."
      },
      "culture": {
          "insights": [
              "Engineering precision and craftsmanship",
              "Philosophy and intellectual tradition",
              "Beer culture and Oktoberfest"
          ],
          "foodCulture": "Sausages, pretzels, sauerkraut, beer; hearty meat-and-potato traditions.",
          "culturalIdentity": "Work ethic, precision, intellectual rigor; complicated relationship with historical legacy."
      },
      "economy": {
          "overview": "Europe's largest economy; manufacturing powerhouse (cars, machinery), chemical, and pharmaceutical industries.",
          "keyIndustries": [
              "Automotive",
              "Machinery and Engineering",
              "Chemicals and Pharmaceuticals",
              "Industrial Manufacturing"
          ],
          "tradeLegacy": "Industrial revolution drove rise to power; automotive and precision engineering define modern economy."
      },
      "aiAnalysis": "Germany's position at Europe's crossroads created a contested space. The fragmentation of the Holy Roman Empire prevented early unification. Prussian militarization unified the north and created a militaristic state. Industrial development in the Ruhr Valley created economic power. Geographic centrality and power struggles led to two world wars. Post-war division and reunification create ongoing identity questions. Modern Germany represents Europe's industrial heart and intellectual tradition."
  },
  IT: {
      "id": "IT",
      "name": "Italy",
      "capital": "Rome",
      "population": "58 Million",
      "languages": [
          "Italian"
      ],
      "religion": "Christianity ~87%, Unaffiliated ~10%, Islam ~1%",
      "coordinates": [
          41.9028,
          12.4964
      ],
      "climate": {
          "type": "Mediterranean",
          "description": "Hot, dry summers and mild winters; regional variation north to south.",
          "temperatureRange": "-5°C (northern winter) to 35°C (southern summer)",
          "rainfallPattern": "Mediterranean pattern; concentrated in winter/spring; very dry summers."
      },
      "geography": {
          "terrain": "Mountainous peninsula with northern Alps, central Apennines, island Sicily and Sardinia.",
          "features": [
              "Alps",
              "Apennines",
              "Mount Vesuvius",
              "Po River",
              "Sicily",
              "Sardinia"
          ],
          "biodiversityRating": "High (Mediterranean biodiversity hotspot)",
          "ecosystems": [
              "Mediterranean scrublands",
              "Deciduous forests",
              "Alpine meadows",
              "Coastal wetlands"
          ]
      },
      "adaptation": {
          "title": "Mediterranean Terrace Agriculture & Maritime Trade",
          "description": "Adapting to mountainous terrain and Mediterranean climate through terracing and naval trade.",
          "technologicalAdaptation": "Terraced vineyards and olive groves; historical maritime city-states."
      },
      "anthropology": {
          "migrationHistory": "Greek colonization in south, Etruscan north, Roman unification, fragmentation, Renaissance, unification 1861.",
          "ethnicComposition": [
              "Italian ~91%",
              "European ~5%",
              "North African ~2%",
              "Other ~2%"
          ],
          "ancientEmpires": [
              "Etruscan",
              "Roman Empire",
              "Italian City-States",
              "Papal States",
              "Italy"
          ],
          "socialStructures": "Strong regional identity (north vs south); family-centered society."
      },
      "culture": {
          "insights": [
              "Renaissance birthplace; art and design heritage",
              "Catholic tradition and Vatican influence",
              "Fashion and style leadership"
          ],
          "foodCulture": "Regionalized cuisine: northern risotto/butter, central wild boar/pecorino, southern pasta/olive oil. UNESCO heritage.",
          "culturalIdentity": "Beauty, art, history, and dolce vita (sweet life) philosophy."
      },
      "economy": {
          "overview": "Advanced economy; strengths in fashion, design, tourism, manufacturing, and agriculture.",
          "keyIndustries": [
              "Fashion and Luxury Goods",
              "Tourism",
              "Mechanical Engineering",
              "Automotive",
              "Agriculture"
          ],
          "tradeLegacy": "Medieval city-state commerce (Venice, Genoa); Renaissance artistic tradition; modern fashion industry."
      },
      "aiAnalysis": "Italy's peninsula geography created fragmentation. The difficult alpine terrain prevented early unification; the Mediterranean coast enabled maritime city-states. Roman unification proved temporary. Medieval fragmentation into city-states fostered competition and creativity, leading to the Renaissance. Geographic fragmentation persists in north-south economic divide. Italy's strength lies in cultural production and design rather than raw industrial might."
  },
  RU: {
      "id": "RU",
      "name": "Russia",
      "capital": "Moscow",
      "population": "146 Million",
      "languages": [
          "Russian"
      ],
      "religion": "Orthodox Christianity ~71%, Islam ~14%, Unaffiliated ~15%",
      "coordinates": [
          55.7558,
          37.6173
      ],
      "climate": {
          "type": "Subarctic to Temperate Continental",
          "description": "Vast territory with extreme continental climate; very cold winters, varying summers.",
          "temperatureRange": "-50°C (Siberia) to 25°C (Moscow summer)",
          "rainfallPattern": "Variable; east Siberia dry, west and Caucasus wetter."
      },
      "geography": {
          "terrain": "World's largest country; Ural Mountains divide Europe from Asia; vast Siberian plateaus.",
          "features": [
              "Ural Mountains",
              "Siberia",
              "Caucasus Mountains",
              "Volga River",
              "Lake Baikal"
          ],
          "biodiversityRating": "Very High (Boreal forests, Arctic tundra, steppes)",
          "ecosystems": [
              "Boreal forests (Taiga)",
              "Arctic tundra",
              "Steppes",
              "Temperate deciduous forests",
              "Mountain ecosystems"
          ]
      },
      "adaptation": {
          "title": "Continental Conquest & Transcontinental Integration",
          "description": "Adapting to vast scale and extreme cold through expansion and centralization.",
          "technologicalAdaptation": "Trans-Siberian Railway, Arctic resource extraction, cold-weather engineering."
      },
      "anthropology": {
          "migrationHistory": "Slavic migrations from Central Asia, Viking traders (Varangians), Mongol conquest, Tsarist expansion, Soviet period, modern Russia.",
          "ethnicComposition": [
              "Russian ~81%",
              "Tatar ~3.9%",
              "Ukrainian ~2.3%",
              "Other Slavic and Asian groups ~12%"
          ],
          "ancientEmpires": [
              "Kyivan Rus",
              "Mongol Khanate period",
              "Moscow Principality",
              "Russian Empire",
              "Soviet Union",
              "Russia"
          ],
          "socialStructures": "Historically highly centralized autocratic rule; Soviet period state dominance; post-Soviet oligarchy."
      },
      "culture": {
          "insights": [
              "Literature and philosophical tradition (Dostoevsky, Tolstoy)",
              "Balancing Western and Eastern cultural influences",
              "Complex relationship with authority"
          ],
          "foodCulture": "Rye bread, borscht, cabbage, potatoes, smoked fish; hearty preservation-based cuisine from long winters.",
          "culturalIdentity": "Vast scale, power, depth, and struggle with modernization and global integration."
      },
      "economy": {
          "overview": "Natural resource economy; heavily dependent on oil and gas exports; declining post-Soviet.",
          "keyIndustries": [
              "Oil and Gas Extraction",
              "Minerals and Metals",
              "Timber",
              "Military-Industrial Complex"
          ],
          "tradeLegacy": "Post-Soviet decline; current economy heavily sanctioned and dependent on resource extraction."
      },
      "aiAnalysis": "Russia's vastness created both opportunity and constraint. The Trans-Siberian conquest gave Russia access to enormous resources but created an empire difficult to govern. The brutal continental climate demanded centralization and strong state apparatus. Geographic isolation from Western Europe fostered distinct Orthodox Christian civilization. The vast scale enabled Soviet industrialization but also inefficiency. Modern Russia struggles with transitioning from resource-based economy to diversified modern economy while managing imperial ambitions."
  },
  CN: {
      "id": "CN",
      "name": "China",
      "capital": "Beijing",
      "population": "1.43 Billion",
      "languages": [
          "Mandarin Chinese (official)"
      ],
      "religion": "Officially atheist; Buddhism, Taoism, folk religion significant (~10-15%), Christianity ~5%",
      "coordinates": [
          39.9042,
          116.4074
      ],
      "climate": {
          "type": "Diverse: Subtropical, Temperate, Subarctic",
          "description": "Massive country with variation from tropical south to subarctic north, arid west to wet east.",
          "temperatureRange": "-45°C (Manchuria) to 40°C (southern coast)",
          "rainfallPattern": "Extreme variation; southeastern coast wet monsoon, western interior desert, northern plains seasonal."
      },
      "geography": {
          "terrain": "Mountainous west (Himalayas, Tibetan Plateau), river valleys center, plains east and north.",
          "features": [
              "Himalayas",
              "Yangtze River",
              "Yellow River",
              "Gobi Desert",
              "Tibetan Plateau"
          ],
          "biodiversityRating": "Mega-diverse (17 megadiverse countries list)",
          "ecosystems": [
              "Tropical rainforests (south)",
              "Deciduous forests",
              "Grasslands and steppes",
              "Alpine meadows",
              "Desert",
              "Wetlands"
          ]
      },
      "adaptation": {
          "title": "River Basin Civilization & State Continuity",
          "description": "Yellow and Yangtze River valleys created earliest sustained civilizations; continuity across millennia.",
          "technologicalAdaptation": "Terrace agriculture, porcelain, silk production, state hydraulic systems."
      },
      "anthropology": {
          "migrationHistory": "Ancient civilizations in Yellow River valley; unified empire under Qin; continuous state through dynasties; Cultural Revolution disruption; modern market reforms.",
          "ethnicComposition": [
              "Han Chinese ~92%",
              "Zhuang ~1.3%",
              "Hui ~0.8%",
              "Manchu ~0.7%",
              "Uyghur ~0.6%",
              "Other ethnic minorities ~4%"
          ],
          "ancientEmpires": [
              "Yellow River civilizations",
              "Xia",
              "Shang",
              "Zhou",
              "Qin",
              "Han",
              "Tang",
              "Song",
              "Yuan",
              "Ming",
              "Qing",
              "China"
          ],
          "socialStructures": "Confucian hierarchy historically; Communist period egalitarian rhetoric; modern authoritarian capitalism."
      },
      "culture": {
          "insights": [
              "Continuous written tradition spanning 3000+ years",
              "Philosophy (Confucianism, Taoism, Buddhism)",
              "Arts: calligraphy, painting, martial arts"
          ],
          "foodCulture": "Extremely regionalized; Cantonese dim sum, Sichuan spice, Beijing duck, regional rice/noodle traditions.",
          "culturalIdentity": "Historical pride, civilizational continuity, modern national renaissance."
      },
      "economy": {
          "overview": "World's second-largest economy; manufacturing powerhouse, rapid tech sector growth, massive population market.",
          "keyIndustries": [
              "Manufacturing and Assembly",
              "Technology",
              "Real Estate",
              "Agriculture",
              "Energy"
          ],
          "tradeLegacy": "Ancient Silk Road trade; 20th century extraction by imperial powers; 21st century manufacturing dominance."
      },
      "aiAnalysis": "China's geography enabled the world's oldest continuous civilization. The Yellow and Yangtze Rivers created agricultural surplus allowing centralized state development. Geographic barriers (mountains, deserts) created a bounded civilization distinct from Europe. The 'Middle Kingdom' psychological identity stems from geographic isolation. Modern China's rise stems from its massive population base and manufacturing advantages. The party-state structure reflects millennia of centralized bureaucratic tradition adapted to modern communism-capitalism."
  },
  ID: {
      "id": "ID",
      "name": "Indonesia",
      "capital": "Jakarta",
      "population": "275 Million",
      "languages": [
          "Indonesian"
      ],
      "religion": "Islam ~87%, Christianity ~7%, Hinduism ~1.7%, Buddhism ~1%, Other ~3%",
      "coordinates": [
          -6.2088,
          106.8456
      ],
      "climate": {
          "type": "Tropical Equatorial",
          "description": "Hot and humid year-round with monsoon seasonal variation",
          "temperatureRange": "24°C to 32°C",
          "rainfallPattern": "Year-round rain; wet season December-March"
      },
      "geography": {
          "terrain": "World's largest archipelago (17,000+ islands); highly volcanic",
          "features": [
              "Java",
              "Sumatra",
              "Borneo",
              "Sulawesi",
              "Mount Krakatau"
          ],
          "biodiversityRating": "Mega-diverse (One of world's richest)",
          "ecosystems": [
              "Tropical rainforests",
              "Mangrove forests",
              "Coral reefs",
              "Volcanic landscapes"
          ]
      },
      "adaptation": {
          "title": "Archipelago Maritime Integration",
          "description": "Adapting to island fragmentation through maritime networks and spice trade mastery.",
          "physiologicalAdaptation": "Indigenous populations developed high resistance to tropical insect-borne diseases and humidity-induced heat stress over generations of forest and coastal living.",
          "technologicalAdaptation": "Mastery of outrigger canoe design (pinisi ships) for long-distance inter-island navigation, and volcanic terrace farming to cultivate steep mountain slopes."
      },
      "anthropology": {
          "migrationHistory": "Austronesian migrations; Hindu-Buddhist kingdoms; Islamic sultanates; Dutch colonization",
          "ethnicComposition": [
              "Javanese ~35%",
              "Sundanese ~16%",
              "Malay ~3%",
              "Madurese ~3%",
              "Other ~43%"
          ],
          "ancientEmpires": [
              "Srivijaya",
              "Majapahit",
              "Mataram Sultanate",
              "Dutch East Indies",
              "Indonesia"
          ],
          "socialStructures": "Extremely diverse; 300+ ethnic groups; 700+ languages; national unifying language (Indonesian) created."
      },
      "culture": {
          "insights": [
              "Wayang (shadow puppet) theater traditions",
              "Batik textile art",
              "Hindu-Buddhist syncretism in Bali"
          ],
          "foodCulture": "Nasi Goreng, Satay, Rendang; spice-rich; rice staple across islands.",
          "culturalIdentity": "Unity in diversity; archipelago consciousness; cultural synthesis."
      },
      "economy": {
          "overview": "Largest Southeast Asian economy; manufacturing, agriculture, natural resources",
          "keyIndustries": [
              "Manufacturing",
              "Mining",
              "Agriculture",
              "Oil and Gas",
              "Tourism"
          ],
          "tradeLegacy": "Ancient spice trade center; Dutch colonial resource extraction; modern ASEAN leader."
      },
      "aiAnalysis": "Indonesia is the world's largest archipelagic state, spanning over 17,000 islands. This extreme geographic fragmentation prevented the rise of a centralized, homogeneous empire, instead fostering an incredibly diverse tapestry of over 300 ethnic groups. However, the open seas served as corridors of connection rather than barriers. Maritime trade routes, especially the Malacca Strait, drew in Hindu-Buddhist, Islamic, and European colonial influences, each layer blending with indigenous animism. The necessity of navigating across islands forged a shared maritime consciousness, ultimately unified in the modern era under the national motto 'Bhinneka Tunggal Ika' (Unity in Diversity). Indonesia's contemporary economy leverages its volcanic soil fertility and strategic maritime position to emerge as Southeast Asia's leading economy."
  },
  SG: {
      "id": "SG",
      "name": "Singapore",
      "capital": "Singapore",
      "population": "5.9 Million",
      "languages": [
          "English",
          "Mandarin Chinese",
          "Malay",
          "Tamil"
      ],
      "religion": "Buddhism ~34%, Christianity ~18%, Islam ~14%, Taoism ~11%, Hinduism ~5%, Unaffiliated ~18%",
      "coordinates": [
          1.3521,
          103.8198
      ],
      "climate": {
          "type": "Tropical Equatorial",
          "description": "Hot and humid year-round with high rainfall",
          "temperatureRange": "24°C to 31°C",
          "rainfallPattern": "Year-round with monsoon peaks"
      },
      "geography": {
          "terrain": "Low-lying island city-state",
          "features": [
              "Straits of Malacca",
              "Marina Bay",
              "Sentosa Island"
          ],
          "biodiversityRating": "High (Urban biodiversity)",
          "ecosystems": [
              "Mangrove forests",
              "Wetlands",
              "Urban green spaces"
          ]
      },
      "adaptation": {
          "title": "Port City State Development",
          "description": "Transformed from swampland trading post to global financial hub through strategic location and meritocracy.",
          "physiologicalAdaptation": "Urban population highly adapted to high-density living, showing high tolerance for compact spaces and rapid, clock-disciplined urban movement.",
          "technologicalAdaptation": "Massive land reclamation expanding the island's territory by over 20%, state-of-the-art desalination and water recycling networks (NEWater), and high-density urban planning integrating green spaces (Biophilic urbanism)."
      },
      "anthropology": {
          "migrationHistory": "British colonial trading post; multicultural immigrant society",
          "ethnicComposition": [
              "Chinese ~75%",
              "Malay ~14%",
              "Indian ~9%",
              "Eurasian ~2%"
          ],
          "ancientEmpires": [
              "British Colonial Singapore",
              "Singapore"
          ],
          "socialStructures": "Highly efficient, multiethnic meritocratic state."
      },
      "culture": {
          "insights": [
              "Multicultural harmony as deliberate policy",
              "Efficiency and cleanliness as cultural values",
              "Hawker food culture"
          ],
          "foodCulture": "Laksa, Char Kway Teow, Hainanese Chicken Rice; fusion of Chinese, Malay, Indian, European.",
          "culturalIdentity": "Global city-state; pragmatic multiculturalism; harbor of prosperity."
      },
      "economy": {
          "overview": "Global financial hub; world's busiest port; petrochemicals and refining",
          "keyIndustries": [
              "Port Services",
              "Financial Services",
              "Petrochemicals",
              "Electronics"
          ],
          "tradeLegacy": "Strategic location on spice trade routes; modern entrepôt for Asian trade."
      },
      "aiAnalysis": "Singapore represents the ultimate triumph of artificial geostrategic adaptation. Located at the narrowest bottleneck of the Straits of Malacca, the island was historically a swampy outpost prone to piracy. However, this chokepoint position meant that whoever controlled Singapore controlled the main gateway between the Indian Ocean and the South China Sea. Upon independence in 1965, devoid of natural resources or land, Singapore leveraged its location to construct the world's busiest container port and a premier global financial hub. Through highly centralized, meritocratic planning and massive land reclamation, the city-state transformed its physical limits into a hyper-dense, multicultural metropolis. Singapore's survival model is built on absolute economic openness and institutional efficiency, transforming a geographic constraint into a global trade fortress."
  },
  TH: {
      "id": "TH",
      "name": "Thailand",
      "capital": "Bangkok",
      "population": "71 Million",
      "languages": [
          "Thai"
      ],
      "religion": "Buddhism ~95%, Islam ~4%, Christianity ~1%",
      "coordinates": [
          13.7563,
          100.5018
      ],
      "climate": {
          "type": "Tropical Monsoon",
          "description": "Hot and humid; distinct rainy and dry seasons",
          "temperatureRange": "15°C to 37°C",
          "rainfallPattern": "Southwest monsoon May-October heavy rain; northeast monsoon November-April dry"
      },
      "geography": {
          "terrain": "Central plains, northern mountains, northeastern plateau, southern peninsula",
          "features": [
              "Mekong River",
              "Northern Mountains",
              "Chao Phraya River",
              "Phuket",
              "Krabi Cliffs"
          ],
          "biodiversityRating": "High (Southeast Asian biodiversity)",
          "ecosystems": [
              "Tropical rainforests",
              "Mangrove forests",
              "Deciduous forests",
              "Coral reefs"
          ]
      },
      "adaptation": {
          "title": "River Delta Civilization",
          "description": "Mekong River-dependent agriculture and Buddhist cultural foundation.",
          "physiologicalAdaptation": "Adaptation to warm, humid tropical conditions with diets rich in cooling spices, local herbs, and rice-based nutrition.",
          "technologicalAdaptation": "Sophisticated canal networks (khlongs) in Bangkok and Ayutthaya for transport, irrigation, and flood mitigation, alongside traditional floating markets."
      },
      "anthropology": {
          "migrationHistory": "Thai migrations 11th-13th centuries; Buddhist kingdom continuity; never colonized",
          "ethnicComposition": [
              "Thai ~75%",
              "Chinese ~14%",
              "Lao ~11%",
              "Karen ~2%",
              "Other ~8%"
          ],
          "ancientEmpires": [
              "Sukhothai",
              "Ayutthaya",
              "Chakri Dynasty",
              "Kingdom of Thailand"
          ],
          "socialStructures": "Feudal monarchy with strong respect for royal family; Buddhist temple-centered communities."
      },
      "culture": {
          "insights": [
              "Theravada Buddhism as central to daily life",
              "Muay Thai martial arts tradition",
              "Respectful 'Wai' greeting custom"
          ],
          "foodCulture": "Tom Yum, Green Curry, Pad Thai; balance of sweet, sour, salty, spicy.",
          "culturalIdentity": "Buddhist serenity, martial pride, royal reverence, culinary excellence."
      },
      "economy": {
          "overview": "Middle-income country; tourism, agriculture, manufacturing, automotive",
          "keyIndustries": [
              "Tourism",
              "Agriculture",
              "Automotive Manufacturing",
              "Textiles",
              "Electronics"
          ],
          "tradeLegacy": "Ancient rice kingdom; modern tourist destination; manufacturing hub."
      },
      "aiAnalysis": "Thailand's civilizational core is the fertile alluvial basin of the Chao Phraya River. The predictable monsoon flooding created an agricultural abundance that sustained the powerful kingdoms of Sukhothai and Ayutthaya. Unlike its neighbors, Thailand (historically Siam) avoided European colonization, serving as a buffer state between British Burma and French Indochina. This independence allowed the Thai monarchy and Theravada Buddhist institutions to maintain a unique, unbroken cultural continuity. Thai society developed a fluid, negotiation-based approach to external influences, absorbing Western modernization while keeping its traditional hierarchies and spiritual identity intact. The modern nation remains a major agricultural exporter and tourist destination, balancing its serene Buddhist values with a dynamic industrial economy."
  },
  VN: {
      "id": "VN",
      "name": "Vietnam",
      "capital": "Hanoi",
      "population": "98 Million",
      "languages": [
          "Vietnamese"
      ],
      "religion": "Buddhism ~10%, Christianity ~7%, Unaffiliated ~80%, Folk religion significant",
      "coordinates": [
          21.0285,
          105.8542
      ],
      "climate": {
          "type": "Tropical and Subtropical Monsoon",
          "description": "Tropical south, subtropical north; monsoon-driven",
          "temperatureRange": "5°C (north winter) to 37°C (south)",
          "rainfallPattern": "Varies by region; southwest monsoon May-October brings heavy rain"
      },
      "geography": {
          "terrain": "S-shaped country with Red River delta north, Mekong delta south, central highlands",
          "features": [
              "Mekong River",
              "Red River",
              "Halong Bay",
              "Mekong Delta",
              "Central Highlands"
          ],
          "biodiversityRating": "High (Southeast Asian endemics)",
          "ecosystems": [
              "Tropical rainforests",
              "Deciduous forests",
              "Mangrove deltas",
              "Karst formations"
          ]
      },
      "adaptation": {
          "title": "Delta Rice Agriculture",
          "description": "Red River and Mekong deltas enabled rice-based civilization despite monsoons.",
          "physiologicalAdaptation": "High heat-tolerance and physiological adaptation to working in waterlogged paddy fields, developing resistance to water-borne pathogens.",
          "technologicalAdaptation": "Highly complex dike and dam networks in the Red River Delta to prevent catastrophic flooding, and traditional stilt-house architecture to manage seasonal river rises."
      },
      "anthropology": {
          "migrationHistory": "Kinh Vietnamese migrations from north; Champa Kingdom history; French colonization; American war; Communist unification",
          "ethnicComposition": [
              "Kinh Vietnamese ~85%",
              "Tay ~2%",
              "Thai ~2%",
              "Muong ~1.5%",
              "Other minorities ~10%"
          ],
          "ancientEmpires": [
              "Van Lang",
              "Au Lac",
              "Champa",
              "Dai Viet",
              "Vietnam"
          ],
          "socialStructures": "Communist single-party state; strong family bonds; collective identity legacy."
      },
      "culture": {
          "insights": [
              "War resilience and national pride",
              "Ancestor veneration traditions",
              "Rapid modernization maintaining traditions"
          ],
          "foodCulture": "Pho, Banh Mi, Spring Rolls; French and Chinese influences; fresh herbs.",
          "culturalIdentity": "Resilient, hardy, proud; victorious survivor; rapid development."
      },
      "economy": {
          "overview": "Emerging economy; manufacturing, agriculture, tourism; TPP member",
          "keyIndustries": [
              "Manufacturing",
              "Agriculture",
              "Tourism",
              "Textiles",
              "Electronics"
          ],
          "tradeLegacy": "Silk Road connections; French colonial exploitation; Chinese War legacy; modern manufacturing hub."
      },
      "aiAnalysis": "Vietnam's geography is defined by an S-shaped coastline bracketed by two fertile river deltas: the Red River Delta in the north and the Mekong Delta in the south, separated by the rugged Annamite Range. This landscape forged a civilization of intense resilience, constant agricultural labor, and maritime exposure. Living in the shadow of imperial China, Vietnam developed a fiercely independent national identity, defending its borders through centuries of guerrilla warfare while simultaneously adopting Confucian administrative structures and wet-rice cultivation techniques. The trauma of the 20th-century Indochina wars and subsequent reunification under a single-party state cemented a collective, battle-hardened social cohesion. Today, Vietnam leverages its extensive coastline and hard-working population to undergo rapid industrialization, transforming itself into a global manufacturing powerhouse."
  },
  PH: {
      "id": "PH",
      "name": "Philippines",
      "capital": "Manila",
      "population": "117 Million",
      "languages": [
          "Filipino (Tagalog)",
          "English"
      ],
      "religion": "Roman Catholicism ~80.6%, Islam ~5.6%, Protestantism ~3.3%, Other Christian ~3.3%",
      "coordinates": [
          14.5994,
          120.9842
      ],
      "climate": {
          "type": "Tropical Monsoon",
          "description": "Hot and humid with monsoon seasons; typhoon belt",
          "temperatureRange": "21°C to 32°C",
          "rainfallPattern": "Wet southwest monsoon June-October; dry northeast November-May"
      },
      "geography": {
          "terrain": "Archipelago of 7,641 islands",
          "features": [
              "Mindanao",
              "Luzon",
              "Visayas",
              "Mount Pinatubo",
              "Boracay"
          ],
          "biodiversityRating": "Mega-diverse",
          "ecosystems": [
              "Tropical rainforests",
              "Mangrove swamps",
              "Coral reefs",
              "Cloud forests"
          ]
      },
      "adaptation": {
          "title": "Island Archipelago Navigation",
          "description": "Adapting to island geography through maritime culture and disaster resilience.",
          "physiologicalAdaptation": "Development of high psychological and social resilience (typhoon culture) and physical endurance in hot, marine environments.",
          "technologicalAdaptation": "Elevated stilt houses (Bahay Kubo) designed to sway during earthquakes and allow floodwaters to pass underneath, alongside modern seismic building codes."
      },
      "anthropology": {
          "migrationHistory": "Austronesian maritime migrations; Spanish colonization; American colonization; Islamic sultanates in south",
          "ethnicComposition": [
              "Tagalog ~39%",
              "Cebuano ~21%",
              "Ilocano ~10%",
              "Bisaya ~9%",
              "Other ~21%"
          ],
          "ancientEmpires": [
              "Sultanate of Maguindanao",
              "Spanish Philippines",
              "American Philippines",
              "Philippines"
          ],
          "socialStructures": "Highly family-oriented; strong kinship networks; hierarchical with colonial legacy."
      },
      "culture": {
          "insights": [
              "Bayanihan (communal unity) spirit",
              "Deep Catholic tradition blended with indigenous animism",
              "Vibrant entertainment and karaoke culture"
          ],
          "foodCulture": "Adobo, Sinigang, Lumpia; rice staple; Spanish, Chinese, American influences.",
          "culturalIdentity": "Friendly, communal, resilient; balancing multiple cultural influences; Southeast Asian identity."
      },
      "economy": {
          "overview": "Fast-growing economy; remittances from diaspora significant; BPO services sector",
          "keyIndustries": [
              "Business Process Outsourcing",
              "Remittances",
              "Tourism",
              "Agriculture",
              "Manufacturing"
          ],
          "tradeLegacy": "Spanish colonial trade routes; US-influenced development; modern tech outsourcing hub."
      },
      "aiAnalysis": "The Philippines is an archipelago of over 7,000 islands situated along the Pacific Ring of Fire and the typhoon belt. This highly volatile geography exposed the population to frequent volcanic eruptions, earthquakes, and seasonal typhoons, cultivating a cultural trait of extreme resilience, optimism, and community solidarity, known as 'Bayanihan' (communal unity). Colonized by Spain for over 300 years and later by the United States, the archipelago experienced a deep cultural synthesis, merging Latin-Catholic traditions and American institutions with its Austronesian maritime roots. This created a unique, English-proficient, highly globalized population. The modern Philippines is a major source of global maritime and service labor, exporting its cultural adaptability worldwide while transforming its domestic economy through service-sector outsourcing."
  },
  TR: {
      "id": "TR",
      "name": "Turkey",
      "capital": "Ankara",
      "population": "85 Million",
      "languages": [
          "Turkish"
      ],
      "religion": "Islam (primarily Sunni) ~99%, Other Christian ~1%",
      "coordinates": [
          39.9334,
          32.8597
      ],
      "climate": {
          "type": "Mediterranean, Continental, Alpine",
          "description": "Temperate Mediterranean coast; cold continental interior; alpine mountains",
          "temperatureRange": "-5°C (mountains/interior winter) to 35°C (coastal summer)",
          "rainfallPattern": "Winter/spring wet along coasts and mountains; hot dry summers; interior dry"
      },
      "geography": {
          "terrain": "Mountainous; Anatolian Plateau interior; Mediterranean and Black Sea coasts",
          "features": [
              "Taurus Mountains",
              "Bosphorus Strait",
              "Dardanelles Strait",
              "Anatolian Plateau",
              "Lake Van"
          ],
          "biodiversityRating": "High (Mediterranean and Central Asian)",
          "ecosystems": [
              "Mediterranean forests",
              "Temperate deciduous forests",
              "Alpine meadows",
              "Steppe grasslands"
          ]
      },
      "adaptation": {
          "title": "Straits Control & Bridge Between Continents",
          "description": "Bosphorus and Dardanelles straits control gives Turkey geopolitical centrality.",
          "physiologicalAdaptation": "Adaptation to varied climates, from hot Mediterranean coasts to freezing Anatolian winters, with a diet rich in grains, olives, and dairy.",
          "technologicalAdaptation": "Historical construction of defensible cave cities in Cappadocia, and modern engineering control of the Turkish Straits alongside extensive earthquake retrofitting."
      },
      "anthropology": {
          "migrationHistory": "Ancient Anatolian civilizations; Hittites; Greeks; Romans; Byzantine period; Ottoman conquest; Turkification; modern Turkish nation-state",
          "ethnicComposition": [
              "Turkish ~70%",
              "Kurdish ~18%",
              "Other ~12%"
          ],
          "ancientEmpires": [
              "Hittite Empire",
              "Ionian Greeks",
              "Roman Asia",
              "Byzantine Empire",
              "Ottoman Empire",
              "Turkey"
          ],
          "socialStructures": "Secular nationalist republic transitioning toward religious conservatism; Kurdish tensions; recent Islamization."
      },
      "culture": {
          "insights": [
              "Ottoman architectural and artistic legacy",
              "Whirling Dervish Sufi mysticism",
              "Turkish coffee and hospitality traditions"
          ],
          "foodCulture": "Kebab, Meze (appetizers), Turkish Delight, Baklava; Mediterranean and Central Asian fusion.",
          "culturalIdentity": "Bridge between Europe and Asia; Ottoman heritage; modern secular-Islamic tension."
      },
      "economy": {
          "overview": "Upper-middle income; tourism, textiles, automotive, agriculture",
          "keyIndustries": [
              "Tourism",
              "Textiles and Apparel",
              "Automotive",
              "Agriculture",
              "Construction"
          ],
          "tradeLegacy": "Ottoman Empire spice and trade routes; Silk Road crossroads; modern tourism destination."
      },
      "aiAnalysis": "Turkey is the definitive geographic bridge between Europe and Asia, controlling the vital Bosphorus and Dardanelles straits that link the Black Sea to the Mediterranean. This location made the Anatolian peninsula a contested crossroads for empires, from the Hittites and Greeks to the Byzantines and Ottomans. The Ottoman Empire capitalized on this strategic bottleneck to build a vast, multiethnic empire spanning three continents. Following its collapse, the modern Turkish republic was forged on a model of secular nationalism, attempting to pivot toward European institutions while maintaining its deep Islamic heritage. Turkey's modern identity is a continuous negotiation between East and West, secularism and religious conservatism. Its economy is highly diversified, leveraging its position as a manufacturing hub and transit corridor for Eurasian energy."
  },
  SA: {
      "id": "SA",
      "name": "Saudi Arabia",
      "capital": "Riyadh",
      "population": "34 Million",
      "languages": [
          "Arabic"
      ],
      "religion": "Islam (predominantly Sunni) ~93%, Christianity ~5%, Other ~2%",
      "coordinates": [
          24.7136,
          46.6753
      ],
      "climate": {
          "type": "Desert",
          "description": "Extremely hot and arid; world's largest contiguous desert (Arabian Desert)",
          "temperatureRange": "-5°C (winter desert nights) to 50°C+ (summer)",
          "rainfallPattern": "Extremely minimal; less than 100mm annually in most areas"
      },
      "geography": {
          "terrain": "Vast desert plateau; central Najd highlands; coastal Red Sea and Persian Gulf plains",
          "features": [
              "Arabian Desert",
              "Rub' al Khali (Empty Quarter)",
              "Red Sea",
              "Persian Gulf"
          ],
          "biodiversityRating": "Low (Desert adapted fauna)",
          "ecosystems": [
              "Desert scrub",
              "Salt flats",
              "Coastal mangroves",
              "Oasis ecosystems"
          ]
      },
      "adaptation": {
          "title": "Desert Oasis Culture & Oil Wealth",
          "description": "Ancient caravan routes connected oases; modern oil wealth transformed desert kingdom.",
          "physiologicalAdaptation": "Bedouin genetic adaptations to extreme heat, low water consumption, and metabolic efficiency during long periods of desert travel.",
          "technologicalAdaptation": "Ancient oasis irrigation systems and camel domestication; modern deep-well water extraction, massive desalination plants, and climate-controlled urban glass towers."
      },
      "anthropology": {
          "migrationHistory": "Bedouin pastoralist and oasis agricultural traditions; Islamic revolution founded modern state; rapid modernization",
          "ethnicComposition": [
              "Arab ~90%",
              "South Asian migrants ~10%"
          ],
          "ancientEmpires": [
              "Pre-Islamic Arabian tribes",
              "Islamic Caliphate",
              "Ottoman period",
              "Saudi Arabia"
          ],
          "socialStructures": "Absolute monarchy; Wahhabi Islamic interpretation; strict social hierarchy; rapid modernization creating tensions."
      },
      "culture": {
          "insights": [
              "Sunni Islam orthodoxy influence",
              "Hajj pilgrimage to Mecca as center of Islamic world",
              "Recent modernization reshaping traditions"
          ],
          "foodCulture": "Kabsa (rice with meat), Falafel, Dates, Coffee (Arabic coffee); meat-based.",
          "culturalIdentity": "Guardian of Islam's holiest sites; oil-wealth power; conservative Islamic traditions."
      },
      "economy": {
          "overview": "Major oil and gas exporter; diversifying economy (Vision 2030)",
          "keyIndustries": [
              "Petroleum and Natural Gas",
              "Petrochemicals",
              "Construction",
              "Tourism",
              "Finance"
          ],
          "tradeLegacy": "Ancient incense and spice trade routes; modern oil dominance."
      },
      "aiAnalysis": "Saudi Arabia's civilization was forged in the hyper-arid wastes of the Arabian Desert. For millennia, the absolute scarcity of water restricted human habitation to scattered oases and forced the rise of Bedouin pastoralism. Survival demanded absolute loyalty to family and tribe, establishing an honor-based social structure where hospitality was a sacred duty to offset desert risks. The discovery of oil in 1938 dramatically rewrote Saudi history, transforming a poor desert kingdom into a global petro-superpower. The monarchy leveraged this immense wealth to rapidly construct ultra-modern cities, centralized infrastructure, and purchase regional influence, all while maintaining its alliance with conservative Wahhabi Islamic institutions. Today, Saudi Arabia is undergoing a major economic transition (Vision 2030) to diversify away from oil, representing a grand experiment in rapid modernization atop a deeply conservative tribal foundation."
  },
  IR: {
      "id": "IR",
      "name": "Iran",
      "capital": "Tehran",
      "population": "89 Million",
      "languages": [
          "Persian (Farsi)"
      ],
      "religion": "Islam (Shia ~90%, Sunni ~10%), Christianity ~1%, Other ~1%",
      "coordinates": [
          35.6892,
          51.389
      ],
      "climate": {
          "type": "Diverse: Temperate, Desert, Alpine",
          "description": "Ranges from Persian Gulf tropical coast to desert interior to alpine Alborz Mountains",
          "temperatureRange": "-20°C (mountains) to 50°C (deserts)",
          "rainfallPattern": "Mostly dry; Caspian coast wet; winter snow in mountains"
      },
      "geography": {
          "terrain": "Mountainous with central plateau (Iranian Plateau); deserts north and southeast",
          "features": [
              "Alborz Mountains",
              "Iranian Plateau",
              "Caspian Sea coast",
              "Persian Gulf",
              "Zagros Mountains"
          ],
          "biodiversityRating": "High (Mediterranean and desert endemics)",
          "ecosystems": [
              "Mountain forests",
              "Steppe grasslands",
              "Desert",
              "Caspian wetlands"
          ]
      },
      "adaptation": {
          "title": "Plateau & Mountain Civilization",
          "description": "Persian Empire built on mountain valleys and plateau control; qanats (underground aqueducts) manage water.",
          "physiologicalAdaptation": "Tolerance to extreme thermal ranges between high-altitude mountain winters and scorching desert summers.",
          "technologicalAdaptation": "Invention and maintenance of the Qanat water system (tunnels stretching tens of kilometers underground to prevent evaporation) and wind-catcher towers (badgirs) for passive air conditioning."
      },
      "anthropology": {
          "migrationHistory": "Indo-European Persians; ancient Persian Empire; Islamic conquest; Safavid Empire; Qajar dynasty; Islamic Revolution 1979",
          "ethnicComposition": [
              "Persian ~61%",
              "Azeri ~16%",
              "Kurdish ~10%",
              "Lur ~6%",
              "Other ~7%"
          ],
          "ancientEmpires": [
              "Achaemenid Empire",
              "Sassanid Empire",
              "Safavid Empire",
              "Persia/Iran"
          ],
          "socialStructures": "Islamic republic; theocratic rule; strong Persian cultural continuity; intellectual tradition."
      },
      "culture": {
          "insights": [
              "Persian philosophical and literary tradition",
              "Sufi mysticism heritage",
              "Carpet weaving art"
          ],
          "foodCulture": "Tahdig (crispy rice), Kebab, Pomegranate, Saffron; sophisticated flavor profiles.",
          "culturalIdentity": "Ancient Persian civilization pride; Islamic revolution identity; sophisticated intellectual tradition."
      },
      "economy": {
          "overview": "Oil-dependent; sanctions-affected; diversifying with tech sector",
          "keyIndustries": [
              "Oil and Gas",
              "Petrochemicals",
              "Mining",
              "Carpets",
              "Agriculture"
          ],
          "tradeLegacy": "Ancient Silk Road trader; Safavid carpet tradition; modern oil economy under sanctions."
      },
      "aiAnalysis": "Iran (historically Persia) is a high, mountainous plateau ringed by the Zagros and Alborz ranges. This defensive, elevated geography allowed the Persians to maintain a distinct, continuous cultural and linguistic identity despite waves of conquests by Greeks, Arabs, Mongols, and Turks. To farm the arid plateau, ancient Persians invented the qanat—a system of underground aqueducts that transported water from mountain aquifers to plains, enabling agricultural surpluses that sustained the Achaemenid and Safavid empires. Iran's conversion to Shia Islam in the 16th century further set it apart from its Sunni neighbors, creating a unique synthesis of Persian imperial pride and Islamic revolutionary fervor. Modern Iran's theocratic regime navigates geopolitical isolation and international sanctions, leveraging its vast oil reserves and highly educated population to assert regional influence."
  },
  ZA: {
      "id": "ZA",
      "name": "South Africa",
      "capital": "Pretoria (admin), Cape Town (legislative), Bloemfontein (judicial)",
      "population": "60 Million",
      "languages": [
          "Zulu",
          "Xhosa",
          "Afrikaans",
          "English",
          "9 total official languages"
      ],
      "religion": "Christianity ~78%, Unaffiliated ~16%, Islam ~2%, Hinduism ~1%, Other ~3%",
      "coordinates": [
          -33.9249,
          18.4241
      ],
      "climate": {
          "type": "Mediterranean, Temperate, Semi-Arid",
          "description": "Varies from Mediterranean southwest to subtropical east to semi-arid interior",
          "temperatureRange": "-5°C (mountains winter) to 40°C (interior)",
          "rainfallPattern": "Winter rains southwest; summer rains east; interior semi-arid"
      },
      "geography": {
          "terrain": "Plateau interior, coastal escarpments, mountain ranges",
          "features": [
              "Drakensberg Mountains",
              "Cape of Good Hope",
              "Kruger National Park",
              "Table Mountain"
          ],
          "biodiversityRating": "Mega-diverse (Cape Floral Region hotspot)",
          "ecosystems": [
              "Mediterranean shrublands",
              "Temperate grasslands",
              "Semi-arid savanna",
              "Forest patches"
          ]
      },
      "adaptation": {
          "title": "Megafauna Adaptation & Mining Economy",
          "description": "Unique megafauna evolved in isolation; modern diamond/gold mining transformed economy.",
          "physiologicalAdaptation": "Diverse adaptation across ethnic groups to varied sub-tropical and temperate climates, with high resilience to UV radiation.",
          "technologicalAdaptation": "Advanced deep-level mining technology (mining gold kilometers underground) and extensive dryland coal-to-liquid fuel production infrastructure."
      },
      "anthropology": {
          "migrationHistory": "San hunter-gatherers; Bantu migrations; European colonial settlement; slavery; apartheid regime 1948-1994; modern multicultural democracy",
          "ethnicComposition": [
              "Black African ~79%",
              "White ~9%",
              "Coloured (mixed) ~9%",
              "Indian/Asian ~3%"
          ],
          "ancientEmpires": [
              "San/Bushmen kingdoms",
              "Zulu Kingdom",
              "Boer Republics",
              "British South Africa",
              "Apartheid-era South Africa",
              "Modern South Africa"
          ],
          "socialStructures": "Former apartheid state; now constitutional democracy with 11 official languages; ongoing economic inequality."
      },
      "culture": {
          "insights": [
              "Ubuntu philosophy (humanity toward others)",
              "Anti-apartheid struggle legacy",
              "Jazz and music traditions"
          ],
          "foodCulture": "Biltong (dried meat), Bobotie (spiced meat dish), Bunny Chow, Traditional braai (BBQ).",
          "culturalIdentity": "Rainbow nation; reconciliation effort; African pride; inequality challenge."
      },
      "economy": {
          "overview": "Upper-middle income; diamonds, gold, platinum, manufacturing, services",
          "keyIndustries": [
              "Mining (Diamonds, Gold, Platinum)",
              "Manufacturing",
              "Agriculture",
              "Finance",
              "Tourism"
          ],
          "tradeLegacy": "Colonial extraction of diamonds and gold; modern regional economic leader."
      },
      "aiAnalysis": "South Africa is situated at the southern tip of the African continent, defined by a high interior plateau (Highveld) separated from the narrow coastal plains by a dramatic escarpment (Great Escarpment). Its temperate climate and rich soils supported diverse indigenous populations, from the San hunter-gatherers to Bantu-speaking farmers. The discovery of the world's largest deposits of diamonds and gold in the late 19th century transformed South Africa from an agrarian frontier into an industrial powerhouse, attracting British and Dutch colonial exploitation. This resource wealth funded the brutal, centralized social engineering of the Apartheid regime. The transition to a multiracial democracy in 1994, led by Nelson Mandela, established a progressive constitutional republic. Today, South Africa represents Africa's most industrialized economy, struggling to reconcile its mineral wealth and diverse cultural tapestry with severe historical inequality."
  },
  NG: {
      "id": "NG",
      "name": "Nigeria",
      "capital": "Abuja",
      "population": "223 Million",
      "languages": [
          "English (official)",
          "Hausa",
          "Yoruba",
          "Igbo",
          "500+ additional languages"
      ],
      "religion": "Islam ~54%, Christianity ~45%, Traditional religions ~1%",
      "coordinates": [
          9.0765,
          7.3986
      ],
      "climate": {
          "type": "Tropical & Subtropical",
          "description": "Tropical rainforest south; savanna center; semi-arid north; monsoon dependent",
          "temperatureRange": "15°C (north winter) to 35°C (year-round south)",
          "rainfallPattern": "Heavy in south (3000mm+); dry north; monsoon May-October"
      },
      "geography": {
          "terrain": "Rainforest south, savanna plains center, Sahel semi-arid north",
          "features": [
              "Niger River",
              "Benue River",
              "Gulf of Guinea",
              "Jos Plateau"
          ],
          "biodiversityRating": "High (West African endemics)",
          "ecosystems": [
              "Tropical rainforests",
              "Guinea savanna",
              "Sahel grasslands",
              "Coastal wetlands",
              "Mangrove deltas"
          ]
      },
      "adaptation": {
          "title": "Niger River Delta & Oil Economy",
          "description": "Niger River delta enabled agriculture and trade; modern oil economy dominates.",
          "physiologicalAdaptation": "High genetic resistance to malaria (sickle cell trait selection) and adaptation to high-humidity forest pathogen environments.",
          "technologicalAdaptation": "Traditional delta canoe transport and forest crop cultivation (yams, cassava) adapted to low-nutrient soils, alongside modern offshore deepwater oil extraction platforms."
      },
      "anthropology": {
          "migrationHistory": "Ancient West African kingdoms (Kanem-Bornu, Oyo Empire); British colonization; independence 1960; ethnic tensions; civil war 1967-70",
          "ethnicComposition": [
              "Yoruba ~21%",
              "Igbo ~18%",
              "Hausa ~21%",
              "Fulani ~14%",
              "Other ~26%"
          ],
          "ancientEmpires": [
              "Kanem-Bornu",
              "Oyo Empire",
              "Igbo city-states",
              "Benin Empire",
              "British Nigeria",
              "Nigeria"
          ],
          "socialStructures": "Federal republic; extreme ethnic and religious diversity; periodic communal violence; corruption pervasive."
      },
      "culture": {
          "insights": [
              "Nollywood film industry dominance in Africa",
              "West African music hub (Afrobeat, Afrobeats)",
              "Diverse ethnic and religious traditions"
          ],
          "foodCulture": "Jollof Rice, Pounded Yam with soups, Suya (grilled meat), Egusi; regional variations.",
          "culturalIdentity": "African giant; cultural leader; ethnic and religious tensions; entrepreneurial spirit."
      },
      "economy": {
          "overview": "Large oil-dependent economy; agriculture, telecommunications",
          "keyIndustries": [
              "Oil and Gas",
              "Agriculture",
              "Telecommunications",
              "Entertainment",
              "Financial Services"
          ],
          "tradeLegacy": "Ancient Saharan trade routes; slave trade impact; modern oil economy."
      },
      "aiAnalysis": "Nigeria is the demographic giant of Africa, spanning a diverse landscape that transitions from tropical rainforests along the Gulf of Guinea to the semi-arid Sahel in the north. This ecological divide created distinct civilizational poles: the forest belt fostered centralized kingdoms like Benin and Oyo, while the northern savanna connected to Trans-Saharan Islamic trade routes. Amalgamated by British colonial rule in 1914, Nigeria brought together over 250 ethnic groups, dominated by the Hausa-Fulani north, Yoruba southwest, and Igbo southeast. Upon independence, these deep ethnic and religious splits led to a devastating civil war (1967-1970) and subsequent military regimes. The discovery of oil in the Niger Delta transformed Nigeria into a petro-state. Today, Nigeria projects soft power across Africa through Nollywood and Afrobeat, leveraging its highly entrepreneurial and youthful population to build a massive tech and services market."
  },
  ES: {
      "id": "ES",
      "name": "Spain",
      "capital": "Madrid",
      "population": "48 Million",
      "languages": [
          "Spanish (Castilian)",
          "Catalan",
          "Basque",
          "Galician"
      ],
      "religion": "Roman Catholicism ~60%, Unaffiliated ~30%, Islam ~3%, Other ~7%",
      "coordinates": [
          40.4168,
          -3.7038
      ],
      "climate": {
          "type": "Mediterranean, Continental, Alpine",
          "description": "Mediterranean coasts temperate; continental interior; alpine Pyrenees",
          "temperatureRange": "0°C (mountains) to 35°C (coasts/interior)",
          "rainfallPattern": "Winter/spring rains; hot dry summers; interior semi-arid"
      },
      "geography": {
          "terrain": "Meseta (central plateau), mountain ranges, Mediterranean and Atlantic coasts",
          "features": [
              "Pyrenees",
              "Sierra Nevada",
              "Mediterranean Coast",
              "Atlantic Coast"
          ],
          "biodiversityRating": "High (Mediterranean hotspot)",
          "ecosystems": [
              "Mediterranean forests",
              "Temperate grasslands",
              "Alpine meadows",
              "Coastal wetlands"
          ]
      },
      "adaptation": {
          "title": "Plateau Civilization & Mediterranean Trade",
          "description": "Central plateau enabled kingdoms; Mediterranean coast drove trade and culture.",
          "physiologicalAdaptation": "Adaptation to Mediterranean climate rhythms, including heat-avoidance schedules (siesta) and diets optimized for cardiovascular health (Mediterranean diet).",
          "technologicalAdaptation": "Historical construction of extensive aqueducts and terrace farming on mountainous terrain, alongside modern high-speed rail networks (AVE) crossing challenging topography."
      },
      "anthropology": {
          "migrationHistory": "Iberian, Celtic, Roman, Visigothic, Islamic (Al-Andalus 711-1492), Christian reconquest, empire, civil war 1936-39, dictatorship 1939-75, modern democracy",
          "ethnicComposition": [
              "Spanish ~88%",
              "Other European ~5%",
              "North African ~4%",
              "Other ~3%"
          ],
          "ancientEmpires": [
              "Iberian kingdoms",
              "Roman Hispania",
              "Visigothic kingdom",
              "Islamic Al-Andalus",
              "Christian kingdoms",
              "Spanish Empire",
              "Spain"
          ],
          "socialStructures": "Constitutional monarchy; parliamentary democracy; regional autonomy tensions (Catalonia, Basque Country)."
      },
      "culture": {
          "insights": [
              "Flamenco and passionate artistic tradition",
              "Siesta and leisurely lifestyle concept",
              "Don Quixote literary legacy"
          ],
          "foodCulture": "Paella, Tapas, Jamón Ibérico, Gazpacho; regional wines and regional specialties.",
          "culturalIdentity": "Mediterranean sophistication, imperial history, regional passions, artistic tradition."
      },
      "economy": {
          "overview": "Advanced economy; tourism, agriculture, manufacturing, services",
          "keyIndustries": [
              "Tourism",
              "Agriculture (Olives, Wine, Citrus)",
              "Manufacturing",
              "Textiles",
              "Renewable Energy"
          ],
          "tradeLegacy": "Spanish Empire colonial power; Mediterranean trade routes; modern tourism dominant."
      },
      "aiAnalysis": "Spain occupies the Iberian Peninsula, separated from Europe by the Pyrenees and situated at the western gateway of the Mediterranean. This location made it a historical battlefield and synthesis point for Phoenician, Roman, Visigothic, and Islamic (Al-Andalus) civilizations. The 800-year Christian Reconquista culminated in 1492, initiating the Spanish Empire—the world's first global maritime empire funded by silver from the Americas. This colonial wealth, however, led to domestic economic stagnation and subsequent centuries of decline, culminating in a brutal Civil War (1936-1939) and decades of fascist dictatorship under Franco. Spain's transition to a modern constitutional monarchy in 1978 ushered in rapid modernization and integration into the European Union. Spain's modern identity is a vibrant synthesis of regional passions (Catalan, Basque, Andalusian) and a relaxed Mediterranean lifestyle supported by a major tourism and services economy."
  },
  AU: {
      "id": "AU",
      "name": "Australia",
      "capital": "Canberra",
      "population": "26 Million",
      "languages": [
          "English"
      ],
      "religion": "Christianity ~44%, Unaffiliated ~39%, Islam ~3.2%, Buddhism ~2.4%, Hinduism ~2.7%",
      "coordinates": [
          -35.2809,
          149.13
      ],
      "climate": {
          "type": "Arid Desert & Temperate Maritime",
          "description": "Dry and arid across the vast interior (Outback), transitioning to temperate climates along the southern and eastern coasts.",
          "temperatureRange": "5°C (winter night) to 45°C (summer day in Outback)",
          "rainfallPattern": "Highly variable; heavy monsoonal rain in the tropical north, winter-dominant rainfall in the south, and extremely sparse rainfall in the interior."
      },
      "geography": {
          "terrain": "Low plateau with deserts in the center, fertile plains in the southeast, and the Great Dividing Range along the east coast.",
          "features": [
              "Great Barrier Reef",
              "Uluru (Ayers Rock)",
              "Outback",
              "Murray-Darling River Basin",
              "Tasmania"
          ],
          "biodiversityRating": "Hyper-diverse (High rate of endemism due to isolation)",
          "ecosystems": [
              "Eucalypt forests",
              "Spinifex desert grasslands",
              "Tropical rainforests (Daintree)",
              "Alpine shrublands",
              "Coral reefs"
          ]
      },
      "adaptation": {
          "title": "Indigenous Firestick Farming & Dryland Water Management",
          "description": "Adapting to an extremely arid land through controlled fire management and highly efficient coastal urban settlement.",
          "physiologicalAdaptation": "Indigenous Australians developed metabolic adaptations to extreme heat and scarce water supplies over 65,000 years of continuous habitation.",
          "technologicalAdaptation": "Controlled burning (firestick farming) to regenerate ecosystems and prevent catastrophic wildfires; modern dryland farming and desalination networks."
      },
      "anthropology": {
          "migrationHistory": "Inhabited by Aboriginal and Torres Strait Islander peoples for at least 65,000 years. British colonization began in 1788 as a penal colony, followed by gold rushes and post-WWII European and Asian immigration.",
          "ethnicComposition": [
              "English/Irish/Scottish ~65%",
              "Other European ~15%",
              "Asian (Chinese, Indian, Vietnamese) ~12%",
              "Aboriginal and Torres Strait Islander ~3.8%"
          ],
          "ancientEmpires": [
              "Aboriginal nations (First Nations)",
              "British Colony of New South Wales",
              "Commonwealth of Australia"
          ],
          "socialStructures": "Egalitarian, multicultural federal democracy. Aboriginal culture maintains complex kinship and connection to country (Dreaming)."
      },
      "culture": {
          "insights": [
              "Indigenous connection to country and the concept of the Dreamtime (oral history of creation).",
              "Rugged egalitarianism and 'mateship' forged in the harsh frontier conditions.",
              "Outdoor-centric lifestyle focused on beaches, sports, and nature conservation."
          ],
          "foodCulture": "Based on British heritage with heavy Mediterranean and Asian influences. Traditional foods include Vegemite, damper bread, and lamb roasts, alongside indigenous 'bush tucker' (kangaroo, macadamia nuts).",
          "culturalIdentity": "A unique blend of the world's oldest continuous living culture, British institutional roots, and a modern, diverse Indo-Pacific outlook."
      },
      "economy": {
          "overview": "A wealthy, service-oriented economy driven by mineral exports, agriculture, and tourism.",
          "keyIndustries": [
              "Mining (Iron Ore, Coal, Gold)",
              "Financial Services",
              "Education and Tourism",
              "Agriculture (Wheat, Beef, Wine)"
          ],
          "tradeLegacy": "Transitioned from exporting wool and gold to the British Empire to supplying raw resources to major East Asian economies (China, Japan, South Korea)."
      },
      "aiAnalysis": "Australia's civilizational trajectory is a story of absolute geographical isolation. For 65,000 years, Indigenous Australians adapted to the continent's extreme aridity and nutrient-poor soils through nomadic fire-management, preserving ecological balance. The abrupt arrival of British colonization in 1788 introduced an urban, industrial system that clustered along the fertile coastlines, creating one of the most highly urbanized nations in the world. Australia's modern challenge is reconciling its ancient Indigenous heritage with its colonial institutional base, all while navigating its economic integration into the Indo-Pacific region as a resource superpower."
  },
  AE: {
      "id": "AE",
      "name": "United Arab Emirates",
      "capital": "Abu Dhabi",
      "population": "10 Million",
      "languages": [
          "Arabic"
      ],
      "religion": "Islam ~76%, Christianity ~9%, Hinduism ~7%, Buddhism ~1%, Other ~7%",
      "coordinates": [
          24.4539,
          54.3773
      ],
      "climate": {
          "type": "Desert",
          "description": "Hot, arid desert with coastal influence; extremely hot summers",
          "temperatureRange": "10°C (winter) to 50°C (summer)",
          "rainfallPattern": "Minimal precipitation; coastal areas slightly more moisture"
      },
      "geography": {
          "terrain": "Sandy desert with rocky outcrops; Persian Gulf coast; oases",
          "features": [
              "Persian Gulf Coast",
              "Rub' al Khali desert edge",
              "Hajar Mountains",
              "Palm Jumeirah"
          ],
          "biodiversityRating": "Low (Desert adapted)",
          "ecosystems": [
              "Desert",
              "Mangrove wetlands",
              "Coral reefs",
              "Salt marshes"
          ]
      },
      "adaptation": {
          "title": "Desert Transformation Through Oil & Innovation",
          "description": "Rapid transformation from pearl-diving economy to ultra-modern city-states through oil wealth and innovation."
      },
      "anthropology": {
          "migrationHistory": "Bedouin and pearl-diving heritage; British protectorate; independence 1971; massive immigrant influx",
          "ethnicComposition": [
              "Emirati ~11%",
              "South Asian ~60%",
              "Arab expatriates ~15%",
              "Western ~14%"
          ],
          "ancientEmpires": [
              "Pearl-diving emirates",
              "British protectorate",
              "UAE"
          ],
          "socialStructures": "Federal monarchy; Emirati minority wealthy ruling class; large immigrant laborer class; rigid hierarchy."
      },
      "culture": {
          "insights": [
              "Ultra-modern architecture and vision",
              "Bedouin heritage preservation",
              "Multi-cultural expatriate society"
          ],
          "foodCulture": "Traditional: Machboos, Falafel, Dates. Modern: international fusion cuisine.",
          "culturalIdentity": "Desert rose to global metropolis; innovation and tradition tension; small-nation soft power."
      },
      "economy": {
          "overview": "High-income; oil wealth, tourism, real estate, aviation, finance",
          "keyIndustries": [
              "Oil and Gas",
              "Tourism",
              "Real Estate",
              "Aviation",
              "Finance"
          ],
          "tradeLegacy": "Pearl diving heritage; oil discovery transformed economy; modern diversification."
      },
      "aiAnalysis": "The UAE represents one of history's most dramatic geographic transformations. Within a single generation, a collection of pearl-diving and fishing settlements on the edge of the Empty Quarter leveraged oil revenues to construct a post-oil economy before the oil ran out. The geographic constraint of a hyper-arid desert with no freshwater resources forced an absolute dependency on desalination and food imports, which in turn drove the state to become a global logistics and finance hub. The small citizen population (11%) governing a vast expatriate majority creates a unique social contract: the state provides cradle-to-grave welfare for citizens in exchange for political acquiescence, while expatriates accept limited rights for tax-free earnings. This model—geographic extremity converted into comparative advantage through sovereign wealth deployment—is the defining feature of the Gulf petro-state."
  },
  BD: {
      "id": "BD",
      "name": "Bangladesh",
      "capital": "Dhaka",
      "population": "170 Million",
      "languages": [
          "Bengali"
      ],
      "religion": "Islam ~90%, Hinduism ~8%, Buddhism ~1%, Christianity ~1%",
      "coordinates": [
          23.8103,
          90.4125
      ],
      "climate": {
          "type": "Tropical Monsoon",
          "description": "Hot and humid; cyclone-prone; heavy monsoon rains",
          "temperatureRange": "9°C (winter) to 34°C (summer)",
          "rainfallPattern": "Southwest monsoon June-October extremely wet; northeast monsoon mild"
      },
      "geography": {
          "terrain": "Entirely delta and alluvial plains; extremely low-lying; prone to flooding",
          "features": [
              "Ganges-Brahmaputra Delta",
              "Sundarbans mangroves",
              "Bay of Bengal"
          ],
          "biodiversityRating": "High (Mangrove and wetland ecosystems)",
          "ecosystems": [
              "Sundarbans mangrove forest (tiger habitat)",
              "River deltas",
              "Tropical forests"
          ]
      },
      "adaptation": {
          "title": "Delta Flood Management & Cyclone Resilience",
          "description": "Adapting to world's most flood-prone geography through traditional and modern water management."
      },
      "anthropology": {
          "migrationHistory": "Bengal region; Islamic sultanates; British colonial; partition creating East/West Pakistan; independence war 1971",
          "ethnicComposition": [
              "Bengali ~98%",
              "Chakma and other tribal minorities ~1.5%",
              "Bihari minority"
          ],
          "ancientEmpires": [
              "Maurya",
              "Gupta",
              "Pala",
              "Sena",
              "Bengal sultanate",
              "Mughal",
              "British Raj",
              "Bangladesh"
          ],
          "socialStructures": "Densely populated; strong community bonds; gender empowerment programs (microfinance pioneers)."
      },
      "culture": {
          "insights": [
              "Rabindranath Tagore's literary legacy",
              "Rickshaw art tradition",
              "Resilience and cooperative spirit"
          ],
          "foodCulture": "Biryani, Hilsa fish, Curries, Rice; Bengali sweets tradition.",
          "culturalIdentity": "Resilient, literary, densely communal; national pride in independence struggle."
      },
      "economy": {
          "overview": "Lower-middle income; garment manufacturing, agriculture, remittances",
          "keyIndustries": [
              "Garment Manufacturing",
              "Agriculture",
              "Remittances",
              "Jute",
              "Leather"
          ],
          "tradeLegacy": "Historic Bengal region prosperity; colonial resource extraction; modern garment factory hub."
      },
      "aiAnalysis": "Bangladesh is the world's most vivid test case for climate adaptation. Situated on the world's largest river delta, the country faces existential threats from sea-level rise, cyclonic intensification, and Himalayan glacial melt—all converging on a landmass the size of Iowa with 170 million people. Yet this same delta geography created one of history's most productive agricultural zones, supporting extreme population density that drives a distinctive social fabric: intense community interdependence, microfinance innovation (Grameen Bank), and a garment export sector that leverages low-cost labor into global integration. The country's developmental trajectory—from 'basket case' (Kissinger's 1971 dismissal) to lower-middle income with falling fertility and rising female labor participation—demonstrates how geographic vulnerability can catalyze institutional innovation. The critical question for the next half-century is whether Bangladesh's adaptive capacity can outpace the accelerating hydrological threats."
  },
  CH: {
      "id": "CH",
      "name": "Switzerland",
      "capital": "Bern",
      "population": "8.7 Million",
      "languages": [
          "German ~63%",
          "French ~23%",
          "Italian ~8%",
          "Romansh ~0.5%"
      ],
      "religion": "Roman Catholicism ~35%, Protestantism ~25%, Unaffiliated ~28%, Islam ~5%, Other ~7%",
      "coordinates": [
          46.8182,
          8.2275
      ],
      "climate": {
          "type": "Temperate Continental & Alpine",
          "description": "Alpine mountains dominate; lake regions temperate; extreme elevation variation",
          "temperatureRange": "-15°C (mountains) to 25°C (lowlands)",
          "rainfallPattern": "Year-round precipitation; 1500-2000mm in most regions; mountains higher"
      },
      "geography": {
          "terrain": "Alps occupy 60%; Jura mountains north; central plateau",
          "features": [
              "Alps",
              "Jura Mountains",
              "Lake Geneva",
              "Lake Zurich",
              "Matterhorn"
          ],
          "biodiversityRating": "High (Alpine endemics)",
          "ecosystems": [
              "Alpine meadows and grasslands",
              "Mountain forests",
              "Lakes",
              "Glaciers",
              "Temperate forests"
          ]
      },
      "adaptation": {
          "title": "Alpine Isolation & Precision Manufacturing",
          "description": "Mountain geography created Swiss independence; precision and reliability became cultural hallmarks."
      },
      "anthropology": {
          "migrationHistory": "Celtic and Roman settlements; Germanic and Romance migrations; Swiss independence achieved 1291",
          "ethnicComposition": [
              "Swiss German ~62%",
              "French Swiss ~23%",
              "Italian Swiss ~8%",
              "Other ~7%"
          ],
          "ancientEmpires": [
              "Celtic tribes",
              "Roman Helvetia",
              "Medieval cantons",
              "Swiss Confederation"
          ],
          "socialStructures": "Direct democracy; cantons have significant autonomy; egalitarian and consensus-based."
      },
      "culture": {
          "insights": [
              "Precision engineering and watchmaking",
              "Multilingual and multicultural harmony",
              "Neutrality and diplomacy tradition"
          ],
          "foodCulture": "Fondue, Raclette, Chocolate, Cheese; regional Alpine traditions; high dairy culture.",
          "culturalIdentity": "Precision, neutrality, independence, quality, multilingual harmony."
      },
      "economy": {
          "overview": "High-income; banking, pharmaceuticals, precision manufacturing, tourism",
          "keyIndustries": [
              "Banking and Finance",
              "Pharmaceuticals",
              "Precision Manufacturing",
              "Watches",
              "Tourism"
          ],
          "tradeLegacy": "Medieval mountain independence; modern finance and precision hub."
      },
      "aiAnalysis": "Switzerland is a study in how geographic fragmentation becomes institutional strength. The Alps did not merely protect the Swiss from invasion; they fragmented the territory into isolated valleys that evolved distinct languages, cultures, and governance traditions, forcing the invention of a confederal system that manages extreme diversity through decentralization and consensus. This political architecture—direct democracy, cantonal sovereignty, armed neutrality—is a direct translation of mountain geography into institutional design. Economically, the lack of natural resources and the difficulty of agriculture on steep slopes pushed the population toward high-value, low-volume exports: precision instruments, pharmaceuticals, banking services, and luxury goods. The result is a country that has turned geographic constraints into comparative advantages, achieving one of the world's highest standards of living while maintaining a unique position outside both the EU and NATO. The climate threat to this model is direct: glacier retreat threatens water security, tourism revenue, and the very Alpine identity that underpins the national narrative."
  },
  ET: {
      "id": "ET",
      "name": "Ethiopia",
      "capital": "Addis Ababa",
      "population": "120 Million",
      "languages": [
          "Amharic (official)",
          "Oromifa",
          "Tigrinya",
          "Somali",
          "80+ total"
      ],
      "religion": "Ethiopian Orthodox Christianity ~44%, Islam ~34%, Protestantism ~18%, Other ~4%",
      "coordinates": [
          9.032,
          38.7469
      ],
      "climate": {
          "type": "Highland Tropical & Semi-Arid",
          "description": "Varies with elevation from hot semi-arid lowlands to temperate highlands",
          "temperatureRange": "0°C (highlands) to 40°C (lowlands)",
          "rainfallPattern": "Heavy June-September; dry October-May; highly variable causing droughts"
      },
      "geography": {
          "terrain": "East African highlands with the Great Rift Valley; lowland plains",
          "features": [
              "Ethiopian Highlands",
              "Great Rift Valley",
              "Lake Tana",
              "Danakil Depression"
          ],
          "biodiversityRating": "High (Endemic species - Ethiopian Wolf, Gelada Baboon)",
          "ecosystems": [
              "Mountain grasslands",
              "Afromontane forests",
              "Rift Valley lakes",
              "Semi-arid lowlands"
          ]
      },
      "adaptation": {
          "title": "Highland Kingdom & Teff Agriculture",
          "description": "Mountain geography enabled independent kingdom history; teff grain staple."
      },
      "anthropology": {
          "migrationHistory": "Ancient Axumite Kingdom; never colonized; unique Ge'ez script and Ethiopian Orthodox Christianity; Oromo/Amhara tensions",
          "ethnicComposition": [
              "Amhara ~27%",
              "Oromo ~34%",
              "Tigray ~7%",
              "Somali ~6%",
              "Other ~26%"
          ],
          "ancientEmpires": [
              "Axumite Empire",
              "Zagwe Dynasty",
              "Solomonic Dynasty",
              "Ethiopia"
          ],
          "socialStructures": "Federal democratic republic; ethnic federalism causing tensions; recent civil conflict 2020-22."
      },
      "culture": {
          "insights": [
              "Unique Ge'ez script (only African written script with ancient origins)",
              "Ethiopian Orthodox Christianity tradition",
              "Coffee ceremony cultural centerpiece"
          ],
          "foodCulture": "Injera (flatbread base for stews), Doro Wot (chicken stew), Misir Wot (lentils); communal eating.",
          "culturalIdentity": "Ancient kingdom pride; African independence symbol; diversity and language richness."
      },
      "economy": {
          "overview": "Low-income; agriculture-based; hydropower potential; growing manufacturing",
          "keyIndustries": [
              "Agriculture",
              "Livestock",
              "Textiles",
              "Hydropower",
              "Mining"
          ],
          "tradeLegacy": "Ancient Axumite trade routes; ancient coffee origin; modern development focus."
      },
      "aiAnalysis": "Ethiopia is Africa's geographic anomaly: a highland island rising from the surrounding lowlands, creating a distinct ecological and cultural zone that resisted colonization while incubating one of the world's oldest continuous state traditions. The Ethiopian Highlands—a massive volcanic plateau bisected by the Great Rift Valley—created a 'roof of Africa' where unique species, the continent's only indigenous script (Ge'ez), and a form of Christianity (Ethiopian Orthodox) with direct links to early antiquity survived in isolation. This geographic insulation allowed the Solomonic dynasty to claim 3,000 years of continuity, a narrative that underpins modern national identity. However, the same highlands fragment the country into distinct ethnic territories, fueling the federal ethnic politics that now threaten unity. The Grand Ethiopian Renaissance Dam on the Blue Nile represents the latest attempt to harness geographic advantage (hydropower potential) for development, but it places Ethiopia in direct hydro-political conflict with downstream Egypt and Sudan. The country's future hinges on whether its highland unity can transcend its ethnic geography."
  },
  IL: {
      "id": "IL",
      "name": "Israel",
      "capital": "Jerusalem",
      "population": "9.3 Million",
      "languages": [
          "Hebrew"
      ],
      "religion": "Judaism ~74%, Islam ~17%, Christianity ~2%, Druze ~1%, Other ~6%",
      "coordinates": [
          31.7683,
          35.2137
      ],
      "climate": {
          "type": "Mediterranean & Desert",
          "description": "Mediterranean coast temperate; interior desert hot; complex regional variation",
          "temperatureRange": "5°C (winter) to 40°C (summer)",
          "rainfallPattern": "Concentrated in winter; extremely dry summers; Negev Desert very arid"
      },
      "geography": {
          "terrain": "Mediterranean coast, Judean Hills, Jordan Rift Valley, Negev Desert",
          "features": [
              "Dead Sea (lowest point on Earth)",
              "Mediterranean Sea",
              "Jordan River",
              "Negev Desert",
              "Mount Hermon"
          ],
          "biodiversityRating": "High (Mediterranean and desert crossroads)",
          "ecosystems": [
              "Mediterranean forests",
              "Desert ecosystems",
              "River wetlands",
              "Salt water seas"
          ]
      },
      "adaptation": {
          "title": "Desert Water Management & Technological Innovation",
          "description": "Drip irrigation and water technology enable desert agriculture and life."
      },
      "anthropology": {
          "migrationHistory": "Ancient Jewish kingdoms; Roman diaspora; European Zionist immigration; Arab-Israeli conflict; Palestinian territories dispute",
          "ethnicComposition": [
              "Jewish ~75%",
              "Arab Israeli ~21%",
              "Other ~4%"
          ],
          "ancientEmpires": [
              "Davidic Kingdom",
              "Divided Kingdom (Israel/Judah)",
              "Jewish Diaspora",
              "Ottoman",
              "British Mandate",
              "Israel"
          ],
          "socialStructures": "Jewish state; democratic with Arab minority; occupied territories governance disputed; military-focused society."
      },
      "culture": {
          "insights": [
              "Jewish diaspora return and continuous cultural tradition",
              "Hebrew language revival",
              "Palestinian cultural resistance"
          ],
          "foodCulture": "Falafel, Hummus, Shakshuka, Mediterranean influences; kosher dietary laws impact.",
          "culturalIdentity": "Ancient biblical roots; modern nation-state; conflict and coexistence tensions."
      },
      "economy": {
          "overview": "High-income technology powerhouse; tourism, agriculture, defense industries",
          "keyIndustries": [
              "Technology and Software",
              "Defense Industries",
              "Tourism",
              "Agriculture",
              "Diamonds"
          ],
          "tradeLegacy": "Ancient trade routes; diaspora financial networks; modern tech innovation hub."
      },
      "aiAnalysis": "Israel represents a unique civilizational experiment: a people returning to an ancestral geography after two millennia of diaspora, armed with modern science and determined to overcome the same environmental constraints—water scarcity, desert soils, hostile neighbors—that challenged ancient kingdoms. The geographic logic is inescapable: the coastal plain and Jordan Valley offer the only arable land and freshwater, concentrating population and infrastructure in a narrow strip vulnerable to interruption. This geographic compression drove the development of world-leading water technology (drip irrigation, desalination, wastewater recycling) and a defense industry born of existential insecurity. The resulting innovation ecosystem—'Startup Nation'—exports the technologies of survival globally. Yet the unresolved territorial dispute over the West Bank and Gaza, rooted in overlapping historical claims to the same hills and aquifers, demonstrates that technology cannot dissolve geographic competition. Israel's 21st-century challenge is whether a high-tech, water-secure society can achieve political stability in a geography that has resisted it for three millennia."
  },
  IQ: {
      "id": "IQ",
      "name": "Iraq",
      "capital": "Baghdad",
      "population": "40 Million",
      "languages": [
          "Arabic",
          "Kurdish"
      ],
      "religion": "Islam (Shia ~60%, Sunni ~37%), Christianity ~1%, Other ~2%",
      "coordinates": [
          33.2232,
          43.6793
      ],
      "climate": {
          "type": "Desert & Subtropical",
          "description": "Hot desert interior; subtropical Mesopotamian marshes and river valleys",
          "temperatureRange": "5°C (winter) to 50°C+ (summer)",
          "rainfallPattern": "Minimal; concentrate in winter and spring; extremely dry summers"
      },
      "geography": {
          "terrain": "Mesopotamian plains between Tigris and Euphrates; western desert, northern mountains",
          "features": [
              "Tigris River",
              "Euphrates River",
              "Mesopotamian Marshes",
              "Zagros Mountains"
          ],
          "biodiversityRating": "Moderate (River-dependent)",
          "ecosystems": [
              "Mesopotamian marshes",
              "Date palm groves",
              "Desert",
              "Mountain forests"
          ]
      },
      "adaptation": {
          "title": "Mesopotamian River Civilization",
          "description": "Tigris-Euphrates river control enabled world's earliest urban civilizations."
      },
      "anthropology": {
          "migrationHistory": "Sumerian, Akkadian, Babylonian, Assyrian ancient kingdoms; Islamic caliphates; Ottoman rule; British mandate; modern Iraq; Sunni-Shia tensions",
          "ethnicComposition": [
              "Arab ~75%",
              "Kurdish ~15%",
              "Turkmen ~3%",
              "Other ~7%"
          ],
          "ancientEmpires": [
              "Sumer",
              "Akkad",
              "Babylon",
              "Assyria",
              "Abbasid Caliphate",
              "Ottoman",
              "Iraq"
          ],
          "socialStructures": "Federal democratic republic; ethnic (Arab-Kurd) and sectarian (Sunni-Shia) tensions; ongoing instability."
      },
      "culture": {
          "insights": [
              "Cradle of civilization pride",
              "Islamic scholarship tradition",
              "Shia pilgrimage destinations"
          ],
          "foodCulture": "Masgouf (grilled fish), Biryani, Kebab, Date syrup; Mesopotamian heritage.",
          "culturalIdentity": "Ancient Mesopotamian legacy; Islamic center; war-torn present; resilience."
      },
      "economy": {
          "overview": "Oil-dependent; war-damaged; reconstruction ongoing",
          "keyIndustries": [
              "Oil and Gas",
              "Agriculture",
              "Construction",
              "Services"
          ],
          "tradeLegacy": "Ancient Mesopotamia birthplace; modern oil wealth; regional conflict impact."
      },
      "aiAnalysis": "Iraq is the geographic crucible of human civilization. The Tigris-Euphrates river system created the alluvial plain where writing, the wheel, the city, the state, and organized religion first emerged—Mesopotamia, 'the land between the rivers.' This same geography, however, has no natural barriers, making it a perpetual corridor for invasion: Persians, Greeks, Mongols, Ottomans, British, Americans. The modern state, drawn by colonial cartographers in 1920, fused three Ottoman vilayets (Mosul, Baghdad, Basra) containing distinct populations—Kurds in the north, Sunnis in the center, Shia in the south—into a single territory dependent on oil revenue and strongman rule. When the center weakens, the geographic logic reasserts itself: Kurdish autonomy in the mountains, Shia alignment with Iran in the south, Sunni insurgency in the western desert. Iraq's 21st-century trajectory depends on whether a federal system can accommodate this geographic pluralism, or whether the country fragments along the fault lines that have defined it since the first city-states contested control of the rivers."
  },
  KE: {
      "id": "KE",
      "name": "Kenya",
      "capital": "Nairobi",
      "population": "54 Million",
      "languages": [
          "English",
          "Swahili"
      ],
      "religion": "Christianity ~83%, Islam ~11%, Other ~6%",
      "coordinates": [
          -1.2921,
          36.8219
      ],
      "climate": {
          "type": "Tropical & Semi-Arid",
          "description": "Varies from humid coastal tropics to dry savannas to alpine highlands",
          "temperatureRange": "10°C (highlands) to 35°C (coasts/plains)",
          "rainfallPattern": "Bimodal rains; long rains March-May, short rains October-December"
      },
      "geography": {
          "terrain": "Coastal plains, highlands, Great Rift Valley, savanna",
          "features": [
              "Mount Kenya",
              "Great Rift Valley",
              "Indian Ocean Coast",
              "Serengeti/Masai Mara",
              "Lake Victoria"
          ],
          "biodiversityRating": "High (African megafauna)",
          "ecosystems": [
              "Tropical coral reefs",
              "Mangrove forests",
              "Savanna grasslands",
              "Highland forests",
              "Semi-arid lowlands"
          ]
      },
      "adaptation": {
          "title": "Great Rift Valley Pastoralism & Savanna Ecology",
          "description": "Pastoralist and hunter-gatherer adaptation to diverse climate zones."
      },
      "anthropology": {
          "migrationHistory": "Ancient Swahili city-states; Bantu and Nilotic migrations; Arab and Persian influence; British colonization; independence 1963; modern development",
          "ethnicComposition": [
              "Kikuyu ~22%",
              "Luhya ~14%",
              "Kalenjin ~14%",
              "Luo ~10%",
              "Kamba ~10%",
              "Other ~30%"
          ],
          "ancientEmpires": [
              "Swahili city-states",
              "British East Africa",
              "Kenya"
          ],
          "socialStructures": "Constitutional republic; presidential system; ethnic tensions in politics; developing democracy."
      },
      "culture": {
          "insights": [
              "Swahili language and coastal culture",
              "Maasai pastoralist culture and ceremonies",
              "Safari tourism culture"
          ],
          "foodCulture": "Ugali (corn porridge), Sukuma Wiki (kale), Nyama Choma (grilled meat), Matoke (plantain).",
          "culturalIdentity": "East African hub; wildlife and conservation focus; diverse ethnic heritage."
      },
      "economy": {
          "overview": "Lower-middle income; tourism, agriculture, technology (Nairobi tech hub)",
          "keyIndustries": [
              "Tourism",
              "Agriculture",
              "Technology and Innovation",
              "Manufacturing",
              "Services"
          ],
          "tradeLegacy": "Ancient Swahili trade routes; colonial cash crop economy; modern regional tech leader."
      },
      "aiAnalysis": "Kenya's geography is a cross-section of Africa itself: Indian Ocean coast, equatorial savanna, the Great Rift Valley slicing the country north-south, and highland plateaus hosting the capital and the majority of the population. This geographic diversity created an equally diverse human ecology—Swahili merchant culture on the coast, Bantu agriculturalists in the central highlands, Nilotic pastoralists in the Rift Valley, and hunter-gatherers in the northern deserts. The British colonial project exploited this geography for settler agriculture in the 'White Highlands,' creating the land grievances that fueled the Mau Mau uprising and post-independence politics. Today, Kenya leverages its geographic position as East Africa's gateway: the Port of Mombasa serves landlocked neighbors, Nairobi hosts the region's tech and finance hubs, and the Masai Mara drives a tourism economy built on the megafauna that the Rift Valley grasslands sustain. The climate vulnerability is acute—drought cycles devastate pastoralists, while rising temperatures push coffee and tea cultivation upslope—but the country's geographic centrality and institutional depth (relative to neighbors) make it the anchor of East African integration."
  },
  LK: {
      "id": "LK",
      "name": "Sri Lanka",
      "capital": "Colombo",
      "population": "22 Million",
      "languages": [
          "Sinhala",
          "Tamil"
      ],
      "religion": "Buddhism ~70.2%, Hinduism ~12.6%, Islam ~9.7%, Christianity ~7.4%",
      "coordinates": [
          6.9271,
          80.7744
      ],
      "climate": {
          "type": "Tropical Monsoon",
          "description": "Hot and humid; two monsoons; high elevation areas cooler",
          "temperatureRange": "16°C (highlands) to 32°C (coasts)",
          "rainfallPattern": "Southwest monsoon May-September on west; northeast monsoon December-February on east"
      },
      "geography": {
          "terrain": "Island nation; central highlands, coastal plains, dense forests",
          "features": [
              "Central Highlands",
              "Adam's Peak",
              "Tea plantations",
              "Beaches",
              "Lagoons"
          ],
          "biodiversityRating": "High (Island endemics)",
          "ecosystems": [
              "Tropical rainforests",
              "Dry deciduous forests",
              "Mangrove lagoons",
              "Coral reefs"
          ]
      },
      "adaptation": {
          "title": "Island Ecology & Tea Plantation Culture",
          "description": "Tea cultivation on central hills; colonial-era landscape transformation."
      },
      "anthropology": {
          "migrationHistory": "Early Sinhalese and Tamil settlements; Buddhist kingdom legacy; Portuguese, Dutch, British colonization; civil war 1983-2009",
          "ethnicComposition": [
              "Sinhalese ~75%",
              "Sri Lankan Tamil ~18%",
              "Sri Lankan Moor ~7%"
          ],
          "ancientEmpires": [
              "Sinhalese kingdoms",
              "Tamil kingdoms",
              "Chola invasions",
              "Portuguese/Dutch/British colonial",
              "Sri Lanka"
          ],
          "socialStructures": "Buddhist majority Sinhalese dominant; Tamil minority; post-civil war reconciliation ongoing."
      },
      "culture": {
          "insights": [
              "Ancient Buddhist temple traditions",
              "Sigiriya rock fortress art",
              "Tea plantation heritage"
          ],
          "foodCulture": "Curry with rice, Hoppers, Lamprais, Fresh tropical fruits; fiery spices.",
          "culturalIdentity": "Buddhist civilization; island identity; recovering from ethnic conflict."
      },
      "economy": {
          "overview": "Lower-middle income; tea, tourism, garments, agriculture",
          "keyIndustries": [
              "Tea Cultivation",
              "Tourism",
              "Garments",
              "Rubber",
              "Cinnamon"
          ],
          "tradeLegacy": "Ancient spice trade hub; colonial tea plantation economy; modern tourist destination."
      },
      "aiAnalysis": "Sri Lanka is a textbook case of island biogeography shaping human history. The island's separation from the Indian subcontinent by the Palk Strait allowed distinct evolutionary and cultural trajectories—endemic species, a Sinhalese-Buddhist civilization with its own script and chronicle tradition (Mahavamsa), and a Tamil-Hindu minority with deep ties to South India. The central highlands, rising to 2,500 meters, created a climatic elevator: tropical coasts, temperate mid-slopes ideal for the tea plantations that became the colonial economy's backbone, and cloud forests hosting unique biodiversity. This same topography, however, enabled the protracted civil war: the LTTE used the northern jungles and the eastern coastline as rear bases, while the government controlled the central highlands and the southwest. The war's end in 2009 did not resolve the geographic tension; it merely shifted it to post-war reconstruction, demographic engineering, and the strategic competition between India and China for influence over the island's Deep South ports (Hambantota, Colombo). Sri Lanka's future depends on whether its insular geography becomes a platform for Indo-Pacific connectivity or a cockpit for great-power rivalry."
  },
  NP: {
      "id": "NP",
      "name": "Nepal",
      "capital": "Kathmandu",
      "population": "30 Million",
      "languages": [
          "Nepali"
      ],
      "religion": "Hinduism ~81.3%, Buddhism ~9%, Islam ~4.4%, Christianity ~1.4%",
      "coordinates": [
          27.7172,
          85.324
      ],
      "climate": {
          "type": "Alpine, Temperate, Subtropical",
          "description": "Varies dramatically with elevation from subtropical lowlands to alpine high mountains",
          "temperatureRange": "-40°C (Himalayas) to 30°C (lowlands)",
          "rainfallPattern": "Monsoon June-September brings 80% of annual rain; dry winter"
      },
      "geography": {
          "terrain": "Himalayan mountain kingdom; high peaks, deep valleys",
          "features": [
              "Mount Everest",
              "Kathmandu Valley",
              "Annapurna",
              "Pokhara Valley"
          ],
          "biodiversityRating": "High (Alpine and subtropical endemics)",
          "ecosystems": [
              "Alpine meadows",
              "Temperate forests",
              "Subtropical forests",
              "River gorges"
          ]
      },
      "adaptation": {
          "title": "High Mountain Adaptation",
          "description": "Adapting to extreme altitude through Sherpa expertise and agricultural terrace systems."
      },
      "anthropology": {
          "migrationHistory": "Indigenous Newars in Kathmandu Valley; Tibetan migrations; Hindu kingdoms; British influence but never colonized",
          "ethnicComposition": [
              "Chhettri ~16%",
              "Newar ~6%",
              "Sherpa ~3%",
              "Magar ~7%",
              "Other ~68%"
          ],
          "ancientEmpires": [
              "Newari kingdoms",
              "Malla kingdoms",
              "Shah dynasty",
              "Nepal"
          ],
          "socialStructures": "Feudal Hindu kingdom transitioning to federal democratic republic; high caste-ethnic complexity."
      },
      "culture": {
          "insights": [
              "Hindu-Buddhist syncretism",
              "Sherpa mountaineering tradition",
              "Newari architectural heritage"
          ],
          "foodCulture": "Dal Bhat (lentils and rice), Momos (dumplings), Naan, Gundruk (fermented vegetables).",
          "culturalIdentity": "Mountain spirit, Himalayan guardian, ancient civilization sanctuary."
      },
      "economy": {
          "overview": "Least developed country; agriculture, tourism (Everest), remittances",
          "keyIndustries": [
              "Agriculture",
              "Tourism",
              "Remittances",
              "Hydropower",
              "Handicrafts"
          ],
          "tradeLegacy": "Tea and spice trade routes; Sherpa guides legacy; modern trekking destination."
      },
      "aiAnalysis": "Nepal is geography as destiny in its purest form. The Himalayas are not merely a border; they are the country's defining feature—creating a vertical ecology that compresses tropical jungles and arctic peaks into a horizontal distance of 150 kilometers. This extreme elevation gradient forced a unique adaptation: the only Hindu kingdom in a Buddhist mountain world, a buffer state between two civilizational giants (India and China) that was never formally colonized because its mountains made conquest more trouble than it was worth. The Kathmandu Valley, a lacustrine basin at 1,400 meters, became a cultural petri dish where Newar artisans synthesized Indian and Tibetan aesthetics into a unique urban civilization. Today, the same geography drives the economy: hydropower potential from Himalayan rivers, tourism revenue from eight of the world's fourteen 8,000-meter peaks, and remittances from a diaspora driven abroad by the lack of arable land. But climate change is melting the glaciers that feed the rivers, earthquakes (like the 2015 Gorkha quake) periodically devastate the valleys, and the country's landlocked position makes it dependent on Indian transit routes. Nepal's survival has always been a negotiation with its mountains; the 21st century tests whether that negotiation can succeed under accelerating environmental change."
  },
  PK: {
      "id": "PK",
      "name": "Pakistan",
      "capital": "Islamabad",
      "population": "231 Million",
      "languages": [
          "Urdu (official)",
          "English",
          "Punjabi",
          "Sindhi",
          "Pashto"
      ],
      "religion": "Islam ~96%, Christianity ~1.6%, Hinduism ~1.6%, Other ~1%",
      "coordinates": [
          33.6844,
          73.0479
      ],
      "climate": {
          "type": "Diverse: Alpine, Subtropical, Arid",
          "description": "Himalayas north, Indus plains, Thar Desert south; extreme variation",
          "temperatureRange": "-40°C (north) to 50°C (south)",
          "rainfallPattern": "Monsoon concentrated June-September; west and south semi-arid to arid"
      },
      "geography": {
          "terrain": "Mountainous north (Himalayas, Karakoram), fertile Indus plains, Thar Desert south",
          "features": [
              "Himalayas",
              "Indus River",
              "Karakoram Range",
              "K2",
              "Thar Desert"
          ],
          "biodiversityRating": "High (Alpine and desert ecosystems)",
          "ecosystems": [
              "Alpine meadows",
              "Temperate forests",
              "Desert scrub",
              "River wetlands"
          ]
      },
      "adaptation": {
          "title": "Indus River Basin Civilization",
          "description": "Indus Valley legacy of urban planning; modern irrigation networks."
      },
      "anthropology": {
          "migrationHistory": "Indus Valley Civilization; Aryan migrations; Islamic sultanates; Mughal Empire; British Raj; Partition from India 1947",
          "ethnicComposition": [
              "Punjabi ~44%",
              "Pashtun ~15%",
              "Sindhi ~14%",
              "Saraiki ~8%",
              "Other ~19%"
          ],
          "ancientEmpires": [
              "Indus Valley",
              "Maurya",
              "Mughal",
              "British Raj",
              "Pakistan"
          ],
          "socialStructures": "Islamic republic; strong family and tribal structures; recent democratization."
      },
      "culture": {
          "insights": [
              "Sufi Islamic mysticism traditions",
              "Partition trauma and ongoing India tensions",
              "Urdu literary tradition"
          ],
          "foodCulture": "Biryani, Tandoori, Naan, Samosas; complex spice blends; meat-heavy.",
          "culturalIdentity": "Islamic identity central; troubled history with India; resilience despite challenges."
      },
      "economy": {
          "overview": "Lower-middle income; agriculture, textiles, services; ongoing crises",
          "keyIndustries": [
              "Textiles",
              "Agriculture",
              "Construction",
              "IT",
              "Energy"
          ],
          "tradeLegacy": "Indus Valley heritage; British colonial infrastructure; modern textile exporter."
      },
      "aiAnalysis": "Pakistan is a geographic paradox: a state created by religious ideology in a territory defined by the Indus River, yet its borders were drawn by a departing British lawyer (Cyril Radcliffe) in five weeks, slicing through Punjab and Bengal without regard for hydrology or demography. The Indus—the lifeline of the Indus Valley Civilization, the artery of Mughal agriculture, the foundation of modern irrigation—flows the length of the country, but its headwaters lie in Indian-administered Kashmir and its delta is degrading due to upstream extraction. The mountain north (Karakoram, Hindu Kush, Himalayas) provides water security and strategic depth but isolates the country from Central Asia. The western border with Afghanistan (the Durand Line) cuts through Pashtun tribal lands, making it porous to insurgency. The southern coast gives access to the Arabian Sea but the port of Karachi is the only major outlet. Pakistan's strategic obsession with 'strategic depth' in Afghanistan and its rivalry with India are direct expressions of geographic insecurity: a country that is long, narrow, water-dependent, and strategically encircled. The nuclear deterrent was developed to compensate for conventional geographic disadvantage. Whether Pakistan can transition from a security state to a developmental state depends on whether it can leverage its geography—Indus agriculture, mountain tourism, China-Pakistan Economic Corridor connectivity—rather than be constrained by it."
  }
,
};

export const countriesDataArray = Object.values(countriesData);
