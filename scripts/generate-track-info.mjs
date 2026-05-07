import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const tracksPath = path.join(repoRoot, 'content', 'tracks.json');
const outputRoot = path.join(repoRoot, 'src', 'track-info');
const baseUrl = normalizeBaseUrl(process.env.BASE_URL);

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
 * @param {string | undefined} value
 */
function normalizeBaseUrl(value = '/') {
  if (!value || value === '/') {
    return '/';
  }

  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

/**
 * @param {string} assetPath
 */
function withBaseUrl(assetPath) {
  const normalizedPath = assetPath.replace(/^\/+/, '');

  if (baseUrl === '/') {
    return `/${normalizedPath}`;
  }

  return `${baseUrl}${normalizedPath}`;
}

/**
 * @param {{
 *    id: string,
 *    title: string,
 *    description: string,
 *    genre: string,
 *    audioSrc: string,
 *    imgSrc: string,
 *    date: string,
 *    bpm: number,
 *    duration: string,
 *    instruments: string[]
 * }} track
 */
function renderPage(track) {
  const title = escapeHtml(track.title);
  const description = escapeHtml(track.description || '');
  const genre = escapeHtml(track.genre || 'Unknown');
  const audioSrc = escapeHtml(withBaseUrl(track.audioSrc));
  const baseImg = (track.imgSrc || '').replace(/^\/+/, '');
  const imgSrc = escapeHtml(withBaseUrl(baseImg));
  const date = escapeHtml(track.date || '');
  const bpm = track.bpm || undefined;
  const duration = escapeHtml(track.duration || '');
  const instruments = track.instruments;
  const writer = escapeHtml(track.writer || '');
  const story = escapeHtml(track.story || '');
  const backLink = escapeHtml(withBaseUrl('tracks/'));

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="stylesheet" href="../../assets/styles/track-info.css">
  <link rel="stylesheet" href="../../assets/font/bootstrap-icons.css">
  <script type="module" src="../../partials/header.js" defer></script>
  <script type="module" src="../../assets/js/track-info.js" defer></script>
</head>
<body>
  <!-- @site-header -->

  <div class="back-link">
    <a href="${backLink}">
      <i class="bi bi-arrow-left-circle"></i> Back
    </a>
  </div>


  <main class="content-container">
    <div class="preview-container">
      <picture>
        <source srcset="${escapeHtml(withBaseUrl(`avif/${baseImg}.avif`))}" type="image/avif">
        <source srcset="${escapeHtml(withBaseUrl(`webp/${baseImg}.webp`))}" type="image/webp">
        <img src="${escapeHtml(withBaseUrl(`jpg/${baseImg}.jpg`))}"/>
      </picture>
  
      <div class="preview-control-container">
        <audio src="${audioSrc}"></audio>
        <button class="play-preview-btn">
          Play Preview
        </button>

        <input type="range" name="time-slider" value="0">
        <div class="duration-container">
          <p>00:00</p>
          <p>${duration}</p>
        </div>
  
        <div class="audio-controls-container">
          <button id="back-btn">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button id="play-btn">
            <i class="bi bi-play-fill"></i>
          </button>
          <button id="forward-btn">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
        </div>
      </div>
    </div>
  
    <div class="info-container">
      <div class="genre">
        ${genre}
      </div>

      <p class="title">
        ${title}
      </p>

      <p class="writer">
        ${writer}
      </p>

      <div class="meta-data-container">
        <div class="card">
          <p>
            <i class="bi bi-calendar-check"></i> Release
          </p>
          <p>
            ${date}
          </p>
        </div>
        <div class="card">
          <p>
            <i class="bi bi-lightning-charge"></i> Bpm
          </p>
          <p>
            ${bpm}
          </p>
        </div>
        <div class="card">
          <p>
            <i class="bi bi-hourglass"></i> Duration
          </p>
          <p>
            ${duration}
          </p>
        </div>
      </div>

      <section class="track-info-card">
        <p>
          About This Track:
        </p>
        <p>
          ${description}
        </p>
      </section>

      <section class="track-info-card instrument">
        <p>
          Instruments used:
        </p>

        <div class="instrument-holder">
          ${instruments.map((instrument) => `<p>${instrument}</p>`).join(' ')}
        </div>
      </section>

      <section class="track-info-card">
        <p>
          Story:
        </p>

        <p>
          ${story}
        </p>
      </section>
    </div>
  </main>

  <!-- @site-footer -->
</body>
</html>
  `;
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

  console.log(`Generated ${tracks.length} track-info page(s) in src/track-info/ using base ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
