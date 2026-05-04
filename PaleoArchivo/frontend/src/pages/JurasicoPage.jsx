// src/pages/JurasicoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/jurasico';
import PeriodPage from './PeriodPage';

const JurasicoPage = () => (
  <PeriodPage data={dinosaurios} title="Jurásicos" accentColor="text-amber-600" accentHex="#d97706" />
);
export default JurasicoPage;
