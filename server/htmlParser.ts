import { HTMLElement, parse } from 'node-html-parser';

interface MetaObject {
  title: string;
  description: string;
  image: string;
  url: string;
  site_name: string;
  type: string;
}

type MetaObjectKey = keyof MetaObject;

const ogTags = [
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:site_name',
  'og:type'
];

export const generateHTMLNodes: (data: string) => HTMLElement = (data) =>
  parse(data);

export const extractMetaTagsFromHTMLRoot: (
  rootElement: HTMLElement
) => MetaObject = (rootElement) => {
  const allMetaNodes = rootElement.querySelectorAll('meta');

  const parsedMetaObject: MetaObject = {
    title: '',
    description: '',
    image: '',
    url: '',
    site_name: '',
    type: ''
  };

  allMetaNodes.forEach((aMN) => {
    const i = ogTags.findIndex(
      (e) => e === (aMN.getAttribute('name') ?? aMN.getAttribute('property'))
    );
    if (i >= 0) {
      const key = ogTags[i].split(':')[1] as MetaObjectKey;
      parsedMetaObject[key] = aMN.getAttribute('content') ?? '';
    }
  });
  return parsedMetaObject;
};
export default generateHTMLNodes;
