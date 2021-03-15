export const translateMiddleTable = () => {
  const table = document.getElementById('datosAcademicos0')!;

  table.querySelectorAll('font.texto5').forEach((element, idx) => {
    if (idx === 6) {
      element.textContent = 'Last period average';
      return;
    }
    const translation = middleTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });

  Array.from(table.querySelectorAll('td.texto4'))
    .filter((_, idx) => [0, 1, 2, 5].includes(idx))
    .forEach((element) => {
      const request: TranslationRequest = {
        requestType: 'translate',
        text: element.textContent!,
      };
      chrome.runtime.sendMessage(request, (translatedText: string) => {
        console.log(element.textContent, translatedText);
        element.textContent = translatedText;
      });
    });
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
