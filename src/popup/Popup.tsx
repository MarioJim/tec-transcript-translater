import React from 'react';

const openTranscript = () =>
  chrome.tabs.create({
    url: 'https://alsvdbw01.itesm.mx/servesc/plsql/swghistacad_itesm.inicio',
  });

const removeWatermark = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    function: () =>
      document
        .querySelectorAll('div#capita.watermark')
        .forEach((watermarkDiv) => (watermarkDiv.innerHTML = '')),
  });
};

const translatePage = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    function: () => {
      const career = document.querySelector('#main font')?.textContent;
      const request: BackgroundRequest = {
        requestType: 'fetchTranslations',
        careerCode: career?.split(' ')[0]!,
      };
      console.log('req', request);
      chrome.runtime.sendMessage(request, (translations: Translations) => {
        console.log(translations);
        const tableDiv = document.querySelector('div#planEstudios0')!;
        Array.from(tableDiv.getElementsByTagName('tr'))
          .filter(
            (tr) =>
              tr.children.length === 8 &&
              !tr.classList.contains('colorPrincipal2'),
          )
          .forEach((tr) => {
            const classCode = tr.children[0].textContent!.trim();
            const translation = translations.englishClassNames[classCode];
            tr.children[2].innerHTML = translation;
          });
        Array.from(tableDiv.querySelectorAll('td.colorPrincipal4')).forEach(
          (tr, index) => {
            tr.children[0].innerHTML = translations.semesterNames[index][1];
          },
        );
      });
    },
  });
};

const Popup: React.FC = () => (
  <div>
    <button onClick={openTranscript}>Abrir Historia Académica</button>
    <button onClick={removeWatermark}>Quitar la marca de agua</button>
    <button onClick={translatePage}>Traducir página</button>
  </div>
);

export default Popup;
