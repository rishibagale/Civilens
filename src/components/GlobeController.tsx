"use client";

import React, { useState } from "react";
import HoloGlobe from "./HoloGlobe";
import MapLibreGlobe from "./MapLibreGlobe";

interface GlobeControllerProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  onEngineChange?: (engine: "maplibre" | "holo") => void;
}

export default function GlobeController({
  onEngineChange,
  ...props
}: GlobeControllerProps) {
  const [useHoloFallback, setUseHoloFallback] = useState(false);

  const handleMapError = () => {
    setUseHoloFallback(true);
    onEngineChange?.("holo");
  };

  if (useHoloFallback) {
    return <HoloGlobe {...props} />;
  }

  return (
    <MapLibreGlobe
      {...props}
      onLoadError={handleMapError}
      onLoadSuccess={() => onEngineChange?.("maplibre")}
    />
  );
}
