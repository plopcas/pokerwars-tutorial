var express = require('express'),
  app = express(),
  port = process.env.PORT || 8090,
  request = require('request'),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Functions

/**
 * This endpoint is called by pokerwars.io to request your bot next move on a tournament.
 * You have the current state of the table in the GameInfo object, which you can use to decide
 * your next move.
 */
var play = function (req, res) {
  var gameInfo = req.body;
  var nextMove = {
    action: 'fold'
  };
  res.status(200).send(nextMove);
};

/**
 * This is used by pokerwars.io when your bot subscribe to verify that is alive and responding
 */
var ping = function (req, res) {
  res.status(200).send({
    pong: true
  });
};

/**
 * These requests are sent optionally, you decide if you want them when you subscribe. Your
 * poker bot does not need to necessarily provide an API for these, but they can give you
 * useful hints on what is happening during the tournaments. Please do not use notifications
 * in your poker bot logic, as they are not guaranteed to always be sent. They are only
 * informative so you are aware of what your bot is doing.
 */
var notifications = function (req, res) {
  var notification = req.body;
  console.log('Received notification of type ' + notification.type + ' with message: ', notification.message);
  res.status(200).send();
};

// Routes

app.route('/pokerwars.io/play').post(play);

app.route('/pokerwars.io/notifications').post(notifications);

app.route('/pokerwars.io/ping').get(ping);

// Listen

app.listen(port);

// Subscribe

request.post('https://play.pokerwars.io/v1/pokerwars/subscribe', {
    json: {
      username: 'insert here your bot username, find it at https://www.pokerwars.io/profile',
      apiToken: 'insert here your api token, find it at https://www.pokerwars.io/token',
      botEndpoint: 'insert here your bot ip address. i.e.: http://1.2.3.4:8090/',
      notifications: false
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 202) {
      console.log('Subscribed to pokerwars.io successfully! Response: ', body);
    } else {
      console.log('Your bot did NOT subscribe succesfully! Reason: ', body);
      process.exit(-1);
    }
  }
);