const CACHE_NAME = 'V1';
const NETWORK_TIMEOUT_MS = 5000
const STATIC_CACHE_URLS = ['/', 'styles.css', 'scripts.js', '/icons/*.png'];
self.addEventListener('install', event => {

    console.log('Service Worker installing.');
    // event.waitUntil(
    //     caches.open(CACHE_NAME)
    //     .then(cache => cache.addAll(STATIC_CACHE_URLS))  
    //   );
    event.waitUntil(self.skipWaiting());

});
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activating.');

});


self.addEventListener('fetch', event => {
  console.log(event)
  const cached = caches.match(event.request)
  const fetched = fetch(event.request, { cache: 'no-store' })
  const fetchedCopy = fetched.then(resp => resp.clone())

  const delayCacheResponse = new Promise((resolve) => {
      setTimeout(resolve, NETWORK_TIMEOUT_MS, cached);
  })

  event.respondWith(
  Promise.race([fetched.catch(_ => cached), delayCacheResponse])
      .then(resp => resp || fetched)
      .catch(_ => {
           console.log(_) /* eat any errors */
      })
  )

  // Update the cache with the version we fetched (only for ok status)
  event.waitUntil(
  Promise.all([fetchedCopy, caches.open(CACHE_NAME)])
      .then(([response, cache]) => response.ok && cache.put(event.request, response))
      .catch(_ => { /* eat any errors */ })
  )
})

  self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then( (cache) => {

                    //let urls = filterCachedURLs(event.data.payload)

                    console.log(event.data.payload);
                    return cache.addAll(event.data.payload);
                })
        );
    }
});
