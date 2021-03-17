import { translateBottomDates } from './translateBottomDates';
import { translateCareer } from './translateCareer';
import { translateClassesOutsideCurriculum } from './translateClassesOutsideCurriculum';
import { translateCurriculum } from './translateCurriculum';
import { translateMiddleTable } from './translateMiddleTable';
import { translateTableHeaders } from './translateTableHeaders';
import { translateTopTable } from './translateTopTable';

Promise.allSettled([
  translateTopTable().then(() => console.log('top table')),
  translateCareer().then(() => console.log('career')),
  translateMiddleTable().then(() => console.log('middle table')),
  translateTableHeaders().then(() => console.log('table headers')),
  translateCurriculum().then(() => console.log('curriculum')),
  translateClassesOutsideCurriculum().then(() =>
    console.log('classes outside'),
  ),
  translateBottomDates().then(() => console.log('bottom dates')),
]);
