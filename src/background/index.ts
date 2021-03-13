/* global chrome */
import { JSDOM } from 'jsdom';

import { parseClassesTable, parseSemesterName } from './parsingHelpers';

chrome.runtime.onMessage.addListener(
  (request: BackgroundRequest, _, sendResponse) => {
    if (request.requestType === 'fetchTranslations') {
      fetchTranslationsPage(request.careerCode)
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
  },
);

const fetchTranslationsPage = (careerCode: string) =>
  fetch('https://samp.itesm.mx/Programas/VistaPreliminarPeriodos', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ clave: careerCode, cols: 0 }),
  });

const parseTranslations = (translationsHTML: string): Translations => {
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
