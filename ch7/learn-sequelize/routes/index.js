var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET home page. */

// GET으로 접속했을 때의 라우터
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // findAll()로 모든 사용자를 찾은 후
  User.findAll()
    .then((users)=>{ // 조회 성공
      // sequelize.pug를 렌더링할 때 결과값인 users를 넣음
      res.render('sequelize', { users });
    })
    .catch((err)=>{ // 조회 실패
      console.error(err);
      next(err);
    });
});

// 위의 코드를 async/await 문법으로 표현
router.get('/', async(req, res, next)=>{
  try{
    const users = await User.findAll();
    res.render('sequelize', { users });
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports = router;
