/* Accueil : le trousseau à faire tourner, la maison de 1850, la maison en coupe 3D, les quatre chambres,
   la suite familiale en plein écran, ce qui est inclus en direct, l'arrivée du soir, les distinctions,
   la ronde des sites et l'appel final. Chaque section a son effet au défilement (contrôlé par l'audit). */
import { html, brut } from '../../outils/gabarit.mjs';
import { trousseau } from '../gabarits/objets.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'maison-facade-1280.webp' };

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

/* Maison vigneronne en boîtes 3D : rez-de-chaussée et garage, 1er étage et terrasses, 2e étage sous les poutres, toit. */
const boite = (st, cls = '', nom = '') => `<div class="o3d__boite${cls}" style="${st}"><i class="o3d__f o3d__f--av">${nom ? `<span>${nom}</span>` : ''}</i><i class="o3d__f o3d__f--ar"></i><i class="o3d__f o3d__f--g"></i><i class="o3d__f o3d__f--d"></i><i class="o3d__f o3d__f--haut"></i></div>`;
const maison3d = brut(`<div class="o3d__objet" aria-hidden="true" data-audit-ignorer>
  <div class="o3d__sol"></div>
  <div class="o3d__piece o3d__piece--interieur" data-de=".22" data-a=".42">${boite('--l:206px;--p:200px;--h:96px;--x:-110px;--y:122px', ' o3d__boite--chambre o3d__boite--isabelle', 'Isabelle')}${boite('--l:206px;--p:200px;--h:96px;--x:110px;--y:122px', ' o3d__boite--chambre o3d__boite--denise', 'Denise')}</div>
  <div class="o3d__piece o3d__piece--interieur" data-de=".46" data-a=".66">${boite('--l:206px;--p:200px;--h:84px;--x:-110px;--y:226px', ' o3d__boite--chambre o3d__boite--mathilde', 'Mathilde')}${boite('--l:206px;--p:200px;--h:84px;--x:110px;--y:226px', ' o3d__boite--chambre o3d__boite--suzanne', 'Suzanne')}</div>
  <div class="o3d__piece" data-de="-.14" data-a=".14">${boite('--l:440px;--p:230px;--h:118px;--y:0px', ' o3d__boite--rdc')}</div>
  <div class="o3d__piece o3d__piece--facade" data-de=".22" data-a=".42">${boite('--l:440px;--p:230px;--h:104px;--y:118px', ' o3d__boite--etage1')}${boite('--l:96px;--p:150px;--h:10px;--x:-268px;--y:118px', ' o3d__boite--terrasse')}${boite('--l:96px;--p:150px;--h:10px;--x:268px;--y:118px', ' o3d__boite--terrasse')}</div>
  <div class="o3d__piece o3d__piece--facade" data-de=".46" data-a=".66">${boite('--l:440px;--p:230px;--h:92px;--y:222px', ' o3d__boite--etage2')}</div>
  <div class="o3d__piece o3d__piece--toit" data-de=".64" data-a=".8" style="--o3d-chute:-360px">${boite('--l:440px;--p:230px;--h:64px;--y:314px', ' o3d__boite--pignon')}${boite('--l:238px;--p:252px;--h:8px;--x:-111px;--y:342px;--rz:-16deg', ' o3d__boite--toit')}${boite('--l:238px;--p:252px;--h:8px;--x:111px;--y:342px;--rz:16deg', ' o3d__boite--toit')}</div>
</div>`);

export default (c) => {
  const ch = c.donnees.chambres;
  const premiere = ch[0];
  const detail = (x) => [x.etage, x.surface, x.terrasse ? 'terrasse' : '', x.vue.toLowerCase()].filter(Boolean).join(' · ');
  const sites = c.donnees.alentours.slice(0, 10);
  return html`
<section class="hero" id="debut">
  <div class="hero-soleil" data-soleil-pointeur data-effet="soleil" data-souris aria-hidden="true" data-audit-ignorer></div>
  ${c.media({ nom: 'maison-facade', alt: c.s('pages.accueil.partageAlt'), cadrage: '49% 50%', cadrageMobile: '46% 50%', priorite: true, classe: 'hero-photo', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="hero-grille conteneur">
    <div class="hero-texte">
      <p class="surtitre hero-sur masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.sur')}</p>
      <h1 class="hero-titre"><span class="ligne-masque"><span class="hero-ligne" data-anime="gsap">${c.t('accueil.hero.titre1')}</span></span><span class="ligne-masque"><span class="hero-ligne hero-ligne--b" data-anime="gsap">${c.t('accueil.hero.titre2')}</span></span></h1>
      <p class="hero-intro masque-ecran-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
      <div class="hero-actions" data-anime="gsap">
        ${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        ${c.lien('chambres', { classe: 'bouton bouton--clair', texte: c.t('accueil.hero.secondaire') })}
      </div>
      <p class="hero-info" data-info-cle data-anime="gsap"><span>${c.t('accueil.hero.infoTitre')}</span> ${c.t('accueil.hero.info')}</p>
    </div>
    <div class="hero-trousseau">
      <div class="oat trousseau" data-trousseau data-grille="manipuler" data-effet="trousseau" data-souris data-iris-centre="disque" role="img" aria-label="${c.s('accueil.hero.objet')}">
        <div class="oat__objet"><div class="trousseau-plaque">${trousseau(ch)}</div></div>
        <span class="oat__reflet" aria-hidden="true"></span>
        <p class="oat__indice" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/></svg>${c.t('accueil.hero.indice')}</p>
      </div>
      <div class="trousseau-legende" aria-live="polite">
        <p class="trousseau-nom"><span>${c.t('accueil.hero.cle')}</span> <strong data-trousseau-nom>${premiere.nom}</strong></p>
        <p class="trousseau-detail" data-trousseau-detail>${detail(premiere)}</p>
      </div>
      <div class="trousseau-choix" role="group" aria-label="${c.s('accueil.hero.objet')}">
        ${ch.map((x, i) => html`<button type="button" data-trousseau-choix="${i}" data-nom="${x.nom}" data-detail="${detail(x)}" aria-pressed="${i === 0 ? 'true' : 'false'}">${x.nom}</button>`)}
      </div>
    </div>
  </div>
</section>

<section class="maison" id="maison" data-fil="gauche">
  <div class="conteneur maison-grille">
    <div class="maison-texte">
      <p class="surtitre" data-anime>${c.t('accueil.maison.sur')}</p>
      <h2 class="titre-axes" data-grille="typo" data-effet="axes" data-axes>${c.t('accueil.maison.titre')}</h2>
      <p class="manifeste" data-manifeste data-effet="manifeste">${c.t('accueil.maison.manifeste')}</p>
      <p class="maison-note" data-anime>${c.t('accueil.maison.texte')}</p>
    </div>
    <div class="maison-photos">
      ${c.media({ nom: 'maison-allee', alt: 'Allée de gravier bordée de céanothes en fleurs jusqu’à la maison', cadrage: '53% 40%', classe: 'maison-allee', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
      ${c.media({ nom: 'escalier', alt: 'Escalier aux murs rouges et aux carreaux de ciment qui monte aux chambres', cadrage: '58% 40%', classe: 'maison-escalier', sizes: '(max-width: 760px) 60vw, 22vw', attrs: 'data-fx="parallaxe" data-fx-force="14"' })}
    </div>
  </div>
</section>

<section class="vignes-bande" id="vignes">
  ${c.media({ nom: 'grok/g-vignes', alt: 'Vignes en terrasses et garrigue dans la lumière du soir', cadrage: '50% 60%', classe: 'vignes-photo', sizes: '100vw', attrs: 'data-fx="onde" data-fx-force="1.4"' })}
  <p class="vignes-legende conteneur" data-anime="mots">Entre vignes et garrigue, à 7 km de Gignac.</p>
</section>

<section class="o3d coupe" id="coupe" data-grille="scene" data-effet="maison-coupe" data-scene aria-labelledby="coupe-titre">
  <div class="o3d__cadre conteneur">
    <div class="o3d__texte">
      <p class="surtitre">${c.t('accueil.coupe.sur')}</p>
      <h2 class="o3d__titre" id="coupe-titre">${c.t('accueil.coupe.titre')}</h2>
      <p class="o3d__intro masque-ecran-bas">${c.t('accueil.coupe.intro')}</p>
    </div>
    <div class="o3d__scene" data-visuel tabindex="0" role="region" aria-label="${c.s('accueil.coupe.region')}">
      ${maison3d}
      <p class="o3d__indice" aria-hidden="true">${c.t('accueil.coupe.indice')}</p>
      <p class="schema-mention">${c.t('commun.schema')}</p>
    </div>
    <ol class="o3d__etapes">
      <li data-de="0"><div><strong>${c.t('accueil.coupe.e1')}</strong><span>${c.t('accueil.coupe.e1t')}</span></div></li>
      <li data-de=".24"><div><strong>${c.t('accueil.coupe.e2')}</strong><span>${c.t('accueil.coupe.e2t')}</span></div></li>
      <li data-de=".48"><div><strong>${c.t('accueil.coupe.e3')}</strong><span>${c.t('accueil.coupe.e3t')}</span></div></li>
      <li data-de=".64"><div><strong>${c.t('accueil.coupe.e4')}</strong><span>${c.t('accueil.coupe.e4t')}</span></div></li>
      <li data-de=".84"><div><strong>${c.t('accueil.coupe.e5')}</strong><span>${c.t('accueil.coupe.e5t')}</span></div></li>
    </ol>
  </div>
</section>

<section class="chambres-accueil" id="chambres" data-fil="droite">
  <div class="prenoms-geants" data-fx="mots-geants" aria-hidden="true" data-ruban data-visuel data-audit-ignorer>
    <p data-fx-rangee>Isabelle · Denise · Mathilde · Suzanne · Isabelle · Denise · Mathilde ·</p>
    <p data-fx-rangee data-sens="-1">Suzanne · Mathilde · Denise · Isabelle · Suzanne · Mathilde · Denise ·</p>
  </div>
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.chambres.sur')}</p>
      <h2 data-anime="lettres">${c.t('accueil.chambres.titre')}</h2>
      <p data-anime>${c.t('accueil.chambres.texte')}</p>
    </div>
    <ul class="cartes-chambres">
      ${ch.map((x) => html`<li class="carte-chambre" id="carte-${x.cle}">
        <a href="${c.url('chambres', x.cle)}" data-libelle="${c.libelle('chambres')}" class="carte-chambre-lien" aria-label="${c.s('accueil.chambres.voir')} ${x.nom}">
          ${c.media({ nom: x.photos[0], alt: '', cadrage: '50% 45%', classe: 'carte-chambre-photo', sizes: '(max-width: 760px) 86vw, (max-width: 1100px) 44vw, 23vw', attrs: 'data-fx="vitesse" data-fx-force="4"' })}
          <svg class="etiquette-plume" viewBox="0 0 220 64" aria-hidden="true" data-plume data-effet="etiquette-plume" data-grille="typo"><path class="etiquette-plume-papier" d="M2 32 L22 6 H210 a8 8 0 0 1 8 8 V50 a8 8 0 0 1 -8 8 H22 Z"/><circle cx="20" cy="32" r="5" class="etiquette-plume-trou"/><text x="120" y="44" text-anchor="middle">${x.nom}</text></svg>
          <span class="carte-chambre-nom">${x.nom}</span>
          <span class="carte-chambre-infos"><span>${x.etage}</span><span>${x.surface}</span><span>${x.vue}</span></span>
          <span class="carte-chambre-dit">${x.dit}</span>
          <span class="carte-chambre-voir">${c.t('accueil.chambres.voir')} →</span>
        </a>
      </li>`)}
    </ul>
    <p class="centre" data-anime>${c.lien('chambres', { ancre: 'comparer', classe: 'bouton bouton--contour', texte: c.t('accueil.chambres.toutes') })}</p>
  </div>
</section>

<section class="suite" id="suite" data-fx="plein-ecran" style="--fx-longueur:230svh">
  <div data-collant>
    ${c.media({ nom: 'terrasse-etage', alt: 'Terrasse d’une chambre du premier étage : canapé, table et chaises au soleil', cadrage: '54% 54%', classe: 'suite-photo', sizes: '100vw' })}
    <div class="suite-mots" aria-hidden="true" data-superpose data-audit-ignorer><span data-fx-ecarte="g">${c.t('accueil.suite.gauche')}</span><span data-fx-ecarte="d">${c.t('accueil.suite.droite')}</span></div>
    <div class="suite-texte conteneur"><div data-fx-apres>
      <p class="surtitre">${c.t('accueil.suite.sur')}</p>
      <h2>${c.t('accueil.suite.titre')}</h2>
      <p class="masque-ecran-tres-bas">${c.t('accueil.suite.texte')}</p>
      <p>${c.lien('reserver', { params: 'chambre=suite', classe: 'bouton bouton--action', texte: c.t('accueil.suite.action') })}</p>
    </div></div>
  </div>
</section>

<section class="inclus" id="inclus" data-fil="gauche">
  <div class="conteneur inclus-grille">
    <div class="inclus-texte">
      <p class="surtitre" data-anime>${c.t('accueil.inclus.sur')}</p>
      <h2 data-anime="lignes">${c.t('accueil.inclus.titre')}</h2>
      <p data-anime>${c.t('accueil.inclus.texte')}</p>
      <ul class="inclus-liste" data-tampons data-effet="tampons">
        ${[1, 2, 3, 4].map((i) => html`<li><span class="inclus-tampon" aria-hidden="true">${c.t('accueil.inclus.tampon')}</span><strong>${c.t('accueil.inclus.t' + i)}</strong><span>${c.t('accueil.inclus.d' + i)}</span></li>`)}
      </ul>
    </div>
    <div class="inclus-photos">
      ${c.media({ nom: 'petit-dejeuner-table', alt: 'Table du petit-déjeuner vue d’en haut, nappe fleurie et coussins verts', classe: 'inclus-photo-a', sizes: '(max-width: 760px) 80vw, 30vw', attrs: 'data-anime="rideau"' })}
      ${c.media({ nom: 'garage', alt: 'Garage voûté et fermé de la maison', classe: 'inclus-photo-b', sizes: '(max-width: 760px) 50vw, 18vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
    </div>
  </div>
</section>

<section class="soir" id="ce-soir" data-fil="droite">
  <div class="conteneur soir-grille">
    <div class="soir-cadran" data-cadran data-effet="cadran-journee" role="img" aria-label="${c.s('sejour.tete.cadran')}">
      ${cadran()}
    </div>
    <div class="soir-texte">
      <p class="surtitre" data-anime>${c.t('accueil.soir.sur')}</p>
      <h2 data-anime="lignes">${c.t('accueil.soir.titre')}</h2>
      <p class="soir-statut" data-statut-arrivee data-ouvert="${c.s('accueil.soir.ouvert')}" data-avant="${c.s('accueil.soir.avant')}" data-apres="${c.s('accueil.soir.apres')}" aria-live="polite"><span data-heure-pouzols></span></p>
      <p data-anime>${c.t('accueil.soir.texte')}</p>
      <p data-anime><a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('accueil.soir.appeler')} · ${c.site.contact.telephone}</a></p>
    </div>
  </div>
</section>

<section class="distinctions" id="distinctions">
  <div class="conteneur">
    <h2 class="distinctions-titre" data-anime="mots">${c.t('accueil.distinctions.titre')}</h2>
    <ul class="plaques" data-anime="cascade" data-visuel>
      ${[1, 2, 3, 4, 5].map((i) => html`<li class="plaque"><strong>${c.t('accueil.distinctions.p' + i)}</strong><span>${c.t('accueil.distinctions.p' + i + 't')}</span></li>`)}
    </ul>
    <p class="distinctions-avis" data-anime><a href="${c.site.liens.tripadvisor}" target="_blank" rel="noopener" aria-label="${c.s('accueil.distinctions.avis')} ${c.s('commun.nouvelOnglet')}">${c.t('accueil.distinctions.avis')}</a></p>
    <p class="distinctions-avis a-completer" data-anime>${c.t('accueil.distinctions.note')}</p>
  </div>
</section>

<section class="ronde" id="alentours" data-fil="gauche">
  <div class="conteneur ronde-tete">
    <p class="surtitre" data-anime>${c.t('accueil.alentours.sur')}</p>
    <h2 data-anime="lettres">${c.t('accueil.alentours.titre')}</h2>
    <p data-anime>${c.t('accueil.alentours.texte')}</p>
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
  <p class="centre" data-anime>${c.lien('alentours', { classe: 'bouton bouton--contour', texte: c.t('accueil.alentours.tous') })}</p>
</section>

<section class="fin" id="fin" data-fil="droite">
  <div class="conteneur fin-grille">
    ${c.media({ nom: 'maison-porte', alt: 'Porte d’entrée en bois dans le mur de pierre', cadrage: '49% 50%', classe: 'fin-photo', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-anime="rideau"' })}
    <div class="fin-texte">
      <h2 data-anime="lettres">${c.t('accueil.fin.titre')}</h2>
      <p data-anime>${c.t('accueil.fin.texte')}</p>
      <p class="fin-actions" data-anime>
        ${c.lien('reserver', { classe: 'bouton bouton--action', texte: c.t('accueil.fin.action'), attrs: 'data-survol="magnetique"' })}
        <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('accueil.fin.appel')}</a>
      </p>
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
