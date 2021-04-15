const helmet = require('helmet');

module.exports = helmet({
  frameguard: { action: 'deny' },
});
