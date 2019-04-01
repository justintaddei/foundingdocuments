var ASSETS = [
  "/constitution/",
  "/constitution/es6/index.js",
  "/constitution/js/index.js",
  "/constitution/webcomponents-loader.js",
  "/constitution/bundles/webcomponents-ce.js",
  "/constitution/bundles/webcomponents-sd-ce-pf.js",
  "/constitution/bundles/webcomponents-sd-ce.js",
  "/constitution/bundles/webcomponents-sd.js",
  "/constitution/js/polyfills.js",
  "/constitution/css/index.css",
  "/constitution/imgs/seal.svg"
];

var VERSION = "1.0.0";
var CACHE = "usc-static-v" + VERSION;

self.addEventListener("install", function(event) {
  self.skipWaiting();
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  if (event.request.method === "POST") return;

  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      console.log(response);

      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response
      var fetchRequest = event.request.clone();

      console.log(fetchRequest);

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have 2 stream.
        var responseToCache = response.clone();

        caches.open(CACHE).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
