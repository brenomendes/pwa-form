const CACHE_NAME = 'Financiamento';
const RESOURCES_TO_PRELOAD = [
	'/',
	"./fonts",
	"./fonts/roboto",
	"./fonts/roboto/Roboto-Bold.woff",
	"./fonts/roboto/Roboto-Bold.woff2",
	"./fonts/roboto/Roboto-Light.woff",
	"./fonts/roboto/Roboto-Light.woff2",
	"./fonts/roboto/Roboto-Medium.woff",
	"./fonts/roboto/Roboto-Medium.woff2",
	"./fonts/roboto/Roboto-Regular.woff",
	"./fonts/roboto/Roboto-Regular.woff2",
	"./fonts/roboto/Roboto-Thin.woff",
	"./fonts/roboto/Roboto-Thin.woff2",
	"./images",
	"./images/icons",
	"./images/icons/icon-128x128.png",
	"./images/icons/icon-144x144.png",
	"./images/icons/icon-152x152.png",
	"./images/icons/icon-192x192.png",
	"./images/icons/icon-256x256.png",
	"./index.html",
	"./manifest.json",
	"./scripts",
	"./scripts/app.js",
	"./scripts/jquery-3.3.1.js",
	"./scripts/materialize.js",
	"./service-worker.js",
	"./styles",
	"./styles/materialize.css",
	"./styles/style.css"
];
// Preload some resources during install
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(RESOURCES_TO_PRELOAD);
			// if any item isn't successfully added to
			// cache, the whole operation fails.
		}).catch(function (error) {
			console.error(error);
		})
	);
});

// Delete obsolete caches during activate
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

// During runtime, get files from cache or -> fetch, then save to cache
self.addEventListener('fetch', function (event) {
	// only process GET requests
	if (event.request.method === 'GET') {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				if (response) {
					return response; // There is a cached version of the resource already
				}

				let requestCopy = event.request.clone();
				return fetch(requestCopy).then(function (response) {
					// opaque responses cannot be examined, they will just error
					if (response.type === 'opaque') {
						// don't cache opaque response, you cannot validate it's status/success
						return response;
						// response.ok => response.status == 2xx ? true : false;
					} else if (!response.ok) {
						console.error(response.statusText);
					} else {
						return caches.open(CACHE_NAME).then(function (cache) {
							cache.put(event.request, response.clone());
							return response;
							// if the response fails to cache, catch the error
						}).catch(function (error) {
							console.error(error);
							return error;
						});
					}
				}).catch(function (error) {
					// fetch will fail if server cannot be reached,
					// this means that either the client or server is offline
					console.error(error);
					return caches.match('offline-404.html');
				});
			})
		);
	}
});
