const ASSETS = [
  "{%ROOT%}",
  "{%ROOT%}/index.html",
  "{%ROOT%}/",
  "{%ROOT%}/404.html",
  "{%ROOT%}/es6/index.js",
  "{%ROOT%}/js/index.js",
  "{%ROOT%}/webcomponents-loader.js",
  "{%ROOT%}/bundles/webcomponents-ce.js",
  "{%ROOT%}/bundles/webcomponents-sd-ce-pf.js",
  "{%ROOT%}/bundles/webcomponents-sd-ce.js",
  "{%ROOT%}/bundles/webcomponents-sd.js",
  "{%ROOT%}/js/polyfills.js",
  "{%ROOT%}/css/index.css",
  "{%ROOT%}/imgs/seal.svg",
  "{%ROOT%}/imgs/gadsden.svg",
  "{%ROOT%}/imgs/us_flag.svg",
  "{%ROOT%}/imgs/first-flag.svg",
  "{%ROOT%}/imgs/logo.png",
  "{%ROOT%}/imgs/symbols/1.svg",
  "{%ROOT%}/imgs/symbols/2.svg",
  "{%ROOT%}/imgs/symbols/3.svg",
  "{%ROOT%}/imgs/symbols/4.svg",
  "{%ROOT%}/imgs/symbols/5.svg",
  "{%ROOT%}/imgs/symbols/6.svg",
  "{%ROOT%}/imgs/symbols/7.svg",
  "{%ROOT%}/imgs/symbols/8.svg",
  "{%ROOT%}/imgs/symbols/9.svg",
  "{%ROOT%}/imgs/symbols/10.svg",
  "{%ROOT%}/imgs/symbols/11.svg",
  "{%ROOT%}/imgs/symbols/12.svg",
  "{%ROOT%}/imgs/icons/android-chrome-512x512.png",
  "{%ROOT%}/imgs/icons/android-chrome-192x192.png",
  "{%ROOT%}/imgs/icons/site.webmanifest"
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
        return caches.match("{%ROOT%}/index.html");
      }
    })()
  );
});
