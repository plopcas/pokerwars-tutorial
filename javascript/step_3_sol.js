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

var play = function (req, res) {
  var gameInfo = req.body;
  var nextMove = {
    action: 'fold'
  };
  res.status(200).send(nextMove);
};

var ping = function (req, res) {
  res.status(200).send({
    pong: true
  });
};

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