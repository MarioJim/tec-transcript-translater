export const translateTopTable = () => {
  const table = document.getElementById('tblDatos')!;

  table.querySelectorAll('font.texto5').forEach((element) => {
    const translation = topTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });

  Array.from(table.querySelectorAll('font.texto4'))
    .filter((_, idx) => [1, 3, 5, 6, 7, 8].includes(idx))
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
