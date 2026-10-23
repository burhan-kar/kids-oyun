// Çevrimdışı önbellek: ilk açılışta tüm dosyaları cihaza kaydeder,
// sonra internet olmasa da uygulama açılır.
const SURUM = 'mete-v2';
const DOSYALAR = [
  './', './index.html', './app.js', './data.js', './manifest.json',
  './icon-180.png', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(anahtarlar => Promise.all(anahtarlar.filter(k => k !== SURUM).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Önce önbellekten ver; yoksa internetten al ve önbelleğe ekle.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(kayitli => {
      if (kayitli) return kayitli;
      return fetch(e.request).then(cevap => {
        const kopya = cevap.clone();
        caches.open(SURUM).then(c => c.put(e.request, kopya));
        return cevap;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
