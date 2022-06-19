const CACHE_NAME = 'sw-cache-example';
const toCache = [
  '/images/apple-touch.png',
  '/images/splash-screen.png',

  '/scripts/popper.1.14.7.min.js',

  '/scripts/bootstrap.min.js',
  '/styles/bootstrap.min.css',

  '/scripts/jquery-3.6.0.min.js',
  '/styles/jquery-ui.min.1.12.1.css',
  '/scripts/jquery-ui.min.1.12.1.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(toCache)
    })
    .then(self.skipWaiting())
  )
})
self.addEventListener("fetch", event => {
  //console.log(`URL requested: ${event.request.url}`);
});
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//     .then(function (response) {
//       if (response) {
//         console.log('101 valid response found ');
//      //   return response; // if valid response is found in cache return it
//       } else {
//         return fetch(event.request) //fetch from internet
//           .then(function (res) {
//             return caches.open(CACHE_NAME)
//               .then(function (cache) {
//                 cache.put(event.request.url, res.clone()); //save the response for future
//                 console.log('102 fetched from internet ');
//                 return res; // return the fetched data
//               })
//           })
//           .catch(function (err) { // fallback mechanism
//             console.log('103 in error block ');
//             // return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
//             //   .then(function(cache) {
//             return cache.match('/offline.html');
//             //});
//             console.log(err);
//           });
//       }
//     })
//   );
// })

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
    .then(() => self.clients.claim())
  )
})
//other events possible   message, sync, and push