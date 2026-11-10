/* Lo Componaïro : effets propres au projet. Le socle gère l'ouverture, le voile (serrure), l'en-tête, le menu,
   le mode calme, les boucles, les mesures et la bibliothèque d'effets posés par attributs dans les pages.
   Chaque effet propre porte data-effet="nom-du-plan" : trousseau, axes, manifeste, maison-coupe, etiquette-plume,
   tampons, cadran-journee, carrousel-sites, sarment, portes, couloir, journee, carte-route, route-acces, cle-envol. */
import { demarrer, boucle, etat, versObjet, quand, rafraichir } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = () => window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calme = () => etat.calme || document.documentElement.classList.contains('calme');
const souris = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Trousseau à faire tourner (module objet-a-faire-tourner, habillé en trousseau) ---------- */
function trousseau() {
  const root = $('[data-trousseau]');
  if (!root) return;
  const objet = $('.oat__objet', root), indice = $('.oat__indice', root);
  const nom = $('[data-trousseau-nom]'), detail = $('[data-trousseau-detail]');
  const choix = $$('[data-trousseau-choix]');
  const o = { repos: 0.16, defilement: 0.0016, amorti: 1.6, elanMax: 26 };
  const etatT = { angle: Math.PI / 4, elan: 0, tenu: false, lumiere: 0.75, lumiereCible: 0.75, eclat: 0, eclatCible: 0, cible: null, choisi: 0 };
  const poser = () => {
    root.style.setProperty('--oat-angle', `${(etatT.angle * 180 / Math.PI).toFixed(2)}deg`);
    root.style.setProperty('--oat-lumiere', `${(90 - etatT.lumiere * 180 / Math.PI).toFixed(1)}deg`);
    root.style.setProperty('--oat-eclat', etatT.eclat.toFixed(3));
    /* Clé dont l'étiquette est en bas : la clé i est dessinée à i × 90°, son étiquette 45° plus loin
       dans le sens inverse des aiguilles ; tournée de θ, l'étiquette est en bas quand i × 90° + θ − 45° ≡ 0. */
    const deg = etatT.angle * 180 / Math.PI;
    const i = ((Math.round((45 - deg) / 90) % 4) + 4) % 4;
    if (i !== etatT.choisi) choisir(i);
  };
  const choisir = (i) => {
    etatT.choisi = i;
    const b = choix[i];
    if (!b) return;
    if (nom) nom.textContent = b.dataset.nom;
    if (detail) detail.textContent = b.dataset.detail;
    choix.forEach((x, k) => x.setAttribute('aria-pressed', String(k === i)));
  };
  /* Les boutons font tourner le trousseau jusqu'à la clé choisie (clavier compris). */
  choix.forEach((b, i) => b.addEventListener('click', () => {
    const deg = etatT.angle * 180 / Math.PI;
    let but = 45 - i * 90; while (but - deg > 180) but -= 360; while (but - deg < -180) but += 360;
    if (calme()) { etatT.angle = but * Math.PI / 180; poser(); return; }
    etatT.cible = but * Math.PI / 180; etatT.elan = 0;
    indice && indice.classList.add('est-vu');
  }));
  poser();
  if (calme()) return;
  root.classList.add('est-actif');
  const def = { y: scrollY, t: performance.now(), cible: 0, v: 0 };
  addEventListener('scroll', () => { const t = performance.now(), dt = Math.max(1, t - def.t); def.cible = Math.max(-4000, Math.min(4000, (scrollY - def.y) / dt * 1000)); def.y = scrollY; def.t = t; }, { passive: true });
  let c = null;
  const mesurer = () => { const r = objet.getBoundingClientRect(); c = { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 }; };
  let a0 = 0, t0 = 0, w = 0, id = null;
  const angle = (e) => Math.atan2(e.clientY - c.y, e.clientX - c.x);
  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    mesurer();
    if (Math.hypot(e.clientX - c.x, e.clientY - c.y) > c.r) return;
    id = e.pointerId; etatT.tenu = true; etatT.cible = null; a0 = angle(e); t0 = performance.now(); w = 0;
    root.setPointerCapture?.(id); root.classList.add('est-tenu'); indice && indice.classList.add('est-vu');
  });
  root.addEventListener('pointermove', (e) => {
    if (!etatT.tenu || e.pointerId !== id) return;
    const a = angle(e), t = performance.now();
    let d = a - a0; d = Math.atan2(Math.sin(d), Math.cos(d));
    etatT.angle += d; w += (d / (Math.max(1, t - t0) / 1000) - w) * 0.35; a0 = a; t0 = t;
  });
  const lacher = (e) => {
    if (!etatT.tenu || (e && e.pointerId !== id)) return;
    etatT.tenu = false; id = null;
    etatT.elan = performance.now() - t0 > 120 ? 0 : Math.max(-o.elanMax, Math.min(o.elanMax, w - o.repos));
    root.classList.remove('est-tenu');
  };
  root.addEventListener('pointerup', lacher); root.addEventListener('pointercancel', lacher);
  const zone = root.closest('section') || root;
  zone.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; if (!c) mesurer(); etatT.lumiereCible = Math.atan2(-(e.clientY - c.y), e.clientX - c.x); etatT.eclatCible = 1; });
  zone.addEventListener('pointerleave', () => { etatT.lumiereCible = 0.75; etatT.eclatCible = 0; });
  addEventListener('resize', () => { c = null; }); addEventListener('scroll', () => { c = null; }, { passive: true });
  boucle(root, (dt) => {
    def.cible *= Math.exp(-dt * 6);
    def.v += (def.cible - def.v) * (1 - Math.exp(-dt * 10));
    if (etatT.cible != null && !etatT.tenu) {
      const d = etatT.cible - etatT.angle;
      etatT.angle += d * (1 - Math.exp(-dt * 6));
      if (Math.abs(d) < 0.002) { etatT.angle = etatT.cible; etatT.cible = null; }
    } else if (!etatT.tenu) {
      etatT.angle += (o.repos + def.v * o.defilement + etatT.elan) * dt;
      etatT.elan *= Math.exp(-dt * o.amorti);
    }
    let dl = etatT.lumiereCible - etatT.lumiere; dl = Math.atan2(Math.sin(dl), Math.cos(dl));
    etatT.lumiere += dl * (1 - Math.exp(-dt * 6));
    etatT.eclat += (etatT.eclatCible - etatT.eclat) * (1 - Math.exp(-dt * 5));
    poser();
  });
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
      s.textContent = t.dec < 17 ? st.dataset.avant : t.dec < 20.5 ? st.dataset.ouvert : st.dataset.apres;
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

/* ---------- Maison en coupe 3D (module objet-3d-qui-se-construit) ---------- */
function maisonCoupe() {
  const root = $('.o3d');
  if (!root) return;
  const o = { longueur: 2.8, depart: -34, tour: 360, inclinaison: -20, lumiere: -35, largeur: 760, hauteur: 520, largeurMin: 900, hauteurMin: 600 };
  const scene = $('.o3d__scene', root), objet = $('.o3d__objet', root);
  const pieces = $$('.o3d__piece', root), etapes = $$('.o3d__etapes [data-de]', root);
  /* Fluidité : la rotation va directement sur l'objet (pas de variable héritée par toutes les faces), les ombres
     des faces ne changent que par pas de 0,02, et chaque valeur ne s'écrit que si elle a changé. */
  let k = 1;
  const echelle = () => { const r = scene.getBoundingClientRect(); k = Math.min(r.width / o.largeur, r.height / o.hauteur, 1.1); root.style.setProperty('--o3d-k', k.toFixed(3)); if (root.__ry !== undefined) tourner(root.__ry, true); };
  root.style.setProperty('--o3d-rx', o.inclinaison + 'deg');
  const e = { p: 1, main: 0, v: 0, tenu: false };
  const lisse = (a, b, t) => { const x = Math.min(1, Math.max(0, (t - a) / Math.max(0.001, b - a))); return x * x * (3 - 2 * x); };
  const ombre = (ry, n) => { const d = ((((ry + n - o.lumiere) % 360) + 360) % 360) * Math.PI / 180; return (Math.round(25 * (1 - Math.max(0, Math.cos(d)))) / 50).toFixed(2); };
  const ecrits = {};
  const ecrire = (el, nom, v) => { if (ecrits[nom] !== v) { ecrits[nom] = v; el.style.setProperty(nom, v); } };
  function tourner(ry, force) {
    const r = ry.toFixed(1);
    if (!force && r === root.__ryTxt) return;
    root.__ry = ry; root.__ryTxt = r;
    objet.style.transform = `scale(${k.toFixed(3)}) rotateX(${o.inclinaison}deg) rotateY(${r}deg)`;
    /* Les ombres sont héritées par toutes les faces : les changer recalcule toute la maison. Elles ne changent
       donc que tous les 15 degrés. */
    const pasOmbre = Math.round(ry / 15) * 15;
    if (!force && pasOmbre === root.__pasOmbre) return;
    root.__pasOmbre = pasOmbre;
    ecrire(objet, '--o3d-o-av', ombre(pasOmbre, 0)); ecrire(objet, '--o3d-o-d', ombre(pasOmbre, 90));
    ecrire(objet, '--o3d-o-ar', ombre(pasOmbre, 180)); ecrire(objet, '--o3d-o-g', ombre(pasOmbre, 270));
  }
  echelle();
  new ResizeObserver(echelle).observe(scene);
  let nActive = -2;
  function poser() {
    tourner(o.depart + e.p * o.tour + e.main);
    /* La chute de chaque pièce s'écrit en transformation directe (rien n'est hérité par ses faces) ; la variable --m,
       qui ne sert plus qu'au fondu des faces, cesse de changer dès qu'elles sont opaques (m = 1/3). */
    const ouvre = Math.round(lisse(0.84, 0.97, e.p) * 200) / 200;
    pieces.forEach((pc) => {
      const m = Math.round(lisse(parseFloat(pc.dataset.de) || 0, parseFloat(pc.dataset.a) || 1, e.p) * 400) / 400;
      const toit = pc.classList.contains('o3d__piece--toit');
      if (pc.__chute === undefined) pc.__chute = parseFloat(getComputedStyle(pc).getPropertyValue('--o3d-chute')) || -300;
      const y = ((1 - m) * pc.__chute - (toit ? ouvre * 105 : 0)).toFixed(1);
      if (y !== pc.__y) { pc.__y = y; pc.style.transform = `translate3d(0, ${y}px, 0)`; }
      const mo = Math.min(0.34, Math.round(m * 100) / 100);
      if (mo !== pc.__mo) { pc.__mo = mo; pc.style.setProperty('--m', mo.toFixed(2)); }
      const cache = m <= 0.001;
      if (cache !== pc.__cache) { pc.__cache = cache; pc.style.visibility = cache ? 'hidden' : ''; }
    });
    if (ouvre !== root.__ouvre) { root.__ouvre = ouvre; $$('.o3d__piece--facade', root).forEach((pc) => pc.style.setProperty('--ouvre', ouvre.toFixed(3))); }
    let n = -1; etapes.forEach((x, i) => { if (e.p + 0.001 >= (parseFloat(x.dataset.de) || 0)) n = i; });
    if (n !== nActive) { nActive = n; etapes.forEach((x, i) => x.classList.toggle('est-active', i === n)); }
  }
  if (calme()) { poser(); return; }
  root.classList.add('est-actif');
  e.p = 0; poser();
  let raf = 0, avant = 0;
  const tour = (t) => {
    const dt = Math.min(0.05, avant ? (t - avant) / 1000 : 1 / 60); avant = t;
    if (!e.tenu && Math.abs(e.v) > 4) { e.main += e.v * dt; e.v *= Math.exp(-dt * 2.4); poser(); raf = requestAnimationFrame(tour); } else { raf = 0; avant = 0; }
  };
  let id = null, x0 = 0, t0 = 0;
  scene.addEventListener('pointerdown', (ev) => { if (ev.button !== 0) return; id = ev.pointerId; e.tenu = true; e.v = 0; x0 = ev.clientX; t0 = performance.now(); scene.setPointerCapture(id); root.classList.add('est-touche'); });
  scene.addEventListener('lostpointercapture', () => { if (!e.tenu) return; e.tenu = false; e.v = 0; });
  scene.addEventListener('pointermove', (ev) => {
    if (!e.tenu || ev.pointerId !== id) return;
    const t = performance.now(), d = (ev.clientX - x0) * 0.45;
    e.v += (d / Math.max(0.008, (t - t0) / 1000) - e.v) * 0.35; e.main += d; x0 = ev.clientX; t0 = t; poser();
  });
  const lacher = (ev) => { if (!e.tenu || (ev && ev.pointerId !== id)) return; e.tenu = false; if (performance.now() - t0 > 120) e.v = 0; e.v = Math.max(-900, Math.min(900, e.v)); if (!raf) raf = requestAnimationFrame(tour); };
  scene.addEventListener('pointerup', lacher); scene.addEventListener('pointercancel', lacher);
  scene.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { ev.preventDefault(); e.main += ev.key === 'ArrowLeft' ? -20 : 20; poser(); } });
  const mm = gsap.matchMedia();
  mm.add(`(min-width: ${o.largeurMin}px) and (min-height: ${o.hauteurMin}px)`, () => {
    root.classList.add('o3d--epingle'); echelle();
    const st = ST().create({ trigger: root, start: 'top top', end: () => '+=' + Math.round(innerHeight * o.longueur), pin: true, scrub: 0.8, invalidateOnRefresh: true,
      onUpdate: (x) => { e.p = x.progress; poser(); }, onRefresh: (x) => { e.p = x.progress; poser(); }, onToggle: (x) => root.classList.toggle('est-epingle', x.isActive) });
    return () => { st.kill(); root.classList.remove('o3d--epingle', 'est-epingle'); echelle(); };
  });
  mm.add(`(max-width: ${o.largeurMin - 1}px), (max-height: ${o.hauteurMin - 1}px)`, () => {
    const st = ST().create({ trigger: scene, start: 'top 85%', end: 'bottom 35%', scrub: 0.6, onUpdate: (x) => { e.p = x.progress; poser(); }, onRefresh: (x) => { e.p = x.progress; poser(); } });
    return () => st.kill();
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
  const feuille = 'M0 0 C 6 -10, 20 -12, 26 -2 C 22 2, 24 8, 18 10 C 12 12, 6 8, 0 0 Z';
  function construire() {
    const W = root.clientWidth, H = root.clientHeight;
    if (!W || !H) return;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const rr = root.getBoundingClientRect();
    haut = rr.top + scrollY;
    vh = innerHeight;
    maxDefil = document.documentElement.scrollHeight - vh;
    const tel = innerWidth < o.largeurTelephone;
    const boite = (x) => { const h = x.parentElement?.classList.contains('pin-spacer') ? x.parentElement : x; const r = h.getBoundingClientRect(); return { l: r.left - rr.left, t: r.top - rr.top, r: r.right - rr.left, b: r.bottom - rr.top, w: r.width, h: r.height }; };
    const gouttieres = (x) => { const c = x.matches(o.cadre) ? x : x.querySelector(o.cadre); if (!c) return [16, 16]; const b = boite(c); return [b.l, W - b.r]; };
    const xCote = (x, cote) => { const [g, d] = gouttieres(x); return cote === 'droite' ? W - Math.max(7, d * o.marge) : Math.max(7, g * o.marge); };
    const visible = (x) => x.getClientRects().length > 0;
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
      const g = el('path', 'fic__feuille', gF);
      g.setAttribute('d', feuille);
      const cote = q[1] < W / 2 ? 1 : -1;
      g.setAttribute('transform', `translate(${f(q[1])} ${f(q[2])}) scale(${cote} 1) rotate(${k % 2 ? -30 : 20})`);
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
    ST().create({ trigger: ul, start: 'top 60%', end: 'bottom top', scrub: 0.5, onUpdate: (s) => battants.forEach((b, i) => b.style.setProperty('--ouv', `${-38 - s.progress * (60 + i * 6)}deg`)) });
  }
  $$('[data-chambre]').forEach((art) => {
    const b = $('[data-battant]', art);
    if (!b || calme()) return;
    gsap.fromTo(b, { '--ouv': '0deg' }, { '--ouv': '-112deg', ease: 'power1.inOut', scrollTrigger: { trigger: art, start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
  });
  const filtres = $('[data-filtres]');
  if (filtres) {
    const lignes = $$('[data-comparatif] > li'), vide = $('[data-comparatif-vide]');
    const garder = (li, f) => f === 'tout' || (f === 'terrasse' && li.dataset.terrasse === 'oui') || (f === 'jardin' && li.dataset.vue === 'jardin') || (f === 'jumeaux' && li.dataset.jumeaux === 'oui');
    const appliquer = (f) => {
      $$('button', filtres).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.filtre === f)));
      let n = 0; lignes.forEach((li) => { const ok = garder(li, f); li.classList.toggle('est-ecartee', !ok); if (ok) n++; });
      vide.hidden = n > 0;
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

/* ---------- Réserver : tableau à clés, demande en trois étapes, clé qui file au récapitulatif ---------- */
function reservation() {
  const form = $('[data-reservation]');
  if (!form) return;
  const recap = $('[data-recap]'), place = $('[data-recap-cle]'), pret = $('[data-recap-pret]');
  const R = (k) => $(`[data-r="${k}"]`, recap);
  const radios = $$('input[name="chambre"]', form), crochets = $$('[data-cle-choix]');
  const arr = $('#r-arrivee'), dep = $('#r-depart'), adu = $('#r-adultes'), enf = $('#r-enfants'), ant = $('input[name="anticipee"]', form);
  const champEnfants = $('[data-champ-enfants]', form);
  const auj = new Date(); const iso = (d) => d.toISOString().slice(0, 10);
  arr.min = iso(auj); dep.min = iso(new Date(auj.getTime() + 864e5));
  const fmt = (v) => v ? new Date(v + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '—';
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
      setTimeout(() => { choisir(b.dataset.cleChoix, innerWidth >= 901); arr.focus({ preventScroll: true }); }, calme() ? 0 : 650);
    } else { choisir(b.dataset.cleChoix); arr.focus({ preventScroll: true }); }
  }));
  radios.forEach((r) => r.addEventListener('change', () => { maj(); envol(r.value); }));
  [arr, dep, adu, enf, ant].forEach((x) => x.addEventListener('change', () => { if (x === arr && arr.value) dep.min = iso(new Date(new Date(arr.value).getTime() + 864e5)); maj(); }));
  const erreur = (k, on) => { const e = $(`[data-erreur="${k}"]`, form); if (e) e.hidden = !on; };
  let envoye = false;
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (envoye) return;
    const ch = choisie(), n = nuits();
    erreur('chambre', !ch);
    const passee = arr.value && arr.value < iso(auj);
    const datesOk = arr.value && dep.value && n > 0 && !passee;
    erreur('dates', !datesOk);
    arr.setAttribute('aria-invalid', String(!datesOk)); dep.setAttribute('aria-invalid', String(!datesOk));
    if (!ch) { radios[0].focus(); return; }
    if (!datesOk) { arr.focus(); return; }
    envoye = true;
    const bouton = $('button[type="submit"]', form); bouton.disabled = true;
    pret.hidden = false;
    recap.classList.add('recu');
    if (!calme() && gsap) gsap.fromTo($('.tampon-recu', pret), { scale: 2.6, rotation: -10, opacity: 0 }, { scale: 1, rotation: -10, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' });
    pret.querySelector('a').focus({ preventScroll: true });
    if (innerWidth < 901) recap.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'start' });
  });
  $('[data-recommencer]')?.addEventListener('click', () => { envoye = false; pret.hidden = true; recap.classList.remove('recu'); $('button[type="submit"]', form).disabled = false; radios[0].focus(); });
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

/* ---------- Intro : les quatre clés tombent sur l'anneau, le nom s'écrit, puis l'anneau rejoint la page ---------- */
function intro() {
  if (!gsap) return null;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const cles = $$('.trousseau-intro .trousseau-cle');
  tl.fromTo('.trousseau-intro .trousseau-anneau, .trousseau-intro .trousseau-reflet, .trousseau-intro .trousseau-ombre', { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.35 }, 0);
  cles.forEach((k, i) => {
    tl.fromTo(k.querySelector('.cle'), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'back.out(2.4)' }, 0.12 + i * 0.1);
    const et = k.querySelector('.etiquette');
    if (et) tl.fromTo(et, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.3 + i * 0.1);
  });
  tl.fromTo('.ouverture-nom', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.25)
    .fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.35)
    .fromTo('.ouverture-ligne', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.5)
    .to('.ouverture-nom, .ouverture-ligne, .ouverture-trait', { opacity: 0, duration: 0.25 }, 0.9)
    .to('.trousseau-intro .etiquette', { opacity: 0, duration: 0.2 }, 0.9)
    .fromTo('.ouverture-serrure', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, 0.3)
    .to('.trousseau-intro', { rotation: 90, svgOrigin: '200 200', duration: 0.35, ease: 'back.inOut(2)' }, 0.62)
    .to('.ouverture-serrure', { opacity: 0, duration: 0.3 }, 1.05);
  versObjet(tl, { a: 1.0, duree: 0.5, ouverture: 0.8 });
  /* La page s'ouvre en trou de serrure depuis le trousseau (même motif que le voile). */
  const panneau = $('[data-ouverture]');
  if (panneau) {
    const proxy = { s: 0 };
    tl.to(proxy, { s: 1, duration: 0.8, ease: 'power3.in', onUpdate: () => {
      const cx = parseFloat(panneau.style.getPropertyValue('--cx')), cy = parseFloat(panneau.style.getPropertyValue('--cy')), t = parseFloat(panneau.style.getPropertyValue('--trou'));
      if (t > 0 && isFinite(cx)) panneau.style.clipPath = trouSerrure(cx, cy, 2 * t);
    } }, 1.51);
  }
  arriveePage(tl, 1.45);
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
    trousseau();
    soleil();
    axes();
    manifeste();
    maisonCoupe();
    carrousel();
    cadrans();
    auPassage('[data-plume]', 'ecrit', { seuil: 0.5 });
    auPassage('[data-tampons]', 'tamponne', { seuil: 0.4, avant: (ul) => $$('.inclus-tampon', ul).forEach((t, i) => t.style.setProperty('--i', i)) });
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
