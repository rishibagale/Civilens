const fs = require('fs');

const content = fs.readFileSync('src/data/historicalEvents.ts', 'utf8');

// Extract the ancient array
const ancientMatch = content.match(/ancient:\s*\[([\s\S]*?)\]\s*,\s*medieval/);
if (!ancientMatch) {
  console.log('Cannot find ancient array');
  process.exit(1);
}

const ancientText = ancientMatch[1];

// Count events (by id pattern)
const events = [];
const eventRegex = /\{\s*"id":\s*"([^"]+)"/g;
let match;
while ((match = eventRegex.exec(ancientText)) !== null) {
  events.push({ id: match[1] });
}
console.log('Ancient events count:', events.length);

// Check which fields exist inside each event block
// We'll find the block after each "id": "..."
for (const event of events) {
  const eventStart = ancientText.indexOf(`"id": "${event.id}"`);
  if (eventStart === -1) continue;
  
  // Find the closing brace of this event (next "}," or "\n    }," after start)
  let depth = 0;
  let eventEnd = eventStart;
  let foundOpen = false;
  for (let i = eventStart; i < ancientText.length; i++) {
    if (ancientText[i] === '{') { depth++; foundOpen = true; }
    if (ancientText[i] === '}') {
      depth--;
      if (foundOpen && depth === 0) { eventEnd = i; break; }
    }
  }
  const block = ancientText.slice(eventStart, eventEnd);
  
  const fields = {
    id: true,
    narrative: block.includes('"narrative":'),
    causes: block.includes('"causes":'),
    effects: block.includes('"effects":'),
    keyFigures: block.includes('"keyFigures":'),
    relatedEvents: block.includes('"relatedEvents":'),
    imageQuery: block.includes('"imageQuery":'),
    imageCaption: block.includes('"imageCaption":'),
  };
  console.log(fields);
}