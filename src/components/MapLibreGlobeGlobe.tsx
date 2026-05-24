import React, { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";

// Free demo style from MapLibre
const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

interface MapLibreGlobeGlobeProps {
  activeEra?: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers?: string[];
  activeCountryId?: string | null;
  onSelectCountry?: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
}

export default function MapLibreGlobeGlobe({
  activeEra = "ancient",
  activeLayers = ["trade_routes", "migration_flows"],
  activeCountryId = null,
  onSelectCountry,
  onSelectCivilization,
}: MapLibreGlobeGlobeProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update layers based on era and active layers
  const updateEraLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Remove old layers and sources
    const layerIds = ["trade-routes-layer", "migration-flows-layer"];
    const sourceIds = ["trade-routes-source", "migration-flows-source"];

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
  }, [activeEra, activeLayers]);

  // Add country and civilization markers
  const updateMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add country markers
    Object.values(countriesData).forEach((country) => {
      const el = document.createElement("div");
      el.className = `w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all border ${
        country.id === activeCountryId
          ? "bg-cyber-green/30 border-cyber-green shadow-[0_0_15px_rgba(57,255,20,0.5)]"
          : "bg-cyber-cyan/15 border-cyber-cyan/60"
      }`;
      el.style.pointerEvents = "auto";
      el.addEventListener("click", () => onSelectCountry?.(country.id));
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([country.coordinates[1], country.coordinates[0]])
        .addTo(map);
      markersRef.current.push(marker);
    });

    // Add civilization markers for current era
    civilizationsData
      .filter((civ) => civ.era === activeEra)
      .forEach((civ) => {
        const el = document.createElement("div");
        el.className = "w-6 h-6 flex items-center justify-center cursor-pointer";
        el.innerHTML = `<svg class="w-5 h-5 text-cyber-violet" fill="currentColor" viewBox="0 0 100 100"><polygon points="50,10 90,85 10,85"/></svg>`;
        el.style.pointerEvents = "auto";
        el.addEventListener("click", () => onSelectCivilization?.(civ.id));
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([civ.centerCoordinates[1], civ.centerCoordinates[0]])
          .addTo(map);
        markersRef.current.push(marker);
      });
  }, [activeEra, activeCountryId, onSelectCountry, onSelectCivilization]);

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
        zoom: 1.5,
        pitch: 45,
        bearing: 0,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on("load", () => {
        console.log("✓ Map loaded successfully");
        setIsLoading(false);
        setError(null);

        const mapAny = map as any;
        try {
          mapAny.setProjection?.({ type: "globe" });
          mapAny.setFog?.({
            color: "rgb(4, 6, 14)",
            "high-color": "rgb(0, 240, 255)",
            "horizon-blend": 0.08,
            "space-color": "rgb(2, 3, 6)",
            "star-intensity": 0.6,
          });
          console.log("✓ Globe projection applied");
        } catch (err) {
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
    } catch (err) {
      console.error("Failed to initialize map:", err);
      setError("Failed to initialize map");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    updateMarkers();
  }, [activeEra, activeCountryId, updateMarkers]);

  useEffect(() => {
    updateEraLayers();
  }, [activeEra, activeLayers, updateEraLayers]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#030408",
        }}
        className="maplibre-container"
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
