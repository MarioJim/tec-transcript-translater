import { sendRequest } from './sendRequest';

export const translateClassesOutsideCurriculum = async () => {
  const otherTables = Array.from(
    document.querySelectorAll('#main > table'),
  ).filter((_, idx) => idx === 3 || idx === 4);

  const tableHeaders = otherTables
    .map((table) => table.querySelectorAll('td.colorPrincipal4 > font'))
    .flatMap((children) => Array.from(children));
  tableHeaders.forEach(async (element) => {
    const translation =
      classesOutsideCurriculumTranslations[element.textContent!.trim()];
    if (typeof translation === 'string') {
      element.textContent = translation;
      return;
    }

    const request: TranslationRequest = {
      requestType: 'translate',
      text: element.textContent!,
    };
    const translatedText = await sendRequest<string>(request);
    element.textContent = translatedText;
  });

  const classesTds = otherTables
    .map((table) => table.querySelectorAll('tr > td:nth-child(3)'))
    .map((children) => Array.from(children))
    .flatMap((children) => children.slice(1));
  classesTds.forEach(async (element) => {
    const request: TranslationRequest = {
      requestType: 'translate',
      text: element.textContent!,
    };
    const translatedText = await sendRequest<string>(request);
    element.textContent = translatedText;
  });
};

const classesOutsideCurriculumTranslations: { [key: string]: string } = {
  'Materias No Reprobadas fuera del Plan':
    'Subjects Not Failed outside the Curriculum',
  'Actividades Formativas': 'Educational Activities',
};
