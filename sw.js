const C='malino-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{
    if(r.mode==='navigate'){const c=res.clone();caches.open(C).then(k=>k.put('./',c));}
    return res;
  }).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));
});
