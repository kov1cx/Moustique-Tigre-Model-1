/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Thermometer, ShieldAlert, Navigation } from "lucide-react";

interface AnatomyPart {
  id: string;
  name: string;
  translation: string;
  description: string;
  markerX: string;
  markerY: string;
}

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: "thorax",
    name: "Ligne Blanche Thoracique",
    translation: "Thorax Line",
    description: "La ligne médiane longitudinale d'écailles blanches argentées sur le thorax noir est la signature absolue d'Aedes albopictus. Elle le distingue de toutes les autres espèces de culicidés.",
    markerX: "50%",
    markerY: "48%"
  },
  {
    id: "patte",
    name: "Pattes Zébrées",
    translation: "Zebra-striped tarsi",
    description: "Les anneaux alternés d'écailles blanches et noires sur les pattes arrière sont des structures d'adaptation. Ils jouent un rôle clé dans la perturbation de l'autofocus visuel des prédateurs diurnes.",
    markerX: "62%",
    markerY: "65%"
  },
  {
    id: "ailes",
    name: "Ailes Monochromatiques",
    translation: "Wings",
    description: "Ailes sombres et uniformes, adaptées à des vols de courte distance mais hautement fréquents. La dispersion active s'étend sur 50 à 100 mètres; au-delà, la propagation s'effectue de manière anthropique (transport routier).",
    markerX: "32%",
    markerY: "35%"
  },
  {
    id: "stinger",
    name: "Proboscis Pathogène",
    translation: "Stinger / Proboscis",
    description: "L'appareil piqueur maxillaire femelle transmet instantanément l'ARN viral du virus de la Dengue, du Chikungunya et de Zika lors du repas de sang nécessaire à sa ponte.",
    markerX: "48%",
    markerY: "78%"
  }
];

export default function Contexte() {
  const [activePart, setActivePart] = useState<AnatomyPart>(ANATOMY_PARTS[0]);

  return (
    <section id="contexte" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-brand-border px-6 sm:px-12 relative overflow-hidden select-text">
      {/* Editorial side identifier */}
      <div className="absolute left-12 top-12 font-mono text-[10px] tracking-widest text-brand-gray hidden lg:block">
        [INDEX.01] // LE CONTEXTE
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Editorial Text (7 columns in lg size) */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-brand-red uppercase block mb-4">
                01. L'expansion d'un Vecteur Épidémiologique
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark tracking-tight font-light leading-tight mb-8">
                L’invasion spatiale accélérée d’Aedes albopictus en Europe tempérée.
              </h2>
              
              <p className="font-serif italic text-lg text-brand-gray leading-relaxed mb-6">
                Originaire des forêts tropicales d'Asie du Sud-Est, le moustique tigre colonise le continent européen à un rythme alarmant. Sa tolérance de survie écologique dépasse désormais les anciens modèles classiques de prévision d'habitat.
              </p>
              
              <p className="font-sans text-sm text-brand-gray leading-relaxed mb-8">
                Sous l’effet conjugué du réchauffement global, de l'essor du commerce international des pneumatiques usagés et de l'urbanisation frénétique, cette espèce s'est solidement implantée en France métropolitaine. En moins de deux décennies, plus de 70 départements ont été déclarés colonisés et placés en état de haute vigilance. Ce bouleversement écologique dresse un sérieux défi face aux enjeux de la santé publique, rendant la prédiction de la densité de population d'Aedes albopictus hautement névralgique pour orchestrer des opérations de lutte concertée.
              </p>
            </div>

            {/* Grid of Micro-KPIs / Historical figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-b border-brand-border/60">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray block">
                  Introduction en France
                </span>
                <span className="font-serif text-3xl text-brand-dark tracking-tight font-light">
                  2004
                </span>
                <p className="font-sans text-xs text-brand-gray">
                  Premier signalement d'établissement à Menton.
                </p>
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-brand-border/60 pt-6 sm:pt-0 sm:pl-6">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray block">
                  Température Seuil
                </span>
                <span className="font-serif text-3xl text-brand-dark tracking-tight font-light flex items-baseline">
                  11.5 <span className="text-sm font-sans ml-1 text-brand-red">°C</span>
                </span>
                <p className="font-sans text-xs text-brand-gray">
                  Température minimale de survie des adultes.
                </p>
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-brand-border/60 pt-6 sm:pt-0 sm:pl-6">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray block">
                  Taux de Diapause
                </span>
                <span className="font-serif text-3xl text-brand-dark tracking-tight font-light">
                  92%
                </span>
                <p className="font-sans text-xs text-brand-gray">
                  Capacité d’adaptation hivernale des œufs pondus en automne.
                </p>
              </div>
            </div>

            {/* Asymmetrical bullet items with clean icon borders */}
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] tracking-widest uppercase text-brand-dark">
                Pourquoi la modélisation statistique classique échoue ?
              </h3>
              
              <div className="flex gap-4 items-start">
                <div className="p-2 border border-brand-red/20 bg-white text-brand-red">
                  <Thermometer size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-brand-dark font-medium mb-1">Non-linéarité thermique</h4>
                  <p className="font-sans text-xs text-brand-gray max-w-xl leading-relaxed">
                    Le cycle larvaire ne suit pas une simple régression linéaire : il s'accélère brutalement entre 22°C et 28°C avant de chuter au-delà de 34°C.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 border border-brand-red/20 bg-white text-brand-red">
                  <Navigation size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-brand-dark font-medium mb-1">Effets de voisinage spatial (Autocorrélation)</h4>
                  <p className="font-sans text-xs text-brand-gray max-w-xl leading-relaxed">
                    La présence du vecteur dans un département augmente de 3.4 fois la probabilité d'une invasion directe dans les départements limitrophes, indépendamment du climat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 border border-brand-red/20 bg-white text-brand-red">
                  <ShieldAlert size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-brand-dark font-medium mb-1">Fluctuations de détection spatio-temporelle</h4>
                  <p className="font-sans text-xs text-brand-gray max-w-xl leading-relaxed">
                    Les données de surveillance issues des pièges pondoirs contiennent un taux élevé de zéros d'observation (Zéro-Inflation), camouflant le front d'onde épidémique sous-jacent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Handcrafted Scientific Vector & Tabs (5 columns in lg size) */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-32">
            
            {/* Interactive Morphological Diagram Card */}
            <div className="bg-white border border-brand-border p-6 shadow-sm flex flex-col">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-brand-gray mb-4">
                Planche Anatomique & Épidémiologique v.01 [Interpolar]
              </span>
              
              {/* Scientific Vector Representation of the vector */}
              <div className="relative bg-brand-bg-off aspect-square border border-brand-border/40 flex items-center justify-center overflow-hidden group mb-6">
                
                {/* SVG Mosquito Art with vector guidelines */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-10/12 h-10/12 select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle target grid circles in graphic background */}
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="#E5E5E5" strokeWidth="0.5" />
                  
                  {/* Grid diagonal crosshairs */}
                  <line x1="20" y1="20" x2="180" y2="180" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="180" y1="20" x2="20" y2="180" stroke="#E5E5E5" strokeWidth="0.5" strokeDasharray="2 2" />

                  {/* Left Antennas / Proboscis */}
                  <path d="M100,105 C95,120 90,135 96,155" fill="none" stroke="#121212" strokeWidth="1" strokeLinecap="round" />
                  <path d="M100,105 C105,120 110,135 104,155" fill="none" stroke="#121212" strokeWidth="1" strokeLinecap="round" />
                  {/* Needle Stinger */}
                  <line x1="100" y1="105" x2="100" y2="165" stroke={activePart.id === 'stinger' ? '#A63A2B' : '#121212'} strokeWidth="1.5" strokeLinecap="round" />

                  {/* Wings Left (Abstract polygon lines) */}
                  <path
                    d="M93,92 C60,80 30,75 55,60 C75,50 90,75 95,85 Z"
                    fill={activePart.id === "ailes" ? "#A63A2B20" : "none"}
                    stroke={activePart.id === "ailes" ? "#A63A2B" : "#121212"}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* Wings Right */}
                  <path
                    d="M107,92 C140,80 170,75 145,60 C125,50 110,75 105,85 Z"
                    fill={activePart.id === "ailes" ? "#A63A2B20" : "none"}
                    stroke={activePart.id === "ailes" ? "#A63A2B" : "#121212"}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />

                  {/* Thorax Center Body */}
                  <ellipse cx="100" cy="95" rx="8" ry="12" fill={activePart.id === 'thorax' ? '#A63A2B10' : 'none'} stroke="#121212" strokeWidth="1.5" />
                  {/* Iconic Thorax white strip signature */}
                  <line
                    x1="100"
                    y1="83"
                    x2="100"
                    y2="107"
                    stroke={activePart.id === "thorax" ? "#A63A2B" : "#121212"}
                    strokeWidth={activePart.id === "thorax" ? "3" : "1.5"}
                    strokeLinecap="round"
                  />

                  {/* Back legs Left (with striped notches) */}
                  <path d="M92,98 Q70,95 45,115 T20,150" fill="none" stroke="#121212" strokeWidth="1.2" strokeLinecap="round" />
                  
                  {/* Back legs Right (with zebra highlight tabs) */}
                  <path
                    d="M108,98 Q130,95 155,115 T180,150"
                    fill="none"
                    stroke={activePart.id === "patte" ? "#A63A2B" : "#121212"}
                    strokeWidth={activePart.id === "patte" ? "2" : "1.2"}
                    strokeLinecap="round"
                  />
                  {/* Zebra strip tick marks on leg */}
                  <circle cx="120" cy="100" r="2.5" fill="#A63A2B" stroke="#FFFFFF" strokeWidth="0.5" />
                  <circle cx="138" cy="106" r="2.5" fill="#121212" stroke="#FFFFFF" strokeWidth="0.5" />
                  <circle cx="153" cy="114" r="2.5" fill="#A63A2B" stroke="#FFFFFF" strokeWidth="0.5" />
                  <circle cx="166" cy="128" r="2.5" fill="#121212" stroke="#FFFFFF" strokeWidth="0.5" />
                  <circle cx="178" cy="146" r="2.5" fill="#A63A2B" stroke="#FFFFFF" strokeWidth="0.5" />

                  {/* Head */}
                  <circle cx="100" cy="107" r="4.5" fill="#121212" />
                  {/* Fine red eyes */}
                  <circle cx="98.5" cy="108.5" r="1" fill="#A63A2B" />
                  <circle cx="101.5" cy="108.5" r="1" fill="#A63A2B" />
                </svg>

                {/* Animated interactive anatomical overlays target points with pulses */}
                {ANATOMY_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setActivePart(part)}
                    className="absolute cursor-pointer group/btn"
                    style={{ left: part.markerX, top: part.markerY }}
                    aria-label={`Highlight ${part.name}`}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePart.id === part.id ? 'bg-brand-red' : 'bg-brand-dark'}`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${activePart.id === part.id ? 'bg-brand-red scale-125' : 'bg-brand-dark'} transition-all duration-300`}></span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Anatomy detail readout */}
              <div className="border-t border-brand-border/60 pt-4 flex flex-col">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-serif text-sm font-semibold text-brand-dark">
                    {activePart.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray">
                    {activePart.translation}
                  </span>
                </div>
                <p className="font-sans text-xs text-brand-gray leading-relaxed h-[85px] overflow-y-auto">
                  {activePart.description}
                </p>
              </div>

              {/* Selector Lookbook list */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {ANATOMY_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setActivePart(part)}
                    className={`px-3 py-2 text-left font-mono text-[9px] tracking-wide uppercase transition-all duration-300 ${
                      activePart.id === part.id
                        ? "bg-brand-red text-white border-brand-red"
                        : "bg-brand-bg-off hover:bg-white text-brand-gray border border-brand-border"
                    }`}
                  >
                    {part.id === "thorax" ? "01. Thorax" : part.id === "patte" ? "02. Pattes" : part.id === "ailes" ? "03. Ailes" : "04. Proboscis"}
                  </button>
                ))}
              </div>
            </div>

            {/* Note under diagram - science excerpt */}
            <div className="p-4 bg-[#FFFFFF] border-l-2 border-brand-red flex flex-col space-y-1">
              <span className="font-mono text-[8px] uppercase tracking-wider text-brand-red font-medium">Source Épidémiologique :</span>
              <p className="font-serif italic text-xs text-brand-gray leading-relaxed">
                "La transmission vectorielle est conditionnée par l'intervalle d'incubation extrinsèque (EIP) du virus, qui se contracte significativement lors de températures caniculaires durables."
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
