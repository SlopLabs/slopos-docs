import { readFileSync, existsSync } from 'node:fs';
import GithubSlugger from 'github-slugger';
const files = process.argv.slice(2);
function anchors(file) {
  const s = new GithubSlugger();
  const src = readFileSync(file, 'utf8');
  const out = new Set();
  let inCode = false;
  for (const line of src.split('\n')) {
    if (line.startsWith('```')) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^#{1,6}\s+(.*)$/);
    if (m) out.add(s.slug(m[1].replace(/`/g, '').replace(/\*/g,'')));
  }
  return out;
}
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const own = anchors(f);
  for (const m of src.matchAll(/\]\((\/docs\/[^)#\s]*)?(#[^)\s]*)?\)/g)) {
    const [, path, hash] = m;
    let target = f;
    if (path) {
      target = 'content/docs/' + path.replace('/docs/', '') + '.mdx';
      if (!existsSync(target)) { const idx = 'content/docs/' + path.replace('/docs/','') + '/index.mdx'; if (existsSync(idx)) target = idx; else { console.log(`${f}: missing page ${path}`); continue; } }
    }
    if (hash) {
      const a = path ? anchors(target) : own;
      if (!a.has(hash.slice(1))) console.log(`${f}: missing anchor ${path ?? ''}${hash}`);
    }
  }
}
