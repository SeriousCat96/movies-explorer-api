const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://movies-explorer.jumpingcrab.com',
    'https://movies-explorer.jumpingcrab.com',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = cors(options);