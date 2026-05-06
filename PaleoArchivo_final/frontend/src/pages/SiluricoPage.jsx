// src/pages/SiluricoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/silurico';
import PeriodPage from './PeriodPage';

const SiluricoPage = () => (
  <PeriodPage data={dinosaurios} title="Silúricos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default SiluricoPage;
