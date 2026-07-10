const fs = require('fs');

// Read the historicalEvents.ts file
const content = fs.readFileSync('src/data/historicalEvents.ts', 'utf8');

// Count total events
const totalEvents = (content.match(/"id":\s*"[^"]+"/g) || []).length;
console.log(`Total events: ${totalEvents}`);

// Count events with narratives
const eventsWithNarrative = (content.match(/"narrative":\s*".*?"/gs) || []).length;
console.log(`Events with narratives: ${eventsWithNarrative}`);

// Count events without narratives
const eventsWithoutNarrative = totalEvents - eventsWithNarrative;
console.log(`Events without narratives: ${eventsWithoutNarrative}`);

// Extract event IDs for those without narratives
const eventMatches = content.match(/"id":\s*"([^"]+)".*?"narrative":\s*".*?"/gs);
const eventIdsWithoutNarrative = content.match(/"id":\s*"([^"]+)".*?(?="narrative":\s*".*?")/gs);

console.log('\nEvents without narratives:');
const lines = content.split('\n');
let inEvent = false;
let currentEventId = '';
let eventCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('"id":')) {
    const match = line.match(/"id":\s*"([^"]+)"/);
    if (match) {
      currentEventId = match[1];
      inEvent = true;
    }
  }
  
  if (inEvent && line.includes('"narrative":')) {
    inEvent = false;
    continue;
  }
  
  if (inEvent && !line.includes('"narrative":') && line.includes('}')) {
    // This is the end of an event without narrative
    console.log(`- ${currentEventId}`);
    eventCount++;
    inEvent = false;
  }
}

console.log(`\nTotal events without narratives: ${eventCount}`);