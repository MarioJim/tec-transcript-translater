import { getCareerInfo } from './getCareerInfo';
import { getCurriculum } from './getCurriculum';
import { translate } from './translate';

chrome.runtime.onMessage.addListener(
  (request: ServiceWorkerRequest, _, sendResponse) => {
    if (request.requestType === 'getCurriculum') {
      getCurriculum(request.careerCode)
        .then((translations) => sendResponse(translations))
        .catch((err) => printError(err));
      return true;
    } else if (request.requestType === 'getCareerInfo') {
      getCareerInfo(request.careerCode)
        .then((careerName) => sendResponse(careerName))
        .catch((err) => printError(err));
      return true;
    } else if (request.requestType === 'translate') {
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
    'Please report it at https://github.com/MarioJim/tec-transcript-translater/issues with the stack trace of the problem\n',
    err,
  );
