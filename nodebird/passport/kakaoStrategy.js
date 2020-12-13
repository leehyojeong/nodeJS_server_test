const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디
        // 노출되면 안되기 때문에 아이디를 발급받아 .env 파일에 저장
        callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            // 기존에 카카오로 로그인한 사용자가 있는지 조회
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' }});
            if(exUser){ // 있으면 done 함수 호출
                done(null, exUser);
            }else{ // 없으면 회원가입 진행
                // 카카오는 인증 후 callbackURL에 적힌 주소로 accessToken, refreshToken과 profile을 보내줌
                // profile에 사용자 정보가 들어 있음
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};