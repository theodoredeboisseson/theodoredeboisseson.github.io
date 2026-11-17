# Étude visuelle et technique — 16 novembre 2026

Périmètre : étude en lecture seule après le retour sur la première refonte. Aucun composant, style applicatif, contenu MDX, asset ou dépendance modifié. Le nouveau plan est dans `tasks/plan.md` ; les tâches à réaliser sont dans `tasks/todo.md`.

## Ce qui a été examiné

- Portfolio : version publique, sources locales actuelles, ancienne carte dans Git, captures locales du footer et du parcours précédant la refonte. Le site public comporte encore le carrousel ; il ne représente pas le travail local actuel.
- Alexis : accueil français complet, accueil anglais, les cinq dossiers GenomInt / HealthGraphBench / Sillage / Nacre / Vote El Gamal, puis la page GitHub. Inspection des styles et scripts servis, des règles responsive et des états normal, survol, focus et mouvement réduit des cartes.
- Genomint : composants et appels MDX du portfolio, compilateur installé, médias disponibles dans le dépôt de référence. Aucun service ni accès aux données de Genomint lancé.

L’outil d’aperçu a échoué deux fois sur les captures avec `Preview automation snapshot timed out after 15000ms`. L’examen visuel a ensuite utilisé Chromium local. Les captures et relevés bruts sont conservés dans `/tmp/portfolio-design-study/` ; l’onglet d’aperçu a été fermé en fin d’étude.

## Identité du portfolio à préserver

Les éléments distinctifs sont déjà présents : papier clair quadrillé, rose soutenu, titres Playfair Display, texte Geist, légendes JetBrains Mono, cadre technique, pétales et quelques coins asymétriques. L’ancien carrousel associait les captures à des icônes de technologies colorées ; cette information était plus identifiable qu’une suite de noms en petits cadres.

Le footer fournit une direction cohérente : fond encre/bordeaux, halos roses, lignes diagonales fines, cercles gravés, séparation nette des niveaux de texte. Son effet provient de plusieurs couches simples et bien réglées, visibles dans `app/globals.css` et `SiteFooter.tsx`.

La première refonte a amélioré la lecture des contributions, mais a remplacé ces contrastes par de grandes surfaces claires et des filets répétitifs. La carte principale sépare l’image et le texte latéralement ; les autres suivent une autre composition. Le remplacement des icônes par quatre noms a réduit la couleur et la reconnaissance visuelle. Le parcours conserve les faits mais a perdu la synthèse graphique et la pastille de statut.

## Ce qui produit le résultat d’Alexis

| Élément observé | Mécanisme dans les fichiers servis | Conséquence pour notre direction |
| --- | --- | --- |
| Cartes image en haut / titre en bas | Trois colonnes, carte verticale, corps et pied de carte structurés | Même structure verticale pour les trois projets ; Genomint premier et identifié comme projet majeur. |
| Teinte propre à chaque projet | Fonds et accents distincts pour GenomInt, HealthGraphBench et Sillage | Une palette par projet, jusque dans la bordure, les repères et l’éclairage. |
| Zone d’image travaillée | Grille fine masquée, halo radial, assombrissement inférieur | Composer un véritable fond d’aperçu à partir du langage du footer. |
| Capture dans une fenêtre | Barre de fenêtre, contour, perspective et rotation CSS | Employer une capture réelle dans un cadre de fenêtre lisible, avec une profondeur mesurée. |
| Visuels adaptés au sujet | Capture de graphe, graphique de résultats, recherche et extrait documentaire | Prévoir une composition propre à chaque réalisation ; éviter trois captures posées de façon identique. |
| État interactif soigné | Bordure accentuée, ombre, remontée de quelques pixels et fenêtre redressée | Définir ensemble repos, survol, focus et mouvement réduit. |
| Parcours synthétique | Deux frises avec repères temporels et entrées alignées ; listes sur mobile | Rétablir les repères chronologiques, avec une adaptation mobile conçue explicitement. |
| Dossiers lisibles | Colonne de lecture, sommaire latéral, médias légendés et approfondissements | Garder le récit Genomint et améliorer son traitement visuel sans le réécrire. |

Les aperçus d’Alexis recadrent volontairement leur scène : par exemple, la fenêtre GenomInt dépasse de sa zone d’image. Ce cadrage participe à la composition. Il faut distinguer ce rôle de couverture d’une figure documentaire, qui doit rester consultable entière.

## Technologies observables chez Alexis

- **Astro** : composants et styles compilés avec marqueurs Astro, routeur `ClientRouter`, gestion du cycle de navigation et des transitions de pages.
- **CSS spécifique et utilitaires de type Tailwind** : variables de thème et d’accent, grilles, masques, dégradés, transformations en perspective, règles responsive. Le CSS comporte les marqueurs `--tw-*` ; la version et le manifeste complet des dépendances n’ont pas été consultés.
- **JavaScript utilisant les API du navigateur** : `IntersectionObserver` et `Element.animate()` pour les apparitions, `matchMedia` pour les préférences, événements pointeur et gestion du focus. Les figures emploient un dialogue natif et un zoom/pan contrôlé.
- **Fond de papillons distinct des cartes** : le script inspecté contient un rendu WebGL avec shaders et un repli Canvas 2D. La profondeur des cartes est produite en CSS.
- **Typographie** : Ortica Linear chargée pour l’affichage ; polices système pour les textes et la chasse fixe. Notre palette typographique actuelle a déjà sa personnalité.

Il s’agit d’un inventaire des fichiers livrés au navigateur, pas d’une attestation de toutes les dépendances du dépôt source. Les effets de cartes étudiés sont réalisables avec les outils déjà présents dans le portfolio : CSS/Tailwind et Motion.

Sources primaires examinées dans le navigateur :

```text
https://alexisrob.in/
https://alexisrob.in/en/
https://alexisrob.in/projets/genomint/
https://alexisrob.in/projets/meddatatrace/
https://alexisrob.in/projets/sillage/
https://alexisrob.in/projets/nacre/
https://alexisrob.in/projets/encrypted-voting/
https://alexisrob.in/github/
/_astro/BaseLayout.DUL4RtcG.css
/_astro/Portfolio.9Pr8TB3w.css
/_astro/CaseStudy.wrRBsgGa.css
/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DIfXr2mg.js
/_astro/ButterflyBackground.astro_astro_type_script_index_0_lang.CESt6Olo.js
/_astro/EvidenceFigure.astro_astro_type_script_index_0_lang.DryFQKJ_.js
```

## Diagnostic confirmé de ProjectFigure

`next-mdx-remote` **6.0.0**, actuellement installé, active `blockJS` par défaut. Son plugin `remove-javascript-expressions` supprime aussi les attributs JSX contenant une expression. Les deux figures Genomint écrivent `width={1800}` et `height={1250}` ; ces deux props disparaissent avant le rendu de `ProjectFigure`.

Reproduction effectuée avec le compilateur installé puis le véritable composant `next/image`, sans modifier les sources :

| Entrée MDX | Résultat |
| --- | --- |
| `width={1800} height={1250}` | Exception identique au signalement : propriété `width` requise et absente. |
| `width="1800" height="1250"` | Rendu avec attributs HTML `width="1800" height="1250"`. |

La correction proposée est de fournir des dimensions littérales compatibles avec le pipeline, d’aligner le contrat du composant et de couvrir le passage réel MDX → figure par un test. Il n’est pas nécessaire de désactiver globalement le blocage de JavaScript. Les autres composants MDX actuellement utilisés ont aussi été sondés : leurs props textuelles et le contenu des galeries sont conservés.

La vérification précédente de production ne couvrait donc pas suffisamment le rendu en développement. Le nouveau contrôle inclura les deux modes.

## Captures Genomint

Les deux seuls écrans retrouvés dans le dépôt de référence sont `gkg-five-minute-explorer.webp` et `gkg-five-minute-export.webp`, déjà repris dans le portfolio. Le retour de Théodore les identifie comme obsolètes ; ils ne peuvent pas servir de nouveaux visuels de référence.

Le prochain lot médias doit produire une capture actuelle de l’explorateur, un état montrant l’organisation des panneaux, et un détail de visualisation suffisamment lisible pour la fiche. Chaque écran doit préciser ce qu’il montre et son état de référence. La couverture peut en tirer un recadrage composé ; la figure conserve l’écran intégral et son agrandissement. Aucune nouvelle capture n’a été prise dans Genomint pendant cette étude.

## Contrat de qualité visuelle proposé

Une carte est aboutie lorsque son projet se reconnaît par son visuel, sa couleur et son titre avant lecture détaillée ; que sa contribution et ses technos restent compréhensibles au clavier et sur mobile ; et qu’elle reste attractive à l’arrêt. L’effet de profondeur, le niveau de lumière, la grille et les rayons doivent former une seule composition, pas une accumulation d’effets.

Le premier jalon sera une seule carte finalisée avec un vrai média. Les trois cartes, le parcours et les bento seront déclinés ensuite, après comparaison visuelle avec la référence et le footer. Les vérifications techniques ne remplacent pas ce jalon esthétique.
