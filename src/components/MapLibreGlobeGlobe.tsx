import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Globe-enabled style (projection: globe)
const MAP_STYLE = "https://tiles.stadiamaps.com/styles/alidade_smooth_globe.json";

export default function MapLibreGlobeGlobe() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    // Clean up any previous map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [0, 20],
      zoom: 1.5,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });
    mapRef.current = map;

    // Enable globe projection if available
    map.on("style.load", () => {
      try {
        (map as any).setProjection?.({ type: "globe" });
        (map as any).setFog?.({
          color: "rgb(4, 6, 14)",
          "high-color": "rgb(0, 240, 255)",
          "horizon-blend": 0.08,
          "space-color": "rgb(2, 3, 6)",
          "star-intensity": 0.6,
        });
      } catch {}
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

    // Clean up on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 32px #00f0ff55" }}
      className="maplibre-globe-globe"
    />
  );
}
