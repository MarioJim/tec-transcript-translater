global.fetch = require('node-fetch');

import { getCareerInfo } from '../background/getCareerInfo';

it.concurrent('correctly fetches the career name', async () => {
  const careerCode = 'ITC11';
  const careerName = await getCareerInfo(careerCode);
  expect(careerName).toBe('B.S. Computer Science and Technology');
});
