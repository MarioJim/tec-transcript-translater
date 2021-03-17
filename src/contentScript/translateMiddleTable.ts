import { sendRequest } from './sendRequest';

export const translateMiddleTable = async () => {
  const table = document.getElementById('datosAcademicos0')!;

  table.querySelectorAll('font.texto5').forEach((element, idx) => {
    if (idx === 6) {
      element.textContent = 'Last period average';
      return;
    }
    const translation = middleTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });

  const promises = Array.from(table.querySelectorAll('td.texto4'))
    .filter((_, idx) => [0, 1, 2, 5].includes(idx))
    .map(async (element) => {
      const request: TranslationRequest = {
        requestType: 'translate',
        text: element.textContent!,
      };
      const translatedText = await sendRequest<string>(request);
      element.textContent = translatedText;
    });

  await Promise.allSettled(promises);
};

const middleTableTranslations: { [key: string]: string } = {
  'Fecha de ingreso:': 'Date of admission:',
  'Período actual:': 'Current period:',
  'Estatus académico:': 'Academic status:',
  'Semestre acreditado:': 'Accredited semester:',
  'Unidades permitidas a inscribir:': 'Units allowed to enroll:',
  'Ultimo período cursado:': 'Last period completed:',
  'Promedio acumulado del plan:': 'Cumulative plan average:',
};
