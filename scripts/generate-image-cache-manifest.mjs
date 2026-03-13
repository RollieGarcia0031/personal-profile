import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const publicDir = resolve(repoRoot, 'src/public');
const tracksFilePath = resolve(repoRoot, 'content/tracks.json');
const outputManifestPath = resolve(publicDir, 'track-images.json');

const IMAGE_FILE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']);

const publicImagePaths = await listImageAssets(publicDir);
const trackImages = await readTrackImagePaths(tracksFilePath);

const manifest = {
  generatedAt: new Date().toISOString(),
  imageCacheVersion: 1,
  // Every image currently available in /src/public.
  publicImages: publicImagePaths,
  // Track-cover image URLs referenced by content/tracks.json.
  trackImages
};

await writeFile(outputManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Wrote ${outputManifestPath}`);
console.log(`- publicImages: ${manifest.publicImages.length}`);
console.log(`- trackImages: ${manifest.trackImages.length}`);

async function listImageAssets(startDir) {
  const foundPaths = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = resolve(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (!isImageFile(entry.name)) {
        continue;
      }

      const pathFromPublic = relative(publicDir, absolutePath).split(sep).join('/');
      foundPaths.push(`/${pathFromPublic}`);
    }
  }

  await walk(startDir);

  return [...new Set(foundPaths)].sort();
}

async function readTrackImagePaths(pathToTracksJson) {
  const tracksJsonText = await readFile(pathToTracksJson, 'utf8');
  const tracks = JSON.parse(tracksJsonText);

  const images = tracks
    .map((track) => track?.imgSrc)
    .filter((imagePath) => typeof imagePath === 'string' && imagePath.trim().length > 0)
    .filter((imagePath) => isImageFile(imagePath));

  return [...new Set(images)].sort();
}

function isImageFile(pathOrName) {
  const lower = pathOrName.toLowerCase();
  return [...IMAGE_FILE_EXTENSIONS].some((extension) => lower.endsWith(extension));
}
