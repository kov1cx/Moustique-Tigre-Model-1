/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, FileText, ArrowUp, Mail, Landmark, Compass } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="references" className="bg-white border-t border-brand-border py-20 px-6 sm:px-12 relative overflow-hidden select-text">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-brand-border/60">
          
          {/* Logo brand / Title */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A63A2B] block">
                [FINISHEE • RAPPORT 2026]
              </span>
              <h3 className="font-serif text-3xl font-light text-brand-dark tracking-tight leading-tight">
                Moustique Tigre
              </h3>
              <p className="font-serif italic text-sm text-[#757575] max-w-sm leading-relaxed">
                Modélisation hiérarchique bayésienne pour le contrôle, la surveillance et l'alerte épidémiologique d'Aedes albopictus.
              </p>
            </div>

            <div className="pt-8 lg:pt-0">
              <span className="block font-mono text-[8px] uppercase tracking-wider text-[#A1A1AA] mb-1">
                Affiliation du Projet
              </span>
              <div className="flex items-center space-x-2 text-brand-dark font-mono text-[10px] uppercase">
                <Landmark size={12} className="text-brand-red" />
                <span>Institut National de Biostatistiques & Éco-Épidémiologie</span>
              </div>
            </div>
          </div>

          {/* Core References List */}
          <div className="lg:col-span-5 space-y-6">
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#666666]">
              Publications & Références Scientifiques
            </span>

            <div className="space-y-6 text-xs text-brand-gray">
              <div className="pb-4 border-b border-brand-border/40">
                <span className="font-mono text-[8px] text-brand-red block mb-1">[01] // CANCEL & AL. (2024)</span>
                <p className="font-serif italic text-brand-dark font-medium mb-1">"Hierarchical Bayesian Models for Spatio-temporal Mosquito Dynamics: A Leroux CAR Approach."</p>
                <p className="font-sans text-[11px] text-brand-gray">Journal of Applied Biostatistics, Vol. 48(3), pp. 112–129.</p>
              </div>

              <div className="pb-4 border-b border-brand-border/40">
                <span className="font-mono text-[8px] text-brand-red block mb-1">[02] // ROCHETTE, P. (2025)</span>
                <p className="font-serif italic text-brand-dark font-medium mb-1">"Aedes albopictus proliferation under localized climate shifts in metropolitan France."</p>
                <p className="font-sans text-[11px] text-brand-gray">The Lancet Planetary Health, 9(2), e74-e83.</p>
              </div>

              <div>
                <span className="font-mono text-[8px] text-brand-red block mb-1">[03] // AGENCE NATIONALE DE SANTÉ PUBLIQUE (2026)</span>
                <p className="font-serif italic text-brand-dark font-medium mb-1">"Rapport de biosurveillance territoriale du moustique tigre et risques de foyers arboviroyaux."</p>
                <p className="font-sans text-[11px] text-brand-gray">Bulletin épidémiologique hebdomadaire (BEH), N° 12-13.</p>
              </div>
            </div>
          </div>

          {/* Authors and Links */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8 lg:space-y-0">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#666666] mb-4">
                Membres de l'Équipe
              </span>
              <ul className="space-y-3 font-serif text-sm text-brand-dark font-light">
                <li>
                  <span className="block font-semibold">Dr. Marc-Antoine Vaniée</span>
                  <span className="block font-mono text-[8px] uppercase text-brand-gray mt-0.5">Analyste principal • ENS Lyon</span>
                </li>
                <li>
                  <span className="block font-semibold">Prof. Élise Labarthe</span>
                  <span className="block font-mono text-[8px] uppercase text-brand-gray mt-0.5">Directrice de recherche • INRAE Montpellier</span>
                </li>
                <li>
                  <span className="block font-semibold">Julien Sorel</span>
                  <span className="block font-mono text-[8px] uppercase text-brand-gray mt-0.5">Architecte des Données • Sorbonne Université</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="block font-mono text-[8px] uppercase tracking-wider text-[#A1A1AA]">
                Ressources du Projet
              </span>
              <div className="flex flex-col space-y-2 text-xs font-mono text-[#1a1a1a]">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-red flex items-center space-x-2 transition-colors duration-300"
                >
                  <Github size={14} className="text-brand-red" />
                  <span>Dépôt GitHub (Code source R/STAN)</span>
                </a>
                <a
                  href="#"
                  className="hover:text-brand-red flex items-center space-x-2 transition-colors duration-300"
                >
                  <FileText size={14} className="text-brand-red" />
                  <span>Fichiers de Données Primaires (CSV)</span>
                </a>
                <a
                  href="mailto:contact@biostat-aedes.fr"
                  className="hover:text-brand-red flex items-center space-x-2 transition-colors duration-300"
                >
                  <Mail size={14} className="text-brand-red" />
                  <span>contact@biostat-aedes.fr</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Outer bottom footnote & Scroll back to top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-brand-gray font-mono text-[9px] tracking-wider">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-0 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Université de Lyon • INRAE • Labo de Biostatistique</span>
            <span className="hidden sm:inline">•</span>
            <span>Distribué sous Licence Apache 2.0</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 hover:text-[#A63A2B] transition-colors duration-300 group focus:outline-none"
          >
            <span className="uppercase tracking-[0.2em] text-[8.5px]">Retourner en haut</span>
            <ArrowUp
              size={12}
              className="group-hover:-translate-y-1 transition-transform duration-300 text-brand-red"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
