/* global chrome */
import { JSDOM } from 'jsdom';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === 'fetchTranslations') {
    fetchTranslationsPage('ITC11')
      .then((response) => response.text())
      .then((text) => sendResponse(text));
    return true;
  }
});

const fetchTranslationsPage = (careerCode: string) =>
  fetch('https://samp.itesm.mx/Programas/VistaPreliminarPeriodos', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ clave: careerCode, cols: 0 }),
  });
