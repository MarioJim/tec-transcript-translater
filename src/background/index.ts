/* global chrome */
import { JSDOM } from 'jsdom';

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.contentScriptQuery === 'fetchTranslations') {
    fetchTranslationsPage('ITC11')
      .then((response) => response.text())
      .then((html) => parseTranslations(html))
      .then((translations) => sendResponse(translations))
      .catch((err) =>
        console.error(
          "You've ran into a problem!\n",
          'Please report it at https://github.com/MarioJim/tec-transcript-translater/issues\n',
          err,
        ),
      );
    return true;
  }
});

const fetchTranslationsPage = (careerCode: string) =>
  fetch('https://samp.itesm.mx/Programas/VistaPreliminarPeriodos', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ clave: careerCode, cols: 0 }),
  });

const parseTranslations = (translationsHTML: string): Translations => {
  const spanishSubjectNames: SubjectNames = {};
  const englishSubjectNames: SubjectNames = {};
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
      Array.from(
        spanishTable
          .getElementsByTagName('table')[0]
          ?.getElementsByTagName('tr'),
      ).forEach((tr, index, list) => {
        if (index === 0 || index === list.length - 1) return;
        const [subjectCode, name] = extractSubjectCodeAndName(tr);
        spanishSubjectNames[subjectCode] = name;
      });

      Array.from(
        englishTable
          .getElementsByTagName('table')[0]
          ?.getElementsByTagName('tr'),
      ).forEach((tr, index, list) => {
        if (index === 0 || index === list.length - 1) return;
        const [subjectCode, name] = extractSubjectCodeAndName(tr);
        englishSubjectNames[subjectCode] = name;
      });

      semesterNames.push([
        extractSemesterName(spanishTable),
        extractSemesterName(englishTable),
      ]);
    });

  return { spanishSubjectNames, englishSubjectNames, semesterNames };
};

const extractSubjectCodeAndName = (
  tableRow: HTMLTableRowElement,
): [string, string] => {
  const tableCells = tableRow.getElementsByTagName('td');
  const subjectCode = tableCells[0].textContent?.trim()!;
  const name = tableCells[1].textContent?.trim()!;
  return [subjectCode, name];
};

const extractSemesterName = (table: Element) =>
  table.getElementsByClassName('notaPeriodo')[0]?.textContent?.trim()!;
