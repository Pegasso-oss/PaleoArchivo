import { dinosaurios as cambrico } from './cambrico';
import { dinosaurios as ordovicico } from './ordovicico';
import { dinosaurios as jurasico } from './jurasico';
import { dinosaurios as triasico } from './triasico';
import { dinosaurios as cretacico } from './cretacico';
import { dinosaurios as paleoceno } from './paleoceno';

export const allAnimals = [
  ...cambrico,
  ...ordovicico,
  ...jurasico,
  ...paleoceno,
  ...triasico,
  ...cretacico
];

export const totalRegistros = allAnimals.length;