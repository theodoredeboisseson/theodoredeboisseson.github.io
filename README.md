# Théodore de Boisseson — Portfolio

[![Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Mon portfolio perso, construit avec un focus sur le design et une architecture Next.js propre. C'est ici que je regroupe mes projets et mes expérimentations.

## Le Concept

L'idée est de s'éloigner du web classique tout en courbes pour quelque chose de plus brut, précis et surtout, original.

## Arsenal Technique

### Core Stack
- **Framework** : [Next.js 15+](https://nextjs.org/) (App Router, Server Components).
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

## License

Conçu par **Théodore de Boisseson** (normal c'est mon site).
Projet sous licence MIT. N'hésitez pas à vous en inspirer pour vos propres projets.
