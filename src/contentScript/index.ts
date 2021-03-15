import { translateCurriculum } from './translateCurriculum';
import { translateTopTable } from './translateTopTable';

const career = document.querySelector('#main font')?.textContent;
translateCurriculum(
  career?.split(' ')[0]!,
  document.querySelector('div#planEstudios0')!,
);

const informationTable = document.getElementById('tblDatos')!;
translateTopTable(informationTable);
