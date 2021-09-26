export const ContentScriptRequest = {
  TranslateBottomDates: 'Traducir fechas de abajo',
  TranslateCareer: 'Traducir nombre de la carrera',
  TranslateClassesOutsideCurriculum: 'Traducir clases fuera del currículum',
  TranslateCurriculum: 'Traducir currículum',
  TranslateMiddleTable: 'Traducir tabla de enmedio',
  TranslateTableHeaders: 'Traducir encabezados de las tablas',
  TranslateTopTable: 'Traducir tabla de arriba',
} as const;

export type ContentScriptRequestKey = keyof typeof ContentScriptRequest;

export type ContentScriptRequestValue =
  typeof ContentScriptRequest[ContentScriptRequestKey];
