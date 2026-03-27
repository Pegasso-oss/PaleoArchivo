import { dinosaurios as paleoceno } from './paleoceno';
import { dinosaurios as jurasico } from './jurasico';
import { dinosaurios as ordovicico } from './ordovicico';
import { dinosaurios as cambrico } from './cambrico';

// Unificamos todo en un solo array exportable
export const allAnimals = [
  ...cambrico,
  ...ordovicico,
  ...jurasico,
  ...paleoceno,
];

// Tip pro: Esto nos servirá más adelante para el buscador
export const totalRegistros = allAnimals.length;