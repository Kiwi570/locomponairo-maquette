/* Alentours : carte gravée où les routes partent de Pouzols (ouverture), la ronde des sites en carrousel 3D,
   « Prêt pour votre randonnée ? » en plein écran, les sorties toutes proches. */
import { existsSync } from 'node:fs';
import { html, brut } from '../../outils/gabarit.mjs';
import { gravure } from './accueil.mjs';

export const page = { cle: 'alentours', fichier: 'alentours', imagePartage: 'maison-allee-1280.webp' };

const existe = (nom) => existsSync(new URL(`../../assets/images/${nom}-1280.webp`, import.meta.url)) || existsSync(new URL(`../../assets/images/${nom}-640.webp`, import.meta.url));

/* Carte gravée : relief en hachures, l'Hérault, le lac, la côte ; routes de Pouzols vers chaque site. */
function carte(sites, c) {
  const P = { x: 330, y: 260 };
  const X = (s) => (s.x / 100) * 600, Y = (s) => (s.y / 100) * 520;
  const routes = sites.map((s) => {
    const x = X(s), y = Y(s), mx = (P.x + x) / 2 + (y - P.y) * 0.18, my = (P.y + y) / 2 - (x - P.x) * 0.18;
    return `<path class="carte-route" d="M${P.x} ${P.y} Q ${mx.toFixed(0)} ${my.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)}"/>`;
  }).join('');
  const points = sites.map((s, i) => {
    const x = X(s), y = Y(s), droite = x < 470 && !s.gauche;
    return `<g class="carte-site" style="--i:${i}"><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="5"/><text x="${(x + (droite ? 10 : -10)).toFixed(0)}" y="${(y + 4).toFixed(0)}" text-anchor="${droite ? 'start' : 'end'}">${s.nom.replace('Sète et l\'étang de Thau', 'Sète').replace('Grotte de ', '')}</text></g>`;
  }).join('');
  let hachures = '';
  for (let k = 0; k < 26; k++) { const x = 40 + (k % 13) * 40, y = 40 + Math.floor(k / 13) * 70 + (k % 2) * 16; hachures += `<path d="M${x} ${y + 22} l14 -20 l14 20 M${x + 8} ${y + 22} l8 -10"/>`; }
  return brut(`<svg class="carte-svg" viewBox="0 0 600 520" role="img" aria-label="${c.s('alentours.tete.carte')}">
  <rect class="carte-fond" x="0" y="0" width="600" height="520" rx="18"/>
  <g class="carte-relief">${hachures}</g>
  <path class="carte-eau" d="M372 0 C 360 80, 380 140, 352 200 S 330 300, 300 380 S 250 470, 230 520"/>
  <path class="carte-lac" d="M150 196 C 170 180, 210 186, 214 206 C 220 228, 180 236, 160 226 C 140 218, 136 206, 150 196 Z"/>
  <path class="carte-cote" d="M330 520 C 390 480, 430 470, 470 455 S 560 430, 600 418"/>
  <path class="carte-lac" d="M396 480 C 420 462, 470 458, 486 470 C 470 486, 420 492, 396 480 Z"/>
  <g class="carte-routes" data-fx="trace" data-effet="carte-route">${routes}</g>
  ${points}
  <g class="carte-maison"><circle cx="${P.x}" cy="${P.y}" r="11"/><path d="M${P.x - 6} ${P.y + 3} V${P.y - 2} L${P.x} ${P.y - 7} L${P.x + 6} ${P.y - 2} V${P.y + 3} Z"/></g>
  <text class="carte-pouzols" x="${P.x - 16}" y="${P.y + 36}" text-anchor="end" data-plume data-effet="etiquette-plume" data-grille="typo">Pouzols</text>
</svg>`);
}

/* 2 CV dessinée (médaillon) : la vraie photo de la maison la remplace dès qu'elle est fournie. */
const deuxCV = brut(`<svg class="deuxcv" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="96" class="deuxcv-fond"/>
<path class="deuxcv-caisse" d="M34 128 C 36 102, 52 92, 66 90 C 74 70, 92 60, 116 60 C 140 60, 150 74, 156 92 C 168 94, 172 108, 170 128 Z"/>
<path class="deuxcv-vitre" d="M76 90 C 82 74, 96 68, 112 68 L112 90 Z M118 68 C 134 68, 142 76, 148 90 L118 90 Z"/>
<circle class="deuxcv-roue" cx="66" cy="130" r="17"/><circle class="deuxcv-roue" cx="142" cy="130" r="17"/>
<circle class="deuxcv-jante" cx="66" cy="130" r="6"/><circle class="deuxcv-jante" cx="142" cy="130" r="6"/>
<path class="deuxcv-route" d="M14 150 H186"/></svg>`);

export default (c) => {
  const sites = c.donnees.alentours;
  const sentier = existe('grok/g-sentier');
    return html`
<section class="tete-carte" id="debut">
  <div class="conteneur tete-carte-grille">
    <div class="tete-carte-texte">
      <p class="surtitre" data-anime="gsap" data-tete-anime>${c.t('alentours.tete.sur')}</p>
      <h1 class="tete-carte-titre" data-anime="gsap" data-tete-anime>${c.t('alentours.tete.titre')}</h1>
      <p class="masque-ecran-bas" data-anime="gsap" data-tete-anime>${c.t('alentours.tete.texte')}</p>
      <p data-anime="gsap" data-tete-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('alentours.tete.action'), attrs: 'data-action-principale' })}</p>
      <p class="tete-carte-info" data-info-cle data-anime="gsap" data-tete-anime>${c.t('alentours.tete.info')}</p>
    </div>
    <div class="tete-carte-objet">
      ${carte(sites, c)}
      <div class="medaillon" data-iris-centre="disque" role="img" aria-label="${c.s('alentours.tete.voiture')}">${deuxCV}</div>
      <p class="schema-mention">Carte illustrative, échelle non respectée</p>
    </div>
  </div>
</section>

<section class="ronde ronde--page" id="sites" data-fil="gauche">
  <div class="conteneur sites-tete">
    <div>
      <p class="surtitre" data-anime>${c.t('alentours.sites.sur')}</p>
      <h2 data-anime="lettres">${c.t('alentours.sites.titre')}</h2>
      <p data-anime>${c.t('alentours.sites.texte')}</p>
    </div>
    ${c.media({ nom: 'site-gorges', alt: 'Les gorges de l’Hérault, eau turquoise entre les falaises', cadrage: '50% 60%', classe: 'sites-photo', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
  </div>
  <div class="carrousel" data-carrousel data-visuel data-effet="carrousel-sites" tabindex="0" role="region" aria-label="${c.s('accueil.alentours.region')}">
    <div class="carrousel-scene">
      <ul class="carrousel-anneau" data-galerie style="--n:${sites.length}">
        ${sites.map((s, i) => html`<li class="carrousel-carte" style="--i:${i}">
          <div class="carte-site">
            ${gravure(s.gravure)}
            <p class="carte-site-type">${s.type}</p>
            <h3>${s.nom}</h3>
            <p class="carte-site-texte">${s.texte}</p>
            ${s.distance ? html`<p class="carte-site-distance">${c.t('alentours.sites.distance')}<strong>${s.distance}</strong></p>` : ''}
          </div>
          <div class="carte-site carte-site--dos" data-face="dos" aria-hidden="true">${gravure(s.gravure)}</div>
        </li>`)}
      </ul>
    </div>
    <div class="carrousel-fleches">
      <button type="button" class="bouton-rond" data-carrousel-prec aria-label="${c.s('accueil.alentours.prec')}">←</button>
      <button type="button" class="bouton-rond" data-carrousel-suiv aria-label="${c.s('accueil.alentours.suiv')}">→</button>
    </div>
  </div>
</section>

<section class="rando" id="randonnee" data-fx="plein-ecran" style="--fx-longueur:220svh">
  <div data-collant>
    ${sentier
      ? c.media({ nom: 'rando-vignes', alt: 'Une cycliste devant les vignes et les collines de l’Hérault, au soleil couchant', cadrage: '62% 60%', classe: 'rando-photo', sizes: '100vw' })
      : html`<figure class="media rando-photo rando-dessin" data-visuel>${brut(`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="1600" height="900" fill="#e9c99a"/><path d="M0 520 C 300 380 520 470 760 400 S 1240 300 1600 380 V900 H0Z" fill="#b98d5f"/><path d="M0 640 C 260 560 600 640 900 580 S 1400 520 1600 600 V900 H0Z" fill="#7d7a4a"/><path d="M0 760 C 300 700 700 780 1000 720 S 1400 700 1600 760 V900 H0Z" fill="#59603a"/><path d="M700 900 C 760 800 860 760 820 700 S 900 620 960 600" fill="none" stroke="#efe0c4" stroke-width="26" stroke-linecap="round"/><circle cx="1180" cy="240" r="70" fill="#f6e3b8"/></svg>`)}</figure>`}
    <div class="suite-mots" aria-hidden="true" data-superpose data-audit-ignorer><span data-fx-ecarte="g">${c.t('alentours.rando.gauche')}</span><span data-fx-ecarte="d">${c.t('alentours.rando.droite')}</span></div>
    <div class="suite-texte conteneur"><div data-fx-apres>
      <h2>${c.t('alentours.rando.titre')}</h2>
      <p>${c.t('alentours.rando.texte')}</p>
    </div></div>
  </div>
</section>

<section class="proches" id="tout-pres" data-fil="droite">
  <div class="conteneur proches-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('alentours.proches.sur')}</p>
      <h2 data-anime="lignes">${c.t('alentours.proches.titre')}</h2>
      <ol class="proches-liste" data-direct>
        ${[1, 2, 3].map((i) => html`<li><span class="proche-nom">${c.t('alentours.proches.p' + i)}</span><span class="proche-texte">${c.t('alentours.proches.p' + i + 't')}</span></li>`)}
      </ol>
      <p data-anime><a class="bouton bouton--contour" href="${c.site.liens.tourisme}" target="_blank" rel="noopener" aria-label="${c.s('alentours.proches.plus')} ${c.s('commun.nouvelOnglet')}">${c.t('alentours.proches.plus')}</a></p>
    </div>
    ${c.media({ nom: 'pont-canet', alt: 'Pont suspendu rouge au-dessus d’une rivière bordée d’arbres', cadrage: '50% 50%', classe: 'proches-photo', sizes: '(max-width: 760px) 92vw, 42vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
  </div>
</section>

<section class="fin fin--soir" id="fin" data-fil="gauche">
  <div class="conteneur fin-grille">
    ${c.media({ nom: 'rose-soir', alt: 'Une bouteille de rosé sur la table en mosaïque de la terrasse, au coucher du soleil', cadrage: '60% 50%', classe: 'fin-photo', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div class="fin-texte">
      <h2 data-anime="lettres">${c.t('alentours.fin.titre')}</h2>
      <p data-anime>${c.t('alentours.fin.texte')}</p>
      <p data-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('alentours.fin.action') })}</p>
    </div>
  </div>
</section>
`;
};
