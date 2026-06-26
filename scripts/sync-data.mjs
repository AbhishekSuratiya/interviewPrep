import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// The app fetches /data/*.json, which Vite serves from public/data/.
// Root data/ is the editable source of truth. This keeps public/data/ in sync
// so content edits actually reach the running app (dev) and the build (dist).
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'data');
const dest = path.join(root, 'public', 'data');

fs.mkdirSync(dest, { recursive: true });

let copied = 0;
for (const file of fs.readdirSync(src)) {
  if (!file.endsWith('.json')) continue;
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
  copied++;
}
console.log(`[sync-data] copied ${copied} JSON file(s): data/ → public/data/`);
