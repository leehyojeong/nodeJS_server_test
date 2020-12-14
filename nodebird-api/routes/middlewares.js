// Passport는 req 객체에 isAuthenticated 메서드 추가
// 로그인 중이면 isAuthenticated()가 true, 아니면 false

const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) { // 비밀키가 일치하지 않아서 인증받지 못한 경우
        if(error.name === 'TokenExpiredError') { // 유효기간 초과
            return res.status(419).json({
                code: 419, 
                message: '토큰이 만료되었습니다',
            }); 
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다',
        });
    }
};