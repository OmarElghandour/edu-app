const express = require('express');
const pino = require('express-pino-logger')();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const router = require('./routes/router');

app.use(bodyParser.urlencoded({ limit: '25mb', extended: false }));
app.use(express.json({limit: '25mb'}));
app.use(bodyParser.json());
app.use(pino);
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));
const dataBase = require('./schemas/index');

app.use(express.static(path.join( __dirname, '.' ,'public')))

app.use('/api', router);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.listen(5000, async () => {
  console.log(`Example app listening at http://localhost:5000`)
 await dataBase.sequelize.sync(
    {force : false}
  );
  console.log('db done');
})


process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

module.exports = app;
