/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { frenchRegionsData, timeSeriesData, initialSpatialGrid } from "../data";
import { MosquitoRecord, SimulationResult } from "../types";
import { Sliders, Sun, CloudRain, Map, AlertTriangle, HelpCircle, Activity } from "lucide-react";

export default function Visualisation() {
  // Spatial Component States
  const [rho, setRho] = useState<number>(0.85); // leroux spatial correlation weight
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Time-series Scenario State
  const [activeScenario, setActiveScenario] = useState<"standard" | "heatwave" | "humid_autumn">("standard");
  const [hoveredMonth, setHoveredMonth] = useState<SimulationResult | null>(null);

  // Region highlight states
  const [selectedRegion, setSelectedRegion] = useState<MosquitoRecord>(frenchRegionsData[0]);

  // Dynamic calcul of spatial correlation.
  // When rho goes to 0, random effects are highly independent.
  // When rho goes to 1, random effects smooth towards their spatial neighbors.
  const getSpatialDensity = (nodeIdx: number, baseDensity: number, neighborsAvg: number) => {
    // Spatial Leroux equation: u_s = rho * neighbor_avg + (1-rho) * independent_unstructured_noise
    const smoothed = rho * neighborsAvg + (1 - rho) * baseDensity;
    return Math.round(Math.max(5, Math.min(100, smoothed)));
  };

  // Precalculated neighbors lists for our 3x3 grid:
  // Node 0 (0,0) (Nord-Ouest): Neighbors represent North, West (nodes 1, 3). Grid idx: 0
  // Node 1 (0,1) (Nord): Neighbors represent 0, 2, 4
  // Node 2 (0,2) (Nord-Est)
  // Node 3 (1,0) (Ouest)
  // Node 4 (1,1) (Centre)
  // Node 5 (1,2) (Est)
  // Node 6 (2,0) (Sud-Ouest)
  // Node 7 (2,1) (Sud)
  // Node 8 (2,2) (Sud-Est)
  const spatialNodes = [
    { id: "nw", label: "Zone Nord-Ouest (Côtier)", base: 45, neighborsAvg: 55, randomEffect: 0.15 },
    { id: "n", label: "Zone Nord (Vallée)", base: 58, neighborsAvg: 70, randomEffect: 0.38 },
    { id: "ne", label: "Zone Nord-Est (Foyer Initial)", base: 82, neighborsAvg: 75, randomEffect: 0.65 },
    { id: "w", label: "Zone Ouest (Colline)", base: 35, neighborsAvg: 48, randomEffect: -0.12 },
    { id: "c", label: "Zone Centre (Urbain principal)", base: 62, neighborsAvg: 60, randomEffect: 0.05 },
    { id: "e", label: "Zone Est (Plaine 1)", base: 78, neighborsAvg: 65, randomEffect: 0.42 },
    { id: "sw", label: "Zone Sud-Ouest (Montagne)", base: 22, neighborsAvg: 38, randomEffect: -0.32 },
    { id: "s", label: "Zone Sud (Bassin)", base: 42, neighborsAvg: 45, randomEffect: -0.05 },
    { id: "se", label: "Zone Sud-Est (Plaine 2)", base: 68, neighborsAvg: 58, randomEffect: 0.18 },
  ];

  // Dynamic calculations for Seasonal scenario time-series
  const getScenarioData = (): SimulationResult[] => {
    return timeSeriesData.map((d) => {
      let multiplier = 1;

      if (activeScenario === "heatwave") {
        // Shorter early peak in July, drops earlier due to dry heat drying out pools
        if (d.month === "Mai") multiplier = 1.4;
        if (d.month === "Juin") multiplier = 1.9;
        if (d.month === "Juillet") multiplier = 1.5;
        if (d.month === "Août") multiplier = 0.9;
        if (d.month === "Septembre") multiplier = 0.6;
        if (d.month === "Octobre") multiplier = 0.4;
        if (d.month === "Novembre") multiplier = 0.3;
      } else if (activeScenario === "humid_autumn") {
        // Late wet heavy peak shift towards August and September/October
        if (d.month === "Mai") multiplier = 0.8;
        if (d.month === "Juin") multiplier = 0.9;
        if (d.month === "Juillet") multiplier = 1.1;
        if (d.month === "Août") multiplier = 1.25;
        if (d.month === "Septembre") multiplier = 1.45;
        if (d.month === "Octobre") multiplier = 1.6;
        if (d.month === "Novembre") multiplier = 1.3;
      } else {
        // Standard normal historical
        return d;
      }

      const predicted = Math.round(d.predictedDensity * multiplier);
      const observed = Math.round(d.observedDensity * multiplier);
      const confidenceLower = Math.max(3, Math.round(d.confidenceLower * multiplier * 0.9));
      const confidenceUpper = Math.round(d.confidenceUpper * multiplier * 1.1);

      return {
        ...d,
        predictedDensity: predicted,
        observedDensity: observed,
        confidenceLower,
        confidenceUpper,
      };
    });
  };

  const currentTimeline = getScenarioData();

  // Draw Time series path helper
  const drawTimeSeriesPath = (type: "predicted" | "observed" | "ci_upper" | "ci_lower") => {
    const widthUnit = 280 / (currentTimeline.length - 1);
    return currentTimeline.reduce((acc, d, idx) => {
      const val =
        type === "predicted"
          ? d.predictedDensity
          : type === "observed"
          ? d.observedDensity
          : type === "ci_upper"
          ? d.confidenceUpper
          : d.confidenceLower;

      // Map density range 0-140 to height range 20-130 (SVG coordinates reversed vertically)
      const x = 10 + idx * widthUnit;
      const y = 140 - (val / 140) * 110;

      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, "");
  };

  // Draw dynamic CI shroud as light SVG path polygon
  const drawCIShroudPath = () => {
    const widthUnit = 280 / (currentTimeline.length - 1);
    const upperPoints: string[] = [];
    const lowerPoints: string[] = [];

    currentTimeline.forEach((d, idx) => {
      const x = 10 + idx * widthUnit;
      const yUpper = 140 - (d.confidenceUpper / 140) * 110;
      const yLower = 140 - (d.confidenceLower / 140) * 110;
      upperPoints.push(`${x},${yUpper}`);
      lowerPoints.unshift(`${x},${yLower}`); // backward sequence for polygon wrap
    });

    return `M ${upperPoints.join(" L ")} L ${lowerPoints.join(" L ")} Z`;
  };

  return (
    <section id="visualisation" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-brand-border px-6 sm:px-12 relative overflow-hidden select-text">
      {/* Editorial side identifier */}
      <div className="absolute left-12 top-12 font-mono text-[10px] tracking-widest text-[#666666] hidden lg:block">
        [INDEX.03] // VISUALISATION
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 max-w-3xl">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-red uppercase block mb-4">
            03. Laboratoire de Simulation Interactive
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark tracking-tight font-light leading-tight mb-6">
            Explorer les prédictions spatiales et dynamiques thermiques.
          </h2>
          <p className="font-serif italic text-lg text-brand-gray leading-relaxed font-light">
            Manipulez les hyperparamètres de connectivité spatiale et observez l'anticipation temporelle selon les dérives climates. Un carnet de recherche interactif rédigé en données réelles.
          </p>
        </div>

        {/* 2 Interactive Visualizations Container (Side-by-side or stacked grid with thin borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start mt-8">
          
          {/* VISUALIZATION 1: SPATIAL GRID CAR LEROUX MODEL SIMULATOR (Thin Border border-brand-border) */}
          <div className="border border-brand-border bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-brand-gray block mb-4">
                Visualisation 1 // CAR-Leroux Spatial Connectivity Grid
              </span>
              <h3 className="font-serif text-md font-semibold text-brand-dark mb-4 pl-0.5 sm:mb-6">
                L'impact de la Corrélation de Voisinage (&rho;) sur les effets aléatoires
              </h3>
            </div>

            {/* Simulated 3x3 Grid of Nodes */}
            <div className="grid grid-cols-3 gap-3 aspect-square max-w-md mx-auto w-full border border-brand-border/40 p-4 bg-brand-bg-off mb-6 relative">
              {spatialNodes.map((node, idx) => {
                const density = getSpatialDensity(idx, node.base, node.neighborsAvg);
                
                // Color intensity mapped dynamically to density (using elegant brick-red hue)
                // We construct the background color dynamically
                const redOpacity = (density / 100) * 0.85; // cap to 0.85
                const isHovered = hoveredNode === node.id;

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`relative w-full h-full flex flex-col justify-between p-3 transition-all duration-300 select-none border group active:scale-[0.98] ${
                      isHovered
                        ? "border-brand-red shadow-md z-10 scale-102 bg-white"
                        : "border-brand-border bg-white"
                    }`}
                  >
                    {/* Small aesthetic coordinates label */}
                    <span className="font-mono text-[8px] text-brand-gray block">
                      Node_0{idx + 1} // [X:{Math.floor(idx/3)}, Y:{idx%3}]
                    </span>

                    {/* Color Shroud block */}
                    <div
                      className="absolute inset-1 opacity-20 pointer-events-none transition-all duration-300"
                      style={{
                        backgroundColor: `rgba(166, 58, 43, ${redOpacity})`,
                        borderRadius: "0px",
                      }}
                    />

                    {/* Node density numeric value */}
                    <div className="my-auto self-center text-center z-10">
                      <span className="font-serif text-3xl font-light text-brand-dark block">
                        {density}
                      </span>
                      <span className="font-mono text-[7px] text-brand-gray tracking-widest block uppercase">
                        Densité Est.
                      </span>
                    </div>

                    {/* Mini indicator representing sign of spatial effect */}
                    <div className="flex justify-between items-center w-full z-10">
                      <span className="font-mono text-[7px] text-[#A63A2B] font-semibold">
                        {node.randomEffect > 0 ? "Positif (+)" : "Neutre (0)"}
                      </span>
                      <span className="font-mono text-[7px] text-brand-gray">
                        W({idx})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slider controls block */}
            <div className="border-t border-brand-border/50 pt-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-brand-gray">
                    Paramètre d'Infiltration Spatiale (&rho;)
                  </label>
                  <span className="font-sans text-[11px] text-brand-gray mt-0.5">
                    {rho === 0
                      ? "Bruit spatial pur (Totalement indépendant / IID)"
                      : rho === 1
                      ? "Structure géostatistique parfaite (Lissage extrême)"
                      : `Corrélation Leroux mixte (&rho; = ${rho.toFixed(2)})`}
                  </span>
                </div>
                <span className="font-serif text-2xl text-brand-red tracking-tight font-light">
                  {rho.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={rho}
                onChange={(e) => setRho(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#E5E5E5] rounded-none appearance-none cursor-pointer accent-[#A63A2B] mb-2"
              />

              {/* Responsive legends table */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-left">
                  <span className="block font-mono text-[8px] uppercase text-brand-gray">
                    Effet sur les voisins :
                  </span>
                  <p className="font-sans text-xs text-brand-gray mt-1">
                    {rho < 0.3
                      ? "Aucune propagation par voisinage. Les conditions écologiques locales (température, eau) sont les uniques moteurs de l'établissement."
                      : "Lissage des observations extrêmes. Les clusters de muỗi se propagent de proche en proche par corridor biologique."}
                  </p>
                </div>
                <div className="text-left border-l border-brand-border/60 pl-4">
                  <span className="block font-mono text-[8px] uppercase text-brand-gray">
                    Informations n&oelig;ud inspecté :
                  </span>
                  {hoveredNode ? (
                    (() => {
                      const inspected = spatialNodes.find((n) => n.id === hoveredNode);
                      const dens = inspected ? getSpatialDensity(spatialNodes.indexOf(inspected), inspected.base, inspected.neighborsAvg) : 0;
                      return (
                        <div className="mt-1">
                          <span className="block font-serif text-xs text-brand-dark font-medium leading-none">
                            {inspected?.label}
                          </span>
                          <span className="block font-mono text-[8.5px] text-brand-red mt-1">
                            Density {dens} // SpatEff: {inspected?.randomEffect}
                          </span>
                        </div>
                      );
                    })()
                  ) : (
                    <span className="block font-sans italic text-xs text-brand-gray mt-1">
                      Survolez un nœud de la grille pour lire les biostatistiques latentes.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Custom caption beneath requested by user */}
            <div className="text-center font-mono text-[9px] text-brand-gray italic border-t border-brand-border/40 pt-4 mt-6">
              Fig. 3.1 — Simulation matricielle du lissage spatial CAR (Leroux Conditional Autoregressive) pour la prédiction d’Aedes v. France.
            </div>
          </div>

          {/* VISUALIZATION 2: SEASONAL TEMPERATURE PROPAGATION DYNAMICS (Thin Border border-brand-border) */}
          <div className="border border-brand-border bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#666666] block mb-4">
                Visualisation 2 // Modélisation Saisonnnière Temporelle
              </span>
              <h3 className="font-serif text-md font-semibold text-brand-dark mb-4 pl-0.5 sm:mb-6">
                Courbe prédictive selon dérives et variations climatiques
              </h3>
            </div>

            {/* Interactive Selector Tabs of Scenario */}
            <div className="flex border border-brand-border mb-6">
              <button
                onClick={() => setActiveScenario("standard")}
                className={`flex-1 py-2 px-2 text-center font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 border-r border-brand-border ${
                  activeScenario === "standard"
                    ? "bg-[#FAF9F6] text-brand-red font-bold"
                    : "bg-white hover:bg-brand-bg-off/50 text-[#666666]"
                }`}
              >
                <span>Climat Standard</span>
              </button>
              <button
                onClick={() => setActiveScenario("heatwave")}
                className={`flex-1 py-2 px-2 text-center font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 border-r border-brand-border ${
                  activeScenario === "heatwave"
                    ? "bg-[#FAF9F6] text-brand-red font-bold"
                    : "bg-white hover:bg-brand-bg-off/50 text-[#666666]"
                }`}
              >
                <Sun size={12} className="text-[#A63A2B]" />
                <span>Canicule Hâtive</span>
              </button>
              <button
                onClick={() => setActiveScenario("humid_autumn")}
                className={`flex-1 py-2 px-2 text-center font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  activeScenario === "humid_autumn"
                    ? "bg-[#FAF9F6] text-brand-red font-bold"
                    : "bg-white hover:bg-brand-bg-off/50 text-[#666666]"
                }`}
              >
                <CloudRain size={12} className="text-zinc-500" />
                <span>Automne Humide</span>
              </button>
            </div>

            {/* Custom Interactive SVG Line graph presenting populations dynamics */}
            <div className="relative border border-brand-border/40 p-4 bg-brand-bg-off aspect-[16/8] sm:aspect-[16/7] flex items-end mb-6 overflow-visible">
              
              {/* Vertical axis counts guides */}
              <div className="absolute top-2 right-4 text-right font-mono text-[8px] text-brand-gray space-y-3.5 pointer-events-none select-none">
                <div>Max density threshold [140]</div>
                <div>Avg peak limits [90]</div>
                <div>Low baseline values [10]</div>
              </div>

              {/* Hover Month Metadata Box */}
              <div className="absolute top-2 left-3 font-mono text-[9.5px] bg-white border border-brand-border px-2 py-0.5 shadow-sm">
                Scenario : {activeScenario === "standard" ? "Normal Climatique" : activeScenario === "heatwave" ? "Canicule Juin/Juillet" : "Automne chaud prolongé"}
              </div>

              <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible">
                {/* Horizontal grid guide lines */}
                <line x1="10" y1="30" x2="290" y2="30" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="10" y1="75" x2="290" y2="75" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="10" y1="120" x2="290" y2="120" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Shroud of Bayesian Credible Interval (95% CI) */}
                <path
                  d={drawCIShroudPath()}
                  fill="#A63A2B"
                  fillOpacity="0.07"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Lower Boundary Line (95% CI) */}
                <path
                  d={drawTimeSeriesPath("ci_lower")}
                  fill="none"
                  stroke="#A63A2B"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Upper Boundary Line (95% CI) */}
                <path
                  d={drawTimeSeriesPath("ci_upper")}
                  fill="none"
                  stroke="#A63A2B"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Observed points as discrete marks */}
                <path
                  d={drawTimeSeriesPath("observed")}
                  fill="none"
                  stroke="#121212"
                  strokeWidth="0.5"
                  strokeDasharray="1 3"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Predicted density line curve (brand-red) */}
                <path
                  d={drawTimeSeriesPath("predicted")}
                  fill="none"
                  stroke="#A63A2B"
                  strokeWidth="2"
                  className="transition-all duration-500 ease-in-out"
                />

                {/* Month nodes as interactive hover buttons within SVG coordinate framework */}
                {currentTimeline.map((item, idx) => {
                  const widthUnit = 280 / (currentTimeline.length - 1);
                  const x = 10 + idx * widthUnit;
                  const y = 140 - (item.predictedDensity / 140) * 110;
                  const yObs = 140 - (item.observedDensity / 140) * 110;

                  return (
                    <g key={item.month}>
                      {/* Observed circle node */}
                      <circle cx={x} cy={yObs} r="2.5" fill="#121212" />
                      
                      {/* Predicted circle node */}
                      <circle
                        cx={x}
                        cy={y}
                        r={hoveredMonth?.month === item.month ? "4.5" : "3"}
                        fill="#A63A2B"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredMonth(item)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      />

                      {/* Tick Marks for Horizontal Axis */}
                      <text x={x} y="146" textAnchor="middle" className="font-mono text-[8px] fill-brand-gray tracking-tighter">
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Readout of month stats */}
            <div className="bg-[#FAF9F6] p-4 border border-brand-border/60 min-h-[90px] flex flex-col justify-center">
              {hoveredMonth ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-mono text-[8px] uppercase text-brand-gray block">
                      Mois inspecté :
                    </span>
                    <span className="font-serif text-sm font-semibold text-brand-dark uppercase">
                      {hoveredMonth.month} 2026
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase text-brand-gray block">
                      Posterior Estimate :
                    </span>
                    <span className="font-serif text-sm text-brand-red font-semibold">
                      {hoveredMonth.predictedDensity} ind. <span className="text-[10px] text-brand-gray font-normal">(Obs: {hoveredMonth.observedDensity})</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase text-[#9E9E9E] block">
                      Bayes Credible 95% :
                    </span>
                    <span className="font-mono text-xs text-brand-dark block">
                      [{hoveredMonth.confidenceLower} — {hoveredMonth.confidenceUpper}]
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <span className="font-sans italic text-xs text-[#757575]">
                    Survolez les points rouges de la courbe pour afficher les estimations d'intervalles bayésiens ou observez le glissement des pics épidémiques.
                  </span>
                </div>
              )}
            </div>

            {/* Custom caption beneath requested by user */}
            <div className="text-center font-mono text-[9px] text-[#A1A1AA] italic border-t border-brand-border/40 pt-4 mt-6">
              Fig. 3.2 — Dynamique de population temporelle estimée d'Aedes albopictus. Climat Moyen standard vs. Alertes thermoclimatiques.
            </div>
          </div>

        </div>

        {/* Dynamic region cards lookbook below grids */}
        <div className="mt-16 bg-white border border-brand-border p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline border-b border-brand-border/60 pb-6 mb-6">
            <div className="mb-4 md:mb-0">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A63A2B] block">
                Registre Régional de Validation
              </span>
              <h4 className="font-serif text-lg font-medium text-brand-dark">
                Données d'observation et de prédiction par région française
              </h4>
            </div>
            <span className="font-mono text-[9px] text-brand-gray italic">
              Concordance de prédiction : Modèle Hiérarchique vs. Réseau Sentinelle de France
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {frenchRegionsData.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg)}
                className={`py-3 px-3 text-left border flex flex-col justify-between h-[105px] transition-all duration-300 ${
                  selectedRegion.id === reg.id
                    ? "border-brand-red bg-brand-red-light/40"
                    : "border-brand-border hover:bg-brand-bg-off"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-serif text-xs font-semibold text-brand-dark truncate">
                    {reg.department}
                  </span>
                  <span className="font-mono text-[7px] text-brand-gray uppercase truncate">
                    {reg.region.split("-").join(" ")}
                  </span>
                </div>

                <div className="flex justify-between items-baseline mt-4">
                  <span className="font-serif text-xl tracking-tight text-brand-dark font-light">
                    {reg.density}
                  </span>
                  <span className="font-mono text-[8px] text-brand-red font-medium">
                    IC: {reg.predictedLower}%
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Highlighted region detail summary board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 bg-[#FAF9F6] border border-brand-border/40 select-text">
            <div>
              <span className="font-mono text-[8.5px] uppercase text-[#666666] block mb-1">Département surveillé :</span>
              <span className="font-serif text-md font-semibold text-brand-dark">{selectedRegion.department}</span>
              <span className="block font-mono text-[9px] text-brand-gray uppercase mt-0.5">{selectedRegion.region}</span>
            </div>
            <div>
              <span className="font-mono text-[8.5px] uppercase text-[#666666] block mb-1">Indicateurs de covariates écologiques :</span>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div>
                  <span className="block font-mono text-[8px] text-brand-gray uppercase">T.Moyenne</span>
                  <span className="font-serif text-sm text-brand-dark font-medium">{selectedRegion.covariates.temperature}°C</span>
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-brand-gray uppercase">Pluie Cumul</span>
                  <span className="font-serif text-sm text-brand-dark font-medium">{selectedRegion.covariates.precipitation}mm</span>
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-brand-gray uppercase">Urbain Index</span>
                  <span className="font-serif text-sm text-brand-dark font-medium">{selectedRegion.covariates.urbanization}%</span>
                </div>
              </div>
            </div>
            <div className="md:border-l md:border-brand-border/60 md:pl-8">
              <span className="font-mono text-[8.5px] uppercase text-[#666666] block mb-1">Intervalle de crédibilité Bayesien (95%) :</span>
              <p className="font-serif text-xs text-brand-gray italic leading-relaxed">
                "La densité prédite pour le département <span className="font-semibold text-brand-dark not-italic">{selectedRegion.department}</span> oscille entre <span className="font-semibold text-brand-red font-mono not-italic">{selectedRegion.predictedLower}</span> et <span className="font-semibold text-brand-red font-mono not-italic">{selectedRegion.predictedUpper}</span> avec une probabilité a posteriori de 0.95. Les covariates locales s'insèrent parfaitement sous l'effet CAR."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
