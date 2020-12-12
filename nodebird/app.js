const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const pageRouter = require('./routes/page');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001); // 앱 8001번 포트에 연결

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 비밀키를 하드코딩한 경우 소스 코드 유출 시 키도 같이 유출되므로 별도로 관리해야 함
// 이를 위한 패키지가 dotenv
// 비밀키는 .env 파일에 모아두고, dotenv가 .env 파일을 읽어 process.env 객체에 넣음
// app.use(cookieParser('nodebirdsecret')); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    // secret: 'nodebirdsecret',
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

app.use('/', pageRouter);

// 404 미들웨어
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// 앱 8001번 포트에 연결
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});