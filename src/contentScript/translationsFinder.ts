export const translateInformationTable = (table: Element) => {
  table.querySelectorAll('font.texto5').forEach((element) => {
    const translation =
      informationTableTranslations[element.textContent!.trim()];
    if (translation !== undefined) element.textContent = translation;
  });
};

const translateScolarship = (text: string) =>
  text
    .replace('Sí', 'Yes')
    .replace('Beca', 'Scolarship')
    .replace('Crédito', 'Credit');

const findTranslation = (text: string): string => {
  return translations[text.trim()];
};

const translations: { [key: string]: string } = {
  'Fecha de ingreso:': 'Date of admission:',
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
