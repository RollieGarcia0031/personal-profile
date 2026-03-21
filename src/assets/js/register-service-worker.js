import { withBaseUrl } from './lib/base-url.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(withBaseUrl('service-worker.js'));
    } catch (error) {
      console.error('[service-worker] registration failed', error);
    }
  });
}
