"use client";

import React, { useCallback, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection, LineString } from "geojson";
import { countriesData } from "@/data/countriesData";
import { civilizationsData } from "@/data/civilizationsData";

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

interface MapLibreGlobeProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  onLoadError?: () => void;
  onLoadSuccess?: () => void;
}

export default function MapLibreGlobe({
  activeCountryId,
  activeEra,
  activeLayers,
  onSelectCountry,
  onSelectCivilization,
  onLoadError,
  onLoadSuccess,
}: MapLibreGlobeProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const onLoadErrorRef = useRef(onLoadError);
  const onLoadSuccessRef = useRef(onLoadSuccess);

  const propsRef = useRef({
    activeCountryId,
    activeEra,
    activeLayers,
    onSelectCountry,
    onSelectCivilization,
  });

  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
    onLoadSuccessRef.current = onLoadSuccess;
  }, [onLoadError, onLoadSuccess]);

  useEffect(() => {
    propsRef.current = {
      activeCountryId,
      activeEra,
      activeLayers,
      onSelectCountry,
      onSelectCivilization,
    };
  }, [activeCountryId, activeEra, activeLayers, onSelectCountry, onSelectCivilization]);

  const updateTimelineAndLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const {
      activeCountryId: countryId,
      activeEra: era,
      activeLayers: layers,
      onSelectCountry: selectCountry,
      onSelectCivilization: selectCivilization,
    } = propsRef.current;

    if (map.getLayer("trade-routes-layer")) map.removeLayer("trade-routes-layer");
    if (map.getSource("trade-routes-source")) map.removeSource("trade-routes-source");
    if (map.getLayer("migration-flows-layer")) map.removeLayer("migration-flows-layer");
    if (map.getSource("migration-flows-source")) map.removeSource("migration-flows-source");

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    Object.values(countriesData).forEach((country) => {
      const el = document.createElement("div");
      el.className = `w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border ${
        country.id === countryId
          ? "bg-cyber-green/30 border-cyber-green shadow-[0_0_15px_rgba(57,255,20,0.5)] scale-125"
          : "bg-cyber-cyan/15 border-cyber-cyan/60 hover:bg-cyber-cyan/30 hover:scale-110 shadow-[0_0_8px_rgba(0,240,255,0.2)]"
      }`;

      const inner = document.createElement("div");
      inner.className = `w-2.5 h-2.5 rounded-full ${
        country.id === countryId ? "bg-cyber-green" : "bg-cyber-cyan"
      } animate-ping`;
      el.appendChild(inner);

      const tooltip = document.createElement("span");
      tooltip.innerText = country.name;
      tooltip.className =
        "absolute -top-8 bg-panel-bg border border-panel-border text-white text-[10px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap";
      el.appendChild(tooltip);
      el.classList.add("group");

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        selectCountry(country.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([country.coordinates[1], country.coordinates[0]])
        .addTo(map);

      markersRef.current.push(marker);
    });

    civilizationsData
      .filter((civ) => civ.era === era)
      .forEach((civ) => {
        const el = document.createElement("div");
        el.className =
          "w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 group";

        el.innerHTML = `
          <div class="relative w-full h-full flex items-center justify-center">
            <svg class="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(189,0,255,0.8)]" viewBox="0 0 100 100">
              <polygon points="50,10 90,85 10,85" fill="rgba(189,0,255,0.25)" stroke="#bd00ff" stroke-width="6"/>
              <circle cx="50" cy="60" r="10" fill="#bd00ff"/>
            </svg>
            <span class="absolute -top-8 bg-panel-bg border border-cyber-violet/50 text-cyber-violet text-[10px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              🏛️ ${civ.name}
            </span>
          </div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          if (selectCivilization) selectCivilization(civ.id);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([civ.centerCoordinates[1], civ.centerCoordinates[0]])
          .addTo(map);

        markersRef.current.push(marker);
      });

    const activeCivs = civilizationsData.filter((civ) => civ.era === era);

    if (layers.includes("trade_routes")) {
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

    if (layers.includes("migration_flows")) {
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
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeCountryId) return;

    const country = countriesData[activeCountryId];
    if (country) {
      map.flyTo({
        center: [country.coordinates[1], country.coordinates[0]],
        zoom: 3.5,
        essential: true,
        duration: 2000,
      });
    }
  }, [activeCountryId]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: MAP_STYLE,
        center: [15, 30],
        zoom: 1.8,
      });

      mapRef.current = map;

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

      map.on("load", () => {
        if (cancelled) return;
        const mapGlobe = map as maplibregl.Map & {
          setProjection?: (p: { type: string }) => void;
          setFog?: (f: Record<string, string | number>) => void;
        };
        try {
          mapGlobe.setProjection?.({ type: "globe" });
          mapGlobe.setFog?.({
            color: "rgb(4, 6, 14)",
            "high-color": "rgb(0, 240, 255)",
            "horizon-blend": 0.08,
            "space-color": "rgb(2, 3, 6)",
            "star-intensity": 0.6,
          });
        } catch {
          // Optional globe atmosphere APIs vary by MapLibre version
        }
        updateTimelineAndLayers();
        onLoadSuccessRef.current?.();
      });

      map.on("error", (e) => {
        console.error("MapLibre error:", e);
        onLoadErrorRef.current?.();
      });
    } catch (err) {
      console.error("Failed to initialize MapLibre:", err);
      onLoadErrorRef.current?.();
    }

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [updateTimelineAndLayers]);

  useEffect(() => {
    updateTimelineAndLayers();
  }, [activeEra, activeLayers, activeCountryId, updateTimelineAndLayers]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0" />

      <div className="absolute bottom-4 right-4 bg-panel-bg/90 backdrop-blur border border-panel-border px-3 py-2 rounded font-mono text-[9px] text-gray-400 pointer-events-none z-10">
        <div className="flex items-center space-x-1.5 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-white">MAPLIBRE GLOBE</span>
        </div>
        <div>STYLE: demotiles.maplibre.org</div>
        <div>RENDER: MapLibre GL · FREE</div>
      </div>
    </div>
  );
}
