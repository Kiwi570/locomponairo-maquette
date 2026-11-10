/* Les chambres : quatre portes cintrées qui s'entrouvrent (ouverture), le couloir où chaque porte s'ouvre
   sur sa chambre au défilement (scène du métier), le comparatif filtrable, ce qu'on trouve dans chaque chambre. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'chambres', fichier: 'chambres', imagePartage: 'isabelle-1-1280.webp' };

const plume = (nom, cls = '') => html`<svg class="etiquette-plume${cls}" viewBox="0 0 220 64" aria-hidden="true" data-plume data-effet="etiquette-plume" data-grille="typo"><path class="etiquette-plume-papier" d="M2 32 L22 6 H210 a8 8 0 0 1 8 8 V50 a8 8 0 0 1 -8 8 H22 Z"/><circle cx="20" cy="32" r="5" class="etiquette-plume-trou"/><text x="120" y="44" text-anchor="middle">${nom}</text></svg>`;

export default (c) => {
  const ch = c.donnees.chambres;
  return html`
<section class="tete-portes" id="debut">
  <div class="conteneur tete-portes-texte">
    <p class="surtitre" data-anime="gsap" data-tete-anime>${c.t('chambres.tete.sur')}</p>
    <h1 class="tete-portes-titre" data-anime="gsap" data-tete-anime>${c.t('chambres.tete.titre')}</h1>
    <p class="tete-portes-intro masque-ecran-bas" data-anime="gsap" data-tete-anime>${c.t('chambres.tete.texte')}</p>
    <p class="tete-portes-actions" data-anime="gsap" data-tete-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('chambres.tete.action'), attrs: 'data-action-principale' })} <span class="tete-info" data-info-cle>${c.t('chambres.tete.info')}</span></p>
  </div>
  <ul class="portes conteneur" data-portes data-effet="portes" data-iris-centre aria-label="${c.s('chambres.tete.objet')}">
    ${ch.map((x, i) => html`<li class="porte-item" style="--i:${i}">
      <a class="porte" href="#${x.cle}" data-sans-transition>
        <span class="porte-cadre">
          ${c.media({ nom: x.photos[0], alt: '', cadrage: '50% 45%', classe: 'porte-photo', sizes: '(max-width: 760px) 24vw, 20vw', priorite: i < 2 })}
          <span class="porte-battant" aria-hidden="true"><span class="porte-poignee"></span></span>
        </span>
        <span class="porte-nom">${x.nom}</span>
        <span class="porte-etage">${x.etage} · ${x.surface}</span>
      </a>
    </li>`)}
  </ul>
</section>

<section class="couloir" id="couloir" data-grille="scene" data-effet="couloir" data-fil="gauche">
  <div class="conteneur couloir-tete">
    <p class="surtitre" data-anime>${c.t('chambres.couloir.sur')}</p>
    <h2 data-anime="lettres">${c.t('chambres.couloir.titre')}</h2>
    <p data-anime>${c.t('chambres.couloir.texte')}</p>
  </div>
  ${ch.map((x, i) => html`<article class="chambre conteneur${i % 2 ? ' chambre--inverse' : ''}" id="${x.cle}" data-chambre>
    <div class="chambre-porte" data-collant>
      <div class="chambre-cadre">
        ${c.media({ nom: x.photos[0], alt: c.s('chambres.couloir.porte') + ' ' + x.nom, cadrage: '50% 45%', classe: 'chambre-photo', sizes: '(max-width: 760px) 92vw, 46vw' })}
        <div class="chambre-battant" aria-hidden="true" data-battant><span class="porte-poignee"></span><span class="chambre-plaque">${x.initiale}</span></div>
      </div>
    </div>
    <div class="chambre-infos">
      ${plume(x.nom, ' etiquette-plume--titre')}
      <h3 class="chambre-nom">${x.nom}</h3>
      <p class="chambre-dit">${x.dit}</p>
      <dl class="chambre-fiche">
        <div><dt>${c.t('chambres.comparer.etage')}</dt><dd>${x.etage}</dd></div>
        <div><dt>${c.t('chambres.comparer.surface')}</dt><dd>${x.surface}</dd></div>
        <div><dt>${c.t('chambres.comparer.lit')}</dt><dd>${x.lit}</dd></div>
        <div><dt>${c.t('chambres.comparer.vue')}</dt><dd>${x.vue}</dd></div>
      </dl>
      <ul class="chambre-equipements">${x.equipements.map((e) => html`<li>${e}</li>`)}${x.enfant ? html`<li>${x.enfant}</li>` : ''}</ul>
      <div class="chambre-galerie">
        ${x.photos.slice(1).map((ph) => c.media({ nom: ph, alt: '', classe: 'chambre-vignette', sizes: '(max-width: 760px) 30vw, 12vw', attrs: 'data-fx="vitesse" data-fx-force="3"' }))}
      </div>
      <p>${c.lien('reserver', { params: 'chambre=' + x.cle, classe: 'bouton bouton--action', texte: c.t('chambres.couloir.reserver', { nom: x.nom }) })}</p>
    </div>
  </article>`)}
</section>

<section class="comparer" id="comparer" data-fil="droite">
  <div class="conteneur">
    <div class="comparer-tete">
      <div>
        <p class="surtitre" data-anime>${c.t('chambres.comparer.sur')}</p>
        <h2 data-anime="lignes">${c.t('chambres.comparer.titre')}</h2>
      </div>
      ${c.media({ nom: 'escalier', alt: 'Escalier aux murs rouges qui monte aux chambres', cadrage: '58% 45%', classe: 'comparer-photo', sizes: '(max-width: 760px) 70vw, 26vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
    </div>
    <div class="filtres" role="group" aria-label="${c.s('chambres.comparer.filtre')}" data-filtres>
      <button type="button" data-filtre="tout" aria-pressed="true">${c.t('chambres.comparer.fTout')}</button>
      <button type="button" data-filtre="terrasse" aria-pressed="false">${c.t('chambres.comparer.fTerrasse')}</button>
      <button type="button" data-filtre="jardin" aria-pressed="false">${c.t('chambres.comparer.fJardin')}</button>
      <button type="button" data-filtre="jumeaux" aria-pressed="false">${c.t('chambres.comparer.fJumeaux')}</button>
    </div>
    <ul class="comparatif" data-anime="cascade" data-comparatif>
      ${ch.map((x) => html`<li class="comparatif-ligne" data-terrasse="${x.terrasse ? 'oui' : 'non'}" data-vue="${x.vue === 'Vue jardin' ? 'jardin' : 'village'}" data-jumeaux="${/deux lits/.test(x.lit) ? 'oui' : 'non'}">
        <a href="#${x.cle}" class="comparatif-nom" data-sans-transition>${c.media({ nom: x.photos[1], alt: '', classe: 'comparatif-photo', sizes: '64px' })}${x.nom}</a>
        <span><small>${c.t('chambres.comparer.etage')}</small>${x.etage}</span>
        <span><small>${c.t('chambres.comparer.surface')}</small>${x.surface}</span>
        <span><small>${c.t('chambres.comparer.lit')}</small>${x.lit}</span>
        <span><small>${c.t('chambres.comparer.vue')}</small>${x.vue}</span>
        <span><small>${c.t('chambres.comparer.terrasse')}</small>${x.terrasse ? c.t('chambres.comparer.oui') : c.t('chambres.comparer.non')}</span>
      </li>`)}
    </ul>
    <p class="comparatif-vide" data-comparatif-vide hidden role="status">${c.t('chambres.comparer.aucune')}</p>
  </div>
</section>

<section class="partout" id="equipements" data-fil="gauche">
  <div class="conteneur partout-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('chambres.partout.sur')}</p>
      <h2 data-anime="lignes">${c.t('chambres.partout.titre')}</h2>
      <ul class="partout-liste" data-anime="cascade">
        ${[1, 2, 3, 4, 5, 6].map((i) => html`<li>${c.t('chambres.partout.i' + i)}</li>`)}
      </ul>
      <p class="partout-note" data-anime>${c.t('chambres.partout.noteEnfant')}</p>
    </div>
    <div class="partout-photos">
      ${c.media({ nom: 'mathilde-3', alt: 'Téléphone ancien et coupelle dans la chambre Mathilde', classe: 'partout-a', sizes: '(max-width: 760px) 60vw, 26vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
      ${c.media({ nom: 'suzanne-4', alt: 'Étagère d’appareils photo anciens dans la chambre Suzanne', classe: 'partout-b', sizes: '(max-width: 760px) 50vw, 20vw', attrs: 'data-anime="rideau"' })}
    </div>
  </div>
</section>

<section class="fin fin--chambres" id="fin" data-fil="droite">
  <div class="conteneur fin-grille">
    ${c.media({ nom: 'denise-3', alt: 'Porte-fenêtre ouverte sur la terrasse de la chambre Denise', classe: 'fin-photo', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div class="fin-texte">
      <h2 data-anime="lettres">${c.t('chambres.fin.titre')}</h2>
      <p data-anime>${c.t('chambres.fin.texte')}</p>
      <p data-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('chambres.fin.action') })}</p>
    </div>
  </div>
</section>
`;
};
