# Résumé de l'audit : v2 (fichiers en version 3), 12 novembre 2026

**Niveau** : audit complet de la nouvelle version (toutes les pages, 13 formats, tous les modes), puis, après corrections : audit complet ciblé sur l'accueil (et la 404 au premier passage), audit standard de toutes les pages, et relances ciblées de ce qui avait échoué. Les passes de la version sont listées dans `rapport.md`.

**Regards extérieurs** (agents séparés, qui n'ont pas vu la construction) :
- regard du directeur artistique sur l'accueil (grille de la skill v10.10) : REFAIRE à 2,25/5 sur la version validée, puis REFAIRE à 2,88/5 sur l'accueil refait ; au second, l'utilisateur a choisi d'ajuster ses points (porte en perspective, façade éclairée et vue de chaque étage, cadres droits, textes plus lisibles, fil de laiton) ;
- regard neuf sur toutes les pages (`_suivi/regard-neuf-v3.md`) : filtres du comparatif inopérants, images générées à remplacer par les vraies photos, faits à revérifier ; corrigés ;
- test « vrai visiteur » (couple de motards, téléphone et ordinateur, `_audit/visiteur/rapport.md`) : 9 parcours sur 12 dans le barème ; corrigés : lieu absent du premier écran du téléphone, façade collée qui cachait les textes, bouton d'envoi sous l'écran et « Demande prête » coupé. La réservation demande au moins 4 gestes de saisie (chambre, deux dates, envoi) : hors barème par nature.

**Corrigé pendant l'audit** : légende de la porte (chevauchement, contraste), 404 sur téléphone (bouton hors du premier écran), ouverture de l'accueil sous 3 s, contraste du manifeste, prénoms de la porte recouverts sur téléphone, premier écran sans JavaScript, étiquette « Arrivée » sur la photo, typographie du statut d'arrivée, photo du garage moins grande.

**Dispensé à la demande du client** : le mode calme. Le site n'a plus de mode calme ni de lien « Réduire les animations » ; les contrôles du mode calme sont dispensés dans la copie d'audit du projet (`config.json` : `sansModeCalme`).

**Non lancé** : Safari (WebKit indisponible ici). À vérifier dans Safari sur le Mac : l'intro (clé et serrure), la porte de l'accueil qui pivote, la façade qui s'éclaire, le voile entre les pages, le menu.

**À regarder, gardé** : deux changements brusques au retour arrière ou avant sur téléphone (l'accueil et les chambres reprennent leur état), sans contenu manquant.

**Grille wouahou** : 7 points sur 7.

**À fournir par la maison** : mentions légales, politique de confidentialité, tarifs, surface de Denise (17 ou 24 m²), tarif du garage (gratuit ou 8 €), photo de la 2 CV, droits des photos des alentours.
