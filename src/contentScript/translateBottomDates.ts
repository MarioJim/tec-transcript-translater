import { sendRequest } from './sendRequest';

export const translateBottomDates = () => {
  const dateElements = Array.from(document.querySelectorAll('font.texto2'));
  dateElements.forEach(async (element) => {
    const text = element.textContent!.includes('Sol')
      ? element.textContent!.substr(0, element.textContent!.indexOf('Sol') - 1)
      : element.textContent!;

    const request: TranslationRequest = {
      requestType: 'translate',
      text,
    };
    const translatedText = await sendRequest<string>(request);
    element.textContent = translatedText;
  });
};
