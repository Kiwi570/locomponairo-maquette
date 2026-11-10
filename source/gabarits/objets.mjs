/* Objets dessinés du monde de Lo Componaïro : clés anciennes, trousseau, étiquettes, portes, cadran.
   Tout est en SVG écrit ici une seule fois, puis repris par l'intro, l'accueil, la réservation et la 404. */
import { brut } from '../../outils/gabarit.mjs';

/* Une clé ancienne qui pointe vers le bas, accrochée en (0, 0). */
export const cle = (id = '') => `<g class="cle"${id ? ` data-cle="${id}"` : ''}>
  <circle class="cle-anneau" cx="0" cy="62" r="19" fill="none" stroke-width="7"/>
  <circle class="cle-metal" cx="0" cy="62" r="6"/>
  <rect class="cle-metal" x="-4.5" y="80" width="9" height="92" rx="2"/>
  <rect class="cle-metal" x="-9" y="92" width="18" height="6" rx="2"/>
  <rect class="cle-metal" x="-8" y="108" width="16" height="4" rx="2"/>
  <path class="cle-metal" d="M3 146 h20 v8 h-7 v6 h7 v9 h-20 z"/>
  <circle class="cle-metal" cx="0" cy="174" r="4.5"/>
</g>`;

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

/* Porte cintrée de la maison, avec une photo derrière (chambres). */
export const arche = 'M0 100 V38 A38 38 0 0 1 76 38 V100 Z';
