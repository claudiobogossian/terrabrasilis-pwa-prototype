const CACHE_NAME = 'V1';
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
    // Cache-First Strategy
    event.respondWith(
      caches.match(event.request) // check if the request has already been cached
      .then(cached => cached || fetch(event.request)) // otherwise request network
    );
  });

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

// function filterCachedURLs(urls)
// {
//     let outURLs = []
//     urls.forEach(url => {
//         if(url.indexOf('localhost')!=-1)
//         {
//             outURLs.push(url);
//         }
//     });

//     return outURLs;

// }