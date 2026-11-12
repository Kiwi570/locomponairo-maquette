# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 16:35:12 · 27 min · 7 page(s) · audit complet

## Résumé

- Statut : **5 échec(s)**
- Passe : `20261112-150807-complet` · version ?v=3
- Échecs : **5**
- À regarder : **3**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (364), balayage (6), films d’ouverture (12), films de transition (12), bords de l’écran (7), intro accélérable et passable (7), menu (1), clavier (7), liens et boutons (7), liens profonds (8), liens vers la page en cours (6), changements de hauteur (6), mode calme (12), bouton du mode calme (2), tient dans l’écran (8), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (16), souris immobile (1), vitesse (6), captures (1)

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
| **20261112-150807-complet** (celle-ci) | complet | toutes | toutes | 5 | 3 | 1 | échecs |

## Échecs

### textes qui se chevauchent (2)

- **textes qui se chevauchent** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-legende:nth-of-type(2) > strong « Isabelle » — avec div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-legende:nth-of-type(2) > span « 1er étage · 24 m² · terrasse · vue village » _(1000×560 normal, 1000×560 calme, 1000×560 sansWebgl)_
- **textes qui se chevauchent** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-legende:nth-of-type(2) > span « 1er étage · 24 m² · terrasse · vue village » — avec div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-legende:nth-of-type(2) > a « Voir la chambre → » _(1000×560 normal, 1000×560 calme, 1000×560 sansWebgl)_

### contraste insuffisant (1)

- **contraste insuffisant** — `/` — div.entree-porte:nth-of-type(2) > div.entree-choix:nth-of-type(2) > p.entree-legende:nth-of-type(2) > span « 1er étage · 24 m² · terrasse · vue village » — 1.11:1 (minimum 4.5:1) _(1000×560 normal, 1000×560 calme, 1000×560 sansWebgl)_

### premier écran : bouton principal hors de l’écran (1)

- **premier écran : bouton principal hors de l’écran** — `/404` — div.conteneur.introuvable-grille > div > p.introuvable-actions:nth-of-type(2) > a.bouton.bouton--action:nth-of-type(1) « Revenir à l’accueil » _(320×568 normal, 390×844 normal, 320×568 calme, 320×568 sansJs, 320×568 sansWebgl, 390×844 calme, +2)_

### ouverture : plus de 3 s (1)

- **ouverture : plus de 3 s** — `/` — 3115 ms depuis le premier octet _(1366×768 film)_

## À regarder

### photo moyenne affichée en très grand (2)

- **photo moyenne affichée en très grand** — `/votre-sejour` — div.conteneur.garage-grille > figure.media.garage-photo > picture > img « Garage voûté et fermé de la maison » — garage (3/5, 63 % de l'écran) : une image notée 4 ou 5 à cette taille _(390×844 normal)_
- **photo moyenne affichée en très grand** — `/votre-sejour` — div.conteneur.garage-grille > figure.media.garage-photo > picture > img « Garage voûté et fermé de la maison » — garage (3/5, 46 % de l'écran) : une image notée 4 ou 5 à cette taille _(1366×768 normal)_

### ouverture : changement brusque (1)

- **ouverture : changement brusque** — `/reserver` — à 1838 ms (différence 22 %) (films/ouverture-reserver-1366.png) _(1366×768 film)_

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
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture /alentours (1366×768) : 2629 ms depuis le premier octet
- Ouverture /chambres (1366×768) : 2919 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2526 ms depuis le premier octet
- Ouverture /reserver (1366×768) : 2891 ms depuis le premier octet
- Ouverture /votre-sejour (1366×768) : 2699 ms depuis le premier octet
- Ouverture / (390×844) : 2545 ms depuis le premier octet
- Ouverture /alentours (390×844) : 2631 ms depuis le premier octet
- Ouverture /chambres (390×844) : 2903 ms depuis le premier octet
- Ouverture /contact (390×844) : 2562 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2863 ms depuis le premier octet
- Ouverture /votre-sejour (390×844) : 2660 ms depuis le premier octet
- bords de l’écran / 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- bords de l’écran /chambres 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 400 images d’intro, 17 de voile et 175 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /chambres : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Tient dans l'écran /votre-sejour : aucune section épinglée ou plein écran.
- Fluidité / 1366×768 (molette) : 0 % d'images lentes sur 328, tâche la plus longue 0 ms
- Fluidité /alentours 1366×768 (molette) : 1 % d'images lentes sur 288, tâche la plus longue 85 ms
- Fluidité /chambres 1366×768 (molette) : 1 % d'images lentes sur 370, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 181, tâche la plus longue 0 ms
- Fluidité /reserver 1366×768 (molette) : 0 % d'images lentes sur 181, tâche la plus longue 0 ms
- Fluidité /votre-sejour 1366×768 (molette) : 0 % d'images lentes sur 434, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1358, tâche la plus longue 0 ms
- Fluidité /alentours 390×844 (doigt) : 0 % d'images lentes sur 1340, tâche la plus longue 0 ms
- Fluidité /chambres 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1341, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1339, tâche la plus longue 0 ms
- Fluidité /votre-sejour 390×844 (doigt) : 0 % d'images lentes sur 1334, tâche la plus longue 0 ms
- Vitesse / : 0.76 s de calcul au chargement (téléphone ralenti).
- Vitesse /alentours : 0.61 s de calcul au chargement (téléphone ralenti).
- Vitesse /chambres : 0.58 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.52 s de calcul au chargement (téléphone ralenti).
- Vitesse /reserver : 0.61 s de calcul au chargement (téléphone ralenti).
- Vitesse /votre-sejour : 0.65 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --complet --pages=/,/404 --seulement=fichiers,mesures,films
```
