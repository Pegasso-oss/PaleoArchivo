// src/pages/CarboniferoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/carbonifero';
import PeriodPage from './PeriodPage';

const CarboniferoPage = () => (
  <PeriodPage data={dinosaurios} title="Carboníferos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default CarboniferoPage;
