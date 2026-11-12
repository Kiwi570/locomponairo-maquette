/* Accueil (v3, après le regard du directeur artistique) : la vraie porte de la maison, qui s'ouvre sur la chambre
   choisie ; la vraie façade, éclairée étage par étage avec ses chambres ; la suite Isabelle + Denise ; ce qui est
   compris en direct et l'heure d'arrivée ; trois vrais sites des alentours ; l'appel final. Des photos du lieu en
   grand et la typographie Fraunces, un seul langage du haut en bas. Chaque section a son effet (contrôlé par l'audit). */
import { html, brut } from '../../outils/gabarit.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'porte-soir-1280.webp' };

/* Gravures des sites (traits SVG simples, un par site), reprises par la page Alentours. */
export const GRAVURES = {
  abbaye: '<path d="M30 92V52l20-16 20 16v40M50 36V18M44 24h12M40 92V70a10 10 0 0 1 20 0v22M10 92h80M14 92V64l16-10M86 92V64L70 54"/>',
  pont: '<path d="M6 70h88M10 70c8-30 32-30 40 0M50 70c8-30 32-30 40 0M30 70v22M70 70v22M6 92c20-6 30 4 44-2s30 6 44 0"/>',
  grotte: '<path d="M8 92c4-40 20-64 42-64s38 24 42 64M30 40l3 14 3-12 3 16 3-10M58 38l3 12 3-14 3 16M40 92l4-14 4 14M60 92l3-10 3 10"/>',
  lac: '<path d="M4 60c12-14 22-22 34-18s20 10 30 2 20-8 28 4M6 74c14 4 26-4 44 0s28 4 44-2M12 86c14 2 30-4 46 0s22 2 30 0"/><circle cx="74" cy="24" r="8"/>',
  cirque: '<path d="M6 30c12 50 76 50 88 0M18 34c10 34 54 34 64 0M30 40c8 18 32 18 40 0M44 52c4 6 8 6 12 0M50 58v20"/>',
  rochers: '<path d="M10 92V60c0-10 10-14 10-24s10-10 12 0 0 20 6 26v30M44 92V48c0-8 8-12 10-4s6 14 4 22v26M66 92V66c0-8 10-10 12-2s4 12 4 28M4 92h92"/>',
  masque: '<path d="M22 24c12-6 44-6 56 0 0 34-10 56-28 56S22 58 22 24zM34 42c4-4 10-4 14 0M52 42c4-4 10-4 14 0M38 62c8 6 16 6 24 0"/>',
  fontaine: '<path d="M20 92h60M28 92V80h44v12M50 80V44M36 56c4-10 24-10 28 0M42 44c2-8 14-8 16 0M50 30a6 6 0 1 0 0-12 6 6 0 0 0 0 12M38 80c-6-10-14-12-20-10M62 80c6-10 14-12 20-10"/>',
  phare: '<path d="M40 92l4-56h12l4 56M38 36h24M44 36v-10h12v10M50 26V18M30 22l-14-6M70 22l14-6M6 92c14-6 26 4 44-2s28 6 44 0"/>',
  porche: '<path d="M18 92V36h64v56M34 92V60a16 16 0 0 1 32 0v32M18 36l32-18 32 18M44 48h12"/>',
  remparts: '<path d="M6 92V44h12v-8h8v8h10v-8h8v8h12v-8h8v8h10v-8h8v8h12v48M40 92V72a10 10 0 0 1 20 0v20M6 92h88"/>',
  temple: '<path d="M14 92h72M24 92V70h52v22M30 70l20-22 20 22M40 48h20M50 48V30M44 36h12M50 30c-2-6 2-10 0-14"/>',
};
export const gravure = (k) => brut(`<svg class="gravure" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${GRAVURES[k] || ''}</g></svg>`);

/* Photos choisies pour chaque chambre : derrière la porte (porte-*), sur la façade (une autre vue, pas de répétition). */
const DERRIERE = { isabelle: 'porte-isabelle', denise: 'porte-denise', mathilde: 'porte-mathilde', suzanne: 'porte-suzanne' };
const FACADE = { isabelle: 'isabelle-4', denise: 'denise-2', mathilde: 'mathilde-1', suzanne: 'suzanne-1' };
/* Étages de la vraie façade (fractions de la hauteur de la photo facade-etages, relevées sur la photo). */
const ETAGES = [
  { cle: 'rdc', haut: 0.56, bas: 0.93, chambres: [], vue: 'vue-rdc' },
  { cle: 'e1', haut: 0.395, bas: 0.565, chambres: ['isabelle', 'denise'], vue: 'vue-1er' },
  { cle: 'e2', haut: 0.235, bas: 0.405, chambres: ['mathilde', 'suzanne'], vue: 'vue-2e' },
];

export default (c) => {
  const ch = c.donnees.chambres;
  const parCle = Object.fromEntries(ch.map((x) => [x.cle, x]));
  const premiere = ch[0];
  const surface = (x) => (/confirmer|compl/.test(x.surface) ? '' : x.surface);
  const detail = (x) => [x.etage, surface(x), x.terrasse ? 'terrasse' : '', x.vue.toLowerCase()].filter(Boolean).join(' · ');
  return html`
<section class="hero entree" id="debut">
  <div class="entree-grille conteneur">
    <div class="hero-texte entree-texte">
      <p class="surtitre hero-sur masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.sur')}</p>
      <h1 class="hero-titre"><span class="ligne-masque"><span class="hero-ligne" data-anime="gsap">${c.t('accueil.hero.titre1')}</span></span> <span class="ligne-masque"><span class="hero-ligne hero-ligne--b" data-anime="gsap">${c.t('accueil.hero.titre2')}</span></span></h1>
      <p class="hero-intro masque-ecran-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
      <div class="hero-actions" data-anime="gsap">
        ${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        ${c.lien('chambres', { classe: 'bouton bouton--contour', texte: c.t('accueil.hero.secondaire') })}
      </div>
      <p class="hero-info" data-info-cle data-anime="gsap"><span>${c.t('accueil.hero.infoTitre')}</span> ${c.t('accueil.hero.info')}</p>
      <ul class="hero-preuves masque-ecran-bas" data-anime="gsap" aria-label="${c.s('accueil.hero.preuvesTitre')}">
        <li><strong>9,5 / 10</strong> ${c.t('accueil.hero.preuve1')}</li><li>${c.t('accueil.hero.preuve2')}</li><li>${c.t('accueil.hero.preuve3')}</li>
      </ul>
    </div>
  </div>
  <div class="entree-porte" data-porte-entree data-effet="porte-entree" data-grille="manipuler" data-visuel>
    <div class="entree-scene" role="group" aria-label="${c.s('accueil.hero.porteRegion')}">
      <div class="entree-chambres">
        ${ch.map((x, i) => html`<div class="entree-chambre${i === 0 ? ' est-visible' : ''}" data-entree-chambre="${x.cle}">${c.media({ nom: DERRIERE[x.cle], alt: '', cadrage: '50% 55%', classe: 'entree-photo', sizes: '(max-width: 760px) 100vw, 50vw' })}</div>`)}
      </div>
      <span class="entree-lumiere" aria-hidden="true"></span>
      <span class="entree-portee" aria-hidden="true"></span>
      <div class="entree-battant" data-entree-battant data-iris-centre>
        <div class="entree-souffle">
          ${c.media({ nom: 'porte-soir', alt: c.s('accueil.hero.porteAlt'), cadrage: '62% 42%', classe: 'entree-photo', sizes: '(max-width: 760px) 100vw, 50vw', priorite: true })}
          <span class="entree-ombre" aria-hidden="true"></span>
        </div>
      </div>
    </div>
    <div class="entree-choix">
      <p class="entree-question">${c.t('accueil.hero.porteQuestion')}</p>
      <div class="entree-boutons" role="group" aria-label="${c.s('accueil.hero.porteQuestion')}">
        ${ch.map((x, i) => html`<button type="button" data-entree-choix="${x.cle}" data-nom="${x.nom}" data-detail="${detail(x)}" data-lien="${c.url('chambres', x.cle)}" aria-pressed="${i === 0 ? 'true' : 'false'}">${x.nom}</button>`)}
      </div>
      <p class="entree-legende" aria-live="polite"><strong data-entree-nom>${premiere.nom}</strong> <span data-entree-detail>${detail(premiere)}</span> <a href="${c.url('chambres', premiere.cle)}" data-entree-lien data-libelle="${c.libelle('chambres')}">${c.t('accueil.chambres.voir')} →</a></p>
    </div>
  </div>
</section>

<section class="facade" id="maison" data-grille="scene" data-effet="facade-etages" data-scene data-fil="gauche">
  <div class="facade-grille conteneur">
    <div class="facade-visuel" data-facade-visuel data-visuel>
      ${c.media({ nom: 'facade-etages', alt: c.s('accueil.maison.alt'), cadrage: '50% 50%', classe: 'facade-photo', sizes: '(max-width: 760px) 100vw, 55vw' })}
      <span class="facade-lueur" data-facade-lueur aria-hidden="true"></span><span class="facade-nuit facade-nuit--haut" data-nuit-haut aria-hidden="true"></span><span class="facade-nuit facade-nuit--bas" data-nuit-bas aria-hidden="true"></span>
      ${ETAGES.map((e) => html`<p class="facade-repere" data-facade-repere="${e.cle}" style="--y:${((e.haut + e.bas) / 2 * 100).toFixed(1)}%" aria-hidden="true"><span>${c.t('accueil.maison.' + e.cle + 'Repere')}</span></p>`)}
    </div>
    <div class="facade-texte">
      <div class="facade-intro" data-facade-etape="tout">
        <p class="surtitre" data-anime>${c.t('accueil.maison.sur')}</p>
        <h2 class="titre-axes" data-grille="typo" data-effet="axes" data-axes>${c.t('accueil.maison.titre')}</h2>
        <p class="manifeste" data-manifeste data-effet="manifeste">${c.t('accueil.maison.manifeste')}</p>
      </div>
      ${ETAGES.map((e) => html`<div class="facade-etage" data-facade-etape="${e.cle}" data-haut="${e.haut}" data-bas="${e.bas}">
        <p class="facade-niveau">${c.t('accueil.maison.' + e.cle)}</p>
        ${c.media({ nom: e.vue, alt: c.s('accueil.maison.' + e.cle + 'Vue'), cadrage: '50% 50%', classe: 'facade-vue', sizes: '(max-width: 760px) 92vw, 36vw' })}
        <p class="facade-phrase">${c.t('accueil.maison.' + e.cle + 'Texte')}</p>
        ${e.chambres.length ? html`<ul class="facade-chambres">${e.chambres.map((k) => { const x = parCle[k]; return html`<li>
          <a href="${c.url('chambres', x.cle)}" data-libelle="${c.libelle('chambres')}" class="facade-chambre">
            ${c.media({ nom: FACADE[x.cle], alt: '', cadrage: '50% 50%', classe: 'facade-chambre-photo', sizes: '(max-width: 760px) 44vw, 16vw' })}
            <span class="facade-chambre-nom">${x.nom}</span>
            <span class="facade-chambre-infos">${[surface(x), x.vue.toLowerCase(), x.terrasse ? 'terrasse' : ''].filter(Boolean).join(' · ')}</span>
          </a></li>`; })}</ul>`
        : ''}
      </div>`)}
    </div>
  </div>
</section>

<section class="duo" id="suite" data-fil="droite">
  <div class="duo-photos" data-duo data-effet="duo" data-visuel>
    ${c.media({ nom: 'isabelle-2', alt: c.s('accueil.suite.altG'), cadrage: '50% 55%', classe: 'duo-photo duo-photo--g', sizes: '(max-width: 760px) 50vw, 40vw', attrs: 'data-duo-g' })}
    ${c.media({ nom: 'denise-3', alt: c.s('accueil.suite.altD'), cadrage: '50% 50%', classe: 'duo-photo duo-photo--d', sizes: '(max-width: 760px) 50vw, 40vw', attrs: 'data-duo-d' })}
  </div>
  <p class="duo-mots" aria-hidden="true" data-grille="typo" data-audit-ignorer><span data-duo-mot="g">${c.t('accueil.suite.gauche')}</span><span class="duo-plus" data-duo-plus>+</span><span data-duo-mot="d">${c.t('accueil.suite.droite')}</span></p>
  <div class="duo-texte conteneur">
    <p class="surtitre" data-anime>${c.t('accueil.suite.sur')}</p>
    <h2 data-anime="lignes">${c.t('accueil.suite.titre')}</h2>
    <p data-anime>${c.t('accueil.suite.texte')}</p>
    <p data-anime>${c.lien('reserver', { params: 'chambre=suite', classe: 'bouton bouton--action', texte: c.t('accueil.suite.action') })}</p>
  </div>
</section>

<section class="direct" id="inclus" data-fil="gauche">
  <div class="conteneur direct-grille">
    <div class="direct-texte">
      <p class="surtitre" data-anime>${c.t('accueil.inclus.sur')}</p>
      <h2 data-anime="lignes">${c.t('accueil.inclus.titre')}</h2>
      <p class="direct-chapo" data-anime>${c.t('accueil.inclus.texte')}</p>
      <ol class="direct-liste" data-direct data-effet="compris">
        ${[1, 2, 3, 4].map((i) => html`<li><span class="direct-mot">${c.t('accueil.inclus.t' + i)}</span><span class="direct-detail">${c.t('accueil.inclus.d' + i)}</span><span class="direct-inclus">${c.t('accueil.inclus.tampon')}</span></li>`)}
      </ol>
      <p class="direct-prix">${c.t('accueil.inclus.prix')}</p>
      <div class="direct-arrivee">
        <p class="direct-horaires">${c.t('accueil.inclus.horaires')}</p>
        <p class="soir-statut" data-statut-arrivee data-ouvert="${c.s('accueil.soir.ouvert')}" data-avant="${c.s('accueil.soir.avant')}" data-apres="${c.s('accueil.soir.apres')}" aria-live="polite"><span data-heure-pouzols></span></p>
        <p><a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('accueil.soir.appeler')} · ${c.site.contact.telephone}</a></p>
      </div>
    </div>
    <div class="direct-visuel">
      ${c.media({ nom: 'petit-dejeuner-table', alt: 'Table du petit-déjeuner vue d’en haut, nappe fleurie et coussins verts', cadrage: '50% 50%', classe: 'direct-photo', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    </div>
  </div>
</section>

<section class="horizons" id="alentours" data-fil="droite">
  <div class="conteneur">
    ${c.media({ nom: 'site-pont-diable', alt: c.s('accueil.alentours.pont-diableAlt'), cadrage: '50% 62%', classe: 'horizons-photo', sizes: '(max-width: 760px) 100vw, 1280px', legende: c.t('accueil.alentours.legende'), attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    <div class="horizons-grille">
      <div class="horizons-tete">
        <p class="surtitre" data-anime>${c.t('accueil.alentours.sur')}</p>
        <h2 data-anime="lettres">${c.t('accueil.alentours.titre')}</h2>
        <p data-anime>${c.t('accueil.alentours.texte')}</p>
        <p data-anime>${c.lien('alentours', { classe: 'bouton bouton--contour', texte: c.t('accueil.alentours.tous') })}</p>
      </div>
      <ol class="horizons-trajets" data-direct data-effet="trajets">
        ${[1, 2, 3, 4].map((i) => html`<li><span class="trajet-lieu">${c.t('accueil.alentours.t' + i)}</span><span class="trajet-temps">${c.t('accueil.alentours.t' + i + 'd')}</span></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="fin" id="fin" data-fil="gauche">
  <div class="conteneur fin-grille">
    ${c.media({ nom: 'escalier', alt: 'Escalier aux murs rouges et aux carreaux de ciment qui monte aux chambres', cadrage: '58% 78%', classe: 'fin-photo', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div class="fin-texte">
      <h2 data-anime="lettres">${c.t('accueil.fin.titre')}</h2>
      <p data-anime>${c.t('accueil.fin.texte')}</p>
      <p class="fin-actions" data-anime>
        ${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('accueil.fin.action'), attrs: 'data-survol="magnetique"' })}
        <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('accueil.fin.appel')}</a>
      </p>
      <p class="fin-avis" data-anime><a href="${c.site.liens.tripadvisor}" target="_blank" rel="noopener" aria-label="${c.s('accueil.distinctions.avis')} ${c.s('commun.nouvelOnglet')}">${c.t('accueil.distinctions.avis')} →</a></p>
    </div>
  </div>
</section>
`;
};

/* Cadran 24 h : arcs des horaires réels (petit-déjeuner, arrivée anticipée, arrivée, clés, garage, départ). */
export function cadran({ grand = false } = {}) {
  const R = 150, cx = 180, cy = 180;
  const pt = (h, r) => { const a = (h / 24) * 2 * Math.PI - Math.PI / 2; return [(cx + r * Math.cos(a)).toFixed(1), (cy + r * Math.sin(a)).toFixed(1)]; };
  const arc = (h1, h2, r, cls) => { const [x1, y1] = pt(h1, r), [x2, y2] = pt(h2, r), grandArc = (h2 - h1) > 12 ? 1 : 0; return `<path class="${cls}" d="M${x1} ${y1} A${r} ${r} 0 ${grandArc} 1 ${x2} ${y2}"/>`; };
  let graduations = '';
  for (let h = 0; h < 24; h++) { const [x1, y1] = pt(h, R + 6), [x2, y2] = pt(h, R + (h % 6 ? 14 : 22)); graduations += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; }
  const chiffres = [0, 6, 12, 18].map((h) => { const [x, y] = pt(h, R - 28); return `<text x="${x}" y="${y}" dy="6" text-anchor="middle">${h} h</text>`; }).join('');
  const etiq = (h, r, t) => { const [x, y] = pt(h, r); return `<text class="cadran-etiquette" x="${x}" y="${y}" dy="5" text-anchor="middle">${t}</text>`; };
  return brut(`<svg class="cadran${grand ? ' cadran--grand' : ''}" viewBox="0 0 360 360" aria-hidden="true" focusable="false" data-audit-ignorer>
  <circle class="cadran-fond" cx="${cx}" cy="${cy}" r="${R + 26}"/>
  <g class="cadran-graduations">${graduations}</g>
  ${arc(8.5, 10, R - 4, 'cadran-arc cadran-arc--matin')}
  ${arc(14.5, 16.5, R - 4, 'cadran-arc cadran-arc--option')}
  ${arc(17, 20.5, R - 4, 'cadran-arc cadran-arc--arrivee')}
  ${arc(20.5, 22, R - 4, 'cadran-arc cadran-arc--cles')}
  ${arc(22, 23, R - 4, 'cadran-arc cadran-arc--garage')}
  <circle class="cadran-depart" cx="${pt(11, R - 4)[0]}" cy="${pt(11, R - 4)[1]}" r="7"/>
  <g class="cadran-chiffres">${chiffres}</g>
  ${etiq(8.6, R - 62, 'Petit-déj.')}${etiq(11.2, R - 74, 'Départ')}${etiq(15.5, R - 62, 'Option')}${etiq(18.7, R - 62, 'Arrivée')}${etiq(22.4, R - 66, 'Clés')}
  <g data-aiguille-balai><g class="cadran-aiguille" data-aiguille><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - R + 18}"/><circle cx="${cx}" cy="${cy - R + 18}" r="6"/></g></g>
  <circle class="cadran-centre" cx="${cx}" cy="${cy}" r="9"/>
</svg>`);
}
