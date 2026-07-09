// Service Worker for TVK PWA Installability
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // A standard fetch event is required for PWA installation requirements in Chrome
    event.respondWith(
        fetch(event.request).catch(() => {
            // Fallback for offline if necessary, or just fail gracefully
            return caches.match(event.request);
        })
    );
});
