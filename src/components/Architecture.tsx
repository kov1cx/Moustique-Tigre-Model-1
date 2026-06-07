/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { initialParameters } from "../data";
import { ModelParameter } from "../types";
import { Percent, TrendingUp, Settings, Sliders, AlertCircle, Info } from "lucide-react";

export default function Architecture() {
  const [selectedParam, setSelectedParam] = useState<ModelParameter>(initialParameters[1]); // Temperature effect initially
  const [priorType, setPriorType] = useState<"vague" | "informative">("informative");
  const [sampleSize, setSampleSize] = useState<number>(350); // slider for observed data weight

  // Helper to generate coordinates for SVG normal PDF curves
  // We simulate dynamic curves based on prior type and sample size!
  // This demonstrates "Bayesian updating" beautifully:
  // - Vague prior is extremely fat, flat, low peak. Posterior is centered on data.
  // - Informative prior has high peak.
  // - If sample size is small, posterior leans to prior. If sample size is large, posterior shifts perfectly to the data likelihood!
  const getCurveData = () => {
    const points: { x: number; y: number }[] = [];
    const priorPoints: { x: number; y: number }[] = [];
    const likelihoodPoints: { x: number; y: number }[] = [];

    // Let the true parameter value represent the likelihood center
    const trueVal = selectedParam.value; // e.g. 0.78
    
    // Prior parameters
    const priorMean = priorType === "informative" ? selectedParam.mean - 0.2 : 0;
    const priorSD = priorType === "informative" ? 0.3 : 1.2;

    // Likelihood variance shrinks as sample size increases
    const likelihoodMean = trueVal;
    const likelihoodSD = 0.8 / Math.sqrt(sampleSize / 10);

    // Posterior parameters (analytical combination of Normal priors and normal likelihood)
    // Variance: 1/PostVar = 1/PriorVar + n/DataVar
    const priorPrec = 1 / (priorSD * priorSD);
    const likePrec = 1 / (likelihoodSD * likelihoodSD);
    const postPrec = priorPrec + likePrec;
    const postSD = Math.sqrt(1 / postPrec);
    const postMean = (priorMean * priorPrec + likelihoodMean * likePrec) / postPrec;

    for (let x = -1; x <= 3; x += 0.05) {
      // Normal distribution values: f(x) = (1 / (sd * sqrt(2pi))) * exp(-0.5 * ((x-mean)/sd)^2)
      const pdf = (mean: number, sd: number) => {
        const exponent = -0.5 * Math.pow((x - mean) / sd, 2);
        return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      };

      // Scale to SVG viewport height (e.g. 150 height max, y axis is inverted in SVG)
      points.push({ x: (x + 1) * 75, y: 150 - pdf(postMean, postSD) * 28 });
      priorPoints.push({ x: (x + 1) * 75, y: 150 - pdf(priorMean, priorSD) * 28 });
      likelihoodPoints.push({ x: (x + 1) * 75, y: 150 - pdf(likelihoodMean, likelihoodSD) * 28 });
    }

    const pointsToPath = (pts: { x: number; y: number }[]) => {
      return pts.reduce((acc, p, idx) => {
        // clamp Y coordinates to fit within viewport heights (0 to 150)
        const yVal = Math.max(2, Math.min(148, p.y));
        return idx === 0 ? `M ${p.x} ${yVal}` : `${acc} L ${p.x} ${yVal}`;
      }, "");
    };

    return {
      posteriorPath: pointsToPath(points),
      priorPath: pointsToPath(priorPoints),
      likelihoodPath: pointsToPath(likelihoodPoints),
      posteriorMean: postMean.toFixed(3),
      priorMean: priorMean.toFixed(3),
      posteriorSD: postSD.toFixed(3)
    };
  };

  const { posteriorPath, priorPath, likelihoodPath, posteriorMean, priorMean, posteriorSD } = getCurveData();

  return (
    <section id="architecture" className="py-24 sm:py-32 bg-white border-b border-brand-border px-6 sm:px-12 relative overflow-hidden select-text">
      {/* Editorial side identifier */}
      <div className="absolute left-12 top-12 font-mono text-[10px] tracking-widest text-brand-gray hidden lg:block">
        [INDEX.02] // L'ARCHITECTURE
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 max-w-3xl">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-red uppercase block mb-4">
            02. Spécifications Hiérarchiques du Modèle
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark tracking-tight font-light leading-tight mb-6">
            L'Édifice de Poisson-Log-Normal : Décomposer la dynamique de ponte.
          </h2>
          <p className="font-serif italic text-lg text-brand-gray leading-relaxed font-light">
            Les processus de propagation biologique de courte portée exigent une structure multiniveau. Le cadre bayésien lie la variable aléatoire observée à l’effet latent environnemental et spatial.
          </p>
        </div>

        {/* Large Layout: 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
          
          {/* LEFT 7 COLUMNS: Mathematical Formula Card and Prior Visualizer */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* The Hierarchy Formula Board: Stylised mathematical card resembling elegant printed LaTeX */}
            <div className="border border-brand-border bg-[#FAF9F6] p-8 relative flex flex-col justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-brand-gray block mb-6">
                Structure hiérarchique théorique [Equation.04]
              </span>
              
              <div className="space-y-8 py-4 select-all">
                {/* Level 1: Observation Process */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 border-b border-brand-border/40 pb-6">
                  <div className="md:w-32">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-brand-red font-medium block">
                      Niveau 1
                    </span>
                    <span className="font-mono text-[9px] text-brand-gray block">Processus d'Observation</span>
                  </div>
                  <div className="flex-1 flex justify-center py-4 bg-white/50 border border-brand-border/30 rounded-none font-serif text-xl font-light text-brand-dark tracking-wide">
                    Y<span className="text-xs align-sub">st</span> ~ Poisson(&mu;<span className="text-xs align-sub">st</span>)
                  </div>
                </div>

                {/* Level 2: Latent Spatio-temporal Process */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 border-b border-brand-border/40 pb-6">
                  <div className="md:w-32">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-brand-red font-medium block">
                      Niveau 2
                    </span>
                    <span className="font-mono text-[9px] text-brand-gray block">Prédicteur Linéaire Latent</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-center py-4 bg-white/50 border border-brand-border/30 rounded-none font-serif text-lg sm:text-xl font-light text-brand-dark tracking-wide mb-2 px-2 text-center">
                      log(&mu;<span className="text-xs align-sub">st</span>) = &beta;<span className="text-[10px] align-sub">0</span> + &beta;<span className="text-[10px] align-sub">1</span> Temp<span className="text-[10px] align-sub">st</span> + &beta;<span className="text-[10px] align-sub">2</span> Prec<span className="text-[10px] align-sub">st</span> + &beta;<span className="text-[10px] align-sub">3</span> Urb<span className="text-[10px] align-sub">s</span> + u<span className="text-xs align-sub">s</span> + &eta;<span className="text-xs align-sub">t</span>
                    </div>
                    <span className="block font-mono text-[8px] text-center text-brand-gray">
                      Où u<span className="text-[7px] align-sub">s</span> est l'effet spatial structuré (CAR Leroux) et &eta;<span className="text-[7px] align-sub">t</span> l'effet autoregressif temporel AR(1).
                    </span>
                  </div>
                </div>

                {/* Level 3: Priors & Hyperpriors */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-32">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-brand-red font-medium block">
                      Niveau 3
                    </span>
                    <span className="font-mono text-[9px] text-brand-gray block">Hyper-Distributions</span>
                  </div>
                  <div className="flex-1 flex justify-center py-4 bg-white/50 border border-brand-border/30 rounded-none font-serif text-lg font-light text-brand-dark tracking-wider">
                    &beta;<span className="text-xs align-sub">j</span> ~ N(0, 10), &sigma;<span className="text-xs align-sub">Spatial</span><span className="text-[10px] uppercase font-sans font-black">²</span> ~ IG(1, 0.05)
                  </div>
                </div>
              </div>

              {/* Formula Footer */}
              <div className="border-t border-brand-border/60 pt-4 mt-6 flex justify-between text-[9px] font-mono text-brand-gray">
                <span>INTÉGRATION : MARKOV CHAIN MONTE CARLO (MCMC)</span>
                <span>COMPILATION : 120,000 ITERATIONS</span>
              </div>
            </div>

            {/* INTERACTIVE BAYES UPDATING SIMULATOR: Highlights Prior-to-Posterior update curves */}
            <div className="border border-brand-border p-6 relative bg-white select-none">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#666666]">
                    Théorème de Bayes en Action
                  </span>
                  <span className="font-serif text-sm font-medium text-brand-dark mt-0.5">
                    Mise à jour de Priors et Distribution A Posteriori
                  </span>
                </div>
                {/* Legend badges */}
                <div className="flex gap-4 font-mono text-[9px] uppercase tracking-wider">
                  <span className="text-brand-gray flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-brand-gray/60 inline-block"></span> Prior
                  </span>
                  <span className="text-[#A1A1AA] flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-[#DDDDE1] inline-block border-t border-dashed"></span> Likelihood
                  </span>
                  <span className="text-brand-red flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-brand-red inline-block"></span> Posterior
                  </span>
                </div>
              </div>

              {/* Curve Display Screen */}
              <div className="relative border border-brand-border/40 p-4 bg-brand-bg-off aspect-[16/6] md:aspect-[16/5] flex items-end mb-6 overflow-hidden">
                <div className="absolute top-2 left-3 font-mono text-[9px] text-[#A63A2B] bg-white border border-brand-border/50 px-2 py-0.5 shadow-sm">
                  {selectedParam.name} (&beta;)
                </div>

                <svg viewBox="0 0 300 150" className="w-full h-full">
                  {/* Bottom boundary line */}
                  <line x1="0" y1="148" x2="300" y2="148" stroke="#E5E5E5" strokeWidth="1" />
                  
                  {/* Prior Curve */}
                  <path
                    d={priorPath}
                    fill="none"
                    stroke="#71717A"
                    strokeWidth="1"
                    strokeDasharray={priorType === "vague" ? "3 3" : ""}
                    className="transition-all duration-500 ease-in-out"
                  />

                  {/* Likelihood curve (Data distribution) */}
                  <path
                    d={likelihoodPath}
                    fill="none"
                    stroke="#CECED3"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    className="transition-all duration-500 ease-in-out"
                  />

                  {/* Posterior Curve */}
                  <path
                    d={posteriorPath}
                    fill="none"
                    stroke="#A63A2B"
                    strokeWidth="2"
                    className="transition-all duration-500 ease-in-out animate-draw-curve"
                  />

                  {/* Point of convergence */}
                  <line x1={(parseFloat(posteriorMean) + 1) * 75} y1="0" x2={(parseFloat(posteriorMean) + 1) * 75} y2="150" stroke="#A63A2B" strokeWidth="0.5" strokeDasharray="1 3" />
                  <text x={(parseFloat(posteriorMean) + 1) * 75 + 4} y="40" className="font-mono text-[8px] fill-brand-red font-semibold">
                    Mean_post = {posteriorMean}
                  </text>
                </svg>
              </div>

              {/* Live interactive inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray mb-2">
                    Type de Prior (&pi;(&beta;))
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setPriorType("informative")}
                      className={`py-2 px-2 text-center text-[9px] font-mono tracking-wider uppercase transition-all duration-300 ${
                        priorType === "informative"
                          ? "bg-brand-red text-white"
                          : "bg-brand-bg-off text-brand-gray border border-brand-border hover:bg-white"
                      }`}
                    >
                      Informative
                    </button>
                    <button
                      onClick={() => setPriorType("vague")}
                      className={`py-2 px-2 text-center text-[9px] font-mono tracking-wider uppercase transition-all duration-300 ${
                        priorType === "vague"
                          ? "bg-brand-red text-white"
                          : "bg-brand-bg-off text-brand-gray border border-brand-border hover:bg-white"
                      }`}
                    >
                      Flat Vague
                    </button>
                  </div>
                  <span className="block font-mono text-[8px] text-brand-gray mt-1.5 select-text">
                    {priorType === "informative" ? "Un prior condensé selon nos observations de 2024" : "Un prior plat normal de variance élevée (vague)"}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-brand-gray">
                      Nombre de Captures Réelles de Terrain (n)
                    </label>
                    <span className="font-mono text-[9px] text-brand-red font-semibold">
                      {sampleSize} Pièges activement analysés
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-[#E5E5E5] rounded-none appearance-none cursor-pointer accent-[#A63A2B]"
                  />
                  <div className="flex justify-between font-mono text-[8px] text-[#A1A1AA] mt-1">
                    <span>n = 20 (Modèle incertain)</span>
                    <span className="italic font-serif text-brand-gray relative -top-0.5">Plus la taille de l'échantillon 'n' augmente, plus le Posterior converge sur les données de terrain</span>
                    <span>n = 1000 (Haute précision)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Ordered Variables Lookbook List */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#666666] block">
                Annuaire des Paramètres estimables // v.01
              </span>
              
              {/* Ordered Lookbook Menu */}
              <div className="flex flex-col border-t border-brand-border">
                {initialParameters.map((param, i) => (
                  <button
                    key={param.symbol}
                    onClick={() => setSelectedParam(param)}
                    className={`py-4 px-2 border-b border-brand-border flex items-center justify-between text-left group transition-all duration-300 ${
                      selectedParam.symbol === param.symbol
                        ? "bg-[#FAF9F6] pl-6 border-l-2 border-r-0 border-brand-red"
                        : "bg-transparent hover:bg-[#FAF9F6]/40"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs text-[#9E9E9E] group-hover:text-brand-red transition-colors">
                        0{i + 1}/
                      </span>
                      <span className="font-serif text-sm text-[#1A1A1A] font-medium transition-transform group-hover:translate-x-1 duration-300">
                        {param.name.split(" (")[0]}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-[#9E9E9E]">
                      <span
                        className="font-serif text-lg text-brand-dark italic"
                        dangerouslySetInnerHTML={{
                          __html: param.symbol
                            .replace("\\beta_", "&beta;<sub>")
                            .replace("\\rho", "&rho;")
                            .replace("\\gamma", "&gamma;") + (param.symbol.includes("\\beta_") ? "</sub>" : "")
                        }}
                      />
                      <span className="font-mono text-xs text-brand-red">{param.value}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected variable metadata lookbook card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedParam.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FAF9F6] p-5 border border-brand-border mt-4"
                >
                  <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-brand-border/60">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-red">
                      {selectedParam.name}
                    </span>
                    <span className="font-serif italic font-semibold text-sm">
                      {selectedParam.symbol}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-brand-gray leading-relaxed mb-4">
                    {selectedParam.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="block font-mono text-[8px] uppercase text-[#9E9E9E]">
                        Prior assignée :
                      </span>
                      <span className="font-mono text-xs text-brand-dark mt-0.5 block">
                        {selectedParam.prior}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] uppercase text-[#9E9E9E]">
                        Posterior Mean :
                      </span>
                      <span className="font-mono text-xs text-brand-red mt-0.5 block font-bold">
                        {posteriorMean} [SD: {posteriorSD}]
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro scientific cite summary */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 flex items-start space-x-3 text-[10px] text-brand-gray leading-relaxed select-text">
              <Info size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
              <span>
                Le calcul des hyper-prior &sigma;<span className="text-[7px] align-sub">Spatial</span> repose sur la matrice de connectivité des limites frontalières françaises de l’IGN. Les simulations d’échantillons sont actualisées via échantillonneur de Gibbs.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
