# Résumé de l'audit : v3 (fichiers en version 5), 12 novembre 2026

**Périmètre** : la page Réserver (calendrier maison et fiche de réception) ; les fichiers communs (site.css, site.js) ont changé, donc tout le site a été audité.

**Niveau** : audit standard ciblé sur `/reserver` (toutes les étapes), puis, après corrections, audit standard de toutes les pages : **0 échec**. Les deux passes sont listées dans `rapport.md`.

**Nouveau parcours propre au projet** (`_audit/parcours.mjs`) : il réserve au doigt sur 390 et 320 px, puis au clavier sur 1366 × 768. Il vérifie :
- le calendrier à la place des champs de date, un seul arrêt de tabulation, des jours d’au moins 44 px, aucun débordement ;
- les dates enregistrées, la pastille et le récapitulatif des nuits, la taxe de séjour recalculée (6,48 € et 15,12 €) ;
- l’erreur sans dates, avec le focus qui revient au calendrier ;
- la fiche affichée et à l’écran, avec le bon nombre de nuits, le prénom gravé, le focus sur son titre et le lien vers la réservation sécurisée ;
- « Modifier ma demande » et « Effacer les dates », qui referment la fiche.

Il passe sur toutes les tailles.

**Corrigé pendant l'audit** :
- contraste de la flèche entre les billets d’arrivée et de départ ;
- contraste de la flèche « mois précédent » quand elle est désactivée ;
- la fiche, cachée jusqu’à l’envoi, était jugée « section sans visuel ».

Corrigé avant l’audit :
- la descente vers la fiche s’arrêtait à mi-chemin, à cause d’un recalcul pendant le défilement doux ;
- la pastille des nuits, en apparaissant au survol, faisait descendre le calendrier sous la souris ;
- la barre « Appeler / Réserver » couvrait la fiche sur téléphone ;
- le prénom de la pampille était gravé à l’envers.

**Copie d'audit du projet** :
- les sections cachées (`hidden`) ne sont plus jugées « sans visuel » ;
- axe (accessibilité) tourne en mode normal quand le mode calme est dispensé. Avant, il ne tournait plus du tout depuis le retrait du mode calme. Il ne signale rien sur les sept pages.

**À regarder, gardé** : le changement brusque au retour avant sur la page Chambres, sur téléphone (déjà noté en v2).

**Non lancé** :
- Safari (WebKit indisponible ici). À vérifier dans Safari sur le Mac : la clé qui tombe sur la fiche, le chiffre des nuits qui monte, et le calendrier au doigt.
- Le test « vrai visiteur » n’a pas été refait : la réservation demande toujours au moins quatre gestes (chambre, deux dates, envoi).

**À fournir par la maison** : inchangé (mentions légales, politique de confidentialité, tarifs, surface de Denise, tarif du garage, photo de la 2 CV, droits des photos des alentours).
