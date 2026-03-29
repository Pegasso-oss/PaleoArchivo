import { dinosaurios as cambrico } from './cambrico';
import { dinosaurios as ordovicico } from './ordovicico';
import { dinosaurios as jurasico } from './jurasico';
import { dinosaurios as paleoceno } from './paleoceno';

export const allAnimals = [
  ...cambrico,
  ...ordovicico,
  ...jurasico,
  ...paleoceno,
];

export const totalRegistros = allAnimals.length;