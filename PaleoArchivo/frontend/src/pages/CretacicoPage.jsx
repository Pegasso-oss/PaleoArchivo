// src/pages/CretacicoPage.jsx
import React from 'react';
import { dinosaurios } from '../data/cretacico';
import PeriodPage from './PeriodPage';

const CretacicoPage = () => (
  <PeriodPage data={dinosaurios} title="Cretácicos" accentColor="text-amber-600" accentHex="#d97706" />
);
export default CretacicoPage;
