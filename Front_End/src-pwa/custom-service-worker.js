/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

var cacheName = 'staticFiles'
var cacheFiles = [
    '/',
    './index.html',
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(cacheFiles))
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
})
