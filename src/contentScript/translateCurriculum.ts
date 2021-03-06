import { sendRequest } from './sendRequest';

export const translateCurriculum = async () => {
  const careerElement = document.querySelector('#main font')!;
  const careerCode = careerElement.textContent!.split(' ')[0]!;
  const curriculumDiv = document.querySelector('div#planEstudios0')!;

  const request: CurriculumRequest = {
    requestType: 'getCurriculum',
    careerCode,
  };
  const translations = await sendRequest<Translations>(request);
  replaceClassNames(curriculumDiv, translations.englishClassNames);
  replaceSemesterNames(
    curriculumDiv,
    translations.semesterNames.map((names) => names[1]),
  );
};

const replaceClassNames = (curriculumDiv: Element, classNames: ClassNames) => {
  const isClassRow = (tr: HTMLTableRowElement): boolean =>
    tr.children.length === 8 && !tr.classList.contains('colorPrincipal2');

  Array.from(curriculumDiv.getElementsByTagName('tr'))
    .filter((tr) => isClassRow(tr))
    .forEach((tr) => {
      const classCode = tr.children[0].textContent!.trim();
      tr.children[2].innerHTML = classNames[classCode];
    });
};

const replaceSemesterNames = (curriculumDiv: Element, semesters: string[]) => {
  Array.from(curriculumDiv.querySelectorAll('td.colorPrincipal4')).forEach(
    (tr, index) => {
      tr.children[0].innerHTML = semesters[index];
    },
  );
};
