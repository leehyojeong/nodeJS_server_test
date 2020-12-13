// Passport는 req 객체에 isAuthenticated 메서드 추가
// 로그인 중이면 isAuthenticated()가 true, 아니면 false

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
}