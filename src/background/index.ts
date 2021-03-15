import {
  fetchCurriculumTranslationsPage,
  parseCurriculumTranslations,
} from './fetchCurriculumTranslation';
import { translate } from './fetchCustomTranslation';

chrome.runtime.onMessage.addListener(
  (request: BackgroundRequest, _, sendResponse) => {
    if (request.requestType === 'fetchCurriculumTranslation') {
      fetchCurriculumTranslationsPage(request.careerCode)
        .then((response) => response.text())
        .then((html) => parseCurriculumTranslations(html))
        .then((translations) => sendResponse(translations))
        .catch((err) => printError(err));
      return true;
    } else if (request.requestType === 'fetchCustomTranslation') {
      translate(request.text)
        .then((response) => sendResponse(response))
        .catch((err) => printError(err));
      return true;
    }
  },
);

const printError = (err: any) =>
  console.error(
    "You've ran into a problem!\n",
    'Please report it at https://github.com/MarioJim/tec-transcript-translater/issues\n',
    err,
  );
