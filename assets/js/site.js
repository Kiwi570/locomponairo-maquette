/* Lo Componaïro : effets propres au projet. Le socle gère l'ouverture, le voile (serrure), l'en-tête, le menu,
   le mode calme, les boucles, les mesures et la bibliothèque d'effets posés par attributs dans les pages.
   Chaque effet propre porte data-effet="nom-du-plan" : porte-entree, axes, manifeste, facade-etages, duo, compris, etiquette-plume,
   tampons, cadran-journee, carrousel-sites, sarment, portes, couloir, journee, carte-route, route-acces, cle-envol,
   fiche-reception (et le calendrier maison de la réservation, sans mouvement au défilement). */
import { demarrer, boucle, etat, versObjet, quand, rafraichir } from './socle/index.js?v=5';

const gsap = window.gsap;
const ST = () => window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calme = () => etat.calme || document.documentElement.classList.contains('calme');
const souris = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Entrée : la vraie porte de la maison s'ouvre sur la chambre choisie (défilement, clic, glisser) ---------- */
function entree() {
  const root = $('[data-porte-entree]');
  if (!root) return;
  const sec = root.closest('section');
  const battant = $('[data-entree-battant]', root), ombre = $('.entree-ombre', root), lumiere = $('.entree-lumiere', root), chambres = $('.entree-chambres', root), portee = $('.entree-portee', root);
  const vues = $$('[data-entree-chambre]', root), choix = $$('[data-entree-choix]', root);
  const nom = $('[data-entree-nom]', root), detail = $('[data-entree-detail]', root), lien = $('[data-entree-lien]', root);
  const e = { defil: 0, main: 0, ouv: -1 };
  /* Écrit seulement quand l'ouverture change (par pas de 1/500) : transform et opacité, rien qui refasse la mise en page. */
  const peindre = () => {
    const q = Math.round(Math.min(1, Math.max(e.defil, e.main)) * 500) / 500;
    if (q === e.ouv) return;
    e.ouv = q;
    battant.style.transform = `rotateY(${(-104 * q).toFixed(2)}deg)`;
    ombre.style.opacity = (Math.min(1, q * 1.6) * 0.9).toFixed(3);
    /* La lumière de l'entrée déborde quand la porte s'entrouvre, puis s'apaise ; l'ombre du battant s'étire sur la chambre. */
    lumiere.style.opacity = (q < 0.01 ? 0 : Math.min(1, q * 4) * (1 - 0.75 * q)).toFixed(3);
    portee.style.opacity = (Math.min(1, q * 2.2) * (1 - 0.55 * q)).toFixed(3);
    portee.style.transform = `scaleX(${(0.25 + 0.75 * q).toFixed(3)})`;
    chambres.style.transform = `scale(${(1.08 - 0.08 * q).toFixed(4)})`;
    sec.classList.toggle('est-attente', q < 0.01);
  };
  const montrer = (cle) => {
    const b = choix.find((x) => x.dataset.entreeChoix === cle);
    if (!b) return;
    vues.forEach((v) => v.classList.toggle('est-visible', v.dataset.entreeChambre === cle));
    choix.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    nom.textContent = b.dataset.nom; detail.textContent = b.dataset.detail; lien.href = b.dataset.lien;
    if (calme() || !gsap) { e.main = 1; peindre(); return; }
    gsap.to(e, { main: 1, duration: 1.2, ease: 'power3.inOut', overwrite: true, onUpdate: peindre });
  };
  choix.forEach((b) => b.addEventListener('click', () => montrer(b.dataset.entreeChoix)));
  peindre();
  if (calme() || !gsap || !ST()) return;
  /* Au défilement : la porte s'ouvre pendant que l'entrée quitte l'écran. */
  const suivre = (s) => { e.defil = Math.min(1, s.progress * 1.6); peindre(); };
  ST().create({ trigger: sec, start: 'top top', end: 'bottom 30%', onUpdate: suivre, onRefresh: suivre });
  /* À la main : on attrape la porte et on la tire vers la gauche (vers la droite pour la refermer). */
  const scene = $('.entree-scene', root);
  let x0 = null, m0 = 0;
  scene.addEventListener('pointerdown', (ev) => { if (ev.button) return; x0 = ev.clientX; m0 = e.main; gsap.killTweensOf(e); });
  addEventListener('pointermove', (ev) => { if (x0 == null) return; const d = (x0 - ev.clientX) / Math.max(1, scene.clientWidth); e.main = Math.min(1, Math.max(0, m0 + d * 1.5)); peindre(); });
  const lacher = () => { if (x0 == null) return; x0 = null; gsap.to(e, { main: e.main > 0.35 ? 1 : 0, duration: 0.7, ease: 'power2.out', onUpdate: peindre }); };
  addEventListener('pointerup', lacher);
  addEventListener('pointercancel', lacher);
}

/* ---------- La façade, étage par étage : une bande de lumière suit l'étage qu'on lit ---------- */
function facade() {
  const sec = $('.facade');
  if (!sec) return;
  const vis = $('[data-facade-visuel]', sec), haut = $('[data-nuit-haut]', sec), bas = $('[data-nuit-bas]', sec), lueur = $('[data-facade-lueur]', sec);
  const etapes = $$('[data-facade-etape]', sec), reperes = $$('[data-facade-repere]', sec);
  const RATIO = 4 / 3, FONDU = 23;
  let W = 0, H = 0, dy = 0, hImg = 0, actif = null;
  const bande = { a: -0.1, b: 1.1 };
  /* La photo est en « cover » : on retrouve la hauteur rendue de l'image pour placer la bande sur le bon étage. */
  const mesurer = () => { W = vis.clientWidth; H = vis.clientHeight; if (W / Math.max(1, H) > RATIO) { hImg = W / RATIO; dy = (H - hImg) * 0.5; } else { hImg = H; dy = 0; } };
  const poser = () => {
    const ya = Math.round(dy + bande.a * hImg), yb = Math.round(dy + bande.b * hImg);
    haut.style.transform = `translate3d(0, ${ya + FONDU - H}px, 0)`;
    bas.style.transform = `translate3d(0, ${yb - FONDU}px, 0)`;
    if (lueur) { lueur.style.height = `${Math.max(0, yb - ya)}px`; lueur.style.transform = `translate3d(0, ${ya}px, 0)`; }
    reperes.forEach((r) => { const k = etapes.find((x) => x.dataset.facadeEtape === r.dataset.facadeRepere); if (k) r.style.top = `${Math.round(dy + ((+k.dataset.haut + +k.dataset.bas) / 2) * hImg)}px`; });
  };
  const activer = (el) => {
    if (!el || actif === el) return;
    actif = el;
    etapes.forEach((x) => x.classList.toggle('est-active', x === el));
    const cle = el.dataset.facadeEtape;
    reperes.forEach((r) => r.classList.toggle('est-active', r.dataset.facadeRepere === cle));
    if (lueur) lueur.classList.toggle('est-allumee', cle !== 'tout' && innerWidth >= 761);
    /* Sur téléphone, la photo n'est plus collée : la façade reste entière, chaque étage montre sa part. */
    const cible = cle === 'tout' || innerWidth < 761 ? { a: -0.1, b: 1.1 } : { a: +el.dataset.haut - 0.01, b: +el.dataset.bas + 0.01 };
    if (calme() || !gsap) { Object.assign(bande, cible); poser(); return; }
    gsap.to(bande, { ...cible, duration: 0.9, ease: 'power3.inOut', overwrite: true, onUpdate: poser });
  };
  mesurer(); poser(); activer(etapes[0]);
  /* L'étape active est celle qui croise une ligne à 62 % de l'écran : un IntersectionObserver suffit, sans
     ScrollTrigger (en mode calme, le socle coupe ScrollTrigger quand aucun effet n'en a besoin : sa boucle s'arrête). */
  const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) activer(x.target); }), { rootMargin: '-61% 0px -38% 0px' });
  etapes.forEach((el) => io.observe(el));
  addEventListener('resize', () => { mesurer(); poser(); });
  if (document.fonts) document.fonts.ready.then(() => { mesurer(); poser(); });
}

/* ---------- Suite familiale : les deux chambres voisines se rapprochent, « Isabelle + Denise » se rejoignent ---------- */
function duo() {
  const sec = $('[data-duo]');
  if (!sec || calme() || !gsap || !ST()) return;
  const g = $('[data-duo-g]', sec), d = $('[data-duo-d]', sec), mg = $('[data-duo-mot="g"]', sec), md = $('[data-duo-mot="d"]', sec), plus = $('[data-duo-plus]', sec);
  gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 92%', end: 'center 50%', scrub: 0.6 } })
    .fromTo(g, { xPercent: -16 }, { xPercent: 0, ease: 'none' }, 0)
    .fromTo(d, { xPercent: 16 }, { xPercent: 0, ease: 'none' }, 0)
    .fromTo(mg, { xPercent: -45, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0)
    .fromTo(md, { xPercent: 45, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0)
    .fromTo(plus, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.5 }, 0.5);
}

/* ---------- Typographie : Fraunces de « sage » à « sauvage » (axes SOFT et WONK, jamais la largeur) ---------- */
function axes() {
  $$('[data-axes]').forEach((el) => {
    /* Par pas de 4 sur l'axe SOFT, écrit seulement quand il change : chaque changement refait la forme du texte (fluidité). */
    let dernier = '';
    const poser = (p) => { const v = String(Math.round(p * 25) * 4) + (p > 0.55 ? '/1' : '/0'); if (v === dernier) return; dernier = v; const [soft, wonk] = v.split('/'); el.style.setProperty('--axe-soft', soft); el.style.setProperty('--axe-wonk', wonk); };
    if (calme()) { poser(1); return; }
    poser(0);
    ST().create({ trigger: el, start: 'top 92%', end: 'top 30%', onUpdate: (s) => poser(s.progress), onRefresh: (s) => poser(s.progress) });
  });
}

/* ---------- Manifeste : les mots s'allument au défilement ---------- */
function manifeste() {
  $$('[data-manifeste]').forEach((el) => {
    const mots = el.textContent.split(/(\s+)/);
    el.innerHTML = mots.map((m) => (/^\s+$/.test(m) ? m : `<span class="mot">${m.replace(/[<>&]/g, (x) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[x]))}</span>`)).join('');
    const spans = $$('.mot', el);
    const poser = (p) => { const n = Math.round(p * spans.length); spans.forEach((s, i) => s.classList.toggle('allume', i < n)); };
    if (calme()) { poser(1); return; }
    ST().create({ trigger: el, start: 'top 85%', end: 'bottom 45%', onUpdate: (s) => poser(s.progress), onRefresh: (s) => poser(s.progress) });
  });
}

/* ---------- Apparitions propres : étiquettes écrites à la plume, tampons « Inclus », cadran ---------- */
function auPassage(sel, classe, { seuil = 0.35, avant } = {}) {
  const els = $$(sel);
  if (!els.length) return;
  els.forEach((el) => avant && avant(el));
  if (calme()) { els.forEach((el) => el.classList.add(classe)); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(classe); io.unobserve(e.target); } }), { threshold: seuil });
  els.forEach((el) => io.observe(el));
}

/* ---------- Heure de Pouzols : cadran 24 h et statut de l'accueil des arrivées ---------- */
function heurePouzols() {
  const p = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const h = +p.find((x) => x.type === 'hour').value % 24, m = +p.find((x) => x.type === 'minute').value;
  return { h, m, dec: h + m / 60, texte: `${h} h ${String(m).padStart(2, '0')}` };
}
function cadrans() {
  const maj = () => {
    const t = heurePouzols();
    $$('[data-aiguille]').forEach((a) => a.setAttribute('transform', `rotate(${((t.dec / 24) * 360).toFixed(2)} 180 180)`));
    $$('[data-heure-pouzols]').forEach((s) => {
      const st = s.closest('[data-statut-arrivee]');
      if (!st) { s.textContent = s.dataset.modele ? s.dataset.modele.replace('{heure}', t.texte) : t.texte; return; }
      /* Espace insécable avant « : ; ? ! » (les attributs ne passent pas par la typographie du générateur). */
      s.textContent = (t.dec < 17 ? st.dataset.avant : t.dec < 20.5 ? st.dataset.ouvert : st.dataset.apres).replace(/ ([:;?!])/g, '\u00a0$1');
    });
  };
  maj();
  setInterval(maj, 30000);
  auPassage('[data-cadran]', 'trace', { seuil: 0.3 });
  /* L'aiguille balaie le cadran jusqu'à l'heure réelle quand il entre dans l'écran. */
  if (!calme() && gsap) $$('[data-cadran] [data-aiguille-balai]').forEach((a) => {
    gsap.fromTo(a, { rotation: -140, svgOrigin: '180 180' }, { rotation: 0, svgOrigin: '180 180', ease: 'power3.out', scrollTrigger: { trigger: a.closest('[data-cadran]'), start: 'top 85%', end: 'center 45%', scrub: 0.6 } });
  });
}

/* ---------- Carrousel 3D des sites (module carrousel-3d) : au défilement, à la main avec élan, aux flèches ---------- */
function carrousel() {
  $$('[data-carrousel]').forEach((root) => {
    const anneau = $('.carrousel-anneau', root), scene = $('.carrousel-scene', root);
    const cartes = $$('.carrousel-carte', root), n = cartes.length, pas = 360 / n;
    const e = { def: 0, main: 0, v: 0, tenu: false, cible: null };
    const visibles = () => {
      const rot = e.def + e.main;
      cartes.forEach((c, i) => {
        const a = ((((i * pas + rot) % 360) + 540) % 360) - 180;
        const cache = Math.abs(a) > 75;
        if (c.__cache !== cache) { c.__cache = cache; c.classList.toggle('est-cachee', cache); c.toggleAttribute('inert', cache); c.toggleAttribute('data-audit-ignorer', cache); }
      });
    };
    const poser = () => { anneau.style.setProperty('--rot', `${(e.def + e.main).toFixed(2)}deg`); visibles(); };
    if (calme()) return;
    poser();
    ST().create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { e.def = -s.progress * 140; poser(); }, onRefresh: (s) => { e.def = -s.progress * 140; poser(); } });
    let raf = 0, avant = 0;
    const anim = (t) => {
      const dt = Math.min(0.05, avant ? (t - avant) / 1000 : 1 / 60); avant = t;
      if (e.cible != null) { const d = e.cible - e.main; e.main += d * (1 - Math.exp(-dt * 8)); if (Math.abs(d) < 0.05) { e.main = e.cible; e.cible = null; } poser(); raf = requestAnimationFrame(anim); return; }
      if (!e.tenu && Math.abs(e.v) > 3) { e.main += e.v * dt; e.v *= Math.exp(-dt * 2.2); poser(); raf = requestAnimationFrame(anim); } else { raf = 0; avant = 0; }
    };
    const lancer = () => { if (!raf) raf = requestAnimationFrame(anim); };
    let id = null, x0 = 0, t0 = 0;
    scene.addEventListener('pointerdown', (ev) => { if (ev.button !== 0) return; id = ev.pointerId; e.tenu = true; e.v = 0; e.cible = null; x0 = ev.clientX; t0 = performance.now(); scene.setPointerCapture(id); });
    scene.addEventListener('pointermove', (ev) => { if (!e.tenu || ev.pointerId !== id) return; const t = performance.now(), d = (ev.clientX - x0) * 0.25; e.v += (d / Math.max(0.008, (t - t0) / 1000) - e.v) * 0.35; e.main += d; x0 = ev.clientX; t0 = t; poser(); });
    const lacher = (ev) => { if (!e.tenu || (ev && ev.pointerId !== id)) return; e.tenu = false; if (performance.now() - t0 > 120) e.v = 0; e.v = Math.max(-600, Math.min(600, e.v)); lancer(); };
    scene.addEventListener('pointerup', lacher); scene.addEventListener('pointercancel', lacher); scene.addEventListener('lostpointercapture', () => { e.tenu = false; });
    const tourner = (sens) => { const base = e.cible ?? e.main; e.cible = Math.round((base + sens * pas) / pas) * pas; lancer(); };
    $('[data-carrousel-prec]', root)?.addEventListener('click', () => tourner(1));
    $('[data-carrousel-suiv]', root)?.addEventListener('click', () => tourner(-1));
    root.addEventListener('keydown', (ev) => { if (ev.target !== root) return; if (ev.key === 'ArrowLeft') { ev.preventDefault(); tourner(1); } if (ev.key === 'ArrowRight') { ev.preventDefault(); tourner(-1); } });
  });
}

/* ---------- Sarment : fil conducteur de toutes les pages (module fil-conducteur), feuilles et grappe ---------- */
function sarment() {
  const root = $('[data-sarment]');
  if (!root || !gsap || !ST()) return;
  const NS = 'http://www.w3.org/2000/svg';
  const f = (n) => n.toFixed(1);
  const borne = (v, a, b) => Math.max(a, Math.min(b, v));
  const o = { regard: 0.62, marge: 0.5, cadre: '.conteneur', onde: 14, lissage: 0.5, largeurTelephone: 700 };
  const enCalme = calme();
  root.classList.add('fic');
  const el = (nom, cls, parent) => { const x = document.createElementNS(NS, nom); if (cls) x.setAttribute('class', cls); parent?.appendChild(x); return x; };
  const svg = el('svg', 'fic__svg');
  svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('data-audit-ignorer', '');
  const rail = el('path', 'fic__rail', svg), trace = el('path', 'fic__trace', svg), gF = el('g', 'fic__feuilles', svg);
  const objet = enCalme ? null : el('g', 'fic__objet', svg);
  if (objet) { const m = $('template[data-fil-objet]', root); if (m) objet.innerHTML = m.innerHTML; }
  root.prepend(svg);
  let L = 0, pas = 1, table = [], ancres = [], haut = 0, maxDefil = 0, vh = innerHeight;
  const st8 = { l: 0 };
  /* Feuille de vigne à cinq lobes (pétiole en 0, 0), sa nervure, et une vrille. */
  const feuille = 'M0 0 C 4 -3 9 -6 12 -10 C 11 -17 17 -22 22 -18 C 24 -25 33 -25 33 -17 C 40 -17 43 -9 37 -5 C 43 -1 41 8 34 7 C 34 15 25 16 23 9 C 19 13 12 11 12 5 C 8 4 4 2 0 0 Z';
  const nervure = 'M0 0 C 10 -3 20 -6 33 -11 M17 -5 C 20 -10 21 -14 22 -18 M20 -6 C 26 -2 30 2 34 7';
  const vrille = 'M0 0 C 5 4 12 4 13 -2 C 14 -7 8 -9 6 -5 C 5 -2 8 0 9 -2';
  function construire() {
    const W = root.clientWidth, H = root.clientHeight;
    if (!W || !H) return;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const rr = root.getBoundingClientRect();
    haut = rr.top + scrollY;
    vh = innerHeight;
    maxDefil = document.documentElement.scrollHeight - vh;
    const tel = innerWidth < o.largeurTelephone;
    const visible = (x) => x.getClientRects().length > 0;
    const boite = (x) => { const h = x.parentElement?.classList.contains('pin-spacer') ? x.parentElement : x; const r = h.getBoundingClientRect(); return { l: r.left - rr.left, t: r.top - rr.top, r: r.right - rr.left, b: r.bottom - rr.top, w: r.width, h: r.height }; };
    /* Gouttières : celles du cadre le plus large de la section (un en-tête centré et étroit plaçait le fil sur les textes). */
    const gouttieres = (x) => { const cs = x.matches(o.cadre) ? [x] : $$(o.cadre, x).filter(visible); let g = Infinity, d = Infinity; cs.forEach((c) => { const b = boite(c); if (b.w > 0) { g = Math.min(g, b.l); d = Math.min(d, W - b.r); } }); return isFinite(g) ? [g, d] : [16, 16]; };
    const xCote = (x, cote) => { const [g, d] = gouttieres(x); return cote === 'droite' ? W - Math.max(7, d * o.marge) : Math.max(7, g * o.marge); };
    let pts = [];
    const accroches = $$('[data-fil], [data-fil-point]', root).filter(visible);
    for (const x of accroches) {
      const b = boite(x);
      if (x.hasAttribute('data-fil-point')) {
        const [fx = 0.5, fy = 0.5] = (x.dataset.filPoint || '').trim().split(/\s+/).filter(Boolean).map(Number);
        pts.push({ x: b.l + b.w * fx, y: b.t + b.h * fy, el: x });
      } else {
        const cs = getComputedStyle(x), cx = xCote(x, x.dataset.fil || 'gauche');
        const iT = Math.min(Math.max((parseFloat(cs.paddingTop) || 0) * 0.5, 24), b.h * 0.25);
        const iB = Math.min(Math.max((parseFloat(cs.paddingBottom) || 0) * 0.5, 24), b.h * 0.25);
        pts.push({ x: cx, y: b.t + iT, el: x, debut: true }, { x: cx, y: b.b - iB, el: x, fin: true });
      }
    }
    pts.sort((a, b) => a.y - b.y);
    if (pts.length < 2) { trace.setAttribute('d', ''); rail.setAttribute('d', ''); L = 0; return; }
    let onde = o.onde;
    if (tel) { const x = Math.max(7, gouttieres(accroches.find((a) => a.hasAttribute('data-fil')) || root)[0] * 0.45); pts = pts.map((p) => ({ ...p, x })); onde = 0; }
    const segs = [];
    let d = `M${f(pts[0].x)} ${f(pts[0].y)}`, cur = { x: pts[0].x, y: pts[0].y };
    const ligne = (x, y) => { d += ` L${f(x)} ${f(y)}`; segs.push([cur.x, cur.y, cur.x, cur.y, x, y, x, y]); cur = { x, y }; };
    const courbe = (x1, y1, x2, y2, x, y) => { d += ` C${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)} ${f(x)} ${f(y)}`; segs.push([cur.x, cur.y, x1, y1, x2, y2, x, y]); cur = { x, y }; };
    let prec = pts[0];
    for (let i = 1; i < pts.length; i++) {
      const b = pts[i], dy = b.y - cur.y;
      if (Math.abs(b.x - cur.x) < 1) {
        if (onde && prec.debut && b.fin && prec.el === b.el && dy > 80) { const k = cur.x < W / 2 ? 1 : -1; courbe(cur.x + onde * k, cur.y + dy / 3, b.x - onde * k, cur.y + dy * 2 / 3, b.x, b.y); } else ligne(b.x, b.y);
      } else courbe(cur.x, cur.y + dy * 0.55, b.x, b.y - dy * 0.55, b.x, b.y);
      prec = b;
    }
    trace.setAttribute('d', d); rail.setAttribute('d', d);
    const brute = [[0, segs[0] ? segs[0][0] : pts[0].x, segs[0] ? segs[0][1] : pts[0].y]];
    let acc = 0;
    for (const [x0, y0, x1, y1, x2, y2, x3, y3] of segs) {
      const n = x0 === x1 && y0 === y1 && x2 === x3 && y2 === y3 ? 1 : 24;
      let px = x0, py = y0;
      for (let k = 1; k <= n; k++) { const t = k / n, u = 1 - t; const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3, y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3; acc += Math.hypot(x - px, y - py); px = x; py = y; brute.push([acc, x, y]); }
    }
    L = trace.getTotalLength();
    const ech = acc > 0 ? L / acc : 1;
    trace.style.strokeDasharray = `${L} ${L}`;
    pas = Math.max(4, L / 1600); table = [];
    let maxY = -Infinity, j = 0;
    for (let l = 0; ; l += pas) {
      const ll = Math.min(l, L), cible = ll / ech;
      while (j < brute.length - 2 && brute[j + 1][0] < cible) j++;
      const a = brute[j], b = brute[Math.min(j + 1, brute.length - 1)], span = b[0] - a[0] || 1, q = Math.min(1, Math.max(0, (cible - a[0]) / span));
      const x = a[1] + (b[1] - a[1]) * q, y = a[2] + (b[2] - a[2]) * q;
      maxY = Math.max(maxY, y); table.push([ll, x, y, maxY]);
      if (ll >= L) break;
    }
    /* Une feuille de vigne par section, au début de son passage. */
    gF.replaceChildren(); ancres = [];
    pts.filter((p) => p.debut || (!p.fin && !p.debut)).forEach((p, k) => {
      const l = longueur(p.y);
      const q = table[Math.min(table.length - 1, Math.round(l / pas))];
      /* La position va sur un groupe : une transformation CSS sur la feuille remplaçait l'attribut transform
         (toutes les feuilles s'empilaient dans le coin de la page, invisibles). */
      const cote = q[1] < W / 2 ? 1 : -1;
      const g = el('g', 'fic__pousse', gF);
      g.setAttribute('transform', `translate(${f(q[1])} ${f(q[2])}) scale(${cote} 1) rotate(${k % 2 ? -34 : 18})`);
      const fe = el('path', 'fic__feuille', g); fe.setAttribute('d', feuille);
      const ne = el('path', 'fic__nervure', g); ne.setAttribute('d', nervure);
      if (k % 2 === 0) { const v = el('path', 'fic__vrille', g); v.setAttribute('d', vrille); v.setAttribute('transform', 'rotate(150) translate(2 0)'); }
      ancres.push({ l, g });
    });
    gsap.killTweensOf(st8);
    st8.l = enCalme ? L : cible();
    peindre();
  }
  function longueur(y) {
    if (!table.length) return 0;
    let lo = 0, hi = table.length - 1;
    if (y >= table[hi][3]) return L;
    while (lo < hi) { const m = (lo + hi) >> 1; if (table[m][3] >= y) hi = m; else lo = m + 1; }
    return table[lo][0];
  }
  /* Hauteur de page et d'écran relevées à la construction (et à chaque rafraîchissement), position tirée du
     déclencheur : lire scrollHeight, scrollY ou innerHeight à chaque image forçait un recalcul complet du style
     pendant le défilement (fluidité). */
  function cible(y = scrollY) {
    const max = maxDefil;
    const proche = max > 0 ? borne((y - (max - vh * 0.5)) / (vh * 0.5), 0, 1) : 1;
    return longueur(y + vh * (o.regard + (1 - o.regard) * proche) - haut);
  }
  function peindre() {
    if (!L) return;
    const l = borne(st8.l, 0, L);
    trace.style.strokeDashoffset = f(L - l);
    if (objet) { const p = table[Math.min(table.length - 1, Math.round(l / pas))]; objet.setAttribute('transform', `translate(${f(p[1])} ${f(p[2])})`); objet.classList.toggle('est-visible', l > 2 && l < L - 2); }
    for (const a of ancres) a.g.classList.toggle('est-atteinte', l >= a.l - 1);
  }
  function suivre(st) {
    if (enCalme || !L) return;
    const y = st && st.end > st.start ? st.start + st.progress * (st.end - st.start) : undefined;
    gsap.to(st8, { l: cible(y), duration: o.lissage, ease: 'power3.out', overwrite: true, onUpdate: peindre });
  }
  /* Construit après l'ouverture : jamais pendant l'intro (leçon alexandra-grandry). */
  const lancer = () => {
    ST().create({ trigger: root, start: 'top bottom', end: 'bottom top', onUpdate: suivre, onRefresh: construire });
    construire();
    rafraichir();
  };
  if (etat.pret) lancer(); else quand('pret', lancer);
}


/* ---------- Les chambres : portes qui s'entrouvrent, battants qui s'ouvrent au défilement, comparatif filtrable ---------- */
function portes() {
  const ul = $('[data-portes]');
  if (ul && !calme()) {
    const battants = $$('.porte-battant', ul);
    battants.forEach((b, i) => gsap.set(b, { '--ouv': '0deg' }));
    window.__pageArrivee = (tl, a) => battants.forEach((b, i) => tl.fromTo(b, { '--ouv': '0deg' }, { '--ouv': '-38deg', duration: 1.1, ease: 'power2.out' }, a + 0.2 + i * 0.12));
    /* Au survol (ou au clavier), la porte s'ouvre en grand sur la photo de sa chambre et « Voir » apparaît ;
       le défilement ne la referme pas tant qu'elle est survolée. */
    const survol = new Set();
    const auDefil = (i, p) => -38 - p * (60 + i * 6);
    let p0 = 0;
    ST().create({ trigger: ul, start: 'top 60%', end: 'bottom top', scrub: 0.5, onUpdate: (s) => { p0 = s.progress; battants.forEach((b, i) => { if (!survol.has(b)) b.style.setProperty('--ouv', `${auDefil(i, p0)}deg`); }); } });
    $$('.porte', ul).forEach((a, i) => {
      const b = battants[i];
      if (!b) return;
      const ouvrir = () => { survol.add(b); a.classList.add('est-ouverte'); gsap.to(b, { '--ouv': '-118deg', duration: 0.75, ease: 'power3.out', overwrite: true }); };
      const fermer = () => { a.classList.remove('est-ouverte'); gsap.to(b, { '--ouv': `${auDefil(i, p0)}deg`, duration: 0.6, ease: 'power2.inOut', overwrite: true, onComplete: () => survol.delete(b) }); };
      a.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') ouvrir(); });
      a.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') fermer(); });
      a.addEventListener('focus', ouvrir);
      a.addEventListener('blur', fermer);
    });
  }
  $$('[data-chambre]').forEach((art) => {
    const b = $('[data-battant]', art);
    if (!b || calme()) return;
    gsap.fromTo(b, { '--ouv': '0deg' }, { '--ouv': '-112deg', ease: 'power1.inOut', scrollTrigger: { trigger: art, start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
  });
  const filtres = $('[data-filtres]');
  if (filtres) {
    const lignes = $$('[data-comparatif] > li'), vide = $('[data-comparatif-vide]'), compte = $('[data-comparatif-compte]');
    const garder = (li, f) => f === 'tout' || (f === 'terrasse' && li.dataset.terrasse === 'oui') || (f === 'jardin' && li.dataset.vue === 'jardin') || (f === 'jumeaux' && li.dataset.jumeaux === 'oui');
    const appliquer = (f) => {
      $$('button', filtres).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.filtre === f)));
      /* Les lignes écartées sont retirées (hidden) : une simple opacité était annulée par l'apparition en cascade. */
      let n = 0; lignes.forEach((li) => { const ok = garder(li, f); li.hidden = !ok; if (ok) n++; });
      vide.hidden = n > 0;
      if (compte) compte.textContent = n ? `${n} chambre${n > 1 ? 's' : ''}` : '';
      if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
      try { const u = new URL(location.href); if (f === 'tout') u.searchParams.delete('filtre'); else u.searchParams.set('filtre', f); history.replaceState(history.state, '', u); } catch {}
    };
    $$('button', filtres).forEach((x) => x.addEventListener('click', () => appliquer(x.dataset.filtre)));
    const depart = new URLSearchParams(location.search).get('filtre');
    if (depart) appliquer(depart);
  }
}


/* ---------- Votre séjour : la journée heure par heure (scène collante), soleil qui avance sur l'arc ---------- */
function journee() {
  const sec = $('.journee');
  if (!sec) return;
  const etapes = $$('[data-etape]', sec), soleil = $('[data-soleil]', sec), barre = $('[data-journee-progres]', sec);
  const arc = $('.journee-arc', sec);
  let L = 0; try { L = arc.getTotalLength(); } catch {}
  let actif = 0;
  const poser = (p) => {
    const i = Math.min(etapes.length - 1, Math.floor(p * etapes.length));
    if (i !== actif) { etapes[actif].classList.remove('est-active'); etapes[i].classList.add('est-active'); actif = i; }
    if (L && soleil) { const pt = arc.getPointAtLength(L * Math.min(1, Math.max(0, p))); soleil.setAttribute('cx', pt.x.toFixed(1)); soleil.setAttribute('cy', pt.y.toFixed(1)); }
    if (barre) barre.style.setProperty('--p', p.toFixed(3));
  };
  if (calme()) return;
  gsap.matchMedia().add('(min-width: 761px)', () => {
    const st = ST().create({ trigger: sec, start: 'top top', end: 'bottom bottom', onUpdate: (s) => poser(s.progress), onRefresh: (s) => poser(s.progress) });
    return () => { st.kill(); etapes.forEach((e, k) => e.classList.toggle('est-active', k === 0)); actif = 0; };
  });
  /* Téléphone : chaque étape glisse en arrivant. */
  gsap.matchMedia().add('(max-width: 760px)', () => {
    const t = etapes.map((e) => gsap.fromTo(e, { y: 40, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: e, start: 'top 92%', end: 'top 55%', scrub: 0.5 } }));
    return () => t.forEach((x) => { x.scrollTrigger && x.scrollTrigger.kill(); x.kill(); gsap.set(etapes, { clearProps: 'transform,opacity' }); });
  });
}


/* ---------- Soleil de fin de journée qui suit la souris sur la façade (souris seulement, se stabilise) ---------- */
function soleil() {
  const el = $('[data-soleil-pointeur]');
  if (!el || calme() || !souris()) return;
  const zone = el.closest('section');
  const e = { x: 72, y: 26, cx: 72, cy: 26 };
  zone.addEventListener('pointermove', (ev) => { if (ev.pointerType !== 'mouse') return; const r = zone.getBoundingClientRect(); e.cx = ((ev.clientX - r.left) / r.width) * 100; e.cy = ((ev.clientY - r.top) / r.height) * 100; });
  zone.addEventListener('pointerleave', () => { zone.__souris = false; e.cx = 72; e.cy = e.base || 26; });
  /* Le soleil descend vers l'horizon quand on fait défiler la page (il se couche). */
  ST().create({ trigger: zone, start: 'top top', end: 'bottom top', onUpdate: (st) => { const y = 26 + st.progress * 46; if (!zone.__souris) e.cy = y; e.base = y; el.style.setProperty('--soleil-o', (0.75 + st.progress * 0.25).toFixed(2)); } });
  zone.addEventListener('pointerenter', () => { zone.__souris = true; });
  boucle(el, (dt) => {
    const k = 1 - Math.exp(-dt * 4);
    const dx = e.cx - e.x, dy = e.cy - e.y;
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return;
    e.x += dx * k; e.y += dy * k;
    el.style.setProperty('--sx', e.x.toFixed(2) + '%'); el.style.setProperty('--sy', e.y.toFixed(2) + '%');
  });
}

/* Serrure : trou de serrure découpé dans un panneau (tête de rayon 0,5 × s centrée sur le point, queue dessous). */
const SERRURE_PTS = (() => { const pts = [], a0 = Math.atan2(0.4664, 0.18), fin = Math.PI - a0 - 2 * Math.PI; for (let i = 0; i <= 40; i++) { const a = a0 + (fin - a0) * (i / 40); pts.push([0.5 * Math.cos(a), 0.5 * Math.sin(a)]); } pts.push([-0.26, 0.98], [0.26, 0.98]); return pts; })();
function trouSerrure(x, y, s) {
  const w = innerWidth + 4, h = innerHeight + 4, p0 = `${(x + SERRURE_PTS[0][0] * s).toFixed(1)}px ${(y + SERRURE_PTS[0][1] * s).toFixed(1)}px`;
  return `polygon(evenodd, -2px -2px, ${w}px -2px, ${w}px ${h}px, -2px ${h}px, -2px -2px, ${p0}, ${SERRURE_PTS.map(([a, b]) => `${(x + a * s).toFixed(1)}px ${(y + b * s).toFixed(1)}px`).join(', ')}, ${p0}, -2px -2px)`;
}


/* ---------- Contact : numéro qui se tamponne chiffre par chiffre ; formulaire tamponné « Reçu » ---------- */
function contact() {
  const n = $('.numero-geant');
  if (n && !calme()) {
    const paires = $$('.numero-paire', n);
    window.__pageArrivee = (tl, a) => tl.fromTo(paires, { y: 30, rotation: -8, scale: 1.4, opacity: 0 }, { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.09, ease: 'back.out(2)' }, a + 0.15);
    /* L'axe de Fraunces bascule de sage à sauvage quand on s'éloigne du numéro (typographie qui bouge). */
    ST().create({ trigger: n, start: 'top 40%', end: 'bottom top', onUpdate: (s) => n.style.fontVariationSettings = `'SOFT' ${(s.progress * 100).toFixed(0)}, 'WONK' ${s.progress > 0.5 ? 1 : 0}, 'opsz' 144` });
  }
  $$('[data-tampon-recu]').forEach((f) => {
    const m = $('[data-message-envoi]', f);
    if (!m) return;
    new MutationObserver(() => { if (!m.hidden) f.classList.add('recu'); }).observe(m, { attributes: true, attributeFilter: ['hidden'] });
  });
}

/* ---------- Dates en français (jour local, sans dépendre de la langue du navigateur) ---------- */
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_COURT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const isoLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dateDe = (s) => { const [y, m, j] = s.split('-').map(Number); return new Date(y, m - 1, j, 12); };
const plusJours = (s, n) => { const d = dateDe(s); d.setDate(d.getDate() + n); return isoLocal(d); };
const plusMois = (s, n) => { const d = dateDe(s), j = d.getDate(); const t = new Date(d.getFullYear(), d.getMonth() + n, 1, 12); t.setDate(Math.min(j, new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate())); return isoLocal(t); };
const moisPlus = (ym, n) => plusMois(`${ym}-01`, n).slice(0, 7);
const nbNuits = (a, d) => Math.round((dateDe(d) - dateDe(a)) / 864e5);
const quantieme = (d) => (d.getDate() === 1 ? '1er' : String(d.getDate()));
const jourLong = (s, annee = false) => { const d = dateDe(s); return `${JOURS[d.getDay()]} ${quantieme(d)} ${MOIS[d.getMonth()]}${annee ? ' ' + d.getFullYear() : ''}`; };
const jourCourt = (s) => { const d = dateDe(s); return `${JOURS[d.getDay()].slice(0, 3)}. ${quantieme(d)} ${MOIS_COURT[d.getMonth()]}`; };
/* « du vendredi 18 au lundi 21 décembre 2026 », le mois et l'année répétés seulement s'ils changent. */
const enLettres = (a, d) => {
  const A = dateDe(a), D = dateDe(d), j = (x) => `${JOURS[x.getDay()]} ${quantieme(x)}`;
  const fin = `${j(D)} ${MOIS[D.getMonth()]} ${D.getFullYear()}`;
  if (A.getFullYear() !== D.getFullYear()) return `du ${j(A)} ${MOIS[A.getMonth()]} ${A.getFullYear()} au ${fin}`;
  return A.getMonth() === D.getMonth() ? `du ${j(A)} au ${fin}` : `du ${j(A)} ${MOIS[A.getMonth()]} au ${fin}`;
};
const majuscule = (t) => t.charAt(0).toUpperCase() + t.slice(1);

/* ---------- Calendrier maison : deux mois côte à côte (un seul quand la place manque), l'arrivée puis le départ,
   la plage s'allume avec le nombre de nuits ; jours passés fermés ; clavier : flèches, début et fin de semaine,
   mois précédent et suivant. Les deux champs de date d'origine restent la source des valeurs (et le secours sans script). ---------- */
function calendrier(racine, { arr, dep, auChangement }) {
  const liste = $('[data-cal-mois]', racine), prec = $('[data-cal-prec]', racine), suiv = $('[data-cal-suiv]', racine);
  const annonce = $('[data-cal-annonce]', racine), consigne = $('[data-cal-consigne]', racine), nuitsEl = $('[data-cal-nuits]', racine);
  const valA = $('[data-cal-val="arrivee"]', racine), valD = $('[data-cal-val="depart"]', racine), effacer = $('[data-cal-effacer]', racine);
  const aChoisir = valA.textContent.trim();
  const auj = isoLocal(new Date()), max = plusJours(auj, 548);
  const moisMin = auj.slice(0, 7), moisMax = max.slice(0, 7);
  let a = arr.value && arr.value >= auj ? arr.value : null;
  let d = a && dep.value > a ? dep.value : null;
  let survol = null, nb = 0, vue = (a || auj).slice(0, 7), focusJour = a || auj;
  const ENTETES = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const enVue = (s) => s.slice(0, 7) >= vue && s.slice(0, 7) <= moisPlus(vue, nb - 1);
  function dessiner() {
    let h = '';
    for (let k = 0; k < nb; k++) {
      const ym = moisPlus(vue, k), [y, m] = ym.split('-').map(Number);
      const decal = (new Date(y, m - 1, 1, 12).getDay() + 6) % 7, n = new Date(y, m, 0).getDate();
      h += `<div class="cal-mois"><table class="cal-table"><caption class="cal-titre">${MOIS[m - 1]} ${y}</caption><thead><tr>${ENTETES.map((j) => `<th scope="col"><span aria-hidden="true">${j[0].toUpperCase()}</span><span class="visuellement-cache">${j}</span></th>`).join('')}</tr></thead><tbody><tr>`;
      let c = 0;
      for (; c < decal; c++) h += '<td></td>';
      for (let j = 1; j <= n; j++, c++) {
        if (c && c % 7 === 0) h += '</tr><tr>';
        const s = `${ym}-${String(j).padStart(2, '0')}`;
        h += `<td><button type="button" class="cal-jour" data-jour="${s}" tabindex="-1"${s < auj || s > max ? ' disabled' : ''}>${j}</button></td>`;
      }
      for (; c % 7; c++) h += '<td></td>';
      h += '</tr></tbody></table></div>';
    }
    liste.innerHTML = h;
    liste.dataset.nb = String(nb);
    prec.disabled = vue <= moisMin;
    suiv.disabled = moisPlus(vue, nb - 1) >= moisMax;
    marquer();
  }
  function marquer() {
    const fin = d || (a && survol && survol > a ? survol : null);
    for (const b of liste.querySelectorAll('.cal-jour')) {
      const s = b.dataset.jour, td = b.parentElement;
      td.classList.toggle('est-debut', !!fin && s === a);
      td.classList.toggle('est-fin', !!fin && s === fin);
      td.classList.toggle('est-dans', !!fin && s > a && s < fin);
      td.classList.toggle('est-apercu', !!fin && !d);
      b.classList.toggle('est-choisi', s === a || s === d);
      b.classList.toggle('est-aujourdhui', s === auj);
      b.setAttribute('aria-pressed', String(s === a || s === d));
      b.setAttribute('aria-label', jourLong(s, true) + (s === a ? ', arrivée' : '') + (s === d ? ', départ' : '') + (s === auj ? ', aujourd’hui' : ''));
      b.tabIndex = s === focusJour && !b.disabled ? 0 : -1;
    }
    if (!liste.querySelector('.cal-jour[tabindex="0"]')) { const b = liste.querySelector('.cal-jour:not([disabled])'); if (b) b.tabIndex = 0; }
    valA.textContent = a ? jourCourt(a) : aChoisir;
    valD.textContent = d ? jourCourt(d) : aChoisir;
    racine.dataset.etape = !a ? 'arrivee' : !d ? 'depart' : 'fait';
    const n = a && fin ? nbNuits(a, fin) : 0;
    /* La pastille garde sa place, vide ou pleine : rien ne bouge sous le doigt ou la souris. */
    nuitsEl.classList.toggle('est-vide', !n);
    nuitsEl.textContent = n ? `${n} nuit${n > 1 ? 's' : ''}` : '0 nuit';
    nuitsEl.classList.toggle('est-apercu', !d);
    consigne.textContent = !a ? consigne.dataset.a : !d ? consigne.dataset.d : majuscule(enLettres(a, d)) + '.';
    effacer.style.visibility = a ? '' : 'hidden';
  }
  function choisirJour(s) {
    if (!a || d || s <= a) { a = s; d = null; } else d = s;
    focusJour = s; survol = null;
    arr.value = a || ''; dep.value = d || '';
    marquer();
    annonce.textContent = d ? `Départ le ${jourLong(d)} : ${nbNuits(a, d)} nuit${nbNuits(a, d) > 1 ? 's' : ''}.` : `Arrivée le ${jourLong(a)}. Choisissez maintenant le jour de départ.`;
    auChangement(!!d);
  }
  const focus = (opts) => liste.querySelector('.cal-jour[tabindex="0"]')?.focus(opts);
  liste.addEventListener('click', (e) => { const b = e.target.closest('.cal-jour'); if (b && !b.disabled) choisirJour(b.dataset.jour); });
  /* Aperçu de la plage sous la souris, entre l'arrivée choisie et le jour survolé. */
  liste.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse' || !a || d) return;
    const b = e.target.closest('.cal-jour');
    const s = b && !b.disabled ? b.dataset.jour : null;
    if (s !== survol) { survol = s; marquer(); }
  });
  liste.addEventListener('pointerleave', () => { if (survol) { survol = null; marquer(); } });
  liste.addEventListener('keydown', (e) => {
    const b = e.target.closest('.cal-jour');
    if (!b) return;
    const s = b.dataset.jour, rang = (dateDe(s).getDay() + 6) % 7;
    const pas = { ArrowLeft: () => plusJours(s, -1), ArrowRight: () => plusJours(s, 1), ArrowUp: () => plusJours(s, -7), ArrowDown: () => plusJours(s, 7),
      Home: () => plusJours(s, -rang), End: () => plusJours(s, 6 - rang), PageUp: () => plusMois(s, -1), PageDown: () => plusMois(s, 1) }[e.key];
    if (!pas) return;
    e.preventDefault();
    let t = pas();
    if (t < auj) t = auj;
    if (t > max) t = max;
    focusJour = t;
    survol = a && !d && t > a ? t : null;
    if (!enVue(t)) { vue = t.slice(0, 7) < vue ? t.slice(0, 7) : moisPlus(t.slice(0, 7), 1 - nb); if (vue < moisMin) vue = moisMin; dessiner(); } else marquer();
    focus();
  });
  liste.addEventListener('focusout', (e) => { if (survol && !liste.contains(e.relatedTarget)) { survol = null; marquer(); } });
  prec.addEventListener('click', () => { vue = moisPlus(vue, -1); if (vue < moisMin) vue = moisMin; dessiner(); if (prec.disabled) suiv.focus(); });
  suiv.addEventListener('click', () => { vue = moisPlus(vue, 1); dessiner(); if (suiv.disabled) prec.focus(); });
  effacer.addEventListener('click', () => { a = d = survol = null; arr.value = dep.value = ''; focusJour = vue < moisMin ? auj : `${vue}-01` < auj ? auj : `${vue}-01`; marquer(); annonce.textContent = 'Dates effacées.'; auChangement(false); focus(); });
  /* Deux mois si chacun garde des jours d'au moins 44 px au doigt (38 px à la souris), sinon un seul. */
  const tactile = () => matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const mesurer = () => {
    const w = liste.clientWidth;
    if (!w) return;
    const n = w >= 14 * (tactile() ? 44 : 38) + 32 ? 2 : 1;
    if (n !== nb) { const f = liste.contains(document.activeElement); nb = n; if (!enVue(focusJour)) vue = focusJour.slice(0, 7); dessiner(); if (f) focus({ preventScroll: true }); }
  };
  racine.hidden = false;
  $('[data-dates-natives]', racine.closest('form')).hidden = true;
  mesurer();
  new ResizeObserver(mesurer).observe(racine);
  return { focus, effacer: () => effacer.click() };
}

/* ---------- Réserver : tableau à clés, demande en trois étapes, clé qui file au récapitulatif, fiche de réception ---------- */
function reservation() {
  const form = $('[data-reservation]');
  if (!form) return;
  const recap = $('[data-recap]'), place = $('[data-recap-cle]'), fiche = $('[data-fiche]');
  const R = (k) => $(`[data-r="${k}"]`, recap);
  const radios = $$('input[name="chambre"]', form), crochets = $$('[data-cle-choix]');
  const arr = $('#r-arrivee'), dep = $('#r-depart'), adu = $('#r-adultes'), enf = $('#r-enfants'), ant = $('input[name="anticipee"]', form);
  const champEnfants = $('[data-champ-enfants]', form);
  const auj = new Date(); const iso = isoLocal;
  arr.min = iso(auj); dep.min = iso(new Date(auj.getTime() + 864e5));
  const fmt = (v) => (v ? jourCourt(v) : '—');
  const euros = (x) => x.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, ' ') + ' €';
  const choisie = () => radios.find((r) => r.checked);
  const nuits = () => { if (!arr.value || !dep.value) return 0; return Math.round((new Date(dep.value) - new Date(arr.value)) / 864e5); };
  function maj() {
    const ch = choisie();
    R('chambre').textContent = ch ? ch.closest('label').querySelector('strong').textContent : '—';
    const n = nuits();
    R('dates').textContent = arr.value || dep.value ? `${fmt(arr.value)} → ${fmt(dep.value)}` : '—';
    R('nuits').textContent = n > 0 ? String(n) : '—';
    const suite = ch && ch.value === 'suite';
    [...adu.options].forEach((o) => { o.disabled = !suite && +o.value > 2; });
    if (!suite && +adu.value > 2) adu.value = '2';
    const avecEnfant = ch && ch.dataset.enfant === 'oui';
    champEnfants.hidden = !avecEnfant; if (!avecEnfant) enf.value = '0';
    const a = +adu.value, e = +enf.value;
    R('voyageurs').textContent = `${a} adulte${a > 1 ? 's' : ''}${e ? ` · ${e} enfant${e > 1 ? 's' : ''}` : ''}`;
    const opts = []; if (ant.checked) opts.push('Arrivée anticipée : 10 €'); if (e) opts.push(`Lit pliant : ${e * 10} €`);
    R('options').textContent = opts.length ? opts.join(' · ') : 'Aucune';
    R('taxe').textContent = n > 0 ? `${euros(1.08 * a * n)} (${a} × ${n} × 1,08 €)` : '1,08 € par jour et par adulte';
    crochets.forEach((b) => b.setAttribute('aria-pressed', String(!!ch && b.dataset.cleChoix === ch.value)));
  }
  /* La clé quitte son crochet et file en arc jusqu'au récapitulatif (module envol-vers-le-panier). */
  function envol(cleChoix) {
    const b = crochets.find((x) => x.dataset.cleChoix === cleChoix);
    const svg = b && $('.crochet-cle', b);
    place.innerHTML = '';
    if (svg) place.append(svg.cloneNode(true));
    if (!svg || calme() || !gsap) return;
    const r0 = svg.getBoundingClientRect(), r1 = place.getBoundingClientRect();
    if (r1.bottom < 0 || r1.top > innerHeight) return;
    const v = svg.cloneNode(true); v.classList.add('cle-volante'); v.setAttribute('data-audit-ignorer', ''); document.body.append(v);
    const x0 = r0.left, y0 = r0.top, x1 = r1.left + r1.width / 2 - 23, y1 = r1.top + 10;
    const p = { t: 0 };
    place.style.opacity = '0';
    gsap.to(p, { t: 1, duration: 0.85, ease: 'power2.inOut', onUpdate: () => {
      const t = p.t, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t - Math.sin(Math.PI * t) * 160;
      v.style.transform = `translate(${x}px, ${y}px) rotate(${t * 540}deg)`;
    }, onComplete: () => { v.remove(); place.style.opacity = ''; gsap.fromTo(place, { scale: 1.08 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }); } });
  }
  const choisir = (val, voler = true) => { const r = radios.find((x) => x.value === val); if (!r) return; r.checked = true; maj(); if (voler) envol(val); else { place.innerHTML = ''; const s = $(`[data-cle-choix="${val}"] .crochet-cle`); if (s) place.append(s.cloneNode(true)); } };
  crochets.forEach((b) => b.addEventListener('click', () => {
    /* Prendre une clé mène à la demande : la page descend jusqu'au récapitulatif, puis la clé s'y envole. */
    const cible = innerWidth < 901 ? $('#demande') : recap;
    const r = cible.getBoundingClientRect();
    const visible = r.top >= 0 && r.top < innerHeight * 0.6;
    if (!visible) {
      cible.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'start' });
      setTimeout(() => { choisir(b.dataset.cleChoix, innerWidth >= 901); versDates(); }, calme() ? 0 : 650);
    } else { choisir(b.dataset.cleChoix); versDates(); }
  }));
  radios.forEach((r) => r.addEventListener('change', () => { maj(); envol(r.value); }));
  [arr, dep, adu, enf, ant].forEach((x) => x.addEventListener('change', () => { if (x === arr && arr.value) dep.min = iso(new Date(new Date(arr.value).getTime() + 864e5)); maj(); }));
  /* Les deux dates choisies : le bouton d'envoi vient à l'écran s'il est dessous (un geste de moins). */
  const versEnvoi = () => { const b = $('button[type="submit"]', form), r = b.getBoundingClientRect(); if (arr.value && dep.value && r.bottom > innerHeight - 16) b.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'center' }); };
  dep.addEventListener('change', versEnvoi);
  /* Le calendrier maison remplace les deux champs de date ; la plage reste allumée un instant avant que la page descende. */
  const racineCal = $('[data-calendrier]', form);
  const cal = racineCal ? calendrier(racineCal, { arr, dep, auChangement: (complet) => { maj(); if (complet) setTimeout(versEnvoi, calme() ? 0 : 420); } }) : null;
  function versDates() { if (cal) cal.focus({ preventScroll: true }); else arr.focus({ preventScroll: true }); }
  const erreur = (k, on) => { const e = $(`[data-erreur="${k}"]`, form); if (e) e.hidden = !on; };

  /* Fiche de réception : la clé remise avec sa pampille gravée, la photo de la chambre, les nuits en très grand,
     les dates en toutes lettres, puis le bouton vers la vraie réservation sécurisée. */
  const F = (k) => $$(`[data-f="${k}"]`, fiche);
  const ecrire = (k, v) => F(k).forEach((x) => { x.textContent = v; });
  let envoye = false;
  function remplirFiche() {
    const ch = choisie(), n = nuits(), suite = ch.value === 'suite';
    $('.fiche-titre-sur', fiche).textContent = suite ? 'Suite' : 'Chambre';
    ecrire('chambre', suite ? 'Isabelle + Denise' : ch.dataset.nom);
    ecrire('gravure', ch.dataset.nom);
    ecrire('nuits', String(n));
    ecrire('nuitsMot', n > 1 ? 'nuits' : 'nuit');
    ecrire('dates', majuscule(enLettres(arr.value, dep.value)));
    ecrire('arrivee', majuscule(jourLong(arr.value)));
    ecrire('depart', majuscule(jourLong(dep.value)));
    ['voyageurs', 'options', 'taxe'].forEach((k) => ecrire(k, R(k).textContent));
    $$('[data-fiche-photo]', fiche).forEach((f) => { f.hidden = f.dataset.fichePhoto !== ch.value; });
  }
  function montrerFiche() {
    remplirFiche();
    const deja = !fiche.hidden;
    fiche.hidden = false;
    $('#fiche-titre', fiche).focus({ preventScroll: true });
    /* La page grandit : le recalcul (fil de laiton, déclencheurs) passe d'abord, puis la page descend vers une cible
       relue à chaque image (le défilement doux du navigateur s'arrêtait à mi-chemin quand un recalcul tombait pendant). */
    let parti = false;
    const descendre = () => {
      if (parti) return;
      parti = true;
      /* La carte juste sous l'en-tête : la clé, le titre, les nuits et le bouton tiennent dans l'écran de l'ordinateur. */
      const carte = $('.fiche-carte', fiche), marge = (parseFloat(getComputedStyle(fiche).scrollMarginTop) || 0) + 16;
      const but = () => Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, carte.getBoundingClientRect().top + scrollY - marge));
      if (calme() || !gsap) { window.scrollTo({ top: but(), behavior: 'instant' }); return; }
      const y0 = scrollY, o = { t: 0 };
      gsap.to(o, { t: 1, duration: 1, ease: 'power2.inOut', onUpdate: () => window.scrollTo({ top: y0 + (but() - y0) * o.t, behavior: 'instant' }) });
    };
    window.addEventListener('socle:rafraichi', descendre, { once: true });
    setTimeout(descendre, 450);
    rafraichir();
    if (calme() || !gsap) return;
    const carte = $('.fiche-carte', fiche), num = $('[data-f="nuits"]', fiche), n = nuits(), o = { v: deja ? n : 0 };
    gsap.timeline({ delay: deja ? 0.15 : 0.35 })
      .fromTo(carte, { y: deja ? 0 : 70, opacity: deja ? 1 : 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0)
      .fromTo($$('.fiche-photo:not([hidden]) img', fiche), { scale: 1.12 }, { scale: 1, duration: 1.5, ease: 'power2.out' }, 0)
      /* La clé tombe sur la fiche et rebondit à peine, comme posée sur le comptoir. */
      .fromTo('[data-fiche-cle]', { y: -260, rotation: -70, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.95, ease: 'back.out(1.25)' }, 0.3)
      .fromTo(o, { v: deja ? n : 0 }, { v: n, duration: 0.9, ease: 'power2.out', onUpdate: () => { num.textContent = String(Math.round(o.v)); } }, 0.45)
      .fromTo('.fiche-tampon', { scale: 2.6, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.45, ease: 'back.out(2.2)' }, 1.1);
  }
  const cacherFiche = () => { if (fiche.hidden) return; fiche.hidden = true; envoye = false; rafraichir(); };
  /* Une fois la fiche ouverte, elle suit chaque changement de la demande (ou se referme si la demande n'est plus complète). */
  form.addEventListener('change', () => { if (!envoye) return; if (choisie() && nuits() > 0) remplirFiche(); else cacherFiche(); });
  racineCal?.addEventListener('click', () => { if (envoye && !(choisie() && nuits() > 0)) cacherFiche(); else if (envoye) remplirFiche(); });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const ch = choisie(), n = nuits();
    erreur('chambre', !ch);
    const passee = arr.value && arr.value < iso(auj);
    const datesOk = arr.value && dep.value && n > 0 && !passee;
    erreur('dates', !datesOk);
    arr.setAttribute('aria-invalid', String(!datesOk)); dep.setAttribute('aria-invalid', String(!datesOk));
    if (!ch) { radios[0].focus(); return; }
    if (!datesOk) { versDates(); return; }
    envoye = true;
    montrerFiche();
  });
  $('[data-recommencer]', fiche)?.addEventListener('click', () => {
    $('#demande').scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'start' });
    (choisie() || radios[0]).focus({ preventScroll: true });
  });
  /* Les clés se balancent sur leurs crochets selon la vitesse du défilement, puis s'immobilisent. */
  if (!calme()) {
    const cles = $$('.crochet-cle');
    let tl = null;
    window.__pageArrivee = (t, a) => t.fromTo(cles, { rotation: 22 }, { rotation: 0, duration: 1.4, stagger: 0.07, ease: 'elastic.out(1, .3)' }, a + 0.2);
    ST().create({ trigger: '[data-tableau]', start: 'top bottom', end: 'bottom top', onUpdate: (st) => {
      const r = Math.max(-16, Math.min(16, -st.getVelocity() / 90));
      if (Math.abs(r) < 1) return;
      tl && tl.kill();
      tl = gsap.timeline().to(cles, { rotation: r, duration: 0.25, stagger: 0.02 }).to(cles, { rotation: 0, duration: 1.3, ease: 'elastic.out(1, .3)' });
    } });
  }
  /* Choix prérempli depuis l'adresse (?chambre=isabelle, ?chambre=suite). */
  const depart = new URLSearchParams(location.search).get('chambre');
  if (depart) choisir(depart, false);
  maj();
}

/* ---------- Intro : la clé de laiton descend dans la serrure et tourne, puis la page s'ouvre en trou de serrure ---------- */
function intro() {
  if (!gsap) return null;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo('.ouverture-serrure', { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, 0)
    .fromTo('.cle-intro', { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' }, 0.03)
    /* La clé fait un demi-tour dans la serrure, puis rejoint la porte de la page. */
    .to('.cle-intro', { rotationY: 180, duration: 0.4, ease: 'power2.inOut' }, 0.36)
    .fromTo('.ouverture-nom', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.12)
    .fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.28)
    .fromTo('.ouverture-ligne', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.4)
    .to('.ouverture-nom, .ouverture-ligne, .ouverture-trait', { opacity: 0, duration: 0.2 }, 0.72)
    .to('.ouverture-serrure', { opacity: 0, duration: 0.3 }, 0.74);
  versObjet(tl, { a: 0.72, duree: 0.38, ouverture: 0.62 });
  /* La page s'ouvre en trou de serrure sur la porte de la maison (même motif que le voile). */
  const panneau = $('[data-ouverture]');
  if (panneau) {
    const proxy = { s: 0 };
    tl.to(proxy, { s: 1, duration: 0.75, ease: 'power3.in', onUpdate: () => {
      const cx = parseFloat(panneau.style.getPropertyValue('--cx')), cy = parseFloat(panneau.style.getPropertyValue('--cy')), t = parseFloat(panneau.style.getPropertyValue('--trou'));
      if (t > 0 && isFinite(cx)) panneau.style.clipPath = trouSerrure(cx, cy, 2 * t);
    } }, 1.11);
  }
  arriveePage(tl, 1.02);
  return tl;
}

/* Ce qui arrive dans le premier écran, pendant l'ouverture (intro) ou le retrait du voile. */
function arriveePage(tl, t0) {
  const t = tl || gsap.timeline();
  const a = tl ? t0 : 0.12;
  if ($('.hero-ligne')) {
    t.fromTo('.hero-ligne', { yPercent: 135 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' }, a)
      .fromTo('.hero-sur, .hero-intro, .hero-actions, .hero-info', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, a + 0.15);
  }
  $$('[data-tete-anime]').forEach((x, i) => t.fromTo(x, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, a + 0.1 + i * 0.08));
  if (window.__pageArrivee) window.__pageArrivee(t, a);
  return t;
}

/* ---------- Pages intérieures : branchées par leurs éléments ---------- */
const PAGES = [];
export const surPage = (fn) => PAGES.push(fn);

demarrer({
  preparer() {
    if (!gsap || !ST()) return;
    entree();
    soleil();
    axes();
    manifeste();
    facade();
    duo();
    carrousel();
    cadrans();
    auPassage('[data-plume]', 'ecrit', { seuil: 0.5 });
    auPassage('[data-direct]', 'est-trace', { seuil: 0.3, avant: (ol) => $$('li', ol).forEach((li, i) => li.style.setProperty('--i', i)) });
    portes();
    journee();
    contact();
    reservation();
    PAGES.forEach((fn) => { try { fn(); } catch (err) { console.error('[site]', err); } });
    sarment();
  },
  jouer() { return intro(); },
  etatFinal() {
    if (!gsap) return;
    gsap.set('.hero-ligne, .hero-sur, .hero-intro, .hero-actions, .hero-info, [data-tete-anime]', { clearProps: 'transform,opacity' });
    if (window.__pageEtatFinal) window.__pageEtatFinal();
  },
  arrivee() { if (gsap) arriveePage(null); },
});
