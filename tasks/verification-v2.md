# Vérification V2 — 16 novembre 2026

La refonte V2 est implémentée et vérifiée localement. Ce rapport complète le compte rendu historique V1, conservé dans `tasks/verification.md`.

## Résultat

- Trois cartes verticales, dans l’ordre Genomint → JiFoosball → MJC, avec scènes jade/cuivre/prune, grille, halo, fenêtre en perspective et raccord inférieur fondu. Quatre technologies colorées et nommées sont visibles ; les contributions restent lisibles sans interaction.
- Deux chronologies, adaptées en pistes verticales sur mobile. Les périodes CIRAD restent séparées : stage du 20 avril au 7 août 2026, CDD du 16 septembre au 11 décembre 2026. Le CDD porte une pastille verte et « En cours ».
- Compétences et bento reprennent les surfaces papier, rose, encre et bordeaux du portfolio et les motifs du footer. Structure du footer conservée.
- Héros : « En poste au CIRAD jusqu’au 11 décembre », sans « Open to work ».
- Repères techniques déplacés dans la marge droite à partir de 1440 px ; seuls les coins subsistent sur les écrans plus étroits.

## Correction MDX et médias

Le compilateur MDX installé supprime les expressions JSX des dimensions avec sa politique `blockJS`. Les figures utilisent désormais des attributs littéraux, acceptés par le contrat de `ProjectFigure`, sans désactiver cette protection. Le test de régression compile les figures réelles puis les rend avec le composant Next Image réel.

Trois captures ont été prises le 16 novembre 2026 dans l’interface Genomint locale déjà en cours d’exécution : espace d’exploration avec panneaux, détail Variation Tube Map et menu d’export du tableau. Les anciens médias documentaires sont remplacés. Les trois WebP mesurent 1800 × 1126 px, pour environ 147, 84 et 140 ko. Légendes, textes alternatifs et liens d’agrandissement mis à jour. Aucun code ou paramètre du dépôt Genomint modifié.

## Contrôles terminés

| Contrôle | Résultat |
| --- | --- |
| `npm test` | 9 tests réussis : dates/fuseaux, projets/références et compilation MDX → Next Image. |
| `npm run lint` | Réussi sur le dépôt. |
| `npx tsc --noEmit --incremental false` | Réussi. |
| `npm run build` | Réussi ; 15 pages statiques générées. |
| `git diff --check` | Réussi. |
| Développement et export | Contrôles Chromium à 320, 375, 768, 1024 et 1440 px réussis. |

Le parcours navigateur vérifie l’ordre des projets, les noms des technologies, l’absence de débordement horizontal et de texte hors écran dans les sections contrôlées, les dates exactes, le statut du héros, le dégagement du footer, les filtres et leurs états, les trois figures Genomint et leurs dimensions, les retours aux ancres, le focus visible des liens projet, le survol et le mouvement réduit des cartes. Les bento Hobbies/Langues atteignent leur position finale correcte. Le défilement de la navigation respecte la préférence de mouvement réduit.

Sur l’export statique, les huit fiches ont été ouvertes et leurs images chargées ; chaque retour à l’index conserve l’ancre du projet. Le filtre a aussi été activé avec Espace, le lien projet avec Entrée, et la fiche Genomint ouverte depuis une carte en émulation tactile. Aucun événement d’erreur JavaScript ni réponse HTTP en échec sur ce parcours.

Contrastes ciblés des textes des cartes (titres, descriptions, contributions, noms des technologies et actions) et des métadonnées du cadre, mesurés à partir des couleurs calculées sur leurs fonds opaques : minimum **9,47:1**. Cette mesure ne constitue pas un audit complet des décors, captures ou de l’ensemble du site.

Node 26 émet des avertissements de détection du format ESM pendant les tests et de dépréciation de `module.register()` pendant le build ; les commandes réussissent.

## Revues et corrections

La revue de code indépendante n’a relevé aucun P1 et deux P2, corrigés : remise à zéro de `y` pour les bento et noms des technologies visibles.

La première revue design a demandé de réduire la densité des cartes, d’adoucir le raccord inférieur, d’empêcher les métadonnées fixes de traverser le texte et d’harmoniser les couleurs des icônes. Ces corrections sont intégrées. Le second contrôle design indépendant valide le jalon V2, sans défaut bloquant. Réserve mineure conservée : les cartes restent plus textuelles que la référence, malgré une réduction de 957 à 861 px à 1440 px ; les scènes occupent environ 37 % de leur hauteur, contre 33 % auparavant.

## Preuves et limites

Les captures et scripts temporaires se trouvent dans `/tmp/portfolio-v2/` : `check-development.json`, `check-production.json`, `production-extra.json`, vues finales des projets aux cinq largeurs et captures du héros/footer. Les captures du héros ont été reprises après son animation d’entrée pour montrer le statut final.

Chromium uniquement ; pas de validation Firefox/Safari, de lecteur d’écran ou d’audit d’accessibilité exhaustif. Les animations d’entrée du héros sont conservées en mode normal. En mouvement réduit, le portrait, le statut et le texte apparaissent immédiatement : masque, transformations, opacité d’entrée et pulsation de la pastille sont neutralisés.

Changements locaux antérieurs préservés. Aucune dépendance ajoutée, aucun commit, push, PR ou déploiement. Le serveur temporaire de vérification a été fermé ; les serveurs de développement existants sont conservés.

## Finitions complémentaires demandées après validation

- Badges technologiques équilibrés en deux colonnes, avec noms et ordre conservés, sur l’accueil et l’index.
- Contour de focus explicite pour la navigation et le bouton de retour en haut ; libellé de navigation également visible au focus clavier sur desktop.
- Héros immédiatement visible en mouvement réduit, sans modifier ses animations normales.
- Nouveau build réussi, lint ciblé et contrôle du diff réussis. Contrôles Chromium ciblés en développement et sur l’export à 320, 375, 768 et 1440 px : grille sans contenu coupé, focus réellement visible, libellé desktop visible et états du héros corrects, sans erreur JavaScript. Preuves : `/tmp/portfolio-v2/polish-development.json`, `polish-production.json` et captures `polish-*`.


## Correction issue de la revue visuelle Luna

Le chevauchement signalé avec la navigation flottante a été précisé : le contenu pouvait être dégagé par un défilement manuel, mais certains liens recevaient le focus clavier derrière la barre. Une réserve de défilement de 7 rem, annulée dès `xl`, garde ces cibles visibles sans modifier les dimensions ou le positionnement des surfaces.

Contrôle sur l’export recompilé à 320, 768 et 1024 px : 42 étapes de focus par largeur, aucun chevauchement entre la cible active et la navigation. La réserve calculée est de 112 px. Le build et `git diff --check` réussissent. Preuve : `/tmp/portfolio-luna-review/nav-triage-production.json` ; reproduction et vérification temporaires dans le même dossier. Le serveur temporaire d’export est fermé après ce contrôle.


## Navigation dockée sur téléphone

À la demande utilisateur, sous 768 px la navigation occupe le bord inférieur, sur toute la largeur. Les séparateurs sont masqués, les six boutons restent répartis régulièrement avec des cibles de 44 × 44 px et le padding inférieur tient compte de `safe-area-inset-bottom`. Dès 768 px, la barre retrouve ses dimensions et son placement flottant sur les écrans de hauteur normale ; la navigation latérale desktop est conservée. Sur un écran en paysage de 500 px de haut ou moins, sous `xl`, elle reste dockée et les espacements du héros sont resserrés.

Build, TypeScript intégré au build, lint ciblé et contrôle du diff réussis. Contrôle Chromium de l’export à 320, 375, 640, 767, 768, 1024 et 1440 px : aucun débordement horizontal, six boutons visibles ; barre dockée de 61 px sans zone de sécurité simulée sur téléphone, barre flottante de 56 px à 32 px du bas sur tablette. Le contrôle clavier couvre 42 étapes par largeur sous `xl`, sans cible recouverte par la barre. À 1440 px, seul le maintien de la géométrie desktop est vérifié ici. Preuves : `/tmp/portfolio-luna-review/docked-navigation.json` et captures correspondantes. Le comportement de la zone de sécurité sur un véritable iPhone/Safari reste à vérifier.


## Bilan des trois revues visuelles Luna

Les trois revues indépendantes sont terminées :

- Projets : aucun défaut visuel concret détecté sur l’accueil, l’index et les figures Genomint aux cinq largeurs, en mouvement normal et réduit.
- Parcours, compétences, profil : seul signalement relatif à la navigation flottante. Le contrôle parent a confirmé un cas précis de focus clavier recouvert, corrigé par la réserve de défilement détaillée plus haut. Aucun autre défaut concret relevé sur ces sections.
- Héros, navigation, footer et cadre : chevauchement confirmé à 812 × 375. Corrigé en étendant le dock aux écrans en paysage de hauteur ≤ 500 px, sous `xl`, et en resserrant uniquement les espacements du héros dans ce cas. Les tailles de texte sont conservées et les tablettes de hauteur normale gardent la barre flottante.

Vérification parent sur l’export recompilé : 12 combinaisons de dimensions et mouvement, dont 812 × 375 en normal et réduit, 667 × 320, 568 × 320, 896 × 414 et les deux côtés du seuil 500/501 px. Le texte du héros reste au-dessus du dock, sans débordement horizontal. Les contrôles clavier ciblent les petits liens et boutons (≤ 120 px de haut) : 42 étapes à 812 × 375 dans chaque mode et à 667 × 320, aucune cible recouverte par la barre. Contrôles de géométrie conservés à 375 × 812, 768 × 1024, 1024 × 768 et 1440 × 900 ; captures finales relues. Build avec TypeScript, lint ciblé et `git diff --check` réussis.

Preuves finales : `/tmp/portfolio-luna-review/landscape-final.json`, `landscape-final-812-375-no-preference.png`, `landscape-final-812-375-reduce.png` et `landscape-final-667-320-reduce.png`. Le serveur temporaire d’export est fermé après vérification ; le serveur de développement est conservé et rafraîchi.

Aucun défaut confirmé encore ouvert dans le périmètre revu. Les deux revues Sections et Cadre n’ont pas vérifié visuellement le mouvement réduit ; les contrôles parent ciblés complètent ce point pour le héros et la navigation. Chromium uniquement : Safari/iPhone réel, Firefox, lecteur d’écran et audit complet d’accessibilité non couverts.
