// Hook to generate related insights based on current selection
// Returns follow-up questions, related countries, causal chains, and historical context

import { useMemo } from 'react';
import { countriesData } from '@/data/countriesData';
import { civilizationsData } from '@/data/civilizationsData';
import { historicalEvents } from '@/data/historicalEvents';
import { synthesizeInsight, getRelatedCountries, type EraType } from '@/services/aiSynthesisEngine';

export interface RelatedInsights {
  followUpQuestions: string[];
  relatedCountries: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
  historicalContext: string[];
  contrastingCountries: Array<{
    id: string;
    name: string;
    contrast: string;
  }>;
  suggestedExploration: string[];
}

/**
 * Generate related insights based on the currently selected country and era
 * This creates the "rabbit hole" - making sure there's always a next step
 */
export function useRelatedInsights(countryId: string | null, era: EraType): RelatedInsights {
  return useMemo(() => {
    if (!countryId) {
      return {
        followUpQuestions: [],
        relatedCountries: [],
        historicalContext: [],
        contrastingCountries: [],
        suggestedExploration: [],
      };
    }

    const country = countriesData[countryId];
    if (!country) {
      return {
        followUpQuestions: [],
        relatedCountries: [],
        historicalContext: [],
        contrastingCountries: [],
        suggestedExploration: [],
      };
    }

    // ─── FOLLOW-UP QUESTIONS ──────────────────────────────────────────────
    const followUpQuestions = generateFollowUpQuestions(country, era);

    // ─── RELATED COUNTRIES ─────────────────────────────────────────────────
    const relatedCountries = generateRelatedCountries(country);

    // ─── CONTRASTING COUNTRIES ────────────────────────────────────────────
    const contrastingCountries = generateContrastingCountries(country);

    // ─── HISTORICAL CONTEXT ───────────────────────────────────────────────
    const historicalContext = generateHistoricalContext(countryId, era);

    // ─── SUGGESTED EXPLORATION ────────────────────────────────────────────
    const suggestedExploration = generateSuggestedExploration(country, era);

    return {
      followUpQuestions,
      relatedCountries,
      historicalContext,
      contrastingCountries,
      suggestedExploration,
    };
  }, [countryId, era]);
}

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────────

function generateFollowUpQuestions(country: any, era: EraType): string[] {
  const questions: string[] = [];

  // Climate-based questions
  const climate = country.climate.type;
  if (climate.includes('Desert')) {
    questions.push(`How did ${country.name}'s desert climate shape its culture?`);
    questions.push(
      `Why do desert regions develop honor-based cultures like ${country.name}?`
    );
  }
  if (climate.includes('Tropical')) {
    questions.push(`How did ${country.name}'s tropical climate enable agriculture?`);
    questions.push(`What biodiversity shaped ${country.name}'s ecosystems?`);
  }
  if (climate.includes('Temperate')) {
    questions.push(`How did ${country.name}'s temperate climate support development?`);
  }

  // Geography-based questions
  const terrain = country.geography.terrain;
  if (terrain.includes('Island')) {
    questions.push(`How did isolation shape ${country.name}'s unique society?`);
    questions.push(`What makes ${country.name}'s island culture distinct?`);
  }
  if (terrain.includes('Mountain')) {
    questions.push(`How did mountains protect ${country.name} from invasion?`);
    questions.push(`Why do mountain regions develop distinct cultures like ${country.name}?`);
  }
  if (terrain.includes('River')) {
    questions.push(`How did rivers shape ${country.name}'s civilization?`);
  }

  // Religion-based questions
  const religions = country.religion;
  if (religions.length > 1) {
    questions.push(
      `How did multiple religions coexist in ${country.name}?`
    );
  }

  // Anthropology-based questions
  if (country.anthropology.migrationHistory) {
    questions.push(
      `What migration waves created ${country.name}'s genetic diversity?`
    );
  }

  // Trade-based questions
  if (country.economy.tradeLegacy) {
    questions.push(`What trade routes made ${country.name} wealthy?`);
  }

  // Era-specific questions
  if (era === 'colonial') {
    questions.push(`How was ${country.name} affected by colonization?`);
  }
  if (era === 'modern') {
    questions.push(`How do ${country.name}'s past forces shape it today?`);
  }

  return questions.slice(0, 5);
}

function generateRelatedCountries(
  country: any
): Array<{ id: string; name: string; reason: string }> {
  const related: Array<{ id: string; name: string; reason: string }> = [];
  const seen = new Set<string>();

  // Same climate zone
  const sameClimate = Object.entries(countriesData)
    .filter(([id]) => id !== country.id && !seen.has(id))
    .map(([id, other]: any) => {
      let score = 0;
      if (other.climate.type === country.climate.type) score += 3;
      return { id, other, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((p) => {
      seen.add(p.id);
      return {
        id: p.id,
        name: p.other.name,
        reason: `Same ${country.climate.type} climate`,
      };
    });
  related.push(...sameClimate);

  // Same religion
  const sameReligion = Object.entries(countriesData)
    .filter(([id]) => id !== country.id && !seen.has(id))
    .map(([id, other]: any) => {
      let score = 0;
      if (other.religion[0] === country.religion[0]) score += 2;
      return { id, other, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 1)
    .map((p) => {
      seen.add(p.id);
      return {
        id: p.id,
        name: p.other.name,
        reason: `Shared ${country.religion[0]} heritage`,
      };
    });
  related.push(...sameReligion);

  // Geographic proximity
  const proximity = Object.entries(countriesData)
    .filter(([id]) => id !== country.id && !seen.has(id))
    .map(([id, other]: any) => {
      const latDiff = Math.abs(other.coordinates[0] - country.coordinates[0]);
      const lngDiff = Math.abs(other.coordinates[1] - country.coordinates[1]);
      const distance = latDiff + lngDiff;
      return { id, other, distance };
    })
    .filter((p) => p.distance < 30)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
    .map((p) => {
      seen.add(p.id);
      return {
        id: p.id,
        name: p.other.name,
        reason: 'Geographic neighbor',
      };
    });
  related.push(...proximity);

  return related.slice(0, 4);
}

function generateContrastingCountries(
  country: any
): Array<{ id: string; name: string; contrast: string }> {
  const contrasts: Array<{ id: string; name: string; contrast: string }> = [];

  // Same climate, different outcome
  const sameClimateOpposite = Object.entries(countriesData)
    .map(([id, other]: any) => {
      if (id === country.id) return null;

      let similarity = 0;
      let contrast = '';

      // Same climate, different development
      if (other.climate.type === country.climate.type) {
        const gdpDiff =
          Math.abs(
            (country.economy.overview?.length || 0) - (other.economy.overview?.length || 0)
          ) /
          (Math.max(country.economy.overview?.length || 1, other.economy.overview?.length || 1) *
            100);
        if (gdpDiff > 0.3) {
          similarity = 2;
          contrast = `Similar climate, different development`;
        }
      }

      // Same region, different governance
      if (
        Math.abs(other.coordinates[0] - country.coordinates[0]) < 10 &&
        Math.abs(other.coordinates[1] - country.coordinates[1]) < 10
      ) {
        if (other.religion[0] !== country.religion[0]) {
          similarity = 1;
          contrast = `Neighbors but different religions`;
        }
      }

      return similarity > 0 ? { id, name: other.name, contrast, similarity } : null;
    })
    .filter((p) => p !== null)
    .sort((a, b) => (b as any).similarity - (a as any).similarity)
    .slice(0, 2)
    .map((p: any) => ({ id: p.id, name: p.name, contrast: p.contrast }));

  contrasts.push(...sameClimateOpposite);
  return contrasts;
}

function generateHistoricalContext(countryId: string, era: EraType): string[] {
  const context: string[] = [];

  // Find historical events
  const events = historicalEvents[era] || [];
  const relevant = events
    .filter((e) => e.affectedRegions?.includes(countryId))
    .slice(0, 2);

  relevant.forEach((event) => {
    context.push(`${event.year}: ${event.title}`);
  });

  // Find major cities
  const country = countriesData[countryId];
  if (country?.capital) {
    context.push(`Capital: ${country.capital}`);
  }

  return context;
}

function generateSuggestedExploration(country: any, era: EraType): string[] {
  const suggestions: string[] = [];

  // Suggest exploring knowledge graph nodes
  if (country.climate.type.includes('Desert')) {
    suggestions.push('Explore: Desert Empires');
    suggestions.push('Learn: Adaptation to Aridity');
  }

  if (country.geography.terrain.includes('Island')) {
    suggestions.push('Explore: Island Civilizations');
    suggestions.push('Learn: Isolation Effects');
  }

  if (country.religion.length > 1) {
    suggestions.push('Explore: Religious Syncretism');
  }

  // Era-specific
  if (era === 'colonial') {
    suggestions.push('See: Colonial Borders Map');
  }

  if (era === 'medieval') {
    suggestions.push('Explore: Medieval Trade Routes');
  }

  return suggestions.slice(0, 3);
}
