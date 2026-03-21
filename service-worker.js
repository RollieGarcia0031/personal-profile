const IMAGE_CACHE_NAME = 'image-cache-v1';
const baseUrl = getServiceWorkerBaseUrl();
const MANIFEST_URL = new URL('track-images.json', baseUrl).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(preCachePublicAndTrackImages());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanOldCaches());
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (!isImageRequest(event.request, requestUrl)) {
    return;
  }

  event.respondWith(cacheFirstImageStrategy(event.request));
});

async function preCachePublicAndTrackImages() {
  const cache = await caches.open(IMAGE_CACHE_NAME);

  try {
    const response = await fetch(MANIFEST_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Unable to load ${MANIFEST_URL}: ${response.status}`);
    }

    const manifest = await response.json();
    const imagePaths = [
      ...(manifest?.publicImages || []),
      ...(manifest?.trackImages || [])
    ];

    const uniqueImageUrls = [...new Set(imagePaths.map(resolveScopedUrl))];

    await Promise.all(uniqueImageUrls.map((imageUrl) => cache.add(imageUrl)));
  } catch (error) {
    console.error('[service-worker] image pre-cache failed', error);
  }
}

async function cleanOldCaches() {
  const cacheKeys = await caches.keys();
  const staleCacheKeys = cacheKeys.filter((cacheKey) => cacheKey !== IMAGE_CACHE_NAME);

  await Promise.all(staleCacheKeys.map((cacheKey) => caches.delete(cacheKey)));
}

async function cacheFirstImageStrategy(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);

  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

function isImageRequest(request, requestUrl) {
  if (request.destination === 'image') {
    return true;
  }

  return /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(requestUrl.pathname);
}

function getServiceWorkerBaseUrl() {
  const scope = self.registration?.scope || self.location.href;
  return new URL(scope.endsWith('/') ? scope : `${scope}/`);
}

function resolveScopedUrl(path) {
  return new URL(path.replace(/^\/+/, ''), baseUrl).toString();
}
