const fs = require('fs');

// Read both files
const countriesDataContent = fs.readFileSync('src/data/countriesData.ts', 'utf8');
const allCountriesContent = fs.readFileSync('src/data/allCountriesComprehensive.ts', 'utf8');

// Extract country IDs from countriesData.ts (keys like EG:, JP:)
const countriesDataIds = new Set();
const countriesDataMatches = countriesDataContent.match(/^\s*([A-Z]{2}):\s*{/gm);
if (countriesDataMatches) {
  countriesDataMatches.forEach(match => {
    const id = match.match(/^\s*([A-Z]{2}):/)[1];
    countriesDataIds.add(id);
  });
}

// Parse allCountriesComprehensive to get full country data
// This is a simplified approach - we'll manually add the 10 missing countries

// The 10 missing countries from allCountriesComprehensive that need to be added to countriesData:
// AE, BD, CH, ET, IL, IQ, KE, LK, NP, PK

// We'll create the full country entries for these 10 countries with aiAnalysis

const missingCountries = [
  {
    id: "AE",
    name: "United Arab Emirates",
    capital: "Abu Dhabi",
    population: "10 Million",
    languages: ["Arabic"],
    religion: "Islam ~76%, Christianity ~9%, Hinduism ~7%, Buddhism ~1%, Other ~7%",
    coordinates: [24.4539, 54.3773],
    climate: { type: "Desert", description: "Hot, arid desert with coastal influence; extremely hot summers", temperatureRange: "10°C (winter) to 50°C (summer)", rainfallPattern: "Minimal precipitation; coastal areas slightly more moisture" },
    geography: { terrain: "Sandy desert with rocky outcrops; Persian Gulf coast; oases", features: ["Persian Gulf Coast", "Rub' al Khali desert edge", "Hajar Mountains", "Palm Jumeirah"], biodiversityRating: "Low (Desert adapted)", ecosystems: ["Desert", "Mangrove wetlands", "Coral reefs", "Salt marshes"] },
    adaptation: { title: "Desert Transformation Through Oil & Innovation", description: "Rapid transformation from pearl-diving economy to ultra-modern city-states through oil wealth and innovation." },
    anthropology: { migrationHistory: "Bedouin and pearl-diving heritage; British protectorate; independence 1971; massive immigrant influx", ethnicComposition: ["Emirati ~11%", "South Asian ~60%", "Arab expatriates ~15%", "Western ~14%"], ancientEmpires: ["Pearl-diving emirates", "British protectorate", "UAE"], socialStructures: "Federal monarchy; Emirati minority wealthy ruling class; large immigrant laborer class; rigid hierarchy." },
    culture: { insights: ["Ultra-modern architecture and vision", "Bedouin heritage preservation", "Multi-cultural expatriate society"], foodCulture: "Traditional: Machboos, Falafel, Dates. Modern: international fusion cuisine.", culturalIdentity: "Desert rose to global metropolis; innovation and tradition tension; small-nation soft power." },
    economy: { overview: "High-income; oil wealth, tourism, real estate, aviation, finance", keyIndustries: ["Oil and Gas", "Tourism", "Real Estate", "Aviation", "Finance"], tradeLegacy: "Pearl diving heritage; oil discovery transformed economy; modern diversification." },
    aiAnalysis: "The UAE represents one of history's most dramatic geographic transformations. Within a single generation, a collection of pearl-diving and fishing settlements on the edge of the Empty Quarter leveraged oil revenues to construct a post-oil economy before the oil ran out. The geographic constraint of a hyper-arid desert with no freshwater resources forced an absolute dependency on desalination and food imports, which in turn drove the state to become a global logistics and finance hub. The small citizen population (11%) governing a vast expatriate majority creates a unique social contract: the state provides cradle-to-grave welfare for citizens in exchange for political acquiescence, while expatriates accept limited rights for tax-free earnings. This model—geographic extremity converted into comparative advantage through sovereign wealth deployment—is the defining feature of the Gulf petro-state."
  },
  {
    id: "BD",
    name: "Bangladesh",
    capital: "Dhaka",
    population: "170 Million",
    languages: ["Bengali"],
    religion: "Islam ~90%, Hinduism ~8%, Buddhism ~1%, Christianity ~1%",
    coordinates: [23.8103, 90.4125],
    climate: { type: "Tropical Monsoon", description: "Hot and humid; cyclone-prone; heavy monsoon rains", temperatureRange: "9°C (winter) to 34°C (summer)", rainfallPattern: "Southwest monsoon June-October extremely wet; northeast monsoon mild" },
    geography: { terrain: "Entirely delta and alluvial plains; extremely low-lying; prone to flooding", features: ["Ganges-Brahmaputra Delta", "Sundarbans mangroves", "Bay of Bengal"], biodiversityRating: "High (Mangrove and wetland ecosystems)", ecosystems: ["Sundarbans mangrove forest (tiger habitat)", "River deltas", "Tropical forests"] },
    adaptation: { title: "Delta Flood Management & Cyclone Resilience", description: "Adapting to world's most flood-prone geography through traditional and modern water management." },
    anthropology: { migrationHistory: "Bengal region; Islamic sultanates; British colonial; partition creating East/West Pakistan; independence war 1971", ethnicComposition: ["Bengali ~98%", "Chakma and other tribal minorities ~1.5%", "Bihari minority"], ancientEmpires: ["Maurya", "Gupta", "Pala", "Sena", "Bengal sultanate", "Mughal", "British Raj", "Bangladesh"], socialStructures: "Densely populated; strong community bonds; gender empowerment programs (microfinance pioneers)." },
    culture: { insights: ["Rabindranath Tagore's literary legacy", "Rickshaw art tradition", "Resilience and cooperative spirit"], foodCulture: "Biryani, Hilsa fish, Curries, Rice; Bengali sweets tradition.", culturalIdentity: "Resilient, literary, densely communal; national pride in independence struggle." },
    economy: { overview: "Lower-middle income; garment manufacturing, agriculture, remittances", keyIndustries: ["Garment Manufacturing", "Agriculture", "Remittances", "Jute", "Leather"], tradeLegacy: "Historic Bengal region prosperity; colonial resource extraction; modern garment factory hub." },
    aiAnalysis: "Bangladesh is the world's most vivid test case for climate adaptation. Situated on the world's largest river delta, the country faces existential threats from sea-level rise, cyclonic intensification, and Himalayan glacial melt—all converging on a landmass the size of Iowa with 170 million people. Yet this same delta geography created one of history's most productive agricultural zones, supporting extreme population density that drives a distinctive social fabric: intense community interdependence, microfinance innovation (Grameen Bank), and a garment export sector that leverages low-cost labor into global integration. The country's developmental trajectory—from 'basket case' (Kissinger's 1971 dismissal) to lower-middle income with falling fertility and rising female labor participation—demonstrates how geographic vulnerability can catalyze institutional innovation. The critical question for the next half-century is whether Bangladesh's adaptive capacity can outpace the accelerating hydrological threats."
  },
  {
    id: "CH",
    name: "Switzerland",
    capital: "Bern",
    population: "8.7 Million",
    languages: ["German ~63%", "French ~23%", "Italian ~8%", "Romansh ~0.5%"],
    religion: "Roman Catholicism ~35%, Protestantism ~25%, Unaffiliated ~28%, Islam ~5%, Other ~7%",
    coordinates: [46.8182, 8.2275],
    climate: { type: "Temperate Continental & Alpine", description: "Alpine mountains dominate; lake regions temperate; extreme elevation variation", temperatureRange: "-15°C (mountains) to 25°C (lowlands)", rainfallPattern: "Year-round precipitation; 1500-2000mm in most regions; mountains higher" },
    geography: { terrain: "Alps occupy 60%; Jura mountains north; central plateau", features: ["Alps", "Jura Mountains", "Lake Geneva", "Lake Zurich", "Matterhorn"], biodiversityRating: "High (Alpine endemics)", ecosystems: ["Alpine meadows and grasslands", "Mountain forests", "Lakes", "Glaciers", "Temperate forests"] },
    adaptation: { title: "Alpine Isolation & Precision Manufacturing", description: "Mountain geography created Swiss independence; precision and reliability became cultural hallmarks." },
    anthropology: { migrationHistory: "Celtic and Roman settlements; Germanic and Romance migrations; Swiss independence achieved 1291", ethnicComposition: ["Swiss German ~62%", "French Swiss ~23%", "Italian Swiss ~8%", "Other ~7%"], ancientEmpires: ["Celtic tribes", "Roman Helvetia", "Medieval cantons", "Swiss Confederation"], socialStructures: "Direct democracy; cantons have significant autonomy; egalitarian and consensus-based." },
    culture: { insights: ["Precision engineering and watchmaking", "Multilingual and multicultural harmony", "Neutrality and diplomacy tradition"], foodCulture: "Fondue, Raclette, Chocolate, Cheese; regional Alpine traditions; high dairy culture.", culturalIdentity: "Precision, neutrality, independence, quality, multilingual harmony." },
    economy: { overview: "High-income; banking, pharmaceuticals, precision manufacturing, tourism", keyIndustries: ["Banking and Finance", "Pharmaceuticals", "Precision Manufacturing", "Watches", "Tourism"], tradeLegacy: "Medieval mountain independence; modern finance and precision hub." },
    aiAnalysis: "Switzerland is a study in how geographic fragmentation becomes institutional strength. The Alps did not merely protect the Swiss from invasion; they fragmented the territory into isolated valleys that evolved distinct languages, cultures, and governance traditions, forcing the invention of a confederal system that manages extreme diversity through decentralization and consensus. This political architecture—direct democracy, cantonal sovereignty, armed neutrality—is a direct translation of mountain geography into institutional design. Economically, the lack of natural resources and the difficulty of agriculture on steep slopes pushed the population toward high-value, low-volume exports: precision instruments, pharmaceuticals, banking services, and luxury goods. The result is a country that has turned geographic constraints into comparative advantages, achieving one of the world's highest standards of living while maintaining a unique position outside both the EU and NATO. The climate threat to this model is direct: glacier retreat threatens water security, tourism revenue, and the very Alpine identity that underpins the national narrative."
  },
  {
    id: "ET",
    name: "Ethiopia",
    capital: "Addis Ababa",
    population: "120 Million",
    languages: ["Amharic (official)", "Oromifa", "Tigrinya", "Somali", "80+ total"],
    religion: "Ethiopian Orthodox Christianity ~44%, Islam ~34%, Protestantism ~18%, Other ~4%",
    coordinates: [9.0320, 38.7469],
    climate: { type: "Highland Tropical & Semi-Arid", description: "Varies with elevation from hot semi-arid lowlands to temperate highlands", temperatureRange: "0°C (highlands) to 40°C (lowlands)", rainfallPattern: "Heavy June-September; dry October-May; highly variable causing droughts" },
    geography: { terrain: "East African highlands with the Great Rift Valley; lowland plains", features: ["Ethiopian Highlands", "Great Rift Valley", "Lake Tana", "Danakil Depression"], biodiversityRating: "High (Endemic species - Ethiopian Wolf, Gelada Baboon)", ecosystems: ["Mountain grasslands", "Afromontane forests", "Rift Valley lakes", "Semi-arid lowlands"] },
    adaptation: { title: "Highland Kingdom & Teff Agriculture", description: "Mountain geography enabled independent kingdom history; teff grain staple." },
    anthropology: { migrationHistory: "Ancient Axumite Kingdom; never colonized; unique Ge'ez script and Ethiopian Orthodox Christianity; Oromo/Amhara tensions", ethnicComposition: ["Amhara ~27%", "Oromo ~34%", "Tigray ~7%", "Somali ~6%", "Other ~26%"], ancientEmpires: ["Axumite Empire", "Zagwe Dynasty", "Solomonic Dynasty", "Ethiopia"], socialStructures: "Federal democratic republic; ethnic federalism causing tensions; recent civil conflict 2020-22." },
    culture: { insights: ["Unique Ge'ez script (only African written script with ancient origins)", "Ethiopian Orthodox Christianity tradition", "Coffee ceremony cultural centerpiece"], foodCulture: "Injera (flatbread base for stews), Doro Wot (chicken stew), Misir Wot (lentils); communal eating.", culturalIdentity: "Ancient kingdom pride; African independence symbol; diversity and language richness." },
    economy: { overview: "Low-income; agriculture-based; hydropower potential; growing manufacturing", keyIndustries: ["Agriculture", "Livestock", "Textiles", "Hydropower", "Mining"], tradeLegacy: "Ancient Axumite trade routes; ancient coffee origin; modern development focus." },
    aiAnalysis: "Ethiopia is Africa's geographic anomaly: a highland island rising from the surrounding lowlands, creating a distinct ecological and cultural zone that resisted colonization while incubating one of the world's oldest continuous state traditions. The Ethiopian Highlands—a massive volcanic plateau bisected by the Great Rift Valley—created a 'roof of Africa' where unique species, the continent's only indigenous script (Ge'ez), and a form of Christianity (Ethiopian Orthodox) with direct links to early antiquity survived in isolation. This geographic insulation allowed the Solomonic dynasty to claim 3,000 years of continuity, a narrative that underpins modern national identity. However, the same highlands fragment the country into distinct ethnic territories, fueling the federal ethnic politics that now threaten unity. The Grand Ethiopian Renaissance Dam on the Blue Nile represents the latest attempt to harness geographic advantage (hydropower potential) for development, but it places Ethiopia in direct hydro-political conflict with downstream Egypt and Sudan. The country's future hinges on whether its highland unity can transcend its ethnic geography."
  },
  {
    id: "IL",
    name: "Israel",
    capital: "Jerusalem",
    population: "9.3 Million",
    languages: ["Hebrew"],
    religion: "Judaism ~74%, Islam ~17%, Christianity ~2%, Druze ~1%, Other ~6%",
    coordinates: [31.7683, 35.2137],
    climate: { type: "Mediterranean & Desert", description: "Mediterranean coast temperate; interior desert hot; complex regional variation", temperatureRange: "5°C (winter) to 40°C (summer)", rainfallPattern: "Concentrated in winter; extremely dry summers; Negev Desert very arid" },
    geography: { terrain: "Mediterranean coast, Judean Hills, Jordan Rift Valley, Negev Desert", features: ["Dead Sea (lowest point on Earth)", "Mediterranean Sea", "Jordan River", "Negev Desert", "Mount Hermon"], biodiversityRating: "High (Mediterranean and desert crossroads)", ecosystems: ["Mediterranean forests", "Desert ecosystems", "River wetlands", "Salt water seas"] },
    adaptation: { title: "Desert Water Management & Technological Innovation", description: "Drip irrigation and water technology enable desert agriculture and life." },
    anthropology: { migrationHistory: "Ancient Jewish kingdoms; Roman diaspora; European Zionist immigration; Arab-Israeli conflict; Palestinian territories dispute", ethnicComposition: ["Jewish ~75%", "Arab Israeli ~21%", "Other ~4%"], ancientEmpires: ["Davidic Kingdom", "Divided Kingdom (Israel/Judah)", "Jewish Diaspora", "Ottoman", "British Mandate", "Israel"], socialStructures: "Jewish state; democratic with Arab minority; occupied territories governance disputed; military-focused society." },
    culture: { insights: ["Jewish diaspora return and continuous cultural tradition", "Hebrew language revival", "Palestinian cultural resistance"], foodCulture: "Falafel, Hummus, Shakshuka, Mediterranean influences; kosher dietary laws impact.", culturalIdentity: "Ancient biblical roots; modern nation-state; conflict and coexistence tensions." },
    economy: { overview: "High-income technology powerhouse; tourism, agriculture, defense industries", keyIndustries: ["Technology and Software", "Defense Industries", "Tourism", "Agriculture", "Diamonds"], tradeLegacy: "Ancient trade routes; diaspora financial networks; modern tech innovation hub." },
    aiAnalysis: "Israel represents a unique civilizational experiment: a people returning to an ancestral geography after two millennia of diaspora, armed with modern science and determined to overcome the same environmental constraints—water scarcity, desert soils, hostile neighbors—that challenged ancient kingdoms. The geographic logic is inescapable: the coastal plain and Jordan Valley offer the only arable land and freshwater, concentrating population and infrastructure in a narrow strip vulnerable to interruption. This geographic compression drove the development of world-leading water technology (drip irrigation, desalination, wastewater recycling) and a defense industry born of existential insecurity. The resulting innovation ecosystem—'Startup Nation'—exports the technologies of survival globally. Yet the unresolved territorial dispute over the West Bank and Gaza, rooted in overlapping historical claims to the same hills and aquifers, demonstrates that technology cannot dissolve geographic competition. Israel's 21st-century challenge is whether a high-tech, water-secure society can achieve political stability in a geography that has resisted it for three millennia."
  },
  {
    id: "IQ",
    name: "Iraq",
    capital: "Baghdad",
    population: "40 Million",
    languages: ["Arabic", "Kurdish"],
    religion: "Islam (Shia ~60%, Sunni ~37%), Christianity ~1%, Other ~2%",
    coordinates: [33.2232, 43.6793],
    climate: { type: "Desert & Subtropical", description: "Hot desert interior; subtropical Mesopotamian marshes and river valleys", temperatureRange: "5°C (winter) to 50°C+ (summer)", rainfallPattern: "Minimal; concentrate in winter and spring; extremely dry summers" },
    geography: { terrain: "Mesopotamian plains between Tigris and Euphrates; western desert, northern mountains", features: ["Tigris River", "Euphrates River", "Mesopotamian Marshes", "Zagros Mountains"], biodiversityRating: "Moderate (River-dependent)", ecosystems: ["Mesopotamian marshes", "Date palm groves", "Desert", "Mountain forests"] },
    adaptation: { title: "Mesopotamian River Civilization", description: "Tigris-Euphrates river control enabled world's earliest urban civilizations." },
    anthropology: { migrationHistory: "Sumerian, Akkadian, Babylonian, Assyrian ancient kingdoms; Islamic caliphates; Ottoman rule; British mandate; modern Iraq; Sunni-Shia tensions", ethnicComposition: ["Arab ~75%", "Kurdish ~15%", "Turkmen ~3%", "Other ~7%"], ancientEmpires: ["Sumer", "Akkad", "Babylon", "Assyria", "Abbasid Caliphate", "Ottoman", "Iraq"], socialStructures: "Federal democratic republic; ethnic (Arab-Kurd) and sectarian (Sunni-Shia) tensions; ongoing instability." },
    culture: { insights: ["Cradle of civilization pride", "Islamic scholarship tradition", "Shia pilgrimage destinations"], foodCulture: "Masgouf (grilled fish), Biryani, Kebab, Date syrup; Mesopotamian heritage.", culturalIdentity: "Ancient Mesopotamian legacy; Islamic center; war-torn present; resilience." },
    economy: { overview: "Oil-dependent; war-damaged; reconstruction ongoing", keyIndustries: ["Oil and Gas", "Agriculture", "Construction", "Services"], tradeLegacy: "Ancient Mesopotamia birthplace; modern oil wealth; regional conflict impact." },
    aiAnalysis: "Iraq is the geographic crucible of human civilization. The Tigris-Euphrates river system created the alluvial plain where writing, the wheel, the city, the state, and organized religion first emerged—Mesopotamia, 'the land between the rivers.' This same geography, however, has no natural barriers, making it a perpetual corridor for invasion: Persians, Greeks, Mongols, Ottomans, British, Americans. The modern state, drawn by colonial cartographers in 1920, fused three Ottoman vilayets (Mosul, Baghdad, Basra) containing distinct populations—Kurds in the north, Sunnis in the center, Shia in the south—into a single territory dependent on oil revenue and strongman rule. When the center weakens, the geographic logic reasserts itself: Kurdish autonomy in the mountains, Shia alignment with Iran in the south, Sunni insurgency in the western desert. Iraq's 21st-century trajectory depends on whether a federal system can accommodate this geographic pluralism, or whether the country fragments along the fault lines that have defined it since the first city-states contested control of the rivers."
  },
  {
    id: "KE",
    name: "Kenya",
    capital: "Nairobi",
    population: "54 Million",
    languages: ["English", "Swahili"],
    religion: "Christianity ~83%, Islam ~11%, Other ~6%",
    coordinates: [-1.2921, 36.8219],
    climate: { type: "Tropical & Semi-Arid", description: "Varies from humid coastal tropics to dry savannas to alpine highlands", temperatureRange: "10°C (highlands) to 35°C (coasts/plains)", rainfallPattern: "Bimodal rains; long rains March-May, short rains October-December" },
    geography: { terrain: "Coastal plains, highlands, Great Rift Valley, savanna", features: ["Mount Kenya", "Great Rift Valley", "Indian Ocean Coast", "Serengeti/Masai Mara", "Lake Victoria"], biodiversityRating: "High (African megafauna)", ecosystems: ["Tropical coral reefs", "Mangrove forests", "Savanna grasslands", "Highland forests", "Semi-arid lowlands"] },
    adaptation: { title: "Great Rift Valley Pastoralism & Savanna Ecology", description: "Pastoralist and hunter-gatherer adaptation to diverse climate zones." },
    anthropology: { migrationHistory: "Ancient Swahili city-states; Bantu and Nilotic migrations; Arab and Persian influence; British colonization; independence 1963; modern development", ethnicComposition: ["Kikuyu ~22%", "Luhya ~14%", "Kalenjin ~14%", "Luo ~10%", "Kamba ~10%", "Other ~30%"], ancientEmpires: ["Swahili city-states", "British East Africa", "Kenya"], socialStructures: "Constitutional republic; presidential system; ethnic tensions in politics; developing democracy." },
    culture: { insights: ["Swahili language and coastal culture", "Maasai pastoralist culture and ceremonies", "Safari tourism culture"], foodCulture: "Ugali (corn porridge), Sukuma Wiki (kale), Nyama Choma (grilled meat), Matoke (plantain).", culturalIdentity: "East African hub; wildlife and conservation focus; diverse ethnic heritage." },
    economy: { overview: "Lower-middle income; tourism, agriculture, technology (Nairobi tech hub)", keyIndustries: ["Tourism", "Agriculture", "Technology and Innovation", "Manufacturing", "Services"], tradeLegacy: "Ancient Swahili trade routes; colonial cash crop economy; modern regional tech leader." },
    aiAnalysis: "Kenya's geography is a cross-section of Africa itself: Indian Ocean coast, equatorial savanna, the Great Rift Valley slicing the country north-south, and highland plateaus hosting the capital and the majority of the population. This geographic diversity created an equally diverse human ecology—Swahili merchant culture on the coast, Bantu agriculturalists in the central highlands, Nilotic pastoralists in the Rift Valley, and hunter-gatherers in the northern deserts. The British colonial project exploited this geography for settler agriculture in the 'White Highlands,' creating the land grievances that fueled the Mau Mau uprising and post-independence politics. Today, Kenya leverages its geographic position as East Africa's gateway: the Port of Mombasa serves landlocked neighbors, Nairobi hosts the region's tech and finance hubs, and the Masai Mara drives a tourism economy built on the megafauna that the Rift Valley grasslands sustain. The climate vulnerability is acute—drought cycles devastate pastoralists, while rising temperatures push coffee and tea cultivation upslope—but the country's geographic centrality and institutional depth (relative to neighbors) make it the anchor of East African integration."
  },
  {
    id: "LK",
    name: "Sri Lanka",
    capital: "Colombo",
    population: "22 Million",
    languages: ["Sinhala", "Tamil"],
    religion: "Buddhism ~70.2%, Hinduism ~12.6%, Islam ~9.7%, Christianity ~7.4%",
    coordinates: [6.9271, 80.7744],
    climate: { type: "Tropical Monsoon", description: "Hot and humid; two monsoons; high elevation areas cooler", temperatureRange: "16°C (highlands) to 32°C (coasts)", rainfallPattern: "Southwest monsoon May-September on west; northeast monsoon December-February on east" },
    geography: { terrain: "Island nation; central highlands, coastal plains, dense forests", features: ["Central Highlands", "Adam's Peak", "Tea plantations", "Beaches", "Lagoons"], biodiversityRating: "High (Island endemics)", ecosystems: ["Tropical rainforests", "Dry deciduous forests", "Mangrove lagoons", "Coral reefs"] },
    adaptation: { title: "Island Ecology & Tea Plantation Culture", description: "Tea cultivation on central hills; colonial-era landscape transformation." },
    anthropology: { migrationHistory: "Early Sinhalese and Tamil settlements; Buddhist kingdom legacy; Portuguese, Dutch, British colonization; civil war 1983-2009", ethnicComposition: ["Sinhalese ~75%", "Sri Lankan Tamil ~18%", "Sri Lankan Moor ~7%"], ancientEmpires: ["Sinhalese kingdoms", "Tamil kingdoms", "Chola invasions", "Portuguese/Dutch/British colonial", "Sri Lanka"], socialStructures: "Buddhist majority Sinhalese dominant; Tamil minority; post-civil war reconciliation ongoing." },
    culture: { insights: ["Ancient Buddhist temple traditions", "Sigiriya rock fortress art", "Tea plantation heritage"], foodCulture: "Curry with rice, Hoppers, Lamprais, Fresh tropical fruits; fiery spices.", culturalIdentity: "Buddhist civilization; island identity; recovering from ethnic conflict." },
    economy: { overview: "Lower-middle income; tea, tourism, garments, agriculture", keyIndustries: ["Tea Cultivation", "Tourism", "Garments", "Rubber", "Cinnamon"], tradeLegacy: "Ancient spice trade hub; colonial tea plantation economy; modern tourist destination." },
    aiAnalysis: "Sri Lanka is a textbook case of island biogeography shaping human history. The island's separation from the Indian subcontinent by the Palk Strait allowed distinct evolutionary and cultural trajectories—endemic species, a Sinhalese-Buddhist civilization with its own script and chronicle tradition (Mahavamsa), and a Tamil-Hindu minority with deep ties to South India. The central highlands, rising to 2,500 meters, created a climatic elevator: tropical coasts, temperate mid-slopes ideal for the tea plantations that became the colonial economy's backbone, and cloud forests hosting unique biodiversity. This same topography, however, enabled the protracted civil war: the LTTE used the northern jungles and the eastern coastline as rear bases, while the government controlled the central highlands and the southwest. The war's end in 2009 did not resolve the geographic tension; it merely shifted it to post-war reconstruction, demographic engineering, and the strategic competition between India and China for influence over the island's Deep South ports (Hambantota, Colombo). Sri Lanka's future depends on whether its insular geography becomes a platform for Indo-Pacific connectivity or a cockpit for great-power rivalry."
  },
  {
    id: "NP",
    name: "Nepal",
    capital: "Kathmandu",
    population: "30 Million",
    languages: ["Nepali"],
    religion: "Hinduism ~81.3%, Buddhism ~9%, Islam ~4.4%, Christianity ~1.4%",
    coordinates: [27.7172, 85.3240],
    climate: { type: "Alpine, Temperate, Subtropical", description: "Varies dramatically with elevation from subtropical lowlands to alpine high mountains", temperatureRange: "-40°C (Himalayas) to 30°C (lowlands)", rainfallPattern: "Monsoon June-September brings 80% of annual rain; dry winter" },
    geography: { terrain: "Himalayan mountain kingdom; high peaks, deep valleys", features: ["Mount Everest", "Kathmandu Valley", "Annapurna", "Pokhara Valley"], biodiversityRating: "High (Alpine and subtropical endemics)", ecosystems: ["Alpine meadows", "Temperate forests", "Subtropical forests", "River gorges"] },
    adaptation: { title: "High Mountain Adaptation", description: "Adapting to extreme altitude through Sherpa expertise and agricultural terrace systems." },
    anthropology: { migrationHistory: "Indigenous Newars in Kathmandu Valley; Tibetan migrations; Hindu kingdoms; British influence but never colonized", ethnicComposition: ["Chhettri ~16%", "Newar ~6%", "Sherpa ~3%", "Magar ~7%", "Other ~68%"], ancientEmpires: ["Newari kingdoms", "Malla kingdoms", "Shah dynasty", "Nepal"], socialStructures: "Feudal Hindu kingdom transitioning to federal democratic republic; high caste-ethnic complexity." },
    culture: { insights: ["Hindu-Buddhist syncretism", "Sherpa mountaineering tradition", "Newari architectural heritage"], foodCulture: "Dal Bhat (lentils and rice), Momos (dumplings), Naan, Gundruk (fermented vegetables).", culturalIdentity: "Mountain spirit, Himalayan guardian, ancient civilization sanctuary." },
    economy: { overview: "Least developed country; agriculture, tourism (Everest), remittances", keyIndustries: ["Agriculture", "Tourism", "Remittances", "Hydropower", "Handicrafts"], tradeLegacy: "Tea and spice trade routes; Sherpa guides legacy; modern trekking destination." },
    aiAnalysis: "Nepal is geography as destiny in its purest form. The Himalayas are not merely a border; they are the country's defining feature—creating a vertical ecology that compresses tropical jungles and arctic peaks into a horizontal distance of 150 kilometers. This extreme elevation gradient forced a unique adaptation: the only Hindu kingdom in a Buddhist mountain world, a buffer state between two civilizational giants (India and China) that was never formally colonized because its mountains made conquest more trouble than it was worth. The Kathmandu Valley, a lacustrine basin at 1,400 meters, became a cultural petri dish where Newar artisans synthesized Indian and Tibetan aesthetics into a unique urban civilization. Today, the same geography drives the economy: hydropower potential from Himalayan rivers, tourism revenue from eight of the world's fourteen 8,000-meter peaks, and remittances from a diaspora driven abroad by the lack of arable land. But climate change is melting the glaciers that feed the rivers, earthquakes (like the 2015 Gorkha quake) periodically devastate the valleys, and the country's landlocked position makes it dependent on Indian transit routes. Nepal's survival has always been a negotiation with its mountains; the 21st century tests whether that negotiation can succeed under accelerating environmental change."
  },
  {
    id: "PK",
    name: "Pakistan",
    capital: "Islamabad",
    population: "231 Million",
    languages: ["Urdu (official)", "English", "Punjabi", "Sindhi", "Pashto"],
    religion: "Islam ~96%, Christianity ~1.6%, Hinduism ~1.6%, Other ~1%",
    coordinates: [33.6844, 73.0479],
    climate: { type: "Diverse: Alpine, Subtropical, Arid", description: "Himalayas north, Indus plains, Thar Desert south; extreme variation", temperatureRange: "-40°C (north) to 50°C (south)", rainfallPattern: "Monsoon concentrated June-September; west and south semi-arid to arid" },
    geography: { terrain: "Mountainous north (Himalayas, Karakoram), fertile Indus plains, Thar Desert south", features: ["Himalayas", "Indus River", "Karakoram Range", "K2", "Thar Desert"], biodiversityRating: "High (Alpine and desert ecosystems)", ecosystems: ["Alpine meadows", "Temperate forests", "Desert scrub", "River wetlands"] },
    adaptation: { title: "Indus River Basin Civilization", description: "Indus Valley legacy of urban planning; modern irrigation networks." },
    anthropology: { migrationHistory: "Indus Valley Civilization; Aryan migrations; Islamic sultanates; Mughal Empire; British Raj; Partition from India 1947", ethnicComposition: ["Punjabi ~44%", "Pashtun ~15%", "Sindhi ~14%", "Saraiki ~8%", "Other ~19%"], ancientEmpires: ["Indus Valley", "Maurya", "Mughal", "British Raj", "Pakistan"], socialStructures: "Islamic republic; strong family and tribal structures; recent democratization." },
    culture: { insights: ["Sufi Islamic mysticism traditions", "Partition trauma and ongoing India tensions", "Urdu literary tradition"], foodCulture: "Biryani, Tandoori, Naan, Samosas; complex spice blends; meat-heavy.", culturalIdentity: "Islamic identity central; troubled history with India; resilience despite challenges." },
    economy: { overview: "Lower-middle income; agriculture, textiles, services; ongoing crises", keyIndustries: ["Textiles", "Agriculture", "Construction", "IT", "Energy"], tradeLegacy: "Indus Valley heritage; British colonial infrastructure; modern textile exporter." },
    aiAnalysis: "Pakistan is a geographic paradox: a state created by religious ideology in a territory defined by the Indus River, yet its borders were drawn by a departing British lawyer (Cyril Radcliffe) in five weeks, slicing through Punjab and Bengal without regard for hydrology or demography. The Indus—the lifeline of the Indus Valley Civilization, the artery of Mughal agriculture, the foundation of modern irrigation—flows the length of the country, but its headwaters lie in Indian-administered Kashmir and its delta is degrading due to upstream extraction. The mountain north (Karakoram, Hindu Kush, Himalayas) provides water security and strategic depth but isolates the country from Central Asia. The western border with Afghanistan (the Durand Line) cuts through Pashtun tribal lands, making it porous to insurgency. The southern coast gives access to the Arabian Sea but the port of Karachi is the only major outlet. Pakistan's strategic obsession with 'strategic depth' in Afghanistan and its rivalry with India are direct expressions of geographic insecurity: a country that is long, narrow, water-dependent, and strategically encircled. The nuclear deterrent was developed to compensate for conventional geographic disadvantage. Whether Pakistan can transition from a security state to a developmental state depends on whether it can leverage its geography—Indus agriculture, mountain tourism, China-Pakistan Economic Corridor connectivity—rather than be constrained by it."
  }
];

console.log('Missing countries to add:', missingCountries.map(c => c.id).join(', '));
console.log('Total:', missingCountries.length);

// Now we need to insert these into the countriesData.ts file
// We'll append them before the closing brace of the export const countriesData

const insertionPoint = countriesDataContent.lastIndexOf('};\n\nexport');
if (insertionPoint === -1) {
  // Try alternative
  const altPoint = countriesDataContent.lastIndexOf('};');
  console.log('Alternative insertion point at:', altPoint);
}

// Let's find the last country entry
const lastCountryMatch = countriesDataContent.match(/\s*[A-Z]{2}:\s*{/g);
if (lastCountryMatch) {
  const lastCountry = lastCountryMatch[lastCountryMatch.length - 1];
  const lastCountryIndex = countriesDataContent.lastIndexOf(lastCountry);
  console.log('Last country entry:', lastCountry, 'at index:', lastCountryIndex);
  
  // Find the closing brace of that country
  let braceCount = 0;
  let endIndex = lastCountryIndex;
  for (let i = lastCountryIndex; i < countriesDataContent.length; i++) {
    if (countriesDataContent[i] === '{') braceCount++;
    if (countriesDataContent[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }
  console.log('End of last country at:', endIndex);
  
  // Insert new countries before the final };
  const finalBraceIndex = countriesDataContent.indexOf('};', endIndex);
  console.log('Final }; at:', finalBraceIndex);
  
  // Generate the new country entries
  let newEntries = '';
  missingCountries.forEach((country, index) => {
    newEntries += `  ${country.id}: {\n`;
    newEntries += `      "id": "${country.id}",\n`;
    newEntries += `      "name": "${country.name}",\n`;
    newEntries += `      "capital": "${country.capital}",\n`;
    newEntries += `      "population": "${country.population}",\n`;
    newEntries += `      "languages": [\n`;
    country.languages.forEach((lang, i) => {
      newEntries += `          "${lang}"${i < country.languages.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `      ],\n`;
    newEntries += `      "religion": "${country.religion}",\n`;
    newEntries += `      "coordinates": [\n`;
    newEntries += `          ${country.coordinates[0]},\n`;
    newEntries += `          ${country.coordinates[1]}\n`;
    newEntries += `      ],\n`;
    newEntries += `      "climate": {\n`;
    newEntries += `          "type": "${country.climate.type}",\n`;
    newEntries += `          "description": "${country.climate.description}",\n`;
    newEntries += `          "temperatureRange": "${country.climate.temperatureRange}",\n`;
    newEntries += `          "rainfallPattern": "${country.climate.rainfallPattern}"\n`;
    newEntries += `      },\n`;
    newEntries += `      "geography": {\n`;
    newEntries += `          "terrain": "${country.geography.terrain}",\n`;
    newEntries += `          "features": [\n`;
    country.geography.features.forEach((feat, i) => {
      newEntries += `              "${feat}"${i < country.geography.features.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ],\n`;
    newEntries += `          "biodiversityRating": "${country.geography.biodiversityRating}",\n`;
    newEntries += `          "ecosystems": [\n`;
    country.geography.ecosystems.forEach((eco, i) => {
      newEntries += `              "${eco}"${i < country.geography.ecosystems.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ]\n`;
    newEntries += `      },\n`;
    newEntries += `      "adaptation": {\n`;
    newEntries += `          "title": "${country.adaptation.title}",\n`;
    newEntries += `          "description": "${country.adaptation.description}"\n`;
    newEntries += `      },\n`;
    newEntries += `      "anthropology": {\n`;
    newEntries += `          "migrationHistory": "${country.anthropology.migrationHistory}",\n`;
    newEntries += `          "ethnicComposition": [\n`;
    country.anthropology.ethnicComposition.forEach((ec, i) => {
      newEntries += `              "${ec}"${i < country.anthropology.ethnicComposition.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ],\n`;
    newEntries += `          "ancientEmpires": [\n`;
    country.anthropology.ancientEmpires.forEach((ae, i) => {
      newEntries += `              "${ae}"${i < country.anthropology.ancientEmpires.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ],\n`;
    newEntries += `          "socialStructures": "${country.anthropology.socialStructures}"\n`;
    newEntries += `      },\n`;
    newEntries += `      "culture": {\n`;
    newEntries += `          "insights": [\n`;
    country.culture.insights.forEach((insight, i) => {
      newEntries += `              "${insight}"${i < country.culture.insights.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ],\n`;
    newEntries += `          "foodCulture": "${country.culture.foodCulture}",\n`;
    newEntries += `          "culturalIdentity": "${country.culture.culturalIdentity}"\n`;
    newEntries += `      },\n`;
    newEntries += `      "economy": {\n`;
    newEntries += `          "overview": "${country.economy.overview}",\n`;
    newEntries += `          "keyIndustries": [\n`;
    country.economy.keyIndustries.forEach((ind, i) => {
      newEntries += `              "${ind}"${i < country.economy.keyIndustries.length - 1 ? ',' : ''}\n`;
    });
    newEntries += `          ],\n`;
    newEntries += `          "tradeLegacy": "${country.economy.tradeLegacy}"\n`;
    newEntries += `      },\n`;
    newEntries += `      "aiAnalysis": "${country.aiAnalysis}"\n`;
    newEntries += `  }${index < missingCountries.length - 1 ? ',' : ''}\n`;
  });
  
  // Insert the new entries
  const newContent = countriesDataContent.slice(0, finalBraceIndex) + newEntries + ',\n' + countriesDataContent.slice(finalBraceIndex);
  
  // Write the new file
  fs.writeFileSync('src/data/countriesData.ts', newContent);
  console.log('Successfully added', missingCountries.length, 'countries to countriesData.ts');
} else {
  console.log('Could not find last country entry');
}