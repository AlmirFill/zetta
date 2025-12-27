const CACHE_NAME = 'zetta-bovino-v1';
const urlsToCache = [
  '/',
  '/login.html',
  '/home.html',
  '/cadastro-fazenda.html',
  '/web.bovino-1.html',
  '/liga.desliga.html',
  '/manifest.json'
];

// Instala o service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cache antigo removido:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Network First com fallback para cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Para requisições de API (servidor)
  if (request.url.includes('/api') || request.url.includes('localhost:3000')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || new Response('Offline - Dados não disponíveis', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
        })
    );
    return;
  }

  // Para recursos estáticos (cache first)
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      });
    }).catch(() => {
      return new Response('Página não encontrada', {
        status: 404,
        statusText: 'Not Found'
      });
    })
  );
});

// Background Sync para requisições pendentes (quando voltar online)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-requests') {
    event.waitUntil(syncPendingRequests());
  }
});

async function syncPendingRequests() {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      await fetch(request);
    } catch (error) {
      console.log('Falha ao sincronizar:', request.url);
    }
  }
}
