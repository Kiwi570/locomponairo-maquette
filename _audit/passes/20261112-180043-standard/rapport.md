# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 19:21:07 · 20 min · 7 page(s) · audit standard

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261112-180043-standard` · version ?v=5
- Échecs : **0**
- À regarder : **1**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (77), balayage (6), films d’ouverture (12), films de transition (12), bords de l’écran (7), intro accélérable et passable (7), menu (1), clavier (7), liens et boutons (7), liens profonds (8), liens vers la page en cours (6), changements de hauteur (6), parcours du projet (1), tient dans l’écran (5), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (17), souris immobile (1), vitesse (6), captures (1)

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

## Passes de cette version (?v=5)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261112-175535-standard-cible | standard | /reserver | toutes | 3 | 1 | 1 | échecs |
| **20261112-180043-standard** (celle-ci) | standard | toutes | toutes | 0 | 1 | 1 | complet |

## Échecs

Aucun.

## À regarder

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/chambres` — à 89 ms (différence 50 %) (films/retour-avant-390.png) _(390×844 retour avant)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=5
- Journal v5 : 1 étape(s) notée(s), 24 min de travail pour 60 min de budget, 0 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /alentours, /chambres, /contact, /reserver, /votre-sejour.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2255 ms depuis le premier octet
- Ouverture /alentours (1366×768) : 2294 ms depuis le premier octet
- Ouverture /chambres (1366×768) : 2918 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2243 ms depuis le premier octet
- Ouverture /reserver (1366×768) : 2833 ms depuis le premier octet
- Ouverture /votre-sejour (1366×768) : 2341 ms depuis le premier octet
- Ouverture / (390×844) : 2270 ms depuis le premier octet
- Ouverture /alentours (390×844) : 2280 ms depuis le premier octet
- film de l'ouverture /alentours 390×844 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /chambres (390×844) : 2904 ms depuis le premier octet
- Ouverture /contact (390×844) : 2235 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2846 ms depuis le premier octet
- Ouverture /votre-sejour (390×844) : 2318 ms depuis le premier octet
- Bords de l’écran : 360 images d’intro, 18 de voile et 180 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Mode calme dispensé : Mode calme retiré à la demande du client (12 novembre 2026) : le site joue toujours ses animations, même si l'appareil demande de les réduire.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /chambres : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Tient dans l'écran /votre-sejour : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 0 % d'images lentes sur 374, tâche la plus longue 0 ms
- Fluidité /alentours 1366×768 (molette) : 0 % d'images lentes sur 284, tâche la plus longue 0 ms
- Fluidité /chambres 1366×768 (molette) : 0 % d'images lentes sur 382, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 181, tâche la plus longue 0 ms
- Fluidité /reserver 1366×768 (molette) : 1 % d'images lentes sur 184, tâche la plus longue 0 ms
- Fluidité /votre-sejour 1366×768 (molette) : 0 % d'images lentes sur 388, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1350, tâche la plus longue 0 ms
- Fluidité /alentours 390×844 (doigt) : 0 % d'images lentes sur 1340, tâche la plus longue 0 ms
- Fluidité /chambres 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1341, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1341, tâche la plus longue 0 ms
- Fluidité /votre-sejour 390×844 (doigt) : 0 % d'images lentes sur 1335, tâche la plus longue 0 ms
- Vitesse / : 0.62 s de calcul au chargement (téléphone ralenti).
- Vitesse /alentours : 0.44 s de calcul au chargement (téléphone ralenti).
- Vitesse /chambres : 0.60 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.44 s de calcul au chargement (téléphone ralenti).
- Vitesse /reserver : 0.46 s de calcul au chargement (téléphone ralenti).
- Vitesse /votre-sejour : 0.64 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
