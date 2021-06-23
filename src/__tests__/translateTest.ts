global.fetch = require('node-fetch');

import { translate } from '../background/translate';

it.concurrent('translates a word to english', async () => {
  const word = 'árbol';
  const translatedWord = await translate(word);
  expect(translatedWord).toBe('tree');
});

it.concurrent('translates a date to english', async () => {
  const date = 'Julio de 2018';
  const translatedWord = await translate(date);
  expect(translatedWord).toBe('July 2018.');
});
