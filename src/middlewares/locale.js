const parser = require('accept-language-parser');
const defaultLang = require('../utils/defaults').lang;
const { supportedLanguages } = require('../utils/locale');

module.exports = (req, res, next) => {
  let lang = defaultLang;

  if (req.query.locale) {
    lang = parser.pick(supportedLanguages, req.query.locale, { loose: true }) || defaultLang;
  } else if (req.headers['accept-language']) {
    lang = parser.pick(supportedLanguages, req.headers['accept-language'], { loose: true }) || defaultLang;
  }

  req.lang = lang;
  res.set('Content-Language', lang);

  next();
};
