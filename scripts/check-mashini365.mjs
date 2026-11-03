import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=n=>fs.readFile(path.join(root,n),'utf8');
const src='campaigns/mashini365/';
const data=JSON.parse(await read(src+'products.json'));
assert.equal(data.length,27);assert.equal(new Set(data.map(p=>p.id)).size,data.length);
for(const p of data){
 const url=new URL(p.url);assert.equal(url.origin,'https://mashini365.bg');assert(url.pathname.startsWith('/product/'));
 assert.match(p.price,/^\d+(?:[.,]\d{2})?\s*€$/);
 assert(['grind','mix','fill','close'].includes(p.type));
 assert.match(p.image,/^__M365_ASSET_BASE__assets\/[a-f0-9]+\.(jpg|png|webp|svg)$/);
 if(p.old)assert(parseFloat(p.old.replace(',','.'))>parseFloat(p.price.replace(',','.')));
}
for(const id of [0,1,2,4,8,9,17,21])assert(data.some(p=>p.id===id),'Missing recommendation product '+id);
const manifest=JSON.parse(await read(src+'assets.json'));
for(const [name,asset] of Object.entries(manifest)){
 const raw=await fs.readFile(path.join(root,'public/mashini365/assets',name));
 assert.equal(raw.length,asset.bytes);assert.equal(createHash('sha256').update(raw).digest('hex'),asset.sha256);
}
const html=await read(src+'page.html');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate HTML ids');
for(const m of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),'Broken section link '+m[1]);
assert(!/<script\b/i.test(html),'HTML fragments must not contain executable scripts');
const app=await read(src+'interactions.js');assert(!app.includes('document.querySelector'));assert(!app.includes('document.body'));
const bundle=await read('public/mashini365/landing.js');new vm.Script(bundle);
assert(!/kolichki|kolichkite|nova_storefront_id/i.test(bundle),'Wrong store configuration');
assert((await read('CLOUDCART-EMBED.txt')).includes('black-fridat-f75da9e11f95b942.cloudcart.dev'));
console.log('PASS: 27 products; recommendation targets; native store URLs; sale prices; '+Object.keys(manifest).length+' asset checksums; unique IDs; anchors; isolated DOM queries; generated JavaScript syntax.');
