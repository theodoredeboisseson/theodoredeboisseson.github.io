# 🛡Théodore de Boisseson — Portfolio

[![Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Mon portfolio perso, construit avec un focus sur le design et une architecture Next.js propre. C'est ici que je regroupe mes projets et mes expérimentations.

---

## Le Concept

L'idée est de s'éloigner du web classique tout en courbes pour quelque chose de plus brut, précis et surtout, original.

---

## 🛠Arsenal Technique

### La Stack
- **Next.js 15** (App Router) pour le coeur du projet.
- **Tailwind CSS 4** pour le style (avec pas mal de classes `@utility` custom).
- **Framer Motion** pour tout ce qui bouge.
- **MDX** pour pouvoir rédiger mes fiches projets facilement en Markdown.
- **Lucide React** pour les icônes.

### Architecture & Qualité
- **Atomic UI** : Tout est rangé par catégorie dans `app/components/ui/` (`cards`, `navigation`, `badges`...).
- **Type-Safe** : Centralisation des types dans `app/types/` pour éviter de se perdre dans les interfaces.
- **Shorthand Imports** : Utilisation systématique du `@/` pour pouvoir déplacer les fichiers sans casser les imports.

---

## Structure du Projet

```text
├── app/
│   ├── components/
│   │   ├── mdx/          # Composants pour les rapports Markdown
│   │   └── ui/           # Design System (le gros du travail visuel)
│   ├── projects/         # Route /projects (page + logique locale)
│   └── types/            # Fichiers de types centralisés
├── content/              # Mes projets au format .mdx
├── data/                 # JSON pour les skills et l'XP
└── lib/                  # Utilitaires (parsing MDX, etc.)
```

---

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en dev
npm run dev
```

---

## Gestion du Contenu

J'écris mes projets directement en MDX dans `/content/projects/`. Ça me permet d'utiliser mes propres composants React (galeries, lecteurs vidéo, etc.) à l'intérieur de mes rapports tout en gardant la simplicité du Markdown.

---

## License

Conçu par **Théodore de Boisseson**.
Projet sous licence MIT. N'hésitez pas à vous en inspirer pour vos propres projets.
