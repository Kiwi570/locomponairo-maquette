/* Page 404 : une clé seule qui n'ouvre aucune porte. Une seule version (langue par défaut). */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false, sansFil: true };

export default (c) => html`
<section class="introuvable" id="debut">
  <div class="conteneur introuvable-grille">
    ${c.media({ nom: 'grok/g-404', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable-photo', sizes: '(max-width: 760px) 92vw, 50vw', attrs: 'data-iris-centre data-fx="zoom" data-effet="cle-seule"' })}
    <div>
      <h1 data-anime="lettres">${c.t('introuvable.titre')}</h1>
      <p data-anime>${c.t('introuvable.texte')}</p>
      <p class="introuvable-actions" data-anime>${c.lien('accueil', { classe: 'bouton bouton--action', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })} ${c.lien('chambres', { classe: 'bouton bouton--contour', texte: c.t('introuvable.chambres') })}</p>
    </div>
  </div>
</section>
`;
