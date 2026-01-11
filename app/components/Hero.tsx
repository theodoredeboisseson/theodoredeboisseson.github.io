import Image from 'next/image';
import TechnicalCrosshair from './TechnicalCrosshair';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] w-full bg-[#101010] text-[#F5F5F5] overflow-hidden flex flex-col justify-center px-4 md:px-12">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero_bg.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Subtle overlay to ensure text readability while maintaining image visibility */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Decorative Technical Elements */}
            <TechnicalCrosshair className="top-10 left-10" />
            <TechnicalCrosshair className="bottom-10 right-10" />
            <div className="absolute top-1/2 left-0 h-[1px] w-full bg-white opacity-20" />

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">

                {/* Text Content - Asymmetric Placement */}
                <div className="md:col-span-7 flex flex-col space-y-4 relative z-20 mix-blend-difference">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]">
                        Theodore<br />
                        <span className="text-outline text-transparent stroke-white stroke-2">De Boisseson</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-mono mt-4">
                        Full Stack Developer <br />
                        Digital Artist
                    </p>
                </div>

                {/* Image - Irregular Shape */}
                <div className="md:col-span-5 relative h-[500px] w-full">
                    {/* Abstract Background Shape */}
                    <div className="absolute inset-0 bg-[#CC5500] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] opacity-20 blur-3xl animate-pulse" />

                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-2 border-[#333] shadow-neo rotate-3 hover:rotate-0 transition-transform duration-500">
                        {/* Placeholder for Photo - Using a solid color fall back or external placeholder if local missing */}
                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500 font-mono">
                            <Image
                                src="/images/profile_picture.jpg"
                                alt="Theodore de Boisseson"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-[1px] h-16 bg-[#F5F5F5]" />
            </div>
        </section>
    );
}
