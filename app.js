// Node HTTP Lib
var http = require('http');

// Express module
var express = require('express');

// Create express instance
var app = express();

// Load the iniparser module
var iniparser = require('iniparser');

// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

// Set the view engine
app.set('view engine', 'jade');

// Where to find view files
app.set('views', './views');

// Mark the public dir as a static dir
app.use(express.static('./public'));

// Add the logger module
app.use(express.logger({ format: ':remote-addr :method :url'}));

// Add the responseTime middleware
app.use(express.responseTime());

// Add the errorHandler middleware
app.use(app.router);

// Add the errorHandler middleware
app.use(express.errorHandler());

// Route for the home page - will render a view
app.get('/', function(req, res) {
  res.render('index', {title:config.title, message:config.message});
  
});

// Route for /say-hello
app.get('/say-hello', function(req, res) {
  res.render('hello');
});

app.get('/test', function(req, res) {
  res.send('this is a test');
});

// Start the app
http.createServer(app).listen(5000,
  function() {
    console.log('Express app started at port ' + config.port);
  });
