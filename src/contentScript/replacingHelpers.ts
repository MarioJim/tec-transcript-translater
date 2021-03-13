export const replaceClassNames = (
  tableDiv: Element,
  classNames: ClassNames,
) => {
  const isClassRow = (tr: HTMLTableRowElement): boolean =>
    tr.children.length === 8 && !tr.classList.contains('colorPrincipal2');

  Array.from(tableDiv.getElementsByTagName('tr'))
    .filter((tr) => isClassRow(tr))
    .forEach((tr) => {
      const classCode = tr.children[0].textContent!.trim();
      tr.children[2].innerHTML = classNames[classCode];
    });
};

export const replaceSemesterNames = (
  tableDiv: Element,
  semesterNames: string[],
) => {
  Array.from(tableDiv.querySelectorAll('td.colorPrincipal4')).forEach(
    (tr, index) => {
      tr.children[0].innerHTML = semesterNames[index];
    },
  );
};
