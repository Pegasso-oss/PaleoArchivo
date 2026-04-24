// src/pages/MiocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/mioceno';
import PeriodPage from './PeriodPage';

const MiocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Miocenos" accentColor="text-lime-500" accentHex="#84cc16" />
);
export default MiocenoPage;
