# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 18:59:49 · 4 min · 1 page(s) · audit standard ciblé sur /reserver

## Résumé

- Statut : **3 échec(s)**
- Passe : `20261112-175535-standard-cible` · version ?v=5
- Échecs : **3**
- À regarder : **1**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (11), balayage (1), films d’ouverture (2), films de transition (2), bords de l’écran (2), intro accélérable et passable (7), menu (1), clavier (1), liens et boutons (1), liens vers la page en cours (1), changements de hauteur (1), parcours du projet (1), fluidité (2), défilement selon l’appareil (5), mouvement (2), effets du plan (17), vitesse (1), captures (1)

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

### contraste insuffisant (2)

- **contraste insuffisant** — `/reserver` — fieldset.demande-bloc:nth-of-type(2) > div.calendrier:nth-of-type(1) > div.cal-billets:nth-of-type(1) > span.cal-fleche « → » — 3.24:1 (minimum 4.5:1) _(768×1024 normal, 390×844 normal, 844×390 normal, 1366×768 normal, 1920×1080 normal, 390×844 sansWebgl, +1)_
- **contraste insuffisant** — `/reserver` — fieldset.demande-bloc:nth-of-type(2) > div.calendrier:nth-of-type(1) > div.cal-corps:nth-of-type(2) > button.cal-nav.cal-nav--prec:nth-of-type(1) « ‹ » — 1.76:1 (minimum 3:1) _(768×1024 normal, 390×844 normal, 320×568 normal, 844×390 normal, 1366×768 normal, 1920×1080 normal, +2)_

### section sans visuel (1)

- **section sans visuel** — `/reserver` — section#fiche « Fiche de réception · Lo Componaïro Chambre — 0 nui » _(768×1024 normal, 390×844 normal, 320×568 normal, 844×390 normal, 1366×768 normal, 390×844 sansJs, +5)_

## À regarder

### journal du projet (1)

- **journal du projet** — aucune entrée pour la version 5 de donnees/site.json

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
- Audit standard : étapes lourdes sur /reserver.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture /reserver (1366×768) : 2866 ms depuis le premier octet
- Ouverture /reserver (390×844) : 2870 ms depuis le premier octet
- Bords de l’écran : 86 images d’intro, 3 de voile et 49 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun lien profond vers une section d’une autre page.
- Mode calme dispensé : Mode calme retiré à la demande du client (12 novembre 2026) : le site joue toujours ses animations, même si l'appareil demande de les réduire.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Fluidité /reserver 1366×768 (molette) : 0 % d'images lentes sur 184, tâche la plus longue 0 ms
- Fluidité /reserver 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Vitesse /reserver : 0.53 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --pages=/,/reserver --seulement=fichiers,mesures
```
