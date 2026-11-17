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
