const express = require('express');
const router = express.Router();
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
