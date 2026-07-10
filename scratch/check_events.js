const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'historicalEvents.ts');
const content = fs.readFileSync(filePath, 'utf8');

// A simple parser for the TypeScript file content
const eras = ['ancient', 'medieval', 'colonial', 'modern', 'future'];
const results = {};
eras.forEach(e => results[e] = []);

let currentEra = null;
let currentEvent = null;

// Split by lines
const lines = content.split('\n');
for (let line of lines) {
  line = line.trim();
  
  // Detect era block
  for (const era of eras) {
    if (line.startsWith(era + ': [')) {
      currentEra = era;
    }
  }
  
  if (line === '],') {
    // End of era block (or maybe a nested array like trailPath, but let's check currentEvent first)
    if (currentEvent) {
      // If we are inside an event and see ], we don't clear era
    } else {
      // End of era list
      // But wait, trailPath ends with ]; or ], as well, so we should be careful.
    }
  }

  if (line.startsWith('{') && currentEra) {
    currentEvent = {
      era: currentEra,
      hasNarrative: false,
      hasCauses: false,
      hasEffects: false,
      hasKeyFigures: false
    };
  }

  if (currentEvent) {
    if (line.startsWith('id:')) {
      const match = line.match(/id:\s*"([^"]+)"/);
      if (match) currentEvent.id = match[1];
    }
    if (line.startsWith('title:')) {
      const match = line.match(/title:\s*"([^"]+)"/);
      if (match) currentEvent.title = match[1];
    }
    if (line.startsWith('narrative:')) {
      currentEvent.hasNarrative = true;
    }
    if (line.startsWith('causes:')) {
      currentEvent.hasCauses = true;
    }
    if (line.startsWith('effects:')) {
      currentEvent.hasEffects = true;
    }
    if (line.startsWith('keyFigures:')) {
      currentEvent.hasKeyFigures = true;
    }

    if (line.startsWith('},') || line === '}') {
      // Event ended (unless it's a keyFigure block, but keyFigures end with }, too)
      // We can check if it has id and title to differentiate from keyFigure
      if (currentEvent.id && currentEvent.title) {
        results[currentEvent.era].push(currentEvent);
        currentEvent = null;
      }
    }
  }
}

console.log('--- Historical Events Summary ---');
let total = 0;
let missing = 0;
for (const era of eras) {
  console.log(`\nEra: ${era.toUpperCase()}`);
  const events = results[era];
  console.log(`Total events: ${events.length}`);
  const missingNarrative = events.filter(e => !e.hasNarrative);
  console.log(`Missing narrative: ${missingNarrative.length}`);
  missingNarrative.forEach(e => {
    console.log(`  - [ ] ${e.id} (${e.title})`);
  });
  total += events.length;
  missing += missingNarrative.length;
}
console.log(`\nOverall: ${total} events, ${missing} missing narratives.`);
