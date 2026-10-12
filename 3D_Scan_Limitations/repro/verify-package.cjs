/* Verify this evidence kit; optionally verify a pinned app checkout as well. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'MANIFEST.json'), 'utf8'));
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

let totalBytes = 0;
for (const artifact of manifest.artifacts) {
  const target = path.resolve(root, artifact.path);
  assert.ok(target.startsWith(root + path.sep), `Unsafe artifact path: ${artifact.path}`);
  const bytes = fs.readFileSync(target);
  assert.equal(bytes.length, artifact.bytes, `Size mismatch: ${artifact.path}`);
  assert.equal(sha256(bytes), artifact.sha256, `Hash mismatch: ${artifact.path}`);
  if (artifact.provenance.bytePreservingCopy)
    assert.equal(artifact.sha256, artifact.provenance.originalSha256, `Changed copy: ${artifact.path}`);
  totalBytes += bytes.length;
}
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const targets = [...readme.matchAll(/\[[^\]\n]+\]\(([^)\s]+)\)/g)].map(match => match[1]);
targets.push(...[...readme.matchAll(/^\[[^\]\n]+\]:\s*(\S+)/gm)].map(match => match[1]));
for (const target of targets) {
  if (target.startsWith('https://')) {
    const url = new URL(target);
    if (url.hostname === 'github.com')
      assert.match(url.pathname, /\/(?:blob|tree)\/[0-9a-f]{40}(?:\/|$)/, `Mutable source link: ${target}`);
  } else assert.ok(fs.existsSync(path.resolve(root, target.split('#')[0])), `Broken local link: ${target}`);
}

let checkedSourceFiles = 0;
if (process.argv[2]) {
  const checkout = path.resolve(process.argv[2]);
  const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
  assert.equal(revision, manifest.app.commit, 'App checkout is not the recorded revision');
  for (const entry of manifest.externalSourceFiles) {
    const bytes = fs.readFileSync(path.join(checkout, entry.path));
    assert.equal(bytes.length, entry.bytes, `Source size mismatch: ${entry.path}; check line endings`);
    assert.equal(sha256(bytes), entry.sha256, `Source mismatch: ${entry.path}; check modifications/line endings`);
    checkedSourceFiles++;
  }
}
console.log(JSON.stringify({ passed: true, artifactFiles: manifest.artifacts.length, artifactBytes: totalBytes, linksChecked: targets.length, sourceFilesChecked: checkedSourceFiles, nativeDrawingVerified: false }, null, 2));
