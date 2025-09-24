self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('dojo-chronos').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/assets/hit.mp3',
          '/assets/pause.mp3',
          '/assets/end.mp3',
          '/assets/firma.png',
          '/assets/icon-192.png',
          '/assets/icon-512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(response => response || fetch(e.request))
    );
  });