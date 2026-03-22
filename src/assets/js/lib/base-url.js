const BASE_URL = normalizeBaseUrl(import.meta.env.BASE_URL);

/**
 * Get the base URL of the application.
 * @returns {string} The base URL.
 */
export function getBaseUrl() {
  return BASE_URL;
}

/**
 * Resolve a path with the base URL.
 * @param {string} path - example: "track-info/1/"
 * @returns {string} example: "/final-project/track-info/1/"
 */
export function withBaseUrl(path = '') {
  if (!path) {
    return BASE_URL;
  }

  if (isExternalUrl(path) || path.startsWith('#')) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');
  const baseUrl = new URL(BASE_URL, window.location.origin);
  const resolvedUrl = new URL(normalizedPath, baseUrl);

  return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`;
}

function normalizeBaseUrl(baseUrl = '/') {
  if (!baseUrl || baseUrl === '/') {
    return '/';
  }

  return `/${baseUrl.replace(/^\/+|\/+$/g, '')}/`;
}

function isExternalUrl(path) {
  return /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:');
}
