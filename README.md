# Lo Componaïro — maquette

Maquette du futur site de Lo Componaïro, chambre d'hôtes dans une maison vigneronne de 1850 à Pouzols (Hérault).
Adresse de la maquette : https://locomponairo-maquette.vercel.app

Direction « Quatre clés, quatre histoires » : calcaire blond, encre brune, tomette, vert volet, lie-de-vin pour l'action, laiton pour les clés.
Polices : Fraunces (variable : axes SOFT et WONK animés) et Instrument Sans, hébergées avec le site.

## Pages

| Page | Ouverture | Signature |
|---|---|---|
| Accueil (`/`) | Façade de la maison, trousseau des quatre clés à faire tourner | Maison de 1850 qui se monte en 3D puis s'ouvre sur les chambres, prénoms géants, suite familiale en plein écran, ronde des sites en 3D |
| Les chambres (`/chambres`) | Quatre portes cintrées qui s'entrouvrent | Couloir où chaque porte s'ouvre sur sa chambre, comparatif filtrable (`?filtre=terrasse`) |
| Votre séjour (`/votre-sejour`) | Cadran 24 h à l'heure de Pouzols | La journée heure par heure, de 8 h 30 à 23 h |
| Alentours (`/alentours`) | Carte gravée, routes qui partent de Pouzols, 2 CV en médaillon | Ronde des sites en 3D, « Prêt pour votre randonnée ? » en plein écran |
| Contact (`/contact`) | Numéro de téléphone en très grand | Itinéraire A750 → Pouzols qui se trace, formulaire tamponné « Reçu » |
| Réserver (`/reserver`) | Tableau à clés de la réception | Demande en trois étapes, la clé file jusqu'au récapitulatif, tampon « Demande prête », lien vers la vraie réservation eviivo (`?chambre=isabelle`, `?chambre=suite`) |
| 404 | Une clé seule sur une couverture | — |

Partout : intro (les clés tombent sur l'anneau, le trousseau tourne dans une serrure puis rejoint la page), voile de transition en trou de serrure, sarment de vigne qui pousse dans la marge (une feuille par section, une grappe au bout), mode calme (lien « Réduire les animations » dans le pied de page et le menu).

## Ce que la maison doit fournir (à compléter)

- **Mentions légales** : raison sociale (SAS Lo Componairo), adresse du siège, SIRET (887 800 688 00012 relevé sur le site actuel, à confirmer), directeur de la publication.
- **Hébergeur** : Vercel Inc., adresse à vérifier sur le site de Vercel au moment de la mise en ligne.
- **Politique de confidentialité** (RGPD) : données recueillies par les formulaires, finalité, durée de conservation, droits.
- **Tarifs** : prix de la nuit par chambre et par saison (aucun prix n'est affiché sur le site actuel).
- **Surface de Denise** : le site actuel indique à la fois 17 m² et 24 m².
- **Garage** : le site actuel le dit à la fois gratuit et à 8 € par jour ; la maquette le dit inclus dans le prix (tarifs tout inclus), à confirmer.
- **Notes d'avis** Google et TripAdvisor, si la maison veut les afficher (seules les distinctions visibles sur le site actuel sont reprises : Petit Futé 2025 et 2026, Booking Traveller Review Awards 2025 9,5/10, Gîtes de France, Kayak Travel Awards, Team 68°). Année du prix Kayak à préciser.
- **Distances** des sites des alentours (seules celles du site actuel sont reprises : Clamouse 11 km, Pézenas et Montpellier 25 min, Gignac 7 km, Montpellier 34 km, centre équestre 5 min).
- **Tables locales** recommandées par la maison.
- **Photo de la 2 CV** : remplacer le dessin du médaillon de la page Alentours.
- **Crédits** : photographies de la maison (à préciser) ; les images marquées « Illustration générée » ont été créées par intelligence artificielle (Grok).

## À la mise en ligne définitive

- Retirer : `noindex` (balise robots dans `source/gabarits/commun.mjs` et en-tête X-Robots-Tag dans `vercel.json`), réservation et formulaire simulés (les relier à eviivo et à une vraie messagerie), mentions « à compléter », mention « Schéma illustratif » si la coupe de la maison est remplacée par un vrai plan.
- Garder : la mention « Illustration générée » sur les images créées par IA.

## Travailler sur la maquette

- Textes : `donnees/textes/fr.json` ; chambres : `donnees/chambres.json` ; sites : `donnees/alentours.json` ; questions : `donnees/faq.json`.
- Pages : `source/pages/*.mjs`, puis `node outils/generer.mjs` (ne jamais modifier les pages `.html` à la main).
- Images : `plan-images.json` et le pipeline de la bibliothèque (`images/produire.mjs`).
- Audit : `node _audit/audit.mjs` (rapport dans `_audit/rapport/`).
