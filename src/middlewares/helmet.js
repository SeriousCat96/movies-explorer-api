const helmet = require('helmet');

module.exports = helmet({
  frameguard: { action: 'sameorigin' },
  referrerPolicy: { policy: 'strict-origin' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});
