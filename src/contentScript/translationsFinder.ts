export const translateInformationTable = (table: Element) => {
  table.querySelectorAll('font.texto5').forEach((element) => {
    const translation =
      informationTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });

  Array.from(table.querySelectorAll('font.texto4'))
    .filter((_, idx) => [1, 3, 5, 6, 7, 8].includes(idx))
    .forEach((element) => {
      const request = {
        requestType: 'fetchCustomTranslation',
        text: element.textContent,
      };
      console.log(element, request);
      chrome.runtime.sendMessage(request, (translatedText: string) => {
        console.log(element, translatedText);
        element.textContent = translatedText;
      });
    });
};

const informationTableTranslations: { [key: string]: string } = {
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
