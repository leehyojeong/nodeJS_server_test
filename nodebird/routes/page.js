const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 접근 권한 제어 추가 전 코드(1)
// router.get('/profile', (req, res)=>{
//     res.render('profile', { title: '내 정보 - NodeBird', user: null });
// });

// 접근 권한 제어(로그인) 추가 후 코드(1)
// 프로필은 로그인해야 볼 수 있음
router.get('/profie', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

// 접근 권한 제어 추가 전 코드(2)
// router.get('/join', (req, res)=>{
//     res.render('join', {
//         title: '회원가입 - NodeBird',
//         user: null,
//         joinError: req.flash('joinError'),
//     });
// });

// 접근 권한 제어 추가 전 코드(2)
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: req,user,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next)=>{
    res.render('main', {
        title: 'NodeBird',
        twits: [],
        // user: null, // 접근 권한 제어 추가 전 코드(3)
        user: req.user, // 접근 권한 제어 추가 전 코드(3)
        loginError: req.flash('loginError'),
    });
});

module.exports = router;