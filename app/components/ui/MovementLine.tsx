'use client';

import React from 'react';
import { motion } from 'framer-motion';

const KineticLineLeft: React.FC = () => {
    // Configuration du motif
    const dashSize = 12; // Longueur du tiret (bien plus gros)
    const gapSize = 64;  // Espace entre les tirets (très espacé)
    // La longueur totale du motif est nécessaire pour une boucle d'animation parfaite
    const patternLength = dashSize + gapSize;

    return (
        // Le conteneur est aligné à gauche
        <div className="relative w-full h-full min-h-[500px] overflow-hidden flex justify-start my-4">
            {/*
               On restreint le SVG à une colonne étroite à gauche.
               w-24 définit la largeur de la zone de dessin.
            */}
            <svg
                className="h-full w-24 absolute left-0 inset-y-0"
                viewBox="0 0 24 100" // Le viewBox regarde uniquement cette bande étroite
                preserveAspectRatio="none"
            >
                <motion.line
                    // Positionnée au milieu de notre bande étroite de 24 unités
                    x1="12" y1="0"
                    x2="12" y2="100"

                    stroke="var(--color-primary)" // Ta couleur d'accent
                    strokeWidth="1"               // Ligne bien épaisse
                    strokeDasharray={`${dashSize} ${gapSize}`} // Applique le motif gros tirets/gros espaces
                    strokeLinecap="round"         // Bouts arrondis pour un style plus doux

                    // L'animation du défilement
                    animate={{
                        // Défile exactement de la longueur d'un motif pour boucler sans accroc
                        strokeDashoffset: [0, -patternLength]
                    }}
                    transition={{
                        duration: 2,      // Vitesse ajustée pour la nouvelle taille
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

export default KineticLineLeft;