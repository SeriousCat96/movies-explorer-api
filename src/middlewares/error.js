const errors = require('../utils/messages');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || errors.http.internalServerError.message;

  res.status(statusCode).json({ message });

  return next();
};
