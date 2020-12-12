var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // 미리 데이터베이스에서 데이터 조회 후 템플릿 렌더링에 사용
  User.find({})
    .then((users) => {
      res.render('mongoose', {users});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// async/await 문법
// router.get('/', async(req, res, next) => {
//   try{
//     const users = await User.find();
//     res.render('mongoose', { users });
//   }catch(error){
//     console.error(error);
//     next(error);
//   }
// });

module.exports = router;