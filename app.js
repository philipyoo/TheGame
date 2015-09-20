var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./oauth.js'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,

    routes = require('./routes/index'),

    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose'),
    usernames = [];

// Mongoose Schema Implementation
mongoose.connect('mongodb://localhost/dagame', function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Connected to mongodb")
  }
});

var Schema = mongoose.Schema
var userSchema = new Schema({
  username: String,
  password: String,
  created: {type: Date, default: Date.now}
});
var User = mongoose.model('User', userSchema);


// Server Connection
server.listen(4000);


// Sockets
io.sockets.on("connection", function(socket){

  socket.on('new user', function(data, callback){
    if(usernames.indexOf(data) != -1){
      callback(false);
    } else{
      socket.username = data;
      callback(true);
      usernames.push(socket.username);
      updateUsernames();
    }
  })

  function updateUsernames(){
    io.sockets.emit('usernames', usernames);
  }


  socket.on("play", function(data){
    console.log(data.data)
  });

  socket.on("click", function(data){
    console.log(data.data)
  });

  socket.on("left", function(data){
    console.log(data.data)
  });

  socket.on("right", function(data){
    console.log(data.data)
  });

  socket.on("bullet", function(data){
    console.log(data.data)
  });

  socket.on("disconnect", function(data){
    if(!socket.username) return;

    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  })

});







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
