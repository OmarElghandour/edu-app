
var app = express();
var subscribersRouter = require('./subscriberApi');
var indexRouter = require('./index');
var usersRouter = require('./users');
var sessionApi = require('./sessionApi');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribers', subscribersRouter);
app.use('/token',sessionApi)
