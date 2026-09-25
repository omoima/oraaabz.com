import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const notes = new Set(['implementation.md', 'demo-showcase.md']);

for (const page of ['index.html', 'photography/index.html', 'demos/flitecare/index.html']) {
  if (!existsSync(join(output, page))) throw new Error(`Missing static page: ${page}`);
}

const checkDirectory = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (notes.has(entry.name.toLowerCase())) {
      throw new Error(`Repository notes must never be published: ${entry.name}`);
    }
    if (entry.isDirectory()) checkDirectory(join(directory, entry.name));
  }
};

checkDirectory(output);
console.log('Static routes verified; repository notes are excluded from the website.');
