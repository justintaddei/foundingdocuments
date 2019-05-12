const ASSETS = [
  "/foundingdocuments",
  "/foundingdocuments/index.html",
  "/foundingdocuments/",
  "/foundingdocuments/404.html",
  "/foundingdocuments/es6/index.js",
  "/foundingdocuments/js/index.js",
  "/foundingdocuments/webcomponents-loader.js",
  "/foundingdocuments/bundles/webcomponents-ce.js",
  "/foundingdocuments/bundles/webcomponents-sd-ce-pf.js",
  "/foundingdocuments/bundles/webcomponents-sd-ce.js",
  "/foundingdocuments/bundles/webcomponents-sd.js",
  "/foundingdocuments/js/polyfills.js",
  "/foundingdocuments/css/index.css",
  "/foundingdocuments/imgs/seal.svg",
  "/foundingdocuments/imgs/gadsden.svg",
  "/foundingdocuments/imgs/us_flag.svg",
  "/foundingdocuments/imgs/first-flag.svg",
  "/foundingdocuments/imgs/logo.png",
  "/foundingdocuments/imgs/symbols/1.svg",
  "/foundingdocuments/imgs/symbols/2.svg",
  "/foundingdocuments/imgs/symbols/3.svg",
  "/foundingdocuments/imgs/symbols/4.svg",
  "/foundingdocuments/imgs/symbols/5.svg",
  "/foundingdocuments/imgs/symbols/6.svg",
  "/foundingdocuments/imgs/symbols/7.svg",
  "/foundingdocuments/imgs/symbols/8.svg",
  "/foundingdocuments/imgs/symbols/9.svg",
  "/foundingdocuments/imgs/symbols/10.svg",
  "/foundingdocuments/imgs/symbols/11.svg",
  "/foundingdocuments/imgs/symbols/12.svg",
  "/foundingdocuments/imgs/icons/android-chrome-512x512.png",
  "/foundingdocuments/imgs/icons/android-chrome-192x192.png",
  "/foundingdocuments/imgs/icons/site.webmanifest"
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
        return caches.match("/foundingdocuments/index.html");
      }
    })()
  );
});
