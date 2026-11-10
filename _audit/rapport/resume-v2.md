# Audit de la version validée — 10 novembre 2026

- Audit complet (7 pages, 13 formats, films, fluidité, mouvement, vitesse ; 29 min) : 1 échec, la fluidité de l'accueil (10 % d'images de plus de 50 ms au défilement à la molette, processeur ralenti 4 fois). Tout le reste passe, grille wouahou complète (7 points sur 7).
- Correction : le sarment relisait la hauteur de la page à chaque image, ce qui forçait un recalcul complet du style ; la maison 3D réécrivait des variables héritées par toutes ses faces. Les deux sont réécrits, rendu identique.
- Audit complet ciblé (accueil et chambres : fichiers, mesures sur 13 formats, fluidité, mouvement) : 0 échec ; fluidité de l'accueil à 8 %.
- Non lancé : Safari (WebKit indisponible ici) ; liste des points à vérifier dans `_suivi/rapport-formats.md`.
