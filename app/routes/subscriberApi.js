const express = require("express");
const app = express();
const router = express.Router();
const { User , UserProfile , UserCategory } = require("../sqlModels/index");
const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');

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
        res.status(500).json({ message: e.message })
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
router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
    const userName = await User.findAll({ where: { name: req.body.credential }, limit: 1 , include: [UserProfile , UserCategory]}).catch(err => res.send(err));

    const email = await User.findAll({ where: { name: req.body.credential }, limit: 1 }).catch(err => res.send(err));
    let user = userName || email;
    if (!user) { return res.send({ status: 'user name or email doesnt exist' }) }
    const password = await bcrypt.compare(req.body.password, user[0].password);
    if (password) {
        return res.send({ status: 'valid credentials', userId: user[0].id, role: user[0].role , user : user});
    }
    return res.send({ status: 'valid credentials' });
});

const uploadImg = async (req, res) => {
    let imgUrl = '';
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const filePath = process.cwd() + '/public/images/' + req.files.img.name;
    const uniqueFilename = new Date().toISOString()
    req.files.img.mv(filePath, function (err) { if (err) { return res.send(err) } });
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

router.post('/uploadImg', async (req, res) => {
    const img = await uploadImg(req, res);
    res.send({ img: img });
})

router.get('/userDatails/:id', async (req, res) => {
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
       return res.send(result);
    }).catch(error => {
       return res.send(error);
    });
    assignCategories(req.body.categories , req.params.userId);
});
router.post('/userProfile/update/:userId', async (req, res) => {
    console.log(req.body);
    console.log(req.params.userId);
    UserProfile.update({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        website : req.body.website,
        phoneNumber : req.body.phone,
        user_img: req.body.img,
        category_id: 3    
    },{
        where : {user_id : req.params.userId }
    }).then(result => {
       return res.send(result);
    }).catch(error => {
       return res.send(error);
    });
    // assignCategories(req.body.categories , req.params.userId);
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
