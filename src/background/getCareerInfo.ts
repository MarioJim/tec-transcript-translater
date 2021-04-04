import { JSDOM } from 'jsdom';

export const getCareerInfo = async (careerCode: string): Promise<string> => {
  const url = `https://samp.itesm.mx/Programas/VistaPrograma?modoVista=Default&idioma=ES&cols=0&clave=${careerCode}`;
  const res = await fetch(url);
  const html = await res.text();
  debugger;
  const { document } = new JSDOM(html).window;
  const careerNameDiv = document.getElementsByClassName('titulo2')[0];
  const careerNameElement = careerNameDiv.children[0];
  const englishCareerName = careerNameElement.getAttribute('data-en')!;
  return englishCareerName;
};
