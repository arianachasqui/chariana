const V='chariana-admin-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.add('admin.html').catch(()=>{})).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'&&u.origin===location.origin&&u.pathname.endsWith('/admin.html')){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put('admin.html',c));return r}).catch(()=>caches.match('admin.html')));
  }
});
