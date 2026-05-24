export interface CivilizationalEntity {
  id: string;
  name: string;
  era: "ancient" | "medieval" | "colonial" | "modern" | "future";
  timeSpan: string;
  description: string;
  centerCoordinates: [number, number]; // [lat, lng]
  historicalImpact: string;
  associatedCountries: string[];
  tradeRoutes: Array<{
    name: string;
    path: Array<[number, number]>; // coordinates along the path
  }>;
  migrationFlows: Array<{
    origin: string;
    destination: string;
    description: string;
    path: Array<[number, number]>;
  }>;
}

export const civilizationsData: CivilizationalEntity[] = [
  {
    id: "ancient_egypt",
    name: "Pharaonic Egypt (New Kingdom)",
    era: "ancient",
    timeSpan: "1550 BC – 1077 BC",
    description: "The peak of ancient Egyptian power, characterized by aggressive expansions, massive temple architectures (Karnak, Luxor), and trade routes reaching deep into the Levant and East Africa.",
    centerCoordinates: [25.6872, 32.6396],
    historicalImpact: "Pioneered early state bureaucracy, solar calendar tracking, glass fabrication, and stone masonry.",
    associatedCountries: ["EG"],
    tradeRoutes: [
      {
        name: "Nile Riverine Route",
        path: [
          [24.0889, 32.8998], // Aswan
          [25.6872, 32.6396], // Thebes / Luxor
          [29.9753, 31.1376], // Memphis
          [31.2001, 29.9187]  // Alexandria / Delta
        ]
      },
      {
        name: "Levantine Cedar Maritime Route",
        path: [
          [31.2001, 29.9187],
          [32.5000, 34.5000],
          [33.8938, 35.5018]  // Byblos / Lebanon
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "Nubia (Sudan)",
        destination: "Thebes (Egypt)",
        description: "Migration of Nubian archers (Medjay) and mercenaries serving the pharaohs.",
        path: [
          [19.6000, 37.2000],
          [24.0889, 32.8998],
          [25.6872, 32.6396]
        ]
      }
    ]
  },
  {
    id: "roman_empire",
    name: "The Roman Empire",
    era: "ancient",
    timeSpan: "27 BC – 476 CE",
    description: "One of the most powerful economic, cultural, and political empires in human history, spanning the entire Mediterranean basin and connected by an extensive highway network.",
    centerCoordinates: [41.9028, 12.4964],
    historicalImpact: "Spread Roman law, architecture (aqueducts, arches), Latin language, and paved roads across Europe, North Africa, and West Asia.",
    associatedCountries: ["IT", "EG"],
    tradeRoutes: [
      {
        name: "Via Appia & Imperial Roads",
        path: [
          [41.9028, 12.4964], // Rome
          [40.8518, 14.2681], // Naples
          [40.6324, 17.9360]  // Brindisi
        ]
      },
      {
        name: "Mediterranean Grain Route",
        path: [
          [31.2001, 29.9187], // Alexandria (Grain basket)
          [34.0000, 20.0000],
          [38.0000, 15.0000],
          [41.9028, 12.4964]  // Ostia / Rome
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "Rome",
        destination: "London (Londinium)",
        description: "Expansion of legions and Roman administrators to establish northern colonial centers.",
        path: [
          [41.9028, 12.4964],
          [45.7640, 4.8357],  // Lyon
          [48.8566, 2.3522],  // Paris
          [51.5074, -0.1278]  // London
        ]
      }
    ]
  },
  {
    id: "tokugawa_shogunate",
    name: "Tokugawa Shogunate",
    era: "medieval",
    timeSpan: "1603 CE – 1867 CE",
    description: "The feudal military government of Japan during the Edo period. Defined by strict isolationism (Sakoku), internal peace, samurai dominance, and a flourishing urban merchant culture.",
    centerCoordinates: [35.6762, 139.6503],
    historicalImpact: "Nurtured classic arts (Kabuki, Ukiyo-e, Haiku), stabilized internal national infrastructure, and developed an ecological forestry system.",
    associatedCountries: ["JP"],
    tradeRoutes: [
      {
        name: "Tokaido Road (Coastal Highway)",
        path: [
          [35.0116, 135.7681], // Kyoto (Imperial capital)
          [34.9756, 138.3826], // Shizuoka
          [35.6762, 139.6503]  // Edo / Tokyo (Shogunal seat)
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "Rural Villages",
        destination: "Edo (Tokyo)",
        description: "Forced alternate attendance (Sankin-kotai) requiring feudal lords (Daimyo) and their samurai retinues to march to Edo periodically.",
        path: [
          [34.6937, 135.5023], // Osaka
          [35.1814, 136.9066], // Nagoya
          [35.6762, 139.6503]
        ]
      }
    ]
  },
  {
    id: "viking_expansion",
    name: "Norse Viking Kingdoms",
    era: "medieval",
    timeSpan: "793 CE – 1066 CE",
    description: "A period of intense maritime exploration, raiding, and trade by Scandinavian seafarers who crossed the Atlantic to North America and sailed rivers deep into Russia.",
    centerCoordinates: [60.4720, 8.4689],
    historicalImpact: "Established maritime settlements in Great Britain, Iceland, Normandy, and Greenland, introducing advanced shipbuilding technologies.",
    associatedCountries: ["NO", "IS"],
    tradeRoutes: [
      {
        name: "North Sea Viking Passage",
        path: [
          [60.3913, 5.3221],  // Bergen (Norway)
          [60.1699, -1.1493], // Shetland Islands
          [58.9801, -2.9602], // Orkney Islands
          [56.4907, -4.2026]  // Scotland
        ]
      },
      {
        name: "Transatlantic Settlers' Route",
        path: [
          [60.3913, 5.3221],
          [62.0079, -6.7820],  // Faroe Islands
          [64.1466, -21.9426], // Reykjavik (Iceland)
          [61.1605, -45.4294]  // Qassiarsuk (Greenland)
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "Western Fjords (Norway)",
        destination: "Icelandic Lowlands",
        description: "Norse chieftains seeking independence from unified royal authority migrated to settle uninhabited valleys of Iceland.",
        path: [
          [61.0000, 5.0000],
          [63.5000, -10.0000],
          [64.5000, -19.0000]
        ]
      }
    ]
  },
  {
    id: "maurya_empire",
    name: "The Maurya Empire",
    era: "ancient",
    timeSpan: "322 BC – 185 BC",
    description: "The first major unified empire in India, covering almost the entire subcontinent under Emperor Ashoka, who famously patronized Buddhism and engraved edicts on massive pillars.",
    centerCoordinates: [25.6110, 85.1440],
    historicalImpact: "Unified regional trade networks, standardized currencies, built the Grand Trunk Road, and sent Buddhist missionaries across Asia.",
    associatedCountries: ["IN"],
    tradeRoutes: [
      {
        name: "Grand Trunk Road (Uttarapatha)",
        path: [
          [22.5726, 88.3639], // Pataliputra / Kolkata
          [25.3176, 82.9739], // Varanasi
          [28.6139, 77.2090], // Delhi
          [31.5204, 74.3587], // Lahore
          [34.0150, 71.5250]  // Peshawar
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "Patna (Pataliputra)",
        destination: "Sri Lanka",
        description: "Monk Mahinda (son of Ashoka) and Buddhist missionaries migrating to spread Buddhist teachings.",
        path: [
          [25.6110, 85.1440],
          [13.0827, 80.2707], // Chennai
          [7.8731, 80.7718]   // Sri Lanka
        ]
      }
    ]
  },
  {
    id: "portuguese_colonial",
    name: "Portuguese Maritime Empire",
    era: "colonial",
    timeSpan: "1415 CE – 1999 CE",
    description: "The first global trade empire in history. Portuguese navigators rounded Africa, established oceanic trade colonies in India, and claimed Brazil, initiating the age of global maritime connectivity.",
    centerCoordinates: [38.7223, -9.1393],
    historicalImpact: "Initiated the Columbian Exchange, connected the Atlantic and Indian Oceans, and pioneered open-ocean navigation cartography.",
    associatedCountries: ["BR", "IN"],
    tradeRoutes: [
      {
        name: "Carreira da India (Cape Route)",
        path: [
          [38.7223, -9.1393],  // Lisbon
          [14.9219, -23.5087], // Cape Verde
          [-33.9249, 18.4241], // Cape of Good Hope
          [-15.0119, 40.7314], // Mozambique Island
          [15.4909, 73.8278]   // Goa (India)
        ]
      },
      {
        name: "South Atlantic Sugar Link",
        path: [
          [38.7223, -9.1393],
          [14.9219, -23.5087],
          [-8.0578, -34.8829], // Recife (Brazil)
          [-22.9068, -43.1729] // Rio de Janeiro
        ]
      }
    ],
    migrationFlows: [
      {
        origin: "West Africa (Angola/Dahomey)",
        destination: "Northeast Brazil (Salvador)",
        description: "Forced migration of millions of enslaved Africans to supply labor for sugar and gold plantations.",
        path: [
          [-8.8390, 13.2894], // Luanda
          [-2.0000, 0.0000],
          [-12.9777, -38.5016] // Salvador da Bahia
        ]
      }
    ]
  }
];
