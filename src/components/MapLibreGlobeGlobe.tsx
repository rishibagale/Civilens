import React, { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection, LineString } from "geojson";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";
import { historicalCities } from "@/data/historicalCities";
import { historicalEvents } from "@/data/historicalEvents";
import { countryCoordinatesLookup, countryEraData, empireData } from "@/data/empireData";

// Free demo style from MapLibre
const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

// Helper function to generate a circle polygon in GeoJSON
function createCoordinateCircle(center: [number, number], radiusKm: number, points = 32): number[][] {
  const [lat, lng] = center;
  const coords: number[][] = [];
  const distanceRadians = radiusKm / 6371; // Earth's radius in km
  const latRadians = (lat * Math.PI) / 180;
  const lngRadians = (lng * Math.PI) / 180;

  for (let i = 0; i <= points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const drawLatRadians = Math.asin(
      Math.sin(latRadians) * Math.cos(distanceRadians) +
        Math.cos(latRadians) * Math.sin(distanceRadians) * Math.cos(angle)
    );
    const drawLngRadians = lngRadians + Math.atan2(
      Math.sin(angle) * Math.sin(distanceRadians) * Math.cos(latRadians),
      Math.cos(distanceRadians) - Math.sin(latRadians) * Math.sin(drawLatRadians)
    );
    coords.push([(drawLngRadians * 180) / Math.PI, (drawLatRadians * 180) / Math.PI]);
  }
  return coords;
}

function parsePopulationMillions(population: string): number {
  const value = Number.parseFloat(population.replace(/,/g, ""));
  if (Number.isNaN(value)) return 1;
  if (population.toLowerCase().includes("billion")) return value * 1000;
  if (population.toLowerCase().includes("million")) return value;
  return Math.max(value / 1_000_000, 1);
}

function getLanguageFamilyColor(languages: string[]): string {
  const primaryLanguage = languages[0]?.toLowerCase() ?? "";
  if (primaryLanguage.includes("english") || primaryLanguage.includes("german") || primaryLanguage.includes("dutch") || primaryLanguage.includes("swedish")) return "#38bdf8";
  if (primaryLanguage.includes("spanish") || primaryLanguage.includes("portuguese") || primaryLanguage.includes("french") || primaryLanguage.includes("italian")) return "#f97316";
  if (primaryLanguage.includes("arabic") || primaryLanguage.includes("hebrew") || primaryLanguage.includes("amharic")) return "#f59e0b";
  if (primaryLanguage.includes("hindi") || primaryLanguage.includes("urdu") || primaryLanguage.includes("bengali") || primaryLanguage.includes("nepali")) return "#a855f7";
  if (primaryLanguage.includes("mandarin") || primaryLanguage.includes("chinese") || primaryLanguage.includes("japanese") || primaryLanguage.includes("korean")) return "#ef4444";
  if (primaryLanguage.includes("thai") || primaryLanguage.includes("vietnamese") || primaryLanguage.includes("filipino") || primaryLanguage.includes("indonesian")) return "#10b981";
  if (primaryLanguage.includes("swahili") || primaryLanguage.includes("zulu") || primaryLanguage.includes("xhosa") || primaryLanguage.includes("yoruba") || primaryLanguage.includes("hausa")) return "#84cc16";
  return "#00f0ff";
}

type HistoricalEvent = (typeof historicalEvents)[keyof typeof historicalEvents][number];

function getEventPopupContent(event: HistoricalEvent): string {
  const toneClass =
    event.impact === "major"
      ? "text-cyber-red"
      : event.impact === "significant"
        ? "text-cyber-amber"
        : "text-cyber-cyan";

  return `
    <div class="bg-black/95 text-white p-3 rounded border border-panel-border font-mono text-[9px] w-60 shadow-2xl leading-relaxed">
      <div class="font-bold text-[10px] border-b border-panel-border pb-1 mb-1.5 flex justify-between ${toneClass}">
        <span>${event.title}</span>
        <span>${event.impact === "major" ? "!" : event.impact === "significant" ? "*" : "+"}</span>
      </div>
      <div><span class="text-gray-400">Year:</span> <span class="text-white">${event.year}</span></div>
      <div><span class="text-gray-400">Impact:</span> <span class="uppercase text-white font-semibold">${event.impact}</span></div>
      <div><span class="text-gray-400">Location:</span> <span class="text-white">${event.coordinates?.[0].toFixed(2)}, ${event.coordinates?.[1].toFixed(2)}</span></div>
      <div class="text-gray-300 mt-2 pt-1 border-t border-panel-border/30 text-[8.5px]">${event.description}</div>
    </div>
  `;
}

interface MapLibreGlobeGlobeProps {
  activeEra?: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers?: string[];
  activeCountryId?: string | null;
  onSelectCountry?: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  selectedEventId?: string | null;
}


export default function MapLibreGlobeGlobe({
  activeEra = "ancient",
  activeLayers = ["trade_routes", "migration_flows"],
  activeCountryId = null,
  onSelectCountry,
  onSelectCivilization,
  selectedEventId = null,
}: MapLibreGlobeGlobeProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const selectedEventPopupRef = useRef<maplibregl.Popup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const propsRef = useRef({
    onSelectCountry,
    onSelectCivilization,
  });

  useEffect(() => {
    propsRef.current = {
      onSelectCountry,
      onSelectCivilization,
    };
  }, [onSelectCountry, onSelectCivilization]);

  // Update layers based on era and active layers
  const updateEraLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Remove old layers and sources
    const layerIds = [
      "trade-routes-layer", 
      "migration-flows-layer",
      "ancient-civilizations-layer-fill",
      "ancient-civilizations-layer-line",
      "climate-layer-fill",
      "climate-layer-line",
      "biodiversity-layer-fill",
      "biodiversity-layer-line",
      "population-density-layer-fill",
      "population-density-layer-line",
      "language-families-layer-fill",
      "language-families-layer-line",
      "ocean-currents-layer"
    ];
    const sourceIds = [
      "trade-routes-source", 
      "migration-flows-source",
      "ancient-civilizations-source",
      "climate-source",
      "biodiversity-source",
      "population-density-source",
      "language-families-source",
      "ocean-currents-source"
    ];

    layerIds.forEach((id) => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    sourceIds.forEach((id) => {
      if (map.getSource(id)) map.removeSource(id);
    });

    const activeCivs = civilizationsData.filter((civ) => civ.era === activeEra);

    // Add trade routes
    if (activeLayers.includes("trade_routes")) {
      const routeFeatures: Feature<LineString>[] = [];
      activeCivs.forEach((civ) => {
        civ.tradeRoutes.forEach((route) => {
          routeFeatures.push({
            type: "Feature",
            properties: { name: route.name },
            geometry: {
              type: "LineString",
              coordinates: route.path.map((coord) => [coord[1], coord[0]]),
            },
          });
        });
      });

      if (routeFeatures.length > 0) {
        const collection: FeatureCollection<LineString> = {
          type: "FeatureCollection",
          features: routeFeatures,
        };
        map.addSource("trade-routes-source", { type: "geojson", data: collection });
        map.addLayer({
          id: "trade-routes-layer",
          type: "line",
          source: "trade-routes-source",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#00f0ff",
            "line-width": 2,
            "line-opacity": 0.7,
            "line-dasharray": [3, 2],
          },
        });
      }
    }

    // Add migration flows
    if (activeLayers.includes("migration_flows")) {
      const migrationFeatures: Feature<LineString>[] = [];
      activeCivs.forEach((civ) => {
        civ.migrationFlows.forEach((flow) => {
          migrationFeatures.push({
            type: "Feature",
            properties: { desc: flow.description },
            geometry: {
              type: "LineString",
              coordinates: flow.path.map((coord) => [coord[1], coord[0]]),
            },
          });
        });
      });

      if (migrationFeatures.length > 0) {
        const collection: FeatureCollection<LineString> = {
          type: "FeatureCollection",
          features: migrationFeatures,
        };
        map.addSource("migration-flows-source", { type: "geojson", data: collection });
        map.addLayer({
          id: "migration-flows-layer",
          type: "line",
          source: "migration-flows-source",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#bd00ff",
            "line-width": 3,
            "line-opacity": 0.8,
          },
        });
      }
    }

    // Add Empire Borders (Ancient Border Overlay)
    if (activeLayers.includes("ancient_civilizations")) {
      const activeEmpires = empireData.filter((emp) => emp.era === activeEra);
      const empireFeatures: Feature[] = [];

      activeEmpires.forEach((emp) => {
        const rings: number[][][] = [];
        emp.controlledCountries.forEach((code) => {
          const coords = countriesData[code]?.coordinates ?? countryCoordinatesLookup[code];
          if (coords) {
            const circleRing = createCoordinateCircle(coords, 650); // 650km radius representation
            rings.push(circleRing);
          }
        });

        if (rings.length > 0) {
          empireFeatures.push({
            type: "Feature",
            properties: {
              name: emp.empireName,
              color: emp.color || "rgba(189, 0, 255, 0.3)",
            },
            geometry: {
              type: "MultiPolygon",
              coordinates: rings.map(ring => [ring]),
            },
          });
        }
      });

      if (empireFeatures.length > 0) {
        const collection: FeatureCollection = {
          type: "FeatureCollection",
          features: empireFeatures,
        };
        map.addSource("ancient-civilizations-source", { type: "geojson", data: collection });
        map.addLayer({
          id: "ancient-civilizations-layer-fill",
          type: "fill",
          source: "ancient-civilizations-source",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.35,
          },
        });
        map.addLayer({
          id: "ancient-civilizations-layer-line",
          type: "line",
          source: "ancient-civilizations-source",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 1.5,
            "line-opacity": 0.7,
          },
        });
      }
    }

    // Add Climate Bands Overlay
    if (activeLayers.includes("climate")) {
      const climateFeatures: Feature[] = [];
      Object.values(countriesData).forEach((country) => {
        const type = country.climate.type;
        let color = "#00f0ff";
        let radius = 1000;
        if (type.includes("Desert") || type.includes("Arid")) {
          color = "#eab308"; // Gold
          radius = 1200;
        } else if (type.includes("Temperate Maritime")) {
          color = "#2dd4bf"; // Teal
          radius = 1000;
        } else if (type.includes("Subpolar") || type.includes("Tundra")) {
          color = "#93c5fd"; // Icy Blue
          radius = 1100;
        } else if (type.includes("Monsoon") || type.includes("Tropical wet")) {
          color = "#10b981"; // Emerald
          radius = 1300;
        } else if (type.includes("Tropical")) {
          color = "#16a34a"; // Green
          radius = 1400;
        }

        const ring = createCoordinateCircle(country.coordinates, radius);
        climateFeatures.push({
          type: "Feature",
          properties: { name: country.name, climate: type, color },
          geometry: {
            type: "Polygon",
            coordinates: [ring],
          },
        });
      });

      if (climateFeatures.length > 0) {
        const collection: FeatureCollection = {
          type: "FeatureCollection",
          features: climateFeatures,
        };
        map.addSource("climate-source", { type: "geojson", data: collection });
        map.addLayer({
          id: "climate-layer-fill",
          type: "fill",
          source: "climate-source",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.2,
          },
        });
        map.addLayer({
          id: "climate-layer-line",
          type: "line",
          source: "climate-source",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 1,
            "line-opacity": 0.5,
          },
        });
      }
    }

    // Add Biodiversity Zones Overlay
    if (activeLayers.includes("biodiversity")) {
      const biodiversityFeatures: Feature[] = [];
      Object.values(countriesData).forEach((country) => {
        const rating = country.geography.biodiversityRating;
        let color = "#22c55e"; // Green
        let radius = 1200;
        const ratingLower = rating.toLowerCase();
        if (ratingLower.includes("hyper") || ratingLower.includes("mega")) {
          color = "#22c55e"; // Hyper-diverse Green
          radius = 1500;
        } else if (ratingLower.includes("moderate")) {
          color = "#a3e635"; // Lime
          radius = 1100;
        } else if (ratingLower.includes("low")) {
          color = "#cbd5e1"; // Slate
          radius = 800;
        }

        const ring = createCoordinateCircle(country.coordinates, radius);
        biodiversityFeatures.push({
          type: "Feature",
          properties: { name: country.name, rating, color },
          geometry: {
            type: "Polygon",
            coordinates: [ring],
          },
        });
      });

      if (biodiversityFeatures.length > 0) {
        const collection: FeatureCollection = {
          type: "FeatureCollection",
          features: biodiversityFeatures,
        };
        map.addSource("biodiversity-source", { type: "geojson", data: collection });
        map.addLayer({
          id: "biodiversity-layer-fill",
          type: "fill",
          source: "biodiversity-source",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.2,
          },
        });
        map.addLayer({
          id: "biodiversity-layer-line",
          type: "line",
          source: "biodiversity-source",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 1,
            "line-opacity": 0.5,
          },
        });
      }
    }

    // Add Population Density Overlay
    if (activeLayers.includes("population_density")) {
      const populationFeatures: Feature[] = [];
      Object.values(countriesData).forEach((country) => {
        const populationMillions = parsePopulationMillions(country.population);
        const radius = Math.max(350, Math.min(1800, 280 + Math.sqrt(populationMillions) * 40));
        const ring = createCoordinateCircle(country.coordinates, radius);

        populationFeatures.push({
          type: "Feature",
          properties: {
            name: country.name,
            population: country.population,
            color: "#f59e0b",
          },
          geometry: {
            type: "Polygon",
            coordinates: [ring],
          },
        });
      });

      if (populationFeatures.length > 0) {
        map.addSource("population-density-source", {
          type: "geojson",
          data: { type: "FeatureCollection", features: populationFeatures },
        });
        map.addLayer({
          id: "population-density-layer-fill",
          type: "fill",
          source: "population-density-source",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.18,
          },
        });
        map.addLayer({
          id: "population-density-layer-line",
          type: "line",
          source: "population-density-source",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 1,
            "line-opacity": 0.55,
          },
        });
      }
    }

    // Add Language Families Overlay
    if (activeLayers.includes("language_families")) {
      const languageFeatures: Feature[] = [];
      Object.values(countriesData).forEach((country) => {
        const color = getLanguageFamilyColor(country.languages);
        const ring = createCoordinateCircle(country.coordinates, 700);

        languageFeatures.push({
          type: "Feature",
          properties: {
            name: country.name,
            language: country.languages[0] ?? "Unknown",
            color,
          },
          geometry: {
            type: "Polygon",
            coordinates: [ring],
          },
        });
      });

      if (languageFeatures.length > 0) {
        map.addSource("language-families-source", {
          type: "geojson",
          data: { type: "FeatureCollection", features: languageFeatures },
        });
        map.addLayer({
          id: "language-families-layer-fill",
          type: "fill",
          source: "language-families-source",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.16,
          },
        });
        map.addLayer({
          id: "language-families-layer-line",
          type: "line",
          source: "language-families-source",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 1.25,
            "line-opacity": 0.65,
          },
        });
      }
    }

    // Add Ocean Currents
    if (activeLayers.includes("ocean_currents")) {
      const currents = [
        { name: "Gulf Stream", path: [[25, -80], [30, -79], [35, -75], [40, -68], [45, -50], [50, -35], [55, -20], [60, -5]] },
        { name: "Kuroshio Current", path: [[15, 120], [20, 121], [25, 124], [30, 129], [35, 140], [40, 148]] },
        { name: "Brazil Current", path: [[-5, -35], [-10, -37], [-15, -39], [-20, -40], [-25, -45], [-30, -50]] }
      ];

      const currentFeatures: Feature<LineString>[] = currents.map(current => ({
        type: "Feature",
        properties: { name: current.name },
        geometry: {
          type: "LineString",
          coordinates: current.path.map((coord) => [coord[1], coord[0]]),
        },
      }));

      const collection: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: currentFeatures,
      };

      map.addSource("ocean-currents-source", { type: "geojson", data: collection });
      map.addLayer({
        id: "ocean-currents-layer",
        type: "line",
        source: "ocean-currents-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 3,
          "line-opacity": 0.65,
        },
      });
    }
  }, [activeEra, activeLayers]);


  // Add country, civilization, city, and event markers
  const updateMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // 1. Add country markers with hover tooltips
    Object.values(countriesData).forEach((country) => {
      const el = document.createElement("div");
      el.className = "group relative w-5 h-5 flex items-center justify-center cursor-pointer";
      el.style.pointerEvents = "auto";

      const dot = document.createElement("div");
      dot.className = `w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all ${
        country.id === activeCountryId
          ? "bg-cyber-green/30 border-cyber-green shadow-[0_0_15px_rgba(57,255,20,0.5)] scale-110"
          : "bg-cyber-cyan/15 border-cyber-cyan/60 hover:border-white hover:bg-cyber-cyan/30"
      }`;
      el.appendChild(dot);

      // Resolve controlling empire in this era
      const eraRecord = countryEraData.find((d) => d.countryId === country.id && d.era === activeEra);
      const controlledBy = eraRecord ? eraRecord.controlledBy : "Independent / Indigenous";

      const tooltip = document.createElement("div");
      tooltip.className = "absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-black/95 border border-panel-border px-2.5 py-1.5 rounded text-[8px] text-white font-mono z-50 whitespace-nowrap shadow-2xl";
      tooltip.innerHTML = `
        <div class="font-bold text-cyber-cyan text-[9px] mb-0.5">${country.name}</div>
        <div>Capital: ${country.capital}</div>
        <div class="text-gray-400 mt-0.5">Control: ${controlledBy}</div>
      `;
      el.appendChild(tooltip);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectCountry?.(country.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([country.coordinates[1], country.coordinates[0]])
        .addTo(map);
      markersRef.current.push(marker);
    });

    // 2. Add civilization markers for current era
    civilizationsData
      .filter((civ) => civ.era === activeEra)
      .forEach((civ) => {
        const el = document.createElement("div");
        el.className = "group relative w-6 h-6 flex items-center justify-center cursor-pointer";
        el.style.pointerEvents = "auto";

        const iconContainer = document.createElement("div");
        iconContainer.innerHTML = `<svg class="w-5 h-5 text-cyber-violet filter drop-shadow-[0_0_4px_rgba(189,0,255,0.4)]" fill="currentColor" viewBox="0 0 100 100"><polygon points="50,10 90,85 10,85"/></svg>`;
        el.appendChild(iconContainer);

        const tooltip = document.createElement("div");
        tooltip.className = "absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-black/95 border border-panel-border px-2.5 py-1.5 rounded text-[8px] text-white font-mono z-50 whitespace-nowrap shadow-2xl";
        tooltip.innerHTML = `
          <div class="font-bold text-cyber-violet text-[9px] mb-0.5">${civ.name}</div>
          <div class="text-gray-400">Era: ${activeEra}</div>
        `;
        el.appendChild(tooltip);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectCivilization?.(civ.id);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([civ.centerCoordinates[1], civ.centerCoordinates[0]])
          .addTo(map);
        markersRef.current.push(marker);
      });

    // 3. Add historical city markers and detailed popups
    const activeCities = historicalCities.filter((city) =>
      city.eraInfo.some((info) => info.era === activeEra)
    );

    activeCities.forEach((city) => {
      const el = document.createElement("div");
      el.className = "group relative w-4 h-4 flex items-center justify-center cursor-pointer";
      el.style.pointerEvents = "auto";

      const diamond = document.createElement("div");
      diamond.className = "w-2.5 h-2.5 bg-cyber-amber/20 border border-cyber-amber rotate-45 shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all hover:scale-125 hover:bg-cyber-amber/40";
      el.appendChild(diamond);

      const eraInfo = city.eraInfo.find((info) => info.era === activeEra);
      const role = eraInfo ? eraInfo.role : "Trade Hub";

      const tooltip = document.createElement("div");
      tooltip.className = "absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-black/95 border border-panel-border px-2.5 py-1.5 rounded text-[8px] text-white font-mono z-50 whitespace-nowrap shadow-2xl";
      tooltip.innerHTML = `
        <div class="font-bold text-cyber-amber text-[9px] mb-0.5">${city.name} 🏛️</div>
        <div class="text-gray-400">${role}</div>
      `;
      el.appendChild(tooltip);

      const popEst = city.population[activeEra] ? city.population[activeEra]?.toLocaleString() : "N/A";

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const popupContent = `
          <div class="bg-black/95 text-white p-3 rounded border border-panel-border font-mono text-[9px] w-56 shadow-2xl leading-relaxed">
            <div class="text-cyber-amber font-bold text-[10px] border-b border-panel-border pb-1 mb-1.5 flex justify-between">
              <span>${city.name}</span>
              <span>🏛️</span>
            </div>
            <div><span class="text-gray-400">Era:</span> <span class="capitalize text-white">${activeEra}</span></div>
            <div><span class="text-gray-400">Era Role:</span> <span class="text-cyber-cyan font-semibold">${role}</span></div>
            <div><span class="text-gray-400">Est. Pop:</span> <span class="text-white">${popEst}</span></div>
            <div class="text-gray-300 mt-2 pt-1 border-t border-panel-border/30 text-[8.5px]">${eraInfo?.description || city.historicalSignificance}</div>
          </div>
        `;

        new maplibregl.Popup({ closeButton: true, className: "cyber-popup" })
          .setLngLat([city.coordinates[1], city.coordinates[0]])
          .setHTML(popupContent)
          .addTo(map);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([city.coordinates[1], city.coordinates[0]])
        .addTo(map);
      markersRef.current.push(marker);
    });

    // 4. Add timeline event markers with glowing rings and popups
    const activeEvents = historicalEvents[activeEra] || [];
    activeEvents.forEach((event) => {
      if (!event.coordinates) return;

      const el = document.createElement("div");
      el.className = "group relative w-5 h-5 flex items-center justify-center cursor-pointer";
      el.style.pointerEvents = "auto";

      const impactColorClass = {
        major: "border-cyber-red bg-cyber-red/20 shadow-[0_0_8px_rgba(255,59,48,0.5)]",
        significant: "border-cyber-amber bg-cyber-amber/20 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        regional: "border-cyber-cyan bg-cyber-cyan/20 shadow-[0_0_8px_rgba(0,240,255,0.5)]",
      }[event.impact];

      const pin = document.createElement("div");
      pin.className = `w-3 h-3 rounded-full border flex items-center justify-center transition-all hover:scale-125 ${impactColorClass} ${
        event.id === selectedEventId
          ? "scale-150 ring-2 ring-white/80 shadow-[0_0_18px_rgba(255,255,255,0.8)]"
          : ""
      }`;
      
      const dot = document.createElement("div");
      dot.className = `w-1 h-1 rounded-full ${
        event.impact === "major" ? "bg-cyber-red" : event.impact === "significant" ? "bg-cyber-amber" : "bg-cyber-cyan"
      }`;
      pin.appendChild(dot);
      el.appendChild(pin);

      const tooltip = document.createElement("div");
      tooltip.className = "absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-black/95 border border-panel-border px-2.5 py-1.5 rounded text-[8px] text-white font-mono z-50 whitespace-nowrap shadow-2xl";
      tooltip.innerHTML = `
        <div class="font-bold text-[9px] mb-0.5 ${
          event.impact === "major" ? "text-cyber-red" : event.impact === "significant" ? "text-cyber-amber" : "text-cyber-cyan"
        }">${event.title}</div>
        <div class="text-gray-400">Year: ${event.year}</div>
      `;
      el.appendChild(tooltip);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const popupContent = `
          <div class="bg-black/95 text-white p-3 rounded border border-panel-border font-mono text-[9px] w-56 shadow-2xl leading-relaxed">
            <div class="font-bold text-[10px] border-b border-panel-border pb-1 mb-1.5 flex justify-between ${
              event.impact === "major" ? "text-cyber-red" : event.impact === "significant" ? "text-cyber-amber" : "text-cyber-cyan"
            }">
              <span>${event.title}</span>
              <span>⚡</span>
            </div>
            <div><span class="text-gray-400">Year:</span> <span class="text-white">${event.year}</span></div>
            <div><span class="text-gray-400">Impact:</span> <span class="uppercase text-white font-semibold">${event.impact}</span></div>
            <div class="text-gray-300 mt-2 pt-1 border-t border-panel-border/30 text-[8.5px]">${event.description}</div>
          </div>
        `;

        new maplibregl.Popup({ closeButton: true, className: "cyber-popup" })
          .setLngLat([event.coordinates![1], event.coordinates![0]])
          .setHTML(popupContent)
          .addTo(map);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([event.coordinates[1], event.coordinates[0]])
        .addTo(map);
      markersRef.current.push(marker);
    });

  }, [activeEra, activeCountryId, onSelectCountry, onSelectCivilization, selectedEventId]);

  // Zoom/Fly-to Selected Event
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!selectedEventId) {
      selectedEventPopupRef.current?.remove();
      selectedEventPopupRef.current = null;
      return;
    }

    const event = (historicalEvents[activeEra] || []).find((e) => e.id === selectedEventId);
    if (event && event.coordinates) {
      map.flyTo({
        center: [event.coordinates[1], event.coordinates[0]], // [lng, lat]
        zoom: 4.2,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });

      selectedEventPopupRef.current?.remove();
      selectedEventPopupRef.current = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: false,
        className: "cyber-popup",
      })
        .setLngLat([event.coordinates[1], event.coordinates[0]])
        .setHTML(getEventPopupContent(event))
        .addTo(map);
    }
  }, [selectedEventId, activeEra]);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    try {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: [0, 20],
        zoom: 1.8,
        pitch: -12,
        bearing: 0,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on("load", () => {
        console.log("✓ Map loaded successfully");
        setIsLoading(false);
        setError(null);

        try {
          (map as { setProjection?: (config: { type: string }) => void; setFog?: (config: Record<string, string | number>) => void }).setProjection?.({ type: "globe" });
          (map as { setProjection?: (config: { type: string }) => void; setFog?: (config: Record<string, string | number>) => void }).setFog?.({
            color: "rgb(4, 6, 14)",
            "high-color": "rgb(0, 240, 255)",
            "horizon-blend": 0.08,
            "space-color": "rgb(2, 3, 6)",
            "star-intensity": 0.6,
          });
          console.log("✓ Globe projection applied");
        } catch {
          console.warn("Globe projection not available");
        }

        updateMarkers();
        updateEraLayers();
      });

      map.on("error", (e) => {
        console.error("Map error:", e);
        setError("Map failed to load");
      });

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        let closestCountry: string | null = null;
        let minDistance = Infinity;

        Object.values(countriesData).forEach((country) => {
          const cLat = country.coordinates[0];
          const cLng = country.coordinates[1];
          const dLat = lat - cLat;
          const dLng = lng - cLng;
          let wrappedDLng = dLng;
          while (wrappedDLng > 180) wrappedDLng -= 360;
          while (wrappedDLng < -180) wrappedDLng += 360;

          const distance = Math.sqrt(dLat * dLat + wrappedDLng * wrappedDLng);
          if (distance < minDistance) {
            minDistance = distance;
            closestCountry = country.id;
          }
        });

        // 8 degrees is a reasonable click range for a country on a globe (covers ~880km)
        if (minDistance < 8 && closestCountry) {
          propsRef.current.onSelectCountry?.(closestCountry);
        }
      });

      map.on("mousemove", (e) => {
        const { lng, lat } = e.lngLat;
        let nearCountry = false;

        for (const country of Object.values(countriesData)) {
          const cLat = country.coordinates[0];
          const cLng = country.coordinates[1];
          const dLat = lat - cLat;
          const dLng = lng - cLng;
          let wrappedDLng = dLng;
          while (wrappedDLng > 180) wrappedDLng -= 360;
          while (wrappedDLng < -180) wrappedDLng += 360;

          const distance = Math.sqrt(dLat * dLat + wrappedDLng * wrappedDLng);
          if (distance < 8) {
            nearCountry = true;
            break;
          }
        }

        map.getCanvas().style.cursor = nearCountry ? "pointer" : "";
      });
    } catch (err) {
      console.error("Failed to initialize map:", err);
      // Defer setError to avoid synchronous setState in effect
      setTimeout(() => setError("Failed to initialize map"), 0);
    }

    return () => {
      selectedEventPopupRef.current?.remove();
      selectedEventPopupRef.current = null;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [updateMarkers, updateEraLayers]);

  useEffect(() => {
    updateMarkers();
  }, [activeEra, activeCountryId, updateMarkers]);

  useEffect(() => {
    updateEraLayers();
  }, [activeEra, activeLayers, updateEraLayers]);

  // Zoom/Fly-to Selected Country
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeCountryId) return;

    const country = countriesData[activeCountryId];
    if (country) {
      map.flyTo({
        center: [country.coordinates[1], country.coordinates[0]], // [lng, lat]
        zoom: 3.2,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, [activeCountryId]);


  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }} className="w-full h-full">
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#030408",
        }}
        className="maplibre-container w-full h-full"
      />
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#00f0ff", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontFamily: "monospace" }}>INITIALIZING MAPLIBRE GL...</div>
        </div>
      )}
      {error && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#ff0055", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontFamily: "monospace" }}>{error}</div>
        </div>
      )}
    </div>
  );
}
