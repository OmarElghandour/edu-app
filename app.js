const express = require('express');
const pino = require('express-pino-logger')();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

const subscribersRouter = require('./routes/subscriberApi');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionApi = require('./routes/sessionApi');
const categoryApi = require('./routes/Category');
const dataBase = require('./sqlModels/index');
dataBase.sequelize.sync();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribers', subscribersRouter);
app.use('/session',sessionApi);
app.use('/category',categoryApi);

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})

module.exports = app;
