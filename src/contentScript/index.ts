import {
  ContentScriptRequest,
  ContentScriptRequestValue,
} from '../ContentScriptRequest';
import { translateBottomDates } from './translateBottomDates';
import { translateCareer } from './translateCareer';
import { translateCurriculum } from './translateCurriculum';
import { translateExtraClasses } from './translateExtraClasses';
import { translateMiddleTable } from './translateMiddleTable';
import { translateTableHeaders } from './translateTableHeaders';
import { translateTopTable } from './translateTopTable';

chrome.runtime.onMessage.addListener(
  (message: ContentScriptRequestValue, _, sendResponse) => {
    switch (message) {
      case ContentScriptRequest.TranslateBottomDates:
        translateBottomDates()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateCareer:
        translateCareer()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateCurriculum:
        translateCurriculum()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateExtraClasses:
        translateExtraClasses()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateMiddleTable:
        translateMiddleTable()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateTableHeaders:
        translateTableHeaders()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
      case ContentScriptRequest.TranslateTopTable:
        translateTopTable()
          .then(() => sendResponse())
          .catch((err) => sendResponse(err));
        return true;
    }
  },
);
