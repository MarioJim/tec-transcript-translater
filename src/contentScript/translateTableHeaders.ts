import { sendRequest } from './sendRequest';

export const translateTableHeaders = () => {
  const tableHeadersCells = document.querySelectorAll(
    'tr.colorPrincipal2 font.texto5',
  );
  tableHeadersCells.forEach(async (element) => {
    const translation = tableHeadersTranslations[element.textContent!.trim()];
    if (typeof translation === 'string') {
      element.textContent = translation;
      return;
    }

    const request: TranslationRequest = {
      requestType: 'translate',
      text: element.textContent!,
    };
    const translatedText = await sendRequest<string>(request);
    element.textContent = translatedText;
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
