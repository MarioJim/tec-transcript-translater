import { sendRequest } from './sendRequest';

export const translateTableHeaders = async () => {
  const tableHeadersCells = Array.from(
    document.querySelectorAll('tr.colorPrincipal2 font.texto5'),
  );
  const promises = tableHeadersCells.map(async (element) => {
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

  await Promise.allSettled(promises);
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
