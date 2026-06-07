/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BookOpen, Github, Globe, Menu, X, Landmark } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-brand-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Editorial Branding */}
        <div className="flex flex-col">
          <a href="#" className="font-serif text-lg tracking-tight hover:text-brand-red transition-colors duration-300">
            Aedes Bayésien
          </a>
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gray mt-0.5">
            Labo Biostatistique • 2026
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-xs tracking-widest uppercase font-mono text-brand-dark">
          <a
            href="#contexte"
            className="hover:text-brand-red transition-colors duration-300 relative group"
          >
            01/ Contexte
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-red transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#architecture"
            className="hover:text-brand-red transition-colors duration-300 relative group"
          >
            02/ Modèle
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-red transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#visualisation"
            className="hover:text-brand-red transition-colors duration-300 relative group"
          >
            03/ Visualisation
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-red transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Action icons */}
        <div className="hidden md:flex items-center space-x-6 text-brand-dark">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-red transition-colors duration-300 flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <Github size={14} />
            <span>Code</span>
          </a>
          <a
            href="#references"
            className="px-4 py-1.5 border border-brand-dark/20 hover:border-brand-red hover:text-brand-red text-[10px] uppercase font-mono tracking-widest transition-all duration-300 rounded-none bg-transparent"
          >
            Rapport PDF
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-dark hover:text-brand-red transition-colors duration-300 focus:outline-none"
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-brand-border py-8 px-8 flex flex-col space-y-6 md:hidden shadow-lg animate-fade-in">
          <a
            href="#contexte"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-lg text-brand-dark hover:text-brand-red transition-colors"
          >
            01. Le Contexte Biologique
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-lg text-brand-dark hover:text-brand-red transition-colors"
          >
            02. L'Architecture Bayesien
          </a>
          <a
            href="#visualisation"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-lg text-brand-dark hover:text-brand-red transition-colors"
          >
            03. Visualisation Interactive
          </a>

          <div className="pt-6 border-t border-brand-border flex items-center justify-between">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-xs font-mono uppercase text-brand-gray hover:text-brand-red"
            >
              <Github size={16} />
              <span>Dépôt GitHub</span>
            </a>
            <a
              href="#references"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 border border-brand-dark text-[10px] uppercase font-mono tracking-widest text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
            >
              BioRxiv Preprint
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
