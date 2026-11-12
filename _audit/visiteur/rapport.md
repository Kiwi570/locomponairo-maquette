# Test « vrai visiteur » : couple de motards lyonnais, week-end de mai, garage fermé, réservation en direct

Date : 12 novembre 2026. Outil : `node _audit/visiteur.mjs`, piloté geste par geste, chaque capture regardée. Le site n'a pas été modifié.
Toutes les captures sont dans `/home/claude/locomponairo-maquette/_audit/visiteur/` (chemins ci-dessous relatifs à ce dossier).
Les dossiers `m1-…` à `m6-…` sont les parcours notés ; les `explo-…` sont des repérages ou des vérifications. Les dossiers `premier-ecran-*`, `prix-*`, `reserver-*`, `venir-*`, `difference-*` et `moto-*` datent du test du 10 novembre et ne font pas partie de ce test.
Les secondes sont celles du journal de l'outil, chargement de la page d'arrivée compris (environ 3,2 s). Aucune erreur JavaScript relevée dans les parcours.

## Tableau des missions

| Mission | Format | Verdict | Gestes | Secondes | Capture |
|---|---|---|---|---|---|
| 1 Premier écran (de quoi, pour qui, où) | téléphone | **ratée** : le lieu manque | 0 | 3,2 | `m1-arrivee-390x844/etape-0.png` |
| | ordinateur | réussie | 0 | 3,2 | `m1-arrivee-1440x900/etape-0.png` |
| 2 Prix ou comment l'obtenir | téléphone | réussie de justesse, sans prix chiffré | 3 | 9,5 | `m2-prix-c-390x844/etape-4.png` |
| | ordinateur | réussie, sans prix chiffré | 2 | 7,9 | `m2-prix-1440x900/etape-4.png` |
| 3 Réserver jusqu'à « Demande prête » | téléphone | réussie, **hors barème** | 7 (6 pour le clic d'envoi) | 14,2 (11,1) | `explo-reserver-fin-390x844/etape-9.png` (`m3-reserver-390x844/etape-7.png`) |
| | ordinateur | réussie, **hors barème** | 6 (7 pour voir le tampon entier) | 11,1 (11,7) | `m3-reserver-1440x900/etape-8.png` (`explo-reserver-fin-1440x900/etape-7.png`) |
| 4 Joindre ou venir (tél., adresse, arrivée) | téléphone | réussie | 2 | 6,6 | `m4-venir-390x844/etape-3.png` |
| | ordinateur | réussie | 1 | 5,8 | `m4-venir-1440x900/etape-1.png` |
| 5 Ce qui distingue la maison (30 s) | téléphone | réussie | 3 | 26,8 | `m5-difference-390x844/etape-4.png`, `etape-7.png`, `etape-9.png` |
| | ordinateur | réussie | 3 | 26,4 | `m5-difference-1440x900/etape-4.png`, `etape-7.png`, `etape-9.png` |
| 6 Garage pour la moto et photo de la chambre | téléphone | réussie | 2 | 7,8 | `m1-arrivee-390x844/etape-0.png` (horaires) puis `m6-garage-chambre-390x844/etape-4.png` |
| | ordinateur | réussie | 1 | 5,8 | `m1-arrivee-1440x900/etape-0.png` (horaires) puis `m6-garage-chambre-1440x900/etape-2.png` |

Barème : mission 1 sans geste, les autres en 3 gestes et 30 s au plus. La mission 3 dépasse le barème sur les deux formats : il faut au moins 4 gestes de saisie (la clé, deux dates, l'envoi), plus l'entrée sur /reserver et un défilement jusqu'au bouton. L'arrivée sur le formulaire, elle, prend 2 gestes.

## Mission par mission

### 1. Premier écran, sans geste

- **Téléphone, ratée.** On comprend « de quoi » : une maison vigneronne de 1850, quatre chambres aux prénoms des grands-mères, petit-déjeuner et garage fermé compris en réservation directe, arrivée de 17 h à 20 h 30, garage jusqu'à 23 h. On comprend en partie « pour qui » : des voyageurs qui veulent réserver en direct, et qui ont un véhicule (garage). Mais **rien ne dit où** : ni Pouzols, ni Hérault, ni « chambre d'hôtes ». La ligne « CHAMBRE D'HÔTES · POUZOLS, HÉRAULT » qu'on voit sur ordinateur n'est pas sur le premier écran du téléphone. Pouzols n'apparaît qu'au premier défilement, dans un texte de paragraphe. Le test du 10 novembre notait encore Pouzols sur le premier écran du téléphone. Capture : `m1-arrivee-390x844/etape-0.png`.
- **Ordinateur, réussie.** « Chambre d'hôtes · Pouzols, Hérault », grand titre, phrase d'accroche, « Réserver en direct », arrivée et garage jusqu'à 23 h, 9,5/10 Booking, Petit Futé et Gîtes de France : tout est dans le premier écran. « Pour qui » reste implicite : rien ne dit « motards bienvenus », mais « garage fermé jusqu'à 23 h » parle à notre couple. Capture : `m1-arrivee-1440x900/etape-0.png`.

### 2. Le prix

Aucun prix de nuit n'est affiché nulle part. Le seul montant en euros de l'accueil est la taxe de séjour (1,08 €). La seule réponse à « combien ça coûte ? » est dans le récapitulatif de /reserver : « Prix de la nuit : affiché sur la réservation sécurisée de la maison ».
- **Téléphone, réussie de justesse** : « Réserver en direct », puis la clé « Isabelle » (la page glisse jusqu'aux dates), puis un défilement jusqu'au récapitulatif. 3 gestes, 9,5 s. Capture : `m2-prix-c-390x844/etape-4.png`.
  - Ce qui a gêné : le premier réflexe, « Voir les chambres », ne mène à aucun prix (`m2-prix-a-390x844/etape-2.png`, `etape-3.png`), et les fiches des chambres non plus (`explo-fiche-390x844/etape-5.png`). Sur /reserver, sans prendre de clé, il faut 4 gestes pour atteindre la ligne du prix (`m2-prix-b-390x844/etape-5.png`, `explo-reserver-390x844/etape-3.png`). L'accueil affiche « Meilleur prix garanti » et « Des tarifs sans intermédiaire » sans chiffre ni « à partir de » (`explo-accueil-390x844/etape-10.png`). Le menu n'a pas d'entrée « Tarifs » (`explo-menu-390x844/etape-1.png`).
- **Ordinateur, réussie** : « Réserver en direct », puis la clé « Isabelle » ; le récapitulatif est à droite dans le même écran. 2 gestes, 7,9 s. Capture : `m2-prix-1440x900/etape-4.png`.

### 3. Réserver : Isabelle, du 14 au 16 mai 2027, 2 adultes, jusqu'à « Demande prête »

- **Téléphone** : « Réserver en direct », la clé « Isabelle » (la page descend aux dates et place le curseur dans « Arrivée », très bien), la date d'arrivée, la date de départ, un défilement, « Préparer ma demande ». « 2 adultes » est déjà choisi. Après le clic, la page glisse vers le récapitulatif (Isabelle, 14 mai → 16 mai, 2 nuits, 2 adultes, taxe 4,32 €), mais le tampon « DEMANDE PRÊTE » reste coupé en bas de l'écran (`m3-reserver-390x844/etape-7.png`, 6 gestes, 11,1 s). Il faut un défilement de plus pour lire « Votre demande est prête » et voir « Continuer sur la réservation sécurisée » (`explo-reserver-fin-390x844/etape-9.png`, 7 gestes, 14,2 s).
  - Ce qui a gêné : le bouton d'envoi est sous l'écran une fois les dates saisies (`m3-reserver-390x844/etape-5.png`) ; la confirmation n'entre pas entière dans l'écran ; une fois la clé prise, la carte « Isabelle » choisie est remontée hors de l'écran, donc rien ne confirme le choix sur place ; les dates s'affichent en mm/jj/aaaa (05/14/2027), sans doute à cause du navigateur de test, à vérifier sur un vrai téléphone français.
- **Ordinateur** : les mêmes gestes. Le récapitulatif se met à jour à droite pendant la saisie (`m3-reserver-1440x900/etape-5.png`). Le bouton « Préparer ma demande » est sous l'écran, il faut défiler (`etape-7.png`). Après le clic, « Votre demande est prête… » et « Continuer sur la réservation sécurisée » sont lisibles, mais le tampon « DEMANDE PRÊTE » est coupé en haut de l'écran (`m3-reserver-1440x900/etape-8.png`, 6 gestes, 11,1 s). On ne le voit entier qu'en remontant (`explo-reserver-fin-1440x900/etape-7.png`, 7 gestes, 11,7 s).
  - Ce qui a gêné : le récapitulatif ne suit pas le défilement, donc le bouton et la confirmation tombent dans deux écrans différents.

### 4. Joindre ou venir

- **Téléphone, réussie** : Menu, puis « Contact ». Un seul écran donne le numéro en très grand (06 88 71 26 01), « 15 rue des Jardins, 34230 Pouzols · arrivée 17 h – 20 h 30 » et le courriel. Un défilement de plus montre l'accès par l'A750, sortie Gignac, avec « Ouvrir l'itinéraire ». 2 gestes, 6,6 s. Captures : `m4-venir-390x844/etape-3.png`, `etape-4.png`. Sans aucun geste, le bouton « Appeler » de la barre du bas et les heures d'arrivée sont déjà là ; seule l'adresse demande d'aller sur Contact.
- **Ordinateur, réussie** : « Contact » dans l'en-tête, et tout est dans le premier écran. 1 geste, 5,8 s. Capture : `m4-venir-1440x900/etape-1.png`.
- Rien n'a gêné. Le numéro n'est pas dans l'en-tête de l'ordinateur, mais un clic suffit.

### 5. Ce qui distingue la maison, après 30 s

En 3 défilements et environ 27 s, sur les deux formats, on retient : une maison de vigneron de 1850 à Pouzols ; quatre chambres qui portent chacune le prénom d'une grand-mère ; un garage fermé au rez-de-chaussée, sous la maison, avec prise de recharge, ouvert jusqu'à 23 h ; une façade qu'on parcourt étage par étage ; 9,5/10 sur Booking, recommandée par le Petit Futé, label Gîtes de France.
- **Téléphone, réussie**, 3 gestes, 26,8 s : `m5-difference-390x844/etape-4.png`, `etape-7.png`, `etape-9.png`.
  - Ce qui a gêné : dans « La maison », la photo assombrie de la façade reste collée sous l'en-tête et couvre environ un tiers de l'écran. Les textes passent dessous : le paragraphe « À Pouzols, entre vignes et garrigue, le… » est coupé net, puis le texte du 2e étage et les vignettes du 1er sont cachés (`m5-difference-390x844/etape-7.png`, `etape-9.png`). Le texte du rez-de-chaussée (garage, prise de recharge), le plus utile pour des motards, ne se lit à aucun des arrêts de défilement. Il faudrait des petits gestes très lents pour le lire.
- **Ordinateur, réussie**, 3 gestes, 26,4 s : `m5-difference-1440x900/etape-4.png`, `etape-7.png`, `etape-9.png`.
  - Ce qui a gêné : les étages qui ne sont pas actifs restent pâles, dont le texte du rez-de-chaussée (« Le garage fermé, accessible jusqu'à 23 h, avec prise de recharge ») et la photo du garage, voilée (`etape-7.png`). Le paragraphe qui s'éclaire mot à mot reste à moitié gris tant qu'on ne défile pas, même après 5 s d'attente (`etape-4.png`).
- Sur aucun des deux formats on ne voit en 30 s le mot « motards » : il n'apparaît qu'au bloc « En direct, tout est compris » (« vestiaire motards et cavaliers »), à 5 défilements sur téléphone (`explo-accueil-390x844/etape-10.png`).

### 6. Le garage pour la moto, et la chambre choisie

- **Horaires du garage** : « garage fermé jusqu'à 23 h » est sur le premier écran, sans geste, sur les deux formats. Ils sont redits plus bas sur l'accueil et sur « Votre séjour » (« 23 h – Garage », `explo-sejour-390x844/etape-10.png`).
- **Téléphone, réussie** : « Voir les chambres », puis la porte « Isabelle » : grande photo en arche, étage, surface, lit, vue, équipements, trois vignettes, « Réserver Isabelle ». 2 gestes, 7,8 s. Captures : `m6-garage-chambre-390x844/etape-4.png`, `etape-5.png`. Toucher « Isabelle » sur la photo d'accueil change seulement la photo (`explo-isabelle-390x844/etape-2.png`) : il n'y a pas de lien « Voir la chambre » sur téléphone, contrairement à l'ordinateur.
- **Ordinateur, réussie** : « Voir la chambre → », sous la photo d'accueil, ouvre directement la fiche d'Isabelle. 1 geste, 5,8 s. Capture : `m6-garage-chambre-1440x900/etape-2.png`.
- Ce qui a gêné : rien ne dit « moto » près des horaires du garage. Il faut déduire qu'un garage fermé convient. La seule photo du garage montre deux voitures. « Vestiaire motards » et « prise de recharge » sont loin dans l'accueil (ou pâles, ou cachés, voir la mission 5). Les fiches des chambres ne parlent pas du garage.

## Gênes principales

1. **Téléphone, premier écran** : ni le lieu (Pouzols, Hérault) ni « chambre d'hôtes ». La ligne présente sur ordinateur manque sur téléphone.
2. **Prix** : aucun prix de nuit nulle part, ni « à partir de ». La seule indication (« affiché sur la réservation sécurisée ») est au bas de /reserver, alors que l'accueil promet « Meilleur prix garanti ».
3. **Réservation** : le bouton « Préparer ma demande » est sous l'écran après la saisie des dates, et le tampon « Demande prête » est coupé (en bas sur téléphone, en haut sur ordinateur).
4. **Téléphone, « La maison »** : la façade collée sous l'en-tête cache un tiers de l'écran et les textes qui passent dessous, dont celui du garage.
5. **Atout motards peu visible** : « motards », « vestiaire » et « prise de recharge » n'apparaissent qu'à 5 défilements, ou en texte pâle, ou caché.

## Gênes mineures

- Ordinateur : les étages qui ne sont pas actifs dans « La maison » (texte et photo du garage) sont pâles, avec un contraste faible au moment où on les lit, et le paragraphe qui s'éclaire mot à mot reste à moitié gris si on s'arrête de défiler.
- Ordinateur : l'en-tête disparaît quand on descend. Sur la longue page d'accueil, aucun bouton « Réserver » ne reste visible, alors que le téléphone garde sa barre « Appeler / Réserver ».
- Téléphone : sur l'accueil, les pastilles Isabelle, Denise… ne changent que la photo, sans lien vers la fiche (l'ordinateur a « Voir la chambre → »).
- Téléphone : après la prise d'une clé sur /reserver, la carte choisie sort de l'écran ; la confirmation du choix n'apparaît que dans le récapitulatif, plus bas.
- Le seul montant en euros de l'accueil est la taxe de séjour (1,08 €), ce qui peut faire croire un instant à un prix.
- Denise n'a pas de surface, ni sur l'accueil (« Denise vue village · terrasse ») ni sur sa fiche (pas de case « Surface »), alors que les trois autres chambres en ont une (`m6-garage-chambre-1440x900/etape-3.png`).
- Le garage est photographié avec deux voitures et sans moto, ce qui n'aide pas le motard à se projeter.
- Grands espaces vides : sur l'accueil du téléphone, entre « Label Gîtes de France » et la photo de la façade (`m5-difference-390x844/etape-4.png`) ; sur /chambres au téléphone, sous les portes et avant « Le couloir » (`m2-prix-a-390x844/etape-2.png`, `etape-3.png`) ; sur ordinateur, le bloc « Autour de Pouzols » reste un moment sans titre sous son surtitre (`explo-accueil-1440x900/etape-12.png`).
- Champs de date affichés en mm/jj/aaaa dans le navigateur de test, à vérifier sur un vrai appareil en français.
- Ordinateur 1440 : une bande claire d'environ 15 px reste à droite de la photo d'accueil, du bloc sombre et du filet d'en-tête. C'est probablement la place réservée à la barre de défilement dans le navigateur de test, à vérifier dans un vrai navigateur.
- Contact (ordinateur) : la photo en arche paraît un peu floue à cette taille (`m4-venir-1440x900/etape-1.png`).
