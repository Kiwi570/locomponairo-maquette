# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 17:43:20 · 20 min · 7 page(s) · audit standard

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261112-162328-standard` · version ?v=3
- Échecs : **0**
- À regarder : **1**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (77), balayage (6), films d’ouverture (12), films de transition (12), bords de l’écran (7), intro accélérable et passable (7), menu (1), clavier (7), liens et boutons (7), liens profonds (8), liens vers la page en cours (6), changements de hauteur (6), tient dans l’écran (5), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (16), souris immobile (1), vitesse (6), captures (1)

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

## Passes de cette version (?v=3)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261112-145332-rapide-cible | rapide | / | toutes | 8 | 4 | 1 | échecs |
| 20261112-150807-complet | complet | toutes | toutes | 5 | 3 | 1 | échecs |
| 20261112-153656-complet-cible-partiel | complet | /,/404 | fichiers, mesures, films | 0 | 0 | 0 | complet |
| 20261112-153953-standard | standard | toutes | toutes | 11 | 2 | 1 | échecs |
| 20261112-160102-standard-cible-partiel | standard | /,/alentours,/votre-sejour | fichiers, mesures | 0 | 3 | 0 | complet |
| 20261112-160234-standard-cible-partiel | standard | /,/votre-sejour | fichiers, mesures | 0 | 0 | 0 | complet |
| 20261112-161753-complet-cible-partiel | complet | / | fichiers, mesures, films, bords, ecran | 107 | 3 | 0 | échecs |
| 20261112-162119-complet-cible-partiel | complet | / | fichiers, mesures, films, bords, ecran | 1 | 2 | 0 | échecs |
| **20261112-162328-standard** (celle-ci) | standard | toutes | toutes | 0 | 1 | 1 | complet |

## Échecs

Aucun.

## À regarder

### ouverture : changement brusque (1)

- **ouverture : changement brusque** — `/alentours` — à 1813 ms (différence 22 %) (films/ouverture-alentours-1366.png) _(1366×768 film)_

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
- Journal v3 : 3 étape(s) notée(s), 90 min de travail pour 150 min de budget, 4 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /alentours, /chambres, /contact, /reserver, /votre-sejour.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2457 ms depuis le premier octet
- Ouverture /alentours (1366×768) : 2334 ms depuis le premier octet
- Ouverture /chambres (1366×768) : 2905 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2265 ms depuis le premier octet
- Ouverture /reserver (1366×768) : 2879 ms depuis le premier octet
- Ouverture /votre-sejour (1366×768) : 2322 ms depuis le premier octet
- Ouverture / (390×844) : 2232 ms depuis le premier octet
- Ouverture /alentours (390×844) : 2328 ms depuis le premier octet
- Ouverture /chambres (390×844) : 2898 ms depuis le premier octet
- Ouverture /contact (390×844) : 2288 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2861 ms depuis le premier octet
- Ouverture /votre-sejour (390×844) : 2334 ms depuis le premier octet
- bords de l’écran / 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- bords de l’écran /chambres 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 331 images d’intro, 24 de voile et 176 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Mode calme dispensé : Mode calme retiré à la demande du client (12 novembre 2026) : le site joue toujours ses animations, même si l'appareil demande de les réduire.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /chambres : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Tient dans l'écran /votre-sejour : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 0 % d'images lentes sur 370, tâche la plus longue 0 ms
- Fluidité /alentours 1366×768 (molette) : 0 % d'images lentes sur 280, tâche la plus longue 0 ms
- Fluidité /chambres 1366×768 (molette) : 1 % d'images lentes sur 378, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 187, tâche la plus longue 0 ms
- Fluidité /reserver 1366×768 (molette) : 0 % d'images lentes sur 185, tâche la plus longue 0 ms
- Fluidité /votre-sejour 1366×768 (molette) : 0 % d'images lentes sur 400, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Fluidité /alentours 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Fluidité /chambres 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1341, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Fluidité /votre-sejour 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Vitesse / : 0.64 s de calcul au chargement (téléphone ralenti).
- Vitesse /alentours : 0.47 s de calcul au chargement (téléphone ralenti).
- Vitesse /chambres : 0.62 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.48 s de calcul au chargement (téléphone ralenti).
- Vitesse /reserver : 0.50 s de calcul au chargement (téléphone ralenti).
- Vitesse /votre-sejour : 0.66 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
