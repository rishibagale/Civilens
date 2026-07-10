const fs = require('fs');
const content = fs.readFileSync('src/data/countriesData.ts', 'utf8');

// Check the format of the first few country entries
const lines = content.split('\n');
for (let i = 0; i < 100; i++) {
  if (lines[i].includes('id') || lines[i].includes('EG') || lines[i].includes('JP')) {
    console.log(i + 1, lines[i]);
  }
}