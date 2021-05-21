require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const index = require('./routes/index');

const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const langSelector = require('./middlewares/locale');

const { devDbConnectionString } = require('./utils/constants');

const { NODE_ENV, DB_CONNECTION_STRING, PORT = 3001 } = process.env;

const app = express();
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION_STRING || devDbConnectionString : devDbConnectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors);
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(langSelector);

app.use('/', index);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
});
