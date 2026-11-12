/* Objets dessinés du monde de Lo Componaïro : clés anciennes, trousseau, étiquettes, portes, cadran.
   Tout est en SVG écrit ici une seule fois, puis repris par l'intro, l'accueil, la réservation et la 404. */
import { brut } from '../../outils/gabarit.mjs';

/* Une clé ancienne qui pointe vers le bas, accrochée en (0, 0). Dans un contexte .cle-laiton, elle prend la matière
   du laiton (dégradés #laiton-*, définis une fois par page par defsLaiton, reflets, arêtes) ; ailleurs, une couleur
   pleine (logo, voile). */
export const cle = (id = '') => `<g class="cle"${id ? ` data-cle="${id}"` : ''}>
  <circle class="cle-anneau" cx="0" cy="62" r="19" fill="none" stroke-width="7"/>
  <circle class="cle-anneau-reflet" cx="0" cy="62" r="19" fill="none" stroke-width="1.6"/>
  <path class="cle-metal cle-orne" d="M0 37 c4 0 6 3 6 6 c0 2-2 4-6 4 c-4 0-6-2-6-4 c0-3 2-6 6-6 z"/>
  <circle class="cle-metal" cx="0" cy="62" r="6"/>
  <rect class="cle-metal cle-tige" x="-4.5" y="80" width="9" height="92" rx="2"/>
  <rect class="cle-metal cle-bague" x="-9" y="88" width="18" height="7" rx="2.5"/>
  <rect class="cle-metal cle-bague" x="-8" y="102" width="16" height="4.5" rx="2"/>
  <path class="cle-metal cle-panneton" d="M3 146 h20 v8 h-7 v6 h7 v9 h-20 z"/>
  <circle class="cle-metal" cx="0" cy="174" r="4.5"/>
  <path class="cle-reflet" d="M-2.2 84 V168"/>
</g>`;

/* Dégradés du laiton, une fois par page (référencés par url(#laiton-…) dans site.css). */
export const defsLaiton = brut(`<svg class="defs-laiton" width="0" height="0" aria-hidden="true" focusable="false"><defs>
  <linearGradient id="laiton-tige" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f350f"/><stop offset=".2" stop-color="#9c7027"/><stop offset=".42" stop-color="#f6dd96"/><stop offset=".56" stop-color="#d4ad57"/><stop offset=".8" stop-color="#83601f"/><stop offset="1" stop-color="#46300d"/></linearGradient>
  <linearGradient id="laiton-plat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e2a2"/><stop offset=".32" stop-color="#c7963f"/><stop offset=".62" stop-color="#e6c473"/><stop offset="1" stop-color="#6a4914"/></linearGradient>
  <linearGradient id="laiton-anneau" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe9ad"/><stop offset=".28" stop-color="#c7963f"/><stop offset=".52" stop-color="#6f4c15"/><stop offset=".78" stop-color="#d6ae5b"/><stop offset="1" stop-color="#f1d58a"/></linearGradient>
</defs></svg>`);

/* Étiquette de papier attachée à la clé, avec le prénom écrit à la plume. */
const etiquette = (nom) => `<g class="etiquette" transform="translate(16 54)">
  <path class="etiquette-fil" d="M0 0 C 14 10, 30 14, 44 30" fill="none"/>
  <g transform="translate(44 30) rotate(-14)">
    <path class="etiquette-papier" d="M0 6 L10 -6 H84 a5 5 0 0 1 5 5 V27 a5 5 0 0 1 -5 5 H10 L0 20 Z"/>
    <circle class="etiquette-trou" cx="9" cy="7" r="3"/>
    <text class="etiquette-texte" x="50" y="21" text-anchor="middle">${nom}</text>
  </g>
</g>`;

/* Trousseau : anneau et quatre clés en croix, chacune avec son étiquette (vue de dessus). */
export function trousseau(chambres, { avecEtiquettes = true, classe = 'trousseau-svg' } = {}) {
  const cles = chambres.map((ch, i) => `<g class="trousseau-cle" style="--i:${i}" transform="translate(200 200) rotate(${i * 90})">
    ${cle(ch.cle)}${avecEtiquettes ? etiquette(ch.nom) : ''}</g>`).join('');
  return brut(`<svg class="${classe}" viewBox="0 0 400 400" aria-hidden="true" focusable="false" data-audit-ignorer>
  <circle class="trousseau-ombre" cx="204" cy="206" r="44"/>
  ${cles}
  <circle class="trousseau-anneau" cx="200" cy="200" r="44" fill="none" stroke-width="8"/>
  <circle class="trousseau-reflet" cx="200" cy="200" r="44" fill="none" stroke-width="2"/>
</svg>`);
}

/* Petite clé seule (logo, voile, boutons). */
export const icone = (classe = 'icone-cle') => brut(`<svg class="${classe}" viewBox="-30 30 60 160" aria-hidden="true" focusable="false">${cle()}</svg>`);

/* Grande clé de laiton de l'intro (elle tourne dans la serrure). */
export const cleIntro = brut(`<svg class="cle-intro cle-laiton" viewBox="-34 30 68 156" aria-hidden="true" focusable="false" data-audit-ignorer>${cle()}</svg>`);

/* Porte cintrée de la maison, avec une photo derrière (chambres). */
export const arche = 'M0 100 V38 A38 38 0 0 1 76 38 V100 Z';
