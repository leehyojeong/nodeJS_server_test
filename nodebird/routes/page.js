const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

// 접근 권한 제어 추가 전 코드(1)
// router.get('/profile', (req, res)=>{
//     res.render('profile', { title: '내 정보 - NodeBird', user: null });
// });

// 접근 권한 제어(로그인) 추가 후 코드(1)
// 프로필은 로그인해야 볼 수 있음
router.get('/profile', isLoggedIn, (req, res) => {
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

// 접근 권한 제어 추가 후 코드(2)
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

// 게시글 작성 기능 추가 전 코드(1)
// router.get('/', (req, res, next)=>{
//     res.render('main', {
//         title: 'NodeBird',
//         twits: [],
//         // user: null, // 접근 권한 제어 추가 전 코드(3)
//         user: req.user, // 접근 권한 제어 추가 후 코드(3)
//         loginError: req.flash('loginError'),
//     });
// });

// 게시글 작성 기능 추가 후 코드(1)
router.get('/', (req, res, next)=>{
    Post.findAll({
        include: { // 작성자 아이디, 닉네임으로 Post, User JOIN
            model: User, 
            attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']], // 최신순으로 게시글 정렬
    })
        .then((posts)=>{
            // 데이터베이스에서 게시글 조회 후 결과를 twits에 넣어 렌더링
            res.render('main', {
                title: 'NodeBird',
                twits: posts,
                user: req.user,
                loginError: req.flash('loginError'),
            });
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        });
});

module.exports = router;