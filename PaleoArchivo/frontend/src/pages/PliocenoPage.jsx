// src/pages/PliocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/plioceno';
import PeriodPage from './PeriodPage';

const PliocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Pliocenos" accentColor="text-lime-500" accentHex="#84cc16" />
);
export default PliocenoPage;
