/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MosquitoRecord, ModelParameter, SimulationResult, SpatialGridNode } from "./types";

export const initialParameters: ModelParameter[] = [
  {
    name: "Intercept (Baseline density)",
    symbol: "\\beta_0",
    description: "The baseline log-density index of Aedes albopictus in optimal conditions.",
    value: 1.24,
    prior: "Normal(\\mu = 0, \\sigma^2 = 10)",
    mean: 1.24,
    variance: 0.15,
  },
  {
    name: "Temperature Effect Coefficient",
    symbol: "\\beta_1",
    description: "Influence of mean seasonal temperature on egg development rate and adult survival.",
    value: 0.78,
    prior: "Normal(\\mu = 0.5, \\sigma^2 = 1.5)",
    mean: 0.78,
    variance: 0.08,
  },
  {
    name: "Precipitation Effect Coefficient",
    symbol: "\\beta_2",
    description: "Influence of cumulative rainfall on breeding habitat availability.",
    value: 0.32,
    prior: "Normal(\\mu = 0.2, \\sigma^2 = 1.0)",
    mean: 0.32,
    variance: 0.04,
  },
  {
    name: "Urbanization Index Coefficient",
    symbol: "\\beta_3",
    description: "The urban density effect, facilitating artificial reservoir breeding.",
    value: 0.53,
    prior: "Normal(\\mu = 0.4, \\sigma^2 = 2.0)",
    mean: 0.53,
    variance: 0.11,
  },
  {
    name: "Spatial Autoregressive Parameter",
    symbol: "\\rho",
    description: "Leroux CAR spatial structure weight, driving spatial correlation in neighborhood nodes.",
    value: 0.85,
    prior: "Beta(\\alpha = 2, \\beta = 2)",
    mean: 0.85,
    variance: 0.05,
  },
  {
    name: "Temporal Autoregressive Parameter",
    symbol: "\\gamma",
    description: "AR(1) temporal coefficient modeling continuity from the previous month's breeding.",
    value: 0.64,
    prior: "Beta(\\alpha = 1.5, \\beta = 1.5)",
    mean: 0.64,
    variance: 0.06,
  }
];

export const frenchRegionsData: MosquitoRecord[] = [
  {
    id: "paca",
    department: "Alpes-Maritimes",
    region: "Provence-Alpes-Côte d'Azur",
    density: 84,
    predictedLower: 78,
    predictedUpper: 90,
    covariates: { temperature: 24.5, precipitation: 45, urbanization: 82 }
  },
  {
    id: "occitanie",
    department: "Hérault",
    region: "Occitanie",
    density: 76,
    predictedLower: 71,
    predictedUpper: 82,
    covariates: { temperature: 25.1, precipitation: 38, urbanization: 64 }
  },
  {
    id: "rhone",
    department: "Rhône",
    region: "Auvergne-Rhône-Alpes",
    density: 59,
    predictedLower: 52,
    predictedUpper: 65,
    covariates: { temperature: 22.8, precipitation: 75, urbanization: 88 }
  },
  {
    id: "gironde",
    department: "Gironde",
    region: "Nouvelle-Aquitaine",
    density: 68,
    predictedLower: 62,
    predictedUpper: 74,
    covariates: { temperature: 21.9, precipitation: 68, urbanization: 58 }
  },
  {
    id: "idf",
    department: "Paris",
    region: "Île-de-France",
    density: 42,
    predictedLower: 35,
    predictedUpper: 49,
    covariates: { temperature: 21.2, precipitation: 55, urbanization: 98 }
  },
  {
    id: "corse",
    department: "Corse-du-Sud",
    region: "Corse",
    density: 91,
    predictedLower: 85,
    predictedUpper: 96,
    covariates: { temperature: 26.2, precipitation: 28, urbanization: 35 }
  },
  {
    id: "alsace",
    department: "Bas-Rhin",
    region: "Grand Est",
    density: 35,
    predictedLower: 29,
    predictedUpper: 41,
    covariates: { temperature: 19.8, precipitation: 62, urbanization: 71 }
  }
];

export const timeSeriesData: SimulationResult[] = [
  { year: 2026, month: "Mai", predictedDensity: 12, observedDensity: 10, confidenceLower: 8, confidenceUpper: 16 },
  { year: 2026, month: "Juin", predictedDensity: 28, observedDensity: 31, confidenceLower: 22, confidenceUpper: 34 },
  { year: 2026, month: "Juillet", predictedDensity: 58, observedDensity: 55, confidenceLower: 49, confidenceUpper: 67 },
  { year: 2026, month: "Août", predictedDensity: 82, observedDensity: 86, confidenceLower: 73, confidenceUpper: 91 },
  { year: 2026, month: "Septembre", predictedDensity: 74, observedDensity: 70, confidenceLower: 65, confidenceUpper: 83 },
  { year: 2026, month: "Octobre", predictedDensity: 38, observedDensity: 40, confidenceLower: 31, confidenceUpper: 45 },
  { year: 2026, month: "Novembre", predictedDensity: 15, observedDensity: 12, confidenceLower: 9, confidenceUpper: 21 }
];

export const initialSpatialGrid: SpatialGridNode[] = [
  { x: 1, y: 1, density: 45, randomEffect: 0.12, label: "Nord-Ouest (Côtier)" },
  { x: 1, y: 2, density: 60, randomEffect: 0.35, label: "Nord (Vallée 1)" },
  { x: 1, y: 3, density: 85, randomEffect: 0.62, label: "Nord-Est (Foyer Initial)" },
  { x: 2, y: 1, density: 30, randomEffect: -0.15, label: "Ouest (Colline)" },
  { x: 2, y: 2, density: 50, randomEffect: 0.08, label: "Centre (Urbain principal)" },
  { x: 2, y: 3, density: 75, randomEffect: 0.44, label: "Est (Plaine 1)" },
  { x: 3, y: 1, density: 25, randomEffect: -0.28, label: "Sud-Ouest (Montagne)" },
  { x: 3, y: 2, density: 40, randomEffect: -0.05, label: "Sud (Bassin)" },
  { x: 3, y: 3, density: 65, randomEffect: 0.21, label: "Sud-Est (Plaine 2)" }
];
