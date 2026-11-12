# Rapport d’audit

Projet : `locomponairo-maquette` · 12/11/2026 17:23:28 · 2 min · 1 page(s) · audit complet ciblé sur / (étapes : fichiers, mesures, films, bords, ecran)

## Résumé

- Statut : **1 échec(s)**
- Passe : `20261112-162119-complet-cible-partiel` · version ?v=3
- Échecs : **1**
- À regarder : **2**
- Non lancé : **0**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (39), balayage (1), films d’ouverture (2), films de transition (2), bords de l’écran (2)

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
| **20261112-162119-complet-cible-partiel** (celle-ci) | complet | / | fichiers, mesures, films, bords, ecran | 1 | 2 | 0 | échecs |

## Échecs

### contraste sur image (1)

- **contraste sur image** — `/` — section#debut > div.entree-grille.conteneur:nth-of-type(1) > div.hero-texte.entree-texte > p.hero-info:nth-of-type(3) « ARRIVÉE de 17 h à 20 h 30 · garage fermé jusqu’à 2 » — 1.93:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal)_

## À regarder

### retour arrière : changement brusque (1)

- **retour arrière : changement brusque** — `/` — à 140 ms (différence 24 %) (films/retour-arrière-390.png) _(390×844 retour arrière)_

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/chambres` — à 74 ms (différence 49 %) (films/retour-avant-390.png) _(390×844 retour avant)_

## Non lancé

Tout a été lancé.


## Repères

- Numéro de version des fichiers : ?v=3
- Journal v3 : 3 étape(s) notée(s), 90 min de travail pour 150 min de budget, 4 min d’attente de l’utilisateur.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2316 ms depuis le premier octet
- Ouverture / (390×844) : 2263 ms depuis le premier octet
- film de l'ouverture / 390×844 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 92 images d’intro, 6 de voile et 46 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Tient dans l'écran / : aucune section épinglée ou plein écran.

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --complet --pages=/ --seulement=fichiers,mesures
```
