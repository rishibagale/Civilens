"use client";

import React from "react";
import HoloGlobe from "./HoloGlobe";
import MapboxGlobe from "./MapboxGlobe";

interface GlobeControllerProps {
  mapboxToken: string;
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
  onMapboxAuthError?: () => void;
}

export default function GlobeController({
  mapboxToken,
  activeCountryId,
  activeEra,
  activeLayers,
  onSelectCountry,
  onSelectCivilization,
  onMapboxAuthError,
}: GlobeControllerProps) {
  const hasToken = mapboxToken && mapboxToken.trim().startsWith("pk.");

  if (hasToken) {
    return (
      <MapboxGlobe
        mapboxToken={mapboxToken}
        activeCountryId={activeCountryId}
        activeEra={activeEra}
        activeLayers={activeLayers}
        onSelectCountry={onSelectCountry}
        onSelectCivilization={onSelectCivilization}
        onAuthError={onMapboxAuthError}
      />
    );
  }

  return (
    <HoloGlobe
      activeCountryId={activeCountryId}
      activeEra={activeEra}
      activeLayers={activeLayers}
      onSelectCountry={onSelectCountry}
      onSelectCivilization={onSelectCivilization}
    />
  );
}
