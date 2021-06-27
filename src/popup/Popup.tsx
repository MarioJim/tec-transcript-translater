import React, { useState } from 'react';
import Button, { LoadingStates } from './Button';

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

const Popup: React.FC = () => {
  const [removeWmkState, setRemoveWmkState] = useState<LoadingStates>(
    LoadingStates.HasntStarted,
  );

  return (
    <>
      <Button onClick={openTranscript}>Abrir Historia Académica</Button>
      <Button
        state={removeWmkState}
        onClick={async () => {
          await removeWatermark();
          setRemoveWmkState(LoadingStates.Success);
        }}
      >
        Quitar la marca de agua
      </Button>
      <Button onClick={translatePage}>Traducir página</Button>
    </>
  );
};

export default Popup;
