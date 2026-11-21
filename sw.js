const C='malino-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{
    if(r.mode==='navigate'){if(res.ok&&/\/(index\.html)?$/.test(new URL(r.url).pathname)){const c=res.clone();caches.open(C).then(k=>k.put('./',c));}} // seule l'appli sert de page hors ligne (pas l'admin ni les contributions)
    else if(res.ok&&/\/(lang-[a-z]+\.js|ar\/[0-9a-f]{8}\.mp3)$/.test(new URL(r.url).pathname)){const c=res.clone();caches.open(C).then(k=>k.put(r,c));} // dictionnaires de langue : disponibles hors ligne
    return res;
  }).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));
});
// Notifications : coffre prêt
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch(x){d={body:e.data&&e.data.text()};}
  e.waitUntil(self.registration.showNotification(d.title||'Malino',{body:d.body||'',icon:d.icon||'icon-192.png',badge:'badge-96.png',tag:d.tag||'malino',renotify:true,data:{url:d.url||'./'}}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{const c=l.find(x=>'focus' in x);if(!c)return self.clients.openWindow(url);
    if(url!=='./'&&url!=='/'&&'navigate' in c)return c.navigate(url).then(w=>(w||c).focus()).catch(()=>c.focus());return c.focus();}));}); // une alerte admin ouvre directement la bonne page
