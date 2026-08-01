'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax relative overflow-hidden rounded-3xl border border-amber-500/30 shadow-2xl my-12" ref={parallaxRef}>
      <section className="parallax__header relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="parallax__visuals relative w-full h-full overflow-hidden">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers relative w-full h-full flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="1" 
              alt="Atelier Layer 1" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-50" 
            />
            <img 
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="2" 
              alt="Atelier Layer 2" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen" 
            />
            <div data-parallax-layer="3" className="parallax__layer-title absolute z-20 text-center px-4">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold block mb-2">Virtueller Parallax Effekt</span>
              <h2 className="parallax__title text-4xl md:text-6xl font-serif font-bold text-white tracking-wider drop-shadow-2xl">
                ATELIER & LEBENSKUNST
              </h2>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80" 
              loading="eager" 
              width="800" 
              data-parallax-layer="4" 
              alt="Atelier Layer 4" 
              className="parallax__layer-img absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" 
            />
          </div>
          <div className="parallax__fade absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-zinc-950 pointer-events-none"></div>
        </div>
      </section>
      <section className="parallax__content bg-zinc-950 p-8 text-center border-t border-white/10 flex flex-col items-center justify-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 160 160" fill="none" className="osmo-icon-svg text-amber-400">
          <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
        </svg>
        <p className="text-zinc-400 text-xs font-light">
          Meisterschul-Bewerbung & Werkverzeichnis (Deutscher Künstler geb. 1984)
        </p>
      </section>
    </div>
  );
}

export default ParallaxComponent;
