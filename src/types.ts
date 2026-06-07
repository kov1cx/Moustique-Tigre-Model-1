/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MosquitoRecord {
  id: string;
  department: string;
  region: string;
  density: number; // observed or predicted density index
  predictedLower: number; // credible interval 95% low
  predictedUpper: number; // credible interval 95% high
  covariates: {
    temperature: number; // Celsius
    precipitation: number; // mm
    urbanization: number; // percentage
  };
}

export interface ModelParameter {
  name: string;
  symbol: string;
  description: string;
  value: number;
  prior: string;
  mean: number;
  variance: number;
}

export interface SimulationResult {
  year: number;
  month: string;
  predictedDensity: number;
  observedDensity: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface SpatialGridNode {
  x: number;
  y: number;
  density: number;
  randomEffect: number;
  label: string;
}
