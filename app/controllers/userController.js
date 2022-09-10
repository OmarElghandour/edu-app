
const { User } = require("../schemas/index");
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');
const {UserProfile} = require("../schemas");
require('dotenv').config();
const AWS = require("aws-sdk")
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

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

async function uploadProfileImage(req, res) {
  const file = req.file
  const fileStream = fs.createReadStream(file.path);
  const userId = req.body.userId;
  const fileName = file.originalname.replace(/\s/g, '');
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fileStream,
    Key:  fileName
  }
  const userData = await UserProfile.findOne({ where: { user_id : userId },attributes: ['id', 'user_img']}).catch(err => res.send(err));
  const userImage = userData.dataValues.user_img?.split('/').pop();
  if (userImage !== fileName ) {
    try {
      const result = await s3.upload(uploadParams).promise();
      await  UserProfile.update({
        user_img : result.Location,
      }, {
        where: { user_id : userId }
      });
      res.send('user profile image Has been updated' );
    } catch (err) {
      res.send('image update failed with error' + err);
    }
  }
  res.send('image Already Exist' );
}


module.exports = {
    register,
    login,
    uploadProfileImage
}