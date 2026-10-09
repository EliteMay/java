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


const topics = [
  'enhanced-for', 'value-pass', 'this-constructor', 'static-instance',
  'override-super', 'interface', 'hashmap', 'null-exception', 'file-io', 'jdbc'
];
const conceptHome = read('concepts/index.html');
assert.ok(home.includes('concepts/index.html'), 'Homepage missing concept guide link');
checks++;
for (const [index, topic] of topics.entries()) {
  const path = 'concepts/' + topic + '.html';
  const html = read(path);
  const lesson = read('lesson' + String(index + 2).padStart(2, '0') + '.html');
  assert.ok(conceptHome.includes(topic + '.html'), 'Concept index missing ' + topic);
  assert.ok(lesson.includes('concepts/' + topic + '.html'), 'Lesson missing concept link: ' + topic);
  assert.ok(html.includes('../lesson' + String(index + 2).padStart(2, '0') + '.html'), 'Concept lacks backlink');
  for (const resource of ['style.css', '../reader.css', '../reader.js', 'script.js']) {
    assert.ok(html.includes(resource), 'Concept lacks resource ' + resource + ': ' + topic);
  }
  for (const marker of ['まず結論', 'コードと結果で確認', '1行ずつ考えると', 'よくある勘違い', '答えと理由を開く']) {
    assert.ok(html.includes(marker), 'Concept lacks section ' + marker + ': ' + topic);
  }
  assert.ok(html.includes('<pre class="code" id="main-code">'), 'Concept missing main code block ' + topic);
  assert.ok(html.includes('<pre class="code" id="compare-code">'), 'Concept missing contrast code block ' + topic);
  assert.ok(html.includes('data-copy-code="main-code"'), 'Concept missing copy control ' + topic);
  assert.ok(html.endsWith('</html>'), 'Concept HTML incomplete: ' + topic);
  checks += 15;
}
for (const asset of ['concepts/style.css', 'concepts/script.js']) {
  assert.ok(existsSync(new URL('../' + asset, import.meta.url)), 'Concept shared resource missing ' + asset);
  checks++;
}
console.log('Dedicated Java concepts: all 10 paths and lesson links verified');
