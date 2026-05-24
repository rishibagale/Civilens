"use client";

import React from "react";
import HoloGlobe from "./HoloGlobe";

interface GlobeControllerProps {
  activeCountryId: string | null;
  activeEra: "ancient" | "medieval" | "colonial" | "modern" | "future";
  activeLayers: string[];
  onSelectCountry: (id: string) => void;
  onSelectCivilization?: (id: string) => void;
}

export default function GlobeController(props: GlobeControllerProps) {
  return <HoloGlobe {...props} />;
}
