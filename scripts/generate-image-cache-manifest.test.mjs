import { describe, it, expect } from 'vitest';
import { mkdtemp, readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupTempRepo() {
  const tempRoot = await mkdtemp(path.join(tmpdir(), 'image-cache-test-'));
  const repoRoot = path.join(tempRoot, 'repo');

  await mkdir(path.join(repoRoot, 'scripts'), { recursive: true });
  await mkdir(path.join(repoRoot, 'content'), { recursive: true });
  await mkdir(path.join(repoRoot, 'src', 'public', 'nested'), { recursive: true });

  await cp(path.join(__dirname, 'generate-image-cache-manifest.mjs'), path.join(repoRoot, 'scripts', 'generate-image-cache-manifest.mjs'));

  return repoRoot;
}

describe('scripts/generate-image-cache-manifest.mjs', () => {
  it('filters extensions, dedupes, sorts, and only keeps valid track imgSrc values', async () => {
    const repoRoot = await setupTempRepo();

    const files = {
      'cover.JPG': 'x',
      'banner.webp': 'x',
      'readme.txt': 'x',
      'nested/art.svg': 'x',
      'nested/not-image.md': 'x',
      'nested/photo.avif': 'x'
    };

    await Promise.all(
      Object.entries(files).map(async ([relativePath, content]) => {
        const fullPath = path.join(repoRoot, 'src', 'public', relativePath);
        await mkdir(path.dirname(fullPath), { recursive: true });
        await writeFile(fullPath, content, 'utf8');
      })
    );

    await writeFile(
      path.join(repoRoot, 'content', 'tracks.json'),
      JSON.stringify([
        { imgSrc: '/images/z-last' },
        { imgSrc: 'images/a-first' },
        { imgSrc: 'images/a-first' },
        { imgSrc: 'images/not-valid.txt' },
        { imgSrc: '' },
        { imgSrc: null },
        { noImg: true }
      ], null, 2)
    );

    await execFileAsync('node', [path.join(repoRoot, 'scripts', 'generate-image-cache-manifest.mjs')], { cwd: repoRoot });

    const manifestRaw = await readFile(path.join(repoRoot, 'src', 'public', 'track-images.json'), 'utf8');
    const manifest = JSON.parse(manifestRaw);

    expect(manifest.publicImages).toEqual([
      'banner.webp',
      'cover.JPG',
      'nested/art.svg',
      'nested/photo.avif'
    ]);

    expect(manifest.trackImages).toEqual([
      'avif/images/a-first.avif',
      'avif/images/not-valid.txt.avif',
      'avif/images/z-last.avif',
      'jpg/images/a-first.jpg',
      'jpg/images/not-valid.txt.jpg',
      'jpg/images/z-last.jpg',
      'webp/images/a-first.webp',
      'webp/images/not-valid.txt.webp',
      'webp/images/z-last.webp'
    ]);
  });
});
