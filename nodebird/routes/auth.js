const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const { authorize } = require('passport');

const router = express.Router();

// 회원가입 라우터
router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const { email, nick, password } = req.body;
    
    try{
        // 기존에 같은 이메일로 가입한 사용자가 있는지 조회
        const exUser = await User.find({ where: { email }});
        if(exUser){ 
            req.flash('joinError', '이미 가입된 이메일입니다.'); // 있으면 메시지를 설정하고
            return res.redirect('/join'); // 회원가입 페이지로 돌려보냄
        }

        // 없다면
        const hash = await bcrypt.hash(password, 12); // 비밀번호 암호화
        // hash의 두 번째 인자는 pbkdf2의 반복 횟수와 비슷한 기능(12~31 사용)
        await User.create({ // 사용자 정보 생성
            email,
            nick,
            password: hash,
        });

        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});

// 로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next) => {
    // passport.authenticate('local') 미들웨어가 로컬 로그인 전략 수행
    // 미들웨어인데 라우터 미들웨어 안에 있음
    // 미들웨어에 사용자 정의 기능을 추가하고 싶을 때 이렇게 사용
    passport.authenticate('local', (authError, user, info) => {
        if(authError){ // 첫 번째 인자값 authError가 있다면 로그인 전략 실패
            console.error(authError);
            return next(authError);
        }

        if(!user){ 
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        
        // 두 번째 인자값 user가 있다면 로그인 전략 성공 후 req.login 메서드 호출
        // Passport는 req 객체에 login, logout 메서드 추가
        return req.login(uesr, (loginError)=>{ // req.login은 serializeUser 호출
            // 첫 번째 인자 user가 serializeUser로 넘어감
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙임
});

// 로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(); // req.user 객체 삭제
    req.session.destroy(); // req.session 객체의 내용 삭제
    res.redirect('/'); // 세션 정보를 지운 후 메인 페이지로 돌아감
});

// 카카오 로그인 전략이 대부분 로직을 처리하므로 라우터가 상대적으로 간단
// GET /auth/kakao로 접근하면 카카오 로그인 과정 시작
router.get('/kakao', passport.authenticate('kakao'));

// GE /auth/kakao에서 카카오 로그인 창으로 리다이렉트하고
// 결과를 GET /auth/kakao/callback으로 받음

// 카카오 로그인은 내부적으로 req.login을 호출하므로 
// 로컬 로그인과 달리 직접 호출할 필요가 없음
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/', // 로그인 실패 시 이동
}), (req, res) => { // 성공 시 이동
    res.redirect('/');
});

module.exports = router;