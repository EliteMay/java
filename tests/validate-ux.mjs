import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read=name=>readFileSync(new URL('../'+name, import.meta.url),'utf8');
const home=read('index.html');
let total=0;
assert.equal((home.match(/class="lesson-copy"/g)||[]).length,10,'all lesson cards have readable titles');
assert.ok((home.match(/class="lesson-tag"/g)||[]).length>=30,'lesson cards need keyword tags');
total+=2;
for (const name of [...Array.from({length:10},(_,i)=>'lesson'+String(i+2).padStart(2,'0')+'.html'),'problems.html']) {
  const html=read(name);
  assert.ok(html.includes('href="reader-ux.css"'),name+' missing shared mobile CSS');
  assert.ok(html.includes('src="reader-ux.js"'),name+' missing shared code/TOC JS');
  assert.ok(html.includes('class="course-nav"'),name+' missing course navigation');
  assert.ok(!/<details\b[^>]*class="ans"[^>]*\bopen\b/.test(html),name+' solution accidentally open');
  assert.ok((html.match(/<pre class="code"/g)||[]).length>=1,name+' lost code examples');
  total+=5;
}
const script=read('reader-ux.js'),style=read('reader-ux.css');
for(const marker of ['initNavigation','addToc','initCode','reader-wrapped','data-copy','data-wrap']) {
  assert.ok(script.includes(marker),'missing expected UX handler '+marker);
  total++;
}
assert.ok(style.includes('overflow-x:auto'),'mobile code scrolling unavailable');
assert.ok(style.includes('position:sticky'),'sticky navigation unavailable');
assert.ok(style.includes('prefers-reduced-motion'),'reduced-motion missing');
total+=3;
console.log('Study UI regression: '+total+' checks passed');
