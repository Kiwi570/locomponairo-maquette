# Regard neuf : Lo Componaïro, v1 (10 novembre 2026)

Sources : planches 1440 et 390 des 7 pages, films de l'accueil, palmarès, textes. J'ai aussi fait mes propres captures du clic sur une clé et de l'envoi (réserver), du voile (Contact → Chambres) et de la carte d'Alentours.

## Les cinq questions

1. **Ce que le visiteur peut toucher.** Sur l'accueil : le trousseau, les 4 puces de chambre, la maison 3D à attraper et la ronde des sites ; un soleil suit aussi la souris. Sur Chambres : les filtres du comparatif. Sur Séjour : la FAQ seulement, car le cadran ne fait que se regarder. Sur Alentours : la ronde. Sur Contact : le numéro et le formulaire, tamponné « Reçu ». Sur Réserver : le tableau à 5 clés et le formulaire. C'est assez riche, sauf Séjour.
2. **Ce qui relie les pages.**
   - L'intro marche : les clés tombent sur l'anneau, puis le trousseau tourne et la page s'ouvre en trou de serrure sur l'objet de la page. Mais la serrure n'est qu'un trait presque invisible, et l'ouverture se lit comme un simple cercle.
   - Le voile en trou de serrure lie bien les pages : il part du clic, affiche le nom de la page, puis s'ouvre sur les portes.
   - Le sarment, lui, se lit comme un câble brun terminé par un point : pas de feuille ni de vrille, on ne le voit pas pousser.
3. **Ce qui se passe quand on réserve.** Le visiteur clique sur une clé du tableau : elle s'efface de son crochet, et c'est tout ce qu'il voit. À 1440×900, le récapitulatif est sous la ligne de flottaison, donc on ne voit pas la clé filer. Après l'envoi, le récapitulatif se remplit : 2 nuits, taxe à 4,32 €, tampon « Demande prête », bouton vers la réservation sécurisée. Il n'y a pas de prix, et donc pas de moment fort.
4. **Le spectacle au premier défilement de l'accueil.** Il y a tout : maison 3D, prénoms géants qui défilent, « Isabelle + Denise » en plein écran, ronde 3D. Mais tout est petit et sage : le trousseau est un disque plat, la maison est en cubes de jouet, la ronde a des cartes de 230 px. Sur les autres pages :
   - Chambres : portes, mais plates ;
   - Séjour : heures en grand dans une bande horizontale ;
   - Alentours : la garrigue en plein écran et la ronde ;
   - Contact : le numéro géant ;
   - Réserver : **aucune famille**.
5. **Les signatures.** Les objets d'ouverture sont tous différents. En revanche, Séjour, Alentours et Réserver partagent la même mise en page : texte à gauche, objet moyen dans un cadre à droite. Trois choses se répètent :
   - le cadran est identique sur l'accueil et sur Séjour ;
   - la ronde est identique sur l'accueil et sur Alentours ;
   - « Isabelle + Denise » et « Garrigue et cirques » utilisent le même titre coupé en deux.

   De plus, les 5 sections de fin sont identiques (photo cintrée, titre, bouton), et leur dernier écran est une photo rognée à côté d'un vide.

## À corriger avant livraison

1. **Mots trompeurs (fr.json).**
   - `accueil.hero.texte` dit « petit-déjeuner offert en réservation directe ». Remplacer par « petit-déjeuner et garage compris ». Le relevé dit « tarifs tout inclus », pas « offert ».
   - Même correction pour `pages.accueil.description` et `chambres.tete.info` (« inclus en direct »).
2. **Faits absents du relevé, à retirer.**
   - Dans `accueil.maison.manifeste` : « murs de pierre, carreaux de ciment ».
   - Dans `coupe.e4t` : « de pierre ».
   - Dans `accueil.chambres.texte` et dans `chambres.partout` (i1, i4, i5, i6) : chauffage, eau et biscuits, linge, sèche-cheveux, couettes françaises.
   - Dans `suite.texte` : « et son mobilier ».
   - Dans `journee.d1` et la FAQ : « plus tôt sur demande » pour le petit-déjeuner.
   - Dans `garage.texte` : « chaussons ».
   - Dans `c1` et la FAQ : « et modification ».
   - Dans `c4` et la FAQ : « 90 × 180 » et « linge, kit, petit-déjeuner ».
   - Dans `c5` : « plus » devient « pas ».
   - Dans la FAQ sur le paiement : « (à distance ou sur place) ».
   - Dans `inclus.texte` : « ni frais cachés ».
   - Dans `proches.p3t` : « l'été : vins et tapas ».
   - Dans `p5t` : « des motards ».
   - Dans chambres.json, les champs `dit` (marbre, fer forgé, rotin, couleurs des murs, « bureau devant la fenêtre ») : réécrire à partir du relevé.
   - Dans alentours.json : tous les `texte` et types inventés, surtout « Présenté par la maison comme l'un des plus beaux villages de France », qui prête une phrase à la maison.
3. **Contradictions.**
   - `coupe.e2t` dit « chacune avec sa terrasse », alors que la suite partage une terrasse fleurie. Écrire « avec terrasse, vue village ».
   - `coupe.sur` dit « De haut en bas », alors que les étapes montent. Écrire « De bas en haut ».
   - Le plan de contact.mjs (ligne 16) place « 34 km » sur le tronçon A750 → Montpellier, ce qui ferait 41 km au total. Mettre l'étiquette « 34 km » à côté de Montpellier.
4. **Répétitions de texte.**
   - « Quatre portes, quatre histoires » sur Chambres : remplacer par « Poussez une porte. ».
   - « La clé vous attend » apparaît 3 fois : la garder seulement sur l'accueil.
   - « Un appel suffit » apparaît 2 fois : `soir.texte` devient « Prévenez la maison ».
   - Dans le manifeste, retirer « le passé rencontre le présent » et le troisième « quatre ».
   - Dans `maison.texte`, retirer « une SAS ».
   - « Garage fermé… reste ouvert » devient « reste accessible ».
5. **Apostrophes.** Remplacer toutes les apostrophes droites ' par des typographiques ’ dans les JSON : elles se voient dans les grands titres (« s'ouvre », « l'A750 », « n'ouvre »).
6. **Accueil.**
   - Les étiquettes du trousseau tournent à l'envers (« Denise ») : il faut les faire contre-tourner.
   - Le prénom « Isabelle », en blanc sur le cube jaune, est illisible : le passer en foncé.
   - Le toit levé est coupé par l'en-tête : réduire la scène d'environ 10 %.
   - Retirer la photo d'horloge de la section « soir » : avec le cadran, cela fait deux horloges côte à côte.
7. **Séjour.** La même photo `garage` sert à l'étape 23 h et juste dessous, dans « Motards » (sejour.mjs, l. 14 et 57). En changer une.
8. **Réserver.**
   - Au clic sur une clé, faire défiler jusqu'au récapitulatif avant l'envol, pour qu'on voie la clé filer.
   - Empêcher le retour à la ligne de « Prix de la nuit ».
9. **Textes « à compléter » visibles.**
   - Masquer « Durée à compléter », affiché sur 8 cartes sur 12.
   - Retirer la carte « Tables locales ».
   - `sites.texte` devient « Les sites cités par la maison. ».
10. **Téléphone.**
    - Sur l'accueil, le trousseau est réduit à 110 px dans un coin et la pastille « Faites tourner » le couvre : le centrer à environ 70 vw au-dessus du titre.
    - Les pastilles « Schéma illustratif » et « Attrapez la maison » se chevauchent.
    - Sur les cartes de la ronde, le type recouvre l'icône.
    - « Garrigue et cirques » est rogné des deux côtés, y compris en 1440.
    - Les noms de la carte d'Alentours font environ 6 px : les grossir sous 760 px.

## Pour la v2

- **Trousseau.** En faire un vrai objet en laiton (relief, ombre, étiquettes qui pendent), plus grand que son cadre.
- **Intro.** Dessiner une entrée de serrure lisible.
- **Sarment.** En faire une vraie vigne, avec feuilles et vrilles, qui pousse avec le défilement et finit en grappe sur Réserver.
- **Couloir des chambres.** Les portes sont des aplats SVG, nettement en dessous de games42 (« couloir des portails »). Il faudrait des portes moulurées, une lumière dans l'entrebâillement et l'ouverture en perspective plein cadre.
- **« Inclus ».** Quatre petites cartes tamponnées, loin de nelis, willowcamp et sensoria. Il faut un objet fort, par exemple un carnet de réception.
- **Réserver.**
  - Le tableau est petit et ses clés sont identiques.
  - Le récapitulatif n'a pas de chiffre fort, loin de tiki-cassis et d'iprof : en faire une fiche de réception, avec la clé gravée et les nuits en grand.
  - Les dates s'affichent en mm/dd/yyyy dans un navigateur anglais : prévoir un calendrier maison.
- **Contact.** Le plan en trois points est loin du palmarès carte, le formulaire est banal et l'image du mur est générée.
- **Composants en double.** Donner à Alentours une ronde liée à la carte, et à Séjour un cadran plein écran qu'on puisse tourner.
- **Ouvertures.** Casser le gabarit commun à Séjour, Alentours et Réserver : par exemple la carte en plein cadre, et le tableau à clés comme mur entier.
- **Fins de page.** Varier les 5 sections de fin et supprimer le vide avant le pied de page.
- **Photos.**
  - Il y a 7 illustrations générées (vignes, gorges, garrigue, marché, mur, 404…) alors que la maison a de vraies photos.
  - `petit-dejeuner-table` apparaît 4 fois, `escalier` 3 fois, `garage` 3 fois, `maison-allee` 2 fois.
- **Téléphone.** La maison 3D ne s'y ouvre pas sur les chambres.
- **404.** Elle est sage : ajouter un geste de clé ou de serrure.
- **Denise.** L'affichage « 17 ou 24 m² (à confirmer) » est à faire trancher par le client.
