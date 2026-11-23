const C='malino-v2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  // La page est toujours revérifiée auprès du serveur : une nouvelle version s'affiche dès sa publication (comme NexBim).
  const req=r.mode==='navigate'?fetch(r.url,{cache:'no-cache',credentials:'same-origin'}):fetch(r);
  e.respondWith(req.then(res=>{
    if(r.mode==='navigate'){if(res.ok&&/\/(index\.html)?$/.test(new URL(r.url).pathname)){const c=res.clone();caches.open(C).then(k=>k.put('./',c));}} // seule l'appli sert de page hors ligne (pas l'admin ni les contributions)
    else if(res.ok&&/\/(lang-[a-z]+\.js|ar\/[0-9a-f]{8}\.mp3)$/.test(new URL(r.url).pathname)){const c=res.clone();caches.open(C).then(k=>k.put(r,c));} // dictionnaires de langue : disponibles hors ligne
    return res;
  }).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('./'):Response.error()))));
  // Hors ligne, seule la navigation retombe sur la page en cache : la vérification des mises à jour ne doit pas lire l'ancienne page et conclure « à jour ».
});
// Notifications : pour l'enfant (Entre amis, coffres) ou pour les parents (alertes admin et autres).
// Le téléphone choisit lui-même le son d'une notification web : on change donc la vibration, l'icône et le libellé,
// et si Malino est ouvert à l'écran, c'est l'appli qui joue un son différent (notification alors muette).
// Alertes admin : son choisi par type, joué par l'admin si elle est ouverte à l'écran.
const POUR=d=>d.pour||(/^adm-/.test(d.tag||'')?'admin':/^(amis-|coffre-)/.test(d.tag||'')?'enfant':'parent');
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch(x){d={body:e.data&&e.data.text()};}
  const son=typeof d.son==='string'?d.son:'',pour=POUR(d);
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    const vis=l.filter(c=>c.visibilityState==='visible');
    const adm=vis.filter(c=>/\/admin\.html/.test(c.url)),app=vis.filter(c=>!/\/admin\.html/.test(c.url));
    if(pour==='admin'&&son&&son!=='silence')adm.forEach(c=>c.postMessage({malinoSon:son}));
    if(pour!=='admin')app.forEach(c=>c.postMessage({malinoNotif:pour,titre:d.title||''}));
    const muet=pour==='admin'?(son==='silence'||(!!son&&adm.length>0)):app.length>0;
    const vib=pour==='enfant'?[70,50,70,50,70,50,240]:[400,120,400];
    return self.registration.showNotification(d.title||'Malino',{body:d.body||'',icon:d.icon||'icon-192.png',badge:'badge-chouette.png',
      tag:d.tag||'malino',renotify:true,silent:muet,vibrate:muet?undefined:vib,data:{url:d.url||'./',pour}});}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{const c=l.find(x=>'focus' in x);if(!c)return self.clients.openWindow(url);
    if(url!=='./'&&url!=='/'&&'navigate' in c)return c.navigate(url).then(w=>(w||c).focus()).catch(()=>c.focus());return c.focus();}));}); // une alerte admin ouvre directement la bonne page
