const fs = require('fs');
const content = fs.readFileSync('src/data/allCountriesComprehensive.ts', 'utf8');

const matches = content.match(/id:\s*"[^"]+"/g);
if (matches) {
  console.log('Found', matches.length, 'matches');
  matches.forEach(m => console.log(m));
} else {
  console.log('No matches found');
}