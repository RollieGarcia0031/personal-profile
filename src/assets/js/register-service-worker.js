if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
    } catch (error) {
      console.error('[service-worker] registration failed', error);
    }
  });
}
