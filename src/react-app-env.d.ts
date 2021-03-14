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

interface CurriculumTranslationRequest {
  requestType: 'fetchCurriculumTranslation';
  careerCode: string;
}

interface CustomTranslationRequest {
  requestType: 'translation';
  text: string;
}

type BackgroundRequest =
  | CurriculumTranslationRequest
  | CustomTranslationRequest;

interface ClassCodeAndName {
  classCode: string;
  name: string;
}
