/* Réserver en direct : le tableau à clés de la réception (ouverture), la demande en trois étapes avec
   son récapitulatif ; la clé choisie quitte son crochet et file jusqu'au récapitulatif (retour physique),
   l'étiquette se tamponne « Demande prête », puis lien vers la vraie réservation sécurisée. */
import { html, brut } from '../../outils/gabarit.mjs';
import { cle } from '../gabarits/objets.mjs';

export const page = { cle: 'reserver', fichier: 'reserver', imagePartage: 'jardin-lauriers-1280.webp' };

const cleSvg = () => brut(`<svg class="crochet-cle" viewBox="-34 34 68 150" aria-hidden="true" focusable="false">${cle()}</svg>`);

export default (c) => {
  const ch = c.donnees.chambres;
  const choix = [...ch.map((x) => ({ cle: x.cle, nom: x.nom, detail: `${x.etage} · ${x.surface} · ${x.lit}`, enfant: !!x.enfant })), { cle: 'suite', nom: 'Suite', detail: c.s('reserver.form.suite'), enfant: true }];
  return html`
<section class="tete-tableau" id="debut">
  <div class="conteneur tete-tableau-grille">
    <div>
      <p class="surtitre" data-anime="gsap" data-tete-anime>${c.t('reserver.tete.sur')}</p>
      <h1 class="tete-tableau-titre" data-axes data-grille="typo" data-anime="gsap" data-tete-anime>${c.t('reserver.tete.titre')}</h1>
      <p class="masque-ecran-bas" data-anime="gsap" data-tete-anime>${c.t('reserver.tete.texte')}</p>
      <p data-anime="gsap" data-tete-anime><a class="bouton bouton--action" href="#demande" data-action-principale data-sans-transition>${c.t('reserver.form.titre')} ↓</a></p>
      <p class="tete-tableau-info" data-info-cle data-anime="gsap" data-tete-anime>${c.t('reserver.tete.info')}</p>
    </div>
    <div class="tableau" data-tableau data-visuel data-iris-centre data-effet="tableau-cles" role="group" aria-label="${c.s('reserver.tete.tableau')}">
      <p class="tableau-plaque">Lo Componaïro · 1850</p>
      <ul class="tableau-crochets">
        ${choix.map((x) => html`<li><button type="button" class="crochet" data-cle-choix="${x.cle}" aria-pressed="false"><span class="crochet-clou" aria-hidden="true"></span>${cleSvg()}<span class="crochet-nom">${x.nom}</span></button></li>`)}
      </ul>
    </div>
  </div>
</section>

<section class="demande" id="demande" data-fil="gauche">
  <div class="conteneur demande-grille">
    <form class="demande-form carte-papier" data-reservation novalidate>
      <h2 data-anime="lignes">${c.t('reserver.form.titre')}</h2>
      <p class="demande-simule" data-anime>${c.t('reserver.form.simule')}</p>
      <p class="demande-etapes" data-anime>${c.t('reserver.form.etapes')}</p>
      <fieldset class="demande-bloc" data-anime>
        <legend>1 · ${c.t('reserver.form.e1')}</legend>
        <div class="demande-chambres">
          ${choix.map((x, i) => html`<label class="choix-chambre"><input type="radio" name="chambre" value="${x.cle}" data-nom="${x.nom}" data-enfant="${x.enfant ? 'oui' : 'non'}"><span><strong>${x.cle === 'suite' ? c.t('reserver.form.suite') : x.nom}</strong><small>${x.cle === 'suite' ? 'Isabelle + Denise · terrasse fleurie' : x.detail}</small></span></label>`)}
        </div>
        <p class="champ-erreur" id="err-chambre" data-erreur="chambre" hidden>${c.t('reserver.form.erreurChambre')}</p>
      </fieldset>
      <fieldset class="demande-bloc" data-anime>
        <legend>2 · ${c.t('reserver.form.e2')}</legend>
        <div class="demande-dates">
          <div class="champ"><label for="r-arrivee">${c.t('reserver.form.arrivee')}</label><input id="r-arrivee" name="arrivee" type="date" required aria-describedby="err-dates"></div>
          <div class="champ"><label for="r-depart">${c.t('reserver.form.depart')}</label><input id="r-depart" name="depart" type="date" required aria-describedby="err-dates"></div>
        </div>
        <p class="champ-erreur" id="err-dates" data-erreur="dates" hidden>${c.t('reserver.form.erreurDates')}</p>
      </fieldset>
      <fieldset class="demande-bloc" data-anime>
        <legend>3 · ${c.t('reserver.form.e3')}</legend>
        <div class="demande-dates">
          <div class="champ"><label for="r-adultes">${c.t('reserver.form.adultes')}</label><select id="r-adultes" name="adultes"><option>1</option><option selected>2</option><option>3</option><option>4</option></select></div>
          <div class="champ" data-champ-enfants><label for="r-enfants">${c.t('reserver.form.enfants')}</label><select id="r-enfants" name="enfants"><option selected>0</option><option>1</option><option>2</option></select></div>
        </div>
        <label class="case"><input type="checkbox" name="anticipee"> ${c.t('reserver.form.anticipee')}</label>
      </fieldset>
      <button type="submit" class="bouton bouton--action" data-grille="retour">${c.t('reserver.form.envoyer')}</button>
    </form>
    <aside class="recap carte-papier" data-recap aria-live="polite" aria-label="${c.s('reserver.form.recap')}">
      <h3>${c.t('reserver.form.recap')}</h3>
      <div class="recap-cle" data-recap-cle data-visuel><span>${c.t('reserver.form.vide')}</span></div>
      <dl class="recap-liste">
        <div><dt>${c.t('reserver.form.rChambre')}</dt><dd data-r="chambre">—</dd></div>
        <div><dt>${c.t('reserver.form.rDates')}</dt><dd data-r="dates">—</dd></div>
        <div><dt>${c.t('reserver.form.rNuits')}</dt><dd data-r="nuits">—</dd></div>
        <div><dt>${c.t('reserver.form.rVoyageurs')}</dt><dd data-r="voyageurs">—</dd></div>
        <div><dt>${c.t('reserver.form.rInclus')}</dt><dd>${c.t('reserver.form.rInclusT')}</dd></div>
        <div><dt>${c.t('reserver.form.rOptions')}</dt><dd data-r="options">${c.t('reserver.form.aucune')}</dd></div>
        <div><dt>${c.t('reserver.form.rTaxe')}</dt><dd data-r="taxe" data-prix>—</dd></div>
        <div><dt>${c.t('reserver.form.rPrix')}</dt><dd class="a-completer">${c.t('reserver.form.rPrixT')}</dd></div>
      </dl>
      <div class="recap-pret" data-recap-pret hidden>
        <span class="tampon-recu tampon-recu--pret" aria-hidden="true" data-superpose>${c.t('reserver.form.pret')}</span>
        <p>${c.t('reserver.form.pretTexte')}</p>
        <p><a class="bouton bouton--action" href="${c.site.liens.reservation}" target="_blank" rel="noopener" aria-label="${c.s('reserver.form.continuer')} ${c.s('commun.nouvelOnglet')}">${c.t('reserver.form.continuer')}</a></p>
        <p><button type="button" class="lien" data-recommencer>${c.t('reserver.form.recommencer')}</button></p>
      </div>
    </aside>
  </div>
</section>

<section class="cadeau" id="cadeau" data-fil="droite">
  <div class="conteneur cadeau-grille">
    ${c.media({ nom: 'petit-dejeuner-table', alt: 'Table du petit-déjeuner vue d’en haut', classe: 'cadeau-photo', sizes: '(max-width: 760px) 70vw, 26vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('reserver.cadeau.sur')}</p>
      <h2 data-anime="lettres">${c.t('reserver.cadeau.titre')}</h2>
      <p data-anime>${c.t('reserver.cadeau.texte')}</p>
      <p data-anime><a class="bouton bouton--contour" href="${c.site.liens.cadeaux}" target="_blank" rel="noopener" aria-label="${c.s('reserver.cadeau.action')} ${c.s('commun.nouvelOnglet')}">${c.t('reserver.cadeau.action')}</a></p>
    </div>
  </div>
</section>
`;
};
