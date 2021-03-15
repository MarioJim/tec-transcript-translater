export const translateCurriculum = (
  careerCode: string,
  curriculumDiv: Element,
) => {
  const request: CurriculumRequest = {
    requestType: 'getCurriculum',
    careerCode,
  };
  chrome.runtime.sendMessage(request, (translations: Translations) => {
    replaceClassNames(curriculumDiv, translations.englishClassNames);
    replaceSemesterNames(
      curriculumDiv,
      translations.semesterNames.map((names) => names[1]),
    );
  });
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
