const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const {v4 : uuidV4} = require('uuid');
app.use(fileUpload());
require('dotenv').config();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const subscribersRouter = require('./routes/subscriberApi');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionApi = require('./routes/sessionApi');
const categoryApi = require('./routes/Category');
const userSockets = new Set();
let roomUser = {};

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/room', function(req,res) {

  res.redirect(`/room/${uuidV4()}`);
});
app.get('/room/:roomId', function(req,res) {

  res.render('room' , {roomId : req.params.roomId});
});


// default options

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribers', subscribersRouter);
app.use('/token',sessionApi);
app.use('/category',categoryApi);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



  

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join-room', (roomId, userId) => {
    roomUser = {room : roomId , userId : userId};
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', {userId : userId , socketId : socket.id});
    userSockets.add({userId : userId , socketId : socket.id}); 
    socket.to(roomId).broadcast.emit('all-users', Array.from(userSockets));
    console.log(userId, 'wwwwwwwwwww', roomId);
  })
  socket.on('disconnect', function () {
    console.log('room id = ' + roomUser.userId);
    if(roomUser.room){
      // userSockets.delete(socket.id);
      socket.to(roomUser.room).broadcast.emit('user-disconnect', roomUser.userId);  
    }
  });
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




http.listen(5000, (port) => {
  console.log(`listening on ${port}`);
});


module.exports = app;
