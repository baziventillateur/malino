/*! Mascotte Malino — la chouette du logo, animée (SVG + Web Animations API).
 *  Aucune dépendance, ~6 Ko. Usage :
 *    Mascotte.show('bravo')                        // bonne réponse
 *    Mascotte.show('serie', {text:'5 d’affilée !'}) // série
 *    Mascotte.show('fete',  {text:'Niveau gagné !', confetti:false}) // gros événement (confetti:false = ne pas lancer de confettis)
 *    Mascotte.show('encourage', {text:'Presque !'}) // erreur : encouragement, jamais punitif
 *    Mascotte.talk(1800)                           // le bec bouge pendant que la voix parle
 *  Humeurs : bravo | serie | fete | encourage | coucou
 */
(function (global) {
  'use strict';
  var P = function (c, x, y, inner) { return '<g transform="translate(' + x + ' ' + y + ')"><g class="' + c + '"><g transform="translate(' + (-x) + ' ' + (-y) + ')">' + inner + '</g></g></g>'; };

  var DEFS = '<defs>' +
    '<radialGradient id="mq-body" cx=".35" cy=".25" r=".85"><stop offset="0" stop-color="#FFE17A"/><stop offset=".5" stop-color="#FFA927"/><stop offset="1" stop-color="#EC6C12"/></radialGradient>' +
    '<linearGradient id="mq-wing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF9B1F"/><stop offset="1" stop-color="#D9560B"/></linearGradient>' +
    '<radialGradient id="mq-belly" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#FFFBE6"/><stop offset="1" stop-color="#FFE29A"/></radialGradient>' +
    '<radialGradient id="mq-eye" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#FFF"/><stop offset="1" stop-color="#DDE3FF"/></radialGradient>' +
    '<radialGradient id="mq-pupil" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#4A3A9A"/><stop offset="1" stop-color="#1E1550"/></radialGradient>' +
    '<linearGradient id="mq-beak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC247"/><stop offset="1" stop-color="#F26A00"/></linearGradient>' +
    '<radialGradient id="mq-star" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FFF8C2"/><stop offset="1" stop-color="#FFC531"/></radialGradient>' +
    '<filter id="mq-sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#1A0E66" flood-opacity=".35"/></filter>' +
    '<filter id="mq-sh2" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#1A0E66" flood-opacity=".3"/></filter>' +
    '<filter id="mq-soft"><feGaussianBlur stdDeviation="3"/></filter><filter id="mq-blur"><feGaussianBlur stdDeviation="8"/></filter></defs>';

  function eye(cx, side) {
    return P('mq-eye' + side, cx, 238,
      '<circle cx="' + cx + '" cy="238" r="52" fill="url(#mq-eye)" filter="url(#mq-sh2)"/>' +
      '<g class="mq-pup' + side + '"><circle cx="' + (cx + 6) + '" cy="244" r="28" fill="url(#mq-pupil)"/>' +
      '<circle cx="' + (cx + 16) + '" cy="233" r="10" fill="#fff"/><circle cx="' + (cx - 3) + '" cy="256" r="5" fill="#fff" opacity=".8"/></g>');
  }

  var OWL =
    P('mq-owl', 256, 448,
      P('mq-earL', 172, 170, '<path d="M138 178C118 130 128 92 160 84 186 96 204 124 206 158Z" fill="url(#mq-wing)" filter="url(#mq-sh2)"/>') +
      P('mq-earR', 340, 170, '<path d="M374 178C394 130 384 92 352 84 326 96 308 124 306 158Z" fill="url(#mq-wing)" filter="url(#mq-sh2)"/>') +
      '<ellipse cx="256" cy="282" rx="156" ry="162" fill="url(#mq-body)" filter="url(#mq-sh)"/>' +
      '<ellipse cx="210" cy="190" rx="95" ry="52" fill="#fff" opacity=".28" filter="url(#mq-soft)" transform="rotate(-22 210 190)"/>' +
      P('mq-wingL', 140, 266, '<path d="M112 262C70 300 82 372 150 392 168 362 164 300 138 262Z" fill="url(#mq-wing)"/>') +
      P('mq-wingR', 372, 266, '<path d="M400 262C442 300 430 372 362 392 344 362 348 300 374 262Z" fill="url(#mq-wing)"/>') +
      '<ellipse cx="256" cy="344" rx="92" ry="92" fill="url(#mq-belly)"/>' +
      '<g fill="none" stroke="#F5B54A" stroke-width="7" stroke-linecap="round" opacity=".7"><path d="M222 336q16 14 32 0"/><path d="M258 336q16 14 32 0"/><path d="M204 366q16 14 32 0"/><path d="M240 372q16 14 32 0"/><path d="M276 366q16 14 32 0"/></g>' +
      '<ellipse cx="256" cy="244" rx="120" ry="82" fill="#FFF3C9" opacity=".95"/>' +
      eye(206, 'L') + eye(306, 'R') +
      '<ellipse cx="148" cy="288" rx="20" ry="12" fill="#FF6FA8" opacity=".55"/><ellipse cx="364" cy="288" rx="20" ry="12" fill="#FF6FA8" opacity=".55"/>' +
      P('mq-beak', 256, 282, '<path d="M232 280Q256 268 280 280 272 312 256 322 240 312 232 280Z" fill="url(#mq-beak)" filter="url(#mq-sh2)"/><path d="M241 285Q256 278 271 285" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round" fill="none"/>') +
      '<g fill="#F26A00"><ellipse cx="218" cy="441" rx="30" ry="14"/><ellipse cx="294" cy="441" rx="30" ry="14"/></g>' +
      P('mq-star', 256, 62,
        '<g filter="url(#mq-sh2)" transform="translate(256 62)"><path d="M0-42 12-12 44-10 19 10 28 42 0 24-28 42-19 10-44-10-12-12Z" fill="url(#mq-star)" stroke="#FFE680" stroke-width="3" stroke-linejoin="round"/><path d="M-6-24 2-8" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/></g>' +
        '<g stroke="#FFE680" stroke-width="7" stroke-linecap="round" opacity=".9"><path d="M190 52l-18-12"/><path d="M322 52l18-12"/></g>'));

  var SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 512 460" width="100%" height="100%" style="overflow:visible" aria-hidden="true">' + DEFS +
    '<ellipse class="mq-sh" cx="256" cy="448" rx="128" ry="16" fill="#150A5E" opacity=".35" filter="url(#mq-blur)"/>' + OWL + '</svg>';

  var CSS = '#mq{position:fixed;left:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);z-index:200;pointer-events:none;display:flex;align-items:flex-end;gap:6px;transform:translateY(130%);opacity:0}' +
    '#mq .mq-fig{overflow:visible;width:clamp(88px,24vw,140px);aspect-ratio:512/460;flex:none}' +
    '#mq .mq-bub{margin-bottom:34%;max-width:min(58vw,240px);background:#fff;color:#2b2160;font:700 14px/1.25 Fredoka,Nunito,system-ui,sans-serif;padding:8px 12px;border-radius:14px 14px 14px 4px;box-shadow:0 4px 14px rgba(26,14,102,.28);opacity:0;transform:scale(.8);transform-origin:0 100%}' +
    '#mq.mq-r{left:auto;right:10px;flex-direction:row-reverse}#mq.mq-r .mq-bub{border-radius:14px 14px 4px 14px;transform-origin:100% 100%}' +
    '#mq.mq-c{left:50%;margin-left:calc(clamp(88px,24vw,140px)/-2);flex-direction:column;align-items:center}#mq.mq-c .mq-bub{order:-1;margin:0 0 6px;border-radius:14px;max-width:80vw;text-align:center}';

  var el, fig, running = [], hideT, idleT, blinkT, enabled = true, lastAt = 0, busyUntil = 0, cur = {};
  var FETE = ['Bravo !', 'Génial !', 'Waouh !', 'Quel champion !', 'Super !'];
  var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function q(s) { return fig.querySelector('.mq-' + s); }
  function an(node, kf, o) { if (!node || !node.animate) return null; var a = node.animate(kf, Object.assign({ fill: 'none' }, o)); running.push(a); return a; }
  function T(t) { return { transform: t }; }
  function stopAll() { running.forEach(function (a) { try { a.cancel(); } catch (e) {} }); running = []; }

  function build() {
    if (el) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement('div'); el.id = 'mq'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="mq-fig">' + SVG + '</div><div class="mq-bub"></div>';
    document.body.appendChild(el); fig = el.firstChild;
  }

  function idle() {
    var o = q('owl'), s = q('star');
    an(o, [T('scale(1,1)'), T('scale(1.012,1.03)'), T('scale(1,1)')], { duration: 3000, iterations: Infinity, easing: 'ease-in-out' });
    an(s, [T('scale(1)'), T('scale(1.12) rotate(6deg)'), T('scale(1)')], { duration: 2400, iterations: Infinity, easing: 'ease-in-out' });
    clearInterval(blinkT);
    blinkT = setInterval(function () { blink(); }, 3200);
  }
  function blink(both) {
    ['eyeL', 'eyeR'].forEach(function (k) { an(q(k), [T('scaleY(1)'), T('scaleY(.08)'), T('scaleY(1)')], { duration: 160, easing: 'ease-in-out' }); });
  }
  function look(dx, dy, ms) { ['pupL', 'pupR'].forEach(function (k) { an(q(k), [T('translate(0,0)'), T('translate(' + dx + 'px,' + dy + 'px)'), T('translate(' + dx + 'px,' + dy + 'px)'), T('translate(0,0)')], { duration: ms, easing: 'ease-in-out' }); }); }
  function wings(l, r, o) { an(q('wingL'), [T('rotate(0)'), T('rotate(' + l + 'deg)'), T('rotate(0)')], o); an(q('wingR'), [T('rotate(0)'), T('rotate(' + r + 'deg)'), T('rotate(0)')], o); }
  function shadow(scale, ms, it) { an(q('sh'), [T('scale(1)'), T('scale(' + scale + ')'), T('scale(1)')], { duration: ms, iterations: it || 1, easing: 'ease-in-out' }); }
  function starPop(big, ms) { an(q('star'), [T('scale(1) rotate(0)'), T('scale(' + big + ') rotate(200deg)'), T('scale(1) rotate(360deg)')], { duration: ms, easing: 'cubic-bezier(.3,1.6,.5,1)' }); }

  function jump(h, ms, spin) {
    var up = 'translateY(' + (-h) + 'px)';
    an(q('owl'), spin ? [
      T('translateY(0) scale(1.1,.88) rotate(0)'), T(up + ' scale(.94,1.08) rotate(180deg)'), T(up.replace(h, h * 0.9) + ' scale(.97,1.04) rotate(360deg)'), T('translateY(0) scale(1.12,.86) rotate(360deg)'), T('translateY(0) scale(1,1) rotate(360deg)')
    ] : [
      T('translateY(0) scale(1.1,.88)'), T(up + ' scale(.94,1.08)'), T('translateY(0) scale(1.12,.86)'), T('translateY(0) scale(1,1)')
    ], { duration: ms, easing: 'cubic-bezier(.3,.7,.4,1)' });
    shadow(.55, ms);
  }

  var MOODS = {
    coucou: function () { wings(-50, 0, { duration: 500, iterations: 2, easing: 'ease-in-out' }); look(8, -4, 700); return 1100; },
    bravo: function () {
      jump(150, 800); wings(-40, 40, { duration: 800 }); starPop(1.5, 800);
      ['pupL', 'pupR'].forEach(function (k) { an(q(k), [T('scale(1)'), T('scale(1.18)'), T('scale(1)')], { duration: 800 }); });
      return 900;
    },
    serie: function () {
      jump(230, 1100, true); wings(-55, 55, { duration: 1100 }); starPop(1.9, 1100); burst(40);
      return 1300;
    },
    fete: function () {
      var o = q('owl');
      an(o, [T('translateY(0) scale(1.1,.88)'), T('translateY(-170px) scale(.94,1.08)'), T('translateY(0) scale(1.12,.86)'), T('translateY(-230px) scale(.94,1.08) rotate(0)'), T('translateY(-120px) rotate(360deg)'), T('translateY(0) scale(1.12,.86) rotate(360deg)'), T('scale(1,1) rotate(360deg)')], { duration: 2000, easing: 'ease-in-out' });
      wings(-60, 60, { duration: 220, iterations: 9 }); shadow(.55, 1000, 2); starPop(2.2, 1600);
      an(q('earL'), [T('rotate(0)'), T('rotate(-14deg)'), T('rotate(0)')], { duration: 300, iterations: 6 }); an(q('earR'), [T('rotate(0)'), T('rotate(14deg)'), T('rotate(0)')], { duration: 300, iterations: 6 });
      burst(120); setTimeout(function () { burst(80); }, 600);
      return 2300;
    },
    encourage: function () {
      an(q('owl'), [T('rotate(0)'), T('rotate(-9deg) translateY(3px)'), T('rotate(6deg)'), T('rotate(0)')], { duration: 1300, easing: 'ease-in-out' });
      wings(14, -14, { duration: 1300 });
      an(q('eyeR'), [T('scaleY(1)'), T('scaleY(1)'), T('scaleY(.08)'), T('scaleY(.08)'), T('scaleY(1)')], { duration: 1300, times: [0, .45, .55, .75, 1] });   // petit clin d'œil
      look(-6, 5, 1000);
      return 1500;
    }
  };

  // confettis : réutilise ceux de l'appli s'ils existent, sinon version autonome
  function burst(n) {
    if (cur.confetti === false) return;
    if (global.Confetti && typeof global.Confetti.burst === 'function') { try { global.Confetti.burst(n); return; } catch (e) {} }
    if (reduce) return;
    var cols = ['#FFC531', '#FF6FA8', '#38D6A0', '#6B4DF5', '#FF8A3D'], r = el.getBoundingClientRect(), x0 = r.left + r.width * .3, y0 = r.top + r.height * .3;
    for (var i = 0; i < Math.min(n, 60); i++) {
      var p = document.createElement('i'); p.style.cssText = 'position:fixed;z-index:201;pointer-events:none;width:8px;height:12px;border-radius:2px;left:' + x0 + 'px;top:' + y0 + 'px;background:' + cols[i % 5];
      document.body.appendChild(p);
      var a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 180;
      p.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d - 120 + 260) + 'px) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }], { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = (function (n) { return function () { n.remove(); }; })(p);
    }
  }

  var api = {
    /** Affiche la mascotte avec une réaction. opts: {text, pos:'left'|'right'|'center', stay:ms} */
    show: function (mood, opts) {
      opts = opts || {};
      if (!enabled || !MOODS[mood] || document.hidden) return;
      cur = opts; if (mood === 'fete' && opts.text == null) opts.text = FETE[Math.floor(Math.random() * FETE.length)];
      build(); clearTimeout(hideT); stopAll();
      el.className = opts.pos === 'right' ? 'mq-r' : opts.pos === 'center' ? 'mq-c' : '';
      var bub = el.lastChild; bub.textContent = opts.text || '';
      var vis = [{ transform: 'translateY(130%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }];
      var inA = el.animate(vis, { duration: reduce ? 150 : 320, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' }); running.push(inA);
      if (opts.text) bub.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 220, delay: 180, fill: 'forwards' });
      else bub.style.opacity = 0;
      idle();
      var dur = 300;
      if (!reduce) dur = MOODS[mood]();
      var stay = opts.stay != null ? opts.stay : (opts.text ? 1400 : 500);
      hideT = setTimeout(function () { api.hide(); }, dur + stay); busyUntil = Date.now() + dur + stay + 350;
      lastAt = Date.now();
    },
    hide: function () {
      if (!el) return; clearTimeout(hideT); clearInterval(blinkT);
      var o = el.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(130%)', opacity: 0 }], { duration: 260, easing: 'ease-in', fill: 'forwards' });
      o.onfinish = function () { stopAll(); };
    },
    /** Bec qui bouge pendant que la voix parle (ms). */
    talk: function (ms) { if (!el || reduce) return; var n = Math.max(2, Math.round((ms || 1500) / 220)); an(q('beak'), [T('scaleY(1)'), T('scaleY(1.35)'), T('scaleY(1)')], { duration: 220, iterations: n }); },
    /** Évite le spam : true si la dernière réaction date de moins de `ms`. */
    get busy() { return Date.now() < busyUntil; },
    cooldown: function (ms) { return Date.now() - lastAt < ms; },
    set enable(v) { enabled = !!v; },
    svg: function () { return SVG; }
  };
  global.Mascotte = api;
})(window);
