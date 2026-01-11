'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import skillsData from '../../data/skills.json';

export default function SkillsBento() {
    return (
        <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-background">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                    ARSENAL<span className="text-primary">.</span>
                </h2>
                <div className="text-right mt-4 md:mt-0">
                    <span className="block font-mono text-xs uppercase tracking-widest text-foreground/50">
                        TOOLKIT // 2026
                    </span>
                    <span className="block font-serif italic text-lg text-foreground/80">
                        Selected tools & technologies
                    </span>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            variants={{
                                hidden: { scale: 0.9, opacity: 0 },
                                visible: { scale: 1, opacity: 1 }
                            }}
                            whileHover={{ y: -5 }}
                            className="bg-white/50 backdrop-blur-sm border border-black/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-colors duration-300 aspect-square group"
                        >
                            {/* Icon */}
                            <div className="text-foreground/80 group-hover:text-primary transition-colors duration-300">
                                {getIcon(skill.icon)}
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="font-bold text-sm uppercase tracking-wide text-foreground">{skill.name}</h3>
                                <span className="text-[10px] text-foreground/40 font-mono uppercase mt-1 block">{skill.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Update helper to support custom image paths or Lucide icons
const getIcon = (name: string) => {
    // Check if it's a file path for custom icon
    if (name.startsWith('/') || name.startsWith('http')) {
        return <img src={name} alt="" className="w-8 h-8 object-contain" />;
    }

    // Lucide fallback
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name];

    if (Icon) return <Icon size={32} strokeWidth={1.5} />;

    // Specific manual mapping for missing Lucide icons or brand overrides
    if (name === 'NextJs') return <Icons.Cpu size={32} strokeWidth={1.5} />;
    if (name === 'Blender') return <Icons.Box size={32} strokeWidth={1.5} />;

    return <Icons.Code size={32} strokeWidth={1.5} />;
};
