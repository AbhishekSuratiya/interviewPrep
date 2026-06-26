import fs from 'fs';

// Generic enricher: inserts `analogy` and `keyPoints` right after `explanation`
// for every topic whose id appears in the enrichment map. Preserves key order.
export function enrich(filePath, map) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let touched = 0;
  const missing = new Set(Object.keys(map));

  const visitTopic = (topic) => {
    const e = map[topic.id];
    if (!e) return topic;
    missing.delete(topic.id);
    touched++;
    const out = {};
    for (const [k, v] of Object.entries(topic)) {
      out[k] = v;
      if (k === 'explanation') {
        if (e.explanation) out.explanation = e.explanation; // optional override
        if (e.analogy) out.analogy = e.analogy;
        if (e.keyPoints) out.keyPoints = e.keyPoints;
      }
    }
    // If a topic had no explanation key (shouldn't happen) still attach
    if (!('analogy' in out) && e.analogy) out.analogy = e.analogy;
    if (!('keyPoints' in out) && e.keyPoints) out.keyPoints = e.keyPoints;
    return out;
  };

  const visitSections = (sections) =>
    (sections || []).forEach(sec => { sec.topics = (sec.topics || []).map(visitTopic); });

  visitSections(data.sections);
  visitSections(data.seniorSections);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Enriched ${touched} topics in ${filePath}`);
  if (missing.size) console.log('  NOT FOUND (check ids):', [...missing].join(', '));
}
