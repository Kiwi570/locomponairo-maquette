# Rapport d’audit

Projet : `locomponairo-maquette` · 10/11/2026 14:57:19 · 10 min · 7 page(s) · audit complet (étapes : fichiers, grille, mesures, ecran)

## Résumé

- Échecs : **7**
- À regarder : **1**
- Non lancé : **0**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (364), balayage (6), tient dans l’écran (16), films des épinglages (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 6 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en serrure |
| 4. Un fil conducteur traverse le site | ✓ présent | sur les 6 page(s) |
| 5. La typographie bouge aussi | ✓ présent | sur les 6 page(s) |
| 6. Les scènes épinglées sont des gestes du métier | ✓ présent | geste du métier sur /chambres, /, /votre-sejour |
| 7. L’action principale a un retour physique | ✓ présent | sur /reserver |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

### textes qui se chevauchent (1)

- **textes qui se chevauchent** — `/contact` — section#debut > div.conteneur.tete-numero-grille > p.tete-numero-coord:nth-of-type(3) > span « 15 rue des Jardins, 34230 Pouzols · arrivée 17 h – » — avec section#debut > div.conteneur.tete-numero-grille > p.tete-numero-coord:nth-of-type(3) > a « locomponairo34@gmail.com » _(375×667 normal, 390×844 normal, 375×667 sansJs, 375×667 calme, 390×844 sansJs, 390×844 calme, +2)_

### ne tient pas dans l’écran (6)

- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > div.o3d__scene:nth-of-type(2) > p.o3d__indice:nth-of-type(1) « Attrapez la maison » — coupé en bas de 11 px (à 4 % de la scène) _(1024×640 épinglé)_
- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > ol.o3d__etapes > li:nth-of-type(5) « Les quatre chambres Le toit se lève : Isabelle et  » — coupé en bas de 5 px (à 4 % de la scène) _(1024×640 épinglé)_
- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > div.o3d__scene:nth-of-type(2) > p.o3d__indice:nth-of-type(1) « Attrapez la maison » — coupé en bas de 11 px (à 50 % de la scène) _(1024×640 épinglé)_
- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > ol.o3d__etapes > li:nth-of-type(5) « Les quatre chambres Le toit se lève : Isabelle et  » — coupé en bas de 5 px (à 50 % de la scène) _(1024×640 épinglé)_
- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > div.o3d__scene:nth-of-type(2) > p.o3d__indice:nth-of-type(1) « Attrapez la maison » — coupé en bas de 11 px (à 96 % de la scène) _(1024×640 épinglé)_
- **ne tient pas dans l’écran** — `/` — section#coupe > div.o3d__cadre.conteneur > ol.o3d__etapes > li.est-active:nth-of-type(5) « Les quatre chambres Le toit se lève : Isabelle et  » — coupé en bas de 5 px (à 96 % de la scène) _(1024×640 épinglé)_

## À regarder

### typographie française (1)

- **typographie française** — `/contact` — div.conteneur.acces-grille > div.acces-carte:nth-of-type(1) > svg.acces-svg > text.acces-km:nth-of-type(1) — espace insécable manquante avant ou après « : » _(1366×768 normal)_

## Non lancé

Tout a été lancé.


## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 6 étape(s) notée(s), 45 min de travail pour 105 min de budget, 19 min d’attente de l’utilisateur.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Tient dans l'écran /chambres : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /reserver : aucune section épinglée ou plein écran.
- Tient dans l'écran /votre-sejour : aucune section épinglée ou plein écran.

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --complet --pages=/,/contact --seulement=fichiers,mesures,ecran
```
