import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const tracksPath = path.join(repoRoot, 'content', 'tracks.json');
const outputRoot = path.join(repoRoot, 'src', 'track-info');

/**
 * @param {string} value
 */
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * @param {{id: string, title: string, description: string, genre: string, audioSrc: string}} track
 */
function renderPage(track) {
  const title = escapeHtml(track.title);
  const description = escapeHtml(track.description || '');
  const genre = escapeHtml(track.genre || 'Unknown');
  const audioSrc = escapeHtml(track.audioSrc);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Track Info</title>
  <link rel="stylesheet" href="../../styles/global.css">
  <style>
    body { padding: 2rem; max-width: 768px; margin: auto; }
    .card { margin-top: 1rem; }
    audio { width: 100%; margin-top: 1rem; }
  </style>
</head>
<body>
  <a href="/tracks/">← Back to tracks</a>
  <article class="card">
    <h1>${title}</h1>
    <p><strong>Genre:</strong> ${genre}</p>
    <p>${description}</p>
    <audio controls>
      <source src="${audioSrc}" type="audio/mpeg">
    </audio>
  </article>
</body>
</html>`;
}

async function main() {
  const raw = await readFile(tracksPath, 'utf8');
  const tracks = JSON.parse(raw);

  if (!Array.isArray(tracks)) {
    throw new Error('content/tracks.json must be an array');
  }

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  for (const track of tracks) {
    if (!track?.id || !track?.title || !track?.audioSrc) {
      throw new Error(`Invalid track: ${JSON.stringify(track)}`);
    }

    const trackDir = path.join(outputRoot, track.id);
    const trackFile = path.join(trackDir, 'index.html');

    await mkdir(trackDir, { recursive: true });
    await writeFile(trackFile, renderPage(track), 'utf8');
  }

  console.log(`Generated ${tracks.length} track-info page(s) in src/track-info/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
