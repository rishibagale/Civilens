const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'historicalEvents.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Strip TypeScript types and exports
content = content.replace(/export interface[\s\S]*?\n\}/g, '');
content = content.replace(/: Record<EraType, HistoricalEvent\[\]>/g, '');
content = content.replace(/type EraType = [\s\S]*?;/g, '');
content = content.replace(/\bexport\s+/g, '');

const fn = new Function('exports', content + '\nreturn historicalEvents;');
try {
  const events = fn({});
  console.log('Successfully parsed historical events!');
  console.log('Eras found:', Object.keys(events));
  for (const era of Object.keys(events)) {
    console.log(`- ${era}: ${events[era].length} events`);
  }
} catch (err) {
  console.error('Error parsing:', err);
}
