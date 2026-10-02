// Service Worker de LigaPro Evolution • ANFA Arauco
const CACHE_NAME = 'ligapro-cache-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './css/print.css',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Manejo de clics en la notificación enviada al celular o PC
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si ya hay una pestaña abierta, enfocarla
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Si no hay pestañas abiertas, abrir la app
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});

// Evento push de servidor para producción
self.addEventListener('push', (event) => {
  let data = { title: '⚽ LigaPro Evolution', body: '¡Hay novedades en el campeonato de Arauco!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: './icons/icon-192.svg',
    badge: './icons/icon-192.svg',
    vibrate: [200, 100, 200, 100, 400],
    data: data,
    tag: 'ligapro-goal-alert'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
