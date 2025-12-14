self.addEventListener('install', () => {
  // Take control as soon as installed
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Claim clients immediately
  self.clients.claim();
});

// Minimal worker: no custom caching to keep dev predictable.
// Add caching strategies here later if desired.