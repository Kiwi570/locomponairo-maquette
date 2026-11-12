# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 17:53:41 · 4 min · 1 page(s) · audit standard ciblé sur /chambres

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261112-164934-standard-cible` · version ?v=4
- Échecs : **0**
- À regarder : **4**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (11), balayage (1), films d’ouverture (2), films de transition (2), bords de l’écran (2), intro accélérable et passable (7), menu (1), clavier (1), liens et boutons (1), liens vers la page en cours (1), changements de hauteur (1), fluidité (2), défilement selon l’appareil (5), mouvement (2), effets du plan (16), vitesse (1), captures (1)

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

Aucun.

## À regarder

### journal du projet (1)

- **journal du projet** — aucune entrée pour la version 4 de donnees/site.json

### ouverture : changement brusque (1)

- **ouverture : changement brusque** — `/chambres` — à 1997 ms (différence 36 %) (films/ouverture-chambres-1366.png) _(1366×768 film)_

### retour avant : changement brusque (2)

- **retour avant : changement brusque** — `/votre-sejour` — à 61 ms (différence 40 %) (films/retour-avant-1366.png) _(1366×768 retour avant)_
- **retour avant : changement brusque** — `/votre-sejour` — à 64 ms (différence 40 %) (films/retour-avant-390.png) _(390×844 retour avant)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=4
- Audit standard : étapes lourdes sur /chambres.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture /chambres (1366×768) : 2892 ms depuis le premier octet
- Ouverture /chambres (390×844) : 2911 ms depuis le premier octet
- Bords de l’écran : 97 images d’intro, 6 de voile et 47 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun lien profond vers une section d’une autre page.
- Mode calme dispensé : Mode calme retiré à la demande du client (12 novembre 2026) : le site joue toujours ses animations, même si l'appareil demande de les réduire.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran /chambres : aucune section épinglée ou plein écran.
- Fluidité /chambres 1366×768 (molette) : 1 % d'images lentes sur 371, tâche la plus longue 0 ms
- Fluidité /chambres 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Vitesse /chambres : 0.51 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
