// src/pages/OligocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/oligoceno';
import PeriodPage from './PeriodPage';

const OligocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Oligocenos" accentColor="text-teal-400" accentHex="#2dd4bf" />
);
export default OligocenoPage;
