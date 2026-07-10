const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'allCountriesComprehensive.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Strip TypeScript type annotations and exports to make it valid JS
content = content.replace(/export interface[\s\S]*?\n\}/g, '');
content = content.replace(/: CountryComprehensive\[\]/g, '');
content = content.replace(/as Record<string, CountryComprehensive>/g, '');
content = content.replace(/\bexport\s+/g, ''); // Strip export keywords


// Evaluate the file content in a sandbox context
const sandbox = {};
const fn = new Function('exports', content + '\nreturn allCountriesComprehensive;');
try {
  const allCountries = fn(sandbox);
  console.log(`Successfully parsed ${allCountries.length} countries!`);
  console.log('Sample country ID:', allCountries[0].id, 'Name:', allCountries[0].name);
} catch (err) {
  console.error('Error parsing:', err);
}
