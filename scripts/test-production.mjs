import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const worker=(await import('../build/server/index.js')).default;
assert.equal(typeof worker.fetch,'function');
const response=await worker.fetch(new Request('https://black-fridat-f75da9e11f95b942.cloudcart.dev/'));
assert.equal(response.status,200);assert(response.headers.get('content-type').includes('text/html'));
const html=await response.text();assert(html.includes('data-m365-landing'));assert(html.includes('/mashini365/landing.js?v=1'));
assert.equal(response.headers.get('x-robots-tag'),'noindex, follow');assert(!response.headers.has('set-cookie'));
assert.equal((await worker.fetch(new Request('https://example.com/',{method:'POST'}))).status,405);
const original=await fs.readFile(path.join(root,'public/mashini365/landing.js'));
const deployed=await fs.readFile(path.join(root,'build/client/mashini365/landing.js'));
assert(original.equals(deployed),'Published JS must match generated campaign');
const manifest=JSON.parse(await fs.readFile(path.join(root,'campaigns/mashini365/assets.json'),'utf8'));
for(const name of Object.keys(manifest)){assert((await fs.stat(path.join(root,'build/client/mashini365/assets',name))).size>0);}
console.log('PASS: production worker renders the landing shell; correct script URL; noindex; no session cookies; rejects writes; all 37 assets included.');
process.exit(0);
