> Bilan de la V2 terminée : `tasks/verification-v2.md`.

> Compte rendu de la première refonte. Le retour ultérieur du 16 novembre signale une erreur en développement dans les figures Genomint et rejette plusieurs choix visuels ; ces points sont confirmés et suivis dans `tasks/design-study.md` et le plan V2. Les résultats ci-dessous ne valident pas la V2.

# Vérification de la refonte — 16 novembre 2026

## Résultat et périmètre

Les trois lots délégués sont intégrés : sélection éditoriale des projets, quatre domaines de compétences ouverts, expériences et formation séparées. Genomint précède JiFoosball et MJC sur l’accueil et l’index ; sa nouvelle fiche documente les contributions personnelles et collectives. L’accueil, sa navigation et le footer suivent le même ordre. Les huit fiches projets restent présentes.

Les changements locaux antérieurs ont été conservés. Aucune dépendance ajoutée, aucun commit, push, PR ou déploiement. Le dépôt Genomint a uniquement servi de référence en lecture.

## Contrôles automatisés

| Contrôle | Résultat |
| --- | --- |
| `npm test` | 6 tests réussis : dates exactes, dates au mois, quatre fuseaux horaires, ordre des projets, métadonnées et anciennes références/médias. |
| `npm run lint` | Réussi sur l’ensemble du dépôt. |
| `npx tsc --noEmit` | Réussi. |
| `npm run build` | Réussi ; 15 pages statiques générées, dont `/projects/genomint`. |
| `git diff --check` | Réussi. |
| Export Genomint | Fichier HTML, titre, description, image Open Graph et entrée de sitemap vérifiés. |

L’environnement utilise Node 26.11.1. Le runner de tests s’appuie sur l’effacement natif des types ; le README recommande Node 22.18 ou plus récent pour cette commande. Node émet un avertissement de détection du format ESM pendant les tests et un avertissement de dépréciation pendant le build ; les commandes terminent avec succès.

## Vérification dans Chromium

Vérification sur l’export de production avec Chromium, aux largeurs **320, 375, 768, 1024 et 1440 px** :

- Ordre des sections et des trois projets sélectionnés, quatre domaines de compétences visibles, dates CIRAD exactes.
- Absence de débordement global et des trois sections ; contrôle visuel des captures desktop, tablette et mobile.
- Footer avec `/icon.svg` ; copyright dégagé de la navigation fixe, y compris avant le passage à la barre latérale.
- Entrée clavier vers Genomint ; chargement des figures, présence des crédits, retour à l’ancre de l’index.
- Huit projets dans l’index ; filtre Création activé avec Espace et état `aria-pressed`, puis retour à Tout.
- Navigation fixe Projets → Compétences → Parcours vérifiée à 320 et 1440 px.
- Chargement avec et sans préférence de mouvement réduit ; titres accessibles et entièrement visibles, sans mouvement des caractères ni du bandeau sous cette préférence.
- Aucun événement d’erreur JavaScript ni échec HTTP lors du parcours de vérification.

Un contrôle visuel a révélé que le groupe durée/équipe de Genomint était coupé à 320 px malgré l’absence de débordement global. Le groupe peut désormais revenir à la ligne ; les coordonnées de chaque libellé ont été revérifiées dans le viewport. La hiérarchie de titres de la fiche a aussi été contrôlée.

Le contrôle final a révélé une différence de balisage serveur/navigateur liée au rendu conditionnel de `AnimatedText` sous mouvement réduit. Le composant garde désormais un balisage stable et la préférence est appliquée en CSS aux styles d’entrée. Le build et le lint ont été relancés, puis les deux modes de chargement vérifiés sans erreur d’hydratation.

Le texte des nouveaux blocs utilise la couleur de premier plan, avec des opacités de 65 % ou plus ; le rose sert essentiellement aux repères, icônes et soulignements. Ce contrôle ciblé ne constitue pas un audit d’accessibilité exhaustif du site.

## Données et médias

- CIRAD : stage de 16 semaines du **20 avril au 7 août 2026**, puis CDD du **16 septembre au 11 décembre 2026**, en cours à la date de vérification. Les autres dates conservent leur précision au mois.
- Disponibilité : après le CDD se terminant le 11 décembre, sans jour arbitraire de prise de poste.
- Théodore : référent frontend et contributions à `back-gkg`. Alexis : `core-ai`, déploiement initial et outillage. Michel : certaines visualisations et certains filtres.
- Aucun chiffre d’impact, de couverture ou de nombre exact de tests Genomint publié sans mesure.
- Captures reprises de `../genomint/docs/user-guides/images/gkg-five-minute-{explorer,export}.webp`, sans modification : 1800 × 1250 px chacune, environ 133 et 135 Ko. Textes alternatifs, légendes et liens d’agrandissement présents.
- Les captures illustrent le parcours documentaire consulté ; aucun serveur Genomint n’a été lancé et aucun déploiement n’a été attesté par ces images.

## Revue et limites

La revue indépendante a contrôlé les composants connectés, contrats, données, références, dates, attribution et export statique. Elle n’a identifié aucun défaut concret dans le périmètre demandé. Le dernier correctif de mouvement réduit a été vérifié à l’exécution par le parent après cette revue.

Firefox et WebKit ne sont pas installés ; ils n’ont pas été testés. Les outils d’aperçu T3 ont échoué deux fois avec `Preview automation snapshot timed out after 15000ms` ; la vérification a ensuite utilisé Playwright avec Chromium local. L’onglet d’aperçu et le serveur temporaire de vérification ont été fermés à la fin.

Aucune mesure de performance, étude utilisateur ou vérification de production Genomint n’a été réalisée dans ce chantier.
