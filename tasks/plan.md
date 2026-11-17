# Plan V2 — Retrouver une présentation visuelle aboutie

16 novembre 2026. **Plan approuvé, implémenté et vérifié en développement et sur l’export statique.** Ce plan remplace les choix visuels de la première refonte après le retour de Théodore. Les constats, sources et le diagnostic de l’image sont dans `tasks/design-study.md` ; le suivi dans `tasks/todo.md` et le bilan dans `tasks/verification-v2.md`. Le contenu et les dates vérifiés de la V1 restent des acquis.

## Direction générale

Conserver le papier clair, le rose, les trois polices et les repères techniques du portfolio. Construire des surfaces sombres et lumineuses dans le langage du footer : fond encre, teinte locale, halo, trame fine, relief maîtrisé. Le footer reste le point de référence visuel et doit conserver son rendu.

La présentation des projets sera constituée de **trois cartes verticales : visuel composé en haut, titre et contenu en dessous**, en ordre Genomint → JiFoosball → MJC. Genomint est identifié comme le projet majeur. Les trois projets doivent être visibles sans carrousel ; chaque carte dispose d’une vraie composition visuelle et d’icônes technologiques colorées.

## 1. Fixer la palette et le langage des surfaces

| Surface | Direction proposée | Repères conservés |
| --- | --- | --- |
| Genomint | Encre pétrole, lumière jade/turquoise, grille de données | Capture réelle du GKG, tableaux/panneaux et contribution frontend/back-gkg. |
| JiFoosball | Encre chaude, cuivre/corail et lumière ambrée | Fenêtre web et aperçu mobile si les deux enrichissent la composition. |
| MJC | Encre prune, lumière rose et tons poudrés | Fenêtre du site et hiérarchie éditoriale du contenu. |
| Bento et compétences | Mélange de papier teinté et de quelques surfaces sombres issues du footer | Rose comme lien commun, icônes colorées et contenu actuel. |
| Parcours | Fond clair, lignes et segments colorés, statut vert sémantique | Deux périodes CIRAD distinctes, dates exactes et lecture immédiate. |

Définir un petit ensemble de variables de surface, d’accent et d’éclairage, une grille locale et des rayons cohérents avec les coins asymétriques existants. Réutiliser les motifs du footer sans transformer toute la page en fond sombre ni mettre le même halo sur chaque bloc.

## 2. Corriger le rendu des figures et préparer les bons médias

Corriger les dimensions MDX de `ProjectFigure` avec des valeurs littérales compatibles avec le compilateur installé. Adapter le contrat du composant si nécessaire et écrire un test qui passe réellement par `compileMDX` puis le rendu. Garder la politique de blocage du JavaScript.

Remplacer les deux captures obsolètes de Genomint par des écrans actuels : exploration, organisation des panneaux, détail de visualisation. Préparer des couvertures cadrées pour les cartes et des figures intégrales pour les dossiers, avec dimensions, légendes et textes alternatifs. Garder le récit Genomint, ses crédits et son contenu personnel.

Cette préparation peut avancer en parallèle du travail sur la palette. Aucun changement dans Genomint n’est requis pour le portfolio.

## 3. Réaliser une seule carte complète avant la déclinaison

Composer une carte avec ses éléments définitifs :

- Fond de scène teinté, lumière radiale, grille masquée et profondeur au contact de la fenêtre.
- Capture réelle dans une fenêtre avec barre discrète, contour et perspective limitée ; cadrage choisi pour la compréhension du projet.
- Zone de texte distincte : contexte/statut, titre, objectif, contribution courte, quatre à six icônes avec noms, lien explicite.
- Repos déjà soigné ; au survol et au focus, légère remontée, bordure éclairée et mouvement limité de la fenêtre. Version sans mouvement et adaptation tactile prévues ensemble.

**Jalon visuel :** examiner cette carte à 1440 et 375 px, au repos, au clavier et en mouvement réduit, avant de toucher aux deux autres. Juger la composition, la présence des couleurs, la lisibilité de l’image et la reconnaissance des technos. Un simple cadre autour d’une capture ne satisfait pas ce jalon.

## 4. Décliner les projets et l’index

Trois colonnes sur grand écran, deux quand la largeur des cartes le permet, puis une sur mobile. Conserver l’image au-dessus du texte à toutes les largeurs. Aligner les zones de texte et les actions sans imposer une hauteur qui coupe le contenu.

Décliner des mises en scène adaptées aux trois projets plutôt que dupliquer un décor identique. Restaurer les SVG existants par le catalogue `skills.json` et `DynamicIcon`, dans l’ordre `usedSkills`, avec noms accessibles et sans filtre de couleur qui efface leur identité. Le statut et la contribution restent visibles.

Réutiliser la famille de cartes dans l’index, avec une densité adaptée ; préserver les huit projets, les filtres et les ancres de retour. Ne pas rétablir les notes de confort pour décider de l’ordre des outils.

## 5. Redonner une lecture graphique au parcours

Construire **deux pistes chronologiques**, Formation et Expériences, avec années, segments et jalons lisibles. Adapter leur échelle à leur contenu pour que les stages et le CDD restent identifiables. Les dates exactes et les rôles sont visibles dans les entrées associées ; ne pas placer toute une description dans une barre proportionnelle minuscule.

La période CIRAD en cours porte une **pastille verte + « En cours »**. Le stage du 20 avril au 7 août 2026 et le CDD du 16 septembre au 11 décembre 2026 restent séparés, avec leur interruption contractuelle. MJC, BUT et baccalauréat conservent leurs informations utiles.

Sur mobile, transformer les pistes en chronologies verticales cohérentes plutôt que réduire les caractères ou imposer un balayage horizontal. Garder une seule présentation des descriptions détaillées et des liens : la synthèse temporelle ne répète pas les paragraphes.

## 6. Harmoniser les compétences et les bento

Garder les quatre domaines ouverts et leurs preuves ; donner davantage de présence aux icônes et aux accents des domaines. Réemployer l’atmosphère du footer sur les bento sombres, avec des variations lumineuses mesurées. Les blocs clairs restent utiles pour le rythme de lecture.

Le héros, les coordonnées, la navigation et la structure du footer sont conservés. Les changements autour de ces éléments servent uniquement la cohérence des surfaces. Les crédits détaillés de Genomint restent dans la fiche ; la section compétences doit d’abord expliquer les savoir-faire.

## 7. Vérifier le résultat réel

- Développement **et** export de production : fiche Genomint sans erreur, dimensions d’images transmises, aucune erreur de console.
- 320, 375, 768, 1024 et 1440 px : cartes, scènes, icônes, noms longs, frises et footer ; contrôle visuel comparé aux références.
- Repos, survol, focus, tactile et mouvement réduit : la carte reste lisible sans interaction ; les effets ne déplacent pas le contenu de lecture.
- Clavier, titres, textes alternatifs et contrastes mesurés (4,5:1 pour le texte courant, 3:1 pour le grand texte) ; statut expliqué par un libellé, liens non imbriqués et information essentielle disponible sans infobulle.
- Anciennes fiches, index, filtres et ancres conservés. Tests ciblés MDX/dates/références, lint, TypeScript et build.

Nommer les navigateurs réellement testés et toute limite. Ne pas présenter les résultats de la V1 comme une validation de la V2. Aucune publication automatique.

## Ordre et répartition retenus

1. Palette/surfaces et médias/correction MDX peuvent être étudiés en parallèle.
2. La première carte complète fixe le contrat visuel commun.
3. Après ce jalon, la déclinaison des projets et le parcours peuvent avancer séparément ; les bento réemploient les mêmes conventions.
4. Une intégration centrale règle les détails de couleur, le rythme et les régressions avant validation finale.

Les fichiers de styles et les contrats partagés ont un seul responsable pendant la phase parallèle. Implémentation et corrections des revues terminées ; aucune publication effectuée.


---

# Suite V2 — Interactions et finitions après revue utilisateur

17 novembre 2026. **Implémentation et vérifications terminées ; rendu validé par l’utilisateur. PhotoSwipe retenu.** Suite au retour utilisateur sur les cartes, les images des fiches, les deux frises, les repères latéraux et les hobbies. Les chapitres précédents décrivent la refonte déjà terminée.

## 1. Donner un vrai lien à toute la carte de projet

Remplacer le lien limité au CTA par un lien natif Next couvrant toute la carte. Le CTA « Voir le projet » devient un élément visuel de ce même lien. Utiliser le titre du projet comme nom accessible pour éviter une annonce regroupant tout le texte de la carte.

Acceptation :
- Clic sur la scène, le titre, le texte, les badges ou les espaces de la carte : même fiche projet.
- Un seul arrêt de Tab par carte, focus visible sur toute sa surface ; Entrée, clic milieu et ouverture dans un nouvel onglet fonctionnent nativement.
- Aucun lien ou bouton imbriqué dans le lien principal ; rendu des huit cartes et de leurs technologies préservé.

Fichiers : `ProjectCard.tsx`, `ProjectCard.module.css`. Taille S. Vérification : structure HTML, navigation réelle et focus sur accueil/index. Dépendance : aucune.

## 2. Un seul visualiseur d’images pour chaque fiche

### Recherche et choix recommandé

Bibliothèques examinées sur leurs documentations officielles et leurs métadonnées npm :
- **Yet Another React Lightbox 3.33.1**, publié le 14 novembre 2026, licence MIT. Les peer dependencies déclarent React/React DOM 19. Les plugins Zoom, Captions et Counter couvrent les besoins sans autre package fonctionnel. Styles et icônes personnalisables, exemple officiel de chargement différé sous Next.js.
- **PhotoSwipe 5.4.4**, licence MIT, avec l’intégration React `react-photoswipe-gallery` 4.1.2 examinée. Moteur solide, mais intégration impérative ou adaptateur React à prévoir, et dimensions explicites demandées pour chaque image.

Choix utilisateur : **PhotoSwipe 5.4.4**, directement avec son moteur JavaScript. Un contrôleur React limité à la page réunira les ancres des images dans un catalogue commun, dans l’ordre du document. Le visualiseur chargera les fichiers statiques originaux ; les aperçus conservent Next Image. Les dimensions intrinsèques seront lues à la génération des pages, sans télécharger toutes les images au premier clic.

Sources :
- https://yet-another-react-lightbox.com/documentation
- https://yet-another-react-lightbox.com/plugins/zoom
- https://yet-another-react-lightbox.com/customization
- https://yet-another-react-lightbox.com/examples/nextjs
- https://photoswipe.com/getting-started/
- https://registry.npmjs.org/yet-another-react-lightbox
- https://registry.npmjs.org/photoswipe
- https://registry.npmjs.org/react-photoswipe-gallery

### Expérience et intégration

Avant ce lot, le code avait deux comportements séparés : `ImageGallery` crée une modale propre à chaque galerie, et `ProjectFigure` affiche un lien texte vers le fichier. Ils sont remplacés par un visualiseur commun à toute la fiche :
- Couverture, figures Genomint, toutes les `ImageGallery` d’une page et images Markdown intégrées au même ensemble.
- Ordre de lecture du document. Même fichier présent plusieurs fois : une seule entrée, avec la légende la plus pertinente ; chaque déclencheur ouvre la bonne entrée et récupère ensuite le focus.
- Ouverture directement depuis l’image, à la souris, au toucher et au clavier. Curseur de zoom et indice discret sur l’image ; suppression du lien visible « Agrandir l’image ».
- Image entière, zoom/dézoom, déplacement dans l’image zoomée, pincement et double-tap ; navigation précédente/suivante par boutons, flèches clavier et balayage.
- Compteur et légende lisibles, contrôles en français. Fermer par bouton ou Échap ; focus contenu dans le visualiseur puis restauré au déclencheur ; scroll de la page correctement rétabli.
- Fond encre sobre, boutons et accents rose/papier, iconographie PhotoSwipe harmonisée et typographies du portfolio ; loupe Lucide sur les déclencheurs. Contrôles tactiles suffisamment grands et animation adaptée à `prefers-reduced-motion`.
- Chargement différé du moteur à la première ouverture, préchargement limité aux images voisines. Conserver le rendu serveur des pages et la politique MDX `blockJS`.

Découpage :
1. **Moteur commun** : portée DOM par fiche, ancres progressives, dimensions intrinsèques à la génération, moteur PhotoSwipe chargé à la demande, styles et dépendances. Fichiers probables : nouveau contrôleur `ProjectImageViewer.tsx` et lien `ProjectImageLink.tsx`, module CSS, `package.json`, `package-lock.json`. Taille M.
2. **Couverture et figures** : raccordement de la route projet et de `ProjectFigure` ; conservation des dimensions littérales MDX et adaptation du test réel compilation MDX → Next Image. Taille M, 3–5 fichiers. Dépendance : moteur commun.
3. **Anciennes galeries et Markdown** : raccordement de `ImageGallery` et du composant MDX `img`, suppression de l’ancienne modale, vérification des pages à plusieurs galeries et des doublons. Taille M, 3–5 fichiers. Dépendance : moteur et raccordement de la route.

Acceptation : la galerie partagée traverse toutes les images de la fiche depuis n’importe quel déclencheur ; les images seules et les doublons fonctionnent ; couverture et miniatures gardent leurs bonnes dimensions.

Vérification : Genomint, JiFoosball, Portfolio (plusieurs galeries et doublons), JiCursum (Markdown) et une fiche avec couverture seule. Vérifier image initiale, ordre, zoom, navigation, fermeture, focus, scroll et absence de saut de mise en page ; conserver une régression ciblée sur les dimensions MDX et l’ordre/déduplication du catalogue. Clavier réel et tactile en émulation ; nommer les navigateurs effectivement contrôlés.

## 3. Adoucir les dégradés des deux chronologies en OKLCH

La surface `.timeline` mélange actuellement papier et teinte rose/lilas dans un `linear-gradient` sans espace d’interpolation explicite. Revoir les couleurs, les stops et l’intensité, avec des variables locales en OKLCH et une interpolation `in oklch`.

Acceptation : transition très douce, luminosité proche entre les extrémités, chroma faible ; deux nuances distinctes pour Expériences et Formation. Garder un fond papier utilisable si le dégradé n’est pas pris en charge. Dates, segments, badge vert et frises mobiles conservent leur lisibilité.

Fichier : `ExperienceSection.module.css`. Taille S. Vérification : comparer les deux surfaces à 375, 768 et 1440 px ; contrôler les contrastes du texte et du statut actif. Dépendance : aucune.

## 4. Rendre les repères du cadre discrets

Supprimer le fond opaque et la bordure de `.frame-metadata`, atténuer la couleur du texte. Conserver le texte vertical dans la marge et sa présence seulement à partir de 1440 px.

Acceptation : aucun cartouche blanc autour de « Portfolio // … » ou « Location // Montpellier » ; texte discret sur papier, surfaces colorées et footer, sans empiéter sur les contenus. Les coins du cadre gardent leur dessin.

Fichiers : `app/globals.css` ; `TechnicalFrame.tsx` uniquement si la classe doit évoluer. Taille S. Vérification : vues desktop du héros, des projets et du footer ; absence des libellés sous 1440 px. Dépendance : aucune.

## 5. Actualiser les hobbies

Retirer Kung-Fu. Remplacer Automobile par **« Automobile & mécanique »**, avec l’icône Lucide `Wrench`. Mettre à jour les données et la table d’icônes propre à `AboutSection`, puis retirer les imports devenus inutiles.

Acceptation : une seule ligne Automobile & mécanique, avec une clé/outil reconnaissable ; Kung-Fu absent et aucun pictogramme de remplacement générique. Le bento reste équilibré sur mobile.

Fichiers : `data/bio.json`, `AboutSection.tsx`. Taille S. Vérification : contrôle des données, rendu et lint ciblé. Dépendance : aucune.

## Ordre, contrôles et commits

1. Carte entièrement cliquable.
2. Visualiseur commun, puis raccordements des figures/couverture et des anciennes galeries/Markdown.
3. Dégradés OKLCH.
4. Repères latéraux.
5. Hobbies.

Un commit par sujet ; le visualiseur peut occuper les trois commits correspondant à ses étapes compilables. Répartir les tests avec les changements qu’ils vérifient. Les validations finales incluent tests ciblés, lint, TypeScript, build/export statique et contrôle visuel/interactif à 320, 375, 768, 1024, 1440 px ainsi qu’en paysage 812 × 375. Vérifier aussi les interactions clavier et le mouvement réduit.

Lot implémenté, vérifié et commité par sujet. Les dimensions sont lues au build avec image-size 2.1.0 (dépendance de développement) ; le moteur PhotoSwipe est chargé à la première ouverture. Bilan : tasks/verification-interactions.md. Le rendu a été validé par l’utilisateur ; aucune publication réalisée à ce stade.
