const CACHE = "connect-dawn-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/princeton-logo.png",
  "/headshot.png",
  "/dawn-miller.vcf",
  "/icons/pwa-192.png",
  "/icons/pwa-512.png",
  "/icons/pwa-512-maskable.png",
  "/icons/apple-touch-icon-180.png",
  "/icons/favicon-32.png",
  "/icons/favicon-192.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

// Network-first for HTML/navigation so updates land immediately;
// cache-first for static assets.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  const isHTML =
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/";

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request).then((c) => c || caches.match("/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
