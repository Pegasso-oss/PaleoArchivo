// src/pages/EocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/eoceno';
import PeriodPage from './PeriodPage';

const EocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Eocenos" accentColor="text-teal-500" accentHex="#14b8a6" />
);
export default EocenoPage;
