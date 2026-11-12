/* Réserver en direct : le tableau à clés de la réception (ouverture), la demande en trois étapes avec
   son récapitulatif ; la clé choisie quitte son crochet et file jusqu'au récapitulatif (retour physique) ;
   les dates au calendrier maison (les champs de date d'origine restent le secours sans script) ;
   à l'envoi, la fiche de réception : la clé remise avec sa pampille gravée, la photo de la chambre,
   les nuits en très grand, le tampon « Demande prête », puis le lien vers la vraie réservation sécurisée. */
import { html, brut } from '../../outils/gabarit.mjs';
import { cle } from '../gabarits/objets.mjs';

export const page = { cle: 'reserver', fichier: 'reserver', imagePartage: 'jardin-lauriers-1280.webp' };

/* Une vignette par choix : la chambre (la suite : la porte-fenêtre de Denise sur la terrasse). */
const VIGNETTES = { isabelle: 'isabelle-1', denise: 'denise-1', mathilde: 'mathilde-2', suzanne: 'suzanne-3', suite: 'denise-3' };
const cleSvg = () => brut(`<svg class="crochet-cle cle-laiton" viewBox="-34 34 68 150" aria-hidden="true" focusable="false">${cle()}</svg>`);
/* Fiche de réception : une grande photo par choix (une seule montrée), et la clé remise avec sa pampille de laiton
   gravée au prénom de la chambre (le prénom est écrit par le script). */
const FICHE = { isabelle: 'isabelle-1', denise: 'denise-1', mathilde: 'mathilde-2', suzanne: 'suzanne-1', suite: 'denise-3' };
const DROP = 'M0 0 C 16 2 28 36 28 76 C 28 110 16 130 0 130 C -16 130 -28 110 -28 76 C -28 36 -16 2 0 0 Z';
const cleFiche = () => brut(`<div class="fiche-cle" data-fiche-cle data-superpose aria-hidden="true"><svg class="cle-laiton fiche-cle-svg" viewBox="-30 32 116 186" focusable="false">
  <g class="fiche-pampille" transform="translate(10 72) rotate(-20)">
    <path class="fiche-olive" d="${DROP}" transform="translate(0 6)"/>
    <path class="fiche-olive-biseau" d="${DROP}" transform="translate(0 16) scale(.8)"/>
    <circle class="fiche-olive-trou" cx="0" cy="14" r="3.4"/>
    <text class="fiche-gravure fiche-gravure--reflet" transform="translate(.9 84) rotate(90)" text-anchor="middle" dominant-baseline="central" data-f="gravure"></text>
    <text class="fiche-gravure" transform="translate(0 84) rotate(90)" text-anchor="middle" dominant-baseline="central" data-f="gravure"></text>
    <circle class="cle-anneau fiche-maillon" cx="0" cy="6" r="8" fill="none" stroke-width="3"/>
  </g>
  ${cle()}
</svg></div>`);

export default (c) => {
  const ch = c.donnees.chambres;
  const choix = [...ch.map((x) => ({ cle: x.cle, nom: x.nom, detail: [x.etage, /confirmer|compl/.test(x.surface) ? '' : x.surface, x.lit].filter(Boolean).join(' · '), enfant: !!x.enfant })), { cle: 'suite', nom: 'Suite', detail: c.s('reserver.form.suite'), enfant: true }];
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
      <p class="demande-etapes" data-anime>${c.t('reserver.form.etapes')}</p>
      <fieldset class="demande-bloc" data-anime>
        <legend>1 · ${c.t('reserver.form.e1')}</legend>
        <div class="demande-chambres">
          ${choix.map((x, i) => html`<label class="choix-chambre"><input type="radio" name="chambre" value="${x.cle}" data-nom="${x.nom}" data-enfant="${x.enfant ? 'oui' : 'non'}"><span>${c.media({ nom: VIGNETTES[x.cle], alt: '', cadrage: '50% 50%', classe: 'choix-photo', sizes: '72px' })}<strong>${x.cle === 'suite' ? c.t('reserver.form.suite') : x.nom}</strong><small>${x.cle === 'suite' ? 'Isabelle + Denise · terrasse fleurie' : x.detail}</small></span></label>`)}
        </div>
        <p class="champ-erreur" id="err-chambre" data-erreur="chambre" hidden>${c.t('reserver.form.erreurChambre')}</p>
      </fieldset>
      <fieldset class="demande-bloc" data-anime>
        <legend>2 · ${c.t('reserver.form.e2')}</legend>
        <div class="calendrier" data-calendrier hidden>
          <div class="cal-billets">
            <p class="cal-billet" data-cal-billet="arrivee"><span>${c.t('reserver.form.arrivee')}</span><strong data-cal-val="arrivee">${c.t('reserver.form.calAChoisir')}</strong></p>
            <span class="cal-fleche" aria-hidden="true">→</span>
            <p class="cal-billet" data-cal-billet="depart"><span>${c.t('reserver.form.depart')}</span><strong data-cal-val="depart">${c.t('reserver.form.calAChoisir')}</strong></p>
            <p class="cal-nuits est-vide" data-cal-nuits></p>
          </div>
          <p class="cal-consigne" data-cal-consigne data-a="${c.s('reserver.form.calConsigneA')}" data-d="${c.s('reserver.form.calConsigneD')}">${c.t('reserver.form.calConsigneA')}</p>
          <div class="cal-corps" role="group" aria-label="${c.s('reserver.form.calGroupe')}" aria-describedby="err-dates">
            <button type="button" class="cal-nav cal-nav--prec" data-cal-prec aria-label="${c.s('reserver.form.calPrec')}">‹</button>
            <div class="cal-mois-liste" data-cal-mois></div>
            <button type="button" class="cal-nav cal-nav--suiv" data-cal-suiv aria-label="${c.s('reserver.form.calSuiv')}">›</button>
          </div>
          <p class="cal-pied"><button type="button" class="lien" data-cal-effacer>${c.t('reserver.form.calEffacer')}</button></p>
          <p class="visuellement-cache" aria-live="polite" data-cal-annonce></p>
        </div>
        <div class="demande-dates" data-dates-natives>
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
      <p class="demande-simule">${c.t('reserver.form.simule')}</p>
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
    </aside>
  </div>
</section>

<section class="fiche" id="fiche" data-fiche data-fil="droite" data-masque-barre hidden aria-labelledby="fiche-titre">
  <div class="conteneur">
    <article class="fiche-carte" data-effet="fiche-reception">
      <div class="fiche-visuel">
        ${Object.entries(FICHE).map(([k, nom]) => c.media({ nom, alt: k === 'suite' ? 'La suite : la porte-fenêtre de Denise sur la terrasse' : `La chambre ${k[0].toUpperCase() + k.slice(1)}`, classe: 'fiche-photo', sizes: '(max-width: 900px) 92vw, 42vw', attrs: `data-fiche-photo="${k}" hidden` }))}
        ${cleFiche()}
      </div>
      <div class="fiche-texte">
        <p class="surtitre">${c.t('reserver.fiche.sur')} · Lo Componaïro</p>
        <h2 class="fiche-titre" id="fiche-titre" tabindex="-1"><span class="fiche-titre-sur">${c.t('reserver.fiche.titre')}</span> <span data-f="chambre">—</span></h2>
        <p class="fiche-nuits"><strong data-f="nuits">0</strong> <span data-f="nuitsMot">nuits</span></p>
        <p class="fiche-dates" data-f="dates">—</p>
        <dl class="fiche-liste">
          <div><dt>${c.t('reserver.fiche.arrivee')}</dt><dd><span data-f="arrivee">—</span>, ${c.t('reserver.fiche.arriveeH')}</dd></div>
          <div><dt>${c.t('reserver.fiche.depart')}</dt><dd><span data-f="depart">—</span>, ${c.t('reserver.fiche.departH')}</dd></div>
          <div><dt>${c.t('reserver.fiche.voyageurs')}</dt><dd data-f="voyageurs">—</dd></div>
          <div><dt>${c.t('reserver.fiche.inclus')}</dt><dd>${c.t('reserver.fiche.inclusT')}</dd></div>
          <div><dt>${c.t('reserver.fiche.options')}</dt><dd data-f="options">—</dd></div>
          <div><dt>${c.t('reserver.fiche.taxe')}</dt><dd data-f="taxe" data-prix>—</dd></div>
          <div><dt>${c.t('reserver.fiche.annulation')}</dt><dd>${c.t('reserver.fiche.annulationT')}</dd></div>
          <div><dt>${c.t('reserver.fiche.prix')}</dt><dd class="a-completer">${c.t('reserver.fiche.prixT')}</dd></div>
        </dl>
        <p class="fiche-actions">
          <a class="bouton bouton--laiton" href="${c.site.liens.reservation}" target="_blank" rel="noopener" data-fiche-continuer aria-label="${c.s('reserver.fiche.continuer')} ${c.s('commun.nouvelOnglet')}">${c.t('reserver.fiche.continuer')}</a>
          <button type="button" class="lien" data-recommencer>${c.t('reserver.fiche.modifier')}</button>
        </p>
        <p class="demande-simule">${c.t('reserver.fiche.texte')}</p>
      </div>
      <span class="tampon-recu fiche-tampon" aria-hidden="true" data-superpose>${c.t('reserver.fiche.pret')}</span>
    </article>
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
