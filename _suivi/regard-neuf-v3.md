# Regard neuf : Lo Componaïro, version validée (12 novembre 2026)

**Sources.** J'ai regardé :
- les planches 1440 et 390 des 7 pages, le film de l'accueil et sa planche (vitrine, vides) ;
- le relevé et la planche des photos du client ;
- le palmarès (ouverture, offre, tarifs, étapes, outil interactif, carte, preuves, contact, galerie, 404, manifeste) ;
- les accueils de Jardins de l'Hacienda 2, agence ae et Alexandra Grandry.

J'ai aussi testé en direct avec mes propres captures. Ces captures sont dans `/tmp/claude-0/-home-claude/9c51c842-0e86-50e1-bd2b-e67bb670e934/scratchpad/regard-neuf/shots/`. J'ai testé :
- l'intro et le voile ;
- le trousseau, la maison 3D, les portes et les filtres de Chambres ;
- le cadran de Séjour ;
- la carte et la ronde d'Alentours ;
- le formulaire de Contact ;
- le parcours Réserver complet ;
- le menu sur téléphone.

**Attention : le site a changé pendant ma revue.** À 15 h 43, `index.html` a été régénéré : l'accueil est passé de 15,9 à 9 écrans, avec une nouvelle composition. Mes notes portent donc sur la **version validée** :
- celle des planches ;
- identique à la copie `/home/claude/ajout/locomponairo-maquette` (commit « Maquette v1 corrigee apres audit complet »), que j'ai servie à part pour finir les tests.

Un mot sur la nouvelle version de l'accueil se trouve en fin de partie 1.

**Le relevé est incomplet, et une partie du regard v1 était fausse.** J'ai relu les pages publiques du site actuel (accueil, Informations, Les 4 chambres, Alentours). Elles confirment beaucoup de détails que le regard v1 demandait de retirer :
- les chaussons prêtés ;
- l'annulation **et modification** gratuites jusqu'à 7 jours ;
- le lit pliant 90 × 180 à 10 € pour les 7–14 ans, « avec kit de toilette, linge et petit-déjeuner » ;
- « ne peut **plus** accueillir d'animaux » ;
- le paiement CB « à distance ou sur place » ;
- le petit-déjeuner « plus tôt sur demande » ;
- le linge, le sèche-cheveux, le kit brosse à dents, les couettes françaises, et « climatisation / chauffage individuel » ;
- « sans intermédiaires ni frais cachés » et « petit-déjeuner offert » ;
- pour les Estivales : « vins et tapas » ;
- Saint-Guilhem « parmi les plus beaux villages de France » ;
- « Prêt pour votre randonnée ? ».

À l'inverse, **« une bouteille d'eau fraîche, des biscuits gourmands »** figure bien sur la page des chambres. Le CHANGELOG l'a retiré à tort.

Le site actuel se contredit aussi sur le garage : « gratuit (accessible jusqu'à 23 h) … (8 €/jour) ». La maquette, elle, affirme « gratuit et inclus ».

À faire : compléter `releve.md` avec ces textes avant toute réécriture.

---

## 1. Les cinq questions

### 1. Qu'est-ce que le visiteur peut toucher ?

**Accueil**
- **Le trousseau** marche. On peut le faire tourner à la main ou avec 4 puces. Mais choisir une clé ne change qu'une légende sous le disque (« Denise · 1er étage · 17 ou 24 m² (à confirmer) »). La photo ne change pas, le bouton non plus. Dès qu'on tourne, les étiquettes passent à l'envers.
- **La maison 3D** se monte au défilement et se fait pivoter à la souris. Sur téléphone, elle est petite et son toit levé passe sur le sous-titre.
- **La ronde des sites** se commande aux flèches.
- **Le soleil censé suivre la souris** existe dans la page (`hero-soleil`), mais il ne se voit pas.

**Chambres**
- **Les portes** sont cliquables. Le survol ne fait rien. Le clic lance le voile bordeaux plein écran titré « Les chambres », alors qu'on est déjà sur cette page, puis saute à la chambre.
- **Les filtres du comparatif sont cassés.** Le bouton s'allume, mais les lignes écartées restent pleinement visibles. La classe qui les grise est bien posée, mais l'animation d'apparition remet l'opacité à 1. Le visiteur clique et rien ne bouge.

**Séjour**
- Seule la FAQ se touche.
- Le cadran ne se tourne pas : le glisser sélectionne le texte « 0 h », « 6 h ».

**Alentours**
- On peut faire tourner la ronde.
- La carte ne réagit ni au survol ni au clic.

**Contact**
- Le numéro géant est cliquable, et le lien d'itinéraire ouvre Google Maps.
- Le formulaire valide les champs (« Ce champ est à remplir »), puis appose un tampon « REÇU ».

**Réserver**
- Le parcours comprend : tableau à 5 clés, choix de chambre, dates, adultes, option arrivée 14 h 30, « Préparer ma demande », puis un lien vers eviivo.
- `?chambre=mathilde` présélectionne bien la chambre.

**Téléphone**
- Le menu plein écran sombre, avec les liens en Fraunces et « Appeler 06 88 71 26 01 », est réussi.
- La barre collante « Appeler / Réserver » est très bien.

**Bilan :** il y a beaucoup à toucher. Mais deux interactions sont fausses (filtres, cadran), et le trousseau ne sert à rien de concret.

### 2. Qu'est-ce qui relie les pages entre elles ?

**L'intro.** La clé tombe, une serrure maintenant lisible se dessine (contour fin), le nom s'affiche, puis les 4 clés se placent et le trousseau rejoint l'ouverture. C'est mieux qu'en v1, mais :
- elle dure environ 3 s à **chaque chargement complet**, même quand on arrive directement sur /chambres depuis Google ;
- les clés restent des aplats dorés dessinés en code.

**Le voile.** Une serrure bordeaux part du point de clic, affiche le prénom de la page avec une clé, puis s'ouvre en cercle sur l'objet de la page suivante (les portes). En 1,1 s, c'est le meilleur liant du site. Un défaut : il se déclenche aussi pour une ancre dans la même page, avec le mauvais titre.

**Le fil (sarment).** C'est toujours un fil olive terminé par un point bordeaux, avec une traîne en pointillés. Il n'a ni feuille ni vrille, et il passe à travers les cartes des distinctions. On ne le remarque pas.

**Les fins de page sont le même gabarit sur cinq pages :** photo cintrée à gauche, titre, bouton. On le retrouve sur l'accueil, Chambres, Séjour, Alentours et Réserver. Sur quatre d'entre elles, le dernier écran montre une photo rognée à côté d'un grand vide avant le pied de page.

### 3. Que se passe-t-il quand il réserve ?

Le parcours, étape par étape :
1. Clic sur « Réserver » (en-tête ou barre du téléphone), puis voile.
2. Arrivée sur « Choisissez votre clé ». Le tableau en bois, petit, montre 5 clés identiques sur un fond de papier quadrillé.
3. Clic sur une clé : la page descend au formulaire, la clé s'efface du tableau, et une icône de clé d'environ 20 px apparaît dans le récapitulatif.
4. Dates : ce sont les champs natifs du navigateur (mm/dd/yyyy dans un navigateur anglais).
5. « Préparer ma demande » remplit le récapitulatif : « Mathilde · 18 déc. → 21 déc. · 3 nuits · taxe 6,48 € (2 × 3 × 1,08 €) ». Un petit tampon « DEMANDE PRÊTE » s'ajoute, avec le bouton « Continuer sur la réservation sécurisée », qui mène à eviivo.

Ce qui manque :
- Il n'y a **aucun prix** : « Prix de la nuit : affiché sur la réservation sécurisée », et le libellé passe encore sur deux lignes.
- Il n'y a ni photo de la chambre ni chiffre fort.
- Le visiteur doit tout ressaisir chez eviivo.

Depuis Chambres, « Réserver Mathilde » présélectionne bien la chambre. Mais on arrive en haut de page, face au tableau à clés, comme si on n'avait rien choisi.

Le moment fort n'existe pas.

### 4. Qu'est-ce qui est spectaculaire au premier défilement de l'accueil ?

Il y a toute la panoplie :
- la serrure ;
- le trousseau ;
- la maison 3D qui se monte, puis dont le toit se lève (épinglée sur 3,8 écrans) ;
- le défilé de prénoms géants ;
- « Isabelle + Denise », où la photo s'agrandit jusqu'au plein écran ;
- les tampons « INCLUS » ;
- le cadran vert ;
- les distinctions en demi-cercles ;
- la ronde 3D.

Aucun de ces effets n'a la matière d'un objet réel :
- le trousseau est un disque crème plat ;
- la maison est en blocs de couleur (maison de poupée) qui ne ressemblent pas à la vraie façade en pierre claire avec ses fenêtres cintrées et son balcon ;
- le seul moment « cinéma », la terrasse en plein écran, s'appuie sur une photo moyenne : dallage gris, chaises de jardin.

L'accueil fait **15,9 écrans** sur ordinateur et 15,5 sur téléphone. Il y a un écran presque vide à 91 % (76 % vide), juste après la ronde.

### 5. Chaque page a-t-elle sa signature, ou les pages se ressemblent-elles ?

Les objets d'ouverture sont distincts : trousseau, portes, cadran, carte à la voiture, numéro géant, tableau à clés. La 404 n'en a aucun. Les portes de Chambres sont la meilleure idée du site.

Mais ce qui se répète, déjà relevé en v1, est toujours vrai :
- **Même gabarit d'ouverture** (texte à gauche, objet encadré à droite) sur Séjour, Alentours et Réserver.
- **Le cadran** est identique entre la section « Ce soir » de l'accueil et l'ouverture de Séjour.
- **La ronde** est identique entre l'accueil et Alentours.
- **Le titre coupé en deux** qui s'écarte sur une photo qui grandit sert deux fois (« Isabelle + Denise » et « Garrigue et cirques »).
- **Les cinq fins de page** sont identiques.
- **Les cartes à bordure** reviennent partout : étages, chambres, inclus, distinctions, ronde, fiches techniques ×4, comparatif, demande, récapitulatif.

Le site est aussi trop proche des trois dernières maquettes (Hacienda 2, agence ae, Grandry) :
- fond crème ;
- Fraunces ;
- seconde ligne de titre en italique colorée ;
- boutons pilules ;
- surtitres en capitales espacées ;
- pastille « Illustration générée » ;
- pied de page « Confort de lecture ».

On reconnaît le gabarit maison avant de reconnaître Lo Componaïro.

### Ce que j'ai vu de l'accueil régénéré à 15 h 43 (une seule passe, état peut-être en cours)

**Dans la bonne direction :**
- 9 écrans ;
- la vraie façade en grand, avec les étages qui se succèdent (rez, 1er, 2e) et les vraies photos des chambres ;
- l'inclus en liste italique sur fond sombre, plus de cartes ;
- les vraies photos d'alentours (Pont du Diable, Navacelles, gorges) ;
- la preuve « 9,5 / 10 sur Booking.com (2025) » remontée dans l'ouverture.

**À surveiller :**
- le trousseau a disparu de l'ouverture : on perd la signature « quatre clés » ;
- l'ouverture devient un « titre à gauche, photo de porte à droite » très courant ;
- « Isabelle + Denise » reste un titre posé en travers de deux photos ;
- la fin garde la photo cintrée, puis la photo d'escalier rognée et un vide avant le pied de page.

---

## 2. Les notes (version validée)

5 = site primé (site du jour Awwwards), 3 = bon site d'agence.

| Page | Fidélité au lieu | Effet signature | Images | Composition et finition | Rythme sans vides | Typo et lisibilité | Niveau vitrine et palmarès | Envie d'agir | Moyenne |
|---|---|---|---|---|---|---|---|---|---|
| Accueil | 3 | 2 | 3 | 2 | 1 | 3 | 2 | 3 | **2,4** |
| Chambres | 4 | 2 | 3 | 2 | 3 | 3 | 2 | 3 | **2,8** |
| Votre séjour | 4 | 2 | 3 | 3 | 2 | 3 | 2 | 3 | **2,8** |
| Alentours | 3 | 2 | 2 | 2 | 3 | 2 | 2 | 3 | **2,4** |
| Contact | 3 | 2 | 2 | 3 | 3 | 3 | 2 | 3 | **2,6** |
| Réserver | 3 | 2 | 2 | 2 | 3 | 3 | 2 | 3 | **2,5** |
| 404 | 2 | 1 | 2 | 3 | 3 | 4 | 2 | 3 | **2,5** |

Pourquoi ces notes :

**Accueil**
- On a de vraies photos et des faits exacts. Mais les objets dessinés font jouet : disque plat, maison en blocs.
- La bande de vignes est générée et les distinctions n'ont pas de logos.
- Il y a des cartes à bordure partout.
- Avec 15,9 écrans, le rythme vaut 1 selon la grille.

**Chambres**
- Les photos sont les bonnes, et chacune est attribuée à la bonne chambre : 24 m² = Isabelle, « ou » = Denise, 16 m² = Mathilde, 15 m² = Suzanne.
- Mais les portes sont des aplats et les 4 blocs sont identiques.
- Les filtres sont cassés.
- On est loin du « couloir des portails » de games42.

**Votre séjour**
- Les horaires et les conditions sont exacts : je les ai vérifiés sur le site actuel.
- Mais le cadran est plat, ne se touche pas et doublonne celui de l'accueil.
- La journée tient sur 5,2 écrans de cases identiques.
- La photo « 22 h » montre une horloge qui marque midi et quart.

**Alentours**
- 3 images sont générées, dont une sur 2,2 écrans, alors que la maison a ses propres photos du Pont du Diable, de Navacelles et des gorges.
- La voiture est un jouet et cache « Sète ».
- La carte est inerte.
- Le texte des cartes de la ronde est réduit par la 3D.

**Contact**
- Le numéro géant est un bon geste.
- Mais il y a un mur généré, la photo de l'allée est réduite à un bandeau, le plan n'a que trois points, et le formulaire est standard.

**Réserver**
- Il n'y a ni prix ni moment fort.
- Le tableau est petit, avec des clés identiques sur un papier quadrillé.
- Les dates sont des champs natifs et les choix de chambre n'ont pas de photo.

**404**
- La photo générée montre une chambre qui n'est aucune des quatre, et la page n'a aucun geste.
- Le titre « Cette clé n'ouvre aucune porte. » est bon.
- On est loin de « Ce mur attend son œuvre » (Sequoia) et de « Cette page a fermé à minuit » (Hacienda).

---

## 3. Tout ce qu'un client exigeant ou un directeur artistique relèverait

Pour chaque point : **où** (page, section, format), ce qui ne va pas, puis **à la place**.

### 3.1 Toutes les pages

**À corriger absolument**

1. **Images générées alors que les vraies existent** (ordinateur et téléphone). Il y en a six :
   - la bande « vignes » de l'accueil ;
   - à Alentours, les gorges de « La ronde des sites », la garrigue plein écran de « Garrigue et cirques » et les « Marchés locaux » ;
   - le « mur » de Contact ;
   - la chambre de la 404.

   À la place :
   - vignes → `alentours-pouzols-8.jpg` (cycliste dans les vignes, lumière rasante) ou `24m2-5.jpg` (le jardin vu de la terrasse) ;
   - gorges → `alentours-pouzols.jpg` (gorges de l'Hérault) ;
   - garrigue plein écran → `alentours-pouzols-9.jpg` (Navacelles vu d'en haut) ou `alentours-pouzols-8.jpg` ;
   - marchés → supprimer la vignette ;
   - mur de Contact → `chambre-hotes-herault-vers-20.jpg` (le portail bleu sur la rue) ;
   - 404 → `16m2-8.jpg` (la vraie porte vert olive de la maison).
2. **« À confirmer » ou « à compléter » visibles par le visiteur.** On les trouve à ces endroits :
   - « 17 ou 24 m² (à confirmer) » : légende du trousseau, Chambres (3 fois), Réserver ;
   - « Notes Google et TripAdvisor : à compléter » : accueil ;
   - « … les autres sont à compléter » : Alentours ;
   - « Politique de confidentialité : à compléter » : Contact.

   À la place :
   - Faire trancher Denise par le client. Le site actuel écrit « 17m2 ou 1 er étage 24M2 », probablement une coquille. En attendant, afficher « 1er étage · terrasse · vue village » sans surface.
   - Supprimer la ligne sur les notes.
   - Garder seulement la mention « Maquette » du pied de page.
3. **Garage « gratuit et inclus »** (Séjour, Accueil, Réserver). Le site actuel dit à la fois « gratuit » et « 8 €/jour ». À faire trancher. En attendant : « Garage fermé jusqu'à 23 h, prise Green'Up », sans « gratuit ».
4. **Relevé à compléter**, voir l'introduction. Il faut aussi remettre « une bouteille d'eau fraîche, des biscuits gourmands » dans « Ce que vous trouvez en ouvrant la porte ».
5. **Intro de 3 s à chaque chargement complet**, sur toutes les pages. À la place :
   - la jouer une fois par session ;
   - la limiter à environ 1,2 s quand on arrive directement sur une page intérieure ;
   - la passer dès que le visiteur fait défiler.

**À améliorer**

6. **Fins de page identiques**, avec un vide avant le pied de page (Accueil, Chambres, Séjour, Alentours, Réserver ; ordinateur et téléphone). Il faut une fin différente par page, qui touche le pied de page :
   - **Accueil** : la porte d'entrée en plein cadre (`chambre-hotes-herault-vers-3.jpg`), dans laquelle entre la clé du trousseau.
   - **Chambres** : les 4 clés à décrocher, qui mènent directement à `/reserver?chambre=…`.
   - **Séjour** : le portail bleu (`chambre-hotes-herault-vers-20.jpg`) avec « Arrivée 17 h – 20 h 30 ».
   - **Alentours** : la bouteille de rosé sur la table en mosaïque au couchant (`chambre-hotes-herault-vers-8.jpg`), sous « Le soir, on rentre à la maison ».
   - **Réserver** : la carte cadeau comme un objet (voir 3.7).
7. **Le sarment.** C'est un fil olive avec un point, qui traverse le contenu (distinctions de l'accueil) et qu'on ne remarque pas. Deux choix :
   - en faire une vraie vigne (feuilles, vrilles, grappe sur Réserver), seulement aux changements de section ;
   - ou le supprimer, puisque le voile et le trousseau portent déjà le lien.
8. **Gabarit commun aux dernières maquettes.** Lo Componaïro reprend la recette « crème, Fraunces, seconde ligne en italique colorée, pilules, surtitres espacés ». À la place :
   - des titres où l'italique porte les prénoms, pas la deuxième ligne ;
   - des boutons à coins vifs, façon étiquette de clé en laiton ;
   - des surtitres en petites capitales de Fraunces plutôt que dans l'autre police, très espacée ;
   - une couleur de page qui n'est pas la crème habituelle : le blanc cassé des murs du 2e (`15m2-4.jpg`) ou la tomette.
9. **Cartes à bordure partout.** En faire des listes typographiques à filets (comme l'inclus de la nouvelle version) et réserver la carte à un seul usage : la fiche de réception.

**Finition**

10. Sur téléphone, le pied de page fait près de 1,5 écran : le passer en 2 colonnes.
11. Le `h1` de l'accueil se lit « Quatre chambres,quatre histoires. » (sans espace) pour les lecteurs d'écran et les moteurs de recherche. Ajouter l'espace avant le retour à la ligne.

### 3.2 Accueil

**À corriger absolument**

1. **Longueur** : 15,9 écrans sur ordinateur, 15,5 sur téléphone. La maison est épinglée sur 3,8 écrans, la suite fait 2,3 écrans, et un écran à 76 % vide suit la ronde. Viser 8 à 10 écrans :
   - fusionner « Inclus » et « Ce soir » ;
   - épinglage de la maison à 1,5 écran au plus ;
   - suite à 1,2 écran ;
   - supprimer le défilé de prénoms.
2. **Ouverture, le trousseau** (ordinateur et téléphone).
   - Le défaut : c'est un disque crème plat avec 4 clés vectorielles identiques. Les étiquettes sont à l'envers dès qu'on tourne (« Denise », « Mathilde », « Suzanne »). Sur téléphone, il fait environ 150 px dans un coin et ses étiquettes sont illisibles.
   - À la place : un vrai trousseau en laiton, avec relief, reflets et ombre portée sur la façade, plus grand que son cadre. Les étiquettes pendent et restent à l'endroit. Sur téléphone, il est centré, à environ 70 % de la largeur, au-dessus du titre.
   - **Et surtout**, choisir une clé change la photo de fond et le bouton :
     - Isabelle → `24m2-9.jpg` (cheminée, murs jaunes) ;
     - Denise → `chambre-isabelle-terrasse-4.jpg` (lit en rotin, murs orangés) ;
     - Mathilde → `16m2-4.jpg` (murs rouges, poutres) ;
     - Suzanne → `15m2-4.jpg` ;
     - le bouton devient « Réserver Denise » (lien `?chambre=denise`).
3. **« La maison, étage par étage »** (maison 3D).
   - Le défaut : des blocs de couleur qui font jouet et ne ressemblent pas à la façade. Suzanne est en gris alors que ses murs sont ocre. « Isabelle », en clair sur le bloc jaune, se lit mal. Sur téléphone, le toit levé recouvre le sous-titre.
   - À la place : la vraie façade (`chambre-hotes-herault-vers-5.jpg`) en plein cadre. Au défilement, chaque étage s'éclaire : le garage voûté au rez, les terrasses au 1er, les fenêtres sous le toit au 2e. La photo de chaque chambre sort de sa fenêtre. La version de 15 h 43 commence à le faire.
4. **« Ce qu'en disent les guides et les voyageurs »**.
   - Le défaut : 5 demi-cercles de texte, sans aucun logo, alors que la maison a tous ses macarons :
     - Petit Futé 2025 et 2026 (`chambre-hotes-herault-vers-22.jpg` et `-23.jpg`) ;
     - Booking 9,5 (`-17.png`) ;
     - Kayak (`-16.png`) ;
     - Team 68° (`-11.png`) ;
     - ANCV (`-24.png`).
   - À la place : « 9,5 / 10 » en chiffre géant, comme le « 4,9 » de games42, avec les macarons réels à côté. Remonter aussi « 9,5 / 10 Booking · Petit Futé 2025-2026 » sous les boutons de l'ouverture.
5. **Bande « vignes » générée**, voir 3.1-1.

**À améliorer**

6. **Ouverture, la photo.**
   - Le défaut : la façade est assombrie à environ 60 %, elle en devient boueuse. Une petite croix occitane flotte sous « histoires. ». Le trousseau mord sur « CLÉ DE LA CHAMBRE ».
   - À la place : un dégradé sous le texte seulement, la croix retirée (ou intégrée au logo), et la légende sous le trousseau, pas à côté.
7. **« Aux prénoms de nos grands-mères ».**
   - Le défaut : un défilé de prénoms rose pâle, décoratif et peu lisible, puis 4 cartes à bordure avec une étiquette penchée.
   - À la place : 4 portraits verticaux à fond perdu, côte à côte, avec le prénom en grand en bas. Au survol, la photo s'élargit et montre le détail de la chambre :
     - Isabelle : la radio ancienne `24m2-3.jpg` ;
     - Denise : les paniers au mur ;
     - Mathilde : le téléphone à cadran `16m2-6.jpg` ;
     - Suzanne : l'étagère jaune `15m2.jpg`.
8. **Suite « Isabelle + Denise ».**
   - Le défaut : la terrasse en plein écran (`24m2-4.jpg`) est la photo la plus faible du site quand elle est en très grand : dallage gris, chaises de jardin. Le titre finit en « Isabelle … + Denise », avec un trou au milieu. Sur téléphone, le texte reste longtemps en transparence sur la photo, illisible.
   - À la place : un diptyque des deux chambres (`24m2-9.jpg` et `chambre-isabelle-terrasse-3.jpg`, les deux lits) qui s'ouvrent l'une vers l'autre, puis la terrasse en photo moyenne (`chambre-isabelle-terrasse-15.jpg`). Le texte n'apparaît que sur fond uni.
9. **« En direct, tout est compris ».**
   - Le défaut : 4 petites cartes « INCLUS » et 2 vignettes.
   - À la place : une note de séjour (Nuit · Petit-déjeuner · Garage · TVA, chaque ligne tamponnée), à côté de la table du petit-déjeuner vue d'en haut (`chambre-hotes-herault-vers-13.jpg`) en grand.
10. **« Ce soir ».**
    - Le défaut : le cadran vert est le même que l'ouverture de Séjour.
    - À la place : une phrase vivante sur la photo du portail, par exemple « Il est 15 h 26 à Pouzols : l'accueil ouvre dans 1 h 34 » (`chambre-hotes-herault-vers-20.jpg`). Garder le cadran pour Séjour seulement.
11. **Ronde des sites.**
    - Le défaut : identique à Alentours, avec des cartes à pictogrammes de 230 px.
    - À la place : 3 photos réelles en grand (Pont du Diable, Navacelles, gorges), avec leur distance, puis un lien vers Alentours.

**Finition**

12. Le soleil qui suit la souris est invisible : le rendre lisible (lumière rasante sur la façade) ou le retirer.
13. Le sarment traverse les cartes des distinctions.
14. « Prévenir de mon arrivée · 06 88 71 26 01 » : très bien, à garder.

### 3.3 Chambres

**À corriger absolument**

1. **Filtres du comparatif inopérants** (ordinateur et téléphone), voir la question 1. Masquer vraiment les lignes écartées (repli en hauteur) et afficher le nombre de résultats, par exemple « 2 chambres avec terrasse ».
2. **Portes de l'ouverture.**
   - Le défaut : des aplats vert uni et une poignée en trait. Le survol ne fait rien. Au clic, le voile bordeaux affiche « Les chambres » au lieu du prénom.
   - À la place : des portes moulurées tirées des vraies portes, la porte vert olive (`16m2-8.jpg`) ou la porte blanche à panneaux (`16m2-7.jpg`), avec une poignée en laiton. Au survol, un filet de lumière chaude dans l'entrebâillement. Au clic, la porte s'ouvre en perspective et la photo de la chambre remplit l'écran, sans voile.
3. **Denise « 17 ou 24 m² (à confirmer) »**, 3 fois sur la page, voir 3.1-2.

**À améliorer**

4. **Le couloir**, sur 4,5 écrans (6,4 sur téléphone).
   - Le défaut : 4 blocs identiques en zigzag (arc, étiquette, 4 cartes Étage/Surface/Couchage/Vue, pastilles, 3 vignettes, bouton).
   - À la place : une chambre par écran. Une grande photo à fond perdu, le prénom très grand, une seule ligne de données (« 1er étage · 24 m² · 160 × 200 · vue village · terrasse · cheminée »), et 3 détails qui s'agrandissent au clic.
5. **Chaque photo sert deux fois** (dans la porte, puis dans le couloir). Mettre un détail dans la porte, une vue large dans le couloir.
6. **Comparatif.**
   - Le défaut : les lignes sont en cartes, les photos en pastilles de 50 px. La colonne surface casse en « 17 ou 24 m² (à / confirmer) » et « 90 / × 200 ».
   - À la place : un tableau à filets. Ajouter les colonnes du relevé : cheminée, parquet et poutres, lit d'appoint enfant, terrasse.
7. **« Ce que vous trouvez en ouvrant la porte ».**
   - Le défaut : une liste à coches et 2 petites photos. L'une est un recadrage beige qui reste flou au chargement.
   - À la place : ajouter l'eau fraîche et les biscuits, et montrer la machine à expresso (`16m2-3.jpg`) plutôt qu'un mur.
8. **Fin**, voir 3.1-6.

**Finition**

9. « Réserver Mathilde » : la présélection marche, mais on arrive en haut, devant le tableau à clés. Faire arriver sur l'étape « dates », avec la clé déjà dans le récapitulatif.
10. Sur téléphone, les 4 portes de 80 px côte à côte sont illisibles. Les passer en 2 × 2, ou une porte par écran en carrousel.
11. Les étiquettes « ÉTAGE », « SURFACE »… en capitales d'environ 9 px sont trop petites.

### 3.4 Votre séjour

**À corriger absolument**

1. **Ouverture, le cadran.**
   - Le défaut : on ne peut pas le manipuler, et c'est le même que celui de l'accueil. Ses étiquettes en italique minuscule chevauchent l'aiguille (« Option », « Départ »). « Il est 15 h 41 à Pouzols » flotte loin dessous.
   - À la place : un grand cadran qu'on tourne au doigt, comme le cadenas à molettes de games42. L'aiguille fait changer la photo et la phrase de l'heure :
     - 8 h 30, la table du petit-déjeuner ;
     - 11 h, la porte ;
     - 14 h 30 et 17 h, l'allée ;
     - 22 h, le portail ;
     - 23 h, le garage.
2. **« 22 h, Dernières clés »** : la photo d'horloge marque midi et quart. Mettre la porte d'entrée (`chambre-hotes-herault-vers-3.jpg`) ou le portail.
3. **Garage « gratuit et inclus »**, voir 3.1-3.

**À améliorer**

4. **« Une journée, de 8 h 30 à 23 h ».**
   - Le défaut : 6 étapes identiques (photo à gauche, heure en grand italique à droite) sur 5,2 écrans. « 23 h Garage » montre la façade, et la vraie photo du garage arrive juste après.
   - À la place : une frise épinglée, comme la carte collante d'instinct-aventure, où l'heure change et les photos se fondent, en 2 écrans. Fusionner « 23 h » et « Motards et cavaliers » sur le garage voûté (`chambre-hotes-herault-vers-7.png`), en plein cadre une seule fois.
5. **Gabarit d'ouverture** : c'est le même que Alentours et Réserver (aplat, texte à gauche, objet à droite). Le cadran plein cadre du point 1 le casse.
6. **Conditions et FAQ** : propres, mais longs (1,9 écran). Les textes sont justes, j'ai vérifié chaque condition. Ne garder que 5 questions, et fondre les autres dans les conditions.

**Finition**

7. Sur téléphone, le chevauchement « Tout est clair ? » de la planche était un artefact de capture. En direct, c'est correct.
8. Fin, voir 3.1-6.

### 3.5 Alentours

**À corriger absolument**

1. **Images générées**, voir 3.1-1. « Garrigue et cirques » occupe 2,2 écrans avec une image générée, et le titre touche les deux bords, ou est rogné, à 1440 comme au téléphone. Garder un seul titre coupé sur tout le site, et le mettre ici sur Navacelles (`alentours-pouzols-9.jpg`), avec des marges.
2. **Carte d'ouverture.**
   - Le défaut : elle ne réagit à rien. La voiture, dessinée comme un jouet dans son médaillon, cache « Sète et l'étang de Thau » : on lit seulement « …au ». Sur téléphone, les noms font environ 6 à 7 px.
   - À la place :
     - une carte gravée, façon carte ancienne, en plein cadre ;
     - au survol d'un site, la route se trace depuis Pouzols et la durée s'affiche ;
     - la ronde suit la carte ;
     - la voiture devient la vraie 2 CV de la maison (photo à demander : elle est sur le site actuel mais absente de `recu`), dans une marge qui ne cache rien.
3. **Textes génériques.** « Cité par la maison parmi les grands sites des alentours » se répète, et « les autres sont à compléter » s'affiche. Remplacer par les phrases réelles du site actuel :
   - Saint-Guilhem « parmi les plus beaux villages de France » ;
   - Clamouse : 11 km, 2 à 3 h de visite ;
   - Salagou : Grand Site de France en juin 2024 ;
   - Pézenas : ville de Molière, 25 min ;
   - Montpellier : 25 min, ou 20 min en tram jusqu'à la Comédie ;
   - Sète : moins de 30 min ;
   - le centre équestre : 5 min.

**À améliorer**

4. **La ronde.** Ses cartes à pictogrammes n'ont aucune photo. Utiliser :
   - Pont du Diable : `alentours-pouzols-2.jpg` ;
   - gorges : `alentours-pouzols.jpg` ;
   - Navacelles : `alentours-pouzols-9.jpg` ;
   - Montpellier : `maxresdefault.webp` (le Peyrou) ou `alentours-pouzols-6.png` ;
   - pont Canet : `pont-canet.jpg`.
5. **« Sans reprendre la route bien loin ».** La carte « Les Estivales » est vide (un masque dessiné), le marché est généré, et le centre équestre est une photo de banque (`logo-sombre.jpg`). À la place, une liste typographique de 3 lignes : centre équestre à 5 min, marchés, Estivales à Lattes les mardis et jeudis soir l'été (vins et tapas).
6. **Gabarit d'ouverture** : le même que Séjour et Réserver. La carte en plein cadre du point 2 le casse.

**Finition**

7. « Prêt pour votre randonnée ? » est une phrase du client : la garder, mais sur une photo réelle.
8. Fin, voir 3.1-6.

### 3.6 Contact

**À corriger absolument**

1. **« Une question avant de venir ? »** : le mur généré, voir 3.1-1.
2. **« Par l'A750, sortie Gignac ».**
   - Le défaut : un plan fait d'une courbe et trois points, et « 34 km » répété trois fois (pastille, tableau, texte).
   - À la place : le tracé Montpellier → sortie Gignac → Pouzols, dessiné finement, avec la photo de l'allée à l'arrivée (`chambre-hotes-herault-vers-4.jpg`) et le garage voûté pour « le garage vous attend au bout de la route ».

**À améliorer**

3. **Ouverture.**
   - Le défaut : sur ordinateur, le numéro géant est à gauche et tout le côté droit est vide. Juste dessous, la photo de l'allée est réduite à un bandeau panoramique qui perd son sujet.
   - À la place : à droite du numéro, l'allée en photo verticale sur toute la hauteur. Ajouter la ligne « Accueil de 17 h à 20 h 30 · il est 15 h 41 ».
4. **Formulaire.** Champs beiges dans une carte : c'est standard. Le faire en carnet de réception, comme le bon de commande de coupdefood, avec des sujets en puces : question, arrivée tardive, suite familiale, carte cadeau, motards et cavaliers.
5. **« La maison en photos et en avis ».** Trois tuiles Instagram, Facebook et TripAdvisor, sans aucun avis ni note. Afficher « 9,5 / 10 Booking 2025 » et « Petit Futé 2025 et 2026 », puis un lien vers les avis Google.
6. Le texte gris clair sur crème, sous le numéro, manque de contraste.

### 3.7 Réserver

**À corriger absolument**

1. **Aucun prix** (récapitulatif) : le visiteur prépare une demande qu'il devra refaire chez eviivo.
   - Demander au client un prix « à partir de » par chambre et par saison.
   - Sinon, le dire honnêtement dès l'ouverture : « Prix et disponibilités sur la réservation sécurisée ; ici, vous préparez votre séjour en 30 secondes ».
   - Vérifier si le lien eviivo peut recevoir les dates choisies.
2. **Pas de moment fort à l'envoi.**
   - Le défaut : une icône de clé d'environ 20 px dans le récapitulatif et un petit tampon.
   - À la place, une fiche de réception plein format :
     - la clé gravée au prénom de la chambre ;
     - la photo de la chambre ;
     - « 3 nuits » en très grand ;
     - « ven. 18 → lun. 21 déc. » ;
     - la liste de ce qui est inclus et la taxe ;
     - un bouton couleur laiton « Continuer sur la réservation sécurisée ».

     La fiche reprend les tarifs de talon-libre et d'iprof, mais avec la matière de la maison.
3. **Tableau à clés.**
   - Le défaut : il fait environ 250 × 130 px à 1440. Ses 5 clés sont identiques, sur un fond de papier quadrillé d'écolier qui n'a rien à voir avec une maison de 1850.
   - À la place :
     - un tableau en bois sombre sur toute la largeur ;
     - une clé différente par chambre (anneau, panneton, étiquette manuscrite) ;
     - au clic, la clé se décroche avec son ombre ;
     - pour le fond, le mur crème de la maison.
4. **Dates.** Ce sont les champs natifs (mm/dd/yyyy dans un navigateur anglais). Faire un calendrier maison sur deux mois, qui compte les nuits.

**À améliorer**

5. **Choix de la chambre** : des boutons de texte gris, sans photo. Mettre des vignettes photo avec le prénom.
6. « Prix de la nuit » passe toujours sur deux lignes dans le récapitulatif (relevé en v1, non corrigé).
7. Arrivée avec `?chambre=`, voir 3.3-9.
8. L'encadré « Réservation simulée… » en tête du formulaire est nécessaire en maquette, mais il est trop visible : le placer en note sous le bouton.
9. **« Une nuit à offrir ? »** est la cinquième fin identique. En faire une carte cadeau dessinée comme un objet (Capcadeau), en une bande.

### 3.8 404

**À corriger absolument**

1. La photo générée montre une chambre qui n'est aucune des quatre (lit beige, parquet). Mettre la vraie porte vert olive (`16m2-8.jpg`) fermée.

**À améliorer**

2. Aucun geste. Faire qu'une clé tourne dans la serrure et bute (petite vibration), puis proposer les 4 portes comme liens vers les chambres.

**Finition**

3. Sur téléphone, la page fait 2,5 écrans à cause du pied de page, voir 3.1-10.

### 3.9 Ce que disait le regard v1 : où en est-on ?

**Corrigé :**
- la serrure de l'intro est lisible ;
- les apostrophes sont typographiques ;
- « Durée à compléter » et « Tables locales » ont disparu ;
- « La clé vous attend » et « Un appel suffit » ne se répètent plus ;
- la photo de garage n'est plus en double sur Séjour ;
- il n'y a plus d'horloge dans « Ce soir » ;
- le toit n'est plus coupé par l'en-tête ;
- le type ne recouvre plus l'icône dans la ronde ;
- les pastilles ne se chevauchent plus sur téléphone.

**Toujours vrai :**
- les étiquettes du trousseau à l'envers ;
- le trousseau de 150 px dans un coin sur téléphone ;
- « Isabelle » peu lisible sur le bloc jaune ;
- « Prix de la nuit » sur deux lignes ;
- « Garrigue et cirques » collé aux bords ;
- les noms minuscules de la carte sur téléphone ;
- le cadran et la ronde en double ;
- le gabarit d'ouverture commun à Séjour, Alentours et Réserver ;
- les 5 fins identiques avec un vide ;
- les images générées (6) ;
- le sarment en câble ;
- les portes plates ;
- l'inclus en petites cartes ;
- le tableau à clés petit et identique ;
- les dates natives ;
- le plan de Contact ;
- la 404 sage ;
- Denise « à confirmer ».

Aucun point de la liste « Pour la v2 » n'a été fait, sauf l'intro.

**Faux en v1** : la plupart des « faits absents du relevé ». Ils sont sur le site actuel, voir l'introduction.

---

## 4. Les dix améliorations qui changeraient le plus la perception du site

Classées de la plus forte à la moins forte.

1. **Mettre les vraies photos en grand partout**, et supprimer les 6 images générées : Navacelles, Pont du Diable, gorges, cycliste dans les vignes, portail bleu, porte verte, garage voûté, cheminée d'Isabelle, rotin de Denise.
2. **Accueil en 8 à 10 écrans**, construit sur la vraie façade photographiée dont les étages s'allument, à la place de la maison 3D en blocs. Épinglages courts, sections fusionnées, plus de vide après la ronde.
3. **Un trousseau en laiton qui sert à quelque chose** : relief et ombre, étiquettes à l'endroit, centré sur téléphone. Choisir une clé change la photo de fond pour la chambre et le bouton devient « Réserver Denise ».
4. **Un vrai moment de réservation** :
   - un tableau à clés pleine largeur, avec une clé différente par chambre ;
   - un calendrier maison ;
   - une fiche de réception (clé gravée, photo, nuits en grand, dates, inclus) ;
   - un prix « à partir de », ou une annonce honnête dès l'ouverture.
5. **Des portes de Chambres réelles** (porte vert olive moulurée, poignée en laiton, lumière dans l'entrebâillement) qui s'ouvrent en perspective sur la chambre plein cadre. Une chambre par écran, sans les 4 cartes de fiche technique. Réparer les filtres du comparatif.
6. **Des preuves visibles** : « 9,5 / 10 Booking » en chiffre géant et les vrais macarons (Petit Futé 2025-2026, Kayak, Team 68°, ANCV), remontés dès l'ouverture.
7. **Casser les répétitions** :
   - le cadran seulement sur Séjour, et manipulable ;
   - la ronde seulement sur Alentours, avec photos et liée à la carte ;
   - un seul titre coupé ;
   - cinq fins de page différentes, qui touchent le pied de page ;
   - moins de cartes à bordure.
8. **Une carte d'Alentours vivante** : gravée, routes tracées au survol, voiture qui ne cache rien (la vraie 2 CV), et les phrases réelles du site actuel à la place des textes génériques.
9. **Plus rien d'« à confirmer » ou d'« à compléter » à l'écran.** Faire trancher par le client : Denise (17 ou 24 m²), garage (gratuit ou 8 €/jour), notes d'avis. Compléter le relevé et remettre l'eau fraîche et les biscuits.
10. **Alléger les liants et sortir du gabarit maison** :
    - intro une fois par session (1,2 s sur une page intérieure) ;
    - sarment transformé en vraie vigne ou supprimé ;
    - voile avec le bon titre ;
    - abandonner la formule « seconde ligne italique colorée, pilules, surtitres espacés » commune aux dernières maquettes.
