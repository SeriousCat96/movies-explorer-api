require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const index = require('./routes/index');

const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const notFoundHandler = require('./middlewares/notFound');

const { devDbConnectionString } = require('./utils/constants');

const { NODE_ENV, DB_CONNECTION_STRING, PORT = 3001 } = process.env;

const app = express();
app.set('trust proxy', 1);

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION_STRING || devDbConnectionString : devDbConnectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors);
app.use(limiter);

app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

app.use('/', index);

app.use(errorLogger);
app.use(errors());

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
});
