# Vérification — Interactions et finitions du 17 novembre 2026

Les cinq demandes sont implémentées et enregistrées dans des commits distincts. Le rendu a été validé par l’utilisateur. Aucun push ni déploiement effectué pendant ce lot.

## Résultat

- Les cartes sont des liens natifs sur toute leur surface, avec un nom accessible court, un seul arrêt de Tab et un focus visible. Le CTA est un repère visuel du même lien.
- PhotoSwipe 5.4.4 réunit couverture, figures, plusieurs galeries et images Markdown de chaque fiche. Ordre du document, déduplication des sources, légende pertinente et ouverture sur l’image effectivement cliquée.
- Les images ouvrent directement le visualiseur ; le lien séparé « Agrandir l’image » et la modale locale des anciennes galeries sont retirés.
- Fond encre opaque, légendes sous l’image, compteur et contrôles français. Zoom, pincement, double-tap, balayage, flèches, Échap et retour du focus opérationnels.
- Les deux fonds de chronologie utilisent des couleurs et une interpolation OKLCH, avec un fond papier de repli.
- Les métadonnées du cadre sont transparentes, sans bordure et atténuées ; le cadre est déclaré décoratif.
- Kung-Fu retiré, Automobile remplacé par Automobile & mécanique avec l’icône Wrench.

## Intégration et dépendances

PhotoSwipe est utilisé directement, avec un import dynamique du contrôleur et du moteur au premier clic. Les images portent des ancres progressives et leurs dimensions intrinsèques dans le HTML serveur ; les aperçus gardent Next Image. Les dimensions sont obtenues à la génération avec image-size 2.1.0, dépendance de développement sans dépendance transitive.

La politique MDX `blockJS` est conservée, ainsi que les dimensions littérales des figures. Le navigateur lit uniquement le catalogue de la fiche affichée. Les dimensions des médias en pleine résolution sont distinctes de celles de leurs aperçus recadrés.

Les légendes sont injectées comme texte, les imports en échec conservent une navigation vers le fichier, et le contrôleur est détruit lorsque la fiche est démontée.

Sources : [PhotoSwipe — démarrage](https://photoswipe.com/getting-started/), [sources des images](https://photoswipe.com/data-sources/), [méthodes](https://photoswipe.com/methods/), [options](https://photoswipe.com/options/), [légendes](https://photoswipe.com/caption/).

## Contrôles

| Contrôle | Résultat |
| --- | --- |
| Tests Node | 11 réussis : dates, références projets, dimensions/déduplication et compilation MDX réelle → Next Image + lien du visualiseur. |
| ESLint | Passage complet puis vérification ciblée du visualiseur après les corrections finales. |
| TypeScript | Réussi, notamment via le build final. |
| Build/export | 15 pages statiques générées. |
| Diff | `git diff --check` réussi. |
| Rendu responsive | 320, 375, 768, 1024 et 1440 px : pas de débordement horizontal, cartes et nouvelles finitions contrôlées. |
| Tactile émulé | 375 × 812 en mouvement réduit et 812 × 375 en mouvement normal : pincement, zoom, balayage, fermeture, légende intégrale, image non recouverte et focus restauré. |
| Développement | Serveur 3000 à jour : ouverture, double-tap pour zoomer et fermeture vérifiés. |

Sur chaque fiche ci-dessous : ouverture depuis le dernier déclencheur, navigation précédente/suivante lorsqu’elle s’applique, légende, Tab, Échap, restauration du focus et de la position de lecture. Aucun événement d’erreur JavaScript ni réponse HTTP en erreur sur le parcours contrôlé.

| Fiche | Déclencheurs | Images uniques |
| --- | ---: | ---: |
| Genomint | 4 | 3 |
| JiFoosball | 6 | 6 |
| Portfolio | 5 | 3 |
| PokeCritics | 4 | 3 |
| JiCursum | 2 | 1 |
| MJC | 1 | 1 |
| Robotique | 1 | 1 |
| Nuit de l’Info | 1 | 1 |

Les clics depuis la description, l’image et un bord de carte ont été vérifiés. À l’index, Tab passe directement d’une carte à la suivante, Entrée ouvre la fiche et un retour de navigation avec le visualiseur ouvert ne laisse pas de modale résiduelle.

Les gradients sont effectivement interpolés en OKLCH. Contrastes ciblés des textes des deux frises, calculés sur 21 échantillons de leur interpolation : minimum 5,96:1 et 6,01:1 ; badge actif 6,24:1. Repli papier vérifié. Cette mesure ne constitue pas un audit complet du site.

## Délégation et corrections de revue

| Lot | Modèle / effort réels | Vérification |
| --- | --- | --- |
| Carte entièrement cliquable | gpt-6.1-sol / low | ESLint, TypeScript et contrôle du diff par l’agent ; interactions et rendu par le parent. |
| Recherche des API PhotoSwipe | gpt-6-luna / low | Documentation officielle, signatures et points d’attention ; aucune édition. |
| Revue indépendante du visualiseur | gpt-6.1-sol / medium | Sources réelles et API installée ; un P2 sur l’absence de nom accessible du dialogue, corrigé. |

Les tests navigateur du parent ont aussi identifié une sortie de Tab vers le navigateur après le dernier contrôle. Une boucle explicite entre les contrôles visibles corrige ce cas, en préservant les raccourcis avec modificateurs. Les légendes longues disposent d’une place adaptée dans le calcul de l’image, avec une zone de lecture bornée sur les petits écrans.

## Preuves et limites

Scripts, rapports JSON et captures temporaires dans `/tmp/portfolio-refinements/` : `check.json`, `touch.json`, `contrast.json` et `development.json`. Captures du visualiseur, de son zoom, des deux frises et des hobbies. L’aperçu T3 a confirmé l’ouverture, les flèches, Échap et le retour de focus ; Chromium local a complété l’émulation tactile et la préférence de mouvement réduit.

Chromium uniquement ; pas d’iPhone/Safari réel, Firefox ni lecteur d’écran. Les durées d’ouverture, fermeture et zoom sont à zéro en mouvement réduit sur les cas contrôlés ; les gestes suivent toujours les actions de l’utilisateur. Les commandes utilisent Node 26 localement et émettent les avertissements Node déjà documentés. Le serveur temporaire d’export a été arrêté après les contrôles ; le serveur de développement existant est conservé.
