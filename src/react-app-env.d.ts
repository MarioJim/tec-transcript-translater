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

interface CurriculumRequest {
  requestType: 'getCurriculum';
  careerCode: string;
}

interface TranslationRequest {
  requestType: 'translate';
  text: string;
}

type ServiceWorkerRequest = CurriculumRequest | TranslationRequest;

interface ClassCodeAndName {
  classCode: string;
  name: string;
}
