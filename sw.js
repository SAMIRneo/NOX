/* NOX — Service Worker (network-first pour la page, cache pour les assets) */
const CACHE = 'nox-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
const ICONS = ['./icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(ICONS.map(u => c.add(u)));
    await c.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('nox-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Navigation : réseau d'abord pour toujours voir la dernière version */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put('./index.html', res.clone()));
        return res;
      }).catch(async () => (await caches.match('./index.html')) || (await caches.match('./')))
    );
    return;
  }

  /* Assets : cache d'abord */
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => new Response('', { status: 504 })))
  );
});
