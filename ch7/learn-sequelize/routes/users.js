var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET users listing. */

// 사용자 조회 요청
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  User.findAll()
    .then((users)=>{
      res.json(users);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

// 사용자 등록 요청
router.post('/', function(req, res, next){
  User.create({
    name: req.body.name, 
    age: req.body.age,
    married: req.body.married,
  })
    .then((result)=>{
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

module.exports = router;
