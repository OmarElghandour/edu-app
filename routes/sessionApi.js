const express = require('express');
const router = express.Router();
const Session = require('../models/session');
var OpenTok = require('opentok');
const apiKey = '46513982';
const apiSecret = 'd7d79d09ddfbcb962ca2879293281167f7bf1933';
opentok = new OpenTok(apiKey, apiSecret);

// genrate new token
router.post('/', function (req, res) {
  opentok.createSession(async function (err, session) {
    if (err) return console.log(err);
    // Generate a Token from a session object (returned from createSession)
    console.log(req.body);
    let token = session.generateToken();
    const newSession = new Session({
      session: session.sessionId,
      token: token,
      sessionOwner : req.body.createdBy
    });
    try {
      const newSubscriber = await newSession.save();
      res.send({
        session: session.sessionId,
        token: token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  });
});


router.post('/subscribe' , async (req, res) => {
  const session = await Session.findOne({session : req.body.sessionId});
  console.log(req.body);
  session.sessionSubscribers.push({ userId : req.body.subscriberId});
  await session.save();
  res.send({status: 'ssss'});
});
router.get('/allSessions', async (req, res) => {
  try {
    const allSessions = await Session.find();
    res.json(allSessions);
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
});

router.post('/userSessions', async (req, res) => {
    console.log(req.body);
    try {
        const userSessions = await Session.find({"sessionSubscribers.userId": req.body.subscriberId});
        res.json(userSessions);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
});


module.exports = router;
