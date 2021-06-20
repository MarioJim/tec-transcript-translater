import { Element, parse } from 'parse5';

export const getCareerInfo = async (careerCode: string): Promise<string> => {
  const url = `https://samp.itesm.mx/Programas/VistaPrograma?clave=${careerCode}&modoVista=Areas&idioma=ES&cols=0`;
  const res = await fetch(url);
  const htmlString = await res.text();
  const document = parse(htmlString);
  const html = document.childNodes[1] as Element;
  const body = html.childNodes[2] as Element;
  const header = body.childNodes[1] as Element;
  const headerDiv = header.childNodes[7] as Element;
  const titleDiv = headerDiv.childNodes[1] as Element;
  const titleSpan = titleDiv.childNodes[1] as Element;
  const englishCareerName = titleSpan.attrs[2].value;
  return englishCareerName;
};
