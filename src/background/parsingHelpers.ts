export const parseClassesTable = (classesTable: Element): ClassNames => {
  const classNames: ClassNames = {};

  Array.from(
    classesTable.getElementsByTagName('table')[0]?.getElementsByTagName('tr'),
  ).forEach((tr, index, list) => {
    if (index === 0 || index === list.length - 1) return;
    const [classCode, name] = extractClassCodeAndName(tr);
    classNames[classCode] = name;
  });

  return classNames;
};

const extractClassCodeAndName = (
  tableRow: HTMLTableRowElement,
): [string, string] => {
  const tableCells = tableRow.getElementsByTagName('td');

  const classCodeChars = tableCells[0].textContent?.trim().split('')!;
  const startingNumsIdx = classCodeChars.findIndex((ch) => /[0-9]/.test(ch));
  classCodeChars.splice(startingNumsIdx, 0, '-');
  const classCode = classCodeChars.join('');

  const name = tableCells[1].textContent?.trim()!;

  return [classCode, name];
};

export const parseSemesterName = (table: Element) =>
  table.getElementsByClassName('notaPeriodo')[0]?.textContent?.trim()!;
