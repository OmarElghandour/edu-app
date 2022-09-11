const express = require("express");
const app = express();
const router = express.Router();
const {User, UserProfile, UserCategory} = require("../schemas/index");
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');
const AWS = require("aws-sdk")
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});
const multer = require('multer')
const {Category} = require("../schemas");
const upload = multer({dest: 'uploads/'})

router.post('/uploadImg', upload.single('image'), userController.uploadProfileImage);

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const allSubscribers = await User.findAll();
    res.json(allSubscribers);
  } catch (e) {
    res.status(500).json({message: e.message}).body.userName
  }
});

router.get('/teachers', async (req, res) => {
  const allTeachers = await User.findAll({
    where: {role: 'Teacher'},
    include: [{model: UserProfile}, {
      model: UserCategory, include: [
        Category
      ]
    }],
    attributes: ['id', 'name', 'email', 'role']
  })
    .catch(err => res.send(err));
  res.send(allTeachers);
});

// Get one subscriber
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await User.findAll({where: {"id": req.params.id}, limit: 1});
    res.json(subscriber[0]);
  } catch (e) {
    res.status(500).json({message: e.message})
  }
});


router.get('/userDetails/:id', async (req, res) => {
  let userId = req.params.id
  const userData = await User.findOne({
    where: {"id": userId},
    include: [UserProfile, UserCategory],
    attributes: ['id', 'name', 'email', 'role']
  }).catch(err => res.send(err));
  res.send({userData});
})
router.post('/userProfile/create/:userId', async (req, res) => {
  UserProfile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    website: req.body.website,
    phoneNumber: req.body.phone,
    user_img: req.body.img,
    user_id: req.params.userId,
  }).then(result => {
    assignCategories(req.body.categories, req.params.userId);
    return res.send(result);
  }).catch(error => {
    return res.send(error);
  });
});
router.post('/userProfile/update/:userId', async (req, res) => {
  if (req.body.img) {
    console.log(req.body.img)
  }
  UserProfile.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    website: req.body.website,
    phoneNumber: req.body.phoneNumber,
    user_img: req.body.img,
    category_id: 3
  }, {
    where: {user_id: req.params.userId}
  }).then(result => {
    assignCategories(req.body.categories, req.params.userId);
    return res.send(result);
  }).catch(error => {
    return res.send(error);
  });
  assignCategories(req.body.categories, req.params.userId);
});

function assignCategories(categories, userId) {
  for (let category of categories) {
    UserCategory.create({
      userId: userId,
      categoryId: category
    })
  }
}

module.exports = router;
