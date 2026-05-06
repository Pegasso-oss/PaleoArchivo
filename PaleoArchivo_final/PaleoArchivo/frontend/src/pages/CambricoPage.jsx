// src/pages/CambricoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/cambrico';
import PeriodPage from './PeriodPage';

const CambricoPage = () => (
  <PeriodPage data={dinosaurios} title="Cámbricos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default CambricoPage;
