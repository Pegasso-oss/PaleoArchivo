import React from "react";
import { dinosaurios } from "../data/ediacarico";
import PeriodPage from './PeriodPage';

const EdiacaricoPage = () => (
  <PeriodPage data={dinosaurios} title="Ediacaricos" accentColor="text-blue-600" accentHex="#2563eb" />
);
export default EdiacaricoPage;
