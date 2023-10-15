const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkCors } = require('./middlewares/cors');
const { MONGO_DB } = require('./utils/config');
const { limiter } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('mongo is ready for work'))
  .catch((err) => console.log(err));

app.use(helmet());
app.use(checkCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
module.exports = app;
