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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());


// app.get('/', (req, res) => {
//   res.send('xxxxxxxxxxxxxxx');
// });


// const subscribersRouter = require('./routes/subscriberApi');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const sessionApi = require('./routes/sessionApi');
// const categoryApi = require('./routes/Category');
const dataBase = require('./sqlModels/index');

app.use('/', router);
// app.use('/users', usersRouter);
// app.use('/subscribers', subscribersRouter);
// app.use('/session',sessionApi);
// app.use('/category',categoryApi);




app.use( (req,res,next)=>{
  res.render('404');
})



app.listen(5000, async () => {
  console.log(`Example app listening at http://localhost:5000`)
 await dataBase.sequelize.sync(
    {force : false}
  );

  console.log('db done');

})

module.exports = app;
