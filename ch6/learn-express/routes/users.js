var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// "Node.js 교과서 205페이지"
// flash와 세션을 테스트하기 위한 임시 라우터

// /users/flash 라우터로 GET 요청을 보내면 서버에서는 세션과 flash에 메시지를 설정하고 
router.get('/flash', function(req, res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result');
});

// /users/flash/result 메시지로 리다이렉트
// 처음 /users/flash로 방문하면 처음에는 세션 메시지와 flash 메시지 모두 보임
// 브라우저를 새로고침하면 세션 메시지만 보임
// flash 메시지는 일회용이기 때문
// 일회성 메시지라는 성질을 이용하여 로그인 에러, 회원가입 에러 같은 일회성 경고 메시지로 사용
router.get('/flash/result', function(req, res){
  res.send(`${req.session.message} ${req.flash('message')}`);
});
// 

module.exports = router;
