export const translateCareer = () => {
  const careerElement = document.querySelector('#main font')!;
  const careerCode = careerElement.textContent!.split(' ')[0];
  const career = careerElement.textContent!.split(' ').splice(2).join(' ');

  const translation = careerTranslations[career];
  if (typeof translation === 'string') {
    careerElement.textContent = `${careerCode} - ${translation}`;
    return;
  }

  const request: TranslationRequest = {
    requestType: 'translate',
    text: career,
  };
  chrome.runtime.sendMessage(request, (translatedText: string) => {
    console.log(career, translatedText);
    careerElement.textContent = `${careerCode} - ${translatedText}`;
  });
};

const careerTranslations: { [key: string]: string } = {
  'Ingeniero en Tecnologías Computacionales':
    'B.S. Computer Science and Technology',
};
