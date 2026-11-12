# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 17:02:11 · 1 min · 3 page(s) · audit standard ciblé sur /,/alentours,/votre-sejour (étapes : fichiers, mesures)

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261112-160102-standard-cible-partiel` · version ?v=3
- Échecs : **0**
- À regarder : **3**
- Non lancé : **0**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (33), balayage (3)

## Passes de cette version (?v=3)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261112-145332-rapide-cible | rapide | / | toutes | 8 | 4 | 1 | échecs |
| 20261112-150807-complet | complet | toutes | toutes | 5 | 3 | 1 | échecs |
| 20261112-153656-complet-cible-partiel | complet | /,/404 | fichiers, mesures, films | 0 | 0 | 0 | complet |
| 20261112-153953-standard | standard | toutes | toutes | 11 | 2 | 1 | échecs |
| **20261112-160102-standard-cible-partiel** (celle-ci) | standard | /,/alentours,/votre-sejour | fichiers, mesures | 0 | 3 | 0 | complet |

## Échecs

Aucun.

## À regarder

### typographie française (1)

- **typographie française** — `/` — div.direct-texte:nth-of-type(1) > div.direct-arrivee > p.soir-statut:nth-of-type(2) > span « L’accueil est ouvert : vous pouvez arriver jusqu’à » — espace insécable manquante avant ou après « : » _(1366×768 normal)_

### photo moyenne affichée en très grand (2)

- **photo moyenne affichée en très grand** — `/votre-sejour` — div.conteneur.garage-grille > figure.media.garage-photo > picture > img « Garage voûté et fermé de la maison » — garage (3/5, 63 % de l'écran) : une image notée 4 ou 5 à cette taille _(390×844 normal)_
- **photo moyenne affichée en très grand** — `/votre-sejour` — div.conteneur.garage-grille > figure.media.garage-photo > picture > img « Garage voûté et fermé de la maison » — garage (3/5, 46 % de l'écran) : une image notée 4 ou 5 à cette taille _(1366×768 normal)_

## Non lancé

Tout a été lancé.


## Repères

- Numéro de version des fichiers : ?v=3
- Journal v3 : 1 étape(s) notée(s), 18 min de travail pour 25 min de budget, 2 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /alentours, /votre-sejour.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
