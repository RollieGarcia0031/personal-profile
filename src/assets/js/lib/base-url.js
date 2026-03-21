const BASE_URL = normalizeBaseUrl(import.meta.env.BASE_URL);

export function getBaseUrl() {
  return BASE_URL;
}

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
