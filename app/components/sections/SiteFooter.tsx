import Image from 'next/image';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

interface SiteFooterProps {
    email: string;
    github: string;
    linkedin: string;
    cvUrl: string;
}

export default function SiteFooter({ email, github, linkedin, cvUrl }: SiteFooterProps) {
    return (
        <footer className="relative isolate w-full overflow-hidden bg-foreground text-background fluid-padding pt-16 pb-28 xl:pb-8">
            <div className="footer-atmosphere" aria-hidden="true" />
            <div className="container-7xl relative z-10">
                <div className="grid gap-12 border-b border-background/20 pb-16 md:grid-cols-2">
                    <div>
                        <p className="text-label text-primary mb-6">END OF ISSUE {' // '} Restons en contact</p>
                        <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl leading-tight">Un projet en tête&nbsp;?</h2>
                        <a className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 font-mono text-sm sm:text-base hover:text-primary transition-colors break-all" href={`mailto:${email}`}>
                            {email} <ArrowUpRight size={18} aria-hidden="true" />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:justify-self-end md:gap-16">
                        <nav aria-label="Navigation de bas de page">
                            <p className="text-label text-background/50 mb-5">EXPLORER</p>
                            <ul className="space-y-3 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#about">Profil</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#projects">Projets</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#arsenal">Compétences</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#parcours">Parcours</a></li>
                            </ul>
                        </nav>
                        <div>
                            <p className="text-label text-background/50 mb-5">AILLEURS</p>
                            <ul className="space-y-3 text-sm">
                                <li><a className="inline-flex items-center gap-1 hover:text-primary transition-colors" href={github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></li>
                                <li><a className="inline-flex items-center gap-1 hover:text-primary transition-colors" href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a></li>
                                <li><a className="inline-flex items-center gap-1 hover:text-primary transition-colors" href={cvUrl} target="_blank" rel="noopener noreferrer">Mon CV <ArrowUpRight size={14} aria-hidden="true" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-background/20 py-8">
                    <div className="flex items-center gap-4">
                        <Image src="/icon.svg" alt="Théodore — repère de navigation" width={80} height={80} className="size-16 shrink-0 sm:size-20" />
                        <p className="font-mono text-xs uppercase tracking-widest text-background/70">Théodore de Boisseson<br />Développeur full-stack</p>
                    </div>
                    <a href="#hero" className="button-circle shrink-0 size-12! border-background/30! text-background! hover:text-foreground! hover:!bg-background" aria-label="Retour en haut"><ArrowUp size={20} aria-hidden="true" /></a>
                </div>
                <div className="flex flex-wrap justify-between gap-3 pt-6 text-xs font-mono uppercase tracking-wider text-background/50">
                    <span>© {new Date().getFullYear()} Théodore de Boisseson</span>
                    <span>Made in France</span>
                </div>
            </div>
        </footer>
    );
}
