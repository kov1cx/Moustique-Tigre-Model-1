/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Percent, Wind, Activity } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax effect relative to the center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - centerX) / 45,
        y: (e.clientY - centerY) / 45,
      });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-b border-brand-border px-6 sm:px-12">
      {/* Editorial Grid Backing (subtle grid lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] grid grid-cols-6 sm:grid-cols-12 h-full w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-brand-dark h-full last:border-r-0" />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] grid grid-rows-6 h-full w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-b border-brand-dark w-full last:border-b-0" />
        ))}
      </div>

      {/* Abstract Interactive Mathematical Coordinates / Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.4s ease-out",
          }}
        >
          {/* Central delicate crosshair */}
          <line
            x1="50%"
            y1="10%"
            x2="50%"
            y2="90%"
            stroke="#121212"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="#121212"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />

          {/* Abstract circles simulating concentric wave frontiers of propagation */}
          <circle
            cx="50%"
            cy="50%"
            r="160"
            fill="none"
            stroke="#A63A2B"
            strokeWidth="0.5"
            strokeDasharray="2 12"
            className="animate-[spin_120s_linear_infinite]"
          />
          <circle
            cx="50%"
            cy="50%"
            r="280"
            fill="none"
            stroke="#121212"
            strokeWidth="0.5"
            strokeDasharray="1 6"
            className="animate-[spin_180s_linear_infinite]"
          />

          {/* Random fine math grid markers */}
          <text x="52%" y="49%" className="font-mono text-[9px] fill-brand-gray tracking-wider">
            p(Y_st | θ) = Poisson(μ_st)
          </text>
          <text x="52%" y="54%" className="font-mono text-[9px] fill-brand-red tracking-wider">
            θ ~ CAR_Leroux(ρ, σ²)
          </text>
          <text x="25%" y="30%" className="font-mono text-[8px] fill-brand-gray select-none">
            x: 43.604° N, y: 3.877° E [Montpellier]
          </text>
          <text x="70%" y="75%" className="font-mono text-[8px] fill-brand-gray select-none">
            t: [May - Nov] Year: 2026
          </text>

          {/* Visualizing small spatial 'nodes' of muỗi vằn colonies */}
          <circle cx="48%" cy="32%" r="2" fill="#A63A2B" />
          <line x1="48%" y1="32%" x2="52%" y2="49%" stroke="#A63A2B" strokeWidth="0.5" />

          <circle cx="68%" cy="58%" r="1.5" fill="#A63A2B" />
          <circle cx="34%" cy="66%" r="2.5" fill="#121212" />
        </g>
      </svg>

      {/* Main Content Div configured as responsive centered look */}
      <div className="relative max-w-5xl mx-auto w-full z-10 flex flex-col items-center text-center select-none pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Small pre-title for editorial styling */}
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-red font-medium mb-6 block">
            Projet de Recherche Scientifique • Épidémiologie Spatiale
          </span>

          {/* Title */}
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-dark tracking-tight font-light leading-none mb-8">
            Moustique Tigre
          </h1>
        </motion.div>

        {/* Subtitle with highly optimized line-height and letter-spacing */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-2xl"
        >
          <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-brand-gray leading-relaxed font-light mb-12">
            Modèle Bayésien Hiérarchique pour la prédiction spatio-temporelle de la dynamique de colonisation d'Aedes albopictus
          </p>
        </motion.div>

        {/* Delicate button and stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col items-center space-y-12 w-full"
        >
          <a
            href="#contexte"
            className="group flex flex-col items-center text-brand-dark font-mono text-[10px] tracking-[0.3em] uppercase hover:text-brand-red transition-all duration-300"
          >
            <span className="mb-3">Découvrir l'analyse</span>
            <ChevronDown
              size={14}
              className="group-hover:translate-y-1 transition-transform duration-300 text-brand-red"
            />
          </a>

          {/* Micro stats table mimicking clean layout of high-end editorial paper */}
          <div className="w-full max-w-4xl border-t border-b border-brand-border py-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-8 select-text">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray mb-1">
                Indice Spatial R2
              </span>
              <span className="font-serif text-2xl text-brand-dark font-light">0.892</span>
              <span className="block font-mono text-[8px] text-brand-red mt-1">± 0.034 Posterior Credible</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray mb-1">
                Départements Colonisés
              </span>
              <span className="font-serif text-2xl text-brand-dark font-light md:border-l md:border-brand-border md:pl-6">71 / 96</span>
              <span className="block font-mono text-[8px] text-brand-gray mt-1 md:pl-6">Métropole Française</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray mb-1">
                Hyper-Prior $\sigma^2$
              </span>
              <span className="font-serif text-2xl text-brand-dark font-light md:border-l md:border-brand-border md:pl-6">IG(1.0, 0.05)</span>
              <span className="block font-mono text-[8px] text-brand-gray mt-1 md:pl-6">Spatially Structured</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray mb-1">
                Pas de temps $t$
              </span>
              <span className="font-serif text-2xl text-brand-dark font-light md:border-l md:border-brand-border md:pl-6">Mensuel</span>
              <span className="block font-mono text-[8px] text-brand-gray mt-1 md:pl-6">Série Temporelle d'Activité</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 left-12 w-[1px] h-20 bg-brand-border hidden lg:block" />
      {/* Decorative page index indicator */}
      <div className="absolute right-12 bottom-12 font-mono text-[10px] tracking-widest text-brand-gray hidden lg:block">
        [INDEX.00] // INTRO
      </div>
    </section>
  );
}
