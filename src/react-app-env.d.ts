/// <reference types="react-browser-extension-scripts" />

interface Translations {
  spanishClassNames: ClassNames;
  englishClassNames: ClassNames;
  semesterNames: SemesterNames;
}

interface ClassNames {
  [key: string]: string;
}

type SemesterNames = [string, string][];

interface TranslationsRequest {
  requestType: 'fetchTranslations';
  careerCode: string;
}

type BackgroundRequest = TranslationsRequest;
