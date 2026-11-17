# Tâches V2 — Présentation visuelle du portfolio

16 novembre 2026. **Implémentation et vérifications V2 terminées.** Bilan : `tasks/verification-v2.md`. Référence : `tasks/plan.md`. Constats et sources : `tasks/design-study.md`. La fiche Genomint, les contributions et les dates exactes sont conservées de la V1.

## Étude préalable

- [x] Examiner l’identité existante : ancien carrousel, bento, polices, icônes, footer et anciennes chronologies.
- [x] Parcourir l’accueil et les dossiers d’Alexis, relever CSS/scripts et examiner les états des cartes.
- [x] Reproduire la suppression des dimensions MDX et l’exception exacte de Next Image.
- [x] Vérifier les médias disponibles : seules les deux captures documentaires obsolètes ont été retrouvées dans Genomint.
- [x] Écrire la nouvelle direction et ses jalons ; aucune modification applicative.

## V2.1 — Palette et surfaces communes

- [x] Définir les teintes Genomint / JiFoosball / MJC et les règles de lumière, grille, contours et rayons.
- [x] Préparer un motif réutilisable issu du footer, en conservant son rendu actuel.

Acceptation : trois identités distinctes, cohérentes avec le rose et les polices ; contrastes lisibles ; footer inchangé visuellement.

Vérification : référence visuelle desktop/mobile et contrôle des contrastes. Fichiers : `app/globals.css`, éventuel petit composant de surface. Taille S/M. Dépendance : aucune.

## V2.2 — Figures MDX fiables

- [x] Corriger les dimensions des trois figures Genomint avec des attributs littéraux compatibles avec le compilateur ; aligner le contrat de `ProjectFigure`.
- [x] Ajouter une régression couvrant compilation MDX → props → rendu, sans désactiver globalement `blockJS`.

Acceptation : dimensions présentes et valides, aucune exception sur la fiche en développement et en production.

Vérification : test ciblé, route en développement, export statique. Fichiers : `ProjectFigure.tsx`, `genomint.mdx`, test ciblé. Taille S. Dépendance : aucune ; parallèle à V2.1.

## V2.3 — Médias Genomint actuels

- [x] Capturer un état actuel de l’explorateur et deux vues utiles à la démonstration des panneaux/visualisations.
- [x] Préparer couverture composée et figures intégrales optimisées ; vérifier les légendes et préciser ce qui est montré.

Acceptation : aucune ancienne capture présentée comme actuelle ; images sans données privées, dimensions explicites et contenu compréhensible.

Vérification : comparaison avec l’interface capturée, inspection aux tailles d’affichage et ouverture en grand. Fichiers : médias Genomint et `genomint.mdx`. Taille M. Dépendance : accès à l’interface actuelle au moment du lot médias.

## V2.4 — Une carte aboutie

- [x] Réaliser une carte verticale complète : scène, fenêtre, lumière, couleur, texte, icônes et action.
- [x] Définir ensemble les états repos/survol/focus/tactile/mouvement réduit et l’adaptation mobile.

Acceptation : visuel au-dessus du titre ; projet identifiable ; capture composée et lisible ; contribution et noms des technos accessibles sans survol.

Vérification : jalon visuel à 1440 et 375 px, comparé au footer et à la référence. Fichiers : `ProjectCard.tsx`, éventuel composant d’aperçu, styles et petit contrat visuel. Taille M. Dépendances : V2.1 et média exploitable de V2.3.

## V2.5 — Sélection et index

- [x] Décliner les trois compositions et rétablir les icônes colorées depuis le catalogue existant.
- [x] Adapter l’accueil et l’index ; préserver les huit projets, filtres, ancres et ordre Genomint → JiFoosball → MJC.

Acceptation : cartes cohérentes mais différenciées ; image en haut à toutes les largeurs ; informations visibles et actions alignées.

Vérification : navigation index → fiche → retour, filtres, clavier et responsive. Fichiers : `FeaturedProjects.tsx`, `ProjectCard.tsx`, `ProjectListClient.tsx`, contrat/données visuels si nécessaires. Taille M. Dépendance : V2.4.

## V2.6 — Chronologies et activité actuelle

- [x] Rétablir deux pistes Formation / Expériences avec repères et segments ; adaptation verticale sur mobile.
- [x] Ajouter pastille verte et « En cours » au CDD ; conserver les deux périodes CIRAD, leur interruption et les dates exactes.

Acceptation : parcours synthétique en un regard, descriptions lisibles, aucune information hors champ sans moyen d’accès.

Vérification : 320/375/768/1024/1440 px, dates/fuseaux, liens projets, ordre de lecture. Fichiers : `ExperienceSection.tsx`, styles, types seulement si nécessaires. Taille M. Dépendance : V2.1 ; parallèle à V2.5 après le jalon de direction.

## V2.7 — Compétences et bento

- [x] Réintroduire les icônes et la couleur dans les quatre domaines, en gardant leur contenu ouvert.
- [x] Appliquer la famille de fonds du footer aux bento choisis et équilibrer surfaces claires et sombres.

Acceptation : cohérence entre footer, cartes et bento ; rythme visuel et hiérarchie sans uniformisation de tous les blocs.

Vérification : lecture mobile/desktop, contrastes et contenu non masqué. Fichiers : `SkillsArsenal.tsx`, `AboutSection.tsx`, styles ; données seulement pour un ajustement de texte nécessaire. Taille M. Dépendances : V2.1, V2.4.

## V2.8 — Intégration et vérification finale

- [x] Examiner les rendus réels et tous les états, puis corriger les écarts de composition avant validation technique finale.
- [x] Vérifier développement et production, tests, lint, TypeScript, build, index/fiches/navigation/footer ; documenter les navigateurs utilisés.
- [x] Mettre à jour le compte rendu et le suivi ; préserver les autres changements locaux.

Acceptation : direction visuelle respectée, aucun défaut MDX ou débordement, contenu exact et absence de publication automatique.

Vérification : critères de `tasks/plan.md` et rapport daté de V2. Taille S/M. Dépendances : V2.2, V2.3, V2.5, V2.6 et V2.7.

## Ajustements d’intégration terminés

- [x] Héros : seul statut « En poste au CIRAD jusqu’au 11 décembre », avec pastille verte.
- [x] Corriger la position finale des bento Hobbies/Langues et rendre les noms des technologies visibles.
- [x] Resserer les cartes après revue design, adoucir les raccords des captures et déplacer les métadonnées dans la marge.
- [x] Respecter le mouvement réduit pour le défilement déclenché par la navigation et le bouton de retour en haut.

## Finitions complémentaires

- [x] Équilibrer les badges en deux colonnes et vérifier les noms longs sur l’index.
- [x] Afficher les contours et les libellés au focus clavier de la navigation.
- [x] Neutraliser les entrées du héros en mouvement réduit, y compris son masque et la pulsation du statut.
- [x] Vérifier ce lot en développement et sur l’export, puis mettre à jour le bilan.
