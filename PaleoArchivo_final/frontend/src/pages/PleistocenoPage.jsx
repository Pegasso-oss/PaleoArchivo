// src/pages/PleistocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/pleistoceno';
import PeriodPage from './PeriodPage';

const PleistocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Pleistocenos" accentColor="text-sky-400" accentHex="#38bdf8" />
);
export default PleistocenoPage;
