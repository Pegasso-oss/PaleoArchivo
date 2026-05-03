// src/pages/PermicoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/permico';
import PeriodPage from './PeriodPage';

const PermicoPage = () => (
  <PeriodPage data={dinosaurios} title="Pérmicos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default PermicoPage;
