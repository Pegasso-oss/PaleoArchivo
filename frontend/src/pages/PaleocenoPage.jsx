// src/pages/PaleocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/paleoceno';
import PeriodPage from './PeriodPage';

const PaleocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Paleoceno" accentColor="text-emerald-500" accentHex="#10b981" />
);
export default PaleocenoPage;
