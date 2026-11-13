import { countriesData } from "@/data/countriesData";
import { historicalCities } from "@/data/historicalCities";
import { historicalEvents } from "@/data/historicalEvents";
import { haversineKm, fmtDistanceKm } from "./geoMath";

export type ProximityEntityType = "event" | "city" | "country";

export interface ProximityResult {
  id: string;
  name: string;
  type: ProximityEntityType;
  coordinates: [number, number]; // [lat, lng]
  distanceKm: number;
  formattedDistance: string;
  snippet: string;
  year?: number;
  era?: string;
  countryId?: string;
}

interface IndexedTarget {
  id: string;
  name: string;
  type: ProximityEntityType;
  lat: number;
  lon: number;
  snippet: string;
  year?: number;
  era?: string;
  countryId?: string;
}

/**
 * Pre-flatten and cache all spatial entities across countries, cities, and events
 * for fast (<0.1ms) in-memory proximity lookup.
 */
let cachedIndex: IndexedTarget[] | null = null;

function getSpatialIndex(): IndexedTarget[] {
  if (cachedIndex) return cachedIndex;

  const targets: IndexedTarget[] = [];

  // 1. Countries
  for (const country of Object.values(countriesData)) {
    if (country.coordinates && (country.coordinates[0] !== 0 || country.coordinates[1] !== 0)) {
      targets.push({
        id: country.id,
        name: country.name,
        type: "country",
        lat: country.coordinates[0],
        lon: country.coordinates[1],
        snippet: `${country.capital} · ${country.climate.type} · ${country.geography.terrain}`,
        countryId: country.id,
      });
    }
  }

  // 2. Historical Cities
  for (const city of historicalCities) {
    if (city.coordinates && (city.coordinates[0] !== 0 || city.coordinates[1] !== 0)) {
      const eraDesc = city.eraInfo[0]?.description || city.historicalSignificance;
      targets.push({
        id: city.id,
        name: city.name,
        type: "city",
        lat: city.coordinates[0],
        lon: city.coordinates[1],
        snippet: eraDesc,
        countryId: city.countryId,
      });
    }
  }

  // 3. Historical Events
  for (const [eraKey, events] of Object.entries(historicalEvents)) {
    for (const event of events) {
      if (event.coordinates && (event.coordinates[0] !== 0 || event.coordinates[1] !== 0)) {
        targets.push({
          id: event.id,
          name: event.title,
          type: "event",
          lat: event.coordinates[0],
          lon: event.coordinates[1],
          snippet: event.description,
          year: event.year,
          era: event.era || eraKey,
        });
      }
    }
  }

  cachedIndex = targets;
  return targets;
}

/**
 * Finds the closest historical event, city, or country within maxDistanceKm.
 * Returns null if the locus is in wilderness or open sea outside the threshold.
 */
export function findNearestEntity(
  lat: number,
  lon: number,
  maxDistanceKm = 250,
  activeEra?: string,
): ProximityResult | null {
  const index = getSpatialIndex();
  let closest: IndexedTarget | null = null;
  let minDistance = Infinity;

  for (const target of index) {
    let dist = haversineKm(lat, lon, target.lat, target.lon);
    // If target matches active era, give it slight proximity priority
    if (activeEra && target.era === activeEra) {
      dist *= 0.9;
    }
    if (dist < minDistance && dist <= maxDistanceKm) {
      minDistance = dist;
      closest = target;
    }
  }

  if (!closest) return null;

  return {
    id: closest.id,
    name: closest.name,
    type: closest.type,
    coordinates: [closest.lat, closest.lon],
    distanceKm: minDistance,
    formattedDistance: fmtDistanceKm(minDistance),
    snippet: closest.snippet,
    year: closest.year,
    era: closest.era,
    countryId: closest.countryId,
  };
}

/**
 * Returns all nearby historical and geographic entities within maxDistanceKm, sorted by distance.
 */
export function findNearbyEntities(
  lat: number,
  lon: number,
  maxDistanceKm = 250,
  limit = 5,
): ProximityResult[] {
  const index = getSpatialIndex();
  const results: ProximityResult[] = [];

  for (const target of index) {
    const dist = haversineKm(lat, lon, target.lat, target.lon);
    if (dist <= maxDistanceKm) {
      results.push({
        id: target.id,
        name: target.name,
        type: target.type,
        coordinates: [target.lat, target.lon],
        distanceKm: dist,
        formattedDistance: fmtDistanceKm(dist),
        snippet: target.snippet,
        year: target.year,
        era: target.era,
        countryId: target.countryId,
      });
    }
  }

  results.sort((a, b) => a.distanceKm - b.distanceKm);
  return results.slice(0, limit);
}
