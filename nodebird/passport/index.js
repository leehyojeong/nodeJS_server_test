const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {

    // serializeUser는 req.session 객체에 어떤 데이터를 저장할지 선택
    // user를 인자로 받아 done 함수의 두 번째 인자 user.id로 넘김
    passport.serializeUser((user, done) => {
        // done의 첫 번째 인자는 에러 발생 시 사용
        // 세션에 사용자 정보를 모두 저장하면 세션 용량이 커지고, 데이터 일관성 문제 발생
        // 따라서 사용자 아이디만 저장
        done(null, user.id);
    });

    // deserializeUser는 매 요청 시 실행
    // passport.session() 미들웨어가 deserializeUser 메서드 호출

    // // serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보 조회
    // passport.deserializeUser((id, done) => {
    //     User.findOne({ where: {id}})
    //         .then(user => done(null, user)) // 조회한 정보를 req.user에 저장
    //         .catch(err => done(err));
    //     // req.user를 통해 로그인한 사용자 정보를 가져올 수 있음
    // });

    // routes/user.js에서 팔로잉 관계가 생겼기 때문에 req.user에도 팔로워와 팔로잉 목록 저장
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: {id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    // serializeUser는 사용자 정보 객체를 세션에 아이디로 저장
    // deserializeUser는 세션에 저장한 아이디로 사용자 정보 객체 불러옴
    // 세션에 불필요한 데이터를 담아두지 않기 위한 과정

    local(passport);
    kakao(passport);
};