import { Element, parseFragment, TextNode } from 'parse5';

export const getCurriculum = (careerCode: string) =>
  fetchCurriculumPage(careerCode)
    .then((res) => res.text())
    .then((html) => parseCurriculumPage(html));

const fetchCurriculumPage = (careerCode: string) =>
  fetch('https://samp.itesm.mx/Programas/VistaPreliminarPeriodos', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ clave: careerCode, cols: 0 }),
  });

const parseCurriculumPage = (translationsHTML: string): Translations => {
  const spanishClassNames: ClassNames = {};
  const englishClassNames: ClassNames = {};
  const semesterNames: SemesterNames = [];

  parseFragment(translationsHTML)
    .childNodes.filter((el) => el.nodeName === 'table')
    .map((el) => el as Element)
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

const parseClassesTable = (classesTable: Element): ClassNames => {
  const outerTbody = classesTable.childNodes[1] as Element;
  const outerTr = outerTbody.childNodes[0] as Element;
  const outerTd = outerTr.childNodes[1] as Element;
  const innerDiv = outerTd.childNodes[5] as Element;
  const innerTable = innerDiv.childNodes[1] as Element;
  const innerTbody = innerTable.childNodes[1] as Element;

  const entries = innerTbody.childNodes
    .filter((el) => el.nodeName === 'tr')
    .map((el) => el as Element)
    .flatMap((tr, index, list) =>
      index === 0 || index === list.length - 1
        ? []
        : [extractClassCodeAndName(tr)],
    )
    .map(({ classCode, name }) => [classCode, name]);

  return Object.fromEntries(entries);
};

const extractClassCodeAndName = (tableRow: Element): ClassCodeAndName => {
  const tableCells = tableRow.childNodes.filter((el) => el.nodeName === 'td');

  const classCodeTd = tableCells[0] as Element;
  const classCodeSpan = classCodeTd.childNodes[1] as Element;
  const classCodeText = classCodeSpan.childNodes[0] as TextNode;
  const classCodeChars = classCodeText.value.trim().split('');
  const startingNumsIdx = classCodeChars.findIndex((ch) => /[0-9]/.test(ch));
  classCodeChars.splice(startingNumsIdx, 0, '-');

  const classNameTd = tableCells[1] as Element;
  const classNameText = classNameTd.childNodes[0] as TextNode;

  return {
    classCode: classCodeChars.join(''),
    name: classNameText.value.trim(),
  };
};

const parseSemesterName = (table: Element) => {
  const tableTbody = table.childNodes[1] as Element;
  const tableTr = tableTbody.childNodes[0] as Element;
  const tableTd = tableTr.childNodes[1] as Element;
  const div = tableTd.childNodes[1] as Element;
  const span = div.childNodes[1] as Element;
  const text = span.childNodes[0] as TextNode;
  return text.value.trim();
};
