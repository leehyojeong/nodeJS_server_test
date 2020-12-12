var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
// 사용자 조회 요청
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  User.find({})
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
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });

  user.save()
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
