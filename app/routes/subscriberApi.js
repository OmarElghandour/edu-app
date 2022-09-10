const express = require("express");
const app = express();
const router = express.Router();
const { User , UserProfile , UserCategory } = require("../schemas/index");
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');
const AWS = require("aws-sdk")
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "edumeplatform",
    api_key: "379531162563226",
    api_secret: "Q3qYqphiEuv_arpOMntaysy4H3A"
});

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const allSubscribers = await User.findAll();
        res.json(allSubscribers);
    } catch (e) {
        res.status(500).json({ message: e.message }).body.userName
    }
});

router.get('/teachers', async (req, res) => {
    const allTeachers = await User.findAll({where : {role : 'Teatcher'} , include: [UserProfile , UserCategory]}).catch(err => res.send(err));
    res.send(allTeachers);
});

// Get one subscriber
router.get('/:id', async (req, res) => {
    try {
        const subscriber = await User.findAll({ where: { "id": req.params.id }, limit: 1 });
        res.json(subscriber[0]);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
});

// Create one subscriber

const uploadImg = async (req, res) => {
    let imgUrl = '';
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    const filePath = process.cwd() + '/public/images/' + req.files.img.name;
    const uniqueFilename = new Date().toISOString()
    await req.files.img.mv(filePath, function (err) {
        if (err) {
            return res.send(err)
        }
    });
    await cloudinary.uploader.upload(filePath, { public_id: `users/${uniqueFilename}`, tags: `users` },
        (err, image) => {
            if (err) return res.send(err)
            fs.unlinkSync(filePath);
            imgUrl = image.url;
        }).catch(err => {
            res.status(500).send({
                status: 'faild'
            });
        })
    return imgUrl;
}

router.post('/uploadImg', upload.single('image'), async (req, res ) => {
    // const img = await uploadImg(req, res);
    const file = req.file


    const fileStream = fs.createReadStream(file.path);


    console.log(file);

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }

   const result = await s3.upload(uploadParams).promise();
    console.log(result);
    // res.send({ img: img });
})

router.get('/userDetails/:id', async (req, res) => {
    let userId = req.params.id
    const userData = await User.findOne({ where: { id : userId },attributes: ['id', 'name' , 'email' , 'role'] , include: [UserProfile , UserCategory]}).catch(err => res.send(err));
    res.send({userData});
})
router.post('/userProfile/create/:userId', async (req, res) => {
    UserProfile.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        website : req.body.website,
        phoneNumber : req.body.phone,
        user_img: req.body.img,
        user_id: req.params.userId,
        category_id: 3    
    }).then(result => {
        assignCategories(req.body.categories , req.params.userId);
        return res.send(result);
    }).catch(error => {
       return res.send(error);
    });
});
router.post('/userProfile/update/:userId', async (req, res) => {
    console.log(req.body);
    console.log(req.params.userId);

    if (req.body.img) {
        console.log(req.body.img)
    }
    UserProfile.update({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        website : req.body.website,
        phoneNumber : req.body.phoneNumber,
        user_img: req.body.img,
        category_id: 3
    },{
        where : {user_id : req.params.userId }
    }).then(result => {
        assignCategories(req.body.categories , req.params.userId);
        return res.send(result);
    }).catch(error => {
       return res.send(error);
    });
    assignCategories(req.body.categories , req.params.userId);
});

function assignCategories(categories, userId) {
    console.log("--------------------------");
    console.log(categories);
    console.log("--------------------------");

    for (let category of categories) {
        UserCategory.create({
            userId: userId,
            categoryId: category
        })
    }
}

module.exports = router;
