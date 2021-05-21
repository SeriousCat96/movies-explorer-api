const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    /movies-explorer\.jumpingcrab\.com$/,
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = cors(options);
