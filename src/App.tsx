/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Contexte from "./components/Contexte";
import Architecture from "./components/Architecture";
import Visualisation from "./components/Visualisation";
import Footer from "./components/Footer";

export default function App() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-red-light selection:text-brand-red flex flex-col font-sans relative">
      {/* 1. Header (Floating Navigation) */}
      <Header />

      {/* 2. Hero Section (100vh) */}
      <Hero />

      {/* 3. Section 1: Le Contexte (Biological context & Anatomy vector diagram) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeInUpVariants}
      >
        <Contexte />
      </motion.div>

      {/* 4. Section 2: L'Architecture du Modèle (Posterior distribution / updating Bayes simulator) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeInUpVariants}
      >
        <Architecture />
      </motion.div>

      {/* 5. Section 3: Visualisation des Données (Spatial Leroux CAR Grid and Climate Overlay simulator) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeInUpVariants}
      >
        <Visualisation />
      </motion.div>

      {/* 6. Footer (Research context, bibliographical citation lists, code sources) */}
      <Footer />
    </div>
  );
}
