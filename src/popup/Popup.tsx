import React, { useState } from 'react';
import Button from './Button';
import {
  ContentScriptRequest,
  ContentScriptRequestValue,
} from '../ContentScriptRequest';
import { State } from './State';

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

const translatePage = async (
  callback: (req: ContentScriptRequestValue, err: boolean) => void,
) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  Object.values(ContentScriptRequest).forEach((request) => {
    chrome.tabs.sendMessage(tab.id!, request, (err) =>
      callback(request, !!err),
    );
  });
};

type TranslateState = { [key in ContentScriptRequestValue]: State };

const Popup: React.FC = () => {
  const [removeWmkState, setRemoveWmkState] = useState<State>(State.Initial);
  const [translateState, setTranslateState] = useState<TranslateState>({
    [ContentScriptRequest.TranslateBottomDates]: State.Initial,
    [ContentScriptRequest.TranslateCareer]: State.Initial,
    [ContentScriptRequest.TranslateCurriculum]: State.Initial,
    [ContentScriptRequest.TranslateExtraClasses]: State.Initial,
    [ContentScriptRequest.TranslateMiddleTable]: State.Initial,
    [ContentScriptRequest.TranslateTableHeaders]: State.Initial,
    [ContentScriptRequest.TranslateTopTable]: State.Initial,
  });

  return (
    <>
      <Button onClick={openTranscript}>Abrir Historia Académica</Button>
      <Button
        state={removeWmkState}
        onClick={async () => {
          await removeWatermark();
          setRemoveWmkState(State.Success);
        }}
      >
        Quitar la marca de agua
      </Button>
      <Button
        onClick={async () => {
          setTranslateState({
            [ContentScriptRequest.TranslateBottomDates]: State.Loading,
            [ContentScriptRequest.TranslateCareer]: State.Loading,
            [ContentScriptRequest.TranslateCurriculum]: State.Loading,
            [ContentScriptRequest.TranslateExtraClasses]: State.Loading,
            [ContentScriptRequest.TranslateMiddleTable]: State.Loading,
            [ContentScriptRequest.TranslateTableHeaders]: State.Loading,
            [ContentScriptRequest.TranslateTopTable]: State.Loading,
          });
          console.log('traducir pag onclick called');
          await translatePage((request, err) =>
            setTranslateState((prevState) => ({
              ...prevState,
              [request]: err ? State.Error : State.Success,
            })),
          );
        }}
      >
        Traducir página
      </Button>
      {Object.entries(translateState)
        .filter(([_, rowState]) => rowState !== State.Initial)
        .map(([rowName, rowState], idx) => (
          <Button state={rowState} key={idx}>
            {rowName}
          </Button>
        ))}
    </>
  );
};

export default Popup;
