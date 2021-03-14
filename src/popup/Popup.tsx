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
        .forEach((watermarkDiv) => watermarkDiv.remove()),
  });
};

const translatePage = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    files: ['contentScript.bundle.js'],
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
