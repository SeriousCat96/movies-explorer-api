const defaultLang = require('./defaults').lang;

module.exports.supportedLanguages = ['ru', 'en'];

module.exports.getLocalizedString = (scope, lang = defaultLang) => scope[lang];

module.exports.format = (scope, lang = defaultLang) => scope[lang].format;
