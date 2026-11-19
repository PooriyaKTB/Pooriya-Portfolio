// Kill switch. Earlier versions of the site installed a caching service worker, and
// visitors who still have it would keep seeing old pages. Browsers re-check this file,
// pick up this version, which clears every cache, unregisters itself and reloads open tabs.
// Keep this file in place for a few months after the redesign, then it can be deleted.

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
