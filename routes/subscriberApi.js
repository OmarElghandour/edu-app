const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const bcrypt = require('bcrypt');

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const allSubscribers = await Subscriber.find();
        res.json(allSubscribers);
    }catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// Get one subscriber
router.get('/:id',async (req, res) => {
    try {
        const subscribers = await Subscriber.findById(req.params.id);
        res.json(subscribers);
    }catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// Create one subscriber
router.post('/register', async (req, res) => {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const emailExist = await Subscriber.findOne({email : req.body.email});
    if (emailExist) {return res.status(400).json('email is exist')}
    const subscriber = new Subscriber({
        userName : req.body.userName,
        email: req.body.email,
        password : hashedPassword
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.post('/login' , async (req, res) => {
    const userName = await Subscriber.findOne({userName : req.body.credential}); 
    const email = await Subscriber.findOne({email : req.body.credential}); 
    let user = userName || email;
    if(!user){return res.send({status : 'user name or email doesnt exist'})};
    const password = await bcrypt.compare(req.body.password,user.password);
    if (password){
      return res.send({status : 'valid credentials', userId : user._id});
    }
   return res.send({status : 'valid credentials'});
});









// Update one subscriber
router.patch('/:id', (req, res) => {
})

// Delete one subscriber
router.delete('/:id', (req, res) => {
})

module.exports = router
