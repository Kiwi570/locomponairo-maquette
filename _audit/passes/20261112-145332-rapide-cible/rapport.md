# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 15:58:08 · 5 min · 1 page(s) · audit RAPIDE : ne vaut pas pour une livraison ciblé sur /

## Résumé

- Statut : **8 échec(s)**
- Passe : `20261112-145332-rapide-cible` · version ?v=3
- Échecs : **8**
- À regarder : **4**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (7), films d’ouverture (2), films de transition (2), bords de l’écran (1), intro accélérable et passable (7), menu (1), clavier (1), liens et boutons (1), liens profonds (8), liens vers la page en cours (1), changements de hauteur (1), mode calme (2), bouton du mode calme (2), fluidité (2), défilement selon l’appareil (5), mouvement (2), effets du plan (16), souris immobile (1), vitesse (1), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 6 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en serrure |
| 4. Quelque chose relie les sections et les pages | ✓ présent | sur les 6 page(s) |
| 5. Un titre fait l’événement sur chaque page | ✓ présent | sur les 6 page(s) |
| 6. La scène est un geste du métier | ✓ présent | geste du métier sur /chambres, /, /votre-sejour |
| 7. L’action principale a un retour physique | ✓ présent | sur /reserver |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

### élément recouvert (4)

- **élément recouvert** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > div.entree-boutons > button:nth-of-type(1) « Isabelle » — par section#debut > div.entree-grille.conteneur:nth-of-type(1) « CHAMBRE D’HÔTES · POUZOLS, HÉRAULT Quatre chambres » _(1366×768 normal)_
- **élément recouvert** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > div.entree-boutons > button:nth-of-type(2) « Denise » — par section#debut > div.entree-grille.conteneur:nth-of-type(1) « CHAMBRE D’HÔTES · POUZOLS, HÉRAULT Quatre chambres » _(1366×768 normal)_
- **élément recouvert** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > div.entree-boutons > button:nth-of-type(3) « Mathilde » — par section#debut > div.entree-grille.conteneur:nth-of-type(1) « CHAMBRE D’HÔTES · POUZOLS, HÉRAULT Quatre chambres » _(1366×768 normal)_
- **élément recouvert** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > div.entree-boutons > button:nth-of-type(4) « Suzanne » — par section#debut > div.entree-grille.conteneur:nth-of-type(1) « CHAMBRE D’HÔTES · POUZOLS, HÉRAULT Quatre chambres » _(1366×768 normal)_

### contraste sur image (2)

- **contraste sur image** — `/` — section#debut > div.entree-grille.conteneur:nth-of-type(1) > div.hero-texte.entree-texte > p.hero-info:nth-of-type(3) « ARRIVÉE de 17 h à 20 h 30 · garage fermé jusqu’à 2 » — 1.96:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_
- **contraste sur image** — `/` — section#debut > div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-question:nth-of-type(1) « DERRIÈRE LA PORTE » — 3.05:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_

### premier écran : information clé hors de l’écran (1)

- **premier écran : information clé hors de l’écran** — `/` — section#debut > div.entree-grille.conteneur:nth-of-type(1) > div.hero-texte.entree-texte > p.hero-info:nth-of-type(3) « ARRIVÉE de 17 h à 20 h 30 · garage fermé jusqu’à 2 » _(320×568 sansJs)_

### mode calme (1)

- **mode calme** — `/` — une boucle tourne encore (64 images par seconde) _(390×844 calme, 1366×768 calme)_

## À regarder

### « à compléter » visible (2)

- **« à compléter » visible** — `alentours.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)
- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### retour arrière : changement brusque (1)

- **retour arrière : changement brusque** — `/` — à 184 ms (différence 20 %) (films/retour-arrière-1366.png) _(1366×768 retour arrière)_

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/chambres` — à 79 ms (différence 31 %) (films/retour-avant-390.png) _(390×844 retour avant)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=3
- Journal v3 : 1 étape(s) notée(s), 18 min de travail pour 25 min de budget, 2 min d’attente de l’utilisateur.
- Audit rapide : étapes lourdes sur /.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Balayage des largeurs : non fait en audit rapide.
- Ouverture / (1366×768) : 2603 ms depuis le premier octet
- Ouverture / (390×844) : 2524 ms depuis le premier octet
- Bords de l’écran : 80 images d’intro, 3 de voile et 26 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 0 % d'images lentes sur 319, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1354, tâche la plus longue 0 ms
- Vitesse / : 0.70 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --rapide --pages=/ --seulement=fichiers,mesures,parcours
```
