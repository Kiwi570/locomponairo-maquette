/* Contact et accès : le numéro en très grand (ouverture), l'itinéraire A750 → Pouzols qui se trace,
   le formulaire simulé avec son tampon « Reçu », la maison sur les réseaux. */
import { html, brut } from '../../outils/gabarit.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'maison-porte-1280.webp' };

const itineraire = 'https://www.google.com/maps/dir/?api=1&destination=15%20rue%20des%20Jardins%2C%2034230%20Pouzols';

const plan = brut(`<svg class="acces-svg" viewBox="0 0 600 420" aria-hidden="true" focusable="false">
  <rect class="carte-fond" x="0" y="0" width="600" height="420" rx="18"/>
  <path class="acces-autoroute" d="M560 330 C 470 300, 420 250, 360 214 S 250 150, 196 150"/>
  <path class="acces-route" data-fx-trait d="M560 330 C 470 300, 420 250, 360 214 S 250 150, 196 150 C 170 160, 150 190, 132 226"/>
  <g class="acces-etape"><circle cx="560" cy="330" r="9"/><text x="548" y="362" text-anchor="end">Montpellier</text></g>
  <g class="acces-etape"><rect x="184" y="138" width="24" height="24" rx="4"/><text x="196" y="126" text-anchor="middle">A750 · sortie Gignac</text></g>
  <g class="acces-maison"><circle cx="132" cy="236" r="14"/><path d="M124 240 V233 L132 226 L140 233 V240 Z"/><text x="150" y="276">Pouzols</text></g>
  <text class="acces-km" x="590" y="32" text-anchor="end">Montpellier → Pouzols&#160;: 34&#160;km</text><text class="acces-km" x="120" y="190">7 km</text>
</svg>`);

export default (c) => html`
<section class="tete-numero" id="debut">
  <div class="conteneur tete-numero-grille">
    <div class="tete-numero-bloc">
      <p class="surtitre" data-anime="gsap" data-tete-anime>${c.t('contact.tete.sur')}</p>
      <h1 class="tete-numero-titre" data-anime="gsap" data-tete-anime>${c.t('contact.tete.titre')}</h1>
      <a class="numero-geant" href="tel:${c.site.contact.telephoneLien}" data-action-principale data-iris-centre data-grille="typo" data-effet="numero" aria-label="${c.s('commun.appeler')} ${c.site.contact.telephone}">${c.site.contact.telephone.split(' ').map((g) => html`<span class="numero-paire">${g}</span>`)}</a>
      <p class="tete-numero-texte masque-ecran-bas" data-anime="gsap" data-tete-anime>${c.t('contact.tete.texte')}</p>
      <p class="tete-numero-coord" data-anime="gsap" data-tete-anime><span data-info-cle>${c.t('contact.tete.info')}</span><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </div>
    ${c.media({ nom: 'maison-allee', alt: 'Allée bordée de céanothes jusqu’à la maison', cadrage: '53% 45%', classe: 'tete-numero-photo', sizes: '(max-width: 760px) 100vw, 34vw', priorite: true, attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
</section>

<section class="acces" id="acces" data-fil="gauche">
  <div class="conteneur acces-grille">
    <div class="acces-carte" data-fx="trace" data-effet="route-acces" role="img" aria-label="${c.s('contact.acces.carte')}">${plan}</div>
    <div>
      <p class="surtitre" data-anime>${c.t('contact.acces.sur')}</p>
      <h2 data-anime="lignes">${c.t('contact.acces.titre')}</h2>
      <p data-anime>${c.t('contact.acces.texte')}</p>
      <ol class="acces-etapes" data-anime="cascade">
        ${[1, 2, 3].map((i) => html`<li><strong>${c.t('contact.acces.e' + i)}</strong><span>${c.t('contact.acces.e' + i + 't')}</span></li>`)}
      </ol>
      <p data-anime><a class="bouton bouton--contour" href="${itineraire}" target="_blank" rel="noopener" aria-label="${c.s('contact.acces.itineraire')} ${c.s('commun.nouvelOnglet')}">${c.t('contact.acces.itineraire')}</a></p>
    </div>
  </div>
</section>

<section class="ecrire" id="ecrire" data-fil="droite">
  <div class="conteneur ecrire-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('contact.ecrire.sur')}</p>
      <h2 data-anime="lignes">${c.t('contact.ecrire.titre')}</h2>
      <p data-anime>${c.t('contact.ecrire.texte')}</p>
      ${c.media({ nom: 'porte-chambre-ouverte', alt: 'Porte blanche à panneaux ouverte sur une chambre aux murs rouges', cadrage: '45% 50%', classe: 'ecrire-photo', sizes: '(max-width: 760px) 92vw, 34vw', attrs: 'data-anime="rideau"' })}
    </div>
    <form class="formulaire carte-papier" data-formulaire action="#" novalidate data-tampon-recu>
      <div class="champ"><label for="f-nom">${c.t('contact.ecrire.nom')}</label><input id="f-nom" name="nom" autocomplete="name" required></div>
      <div class="champ"><label for="f-email">${c.t('contact.ecrire.email')}</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="champ"><label for="f-tel">${c.t('contact.ecrire.tel')}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
      <div class="champ"><label for="f-sujet">${c.t('contact.ecrire.sujet')}</label>
        <select id="f-sujet" name="sujet">
          <option value="question" selected>${c.t('contact.ecrire.sQuestion')}</option>
          <option value="retard">${c.t('contact.ecrire.sRetard')}</option>
          <option value="groupe">${c.t('contact.ecrire.sGroupe')}</option>
          <option value="autre">${c.t('contact.ecrire.sAutre')}</option>
        </select></div>
      <div class="champ"><label for="f-message">${c.t('contact.ecrire.message')}</label><textarea id="f-message" name="message" rows="5" required></textarea></div>
      <p class="mention-donnees">${c.t('contact.ecrire.donnees')}</p>
      <button type="submit" class="bouton bouton--action">${c.t('contact.ecrire.envoyer')}</button>
      <p data-message-envoi role="status" tabindex="-1" hidden></p>
      <span class="tampon-recu" aria-hidden="true" data-superpose>${c.t('contact.ecrire.tampon')}</span>
    </form>
  </div>
</section>

<section class="reseaux" id="reseaux" data-fil="gauche">
  <div class="conteneur">
    <p class="surtitre" data-anime>${c.t('contact.reseaux.sur')}</p>
    <h2 data-anime="lettres">${c.t('contact.reseaux.titre')}</h2>
    <ul class="reseaux-liste" data-anime="cascade">
      ${[['instagram', 'maison-cour'], ['facebook', 'jardin-lauriers'], ['tripadvisor', 'petit-dejeuner-table']].map(([k, ph]) => html`<li><a href="${c.site.liens[k]}" target="_blank" rel="noopener" class="reseau" aria-label="${c.s('contact.reseaux.' + k)} ${c.s('commun.nouvelOnglet')}">${c.media({ nom: ph, alt: '', classe: 'reseau-photo', sizes: '(max-width: 760px) 92vw, 30vw' })}<span class="reseau-nom">${c.t('contact.reseaux.' + k)} →</span></a></li>`)}
    </ul>
  </div>
</section>
`;
