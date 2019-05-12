// Require and initialise Express
var express = require('express'),
  app = express(),
  port = process.env.PORT || 8090,
  bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Functions

var play = function (req, res) {};

var ping = function (req, res) {};

var notifications = function (req, res) {};

// Routes

app.route('/pokerwars.io/play').post(play);

app.route('/pokerwars.io/ping').get(ping);

app.route('/pokerwars.io/notifications').post(notifications);

// Listen

app.listen(port);
