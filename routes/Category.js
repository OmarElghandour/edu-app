const express = require('express');
const router = express.Router();
const {Category } = require("../sqlModels/inedx");

/* GET users listing. */
router.post('/crete', function (req, res, next) {
  Category.create({
    name: req.body.name
  }).then(category => {
    res.send({
      succsess: true
    });
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/' , async (req,res) => {
 let categories = await Category.findAll(); 
 res.send(categories);
})
module.exports = router;
