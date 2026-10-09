import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const expected = {
  'enhanced-for': '取り出した値: 60\n取り出した値: 80\n取り出した値: 100\n合計: 240',
  'value-pass': '10\n99',
  'this-constructor': 'りんご: 120',
  'static-instance': '2\nA\nB',
  'override-super': '動物\nワン',
  'interface': 'ワン\nニャー',
  'hashmap': '2\n1',
  'null-exception': '名前がありません\n次の処理',
  'file-io': 'こんにちは'
};
const decode = html => html
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&');

for (const [topic, want] of Object.entries(expected)) {
  const html = readFileSync(new URL('../concepts/' + topic + '.html', import.meta.url), 'utf8');
  const found = html.match(/<pre class="code" id="main-code"><code>([\s\S]*?)<\/code><\/pre>/);
  assert.ok(found, 'Missing main code for ' + topic);
  const java = decode(found[1]);
  const dir = mkdtempSync(join(tmpdir(), 'java-lesson-'));
  try {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(join(dir, 'Main.java'), java);
    const compile = spawnSync('javac', ['Main.java'], {cwd:dir, encoding:'utf8', timeout:15000});
    assert.equal(compile.status, 0, topic + ' compile failed: ' + (compile.stderr || compile.error));
    const run = spawnSync('java', ['Main'], {cwd:dir, encoding:'utf8', timeout:15000});
    assert.equal(run.status, 0, topic + ' run failed: ' + (run.stderr || run.error));
    assert.equal(run.stdout.trim().replace(/\r\n/g, '\n'), want, topic + ' output mismatch');
    console.log('Java example OK: ' + topic);
  } finally {
    rmSync(dir, {recursive:true, force:true});
  }
}
console.log('Java examples: all 9 standalone programs compiled and ran successfully');
