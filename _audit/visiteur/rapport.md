# Test visiteur : motards, week-end près de Saint-Guilhem

Captures dans `_audit/visiteur/<dossier>/`. Site non modifié.

| Mission | Format | Verdict | Gestes | s | Capture |
|---|---|---|---|---|---|
| 1 Premier écran | tél. | réussie | 0 | 3,5 | premier-ecran-390x844/etape-1 |
| | ordi | réussie | 0 | 3,8 | premier-ecran-1440x900/etape-1 |
| 2 Prix | tél. | échec (réussie au 4e geste) | 4 | 9,6 | prix-4gestes-390x844/etape-2 |
| | ordi | réussie | 2 | 6,9 | prix-1440x900/etape-4 |
| 3 Réserver | tél. | hors barème | 6 | ≈12 | reserver-390x844/etape-14 |
| | ordi | hors barème | 5 (+1 défilement réel) | ≈11 | reserver-1440x900/etape-11 |
| 4 Venir | tél. | réussie | 2 | 6,7 | venir-390x844/etape-3 |
| | ordi | réussie | 1 | 6,8 | venir-1440x900/etape-2 |
| 5 Différence | tél. | partielle | 3 | 29,4 | difference-390x844/etape-10 |
| | ordi | partielle | 3 | 28,5 | difference-1440x900/etape-10 |
| 6 Moto | tél. | partielle (complète en 7) | 3 | 7,7 | moto-390x844/etape-3 |
| | ordi | partielle (complète en 8) | 3 | 6,5 | moto-complet-1440x900/etape-4 |

## Ce qui a gêné

- **Premier écran** : clair (chambre d'hôtes, Pouzols, garage fermé, arrivée 17 h–20 h 30). Il manque « pour qui » et Saint-Guilhem. Pas de numéro visible sur ordinateur.
- **Prix** : pas de « Tarifs » au menu. Seul le récapitulatif de /reserver dit « Prix de la nuit : à compléter (affiché sur la réservation sécurisée) », avec ce qui est inclus (petit-déjeuner, garage, TVA ; taxe 1,08 €). « À compléter » fait site inachevé.
- **Réserver** : 4 gestes minimum (chambre, deux dates, envoi). Sur ordinateur, prendre la clé ne fait pas défiler. Sur téléphone, le bouton d'envoi est sous l'écran. Dates en mm/jj/aaaa (navigateur de test ?). Confirmation « Demande prête » nette.
- **Venir** : Contact excellent (gros numéro, adresse, sortie Gignac), mais sans les horaires.
- **Différence** : maison de vigneron de 1850, chambres aux prénoms des grands-mères, garage. Atouts motards invisibles en 30 s. Sur ordinateur, moitié droite vide (maison 3D absente).
- **Moto** : on voit « garage fermé jusqu'à 23 h » en 3 gestes, mais « motards » n'apparaît qu'au 7e (Votre séjour). Trois heures (20 h 30, clés 22 h, garage 23 h) sans réponse simple.
- Mentions « à compléter » visibles.

## Corrections prioritaires

1. Premier écran : « Motards bienvenus · garage fermé · clés jusqu'à 22 h ».
2. Remonter le bloc « Motards et cavaliers » sur l'accueil.
3. Sur /reserver, remplacer « à compléter » par une phrase claire sur le tarif ; ajouter « Tarifs » au menu.
4. Prendre une clé doit mener aux dates ; bouton d'envoi visible sans défiler.
5. Numéro dans l'en-tête sur ordinateur ; horaires sur Contact.
6. Distance à Saint-Guilhem sur l'accueil (introuvable en 4 gestes).
7. Retirer les « à compléter » ; corriger la zone vide de la maison 3D.
