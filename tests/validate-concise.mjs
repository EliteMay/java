import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
let total=0;
const expected={2:5,3:4,4:3,5:4,6:4,7:4,8:5,9:4,10:5,11:6,12:4,13:4,14:6,15:9};
for(let n=2;n<=15;n++){
 const path='lesson'+String(n).padStart(2,'0')+'.html';
 const html=read(path);
 const start=html.indexOf('<div class="card explanation-card">');
 const end=html.indexOf('<div class="card quick-check"',start);
 assert.ok(start>=0 && end>start,path+': explanation bounds missing');
 const section=html.slice(start,end);
 const count=expected[n];
 assert.equal((section.match(/class="explain-brief"/g)||[]).length,count,path+': wrong concise takeaway count');
 assert.equal((section.match(/class="explain-more"/g)||[]).length,count,path+': missing optional deep explanation');
 assert.equal((section.match(/<summary>この部分のコード・詳しい説明を見る<\/summary>/g)||[]).length,count,path+': disclosure missing');
 assert.equal((section.match(/<h2>/g)||[]).length,count,path+': part headings changed');
 assert.ok(html.includes('href="concise-explanations.css"'),path+': short style missing');
 assert.ok(html.includes('class="ans"'),path+': hidden original answers lost');
 assert.ok(html.includes('④ 自力で書く'),path+': exercises missing');
 assert.ok((section.match(/<pre class="code"/g)||[]).length>=1,path+': original code lost');
 // All original detailed snippets now begin inside a closed details element.
 assert.ok(section.indexOf('<details class="explain-more">')<section.indexOf('<pre class="code"'),path+': long code still exposed');
 total+=9;
}
for(const n of [11,12,13,14]){
 const page=read('lesson'+n+'.html');
 assert.ok(!page.includes('localhost:3306'),n+': port reversion');
 assert.ok(!page.includes('"password"'),n+': obsolete test password');
 assert.ok(page.includes('jdbc:mysql://localhost:65534/stock'),n+': classroom URL missing');
 assert.ok(page.includes('private static final String PASSWORD = "pass";'),n+': classroom password missing');
 assert.ok(page.includes('mysql --protocol=TCP -h 127.0.0.1 -P 65534 -u root -p'),n+': CLI port missing');
 total+=5;
}
const workbook=read('problems.html');
assert.ok(!workbook.includes('localhost:3306'), 'workbook still uses old port');
assert.ok(!workbook.includes('"password"'), 'workbook still uses old password');
assert.ok(workbook.includes('jdbc:mysql://localhost:65534/stock'), 'workbook needs classroom URL');
assert.ok(workbook.includes('private static final String PASSWORD = "pass";'), 'workbook needs classroom password');
total+=4;
assert.ok(workbook.includes('id="q19"'), 'revised workbook must include lesson 19 exercises');
assert.ok(read('lesson13.html').includes('href="lesson14.html"'), 'lesson 13 missing next link');
total+=2;
const l11=read('lesson11.html');
assert.ok(l11.includes('"wrongpass"'), 'the deliberate wrong-password example must stay incorrect');
assert.ok(read('concise-explanations.css').includes('.explain-more'), 'styles missing');
total+=2;
console.log('Concise Java lessons and classroom setup: '+total+' checks passed');
