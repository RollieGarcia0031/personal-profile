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
  const tempRoot = await mkdtemp(path.join(tmpdir(), 'track-info-test-'));
  const repoRoot = path.join(tempRoot, 'repo');

  await mkdir(path.join(repoRoot, 'scripts'), { recursive: true });
  await mkdir(path.join(repoRoot, 'content'), { recursive: true });
  await mkdir(path.join(repoRoot, 'src'), { recursive: true });

  await cp(path.join(__dirname, 'generate-track-info.mjs'), path.join(repoRoot, 'scripts', 'generate-track-info.mjs'));

  return repoRoot;
}

async function runGenerator(repoRoot, tracks, baseUrl) {
  await writeFile(path.join(repoRoot, 'content', 'tracks.json'), JSON.stringify(tracks, null, 2));

  await execFileAsync('node', [path.join(repoRoot, 'scripts', 'generate-track-info.mjs')], {
    cwd: repoRoot,
    env: { ...process.env, BASE_URL: baseUrl }
  });

  const outputPath = path.join(repoRoot, 'src', 'track-info', tracks[0].id, 'index.html');
  return readFile(outputPath, 'utf8');
}

describe('scripts/generate-track-info.mjs', () => {
  it('normalizes base URL and applies withBaseUrl for root and subpath', async () => {
    const track = {
      id: 'sample-track',
      title: 'Sample',
      description: 'Sample desc',
      genre: 'Pop',
      audioSrc: 'audio/song.mp3',
      imgSrc: '/images/cover',
      date: '2026-01-01',
      bpm: 120,
      duration: '03:12',
      instruments: ['Guitar']
    };

    const rootRepo = await setupTempRepo();
    const rootHtml = await runGenerator(rootRepo, [track], '/');
    expect(rootHtml).toContain('href="/tracks/"');
    expect(rootHtml).toContain('audio src="/audio/song.mp3"');
    expect(rootHtml).toContain('img src="/jpg/images/cover.jpg"');

    const subpathRepo = await setupTempRepo();
    const subpathHtml = await runGenerator(subpathRepo, [track], '/personal-profile');
    expect(subpathHtml).toContain('href="/personal-profile/tracks/"');
    expect(subpathHtml).toContain('audio src="/personal-profile/audio/song.mp3"');
    expect(subpathHtml).toContain('img src="/personal-profile/jpg/images/cover.jpg"');
  });

  it('escapes HTML and includes expected sections for a representative track', async () => {
    const repoRoot = await setupTempRepo();
    const html = await runGenerator(repoRoot, [{
      id: 'escaped',
      title: 'Rock <Song> & "Tune"',
      description: "Desc with <b>tag</b> & quote 'single'",
      genre: 'Alt',
      audioSrc: '/audio/escaped.mp3',
      imgSrc: '/images/escaped.jpg',
      date: '2025-12-31',
      bpm: 98,
      duration: '02:45',
      instruments: ['Synth', 'Drums'],
      writer: 'A <Writer> & Co',
      story: 'Story with <script>alert(1)</script> & more'
    }], '/');

    expect(html).toContain('Rock &lt;Song&gt; &amp; &quot;Tune&quot;');
    expect(html).toContain('Desc with &lt;b&gt;tag&lt;/b&gt; &amp; quote &#39;single&#39;');
    expect(html).toContain('A &lt;Writer&gt; &amp; Co');
    expect(html).toContain('Story with &lt;script&gt;alert(1)&lt;/script&gt; &amp; more');

    expect(html).toContain('About This Track:');
    expect(html).toContain('Instruments used:');
    expect(html).toContain('Story:');
    expect(html).toContain('bi bi-calendar-check');
    expect(html).toContain('bi bi-lightning-charge');
    expect(html).toContain('bi bi-hourglass');
    expect(html).toContain('href="/tracks/"');
  });
});
