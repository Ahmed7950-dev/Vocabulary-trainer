/* ============================================================
   New Language Challenges — Service Worker
   Caches all app assets for full offline use.
   Version bump the CACHE_NAME to force refresh on update.
============================================================ */

const CACHE_NAME = 'nlc-v1';

// Everything the app needs to work offline
const ASSETS = [
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-167.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-512.png',
  // External resources — cached on first load
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Mono:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

/* ── Install: pre-cache local assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets (must succeed); external fonts/libs best-effort
      const local    = ASSETS.filter(u => u.startsWith('./'));
      const external = ASSETS.filter(u => !u.startsWith('./'));
      return cache.addAll(local).then(() =>
        Promise.allSettled(external.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => cache.put(url, res))
            .catch(() => {}) // OK if offline at install time
        ))
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: delete old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first with network fallback ── */
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful responses for future offline use
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // If completely offline and not cached, return the app shell
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
