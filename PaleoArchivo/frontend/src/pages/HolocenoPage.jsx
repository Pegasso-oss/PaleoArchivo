// src/pages/HolocenoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/holoceno';
import PeriodPage from './PeriodPage';

const HolocenoPage = () => (
  <PeriodPage data={dinosaurios} title="Holocenos" accentColor="text-sky-400" accentHex="#38bdf8" />
);
export default HolocenoPage;
