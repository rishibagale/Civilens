const fs = require('fs');

// Read both files
const countriesDataContent = fs.readFileSync('src/data/countriesData.ts', 'utf8');
const allCountriesContent = fs.readFileSync('src/data/allCountriesComprehensive.ts', 'utf8');

// Extract country IDs from countriesData.ts (keys like EG:, JP:)
const countriesDataIds = new Set();
const countriesDataMatches = countriesDataContent.match(/^\s*([A-Z]{2}):\s*{/gm);
if (countriesDataMatches) {
  countriesDataMatches.forEach(match => {
    const id = match.match(/^\s*([A-Z]{2}):/)[1];
    countriesDataIds.add(id);
  });
}

console.log('Countries in countriesData.ts:');
console.log(Array.from(countriesDataIds).sort().join(', '));
console.log('Count:', countriesDataIds.size);

// Extract country IDs from allCountriesComprehensive.ts
const allCountriesIds = new Set();
const allCountriesMatches = allCountriesContent.match(/id:\s*"[^"]+"/g);
if (allCountriesMatches) {
  allCountriesMatches.forEach(match => {
    const id = match.match(/id:\s*"([^"]+)"/)[1];
    allCountriesIds.add(id);
  });
}

console.log('\nCountries in allCountriesComprehensive.ts:');
console.log(Array.from(allCountriesIds).sort().join(', '));
console.log('Count:', allCountriesIds.size);

// Find missing countries
const missingCountries = new Set();
allCountriesIds.forEach(id => {
  if (!countriesDataIds.has(id)) {
    missingCountries.add(id);
  }
});

console.log('\nMissing countries (in allCountries but not in countriesData):');
console.log(Array.from(missingCountries).sort().join(', '));
console.log('Count:', missingCountries.size);

// Also find countries in countriesData that are NOT in allCountriesComprehensive
const extraCountries = new Set();
countriesDataIds.forEach(id => {
  if (!allCountriesIds.has(id)) {
    extraCountries.add(id);
  }
});

console.log('\nCountries in countriesData but NOT in allCountriesComprehensive:');
console.log(Array.from(extraCountries).sort().join(', '));
console.log('Count:', extraCountries.size);