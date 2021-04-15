const RateLimit = require('express-rate-limit');

module.exports = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0,
});
