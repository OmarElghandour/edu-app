var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const apiKey = '46513982';
const apiSecret = 'd7d79d09ddfbcb962ca2879293281167f7bf1933';
var OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/token', function (req, res) {
   opentok.createSession(function(err, session) {
        if (err) return console.log(err);

        // token =  opentok.generateToken(session.sessionId);

// Generate a Token from a session object (returned from createSession)
        token = session.generateToken();
      res.send({
          session : session.sessionId,
          token : token,
      })
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
