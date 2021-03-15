export const translateTableHeaders = () => {
  const tableHeadersCells = document.querySelectorAll(
    'tr.colorPrincipal2 font.texto5',
  );
  tableHeadersCells.forEach((element) => {
    const translation = tableHeadersTranslations[element.textContent!.trim()];
    if (typeof translation === 'string') {
      element.textContent = translation;
    } else {
      const request: TranslationRequest = {
        requestType: 'translate',
        text: element.textContent!,
      };
      chrome.runtime.sendMessage(request, (translatedText: string) => {
        console.log(element.textContent, translatedText);
        element.textContent = translatedText;
      });
    }
  });
};

const tableHeadersTranslations: { [key: string]: string } = {
  Clave: 'Key code',
  Unid: 'Units',
  Materia: 'Subject',
  Calif: 'Grade',
  Atributos: 'Attributes',
  Campus: 'Campus',
  'Cursó o Req': 'Requirements',
  Período: 'Period',
  'Programa Académico': 'Academic program',
};
