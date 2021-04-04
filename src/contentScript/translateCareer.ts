import { sendRequest } from './sendRequest';

export const translateCareer = async () => {
  const careerElement = document.querySelector('#main font')!;
  const careerCode = careerElement.textContent!.split(' ')[0];

  const request: CareerInfoRequest = {
    requestType: 'getCareerInfo',
    careerCode,
  };
  const careerName = await sendRequest<string>(request);
  careerElement.textContent = `${careerCode} - ${careerName}`;
};
