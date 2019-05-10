const ASSETS = [
  "/constitution",
  "/constitution/index.html",
  "/constitution/",
  "/constitution/404.html",
  "/constitution/es6/index.js",
  "/constitution/js/index.js",
  "/constitution/webcomponents-loader.js",
  "/constitution/bundles/webcomponents-ce.js",
  "/constitution/bundles/webcomponents-sd-ce-pf.js",
  "/constitution/bundles/webcomponents-sd-ce.js",
  "/constitution/bundles/webcomponents-sd.js",
  "/constitution/js/polyfills.js",
  "/constitution/css/index.css",
  "/constitution/imgs/seal.svg",
  "/constitution/imgs/gadsden.svg",
  "/constitution/imgs/us_flag.svg",
  "/constitution/imgs/first-flag.svg",
  "/constitution/imgs/logo.png",
  "/constitution/imgs/symbols/1.svg",
  "/constitution/imgs/symbols/2.svg",
  "/constitution/imgs/symbols/3.svg",
  "/constitution/imgs/symbols/4.svg",
  "/constitution/imgs/symbols/5.svg",
  "/constitution/imgs/symbols/6.svg",
  "/constitution/imgs/symbols/7.svg",
  "/constitution/imgs/symbols/8.svg",
  "/constitution/imgs/symbols/9.svg",
  "/constitution/imgs/symbols/10.svg",
  "/constitution/imgs/symbols/11.svg",
  "/constitution/imgs/symbols/12.svg",
  "/constitution/imgs/icons/android-chrome-512x512.png",
  "/constitution/imgs/icons/android-chrome-192x192.png",
  "/constitution/imgs/icons/site.webmanifest"
];

const VERSION = "{%VERSION%}";
const CACHE = "founding-documents-v" + VERSION + "_beta";

self.addEventListener("install", event => {
  event.waitUntil(
    (async function() {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
    })()
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async function() {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName !== CACHE;
          })
          .map(cacheName => caches.delete(cacheName))
      );
    })()
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    (async function() {
      const cache = await caches.open(CACHE);
      const cachedResponse = await cache.match(event.request);
      const networkResponsePromise = fetch(event.request);

      event.waitUntil(
        (async function() {
          const networkResponse = await networkResponsePromise;
          await cache.put(event.request, networkResponse.clone());
        })()
      );

      if (cachedResponse) return cachedResponse;

      try {
        // Fall back to network
        return await networkResponsePromise;
      } catch (err) {
        return caches.match("/constitution/index.html");
      }
    })()
  );
});
