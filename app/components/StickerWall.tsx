'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';
import skillsData from '../../data/skills.json';

// Helper to map icon name string to Lucide component
const getIcon = (name: string) => {
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name];
    return Icon ? <Icon size={24} /> : null;
};

export default function StickerWall() {
    const containerRef = useRef(null);

    // Generate random rotation properties for each sticker on client side would be ideal 
    // to avoid hydration mismatch, but for simplicity we used fixed seed or css.
    // We'll use random values here assuming it's a client component mostly.

    return (
        <section className="relative w-full py-20 overflow-hidden bg-[#101010]" ref={containerRef}>
            <div className="absolute inset-0 bg-[#CC5500]/5" />

            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-5xl font-bold uppercase tracking-tight text-[#F5F5F5]">
                    Tech <span className="text-[#CC5500]">&</span> Art
                    <span className="block text-2xl font-mono opacity-50 mt-2">Drag to organize</span>
                </h2>
            </div>

            <div className="relative w-full h-[600px] border-y border-[#333] bg-[#151515]">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                {/* Draggable Area Container */}
                <motion.div className="flex flex-wrap justify-center items-center h-full gap-8 p-10 cursor-grab active:cursor-grabbing">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            drag
                            dragConstraints={containerRef}
                            whileHover={{ scale: 1.1, zIndex: 50 }}
                            whileDrag={{ scale: 1.2, zIndex: 100 }}
                            initial={{ rotate: Math.random() * 20 - 10, y: 50, opacity: 0 }}
                            animate={{ rotate: Math.random() * 20 - 10, y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-4 bg-[#F5F5F5] text-[#101010] shadow-neo w-24 h-24 sm:w-32 sm:h-32 rounded-lg select-none border-2 border-black"
                        >
                            <div className="mb-2 text-[#CC5500]">
                                {/* Map Icon name to Lucide Icon */}
                                {/* Fallback to generic code icon if not found in Lucide (e.g. NextJs might not exist, but Code might) */}
                                {/* Note: NextJs is not in Lucide. Using Code/Box as fallback visually */}
                                {skill.icon === 'NextJs' ? <Icons.Cpu size={32} /> :
                                    skill.icon === 'Blender' ? <Icons.Box size={32} /> :
                                        skill.icon === 'Music' ? <Icons.Music size={32} /> :
                                            <Icons.Code size={32} />}
                            </div>
                            <span className="font-bold text-sm uppercase text-center">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
