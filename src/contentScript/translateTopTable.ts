import { sendRequest } from './sendRequest';

export const translateTopTable = async () => {
  const table = document.getElementById('tblDatos')!;

  table.querySelectorAll('font.texto5').forEach((element) => {
    const translation = topTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });

  const promises = Array.from(table.querySelectorAll('font.texto4'))
    .filter((_, idx) => [1, 3, 5, 6, 7, 8].includes(idx))
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

const topTableTranslations: { [key: string]: string } = {
  'Nombre:': 'Name:',
  'Estatus Académico:': 'Academic Status:',
  'Matrícula:': 'Enrollment:',
  'Ultimo Período Cursado:': 'Last Period Completed',
  'Programa:': 'Program:',
  'Periodo Actual:': 'Current period:',
  'Campus:': 'Campus:',
  'Nivel Académico:': 'Academic level:',
  'Beca:': 'Scolarship:',
  'Correo Electrónico:': 'Email:',
};
