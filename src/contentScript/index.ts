import { replaceClassNames, replaceSemesterNames } from './replacingHelpers';

const career = document.querySelector('#main font')?.textContent;
const request: BackgroundRequest = {
  requestType: 'fetchTranslations',
  careerCode: career?.split(' ')[0]!,
};

console.log('req', request);

chrome.runtime.sendMessage(request, (translations: Translations) => {
  console.log(translations);

  const tableDiv = document.querySelector('div#planEstudios0')!;
  replaceClassNames(tableDiv, translations.englishClassNames);
  replaceSemesterNames(
    tableDiv,
    translations.semesterNames.map((names) => names[1]),
  );
});
