"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetaTagsFromHTMLRoot = exports.generateHTMLNodes = void 0;
const node_html_parser_1 = require("node-html-parser");
const ogTags = [
    'og:title',
    'og:description',
    'og:image',
    'og:url',
    'og:site_name',
    'og:type'
];
const generateHTMLNodes = (data) => (0, node_html_parser_1.parse)(data);
exports.generateHTMLNodes = generateHTMLNodes;
const extractMetaTagsFromHTMLRoot = (rootElement) => {
    const allMetaNodes = rootElement.querySelectorAll('meta');
    const parsedMetaObject = {
        title: '',
        description: '',
        image: '',
        url: '',
        site_name: '',
        type: ''
    };
    allMetaNodes.forEach((aMN) => {
        const i = ogTags.findIndex((e) => e === (aMN.getAttribute('name') ?? aMN.getAttribute('property')));
        if (i >= 0) {
            const key = ogTags[i].split(':')[1];
            parsedMetaObject[key] = aMN.getAttribute('content') ?? '';
        }
    });
    return parsedMetaObject;
};
exports.extractMetaTagsFromHTMLRoot = extractMetaTagsFromHTMLRoot;
exports.default = exports.generateHTMLNodes;
