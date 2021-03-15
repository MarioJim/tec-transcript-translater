export const translateBottomDates = () => {
  const dateElements = Array.from(document.querySelectorAll('font.texto2'));
  dateElements.forEach((element) => {
    const text = element.textContent!.includes('Sol')
      ? element.textContent!.substr(0, element.textContent!.indexOf('Sol') - 1)
      : element.textContent!;
    const request: TranslationRequest = {
      requestType: 'translate',
      text,
    };
    chrome.runtime.sendMessage(request, (translatedText: string) => {
      console.log(element.textContent, translatedText);
      element.textContent = translatedText;
    });
  });
};
