// src/pages/OrdovicicoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/ordovicico';
import PeriodPage from './PeriodPage';

const OrdovicicoPage = () => (
  <PeriodPage data={dinosaurios} title="Ordovícicos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default OrdovicicoPage;
