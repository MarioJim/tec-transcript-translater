/// <reference types="react-browser-extension-scripts" />

interface Translations {
  spanishSubjectNames: SubjectNames;
  englishSubjectNames: SubjectNames;
  semesterNames: SemesterNames;
}

interface SubjectNames {
  [key: string]: string;
}

type SemesterNames = [string, string][];
