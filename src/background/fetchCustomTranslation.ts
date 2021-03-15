import { stringify } from 'query-string';

// Code based on vitalets' google-translate-api
// https://github.com/vitalets/google-translate-api/blob/1471066d95c3f2e557cb4ea2af70b7d8dff108e6/index.js
const translateURL = 'https://translate.google.com';
let apiInfoPromise: Promise<string> | undefined;

export const translate = async (text: string): Promise<string> => {
  const apiInfo = await getApiInformation();
  const url = `${translateURL}/_/TranslateWebserverUi/data/batchexecute?${apiInfo}`;
  const opt = generateFetchOptions(text);
  console.log(url, opt);

  return fetch(url, generateFetchOptions(text))
    .then((res) => res.text())
    .then((res) => parseTranslateResponse(res));
};

const getApiInformation = async () => {
  if (!apiInfoPromise) {
    apiInfoPromise = initApiInformation().then((info) => stringify(info));
  }
  return apiInfoPromise;
};

const initApiInformation = async (): Promise<Record<string, any>> => {
  const response = await fetch(translateURL);
  const responseText = await response.text();

  const extract = (key: string, res: string) => {
    const result = new RegExp(`"${key}":".*?"`).exec(res);
    return result !== null
      ? result[0].replace(`"${key}":"`, '').slice(0, -1)
      : '';
  };

  return {
    rpcids: 'MkEWBc',
    'f.sid': extract('FdrFJe', responseText),
    bl: extract('cfb2h', responseText),
    hl: 'en-US',
    'soc-app': 1,
    'soc-platform': 1,
    'soc-device': 1,
    _reqid: Math.floor(1000 + Math.random() * 9000),
    rt: 'c',
  };
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
  let json: any;

  console.log('???0', jsonStr);
  try {
    const length = /^\d+/.exec(jsonStr)![0];
    jsonStr = jsonStr.slice(
      length.length,
      parseInt(length, 10) + length.length,
    );
    console.log('???1', jsonStr);
    json = JSON.parse(JSON.parse(jsonStr)[0][2]);
    console.log('???2', json);
  } catch (e) {
    console.log('code path error', responseText);
    return '';
  }

  if (!json[1][0][0][5]) {
    console.log('code path unexp', json);
    return json[1][0][0][0];
  } else {
    console.log('code path exp');
    return json[1][0][0][5]
      .flatMap((obj: any) =>
        Array.isArray(obj) && obj.length >= 1 ? [obj[0]] : [],
      )
      .join('');
  }
};
