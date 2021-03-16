import { stringify } from 'query-string';

// Code based on vitalets' google-translate-api
// https://github.com/vitalets/google-translate-api/blob/1471066d95c3f2e557cb4ea2af70b7d8dff108e6/index.js
const translateURL = 'https://translate.google.com';
let apiInfoPromise: Promise<string> | undefined;

export const translate = async (text: string): Promise<string> => {
  const apiInfo = await getApiInformation();
  const url = `${translateURL}/_/TranslateWebserverUi/data/batchexecute?${apiInfo}`;

  const response = await fetch(url, generateFetchOptions(text));
  const responseText = await response.text();
  const translatedText = parseTranslateResponse(responseText);
  console.log(`from: "${text}"\nto: "${translatedText}"`);
  return translatedText;
};

const getApiInformation = async () => {
  if (!apiInfoPromise) {
    apiInfoPromise = initApiInformation();
  }
  return apiInfoPromise;
};

const initApiInformation = async (): Promise<string> => {
  const response = await fetch(translateURL);
  const responseText = await response.text();

  const extract = (key: string) => {
    const result = new RegExp(`"${key}":".*?"`).exec(responseText);
    return result !== null
      ? result[0].replace(`"${key}":"`, '').slice(0, -1)
      : '';
  };

  const apiInformation = {
    rpcids: 'MkEWBc',
    'f.sid': extract('FdrFJe'),
    bl: extract('cfb2h'),
    hl: 'en-US',
    'soc-app': 1,
    'soc-platform': 1,
    'soc-device': 1,
    _reqid: Math.floor(1000 + Math.random() * 9000),
    rt: 'c',
  };

  return stringify(apiInformation);
};

const generateFetchOptions = (text: string): RequestInit => {
  const innerData = JSON.stringify([[text, 'es', 'en', true], [null]]);
  const middleData = JSON.stringify([[['MkEWBc', innerData, null, 'generic']]]);
  const outerData = encodeURIComponent(middleData);
  return {
    body: `f.req=${outerData}&`,
    credentials: 'omit',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'POST',
  };
};

const parseTranslateResponse = (responseText: string): string => {
  let jsonStr = responseText.slice(6);
  const length = /^\d+/.exec(jsonStr)![0];
  jsonStr = jsonStr.slice(length.length, parseInt(length, 10) + length.length);
  const json = JSON.parse(JSON.parse(jsonStr)[0][2]);

  if (!json[1][0][0][5]) {
    return json[1][0][0][0];
  } else {
    return json[1][0][0][5]
      .flatMap((obj: any) =>
        Array.isArray(obj) && obj.length >= 1 ? [obj[0]] : [],
      )
      .join('');
  }
};
