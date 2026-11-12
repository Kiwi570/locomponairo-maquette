/* Parcours propres au projet Lo Componaïro : la réservation (calendrier maison et fiche de réception).
   Au doigt sur téléphone (320 et 390 px) et au clavier sur ordinateur (1366 × 768) :
   choix de la chambre, arrivée puis départ au calendrier, nombre de nuits, taxe de séjour vérifiée par le calcul,
   fiche de réception affichée et à l'écran, erreurs, modification de la demande, dates effacées. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  const PAGE = '/reserver';
  const lieu = (taille) => ({ page: PAGE, taille, mode: 'normal' });
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dans = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
  const etat = (page) => page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const fiche = q('[data-fiche]'), r = fiche.getBoundingClientRect(), bouton = q('[data-fiche-continuer]').getBoundingClientRect();
    return {
      arr: q('#r-arrivee').value, dep: q('#r-depart').value, pastille: q('[data-cal-nuits]').textContent.trim(),
      recapNuits: q('[data-r="nuits"]').textContent.trim(), taxe: q('[data-r="taxe"]').textContent.trim(),
      ficheCachee: fiche.hidden, ficheHaut: Math.round(r.top), boutonBas: Math.round(bouton.bottom), vh: innerHeight,
      nuits: q('[data-f="nuits"]').textContent.trim(), gravure: q('[data-f="gravure"]').textContent.trim(),
      lien: q('[data-fiche-continuer]').href, focus: document.activeElement && document.activeElement.id,
      erreurDates: !q('[data-erreur="dates"]').hidden, focusJour: document.activeElement && document.activeElement.dataset.jour,
    };
  });
  async function cliquerJour(page, jour) {
    for (let k = 0; k < 4 && !(await page.$(`[data-jour="${jour}"]`)); k++) { await page.click('[data-cal-suiv]'); await attendre(120); }
    await page.click(`[data-jour="${jour}"]`);
    await attendre(150);
  }

  /* 1. Au doigt, sur deux téléphones. */
  for (const nom of ['390×844', '320×568']) {
    const taille = T(nom);
    const { ctx, page } = await contexte({ taille });
    try {
      await page.goto(BASE + PAGE, { waitUntil: 'load' });
      await attendrePret(page);
      const debut = await page.evaluate(() => ({
        cal: !document.querySelector('[data-calendrier]').hidden, natifs: document.querySelector('[data-dates-natives]').hidden,
        arrets: [...document.querySelectorAll('.cal-jour')].filter((b) => b.tabIndex === 0).length,
        petits: [...document.querySelectorAll('.cal-jour:not([disabled]), .cal-nav:not([disabled])')].filter((b) => { const r = b.getBoundingClientRect(); return r.width < 43.5 || r.height < 43.5; }).length,
        deborde: document.documentElement.scrollWidth > innerWidth + 1,
      }));
      if (!debut.cal || !debut.natifs) R.echec('réservation', 'le calendrier maison ne remplace pas les champs de date', { ...lieu(nom), selecteur: '[data-calendrier]' });
      if (debut.arrets !== 1) R.echec('réservation', `${debut.arrets} jours dans l’ordre de tabulation au lieu d’un seul`, { ...lieu(nom), selecteur: '.cal-jour' });
      if (debut.petits) R.echec('réservation', `${debut.petits} jours ou flèches du calendrier sous 44 px`, { ...lieu(nom), selecteur: '.cal-jour' });
      if (debut.deborde) R.echec('réservation', 'la page déborde en largeur avec le calendrier', lieu(nom));
      await page.evaluate(() => document.querySelector('#demande').scrollIntoView({ block: 'start' }));
      await attendre(500);
      await page.click('label.choix-chambre:has(input[value="isabelle"])');
      await attendre(300);
      const a = dans(12), d = dans(15);
      await cliquerJour(page, a);
      await cliquerJour(page, d);
      let e = await etat(page);
      if (e.arr !== a || e.dep !== d) R.echec('réservation', `dates enregistrées ${e.arr} → ${e.dep} au lieu de ${a} → ${d}`, lieu(nom));
      if (e.pastille !== '3 nuits' || e.recapNuits !== '3') R.echec('réservation', `nuits affichées « ${e.pastille} » et « ${e.recapNuits} » au lieu de 3`, lieu(nom));
      if (!e.taxe.startsWith('6,48')) R.echec('réservation', `taxe de séjour « ${e.taxe} » au lieu de 6,48 € (2 × 3 × 1,08 €)`, lieu(nom));
      await page.click('form[data-reservation] button[type="submit"]');
      await attendre(1900);
      e = await etat(page);
      if (e.ficheCachee) R.echec('réservation', 'la fiche de réception ne s’affiche pas à l’envoi', { ...lieu(nom), selecteur: '[data-fiche]' });
      else {
        if (e.ficheHaut < -40 || e.ficheHaut > e.vh * 0.3) R.echec('réservation', `la page ne descend pas jusqu’à la fiche (haut de la fiche à ${e.ficheHaut} px)`, { ...lieu(nom), selecteur: '[data-fiche]' });
        if (e.nuits !== '3' || e.gravure !== 'Isabelle') R.echec('réservation', `fiche : « ${e.nuits} » nuits, pampille « ${e.gravure} »`, { ...lieu(nom), selecteur: '[data-fiche]' });
        if (e.focus !== 'fiche-titre') R.echec('réservation', 'le focus ne passe pas au titre de la fiche', { ...lieu(nom), selecteur: '#fiche-titre' });
        if (!/eviivo/.test(e.lien)) R.echec('réservation', 'le bouton de la fiche ne mène pas à la réservation sécurisée', { ...lieu(nom), selecteur: '[data-fiche-continuer]' });
      }
      /* Modifier la demande : retour au formulaire ; effacer les dates referme la fiche. */
      await page.click('[data-fiche] [data-recommencer]');
      await attendre(1200);
      await page.click('[data-cal-effacer]');
      await attendre(300);
      e = await etat(page);
      if (!e.ficheCachee) R.echec('réservation', 'la fiche reste ouverte après « Effacer les dates »', lieu(nom));
      if (e.arr || e.dep) R.echec('réservation', '« Effacer les dates » ne vide pas les dates', lieu(nom));
    } catch (err) {
      R.echec('réservation', `parcours au doigt interrompu : ${String(err.message || err).split('\n')[0]}`, lieu(nom));
    } finally { await ctx.close(); }
  }

  /* 2. Au clavier, sur ordinateur : erreur sans dates, puis arrivée et départ aux flèches, envoi à la touche Entrée. */
  {
    const nom = '1366×768';
    const { ctx, page } = await contexte({ taille: T(nom) });
    try {
      await page.goto(BASE + PAGE + '?chambre=mathilde', { waitUntil: 'load' });
      await attendrePret(page);
      await page.evaluate(() => document.querySelector('form[data-reservation] button[type="submit"]').scrollIntoView({ block: 'center' }));
      await page.focus('form[data-reservation] button[type="submit"]');
      await page.keyboard.press('Enter');
      await attendre(400);
      let e = await etat(page);
      if (!e.erreurDates) R.echec('réservation', 'aucune erreur sans dates', lieu(nom));
      if (!e.focusJour) R.echec('réservation', 'sans dates, le focus ne revient pas au calendrier', { ...lieu(nom), selecteur: '[data-calendrier]' });
      const depart = e.focusJour;
      await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await attendre(300);
      e = await etat(page);
      const [y, m, j] = depart.split('-').map(Number); const t = new Date(y, m - 1, j + 2);
      const a = iso(t); t.setDate(t.getDate() + 7); const d = iso(t);
      if (e.arr !== a || e.dep !== d) R.echec('réservation', `au clavier : ${e.arr} → ${e.dep} au lieu de ${a} → ${d}`, lieu(nom));
      if (e.pastille !== '7 nuits') R.echec('réservation', `au clavier : pastille « ${e.pastille} » au lieu de 7 nuits`, lieu(nom));
      if (!e.taxe.startsWith('15,12')) R.echec('réservation', `taxe de séjour « ${e.taxe} » au lieu de 15,12 € (2 × 7 × 1,08 €)`, lieu(nom));
      await page.keyboard.press('PageDown');
      const mois = await page.evaluate(() => document.activeElement.dataset.jour);
      if (!mois || mois.slice(0, 7) === d.slice(0, 7)) R.echec('réservation', 'Page suivante ne passe pas au mois suivant', lieu(nom));
      await page.focus('form[data-reservation] button[type="submit"]');
      await page.keyboard.press('Enter');
      await attendre(1900);
      e = await etat(page);
      if (e.ficheCachee) R.echec('réservation', 'au clavier, la fiche ne s’affiche pas', lieu(nom));
      else {
        if (e.gravure !== 'Mathilde' || e.nuits !== '7') R.echec('réservation', `fiche : « ${e.nuits} » nuits, pampille « ${e.gravure} »`, lieu(nom));
        if (e.boutonBas > e.vh) R.regarder('réservation', `le bouton de la fiche est sous l’écran (${e.boutonBas} px pour ${e.vh})`, { ...lieu(nom), selecteur: '[data-fiche-continuer]' });
      }
    } catch (err) {
      R.echec('réservation', `parcours au clavier interrompu : ${String(err.message || err).split('\n')[0]}`, lieu(nom));
    } finally { await ctx.close(); }
  }
}
