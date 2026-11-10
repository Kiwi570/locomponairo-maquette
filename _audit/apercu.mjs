#!/usr/bin/env node
/* Aperçu de l'accueil : ce que l'utilisateur verra vraiment en ligne, en mouvement.
   Une capture ne montre ni l'intro, ni le voile, ni une scène qui se construit au défilement : un aperçu en captures
   était validé, puis jugé « trop sage » une fois en ligne (Agence AE, lydiacourtois : une v2 entière chacun).
   Ce script filme la page comme un visiteur qui arrive et la parcourt, sur ordinateur et sur téléphone, et fait une
   planche de captures, avec en option la planche du palmarès des ouvertures de la bibliothèque à côté.

   node _audit/apercu.mjs [--page /] [--palmares ../bibliotheque-maquettes/palmares/planches/ouverture.jpg] [--duree 24]
     --page      page filmée (l'accueil par défaut)
     --palmares  planche à mettre en tête de la planche de captures (la barre à dépasser)
     --duree     durée visée du défilement, en secondes (20 par défaut ; l'intro et les pauses s'ajoutent : 30 à 40 s en tout)
     --racine    racine du site (par défaut le dossier parent de _audit)
     --sortie    dossier de sortie (par défaut _audit/apercu)
   Résultat : accueil-ordinateur.mp4 (1440×900), accueil-telephone.mp4 (390×844, tactile), planche.jpg.
   Les films commencent à l'arrivée sur le site : l'intro y est jouée comme pour un vrai visiteur. */
import { createRequire } from 'node:module';
import { mkdirSync, rmSync, readFileSync, existsSync, readdirSync, renameSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { demarrerServeur } from './serveur.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ici = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf('--' + n); return i < 0 ? d : argv[i + 1]; };
const page0 = opt('page', '/');
const palmares = opt('palmares', '');
const duree = Math.max(8, parseFloat(opt('duree', '20')) || 20);
const racine = resolve(opt('racine', join(ici, '..')));
const sortie = resolve(opt('sortie', join(ici, 'apercu')));
rmSync(sortie, { recursive: true, force: true });
mkdirSync(join(sortie, 'brut'), { recursive: true });
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const serveur = await demarrerServeur(racine);
const nav = await chromium.launch();
const captures = [];

async function pret(page) {
  try { await page.waitForFunction(() => document.documentElement.classList.contains('pret') || (window.__socle && window.__socle.pret), null, { timeout: 12000 }); }
  catch { await attendre(3000); }
}

async function filmer({ nom, w, h, tactile }) {
  const dossier = join(sortie, 'brut', nom);
  mkdirSync(dossier, { recursive: true });
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: tactile, hasTouch: tactile, locale: 'fr-FR', recordVideo: { dir: dossier, size: { width: w, height: h } } });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(String(e).split('\n')[0]));
  const t0 = Date.now();
  await page.goto(serveur.adresse + page0, { waitUntil: 'load' });
  await pret(page);
  const intro = (Date.now() - t0) / 1000;
  await attendre(1400);
  const prendre = async (etiquette) => { const f = join(sortie, `${nom}-${captures.length}.jpg`); await page.screenshot({ path: f, type: 'jpeg', quality: 82 }); captures.push({ f, etiquette: `${nom === 'ordinateur' ? 'Ordinateur 1440×900' : 'Téléphone 390×844'} · ${etiquette}`, nom }); };
  await prendre('arrivée');
  /* Défilement régulier jusqu'en bas, comme un visiteur qui lit vite : molette sur ordinateur, glissé sur téléphone.
     Les sections épinglées consomment du défilement : elles se jouent pendant le film. */
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const pas = tactile ? 48 : 90;
  const n = Math.max(1, Math.ceil(total / pas));
  const delai = Math.min(160, Math.max(25, (duree * 1000) / n));
  const reperes = tactile ? [0.3, 0.6] : [0.25, 0.5, 0.75];
  let k = 0;
  for (let i = 0; i < n; i++) {
    if (tactile) await page.evaluate((p) => scrollBy(0, p), pas); else await page.mouse.wheel(0, pas);
    await attendre(delai);
    if (k < reperes.length && i / n >= reperes[k]) { await attendre(500); await prendre(`${Math.round(reperes[k] * 100)} % de la page`); k++; }
  }
  await attendre(1500);
  const video = page.video();
  await ctx.close();
  const brut = await video.path();
  const mp4 = join(sortie, `accueil-${nom}.mp4`);
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', brut, '-vf', `scale=${Math.min(w, 1280)}:-2`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4]);
  } catch { renameSync(brut, mp4.replace(/\.mp4$/, '.webm')); }
  return { nom, intro: Math.round(intro * 10) / 10, defilement: Math.round((n * delai) / 100) / 10, erreurs, fichier: existsSync(mp4) ? mp4 : mp4.replace(/\.mp4$/, '.webm') };
}

const films = [];
try {
  films.push(await filmer({ nom: 'ordinateur', w: 1440, h: 900, tactile: false }));
  films.push(await filmer({ nom: 'telephone', w: 390, h: 844, tactile: true }));

  /* Planche : palmarès en tête (si fourni), puis les captures ordinateur et téléphone. */
  const img = (f) => `data:image/jpeg;base64,${readFileSync(f).toString('base64')}`;
  const ord = captures.filter((c) => c.nom === 'ordinateur'), tel = captures.filter((c) => c.nom === 'telephone');
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:28px;background:#1b1b1b;color:#eee;font:15px/1.4 system-ui,sans-serif;width:1744px}
    h2{font-size:17px;font-weight:600;margin:0 0 10px;color:#fff} section{margin-bottom:26px}
    .r{display:flex;gap:14px;align-items:flex-start} figure{margin:0} figcaption{color:#aaa;font-size:13px;margin-top:6px}
    .o img{width:${Math.floor((1744 - 14 * (ord.length - 1)) / ord.length)}px;display:block;border-radius:6px}
    .t img{height:520px;display:block;border-radius:6px} .p img{width:1744px;display:block;border-radius:6px}</style>
    ${palmares && existsSync(palmares) ? `<section class="p"><h2>Palmarès des ouvertures de la bibliothèque : la barre à dépasser</h2><img src="${img(palmares)}"></section>` : ''}
    <section class="o"><h2>Accueil sur ordinateur</h2><div class="r">${ord.map((c) => `<figure><img src="${img(c.f)}"><figcaption>${c.etiquette}</figcaption></figure>`).join('')}</div></section>
    <section class="t"><h2>Accueil sur téléphone</h2><div class="r">${tel.map((c) => `<figure><img src="${img(c.f)}"><figcaption>${c.etiquette}</figcaption></figure>`).join('')}</div></section>`;
  const ctx = await nav.newContext({ viewport: { width: 1800, height: 900 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.screenshot({ path: join(sortie, 'planche.jpg'), type: 'jpeg', quality: 80, fullPage: true });
  await ctx.close();
} finally {
  await nav.close();
  serveur.fermer && serveur.fermer();
}
rmSync(join(sortie, 'brut'), { recursive: true, force: true });
for (const f of readdirSync(sortie)) if (/^(ordinateur|telephone)-\d+\.jpg$/.test(f)) rmSync(join(sortie, f));
console.log(`Aperçu de ${page0} · dossier ${sortie}`);
for (const f of films) console.log(`  ${f.nom} : intro ${f.intro} s, défilement ${f.defilement} s · ${f.fichier.split('/').pop()} (${Math.round(statSync(f.fichier).size / 1024)} Ko)${f.erreurs.length ? ` · erreurs : ${f.erreurs.join(' | ')}` : ''}`);
console.log(`  planche.jpg${palmares ? (existsSync(palmares) ? ' (avec le palmarès des ouvertures)' : ` (palmarès introuvable : ${palmares})`) : ''}`);
console.log('  À regarder soi-même avant de l’envoyer : l’accueil fait-il au moins aussi fort que le palmarès ?');
process.exit(0);
