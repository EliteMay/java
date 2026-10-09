import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (name) => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const required = ['① 今日の主役', '② 写して動かす', '③ 解説', '④ 自力で書く', '⑤ まとめ'];
let checks = 0;

for (let n = 2; n <= 11; n++) {
  const name = 'lesson' + String(n).padStart(2, '0') + '.html';
  const html = read(name);
  for (const label of required) {
    assert.ok(html.includes(label), name + ': missing essential section ' + label);
    checks++;
  }
  for (const asset of ['reader.css', 'reader.js']) {
    assert.ok(html.includes(asset), name + ': missing ' + asset);
    checks++;
  }
  assert.ok(!html.includes('今日の授業内容</div>'), name + ': redundant outline remained');
  assert.ok(!html.includes('<h2>使う場面</h2>'), name + ': duplicate use cases remained');
  assert.match(html, /<details class="card glossary-fold"><summary>用語集を確認する/);
  assert.match(html, /<details class="quick-answer"><summary>答えと理由を見る/);
  assert.ok((html.match(/<pre class="code"/g) || []).length >= 1, name + ': examples missing');
  assert.ok(html.includes('class="ans"'), name + ': original answers missing');
  checks += 6;
}
const home = read('index.html');
for (let n = 2; n <= 11; n++) {
  const name = 'lesson' + String(n).padStart(2, '0') + '.html';
  assert.ok(home.includes(name), 'Index missing ' + name);
  checks++;
}
for (const name of ['problems.html', 'reader.css', 'reader.js']) {
  assert.ok(existsSync(new URL('../' + name, import.meta.url)), 'File missing ' + name);
  checks++;
}
assert.ok(home.includes('problems.html'), 'Problem set link missing');
checks++;
console.log('Java study site: ' + checks + ' structural checks passed');
