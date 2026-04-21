import { dinosaurios as cambrico } from './cambrico';
import { dinosaurios as ordovicico } from './ordovicico';
import { dinosaurios as jurasico } from './jurasico';
import { dinosaurios as triasico } from './triasico';
import { dinosaurios as cretacico } from './cretacico';
import { dinosaurios as paleoceno } from './paleoceno';
import { dinosaurios as silurico } from './silurico'; 
import { dinosaurios as devonico } from './devonico'; 
import { dinosaurios as carbonifero } from './carbonifero'; 
import { dinosaurios as permico } from './permico'; 

export const allAnimals = [
  ...cambrico,
  ...ordovicico,
  ...jurasico,
  ...paleoceno,
  ...triasico,
  ...silurico,
  ...devonico,
  ...carbonifero,
  ...permico,
  ...cretacico
];

export const totalRegistros = allAnimals.length;