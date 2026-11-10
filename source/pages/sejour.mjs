/* Votre séjour : le cadran 24 h des horaires (ouverture), la journée heure par heure (scène collante),
   motards et cavaliers, les conditions sans petites lignes, les questions. */
import { html } from '../../outils/gabarit.mjs';
import { cadran } from './accueil.mjs';

export const page = { cle: 'sejour', fichier: 'votre-sejour', imagePartage: 'petit-dejeuner-terrasse-1280.webp' };

const ETAPES = [
  { n: 1, photo: 'petit-dejeuner-terrasse', alt: 'Petit-déjeuner servi sur la terrasse', h: 8.5 },
  { n: 2, photo: 'maison-porte', alt: 'Porte d’entrée en bois de la maison', h: 11 },
  { n: 3, photo: 'maison-cour', alt: 'Cour plantée devant la maison', h: 14.5 },
  { n: 4, photo: 'maison-allee', alt: 'Allée bordée de céanothes jusqu’à la maison', h: 17 },
  { n: 5, photo: 'horloge', alt: 'Horloge ancienne de la maison', h: 22 },
  { n: 6, photo: 'maison-facade', alt: 'Façade de la maison et porte du garage', h: 23 },
];

export default (c) => html`
<section class="tete-cadran" id="debut">
  <div class="conteneur tete-cadran-grille">
    <div class="tete-cadran-texte">
      <p class="surtitre" data-anime="gsap" data-tete-anime>${c.t('sejour.tete.sur')}</p>
      <h1 class="tete-cadran-titre" data-anime="gsap" data-tete-anime>${c.t('sejour.tete.titre')}</h1>
      <p class="masque-ecran-bas" data-anime="gsap" data-tete-anime>${c.t('sejour.tete.texte')}</p>
      <p class="tete-cadran-actions" data-anime="gsap" data-tete-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('sejour.tete.action'), attrs: 'data-action-principale' })}</p>
      <p class="tete-cadran-info" data-info-cle data-anime="gsap" data-tete-anime>${c.t('sejour.tete.info')}</p>
    </div>
    <div class="tete-cadran-objet">
      <div class="grand-cadran" data-cadran data-effet="cadran-journee" data-iris-centre="disque" role="img" aria-label="${c.s('sejour.tete.cadran')}">${cadran({ grand: true })}</div>
      <p class="tete-cadran-heure" aria-live="polite"><span data-heure-pouzols data-modele="${c.s('sejour.tete.maintenant')}"></span></p>
    </div>
  </div>
</section>

<section class="journee" id="journee" data-grille="scene typo" data-effet="journee" data-scene style="--n:${ETAPES.length}">
  <div class="journee-cadre" data-collant>
    <div class="conteneur journee-tete">
      <p class="surtitre">${c.t('sejour.journee.sur')}</p>
      <h2>${c.t('sejour.journee.titre')}</h2>
    </div>
    <svg class="journee-ciel" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path class="journee-arc" d="M20 110 C 250 -20, 750 -20, 980 110"/><circle class="journee-soleil" data-soleil r="12" cx="20" cy="110"/></svg>
    <ol class="journee-etapes conteneur">
      ${ETAPES.map((e, i) => html`<li class="journee-etape${i === 0 ? ' est-active' : ''}" data-etape="${i}" data-h="${e.h}">
        ${c.media({ nom: e.photo, alt: e.alt, classe: 'journee-photo', sizes: '(max-width: 760px) 92vw, 44vw' })}
        <div class="journee-texte">
          <p class="journee-heure">${c.t('sejour.journee.h' + e.n)}</p>
          <h3>${c.t('sejour.journee.t' + e.n)}</h3>
          <p>${c.t('sejour.journee.d' + e.n)}</p>
        </div>
      </li>`)}
    </ol>
    <div class="journee-progres conteneur" aria-hidden="true"><span data-journee-progres></span></div>
  </div>
</section>

<section class="garage-section" id="garage" data-fil="gauche">
  <div class="conteneur garage-grille">
    ${c.media({ nom: 'garage', alt: 'Garage voûté et fermé de la maison', classe: 'garage-photo', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('sejour.garage.sur')}</p>
      <h2 data-anime="lettres">${c.t('sejour.garage.titre')}</h2>
      <p data-anime>${c.t('sejour.garage.texte')}</p>
      <p class="plaque plaque--ligne" data-anime><strong>Team 68°</strong><span>${c.t('sejour.garage.partenaire')}</span></p>
    </div>
  </div>
</section>

<section class="conditions" id="conditions" data-fil="droite">
  <div class="conteneur">
    <p class="surtitre" data-anime>${c.t('sejour.conditions.sur')}</p>
    <h2 data-anime="lignes">${c.t('sejour.conditions.titre')}</h2>
    <div class="conditions-grille">
    ${c.media({ nom: 'petit-dejeuner-table', alt: 'Table du petit-déjeuner vue d’en haut', classe: 'conditions-photo', sizes: '(max-width: 760px) 60vw, 22vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
    <ul class="conditions-liste" data-anime="cascade">
      ${[1, 2, 3, 4, 5, 6].map((i) => html`<li><span class="conditions-num" aria-hidden="true">${String(i).padStart(2, '0')}</span>${c.t('sejour.conditions.c' + i)}</li>`)}
    </ul>
    </div>
  </div>
</section>

<section class="faq" id="questions" data-fil="gauche">
  <div class="conteneur faq-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('sejour.faq.sur')}</p>
      <h2 data-anime="lignes">${c.t('sejour.faq.titre')}</h2>
      ${c.donnees.faq.map((f) => html`<details class="faq-item" data-anime><summary>${f.q}</summary><p>${f.r}</p></details>`)}
    </div>
    ${c.media({ nom: 'escalier', alt: 'Escalier aux murs rouges qui monte aux chambres', classe: 'faq-photo', sizes: '(max-width: 760px) 70vw, 28vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
  </div>
</section>

<section class="fin" id="fin" data-fil="droite">
  <div class="conteneur fin-grille">
    ${c.media({ nom: 'maison-cour', alt: 'Cour plantée devant la maison', classe: 'fin-photo', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div class="fin-texte">
      <h2 data-anime="lettres">${c.t('sejour.fin.titre')}</h2>
      <p data-anime>${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('sejour.fin.action') })}</p>
    </div>
  </div>
</section>
`;
