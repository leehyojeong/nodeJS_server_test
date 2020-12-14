const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');

const router = express.Router();

// 루트 라우터 
// 접속 시 로그인 화면 보여줌
router.get('/', (req, res, next) => {
    User.findOne({
        where: { id: req.user && req.user.id || null },
        include: { model: Domain },
    })
        .then((user) => {
            res.render('login', {
                user, 
                loginError: req.flash('loginError'),
                domains: user && user.domains
            });
        })
        .catch((error) => {
            next(error);
        });
});

// 도메인 등록 라우터
// 폼으로부터 온 데이터를 도메인 모델에 저장
router.post('/domain', (req, res, next) => {
    Domain.create({
        userId: req.user.id,
        host: req.body.host, 
        type: req.body.type,
        clientSecret: uuidv4(),
    })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;