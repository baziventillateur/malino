const C='malino-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{
    if(r.mode==='navigate'){const c=res.clone();caches.open(C).then(k=>k.put('./',c));}
    else if(res.ok&&/\/lang-[a-z]+\.js$/.test(new URL(r.url).pathname)){const c=res.clone();caches.open(C).then(k=>k.put(r,c));} // dictionnaires de langue : disponibles hors ligne
    return res;
  }).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));
});
// Notifications : coffre prêt
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch(x){d={body:e.data&&e.data.text()};}
  e.waitUntil(self.registration.showNotification(d.title||'Malino',{body:d.body||'',icon:d.icon||'icon-192.png',badge:'icon-192.png',tag:d.tag||'malino',renotify:true,data:{url:d.url||'./'}}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus();}return self.clients.openWindow(url);}));});
