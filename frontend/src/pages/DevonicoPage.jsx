import React from "react";
import { dinosaurios } from "../data/devonico";
import PeriodPage from './PeriodPage';

const DevonicoPage = () => (
  <PeriodPage data={dinosaurios} title="Devónicos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default DevonicoPage;
