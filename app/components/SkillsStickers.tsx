'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';
import skillsData from '../../data/skills.json';

export default function SkillsStickers() {
    return (
        <section className="relative w-full py-20 overflow-hidden bg-[#101010]">
            <div className="absolute inset-0 bg-[#CC5500]/5" />

            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-5xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                    Tech <span className="text-[#CC5500]">&</span> Art
                    <span className="block text-xl font-mono opacity-50 mt-2 text-[#CC5500]">// My Arsenal</span>
                </h2>
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            whileHover={{
                                scale: 1.02,
                                borderColor: '#CC5500',
                                boxShadow: '5px 5px 0px 0px #CC5500' // Colored Neo Shadow on hover
                            }}
                            className="flex items-center gap-4 p-4 bg-[#151515] border border-[#333] rounded-sm group transition-all duration-300 cursor-default"
                        >
                            {/* Icon Section - Floating Animation */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2 // Deterministic delay
                                }}
                                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#CC5500]/10 text-[#CC5500] rounded-sm"
                            >
                                {getIcon(skill.icon)}
                            </motion.div>

                            {/* Info Section */}
                            <div className="flex-grow">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-[#F5F5F5] uppercase tracking-wide">{skill.name}</h3>
                                    <span className="text-xs text-[#666] font-mono uppercase">{skill.category}</span>
                                </div>

                                {/* Comfort Level Gauge */}
                                <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.comfortLevel}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-[#CC5500]"
                                    />
                                </div>
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
        return <img src={name} alt="" className="w-full h-full object-contain p-1" />;
    }

    // Lucide fallback
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name];

    if (Icon) return <Icon size={24} />;

    // Specific manual mapping for missing Lucide icons or brand overrides
    if (name === 'NextJs') return <Icons.Cpu size={24} />;
    if (name === 'Blender') return <Icons.Box size={24} />;

    return <Icons.Code size={24} />;
};
