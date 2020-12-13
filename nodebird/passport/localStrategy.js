const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => { // 실제 전략 수행 함수
        // 세 번째 done 함수는 passport.authenticate의 콜백 함수
        try{
            const exUser = await User.findOne({ where: { email }}); // 데이터베이스에서 일치하는 이메일이 있는지 찾음
            if(exUser){ // 있으면 compare 함수로 비밀번호 비교
                const result = await bcrypt.compare(password, exUser.password);
                if(result){ // 일치하면 done 함수의 두 번째 인자로 사용자 정보 넣어 보냄
                    done(null, exUser);
                }else{ // 두 번째 인자를 사용하지 않는 경우는 로그인에 실패했을 때 뿐임
                    // 첫 번째 인자는 서버쪽 에러가 발생한 경우
                    // 세 번째 인자는 "비밀번호 일치하지 않는 경우", "존재하지 않는 회원인 경우"와 같이 
                    // 사용자 에러가 발생한 경우
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }
        }catch(error){
            console.error(error);
            done(error); // 서버 에러
        }
    }));
};