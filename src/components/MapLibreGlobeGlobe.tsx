import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Free demo style from MapLibre
const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

export default function MapLibreGlobeGlobe() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up any previous map
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

        // Apply globe projection and fog
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
          console.warn("Globe projection not available in this MapLibre version");
        }
      });

      map.on("error", (e) => {
        console.error("Map error:", e);
        setError("Map failed to load");
      });

      // Add navigation controls
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
