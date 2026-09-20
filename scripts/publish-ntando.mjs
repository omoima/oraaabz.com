import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pagePath = fileURLToPath(new URL('../public/ntando/index.html', import.meta.url));
const page = readFileSync(pagePath);

if (page.length === 0 || page.length > 48 * 1024) {
  throw new Error('The Ntando page must be between 1 byte and 48 KB.');
}

const repo = 'omoima/oraaabz.com';

execFileSync('gh', ['secret', 'set', 'NTANDO_HTML', '--repo', repo], {
  input: page,
  stdio: ['pipe', 'inherit', 'inherit'],
});

execFileSync('gh', ['workflow', 'run', 'deploy.yml', '--repo', repo, '--ref', 'main'], {
  stdio: 'inherit',
});

console.log('The updated page is queued for publishing at /ntando/.');
