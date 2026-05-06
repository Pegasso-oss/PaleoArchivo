import { dinosaurios as cambrico }     from './cambrico';
import { dinosaurios as ordovicico }   from './ordovicico';
import { dinosaurios as silurico }     from './silurico';
import { dinosaurios as devonico }     from './devonico';
import { dinosaurios as carbonifero }  from './carbonifero';
import { dinosaurios as permico }      from './permico';
import { dinosaurios as triasico }     from './triasico';
import { dinosaurios as jurasico }     from './jurasico';
import { dinosaurios as cretacico }    from './cretacico';
import { dinosaurios as paleoceno }    from './paleoceno';
import { dinosaurios as eoceno }       from './eoceno';
import { dinosaurios as oligoceno }    from './oligoceno';
import { dinosaurios as mioceno }      from './mioceno';
import { dinosaurios as plioceno }     from './plioceno';
import { dinosaurios as pleistoceno }  from './pleistoceno';
import { dinosaurios as holoceno }     from './holoceno';

export const allAnimals = [
  ...cambrico,
  ...ordovicico,
  ...silurico,
  ...devonico,
  ...carbonifero,
  ...permico,
  ...triasico,
  ...jurasico,
  ...cretacico,
  ...paleoceno,
  ...eoceno,
  ...oligoceno,
  ...mioceno,
  ...plioceno,
  ...pleistoceno,
  ...holoceno,
];

export const totalRegistros = allAnimals.length;
