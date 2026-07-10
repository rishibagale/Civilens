const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'historicalEvents.ts');

// 1. Read existing file contents
let content = fs.readFileSync(filePath, 'utf8');

// Strip TypeScript annotations for sandbox evaluation
let jsContent = content;
jsContent = jsContent.replace(/export interface[\s\S]*?\n\}/g, '');
jsContent = jsContent.replace(/: Record<EraType, HistoricalEvent\[\]>/g, '');
jsContent = jsContent.replace(/type EraType = [\s\S]*?;/g, '');
jsContent = jsContent.replace(/\bexport\s+/g, '');

const fn = new Function('exports', jsContent + '\nreturn historicalEvents;');
const historicalEvents = fn({});

// 2. Data dictionary for missing events
const eventData = {
  // --- ANCIENT ---
  indus_valley: {
    narrative: "Flourishing in the basins of the Indus River, the Indus Valley Civilization was one of the three earliest cradles of civilization, alongside Mesopotamia and Ancient Egypt. At its peak around 2500 BCE, urban centers like Harappa and Mohenjo-daro housed up to 50,000 residents. What distinguished this culture was its highly sophisticated urban planning: grid-patterned streets, brick-lined sewers, and standardized weights and measures. Uniquely, the cities lacked massive palaces or defensive walls, suggesting a highly egalitarian society guided by trade rather than military conquest.\n\nThe civilization was built on seasonal monsoonal agriculture and extensive maritime trade networks. Standardized Indus seals have been discovered in Mesopotamian city-states like Ur, indicating regular trade of lapis lazuli, carnelian, and cotton. The Great Bath at Mohenjo-daro suggests that ritual purification and sanitation played a central role in their social and religious lives.\n\nBy 1900 BCE, the civilization began to decline, likely due to a shift in monsoon patterns and the drying up of the Sarasvati River. Although their script remains undeciphered, their legacies in trade, town planning, and metallurgy laid foundations for later South Asian civilizations.",
    causes: [
      "Regular agricultural surplus from the fertile Indus and Sarasvati river basins",
      "Development of standardized systems of weights, measures, and brick dimensions",
      "Strategic trade routes connecting Central Asia, the Iranian Plateau, and the Persian Gulf"
    ],
    effects: [
      "Sophisticated grid-based urban planning with municipal sanitation systems",
      "Widespread trade of crafts, jewelry, and cotton across the ancient Near East",
      "Decentralized social structure with no evidence of royal palaces or military states"
    ],
    keyFigures: [
      { name: "Priest-King", role: "Iconic sculpture representing a conjectured leader or elite class" }
    ],
    relatedEvents: ["egyptian_unification", "silk_road_begins", "maurya_empire"],
    imageQuery: "Mohenjo-daro ruins Indus Valley Civilization",
    imageCaption: "The Great Bath and ruins at Mohenjo-daro — a testament to ancient sanitation and urban planning."
  },
  mycenaean: {
    narrative: "The Mycenaean civilization represented the first advanced, distinct Greek culture, dominating mainland Greece and the Aegean Sea from 1600 to 1100 BCE. Centered around massive palace fortresses like Mycenae, Tiryns, and Pylos, the Mycenaeans were a warrior-elite society. Unlike the peaceful Minoans of Crete whom they conquered, the Mycenaeans built thick 'Cyclopean' walls (so named because later Greeks believed only giants could lift the stones) and buried their kings in massive beehive-shaped stone tombs (tholoi).\n\nMycenaean society was highly bureaucratic, recording trade transactions, agricultural yields, and military supplies on clay tablets using Linear B—the earliest written form of the Greek language. They dominated Mediterranean trade networks, exporting olive oil, wine, and pottery as far as Egypt and the Levant, while importing copper, tin, and gold.\n\nThe civilization collapsed around 1100 BCE during the Bronze Age Collapse, entering a 'Dark Age' of depopulation and literacy loss. However, their myths, gods, and heroes (like Agamemnon and Achilles) survived through oral traditions to form the core of Homeric poetry and Classical Greek culture.",
    causes: [
      "Infiltration and conquest of Minoan Crete trade routes and maritime networks",
      "Establishment of fortified palace economies led by a warrior king (wanax)",
      "Control of bronze metallurgy and trade routes across the Aegean Sea"
    ],
    effects: [
      "Creation of the Linear B script, the oldest deciphered written Greek language",
      "Spread of Greek culture, pantheon of gods, and myths across the Mediterranean",
      "Bronze Age Collapse leading to the Greek Dark Ages and loss of literacy for centuries"
    ],
    keyFigures: [
      { name: "Agamemnon", role: "Legendary Mycenaean king who led the Greeks in the Trojan War" }
    ],
    relatedEvents: ["trojan_war", "roman_republic", "egyptian_unification"],
    imageQuery: "Lion Gate Mycenae ancient Greece",
    imageCaption: "The Lion Gate of Mycenae (c. 1250 BCE) — the main entrance of the Bronze Age citadel."
  },
  shang_dynasty: {
    narrative: "The Shang Dynasty is the first Chinese dynasty supported by direct archaeological evidence, ruling the Yellow River valley from roughly 1600 to 1046 BCE. It represented a major leap in Chinese statehood, characterized by advanced bronze metallurgy, large walled cities, and the creation of China's oldest known writing system. The Shang kings ruled a confederation of tribes, acting as both political leaders and high priests who performed ancestral rituals.\n\nCentral to Shang culture was the use of 'oracle bones' (turtle plastrons and ox scapulae) for divination. Priests carved questions onto the bones, heated them until they cracked, and interpreted the fractures as messages from the royal ancestors and the supreme deity, Di. The inscriptions on these bones represent the direct ancestors of modern Chinese characters.\n\nThe dynasty is also renowned for its exquisite bronze vessels, used in ritual banquets to offer food and wine to ancestors. The Shang were eventually overthrown by the Zhou Dynasty, who justified their conquest by introducing the 'Mandate of Heaven' concept.",
    causes: [
      "Agricultural surplus in the fertile loess soils of the Yellow River valley",
      "Monopoly over bronze casting technology for weapons and ceremonial vessels",
      "Development of a centralized administrative hierarchy under a sacred king"
    ],
    effects: [
      "Origin of the Chinese writing system on divinatory oracle bones",
      "Exquisite developments in ritual bronze metallurgy and jade carving",
      "Establishment of ancestral worship as the cornerstone of Chinese family and state identity"
    ],
    keyFigures: [
      { name: "Wu Ding", role: "Shang king who oversaw a golden age of expansion and divination" },
      { name: "Lady Hao (Fu Hao)", role: "Queen consort, military general, and high priestess whose tomb remained intact" }
    ],
    relatedEvents: ["egyptian_unification", "qin_unification", "han_dynasty"],
    imageQuery: "Shang Dynasty bronze vessel oracle bone",
    imageCaption: "A Shang Dynasty ceremonial bronze vessel (c. 1200 BCE) — demonstrating advanced metallurgical art."
  },
  trojan_war: {
    narrative: "The Trojan War is one of the foundational legends of Western literature, traditionally dated to the 12th or 11th century BCE. According to Homer's epic poems, the Iliad and the Odyssey, the war began when Paris of Troy abducted Helen, the wife of King Menelaus of Sparta. A coalition of Greek (Achaean) forces led by Agamemnon besieged Troy for ten years, ultimately capturing the city through the stratagem of the Trojan Horse.\n\nFor centuries, the war was considered entirely mythical. However, in the 1870s, Heinrich Schliemann excavated a site at Hisarlik in northwestern Turkey, discovering ruins that aligned with the geography of Homeric Troy. Modern excavations confirm that the city (specifically Troy VIIa) suffered a violent destruction around 1180 BCE, coinciding with the Bronze Age Collapse.\n\nWhether the war was fought over a stolen queen or, more likely, over control of strategic trade routes at the entrance to the Black Sea, it remains a powerful symbol of heroic conflict, hubris, and tragedy that shaped Greek identity and Roman mythology (via Virgil's Aeneid).",
    causes: [
      "Geopolitical friction between Mycenaean Greece and regional Anatolian powers",
      "Competition for trade route control at the Hellespont (Dardanelles) connecting the Aegean and Black Seas",
      "Bronze Age Collapse resource strain driving maritime raids and conflicts"
    ],
    effects: [
      "Destruction of the city of Troy and collapse of regional trade networks",
      "Inspiration for Homeric epics (Iliad, Odyssey) which formed the foundation of Western literature",
      "Spread of Trojan origin myths, including the legend of Aeneas founding Rome"
    ],
    keyFigures: [
      { name: "Helen of Troy", role: "Queen of Sparta whose abduction sparked the conflict" },
      { name: "Priam", role: "King of Troy during the ten-year siege" }
    ],
    relatedEvents: ["mycenaean", "roman_republic", "byzantine_peak"],
    imageQuery: "Heinrich Schliemann excavations Troy",
    imageCaption: "The archaeological site at Hisarlik, Turkey — believed to be historical Troy."
  },
  persian_empire: {
    narrative: "Under Cyrus the Great and his successors, the Achaemenid Persian Empire became the largest empire the ancient world had ever seen, spanning three continents from the Balkans to India. At its peak around 500 BCE, it ruled over nearly 50 million people—approximately 44% of the world's population at the time. This vast scale required unprecedented administrative innovations, leading to the creation of the satrapy system.\n\nThe satraps were local governors who ruled provinces with considerable autonomy, while being connected to the central government in Persepolis by the Royal Road—a 2,500-kilometer highway with messenger posts. Cyrus the Great pioneered a policy of cultural and religious tolerance, famously captured on the Cyrus Cylinder, which recorded his liberation of Babylon and permission for exiled Jews to return to Jerusalem.\n\nDespite their administrative brilliance, the Persians are often remembered through a Western lens due to their conflicts with Greece (the Greco-Persian Wars). The empire was eventually conquered by Alexander the Great in 330 BCE, but its model of centralized administration and tolerance influenced the Roman, Byzantine, and Islamic empires.",
    causes: [
      "Cyrus the Great's military genius and policy of integrating conquered elites",
      "Standardized provincial administration via satraps and a unified tax system",
      "The Royal Road and standard coinage facilitating rapid communication and trade"
    ],
    effects: [
      "First global empire spanning three continents with unified administrative infrastructure",
      "Spread of Zoroastrianism and institutionalization of religious tolerance",
      "Cultural synthesis of Persian, Mesopotamian, Egyptian, and Greek art and architecture"
    ],
    keyFigures: [
      { name: "Cyrus the Great", role: "Founder of the empire, author of the Cyrus Cylinder" },
      { name: "Darius I", role: "Sovereign who expanded the empire, built Persepolis and the Royal Road" }
    ],
    relatedEvents: ["roman_republic", "athens_democracy", "silk_road_begins"],
    imageQuery: "Persepolis ruins relief Apadana",
    imageCaption: "Bas-reliefs at Persepolis showing tributary nations bringing gifts to the Persian King."
  },
  roman_republic: {
    narrative: "Established in 509 BCE following the overthrow of the tyrannical Etruscan king Tarquin the Proud, the Roman Republic introduced a complex, checks-and-balances governance model that influenced modern democracies. Instead of a monarchy, Rome was ruled by two elected consuls, a Senate composed of patrician elites, and popular assemblies representing plebeian citizens. This constitutional experiment aimed to prevent the consolidation of power in a single individual.\n\nThe early Republic was marked by internal social conflict (the Struggle of the Orders) which led to the creation of the Tribunes of the Plebs—representatives with the power to veto laws. Externally, Rome expanded through disciplined legions and strategic alliance building, eventually dominating Italy and defeating Carthage in the Punic Wars to gain control of the Mediterranean.\n\nHowever, the massive wealth, inequality, and military expansion eventually broke the Republican system. Warlords like Marius, Sulla, and Julius Caesar prioritized personal loyalty over constitutional norms, leading to civil wars that culminated in Caesar's dictatorship and the birth of the Roman Empire in 27 BCE.",
    causes: [
      "Overthrow of Tarquin the Proud, the last Etruscan King of Rome",
      "Determination of Roman elites to prevent any single individual from holding absolute power",
      "Social conflicts between wealthy patricians and working plebeians requiring constitutional representation"
    ],
    effects: [
      "Creation of a bicameral constitutional republic with checks and balances and veto powers",
      "Subjugation of Carthage and expansion of Roman hegemony over the Mediterranean basin",
      "Rise of powerful military generals leading to political instability, civil wars, and the end of the Republic"
    ],
    keyFigures: [
      { name: "Lucius Junius Brutus", role: "Founder of the Roman Republic and first consul" },
      { name: "Julius Caesar", role: "General whose dictatorship and assassination marked the end of the Republic" }
    ],
    relatedEvents: ["persian_empire", "athens_democracy", "roman_expansion"],
    imageQuery: "Roman Forum ruins Senate",
    imageCaption: "The Roman Forum — the political, social, and economic center of the Republic."
  },
  athens_democracy: {
    narrative: "In 508 BCE, Cleisthenes introduced democratic reforms in Athens, establishing the first direct democracy in human history. To break the power of aristocratic clans, Cleisthenes reorganized Athenian citizens into ten artificial tribes based on geography, forcing cooperation across class boundaries. The primary governing body was the Assembly (Ekklesia), where all male citizens could debate, vote on laws, and elect generals.\n\nAthenian democracy relied on direct participation rather than representation. Most public officials were chosen by lottery (sortition) to ensure equal opportunity, and the assembly could vote to exile any citizen deemed a threat to democracy for ten years (ostracism). This democratic environment fueled a golden age of philosophy (Socrates, Plato), theater (Sophocles), and architecture (the Parthenon).\n\nHowever, this democracy was severely limited: women, slaves, and foreign residents (metics) were entirely excluded from political life, meaning only about 10-20% of the population participated. The system ultimately buckled under the strains of the Peloponnesian War against Sparta and was eventually ended by Macedonian conquest.",
    causes: [
      "Rebellions against tyrannical rulers and growing factional conflict among aristocratic clans",
      "Cleisthenes' political reforms aimed at reorganizing citizens to bypass ancestral lineage hierarchies",
      "Need for a unified citizen body to support military defense against external threats"
    ],
    effects: [
      "First historical implementation of direct democracy and civic participation by sortition",
      "Golden age of classical Greek philosophy, tragic theater, and monumental architecture",
      "Creation of the practice of ostracism to prevent tyrants from consolidating power"
    ],
    keyFigures: [
      { name: "Cleisthenes", role: "Reformer called the 'Father of Athenian Democracy'" },
      { name: "Pericles", role: "Statesman who expanded democracy and led Athens during its Golden Age" }
    ],
    relatedEvents: ["persian_empire", "roman_republic", "roman_expansion"],
    imageQuery: "Parthenon Athens Acropolis democracy",
    imageCaption: "The Parthenon on the Athenian Acropolis — the monument of the classical democratic golden age."
  },
  qin_unification: {
    narrative: "In 221 BCE, Qin Shi Huang (King Ying Zheng) conquered the last of the Warring States, ending centuries of bloody division and unifying China for the first time. To consolidate his massive new empire, he abolished the traditional feudal system, replacing it with a centralized administrative hierarchy based on the philosophy of Legalism, which emphasized strict laws, absolute state control, and meritocracy.\n\nQin Shi Huang systematically standardized almost every aspect of Chinese life: writing (creating a unified small seal script), currency (the circular Ban Liang copper coin), weights, measures, and even the axle width of carts to ensure they fit road tracks. He connected existing regional border walls to construct the first Great Wall to defend against northern nomads.\n\nWhile the Qin Dynasty lasted only 15 years due to brutal conscription, high taxation, and the burning of non-utilitarian books, it laid the structural foundation for the next 2,000 years of imperial China. The name 'China' itself is derived from 'Qin'.",
    causes: [
      "End of the Warring States period characterized by continuous inter-state warfare",
      "Qin state's adoption of legalist reforms under Shang Yang, optimizing agriculture and conscription",
      "Military conquest of rival states (Han, Zhao, Yan, Wei, Chu, Qi) by King Ying Zheng"
    ],
    effects: [
      "First unified Chinese empire under an absolute emperor (Huangdi)",
      "Standardization of Chinese writing, currency, measurements, and infrastructure",
      "Construction of the Great Wall and the famous Terracotta Army"
    ],
    keyFigures: [
      { name: "Qin Shi Huang", role: "First Emperor of unified China" },
      { name: "Li Si", role: "Grand Chancellor who implemented Legalist administration and standardizations" }
    ],
    relatedEvents: ["great_wall_construction", "han_dynasty", "egyptian_unification"],
    imageQuery: "Terracotta Army Qin Shi Huang tomb",
    imageCaption: "The Terracotta Army — thousands of life-sized clay soldiers guarding the tomb of Qin Shi Huang."
  },
  great_wall_construction: {
    narrative: "Following the unification of China in 221 BCE, Emperor Qin Shi Huang ordered the construction of a massive defensive barrier to protect the northern border from the nomadic Xiongnu tribes. Instead of building from scratch, his general Meng Tian connected and reinforced pre-existing defensive walls built by the Warring States, creating the first unified Great Wall of China.\n\nThe construction was a massive logistical challenge and a humanitarian tragedy. Hundreds of thousands of soldiers, peasants, and convicts were forced to labor in remote, mountainous terrain under harsh weather. Countless workers died from exhaustion, starvation, and exposure, earning the wall the historical nickname 'the longest cemetery on Earth'.\n\nWhile the wall did not prevent all invasions, it served as a vital border outpost, regulating trade, providing early warning via smoke signals, and securing agricultural lands. The wall would be rebuilt and expanded by later dynasties, most famously the Ming Dynasty, whose stone-and-brick structures form the iconic image of the wall seen today.",
    causes: [
      "Threat of nomadic incursions by the Xiongnu confederation along the northern frontier",
      "Qin Shi Huang's desire to secure unified imperial borders and defend agricultural lands",
      "Availability of massive conscript labor forces following the demobilization of Warring States armies"
    ],
    effects: [
      "Establishment of a physical and cultural boundary between Chinese agriculturalists and steppe nomads",
      "Secure trade routes along the northern frontier, facilitating the early Silk Road",
      "Massive loss of human life, becoming a symbol of tyrannical exploitation in Chinese folklore"
    ],
    keyFigures: [
      { name: "Qin Shi Huang", role: "Emperor who ordered the consolidation of the wall" },
      { name: "General Meng Tian", role: "Military commander who directed the construction and frontier campaigns" }
    ],
    relatedEvents: ["qin_unification", "han_dynasty", "silk_road_begins"],
    imageQuery: "Great Wall of China Badaling section",
    imageCaption: "The Great Wall of China winding across mountains — one of humanity's largest defensive constructions."
  },
  maurya_empire: {
    narrative: "Founded by Chandragupta Maurya in 322 BCE, the Maurya Empire was the first state to unify the vast majority of the Indian subcontinent. With its capital at Pataliputra, the empire relied on a highly centralized bureaucracy, a vast standing army, and an extensive network of spies, as detailed in the Arthashastra, a treatise on statecraft written by the prime minister Chanakya.\n\nThe empire reached its peak under Ashoka the Great, who ruled from 268 to 232 BCE. Following a bloody campaign to conquer the region of Kalinga, Ashoka was filled with remorse at the scale of destruction. He converted to Buddhism, renouncing expansion by force and introducing 'Dhamma' (righteous governance). Ashoka carved his edicts on stone pillars and rock faces across the empire, promoting religious tolerance, non-violence, and social welfare.\n\nAshoka sent Buddhist missionaries to Sri Lanka, Central Asia, and the Mediterranean, transforming a local sect into a global religion. While the empire fragmented shortly after his death, Ashoka's lion capital remains the national emblem of modern India.",
    causes: [
      "Overthrow of the Nanda Dynasty in Magadha by Chandragupta Maurya with the aid of Chanakya",
      "Geopolitical vacuum in northwestern India following the retreat of Alexander the Great's forces",
      "Creation of a highly organized centralized state and military infrastructure"
    ],
    effects: [
      "First political unification of the Indian subcontinent, spanning from Afghanistan to Bengal",
      "Global expansion of Buddhism through the state patronage and missionary efforts of Ashoka",
      "Erection of the Pillars of Ashoka, promoting early codes of social welfare, non-violence, and tolerance"
    ],
    keyFigures: [
      { name: "Chandragupta Maurya", role: "Founder who established the empire and expanded borders" },
      { name: "Ashoka the Great", role: "Emperor who promoted Buddhism, non-violence, and Dhamma governance" }
    ],
    relatedEvents: ["qin_unification", "roman_expansion", "egyptian_unification"],
    imageQuery: "Ashoka Pillar Sarnath lion capital",
    imageCaption: "The Lion Capital of Ashoka at Sarnath (c. 250 BCE) — the national emblem of India."
  },
  roman_expansion: {
    narrative: "During the late Republic and early Empire, Rome transitioned from a regional Italian power into a massive empire dominating the Mediterranean basin. This expansion was driven by a highly disciplined citizen-soldier army, tactical flexibility, and an engineering capability to build military roads, bridges, and fortified camps.\n\nKey milestones included the conquest of Gaul by Julius Caesar, which integrated Western Europe into the Mediterranean economy, and the conquest of Hispania and Greece. Following the defeat of Mark Antony and Cleopatra at the Battle of Actium in 31 BCE, Rome annexed Ptolemaic Egypt, the wealthiest kingdom in the Mediterranean. Egypt's grain supply secured the food security of the city of Rome, making the empire self-sufficient.\n\nExpansion transformed Roman society, flooding the capital with wealth, resources, and slaves, which hollowed out the small peasant farmer class and concentrated agricultural land in large estates (latifundia). This economic shift fueled the political crises that destroyed the Republic, resulting in the autocratic rule of the Roman Empire.",
    causes: [
      "disciplined organization of the Roman legions and a militarized civic culture",
      "Defeat of Carthage in the Punic Wars, removing Rome's primary Mediterranean rival",
      "Julius Caesar's campaigns in Gaul, seeking personal wealth, glory, and political dominance"
    ],
    effects: [
      "Establishment of Roman hegemony over Western Europe, North Africa, and the Near East",
      "Annexation of Egypt, securing grain supplies that fed Rome's million-strong population",
      "Concentration of land and slaves in Italy, leading to Republican collapse and the birth of the Empire"
    ],
    keyFigures: [
      { name: "Julius Caesar", role: "General who conquered Gaul, paving the way for the end of the Republic" },
      { name: "Augustus (Octavian)", role: "First Emperor of Rome, who oversaw the consolidation of the empire" }
    ],
    relatedEvents: ["roman_republic", "roman_empire_peak", "byzantine_peak"],
    imageQuery: "Roman legions expansion conquest",
    imageCaption: "Roman legionaries marching — the highly organized military force that built the empire."
  },
  jesus_ministry: {
    narrative: "Around 30 CE, in the Roman province of Judea, Jesus of Nazareth, a Jewish prophet and teacher, began public ministry, preaching the arrival of the Kingdom of God, love of enemies, and compassion for the poor and marginalized. Traveling through Galilee and Judea, Jesus gathered disciples, performed healings, and challenged both the local religious authorities and Roman colonial status quo.\n\nJesus' teachings on social equality and spiritual authority alarmed the Temple establishment and the Roman governor, Pontius Pilate, who feared a popular rebellion. Around 30 or 33 CE, during the Passover festival, Jesus was arrested, tried, and executed by crucifixion—the standard Roman punishment for sedition.\n\nFollowing his death, his followers claimed he rose from the dead, initiating a movement that spread rapidly through the Roman Empire's maritime trade routes and road networks, spearheaded by figures like Paul of Tarsus. Once a persecuted sect, Christianity became the official religion of the Roman Empire under Constantine in 380 CE, defining Western civilization.",
    causes: [
      "Socio-religious tension in Roman-occupied Judea under colonial taxation and local administration",
      "Jesus' public preaching of an egalitarian spiritual message, attracting disciples",
      "Roman governor Pontius Pilate's decision to execute Jesus to prevent political rebellion"
    ],
    effects: [
      "Birth of Christianity, which spread to become the world's most practiced religion",
      "Transformation of the Roman Empire's cultural, legal, and social foundations",
      "Creation of the Christian calendar, defining modern global divisions of time"
    ],
    keyFigures: [
      { name: "Jesus of Nazareth", role: "Spiritual teacher whose ministry founded Christianity" },
      { name: "Paul of Tarsus", role: "Apostle whose missionary journeys spread Christianity across the Roman Empire" }
    ],
    relatedEvents: ["roman_expansion", "roman_empire_peak", "roman_fall"],
    imageQuery: "Judea Galilee ruins ancient Roman province",
    imageCaption: "Ruins of Capernaum on the Sea of Galilee — the center of Jesus' public ministry."
  },
  silk_road_begins: {
    narrative: "In 138 BCE, Emperor Wu of the Han Dynasty sent an envoy named Zhang Qian to Central Asia to secure military alliances against the Xiongnu nomads. While the diplomatic mission failed, Zhang Qian returned with reports of sophisticated civilizations, merchant networks, and high-quality horses in Fergana. This discovery prompted the Han Dynasty to secure trade corridors, establishing the Silk Road.\n\nThe Silk Road was not a single highway but a network of overland trade routes connecting Chang'an (Xi'an) to Antioch, Alexandria, and Rome. Merchants rarely traveled the entire route; goods were exchanged at oasis cities like Dunhuang, Kashgar, and Samarkand. Silk, paper, and porcelain traveled west, while horses, grapes, glass, and alfalfa traveled east.\n\nBeyond luxury goods, the Silk Road served as a superhighway for cultural exchange. Buddhism spread from India to China; technologies like papermaking and gunpowder moved west; and pathogens, including the bubonic plague, traveled along the same paths, shaping global history.",
    causes: [
      "Zhang Qian's Han diplomatic mission reporting advanced merchant networks in Central Asia",
      "Han Dynasty's conquest of the Hexi Corridor, securing a safe passage to western deserts",
      "High demand for Chinese silk in the Roman Empire and for western horses in China"
    ],
    effects: [
      "Establishment of the first transcontinental trade network connecting China, India, Persia, and Rome",
      "Spread of Buddhism from India to East Asia, transforming Chinese culture",
      "Transfers of critical technologies (papermaking, printing) and diseases across Eurasia"
    ],
    keyFigures: [
      { name: "Zhang Qian", role: "Han diplomat whose travels mapped the trade routes of Central Asia" },
      { name: "Emperor Wu of Han", role: "Sovereign who expanded borders and officially opened trade routes" }
    ],
    relatedEvents: ["han_dynasty", "roman_empire_peak", "silk_road_peak"],
    imageQuery: "Silk Road caravan camel desert Dunhuang",
    imageCaption: "Dunhuang oasis — a critical trade stop and Buddhist center along the early Silk Road."
  },
  han_dynasty: {
    narrative: "Ruling China from 202 BCE to 220 CE, the Han Dynasty established the political, cultural, and administrative templates that defined Chinese identity for millennia. Founded by Liu Bang (Emperor Gaozu) after the fall of the legalist Qin Dynasty, the Han blended Legalist administrative structures with Confucian philosophy, establishing a meritocratic civil service exam system.\n\nThe Han period was a golden age of science and culture. The official Cai Lun invented paper in 105 CE, revolutionizing administration and literacy; seismoscopes, sun dials, and advanced agricultural iron tools were developed. Emperor Wu expanded China's borders into Korea, Vietnam, and Central Asia, securing the Hexi Corridor and initiating trade along the Silk Road.\n\nWhile the dynasty collapsed in 220 CE due to peasant rebellions (the Yellow Turban Rebellion) and court corruption, its cultural legacy was so deep that the majority ethnic group in China still calls itself the 'Han people', and Chinese characters are known as 'Hanzi'.",
    causes: [
      "Overthrow of the tyrannical Qin Dynasty by rebel leader Liu Bang",
      "State integration of Confucianism with Legalist bureaucracy, creating a stable administrative model",
      "Military victories against Xiongnu nomads, securing frontiers and trade corridors"
    ],
    effects: [
      "Invention of paper, transforming literacy, records, and global communication",
      "Establishment of the civil service exam system, creating a bureaucratic elite class",
      "Permanent expansion of Chinese borders and establishment of Han ethnic identity"
    ],
    keyFigures: [
      { name: "Liu Bang (Gaozu)", role: "Peasant rebel leader who founded the Han Dynasty" },
      { name: "Cai Lun", role: "Han eunuch court official credited with the invention of paper" }
    ],
    relatedEvents: ["qin_unification", "silk_road_begins", "roman_empire_peak"],
    imageQuery: "Han Dynasty pottery horse tomb art",
    imageCaption: "A Han Dynasty ceramic horse — symbolizing the prized 'heavenly horses' of Central Asia."
  },
  roman_empire_peak: {
    narrative: "During the reign of Emperor Trajan (98-117 CE), the Roman Empire reached its greatest territorial extent, spanning 5 million square kilometers and governing over 70 million people. The empire stretched from the borders of Scotland (Hadrian's Wall) to the Persian Gulf, and from the Rhine and Danube rivers to the Sahara Desert, encircling the Mediterranean, which Romans proudly called 'Mare Nostrum' (Our Sea).\n\nThis peak was characterized by the Pax Romana (Roman Peace)—a 200-year period of relative internal stability that enabled trade, urban growth, and monumental architecture. Cities from London to Carthage were built with aqueducts, amphitheaters, paved roads, and public baths, standardizing Roman urban culture.\n\nTrajan's massive construction projects, funded by the conquest of Dacia's gold mines, included the famous Trajan's Column and Forum in Rome. While the empire's borders would contract shortly after his death under his successor Hadrian, this era represented the zenith of Roman military, economic, and administrative power.",
    causes: [
      "Trajan's military campaigns conquering Dacia and Parthian Mesopotamia",
      "disciplined administrative consolidation under the early emperors (Julio-Claudians, Flavians, Antonines)",
      "Establishment of defensive border systems (limes) and legions securing the frontiers"
    ],
    effects: [
      "Roman Empire reaches its maximum size, enclosing the entire Mediterranean basin",
      "Golden age of Roman architecture, including the Pantheon and Colosseum",
      "Pax Romana enabled unprecedented trade, travel, and cultural integration across Eurasia"
    ],
    keyFigures: [
      { name: "Trajan", role: "Emperor who oversaw Rome's greatest territorial expansion" },
      { name: "Hadrian", role: "Successor who consolidated borders, built Hadrian's Wall and the Pantheon" }
    ],
    relatedEvents: ["roman_expansion", "roman_fall", "silk_road_begins"],
    imageQuery: "Trajan Column Forum Rome ruins",
    imageCaption: "Trajan's Column in Rome — commemorating the emperor's victories in Dacia."
  },

  // --- MEDIEVAL ---
  silk_road_peak: {
    narrative: "During the Tang Dynasty in China and the Abbasid Caliphate in Baghdad (7th to 10th centuries), the Silk Road reached its historical peak of trade volume and cultural exchange. Caravans carrying silk, spices, porcelain, and jade traveled across deserts and mountains, while maritime routes via the Indian Ocean expanded, creating a dual overland-maritime trading network.\n\nChang'an, the Tang capital, became the world's largest city, housing merchants, monks, and diplomats from Persia, India, Korea, and Syria. The city's markets were filled with exotic goods, and foreign religions (Nestorian Christianity, Islam, Zoroastrianism) were permitted alongside Buddhism. In Baghdad, the House of Wisdom translated Greek, Indian, and Persian texts, sharing scientific knowledge along the route.\n\nThe peak of the Silk Road was not just economic; it was a period of technological transfer. The battle of Talas in 751 CE between Tang and Abbasid forces led to the capture of Chinese papermakers, introducing paper production to Samarkand and the Islamic world, which subsequently reached Europe.",
    causes: [
      "Tang Dynasty's expansion into Central Asia, securing the Silk Road corridors",
      "Rise of the wealthy Abbasid Caliphate in Baghdad, generating high demand for eastern luxuries",
      "Expansion of maritime trade routes connecting Guangzhou and Persian Gulf ports"
    ],
    effects: [
      "Unprecedented cosmopolitan cultural exchange in Chang'an and Baghdad",
      "Transfer of papermaking technology from China to the Islamic world following the Battle of Talas",
      "Spread of religions, mathematics (Arabic numerals), and medical science across Eurasia"
    ],
    keyFigures: [
      { name: "Xuanzang", role: "Tang monk whose journey to India popularized Buddhism along the Silk Road" },
      { name: "Caliph Harun al-Rashid", role: "Abbasid ruler during Baghdad's golden age of trade and science" }
    ],
    relatedEvents: ["silk_road_begins", "islamic_golden_age", "song_dynasty"],
    imageQuery: "Tang Dynasty camel caravanserai Silk Road",
    imageCaption: "A Tang Dynasty tri-color glazed ceramic camel — symbolizing Silk Road commerce."
  },
  byzantine_peak: {
    narrative: "During the reign of Justinian I (527-565 CE), the Byzantine Empire (the Eastern Roman Empire) reached its peak of power and territory. Justinian set out to reclaim the lost Western Roman Empire, sending his brilliant general Belisarius to conquer Italy, North Africa, and southern Spain, briefly reconstituting the Mediterranean Roman world.\n\nJustinian's legacy was also administrative and architectural. He ordered the compilation of the Corpus Juris Civilis (Body of Civil Law), standardizing Roman law into a single code that forms the foundation of modern civil law in Europe and Latin America. In 537 CE, he completed the Hagia Sophia (Holy Wisdom), a massive domed basilica that stood as Christianity's largest cathedral for a thousand years.\n\nHowever, this peak was immediately followed by crises. The Plague of Justinian (541-542 CE)—an early outbreak of bubonic plague—killed up to a third of the empire's population, hollowing out the tax base and military. Justinian's conquests proved temporary, leaving the treasury depleted and the empire vulnerable to Lombard and Arab invasions.",
    causes: [
      "Justinian I's ambition to restore the territories of the Western Roman Empire",
      "Military campaigns led by General Belisarius conquering North Africa and Italy",
      "Accumulation of imperial wealth through centralized taxation and trade control"
    ],
    effects: [
      "Codification of Roman Law (Corpus Juris Civilis), defining modern European civil codes",
      "Construction of Hagia Sophia, the masterpiece of Byzantine architecture",
      "Outbreak of the Plague of Justinian, weakening the empire's population and finances"
    ],
    keyFigures: [
      { name: "Justinian I", role: "Emperor who codified Roman law and built Hagia Sophia" },
      { name: "Belisarius", role: "Brilliant general who reclaimed Italy and North Africa for the Empire" }
    ],
    relatedEvents: ["roman_fall", "islamic_golden_age", "ottoman_constantinople"],
    imageQuery: "Hagia Sophia Istanbul Byzantine architecture",
    imageCaption: "Hagia Sophia in Istanbul — built as the premier cathedral of the Byzantine Empire."
  },
  islamic_golden_age: {
    narrative: "Beginning with the rise of the Abbasid Caliphate in 750 CE and centered around the newly founded capital of Baghdad, the Islamic Golden Age was an era of unprecedented scientific, mathematical, and philosophical achievement. The caliphs established the House of Wisdom (Bayt al-Hikma), a translation center and library where scholars translated Greek, Persian, Sanskrit, and Syriac manuscripts into Arabic.\n\nIslamic scholars did not merely preserve ancient knowledge; they revolutionized it. Al-Khwarizmi developed algebra (al-jabr) and introduced Indian decimal systems (Arabic numerals); Ibn al-Haytham pioneered optics and the scientific method; and Ibn Sina (Avicenna) wrote the Canon of Medicine, which served as Europe's standard medical textbook for centuries.\n\nThis intellectual golden age was supported by paper technology, which spread rapidly after the Battle of Talas (751 CE). Cities like Cordoba, Cairo, and Samarkand became centers of learning with universities and public libraries, acting as a bridge that sparked the European Renaissance.",
    causes: [
      "Establishment of the Abbasid Caliphate and construction of Baghdad as a trade crossroads",
      "State patronage of scholarship, culminating in the founding of the House of Wisdom",
      "Acquisition of papermaking technology, enabling mass production of books and libraries"
    ],
    effects: [
      "Development of algebra, modern optics, and standardized medical science",
      "Preservation and critique of Classical philosophy, translating Aristotle and Plato back to Europe",
      "Establishment of world's earliest universities (Al-Qarawiyyin, Al-Azhar)"
    ],
    keyFigures: [
      { name: "Al-Khwarizmi", role: "Mathematician who developed algebra and introduced Arabic numerals" },
      { name: "Ibn Sina (Avicenna)", role: "Philosopher and physician who wrote the Canon of Medicine" }
    ],
    relatedEvents: ["byzantine_peak", "silk_road_peak", "crusades"],
    imageQuery: "House of Wisdom Baghdad scholars",
    imageCaption: "Scholars at the House of Wisdom in Baghdad — translating and advancing ancient sciences."
  },
  viking_expansion: {
    narrative: "Beginning with the raid on Lindisfarne monastery in England in 793 CE, the Viking Age saw Norse seafarers from Scandinavia expand across Europe and the North Atlantic. Utilizing their advanced clinker-built longships, which could sail in open seas and navigate shallow rivers, the Vikings launched raids, traded, and established settlements from Russia to North America.\n\nThe Vikings were not merely raiders; they were expert merchants and colonizers. In the east, Swedish Vikings (the Rus) sailed down the Volga and Dnieper rivers, founding Kyiv and establishing trade routes with Constantinople and Baghdad. In the west, Norsemen colonized Iceland and Greenland, and around 1000 CE, Leif Erikson established a short-lived settlement at L'Anse aux Meadows in Newfoundland, Canada—reaching the Americas 500 years before Columbus.\n\nThe Viking expansion reshaped European history: they founded the Duchy of Normandy in France, settled the Danelaw in England, and their descendants (the Normans) went on to conquer England, southern Italy, and lead the Crusades.",
    causes: [
      "Development of advanced Viking longships combining sails and oars for shallow-river navigation",
      "Population pressure and agricultural land scarcity in Scandinavian fjords",
      "Wealth concentration in poorly defended Christian monasteries in Western Europe"
    ],
    effects: [
      "Establishment of transatlantic colonies in Iceland, Greenland, and North America",
      "Founding of Kyivan Rus in Eastern Europe and the Duchy of Normandy in France",
      "Integration of Scandinavian kingdoms into European Christian civilization"
    ],
    keyFigures: [
      { name: "Leif Erikson", role: "Explorer who established a Norse settlement in North America" },
      { name: "Rollo of Normandy", role: "Viking chieftain who became the first ruler of Normandy" }
    ],
    relatedEvents: ["roman_fall", "crusades", "age_discovery"],
    imageQuery: "Viking longship museum Oslo",
    imageCaption: "A preserved Viking longship — the maritime technology that enabled global Norse expansion."
  },
  polynesian_settlement: {
    narrative: "Between 700 and 1200 CE, Polynesian navigators completed one of the most astonishing maritime migrations in human history, settling the vast 'Polynesian Triangle' spanning from Hawaii in the north, Easter Island (Rapa Nui) in the southeast, and New Zealand (Aotearoa) in the southwest. Without metal tools or instruments, they crossed thousands of kilometers of open ocean.\n\nPolynesians navigated using wayfinding: observing the stars (celestial navigation), wave patterns, wind direction, bird migrations, and cloud formations. They traveled in double-hulled outrigger canoes (waka) capable of carrying families, crops (taro, yams, sweet potatoes), and animals (pigs, dogs, chickens) to seed new societies.\n\nThe settlement of New Zealand around 1200-1300 CE by East Polynesians established the Maori culture, characterized by complex social structures, monumental wood carving, and adaptation to a temperate climate. The monumental Moai statues of Easter Island represent another peak of Polynesian social and engineering capability.",
    causes: [
      "Mastery of wayfinding navigation techniques and double-hulled outrigger waka designs",
      "Social friction and resource limits on small central Pacific islands driving migrations",
      "Introduction of resilient crops (sweet potato, taro) that could sustain long ocean voyages"
    ],
    effects: [
      "Settlement of the world's most isolated islands, from Hawaii to Easter Island",
      "Establishment of the Maori culture in Aotearoa (New Zealand)",
      "ecological transformation of island biomes, including extinctions of megafauna like the Moa"
    ],
    keyFigures: [
      { name: "Kupe", role: "Legendary Polynesian navigator credited with the discovery of Aotearoa (New Zealand)" }
    ],
    relatedEvents: ["viking_expansion", "age_discovery", "portuguese_india"],
    imageQuery: "Polynesian double hulled canoe waka",
    imageCaption: "A reconstruction of a Polynesian double-hulled voyaging canoe — built for transoceanic migration."
  },
  song_dynasty: {
    narrative: "Ruling China from 960 to 1279 CE, the Song Dynasty oversaw a commercial and technological revolution that made it the wealthiest and most advanced society of the medieval world. While militarily weaker than the Han or Tang, the Song achieved economic dominance, transforming China's economy into a market-oriented system.\n\nThe Song period saw the invention of three technologies that reshaped global history: gunpowder, the magnetic compass (crucial for maritime trade), and movable type printing. In 1024 CE, the Song government issued Jiaozi, the world's first official paper currency, to facilitate massive trade volumes. They pioneered large-scale iron and steel production and optimized wet-rice agriculture by importing fast-ripening Champa rice from Vietnam.\n\nThis economic surplus fueled a massive urbanization, with cities like Hangzhou housing over a million residents. The dynasty was eventually conquered by Kublai Khan's Mongol forces in 1279, but its economic and technological innovations laid the foundations for the modern world.",
    causes: [
      "Introduction of fast-ripening Champa rice, doubling agricultural yields and population",
      "State standardization of the civil service exams, creating a highly educated administrative class",
      "Invention of paper money (Jiaozi) and maritime compasses, expanding commerce"
    ],
    effects: [
      "Commercial revolution marked by mass iron production, printing, and gunpowder weaponry",
      "Development of the world's first paper currency system",
      "Urbanization and rise of merchant guilds, shifting China from an agrarian to a market economy"
    ],
    keyFigures: [
      { name: "Shen Kuo", role: "Song polymath who documented the magnetic compass and agricultural innovations" },
      { name: "Emperor Taizu of Song", role: "Founder who unified China and prioritized civil bureaucracy over military rule" }
    ],
    relatedEvents: ["silk_road_peak", "mongol_empire", "zheng_he_voyages"],
    imageQuery: "Song Dynasty scroll Qingming Festival Kaifeng",
    imageCaption: "The scroll 'Along the River During the Qingming Festival' — depicting Song dynasty urban commerce."
  },
  crusades: {
    narrative: "In 1095, Pope Urban II delivered a sermon at the Council of Clermont, calling on Christian knights to launch a holy war to reclaim Jerusalem and the Holy Land from Muslim control. The resulting First Crusade (1096-1099) succeeded in capturing Jerusalem, establishing four Crusader States along the Levant coast (Jerusalem, Tripoli, Antioch, and Edessa).\n\nThe Crusades were characterized by religious zeal, brutal massacres of Muslim and Jewish populations, and geopolitical rivalry. Over the next two centuries, eight major Crusades were launched. While subsequent Crusades failed to hold Jerusalem (which was recaptured by Saladin in 1187) and culminated in the sack of Christian Constantinople by Fourth Crusaders in 1204, the campaigns transformed Europe.\n\nThe Crusades reopened trade routes between Europe and the Middle East, introducing Europeans to silk, spices, sugar, and Arabic translations of classical philosophy. This trade enriched Italian city-states like Venice and Genoa, funding the merchant wealth that eventually ignited the Renaissance.",
    causes: [
      "Pope Urban II's call at Clermont to reclaim Jerusalem and aid the Byzantine Empire",
      "Rise of the Seljuk Turks, restricting Christian pilgrim access to the Holy Land",
      "Population growth in European feudal lands, creating a surplus of landless knights"
    ],
    effects: [
      "Establishment of Crusader States in the Levant, followed by centuries of sectarian conflict",
      "Reopening of Mediterranean trade routes, enriching Venice, Genoa, and Italian city-states",
      "Transfer of Islamic scientific knowledge, paper, and spices to Western Europe"
    ],
    keyFigures: [
      { name: "Pope Urban II", role: "Pontiff who launched the First Crusade" },
      { name: "Saladin (Salah ad-Din)", role: "Ayyubid Sultan who recaptured Jerusalem from the Crusaders" }
    ],
    relatedEvents: ["islamic_golden_age", "byzantine_peak", "magna_carta"],
    imageQuery: "Crusader castle Krak des Chevaliers Syria",
    imageCaption: "Krak des Chevaliers in Syria — a massive Crusader fortress built to secure territory."
  },
  magna_carta: {
    narrative: "On 15 June 1215, at Runnymede, a group of rebel English barons forced King John to sign Magna Carta (the Great Charter). King John had alienated the nobility through excessive taxation to fund failed wars in France, arbitrary confiscation of property, and abuse of royal justice. The charter aimed to place limits on the king's absolute power.\n\nMost of Magna Carta's 63 clauses dealt with specific feudal grievances. However, Clause 39 established a revolutionary principle: no free man could be imprisoned, stripped of rights, or exiled except 'by the lawful judgment of his equals or by the law of the land.' This clause laid the legal foundations for due process, habeas corpus, and the rule of law.\n\nWhile King John immediately nullified the charter with papal backing, sparking a civil war, Magna Carta was reissued by later kings. It became a powerful symbol of liberty, cited by parliamentarians during the English Civil War, and served as a direct inspiration for the United States Constitution and the Bill of Rights.",
    causes: [
      "King John's military defeats in France and subsequent high taxation of English barons",
      "Arbitrary royal rulings, property seizures, and abuse of the justice system",
      "Armed rebellion of the barons, who captured London and forced negotiation"
    ],
    effects: [
      "Establishment of the principle that the monarch is not above the law (rule of law)",
      "Creation of the legal foundations for due process of law and habeas corpus",
      "Inspiration for early parliamentary governance and modern democratic constitutions"
    ],
    keyFigures: [
      { name: "King John", role: "English monarch forced to sign the Great Charter" },
      { name: "Stephen Langton", role: "Archbishop of Canterbury who drafted and negotiated the charter" }
    ],
    relatedEvents: ["crusades", "mongol_empire", "black_death"],
    imageQuery: "Magna Carta Runnymede monument",
    imageCaption: "A surviving copy of Magna Carta (1215) — the foundation of the rule of law."
  },
  khmer_angkor: {
    narrative: "Between the 9th and 15th centuries, the Khmer Empire dominated mainland Southeast Asia, centered around its capital Angkor in modern-day Cambodia. Angkor was the largest pre-industrial city in the world, housing up to a million residents. Its survival and wealth relied on a complex water management system—a network of massive reservoirs (barays), canals, and dikes that captured monsoon rains to irrigate rice fields year-round.\n\nAt the center of this hydraulic empire stood Angkor Wat, built around 1113-1150 CE by King Suryavarman II. Angkor Wat was designed as a temple-mountain dedicated to the Hindu god Vishnu, representing Mount Meru, the home of the gods. The temple's bas-reliefs depict epic Hindu myths and historical scenes of royal power.\n\nUnder Jayavarman VII, the empire converted to Mahayana Buddhism, and he constructed Angkor Thom and the Bayon temple, famous for its massive stone faces. The empire declined in the 15th century, likely due to climate shifts that disrupted the monsoon-dependent water systems, leading to Angkor's abandonment.",
    causes: [
      "Advanced hydraulic engineering, capturing monsoon rains in massive reservoirs (barays)",
      "Introduction of wet-rice agricultural surpluses, sustaining a dense urban population",
      "Khmer kings adopting Hindu-Buddhist divine kingship concepts (Devaraja)"
    ],
    effects: [
      "Construction of Angkor Wat, the world's largest religious monument",
      "Heft of Khmer culture, language, and Theravada Buddhism across Southeast Asia",
      "Urban collapse in 15th century due to ecological stress, moving the capital to Phnom Penh"
    ],
    keyFigures: [
      { name: "Suryavarman II", role: "King who commissioned the construction of Angkor Wat" },
      { name: "Jayavarman VII", role: "Buddhist King who rebuilt the capital and built the Bayon temple" }
    ],
    relatedEvents: ["song_dynasty", "mongol_empire", "zheng_he_voyages"],
    imageQuery: "Angkor Wat temple ruins Cambodia",
    imageCaption: "Angkor Wat at sunrise — the pinnacle of Khmer architecture and hydraulic civilization."
  },
  mali_mansa_musa: {
    narrative: "In 1324 CE, Mansa Musa, the emperor of the Mali Empire, embarked on a legendary pilgrimage (Hajj) to Mecca that put West Africa's wealth on the European map. Traveling with a caravan of up to 60,000 soldiers, courtiers, and slaves, Musa carried tons of gold, distributing it generously to the poor and purchasing goods in Cairo, Medina, and Mecca.\n\nMusa's gold distribution was so massive that it caused inflation and depressed the value of gold in Egypt and the Middle East for a decade. The pilgrimage showcased Mali's position as the world's largest producer of gold and a key hub of the Trans-Saharan trade networks, which exchanged gold and ivory for Saharan salt and European textiles.\n\nUpon his return, Musa transformed Mali into an Islamic cultural center. He hired Andalusian architect Abu Ishaq al-Sahili to build the iconic mud-brick Djinguereber Mosque in Timbuktu and established the University of Sankore, attracting scholars, jurists, and mathematicians from across the Islamic world.",
    causes: [
      "Mali's control of the West African gold fields (Bambuk, Boure) and Trans-Saharan trade routes",
      "Mansa Musa's conversion to Islam and his obligation to perform the Hajj pilgrimage",
      "Mali's administrative organization, maintaining peace and secure trade across the Sahel"
    ],
    effects: [
      "Mali's wealth illustrated on European maps, including the famous Catalan Atlas of 1375",
      "Transformation of Timbuktu into a major global center of Islamic scholarship and book trade",
      "Economic inflation in the Mediterranean and Egypt due to the massive influx of gold"
    ],
    keyFigures: [
      { name: "Mansa Musa", role: "Emperor of Mali whose pilgrimage showcased West African wealth" },
      { name: "Abu Ishaq al-Sahili", role: "Andalusian architect who designed Timbuktu's mosques and palaces" }
    ],
    relatedEvents: ["mongol_empire", "ottoman_constantinople", "age_discovery"],
    imageQuery: "Djinguereber Mosque Timbuktu Mali mud brick",
    imageCaption: "The Djinguereber Mosque in Timbuktu — built in 1327 of mud brick and wood."
  },
  zheng_he_voyages: {
    narrative: "Between 1405 and 1433, during the Ming Dynasty, the Yongle Emperor commissioned Admiral Zheng He, a Muslim eunuch, to lead seven massive naval expeditions across the Indian Ocean. The voyages aimed to project Ming power, secure tribute from foreign kingdoms, and monopolize maritime trade networks.\n\nZheng He's fleet was the largest the world had ever seen, consisting of up to 300 ships and 28,000 men. The fleet included 'Treasure Ships' (Baochuan) that were reportedly 400 feet long—several times the size of Columbus's Santa Maria. The expeditions traveled to Southeast Asia, India, Persia, Arabia, and East Africa, exchanging Chinese silk and porcelain for spices, ivory, and exotic animals like giraffes.\n\nUnlike European explorers, Zheng He did not conquer or establish colonies; his missions were diplomatic. However, following the Yongle Emperor's death, the Ming court pivoted toward isolationism, halted the voyages, and burned the records. China abandoned its naval supremacy, paving the way for European dominance in the Indian Ocean.",
    causes: [
      "Yongle Emperor's desire to assert Ming Dynasty legitimacy and establish tribute relationships",
      "Ming China's advanced maritime engineering, constructing massive multi-decked treasure ships",
      "Securing Indian Ocean trade routes and suppressing piracy in Southeast Asian straits"
    ],
    effects: [
      "Projection of Chinese cultural and diplomatic influence across the Indian Ocean basin",
      "Migration of Chinese merchants to Southeast Asia, forming early diaspora communities",
      "Ming court's turn toward isolationism, destroying the fleet and leaving a maritime vacuum"
    ],
    keyFigures: [
      { name: "Zheng He", role: "Admiral who led the Ming treasure voyages" },
      { name: "Yongle Emperor", role: "Ming sovereign who sponsored the naval expeditions and built the Forbidden City" }
    ],
    relatedEvents: ["song_dynasty", "ottoman_constantinople", "age_discovery"],
    imageQuery: "Zheng He treasure ship size comparison",
    imageCaption: "Zheng He's massive treasure ship compared to Columbus's Santa Maria."
  },

  // --- COLONIAL ---
  ottoman_rise: {
    narrative: "Following the conquest of Constantinople in 1453, the Ottoman Empire consolidated its control over the Anatolian peninsula and expanded rapidly, becoming a dominant global power. The Ottomans established a highly centralized military state, led by Janissaries—an elite standing infantry unit composed of Christian youth conscripted through the devshirme system and converted to Islam.\n\nUnder Sultan Selim I, the Ottomans defeated the Mamluks, annexing Egypt, Syria, and the holy cities of Mecca and Medina in 1517, establishing the Ottoman Sultan as Caliph of the Islamic world. Under Suleiman the Magnificent (1520-1566), the empire expanded into Central Europe, besieging Vienna in 1529, and dominated Mediterranean trade routes.\n\nThe Ottoman rise had profound global consequences: their monopoly over overland trade routes between Europe and Asia forced European merchants to seek alternative sea routes, directly initiating the Age of Discovery and the rise of European maritime empires.",
    causes: [
      "Capture of Constantinople (1453), giving the Ottomans a highly strategic geographic center",
      "Establishment of the Janissary corps, the first disciplined standing army in early modern Europe",
      "Annexation of Mamluk Egypt and Syria (1517), securing trade routes and the Caliphate"
    ],
    effects: [
      "Ottoman monopoly over trade routes to Asia, driving European maritime exploration",
      "Ottoman Caliphate establishes hegemony over the Middle East and North Africa for 400 years",
      "Sectarian division and military conflict along the borders of Christian Central Europe"
    ],
    keyFigures: [
      { name: "Suleiman the Magnificent", role: "Sultan who expanded the empire to its peak and codified laws" },
      { name: "Selim I", role: "Sultan who conquered Egypt and declared the Ottoman Caliphate" }
    ],
    relatedEvents: ["ottoman_constantinople", "age_discovery", "portuguese_india"],
    imageQuery: "Suleiman the Magnificent portrait Ottoman",
    imageCaption: "Sultan Suleiman the Magnificent — under whom the Ottoman Empire reached its legislative and territorial peak."
  },
  age_discovery: {
    narrative: "In 1492, the Genoese explorer Christopher Columbus, sailing under the Spanish crown, landed in the Bahamas, seeking a western route to the spice-rich markets of Asia. This voyage initiated the Age of Discovery—an era of transoceanic exploration that connected the Eastern and Western hemispheres, permanently altering global history.\n\nThis connection unleashed the Columbian Exchange: a massive transfer of plants, animals, culture, populations, and communicable diseases. American crops like potatoes, maize, and cassava traveled to Europe and Africa, triggering a global population boom. Conversely, Europeans introduced horses, cattle, wheat, and, catastrophically, pathogens like smallpox, measles, and influenza.\n\nHaving no immunity to Eurasian diseases, the indigenous populations of the Americas collapsed by an estimated 80-90% within a century. This demographic collapse created a severe labor shortage, which European powers resolved by establishing the Transatlantic Slave Trade, launching a global economy built on colonial extraction.",
    causes: [
      "Ottoman control of overland trade routes, raising the cost of Asian silk and spices in Europe",
      "Spanish and Portuguese investment in maritime technology, cartography, and navigation",
      "Columbus's attempt to find a western passage to Asia, backed by the Spanish monarchs Ferdinand and Isabella"
    ],
    effects: [
      "Establishment of permanent contact between Afro-Eurasia and the Americas (Columbian Exchange)",
      "Demographic collapse of indigenous American populations due to Eurasian diseases",
      "Origins of the Transatlantic Slave Trade and European colonization of the Americas"
    ],
    keyFigures: [
      { name: "Christopher Columbus", role: "Explorer whose 1492 voyage connected the Americas to Europe" },
      { name: "Ferdinand Magellan", role: "Navigator whose expedition completed the first circumnavigation of the globe" }
    ],
    relatedEvents: ["ottoman_rise", "portuguese_india", "spanish_conquest"],
    imageQuery: "Columbian Exchange map plants diseases",
    imageCaption: "The Columbian Exchange — the global transfer of species that reshaped world agriculture and demography."
  },
  portuguese_india: {
    narrative: "In 1498, Portuguese explorer Vasco da Gama successfully rounded the Cape of Good Hope and reached Calicut, India, establishing the first direct maritime trade route between Europe and Asia. Rather than attempting land conquest, Portugal built a 'trading post empire' (Estado da Índia) along the rim of the Indian Ocean.\n\nLed by Governor Afonso de Albuquerque, the Portuguese captured strategic choke points: Goa in India (1510), Malacca in Malaysia (1511), and Hormuz in Iran (1515). They forced all merchant vessels to purchase a shipping license (cartaz) and route through Portuguese ports, establishing a naval monopoly on the lucrative spice trade.\n\nThis maritime breakthrough ended Venice's monopoly on Eastern trade in Europe and bypassed Ottoman tariffs. While Portugal was too small to maintain the monopoly against Dutch and British competition in the 17th century, their arrival initiated the European integration into Asian maritime trade networks.",
    causes: [
      "Vasco da Gama rounding the Cape of Good Hope to bypass overland Ottoman trade routes",
      "Portugal's development of the caravel ship and advanced navigation charts",
      "Strategic naval planning by Afonso de Albuquerque to control trade bottlenecks"
    ],
    effects: [
      "Establishment of the first European maritime empire in Asia, centered at Goa",
      "Breakup of Venetian and Ottoman monopoly over the Eurasian spice trade",
      "Global exchange of cash crops (chilies, cashews, tobacco) between the Americas and Asia"
    ],
    keyFigures: [
      { name: "Vasco da Gama", role: "Navigator who opened the sea route from Europe to India" },
      { name: "Afonso de Albuquerque", role: "Admiral who secured Goa, Malacca, and Hormuz for Portugal" }
    ],
    relatedEvents: ["age_discovery", "spanish_conquest", "british_raj"],
    imageQuery: "Vasco da Gama arrival Calicut India 1498",
    imageCaption: "Vasco da Gama's fleet in Calicut — marking the beginning of direct European maritime trade with Asia."
  },
  spanish_conquest: {
    narrative: "In 1519, Hernán Cortés landed on the Gulf coast of Mexico with a small force of 500 Spanish conquistadors. By 1521, the Aztec capital Tenochtitlan lay in ruins, and the massive Aztec Empire had collapsed. This rapid conquest was achieved through a combination of superior steel weapons, cavalry, strategic alliances with indigenous enemies of the Aztecs (like the Tlaxcalans), and, crucially, smallpox.\n\nSmallpox, introduced by the Spaniards, swept through Tenochtitlan during the siege, killing the Aztec emperor Cuitláhuac and up to half the city's population. In 1532, Francisco Pizarro used similar tactics to capture the Inca Emperor Atahualpa, conquering the Inca Empire in Peru. Spain established the viceroyalties of New Spain and Peru, initiating colonial rule.\n\nThese conquests funded Spain through silver mining (especially at Potosí, Bolivia). The flood of silver transformed the global economy, connecting Spain to China via the Manila Galleon trade, but also triggered severe inflation in Europe and funded Spain's religious wars.",
    causes: [
      "Hernán Cortés forming alliances with Tlaxcala and other indigenous states hostile to Aztec rule",
      "Technological asymmetry: Spanish steel armor, firearms, and horses against obsidian weapons",
      "Demographic devastation caused by the smallpox epidemic, paralyzing Aztec defense"
    ],
    effects: [
      "Collapse of the Aztec and Incan empires; establishment of Spanish colonial rule in the Americas",
      "Massive extraction of silver, connecting global trade networks via Manila and Spain",
      "Racial synthesis and cultural transformation of Latin America (mestizo society)"
    ],
    keyFigures: [
      { name: "Hernán Cortés", role: "Conquistador who led the conquest of the Aztec Empire" },
      { name: "Moctezuma II", role: "Aztec Emperor captured by Cortés in Tenochtitlan" }
    ],
    relatedEvents: ["age_discovery", "trade_triangles", "haitian_revolution"],
    imageQuery: "Tenochtitlan siege Cortes Aztec smallpox",
    imageCaption: "The ruins of Tenochtitlan — conquered in 1521, paving the way for Mexico City."
  },
  trade_triangles: {
    narrative: "Reaching its historical peak in the 18th century, the Transatlantic Slave Trade was the core of a 'Triangular Trade' network connecting Europe, Africa, and the Americas. European merchants sailed to West Africa carrying manufactured goods, guns, and textiles, which they exchanged for captured Africans. The enslaved were then transported across the Atlantic via the brutal 'Middle Passage'.\n\nThe Middle Passage was characterized by high mortality rates, with up to 15% of captives dying from disease, malnutrition, and abuse in packed ships. In the Americas, the survivors were forced to labor on sugarcane, tobacco, and cotton plantations. The raw commodities produced by this labor were then shipped back to Europe to fuel early industrial growth.\n\nAn estimated 12.5 million Africans were forced onto slave ships, and 10.7 million survived the journey. The trade decimated West African demographics, fueled regional warfare, enriched European ports (like Liverpool and Nantes), and created a legacy of racial inequality and syncretic Afro-American culture.",
    causes: [
      "Collapse of indigenous American labor populations due to Eurasian diseases",
      "High profitability of sugar, tobacco, and cotton monoculture plantations in the Americas",
      "European demand for raw materials and colonial trade networks"
    ],
    effects: [
      "Forced migration of over 12 million Africans, reshaping the demographics of the Americas",
      "Destabilization and depopulation of West African societies, shifting power to militarized coastal states",
      "Capital accumulation in European ports, helping fund the Industrial Revolution"
    ],
    keyFigures: [
      { name: "Olaudah Equiano", role: "Enslaved African who purchased his freedom and wrote a bestselling autobiography opposing the trade" }
    ],
    relatedEvents: ["age_discovery", "spanish_conquest", "haitian_revolution"],
    imageQuery: "Middle Passage slave ship cargo plan Brooks",
    imageCaption: "The infamous 1788 plan of the slave ship Brookes — showing how human cargo was packed."
  },
  haitian_revolution: {
    narrative: "Between 1791 and 1804, in the French colony of Saint-Domingue (the wealthiest sugar colony in the world), enslaved Africans launched the only successful slave revolt in human history. Inspired by the French Revolution's ideals of liberty and equality, the self-liberated slaves defeated local plantation owners, a British invasion, and a massive French army sent by Napoleon Bonaparte.\n\nLed by the brilliant general Toussaint Louverture, the former slaves organized a disciplined military force. Following Louverture's capture, Jean-Jacques Dessalines led the final campaign, declaring independence on 1 January 1804 and renaming the nation Haiti, derived from the indigenous Taino name for the island.\n\nHaiti became the first independent nation in Latin America, the first modern black-led republic, and the first state to permanently ban slavery. However, the revolution sent shockwaves through slave-holding empires: France forced Haiti to pay a massive indemnity for lost property (slaves) in exchange for recognition, crippling the young nation's economy for over a century.",
    causes: [
      "Brutal exploitation of Saint-Domingue's 500,000 enslaved Africans on sugar plantations",
      "Spread of the French Revolution's ideals of natural rights and citizenship to the colonies",
      "Toussaint Louverture organizing a highly disciplined revolutionary army"
    ],
    effects: [
      "Birth of Haiti, the first independent black-led republic and first state to ban slavery",
      "Geopolitical retreat of France from North America, leading to the Louisiana Purchase by the US",
      "Economic isolation and debt imposed on Haiti by European powers and the United States"
    ],
    keyFigures: [
      { name: "Toussaint Louverture", role: "Revolutionary general who led the early Haitian struggle" },
      { name: "Jean-Jacques Dessalines", role: "Leader who completed the revolution and declared Haitian independence" }
    ],
    relatedEvents: ["french_revolution", "american_independence", "trade_triangles"],
    imageQuery: "Haitian Revolution battle Toussaint Louverture",
    imageCaption: "Battle during the Haitian Revolution — the only successful slave revolt in history."
  },
  british_raj: {
    narrative: "Following the Indian Rebellion of 1857, the British government dissolved the British East India Company, which had ruled parts of the subcontinent through private armies, and established direct crown rule over India—initiating the British Raj. Queen Victoria was declared Empress of India in 1876, and India became the 'Jewel in the Crown' of the British Empire.\n\nThe Raj was characterized by colonial extraction and administrative centralization. The British constructed a massive railway network, telegraph lines, and irrigation canals. However, this infrastructure was designed to extract raw cotton, wheat, and tea to British factories and markets, while flood control and famine relief were neglected, leading to devastating famines (like the Great Famine of 1876-78).\n\nThe Raj consolidated a highly structured civil service (the ICS) and introduced English education, creating a Western-educated Indian elite. This elite, however, would go on to organize the Indian National Congress in 1885, transforming colonial institutions into the vehicle for the independence movement.",
    causes: [
      "Indian Rebellion of 1857 (Sepoy Mutiny) against East India Company rule",
      "British government's desire to secure absolute control over India's resources and markets",
      "Centralization of colonial administration under a Viceroy reporting directly to London"
    ],
    effects: [
      "Direct British crown rule over 300 million Indians for nearly a century",
      "Deindustrialization of India's textile sector, shifting the economy to raw material export",
      "Creation of a unified railway infrastructure and a Western-educated administrative class"
    ],
    keyFigures: [
      { name: "Queen Victoria", role: "British monarch declared Empress of India during the Raj" },
      { name: "Dadabhai Naoroji", role: "Indian nationalist who formulated the 'Drain Theory' of wealth extraction" }
    ],
    relatedEvents: ["portuguese_india", "opium_wars", "decolonization"],
    imageQuery: "British Raj railway construction India 19th century",
    imageCaption: "Construction of the Indian railway network — designed to extract resources for export."
  },
  opium_wars: {
    narrative: "Between 1839 and 1860, Britain and France fought two Opium Wars against Qing Dynasty China, forcing open China's closed markets and initiating the 'Century of Humiliation'. The conflict began when the Qing Emperor banned the import of opium, which the British East India Company grew in India and smuggled into China to balance their trade deficit from importing Chinese tea.\n\nFollowing the Chinese seizure of British opium in Guangzhou, Britain sent ironclad steamships (like the Nemesis) and modern artillery, easily defeating the wooden Chinese war junks. The Treaty of Nanking (1842) forced China to pay a massive indemnity, cede Hong Kong to Britain, and open five 'treaty ports' to British merchants.\n\nThe second war culminated in the sack and burning of the Emperor's Summer Palace (Yuanmingyuan) in Beijing in 1860. The 'Unequal Treaties' established extraterritoriality (foreigners were exempt from Chinese laws) and weakened the Qing Dynasty's authority, paving the way for internal rebellions (like the Taiping Rebellion) and the eventual collapse of the imperial system in 1912.",
    causes: [
      "British East India Company smuggling Indian-grown opium into China to balance tea imports",
      "Qing Emperor's confiscation and destruction of British opium in Guangzhou",
      "British government's military enforcement of 'free trade' and merchant interests"
    ],
    effects: [
      "Treaty of Nanking, ceding Hong Kong to Britain and opening Chinese treaty ports",
      "Establishment of extraterritoriality and foreign spheres of influence across China",
      "Severe weakening of the Qing Dynasty, leading to massive civil wars and imperial collapse"
    ],
    keyFigures: [
      { name: "Lin Zexu", role: "Qing commissioner who confiscated and destroyed British opium in Guangzhou" },
      { name: "Yongzheng/Daoguang Emperor", role: "Sovereigns who attempted to ban the opium trade to protect the population" }
    ],
    relatedEvents: ["british_raj", "meiji_restoration", "china_opens"],
    imageQuery: "Destroying Summer Palace Beijing Opium War 1860",
    imageCaption: "The burning of the Old Summer Palace in Beijing by Anglo-French forces in 1860."
  },
  european_imperialism_africa: {
    narrative: "During the late 19th century, European powers launched a rapid territorial conquest of Africa, transitioning from coastal trading posts to direct colonial administration. Prior to this expansion, Europeans controlled only 10% of Africa; by 1914, they controlled 90%, leaving only Ethiopia and Liberia independent.\n\nThis expansion was driven by the Second Industrial Revolution, which created high demand for raw materials (rubber for tires, copper for electrical wiring, palm oil for machinery lubricants, cotton for textiles) and captive markets. Technological innovations, including the Maxim machine gun, steamships, and quinine (which protected Europeans from malaria), enabled the penetration of the African interior.\n\nThe conquest was characterized by extreme exploitation, most notoriously in the Congo Free State, ruled as personal property by King Leopold II of Belgium. Enslaved populations were forced to meet rubber quotas, and failure resulted in mass mutilations and killings, reducing the population by millions.",
    causes: [
      "Second Industrial Revolution demand for raw materials (rubber, copper, palm oil) and markets",
      "Technological breakthroughs: Maxim machine guns, steamships, and malaria-treating quinine",
      "Geopolitical rivalries between Britain, France, Germany, and Belgium for imperial prestige"
    ],
    effects: [
      "Subjugation of almost the entire African continent under European colonial rule",
      "Extreme exploitation and atrocities, including millions of deaths in the Congo Free State",
      "Disruption of traditional African political structures and borders, setting the stage for future conflicts"
    ],
    keyFigures: [
      { name: "King Leopold II", role: "Belgian monarch who ran the Congo Free State as a brutal personal concession" }
    ],
    relatedEvents: ["berlin_conference", "industrial_revolution", "decolonization"],
    imageQuery: "Congo Free State rubber exploitation mutilations",
    imageCaption: "Rubber workers in the Congo Free State — demonstrating the human cost of resource extraction."
  },
  berlin_conference: {
    narrative: "In November 1884, German Chancellor Otto von Bismarck convened the Berlin Conference, where fourteen European nations and the United States gathered to resolve competing territorial claims in Africa and establish rules for the partition of the continent. No African leaders were invited or consulted.\n\nThe conference established the principle of 'effective occupation'—a power had to physically control a territory and notify other signatories to claim sovereignty. This rule triggered the 'Scramble for Africa', as European armies rushed inland to secure treaties and build outposts before their rivals could.\n\nThe delegates drew arbitrary borders across the African map, dividing ethnic groups, cutting off historical trade routes, and grouping hostile populations within single colonies. These borders, created for European convenience, ignored geographical and cultural realities, laying the foundation for political instability and civil conflicts in post-independence Africa.",
    causes: [
      "Otto von Bismarck seeking to avoid European war over competing claims in the Congo basin",
      "European powers rushing to secure raw materials and colonial territory in the African interior",
      "Need to establish formal international rules for imperial claims and partition"
    ],
    effects: [
      "Partition of Africa into European colonies, drawn with arbitrary borders",
      "Acceleration of the Scramble for Africa, bringing 90% of the continent under foreign control",
      "Creation of legacy border conflicts and ethnic divisions that persist in modern Africa"
    ],
    keyFigures: [
      { name: "Otto von Bismarck", role: "German Chancellor who hosted the conference to balance European power" }
    ],
    relatedEvents: ["european_imperialism_africa", "berlin_conference_modern", "decolonization"],
    imageQuery: "Berlin Conference map partition Africa 1884",
    imageCaption: "The Berlin Conference of 1884-1885 — where European powers divided the African continent."
  },
  meiji_restoration: {
    narrative: "In 1868, following the arrival of American Commodore Perry's gunboats in 1853 and the subsequent fall of the Tokugawa Shogunate, Japan restored direct political power to the Emperor Meiji. Recognizing that Japan was vulnerable to Western colonization like China, the new government launched a rapid program of modernization and industrialization under the slogan 'Fukoku Kyohei' (Enrich the Country, Strengthen the Military).\n\nThe Meiji reformers systematically dismantled the feudal samurai class, standardized the Japanese language, built the country's first railways, and established modern heavy industry (shipyards, steel mills). They modeled their navy on Britain's, their army on Prussia's, and their constitution on Germany's.\n\nIn just three decades, Japan transformed from an isolated feudal state into a modern industrial and military power. This transformation was demonstrated by their victories in the Sino-Japanese War (1895) and the Russo-Japanese War (1905)—the first time an Asian power defeated a European empire in the modern era, establishing Japan as an imperial power.",
    causes: [
      "Arrival of US Commodore Perry's Black Ships (1853), exposing Japan's military vulnerability",
      "Fall of the Tokugawa Shogunate after the Boshin War (1868-69)",
      "Meiji leadership's determination to modernize rapidly to preserve national sovereignty"
    ],
    effects: [
      "Abolition of the feudal samurai class and creation of a centralized, industrialized nation-state",
      "Rapid development of heavy industry, railways, and a modern military infrastructure",
      "Japan emerges as a regional imperial power, defeating China and Russia in war"
    ],
    keyFigures: [
      { name: "Emperor Meiji", role: "Sovereign under whose name Japan modernized and industrialized" },
      { name: "Fukuzawa Yukichi", role: "Intellectual who popularized Western science, education, and institutions in Japan" }
    ],
    relatedEvents: ["opium_wars", "industrial_revolution", "china_rise"],
    imageQuery: "Meiji Emperor Western military uniform modernization",
    imageCaption: "Emperor Meiji in Western military uniform — symbolizing Japan's pivot toward modernization."
  },

  // --- MODERN ---
  berlin_conference_modern: {
    narrative: "The modern legacy of the 1884 Berlin Conference continues to define African politics, economics, and conflicts. The arbitrary borders drawn by European diplomats grouped disparate ethnic and religious populations (such as the Muslim north and Christian south in Nigeria) within single colonial boundaries, while dividing others (such as the Somali people across four states).\n\nUpon gaining independence in the mid-20th century, African nations chose to maintain the colonial borders (the principle of uti possidetis) to avoid chaotic territorial wars. However, this decision institutionalized ethnic friction, as political power was contested between groups with little shared history, leading to civil wars in Nigeria, Sudan, and the Congo.\n\nFurthermore, the colonial transport infrastructure—designed purely to carry minerals and agricultural goods from the interior to coastal ports rather than connect neighboring regions—left post-independence African states economically isolated from one another, cementing dependency on raw resource export to global markets.",
    causes: [
      "Colonial borders drawn without regard for ethnic, linguistic, or historical realities in 1884",
      "Post-independence African states maintaining colonial borders to prevent border wars",
      "Colonial infrastructure designed exclusively for resource extraction rather than regional integration"
    ],
    effects: [
      "Sustained ethnic and sectarian conflicts within African states (e.g. Nigeria, Sudan)",
      "Low levels of intra-African trade due to extraction-focused transport infrastructure",
      "Permanent dependency on exporting raw commodities (oil, cocoa, minerals) to Western and Asian markets"
    ],
    keyFigures: [
      { name: "Julius Nyerere", role: "Tanzanian President who advocated for African unity while accepting colonial borders to maintain stability" }
    ],
    relatedEvents: ["berlin_conference", "decolonization", "globalization"],
    imageQuery: "Africa borders ethnic map division",
    imageCaption: "Map showing how colonial borders intersected traditional African ethnic territories."
  },
  ww1: {
    narrative: "On 28 June 1914, the assassination of Archduke Franz Ferdinand of Austria by a Serbian nationalist triggered a chain reaction that plunged the world into its first industrial, global war. Bound by a web of secret alliances, European powers mobilized their armies, dividing the continent into the Allied Powers (Britain, France, Russia, and later the US) and the Central Powers (Germany, Austria-Hungary, and the Ottoman Empire).\n\nWorld War I was characterized by technological asymmetry: the combination of machine guns, heavy artillery, poison gas, and airplanes met Napoleonic infantry tactics, resulting in years of bloody stalemate along the Western Front. Millions of soldiers lived and died in trenches, suffering from trench foot, shell shock, and disease.\n\nThe war ended in 1918, leaving an estimated 20 million dead. The aftermath reshaped the globe: four empires collapsed (the German, Russian, Austro-Hungarian, and Ottoman empires); the Treaty of Versailles imposed harsh reparations on Germany, setting the stage for WWII; the League of Nations was founded; and the map of the Middle East was redrawn by British and French mandates.",
    causes: [
      "Militarism, imperial rivalries, and the growth of nationalist movements across Europe",
      "The alliance system dividing Europe into competing armed blocs (Triple Entente vs Triple Alliance)",
      "The assassination of Archduke Franz Ferdinand by Gavrilo Princip in Sarajevo"
    ],
    effects: [
      "Collapse of the German, Russian, Austro-Hungarian, and Ottoman empires",
      "Treaty of Versailles (1919) imposing harsh terms on Germany, fueling future Nazi rise",
      "Redrawing of the Middle East map under the Sykes-Picot Agreement and British-French mandates"
    ],
    keyFigures: [
      { name: "Woodrow Wilson", role: "US President who entered the war in 1917 and proposed the Fourteen Points" },
      { name: "Kaiser Wilhelm II", role: "German Emperor whose militarist policy led to Germany's entry into the war" }
    ],
    relatedEvents: ["industrial_revolution", "russian_revolution", "ww2"],
    imageQuery: "World War I trench warfare Somme",
    imageCaption: "Trench warfare during World War I — characterized by machine guns and stalemate."
  },
  russian_revolution: {
    narrative: "In 1917, exhausted by the massive casualties and food shortages of World War I, the Russian population rose in revolt, ending centuries of Tsarist autocracy. The February Revolution forced Tsar Nicholas II to abdicate, replacing the monarchy with a weak Provisional Government. However, the new government's decision to stay in the war fueled popular anger.\n\nIn November 1917 (the October Revolution), the Bolsheviks—a radical socialist faction led by Vladimir Lenin—seized power in Petrograd under the slogan 'Peace, Land, and Bread'. Lenin pulled Russia out of WWI and launched a civil war (1917-1922) against the 'White' counter-revolutionary forces, ultimately victorious.\n\nIn 1922, the Bolsheviks established the Union of Soviet Socialist Republics (USSR)—the world's first state based on Marxist-Leninist communism. The revolution transformed global geopolitics, creating a state dedicated to promoting communist revolution worldwide and establishing the geopolitical pole that would contest Western capitalism in the Cold War.",
    causes: [
      "Severe food shortages, inflation, and massive military casualties in Russia during WWI",
      "Weakness and unpopularity of Tsar Nicholas II and the Provisional Government",
      "Vladimir Lenin and the Bolsheviks organizing support among workers, peasants, and soldiers (Soviets)"
    ],
    effects: [
      "Overthrow of the Romanov Dynasty and end of Tsarist autocracy in Russia",
      "Creation of the Soviet Union (USSR), the world's first communist state",
      "Nationalization of land and industry, initiating the collectivized Soviet economy"
    ],
    keyFigures: [
      { name: "Vladimir Lenin", role: "Bolshevik leader who founded the Soviet Union" },
      { name: "Tsar Nicholas II", role: "Last Emperor of Russia, executed by the Bolsheviks in 1918" }
    ],
    relatedEvents: ["ww1", "ww2", "cold_war"],
    imageQuery: "Russian Revolution Lenin speech Petrograd 1917",
    imageCaption: "Vladimir Lenin addressing workers in Petrograd during the 1917 revolution."
  },
  nuclear_age: {
    narrative: "On 16 July 1945, the Trinity Test in New Mexico detonated the world's first nuclear device, ushering in the Nuclear Age. The Manhattan Project—a massive, secret US research effort led by physicist J. Robert Oppenheimer—had succeeded in splitting the atom to construct a weapon of unprecedented destructive power.\n\nOn 6 and 9 August 1945, the United States dropped atomic bombs on the Japanese cities of Hiroshima and Nagasaki. The blasts, heat, and subsequent radiation killed an estimated 140,000 in Hiroshima and 74,000 in Nagasaki, bringing Japan's surrender and the end of World War II.\n\nThe deployment of nuclear weapons permanently altered human history, creating the threat of total extinction. It ushered in a bipolar world order, where the US and USSR accumulated massive arsenals of thermonuclear weapons, engaged in a policy of Mutually Assured Destruction (MAD) that prevented direct war but fueled proxy conflicts.",
    causes: [
      "Manhattan Project research to split uranium and plutonium atoms, fearing Nazi nuclear research",
      "US President Harry Truman's decision to use atomic weapons to force Japan's unconditional surrender",
      "WWII industrial mobilization, concentrating scientific talent and resources"
    ],
    effects: [
      "Destruction of Hiroshima and Nagasaki, resulting in over 200,000 immediate and radiation deaths",
      "End of World War II and beginning of the nuclear arms race between the US and USSR",
      "Geopolitical era of Mutually Assured Destruction (MAD), preventing direct superpowers conflict"
    ],
    keyFigures: [
      { name: "J. Robert Oppenheimer", role: "Physicist called the 'Father of the Atomic Bomb' who directed the Los Alamos laboratory" },
      { name: "Harry S. Truman", role: "US President who ordered the atomic bombings of Japan" }
    ],
    relatedEvents: ["ww2", "cold_war", "space_race"],
    imageQuery: "Hiroshima atomic bomb mushroom cloud 1945",
    imageCaption: "The mushroom cloud over Hiroshima, August 6, 1945 — the dawn of the nuclear era."
  },
  cold_war: {
    narrative: "Following the defeat of Nazi Germany in 1945, the alliance between the United States and the Soviet Union dissolved, initiating the Cold War—a global ideological, military, and economic struggle between Western capitalism and Soviet communism that lasted until 1991.\n\nThe conflict was 'cold' because the threat of nuclear war prevented direct military conflict between the superpowers. Instead, the war was fought through proxy wars (Korea, Vietnam, Afghanistan), espionage (CIA vs KGB), propaganda, and the space and nuclear arms races. The world was divided into NATO (the Western bloc) and the Warsaw Pact (the Eastern bloc).\n\nThe Cold War defined global borders, dividing Germany (and Berlin) with walls and Korea along the 38th parallel. The conflict ended in 1991 with the economic collapse and political disintegration of the Soviet Union, leaving the United States as the world's sole superpower in a unipolar era.",
    causes: [
      "Ideological incompatibility between Western liberal capitalism and Soviet state communism",
      "Superpower rivalry to fill the power vacuum in Europe and Asia following WWII",
      "Nuclear weaponry making direct war between the US and USSR too dangerous to fight"
    ],
    effects: [
      "Global division into competing alliances (NATO vs Warsaw Pact) and proxy conflicts",
      "Division of Germany and Berlin (Berlin Wall) and Korea (Korean War)",
      "Collapse of the Soviet Union in 1991, ending the Cold War and initiating US unipolarity"
    ],
    keyFigures: [
      { name: "Joseph Stalin", role: "Soviet dictator who established the Eastern Bloc after WWII" },
      { name: "Ronald Reagan", role: "US President who escalated military pressure, contributing to Soviet collapse" }
    ],
    relatedEvents: ["ww2", "nuclear_age", "space_race"],
    imageQuery: "Berlin Wall checkpoint Charlie Cold War",
    imageCaption: "The Berlin Wall — the physical symbol of the division between East and West."
  },
  decolonization: {
    narrative: "Following World War II, weakened European empires could no longer maintain direct political control over their colonies, initiating a massive wave of decolonization across Asia and Africa. The process was driven by popular nationalist movements demanding self-determination.\n\nIn 1947, India and Pakistan gained independence from the British Raj, though the event was scarred by the trauma of Partition, which displaced 15 million and killed up to 2 million in sectarian violence. Across Africa and Asia, decolonization was sometimes peaceful (as in Ghana) and sometimes violent (such as the Algerian War against France and the Indochina War in Vietnam).\n\nDecolonization created over a hundred new sovereign nations, transforming the United Nations from a Western-dominated body into a global assembly. However, the newly independent nations often struggled with arbitrary colonial borders, economic dependency on resource export, and interference by superpowers during the Cold War.",
    causes: [
      "European empires bankrupt and weakened physically and economically after WWII",
      "Rise of organized nationalist movements led by figures like Mahatma Gandhi and Kwame Nkrumah",
      "Superpowers (US/USSR) opposing traditional European colonial monopolies during the Cold War"
    ],
    effects: [
      "Independence of over 100 new nations across Africa, Asia, and the Middle East",
      "The Partition of India and subsequent regional conflicts between India and Pakistan",
      "Origins of the Non-Aligned Movement, seeking autonomy from both US and Soviet blocs"
    ],
    keyFigures: [
      { name: "Mahatma Gandhi", role: "Leader of the non-violent Indian independence movement" },
      { name: "Kwame Nkrumah", role: "Leader who led Ghana to independence, advocating for Pan-Africanism" }
    ],
    relatedEvents: ["british_raj", "berlin_conference_modern", "cold_war"],
    imageQuery: "India Independence partition Gandhi 1947",
    imageCaption: "The Partition of India in 1947 — millions migrating across newly drawn borders."
  },
  civil_rights: {
    narrative: "During the 1950s and 1960s, the Civil Rights Movement in the United States sought to end state-enforced racial segregation, disenfranchisement, and discrimination against African Americans, particularly in the Southern states under Jim Crow laws.\n\nLed by figures like Martin Luther King Jr., the movement utilized non-violent civil disobedience: boycotts (the Montgomery Bus Boycott), sit-ins, and massive marches (the 1963 March on Washington, where King delivered his 'I Have a Dream' speech). The movement faced violent opposition from local police and white supremacist groups.\n\nThe movement succeeded in forcing federal legislative reform: the Civil Rights Act of 1964 banned segregation in public accommodations and employment discrimination, and the Voting Rights Act of 1965 outlawed discriminatory voting tests. The struggle transformed American culture and inspired civil rights and anti-apartheid movements worldwide.",
    causes: [
      "Sustained Jim Crow segregation, disenfranchisement, and racial violence against African Americans in the South",
      "Return of Black WWII veterans demanding the democracy they fought for abroad",
      "Organization of non-violent civil rights coalitions (SCLC, SNCC, NAACP) under Martin Luther King Jr."
    ],
    effects: [
      "Passage of the Civil Rights Act of 1964 and Voting Rights Act of 1965, outlawing legal segregation",
      "Transformation of the American political landscape and expansion of voting access",
      "Inspiration for global rights movements, including the anti-apartheid struggle in South Africa"
    ],
    keyFigures: [
      { name: "Martin Luther King Jr.", role: "Baptist minister who led the non-violent Civil Rights Movement" },
      { name: "Rosa Parks", role: "Activist whose arrest sparked the Montgomery Bus Boycott" }
    ],
    relatedEvents: ["cold_war", "space_race", "decolonization"],
    imageQuery: "March on Washington 1963 Martin Luther King",
    imageCaption: "The March on Washington for Jobs and Freedom, August 28, 1963 — where 250,000 gathered."
  },
  china_opens: {
    narrative: "In 1978, following the death of Mao Zedong and the end of the chaotic Cultural Revolution, Chinese leader Deng Xiaoping initiated the 'Reform and Opening Up' policy, setting China on a path from a closed, command economy to a market-oriented global economic power.\n\nDeng introduced pragmatism under the slogan 'It doesn't matter if a cat is black or white, so long as it catches mice.' He dismantled collective farming, permitted private enterprise, and established Special Economic Zones (SEZs) like Shenzhen along the coast, which offered tax incentives to attract foreign investment and technology.\n\nThis policy initiated the fastest economic expansion in human history, lifting over 800 million Chinese out of poverty. Shenzhen transformed from a fishing village of 30,000 into a mega-city of 17 million. While China maintained political control under a single-party state, its opening reintegrated its massive labor pool into global markets, transforming the country into the 'workshop of the world'.",
    causes: [
      "Economic stagnation and political exhaustion in China following Mao's Cultural Revolution",
      "Deng Xiaoping's ascension and his pragmatic pivot toward market incentives",
      "Western interest in accessing China's massive labor pool and domestic consumer market"
    ],
    effects: [
      "Reintegration of China into the global economy, resulting in decades of double-digit GDP growth",
      " Shenzhen and coastal regions transform into high-tech manufacturing megacities",
      "Lifting of over 800 million citizens out of extreme poverty, creating a massive middle class"
    ],
    keyFigures: [
      { name: "Deng Xiaoping", role: "Chinese leader who pioneered the Reform and Opening Up policies" }
    ],
    relatedEvents: ["han_dynasty", "china_rise", "globalization"],
    imageQuery: "Shenzhen skyline Special Economic Zone China",
    imageCaption: "Shenzhen, China — transformed from a fishing village to a high-tech metropolis since 1980."
  },
  fall_soviet_union: {
    narrative: "On 25 December 1991, Soviet President Mikhail Gorbachev resigned, the hammer and sickle flag was lowered over the Kremlin, and the Union of Soviet Socialist Republics (USSR) ceased to exist, splintering into 15 independent republics. This sudden collapse ended the Cold War and left the United States as the world's sole superpower.\n\nThe collapse was accelerated by Gorbachev's reforms: glasnost (political openness) and perestroika (economic restructuring), which aimed to modernize the stagnation-plagued Soviet system. Instead, openness unleashed long-suppressed nationalist movements in the Baltic states, Ukraine, and the Caucasus, while economic reforms disrupted the command system without establishing working markets.\n\nThe fall reshaped the global map, reunifying Germany, dissolving the Warsaw Pact, and leading to a chaotic transition to capitalism in Russia, characterized by hyperinflation and the rise of oligarchs. It marked the end of the short 20th century's bipolar ideological struggle.",
    causes: [
      "Severe economic stagnation, military overexpansion (especially in Afghanistan), and bureaucratic corruption",
      "Gorbachev's Glasnost (openness) and Perestroika (restructuring) reforms, undermining party control",
      "Nationalist independence movements in Ukraine, the Baltic states (Estonia, Latvia, Lithuania), and Georgia"
    ],
    effects: [
      "Dissolution of the USSR into 15 independent republics, including the Russian Federation",
      "End of the Cold War and the transition of the international system to a US-dominated unipolar order",
      "Chaotic transition to market capitalism in Russia, leading to the rise of state oligarchs"
    ],
    keyFigures: [
      { name: "Mikhail Gorbachev", role: "Last President of the Soviet Union whose reforms led to its dissolution" },
      { name: "Boris Yeltsin", role: "First President of the Russian Federation who led the transition to capitalism" }
    ],
    relatedEvents: ["cold_war", "russian_revolution", "globalization"],
    imageQuery: "Soviet flag lowered Kremlin Moscow 1991",
    imageCaption: "The Soviet flag being lowered over the Kremlin in Moscow, December 25, 1991."
  },
  globalization: {
    narrative: "During the 1990s, following the collapse of the Soviet Bloc and the integration of China and India into world markets, globalization accelerated rapidly. Characterized by the free flow of capital, goods, technology, and labor across borders, this era knit the world into a single, interconnected economic system.\n\nThe expansion was driven by trade deregulation (culminating in the founding of the World Trade Organization in 1995), containerized shipping, and the digital communications revolution. Multinational corporations outsourced manufacturing to developing countries with lower labor costs, while corporate headquarters managed finance and design in global cities like New York and London.\n\nWhile globalization drove a massive reduction in global poverty and lowered the cost of consumer goods, it also led to domestic manufacturing decline (rust belts) in Western economies, increased domestic economic inequality, and raised concerns about environmental degradation and the loss of local cultural identities.",
    causes: [
      "End of the Cold War and the collapse of alternative state-command economic systems",
      "Founding of the World Trade Organization (1995) and widespread reduction of tariffs",
      "Spread of the Internet and containerized shipping, collapsing communication and transport costs"
    ],
    effects: [
      "Massive integration of global supply chains and outsourcing of manufacturing to developing nations",
      "Rise of emerging economies (BRICS) and reduction in absolute global poverty",
      "Deindustrialization of Western economies (rust belts) and growing domestic inequality"
    ],
    keyFigures: [
      { name: "Bill Clinton", role: "US President who signed NAFTA and supported China's entry into the WTO" }
    ],
    relatedEvents: ["internet_revolution", "china_opens", "decolonization"],
    imageQuery: "Container ship cargo port globalization",
    imageCaption: "A modern container ship at a automated port — the logistical backbone of globalization."
  },
  "9_11": {
    narrative: "On 11 September 2001, nineteen hijackers affiliated with the militant Islamist group al-Qaeda hijacked four commercial passenger airplanes in the United States. Two planes struck the Twin Towers of the World Trade Center in New York City; a third struck the Pentagon in Washington, D.C.; and a fourth crashed in a field in Pennsylvania after passengers revolted. The attacks killed 2,977 people, the deadliest foreign attack on US soil in history.\n\nThe attacks transformed global politics, ending the optimistic post-Cold War era and initiating the 'War on Terror'. The United States, backed by coalitions, invaded Afghanistan in 2001 to overthrow the Taliban regime housing al-Qaeda, and invaded Iraq in 2003, destabilizing the Middle East.\n\nInternally, the attacks led to a massive expansion of state surveillance and security infrastructure: the creation of the Department of Homeland Security, the passage of the Patriot Act in the US, and a permanent tightening of airport security globally, initiating a debate between national security and civil liberties.",
    causes: [
      "Al-Qaeda's opposition to US military presence in Saudi Arabia and Western foreign policy in the Middle East",
      "Al-Qaeda leader Osama bin Laden financing and planning a coordinated attack using commercial airliners",
      "US intelligence agencies' failure to share information and coordinate threat assessments"
    ],
    effects: [
      "US invasions of Afghanistan (2001) and Iraq (2003), destabilizing Middle Eastern regional security",
      "Creation of the Department of Homeland Security and passage of the Patriot Act in the US",
      "Permanent global expansion of state surveillance, military spending, and airport security"
    ],
    keyFigures: [
      { name: "Osama bin Laden", role: "Founder and leader of al-Qaeda who masterminded the attacks" },
      { name: "George W. Bush", role: "US President who launched the global War on Terror and invaded Iraq and Afghanistan" }
    ],
    relatedEvents: ["cold_war", "arab_spring", "globalization"],
    imageQuery: "September 11 attacks Twin Towers World Trade Center New York",
    imageCaption: "The World Trade Center towers in New York City during the September 11 attacks."
  },
  arab_spring: {
    narrative: "In December 2010, the self-immolation of a street vendor named Mohamed Bouazizi in Tunisia sparked a wave of popular pro-democracy uprisings across the Middle East and North Africa, collectively known as the Arab Spring. Citizens rose in protest against economic corruption, high unemployment, and decades of authoritarian rule.\n\nSocial media (Facebook, Twitter) played a critical role, allowing activists to coordinate protests and bypass state media control. Uprisings succeeded in overthrowing long-standing dictators in Tunisia (Zine El Abidine Ben Ali), Egypt (Hosni Mubarak), and Libya (Muammar Gaddafi).\n\nHowever, the initial optimism faded as the movement devolved into civil war and counter-revolution. Syria descended into a devastating civil war that displaced millions; Libya fractured under competing warlords; and Egypt experienced a military coup that restored authoritarian rule. Tunisia was the sole country to transition to democracy, though it later faced democratic backsliding, showing the difficulty of institutional reform.",
    causes: [
      "Mohamed Bouazizi's self-immolation in Tunisia, sparking protest against police corruption",
      "Decades of high youth unemployment, food price inflation, and authoritarian political repression",
      "Use of social media platforms to mobilize protests, bypass state censorship, and document violence"
    ],
    effects: [
      "Overthrow of autocratic leaders in Tunisia, Egypt, Libya, and Yemen",
      "Outbreak of devastating civil wars in Syria and Libya, triggering a global refugee crisis",
      "Rise of counter-revolutionary military regimes and sectarian divisions across the Middle East"
    ],
    keyFigures: [
      { name: "Mohamed Bouazizi", role: "Tunisian street vendor whose protest suicide sparked the uprisings" },
      { name: "Hosni Mubarak", role: "President of Egypt forced to resign after 30 years of autocratic rule" }
    ],
    relatedEvents: ["9_11", "globalization", "fall_soviet_union"],
    imageQuery: "Tahrir Square protests Cairo Egypt Arab Spring 2011",
    imageCaption: "Tahrir Square in Cairo — the center of the 2011 Egyptian revolution during the Arab Spring."
  },
  china_rise: {
    narrative: "By 2010, China officially surpassed Japan to become the world's second-largest economy, capping three decades of explosive growth following Deng Xiaoping's market reforms. This economic ascent transformed global geopolitics, shifting the international system from a unipolar American era toward a bipolar or multipolar configuration.\n\nChina's rise was characterized by massive industrial capacity, state-guided capitalism, and major infrastructure spending. Under Xi Jinping, who took power in 2012, China projected its economic power globally through the Belt and Road Initiative (BRI)—a massive infrastructure project building ports, railways, and highways across Central Asia, Africa, and Europe, securing trade routes and resource supply chains.\n\nThis rise has fueled geopolitical competition with the United States over trade, technology (especially semiconductors), and military dominance in the South China Sea, initiating a new era of strategic competition. China's combination of economic superpower status and high-tech state surveillance represents a unique model challenging Western democratic capitalism.",
    causes: [
      "Reintegration of China's massive labor pool into global manufacturing supply chains since 1978",
      "State-guided economic investment in infrastructure, education, and technology transfer",
      "Rapid urbanization, moving hundreds of millions of agricultural workers into industrial city centers"
    ],
    effects: [
      "China becomes the world's second-largest economy and the dominant manufacturing hub",
      "Launch of the Belt and Road Initiative, extending Chinese economic and diplomatic reach globally",
      "New era of bipolar geopolitical and technological competition between China and the United States"
    ],
    keyFigures: [
      { name: "Xi Jinping", role: "Chinese leader who consolidated power and launched the Belt and Road Initiative" }
    ],
    relatedEvents: ["china_opens", "meiji_restoration", "globalization"],
    imageQuery: "Belt and Road Initiative map ports rail",
    imageCaption: "Map showing the routes of the Belt and Road Initiative — China's global infrastructure strategy."
  },

  // --- FUTURE ---
  climate_transition: {
    narrative: "By 2050, humanity has undertaken the 'Great Climate Transition'—a complete overhaul of the global energy, transport, and agricultural systems to achieve net-zero greenhouse gas emissions. This transition was driven by the escalating costs of climate change (wildfires, sea-level rise, crop failures) and the rapid decline in the cost of renewable technologies.\n\nFossil fuel combustion was phased out, replaced by massive grids of solar, wind, and next-generation nuclear fusion energy. Transportation was entirely electrified, and container shipping transitioned to green hydrogen and ammonia. Agriculture was transformed by vertical farming and cellular meat, freeing up millions of hectares of land for reforestation and biodiversity preservation.\n\nWhile the transition successfully halted the rise of global temperatures, the legacy of historical emissions continues to require adaptation. Massive carbon capture facilities operate globally, and coastal cities employ sea walls and floating neighborhoods to adapt to locked-in sea level rise.",
    causes: [
      "Escalating economic and human costs of extreme climate events (droughts, floods, wildfires)",
      "Technological breakthroughs in energy storage, grid integration, and next-generation nuclear energy",
      "Global political consensus and carbon pricing mechanisms aligning private capital with net-zero targets"
    ],
    effects: [
      "Elimination of fossil fuels and stabilization of atmospheric greenhouse gas concentrations",
      "Electrification of all transport and logistics systems, eliminating urban air pollution",
      "Reforestation of millions of hectares, stabilizing global biodiversity and soil health"
    ],
    keyFigures: [
      { name: "Global Climate Council", role: "Intergovernmental body coordinating the global carbon budget and transition milestones" }
    ],
    relatedEvents: ["industrial_revolution", "internet_revolution", "ai_integration"],
    imageQuery: "Future green city solar panels wind turbines fusion",
    imageCaption: "A net-zero green city in 2050 — featuring integrated vertical forests and solar-wind grids."
  },
  ai_integration: {
    narrative: "By 2040, Artificial Intelligence has transitioned from a specialized technology into a utility fully integrated into all aspects of human governance, economy, and daily life. AI systems manage global logistics, optimize energy grids in real-time, diagnose diseases, and direct agricultural production.\n\nThis integration resulted in the automation of the vast majority of cognitive and physical labor, driving a massive increase in economic productivity. To manage the displacement of labor, societies instituted universal basic assets and state-backed resource access, shifting the human economy away from labor toward creative, philosophical, and interpersonal endeavors.\n\nHowever, this reliance on AI has created new challenges: societies are vulnerable to systemic software failures, and the concentration of algorithmic power has required the creation of decentralized, open-source democratic protocols to govern AI alignment, ensuring that the technology remains a public utility rather than an instrument of state control or corporate monopoly.",
    causes: [
      "Exponential growth in computation power (quantum computing) and neural network architectures",
      "Economic competitive pressure forcing industries to automate to remain viable",
      "Need to manage highly complex global systems (climate grids, logistics) beyond human speed"
    ],
    effects: [
      "Automation of cognitive and physical labor, driving unprecedented economic abundance",
      "Restructuring of social contracts, introducing universal resource access models",
      "Establishment of decentralized democratic oversight protocols for algorithmic alignment"
    ],
    keyFigures: [
      { name: "Algorithmic Public Trust", role: "Decentralized global consortium managing open-source AI alignment and safety" }
    ],
    relatedEvents: ["internet_revolution", "climate_transition", "space_colonization"],
    imageQuery: "Future AI smart city holographic interface",
    imageCaption: "An AI-managed smart city hub in 2040 — where transportation and resources are optimized in real-time."
  },
  space_colonization: {
    narrative: "By 2045, permanent human settlements have been established on the Moon and Mars, marking the beginning of humanity's multiplanetary era. Driven by commercial resource extraction (especially helium-3 on the Moon and rare minerals on asteroids) and the desire to secure a backup for the human species, space agencies and private consortia constructed enclosed habitats.\n\nLunar bases at the south pole extract water ice from shadowed craters to produce rocket fuel, serving as the launch pad for deep space voyages. On Mars, pressurized dome cities housing scientists and miners cultivate crops in hydroponic greenhouses and extract water from underground ice sheets, initiating early experiments in localized terraforming.\n\nThis expansion has created a new 'space economy', with asteroid mining fleets capturing materials that are processed in orbital manufacturing facilities, eliminating the need to mine the Earth's fragile crust. It has also raised new legal questions, leading to the Outer Space Treaty revision to govern resource claims and colony sovereignty.",
    causes: [
      "Development of fully reusable heavy-lift launch vehicles, reducing the cost of orbit access by 99%",
      "Discovery of accessible water ice in lunar polar craters and Martian subsoils",
      "Commercial value of space resources, including lunar helium-3 and asteroid platinum-group metals"
    ],
    effects: [
      "Establishment of permanent, self-sustaining human bases on the Moon and Mars",
      "Transition of mining industries from the Earth's crust to near-Earth asteroids",
      "Revision of international space law, establishing protocols for resource extraction and sovereignty"
    ],
    keyFigures: [
      { name: "Mars Settlement Coalition", role: "Governing body coordinating resource distribution and dome expansion on Mars" }
    ],
    relatedEvents: ["space_race", "ai_integration", "ocean_habitation"],
    imageQuery: "Mars colony dome city pressurized habitat",
    imageCaption: "Pressurised dome city on Mars in 2045 — representing humanity's first multiplanetary settlement."
  },
  ocean_habitation: {
    narrative: "By 2055, in response to coastal land limits and rising sea levels, human habitation has expanded onto the oceans. Massive floating cities, built on modular hexagonal platforms, house millions of residents in regions like the South Pacific and Southeast Asia, while deep-sea research and extraction stations operate on the ocean floor.\n\nThese floating cities (seasteads) are self-sufficient, powered by Ocean Thermal Energy Conversion (OTEC), wave energy, and floating solar arrays. Agriculture is marine-based: kelp forests, shellfish farms, and open-ocean aquaculture provide sustainable protein, while vertical desalinators produce freshwater.\n\nThe expansion has also focused on restoration: ocean habitats are anchored to massive artificial reefs that filter plastics and run coral restoration programs, reversing the acidification damage of the early 21st century. The oceans, once a barrier, have become the new frontier of sustainable civilizational growth.",
    causes: [
      "Sea-level rise and coastal urban crowding, forcing expansion onto marine territory",
      "Breakthroughs in modular, storm-resistant floating platform materials and wave energy engineering",
      "Commercial value of deep-sea hydrogen and agricultural potential of marine aquaculture"
    ],
    effects: [
      "Establishment of self-sufficient floating cities, accommodating coastal populations",
      "Overhaul of global aquaculture, shifting protein production to sustainable kelp and bivalve farming",
      "Active ecological restoration of global marine life, coral reefs, and water purity"
    ],
    keyFigures: [
      { name: "Oceanic Seasteading Union", role: "Governing body regulating maritime sovereignty and environmental standards for floating cities" }
    ],
    relatedEvents: ["climate_transition", "space_colonization", "genetic_medicine"],
    imageQuery: "Floating city ocean modular platforms seasteading",
    imageCaption: "A modular floating city in 2055 — powered by wave energy and integrated marine agriculture."
  },
  genetic_medicine: {
    narrative: "By 2035, the genetic medicine revolution has transformed human biology, eliminating the vast majority of hereditary diseases and dramatically extending the healthy human lifespan. Building on CRISPR gene-editing and personalized mRNA technologies, clinicians can repair disease-causing mutations in vivo.\n\nConditions like cystic fibrosis, sickle cell anemia, and many forms of hereditary cancer have been eradicated. Medicine has shifted from reactive treatment to proactive epigenetic tuning—rejuvenating cells at the molecular level, preventing cognitive decline, and extending the period of youthful vitality well past a century.\n\nWhile this revolution has alleviated immense human suffering, it has created demographic and ethical challenges. Aging populations have required the restructuring of retirement and labor systems, and global accords were signed to prevent genetic enhancements from creating a biological class divide, ensuring that genetic therapies are treated as a universal human right.",
    causes: [
      "Deciphering of the complete epigenetic clock and advances in target-specific in vivo gene editing",
      "AI-driven protein folding prediction (AlphaFold heirs) enabling custom molecular therapies",
      "Global medical initiatives to eliminate chronic genetic diseases and reduce healthcare burdens"
    ],
    effects: [
      "Eradication of hereditary diseases and dramatic reduction in cardiovascular and neurological decline",
      "Extension of average healthy human lifespan to over 110 years, shifting demographics",
      "Passage of the Global Genetic Accord, banning discriminatory genetic enhancements and securing equal access"
    ],
    keyFigures: [
      { name: "World Bioethics Assembly", role: "Consortium that drafted the rules for therapeutic gene editing and equality" }
    ],
    relatedEvents: ["ai_integration", "climate_transition", "ocean_habitation"],
    imageQuery: "DNA helix gene editing CRISPR medical lab",
    imageCaption: "Advanced genetic medicine in 2035 — targeting and repairing hereditary mutations."
  }
};

// 3. Update the historicalEvents object in memory
let updatedCount = 0;
for (const era of Object.keys(historicalEvents)) {
  const list = historicalEvents[era];
  for (let i = 0; i < list.length; i++) {
    const ev = list[i];
    if (eventData[ev.id]) {
      const details = eventData[ev.id];
      list[i] = {
        ...ev,
        narrative: details.narrative,
        causes: details.causes,
        effects: details.effects,
        keyFigures: details.keyFigures,
        relatedEvents: details.relatedEvents,
        imageQuery: details.imageQuery,
        imageCaption: details.imageCaption
      };
      updatedCount++;
    }
  }
}

console.log(`Updated ${updatedCount} events in memory.`);

// 4. Output the updated historicalEvents.ts file contents
let outputData = `export interface KeyFigure {
  name: string;
  role: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  year: number;
  era: "ancient" | "medieval" | "colonial" | "modern" | "future";
  coordinates?: [number, number]; // [lat, lng]
  description: string;
  impact: "major" | "significant" | "regional";
  affectedRegions: string[];
  // ── Rich detail fields (optional ── when missing, the panel shows a slim view) ──
  narrative?: string;
  causes?: string[];
  effects?: string[];
  keyFigures?: KeyFigure[];
  relatedEvents?: string[];
  imageQuery?: string;
  imageCaption?: string;
  /** Optional animated trail path across the globe (e.g. Mongol expansion). */
  trailPath?: [number, number][];
}

type EraType = "ancient" | "medieval" | "colonial" | "modern" | "future";

export const historicalEvents: Record<EraType, HistoricalEvent[]> = {\n`;

// Format nicely as TS code
for (const [era, list] of Object.entries(historicalEvents)) {
  outputData += `  ${era}: [\n`;
  for (const ev of list) {
    outputData += `    ${JSON.stringify(ev, null, 6).replace(/\n/g, '\n    ')},\n`;
  }
  outputData += `  ],\n`;
}

outputData += `};\n`;

// Fix trailPath and other properties indent formatting (make it look beautiful and standard TS)
// Standard JSON stringify double quotes are fine, but let's write it to the file.
fs.writeFileSync(filePath, outputData, 'utf8');
console.log('Successfully wrote historicalEvents.ts');
