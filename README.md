# Théodore de Boisseson — Portfolio

[![Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Mon portfolio perso, construit avec un focus sur le design et une architecture Next.js propre. C'est ici que je regroupe mes projets et mes expérimentations.

## Le Concept

L'idée est de s'éloigner du web classique tout en courbes pour quelque chose de plus brut, précis et surtout, original.

## Arsenal Technique

### Core Stack
- **Framework** : [Next.js 16+](https://nextjs.org/) (App Router, Server Components).
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/) (Architecture `@utility` moderne).
- **Animations** : [Framer Motion](https://www.framer.com/motion/) (Complex interaction logic & layout transitions).
- **Content** : [MDX](https://mdxjs.com/) (Gestion des projets via fichiers Markdown extensibles).
- **Icons** : [Lucide React](https://lucide.dev/) pour les glyphes techniques.

### Architecture Logicielle
- **Atomic UI Design** : Composants organisés par responsabilité (`badges`, `cards`, `display`, `navigation`, `overlays`).
- **Strictly Type-Safe** : Centralisation modulaire des types dans `app/types/` pour une maintenance simplifiée.
- **Shorthand Imports** : Utilisation systématique de l'alias `@/` pour une structure de fichiers robuste et flexible.

## Structure du Projet

```text
├── app/
│   ├── components/
│   │   ├── mdx/          # Composants spécifiques au contenu Markdown
│   │   ├── sections/     # Sections majeures de la page d'accueil
│   │   └── ui/           # Design System (categorisé par type)
│   ├── projects/         # Route /projects (Colocalisation page + client logic)
│   └── types/            # Architecture de types modulaire (Source de vérité)
├── content/              # Rapports de projets au format MDX
├── data/                 # JSON statique (Compétences, Expériences)
├── lib/                  # Utilitaires (Parsing MDX, Helpers)
└── public/               # Assets statiques (Images, Icons)
```

## Installation

1. **Clonage du dépôt**
```bash
   git clone https://github.com/theodoredeboisseson/theodoredeboisseson.github.io.git
```

2. **Installation des dépendances**
```bash
npm install
   ```

3. **Lancement du serveur de développement**
```bash
npm run dev
```

## Gestion du Contenu

Les projets sont gérés via des fichiers `.mdx` situés dans `/content/projects/`. Chaque projet supporte :
- Un **Frontmatter** (catégorie, date, stack technique, liens).
- Des **Composants Custom** (Spacers, Galeries d'images, Lecteurs Vidéo).

L'ordre d'affichage des projets est défini dans `lib/mdx.ts` : les réalisations sélectionnées sont classées par importance, puis les nouveaux projets non classés par date décroissante. Modifier cette liste pour réordonner la page d'accueil et l'index des projets.

L’accueil met en avant Genomint, JiFoosball et la MJC, dans cet ordre, avec une composition éditoriale sans carrousel. Le frontmatter `featured` définit la sélection ; `contribution`, `status` (`in-progress` ou `completed`) et `imageAlt` complètent les fiches. L’ordre de `usedSkills` détermine les technologies principales, sans note de confort. Les autres projets restent dans l’index.

Les compétences sont présentées en quatre domaines ouverts, définis dans `data/skill-domains.json` : interfaces complexes, lisibilité des données, services applicatifs et évolution du logiciel. Les outils référencent le catalogue unique `data/skills.json`, avec des liens vers les projets qui démontrent leur utilisation. Les anciennes jauges, cartes de compétences et leur panneau ont été retirés.

Le parcours distingue Expériences et Formation, chacune de la plus récente à la plus ancienne. Les expériences d’une même structure sont regroupées ; le CIRAD conserve le stage et le CDD comme deux périodes distinctes. Les dates de `data/bio.json` acceptent `YYYY-MM` et `YYYY-MM-DD` ; `lib/experience-dates.ts` conserve cette précision et formate les jours en UTC. La disponibilité du héros et de la recherche est également définie dans ce JSON.

Sur la photo du héros, sept pétales CSS dérivent lentement. Sur les pages claires, huit points discrets bougent dans la grille fixe ; le pied de page utilise une texture de lignes et de halos composée de dégradés CSS. Ces animations ne mobilisent que `transform` et `opacity`, sans canvas ni écouteur de défilement, et s'arrêtent sous `prefers-reduced-motion`. Le pied de page reprend les coordonnées, réseaux et CV de `data/bio.json`. Le pied de page réutilise le favicon `/icon.svg`, sans le modifier, et conserve son espace inférieur jusqu’au passage de la navigation en barre latérale.

## Vérifications

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Les tests utilisent le runner Node et l’effacement natif des types TypeScript : Node 22.18 ou plus récent est recommandé pour `npm test`. Ils vérifient les dates, les fuseaux horaires et la cohérence de la sélection des projets, des métadonnées et du catalogue de compétences. Le build produit l’export statique dans `out/`.

Les deux captures Genomint proviennent du parcours documenté dans le dépôt du projet. Le composant MDX `ProjectFigure` les affiche sans recadrage et propose de les ouvrir en grand, avec une légende et un texte alternatif.

## License

Conçu par **Théodore de Boisseson** (normal c'est mon site).
Projet sous licence MIT. N'hésitez pas à vous en inspirer pour vos propres projets.
