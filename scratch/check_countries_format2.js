const fs = require('fs');
const content = fs.readFileSync('src/data/countriesData.ts', 'utf8');

// Check the format of the first few country entries
const lines = content.split('\n');
for (let i = 50; i < 150; i++) {
  console.log(i + 1, lines[i]);
}