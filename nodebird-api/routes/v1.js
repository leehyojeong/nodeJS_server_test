const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

// 토큰을 발급하는 라우터
router.post('/token', async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.find({
            where: { clientSecret },
            include: {
                model: User,
                attribute: [ 'nick', 'id' ],
            },
        });

        // 도메인이 등록되지 않은 경우
        if(!domain){
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
            });
        }

        // 토큰 발급
        const token = jwt.sign({
            // 첫 번째 인자는 토큰 내용
            id: domain.user.id,
            nick: domain.user.nick, 
        }, process.env.JWT_SECRET, { // 두 번째 인자는 토큰 비밀키
            // 세 번째 인자는 토큰 설정
            expiresIn: '1m', // 유효기간
            issuer: 'nodebird', // 발급자
        });

        // 등록된 도메인 경우 토큰 발급 후 응답
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

// 사용자가 토큰을 테스트해볼 수 있는 라우터
router.get('/test', verifyToken, (req, res) => { // 토큰을 검증하는 미들웨어를 거침
    res.json(req.decoded); // 검증 성공 시 토큰 내용물로 응답
});

module.exports = router;