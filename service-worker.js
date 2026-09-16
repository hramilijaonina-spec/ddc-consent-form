/* DDC Consent — offline service worker (cache-first app shell) */
var CACHE = "ddc-consent-v12";
var ASSETS = [
  "./", "index.html", "manifest.webmanifest",
  "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-512-maskable.png"
];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var req = e.request;
  // Network-first for the page itself: online -> always the latest app;
  // offline -> the last cached copy. This avoids serving a stale page.
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ try{ c.put("index.html", copy); }catch(_){} });
        return resp;
      }).catch(function(){
        return caches.match("index.html").then(function(r){ return r || caches.match("./"); });
      })
    );
    return;
  }
  // Cache-first for other assets (icons, manifest).
  e.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;
      return fetch(req).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ try{ c.put(req, copy); }catch(_){} });
        return resp;
      }).catch(function(){ return Response.error(); });
    })
  );
});
