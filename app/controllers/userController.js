
const express = require("express");
const app = express();
const router = express.Router();
const { User } = require("../schemas/index");
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');


 async function register(req, res) {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const users = await User.findAll({ where: { email: req.body.email } });
    if (users.length > 0) { return res.status(400).send("email exist") }
    User.create({
        name: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    }).then(
        user => res.json(user)
    ).catch(err => {
        res.send(err);
    });
}

async function login (req, res) {
    const user = await User.findOne({ where: { email: req.body.credential } }).catch(err => res.send(err));
    if (!user) { return res.status(401).send({ status: 'user name or email doesnt exist' }) }
    const password = await bcrypt.compare(req.body.password, user?.password);
    if (password) {
        return res.status(200).send({ status: 'valid credentials', userId: user.id, role: user.role , user : user});
    }
    return res.status(401).send({ status: 'Invalid credentials' });

}


module.exports = {
    register,
    login
}