const express = require('express');
const router = express.Router();
// const faker = require('faker');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// const Session = require('../models/session');
var OpenTok = require('opentok');
const apiKey = '46513982';
const apiSecret = 'd7d79d09ddfbcb962ca2879293281167f7bf1933';
opentok = new OpenTok(apiKey, apiSecret);
const { Session, UserSession, User } = require("../sqlModels/index");
// genrate new token
router.post('/', function (req, res) {
  opentok.createSession(async function (err, session) {
    if (err) return console.log(err);
    // Generate a Token from a session object (returned from createSession)
    let token = session.generateToken();
    Session.create({
      session: session.sessionId,
      token: token,
      sessionOwner: req.body.createdBy
    }).then(session => {
      console.log('session :' + session.session);
      res.send({
        session: session.session,
        token: token,
      });
    }).catch(err => {
      res.status(500).send(err);
    });
  });
});


router.get('/twillio', function (request, response) {
  let identity = 'testuser'
  let token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );
  token.identity = identity;
  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);
  // // Serialize the token to a JWT string and include it in a JSON response
  response.send({
      identity: identity,
      token: token.toJwt()
  });
});

router.post('/twillio', function (request, response) {
  let token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );
  console.log(request.body);
  let room = request.body.room;
  let identity = request.body.identity;
  const grant = new VideoGrant({room});
  // Grant token access to the Video API features
  token.addGrant(grant);
  token.identity = identity;
  // // Serialize the token to a JWT string and include it in a JSON response

  console.log(token.toJwt());
  response.send({token :  token.toJwt()});
});



router.post('/subscribe', async (req, res) => {
  UserSession.create({
    user_id: req.body.subscriberId,
    session_id: req.body.sessionId,
  }).then(userSession => {
    res.send(userSession);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/allSessions', async (req, res) => {
  Session.findAll().then(allSession => {
    res.status(200).json(allSession);
  }).catch(err => {
    res.status(500).json({ message: err });
  });
});

router.post('/userSessions', async (req, res) => {
  User.findAll({ where: { id: req.body.userId }, include: UserSession })
    .then(data => { res.send(data); })
    .catch(err => res.send(err));
});
router.post('/sessionUsers', async (req, res) => {
  Session.findAll({ where: { session: req.body.sessionId }, include: UserSession })
    .then(data => { res.send(data) })
    .catch(err => res.send(err));
});

module.exports = router;
