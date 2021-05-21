const RateLimit = require('express-rate-limit');

module.exports = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  delayMs: 0,
});
