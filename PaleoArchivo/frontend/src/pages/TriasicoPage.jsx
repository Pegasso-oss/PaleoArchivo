// src/pages/TriasicoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/triasico';
import PeriodPage from './PeriodPage';

const TriasicoPage = () => (
  <PeriodPage data={dinosaurios} title="Triásicos" accentColor="text-amber-600" accentHex="#d97706" />
);
export default TriasicoPage;
