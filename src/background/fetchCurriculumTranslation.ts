import { JSDOM } from 'jsdom';

export const fetchCurriculumTranslationsPage = (careerCode: string) =>
  fetch('https://samp.itesm.mx/Programas/VistaPreliminarPeriodos', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ clave: careerCode, cols: 0 }),
  });

export const parseCurriculumTranslations = (
  translationsHTML: string,
): Translations => {
  const spanishClassNames: ClassNames = {};
  const englishClassNames: ClassNames = {};
  const semesterNames: SemesterNames = [];

  const { document } = new JSDOM(translationsHTML).window;
  const documentBody = document.getElementsByTagName('body')[0]!;
  Array.from(documentBody.children)
    .filter((el) => el.tagName === 'TABLE')
    .reduce<Element[][]>(
      (pairsList, _, index, list) =>
        index % 2 === 0
          ? [...pairsList, list.slice(index, index + 2)]
          : pairsList,
      [],
    )
    .forEach(([spanishTable, englishTable]) => {
      Object.assign(spanishClassNames, parseClassesTable(spanishTable));
      Object.assign(englishClassNames, parseClassesTable(englishTable));
      semesterNames.push([
        parseSemesterName(spanishTable),
        parseSemesterName(englishTable),
      ]);
    });

  return { spanishClassNames, englishClassNames, semesterNames };
};

const parseClassesTable = (classesDiv: Element): ClassNames => {
  const classesTable = classesDiv.getElementsByTagName('table')[0]!;

  const entries = Array.from(classesTable.getElementsByTagName('tr'))
    .flatMap((tr, index, list) =>
      index === 0 || index === list.length - 1
        ? []
        : [extractClassCodeAndName(tr)],
    )
    .map(({ classCode, name }) => [classCode, name]);

  return Object.fromEntries(entries);
};

const extractClassCodeAndName = (
  tableRow: HTMLTableRowElement,
): ClassCodeAndName => {
  const tableCells = tableRow.getElementsByTagName('td');

  const classCodeChars = tableCells[0].textContent?.trim().split('')!;
  const startingNumsIdx = classCodeChars.findIndex((ch) => /[0-9]/.test(ch));
  classCodeChars.splice(startingNumsIdx, 0, '-');

  return {
    classCode: classCodeChars.join(''),
    name: tableCells[1].textContent?.trim()!,
  };
};

const parseSemesterName = (table: Element) =>
  table.getElementsByClassName('notaPeriodo')[0]?.textContent?.trim()!;
