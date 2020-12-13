// 다른 사용자를 팔로우할 수 있는 /user/:id/follow 라우터
// :id 부분에는 req.params.id가 들어감

const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// 다른 사용자를 팔로우할 수 있는 /user/:id/follow 라우터
router.post('/:id/follow', isLoggedIn, async (req, res, nect) => {
    try{
        // 팔로우할 사용자를 데이터베이스에서 조회
        const user = await User.findOne({ where: { id: req.user.id }});
        // 시퀄라이즈에서 추가한 addFollowing 메서드로 현재 로그인한 사용자와의 관계 지정
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
    }catch(error){
        console.error(error);
        next(error);
    }
});

// [추가 기능(1)] 팔로잉 끊기
router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where: { id: req.user.id }});
        await user.removeFollowing(parseInt(req.params.id));
        res.send('success');
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;