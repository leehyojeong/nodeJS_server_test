var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// connect-flash 미들웨어는 cookie-parser와 express-session을 사용하므로 이들보다는 뒤에 위치
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// views는 템플릿 파일들이 위차한 폴더를 지정하는 것
// res.render 메서드가 이 폴더를 기준으로 템플릿 엔진을 찾아서 렌더링
app.set('views', path.join(__dirname, 'views'));
// view engine은 어떤 종류의 템플릿 엔진을 사용할지 나타냄
app.set('view engine', 'pug');

// "Node.js 교과서 195페이지"
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(function(req, res, next){
//   console.log(req.url, '저도 미들웨어입니다');
//   next();
// });

// logger다음에 public이 오도록 변경
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieParser('secret code'));
// express-session 연결
// express-session은 세션 관리 시 클라이언트에 쿠키를 보냄(세션 쿠키)
// 쿠키를 안전하게 전송하기 위해 서명 필요 - 서명에는 secret 값 필요
app.use(session({
  resave: false, // 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false, // 세션에 저장할 내용이 없더라도 세션을 저장할지에 대한 설정(방문자 추적에 사용)
  secret: 'secret code', // 필수 항목으로 cookie-parser의 비밀키 같은 역할
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());

// Router 객체로 라우팅 분리
// 다른 미들웨어와 달리 주소가 첫 번째 인자
// 받은 주소에 해당하는 요청일 때만 미들웨어 동작
// use 대신 get, post, put, patch, delete 같은 http 메서드 사용 가능
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 에러 처리 미들웨어는 error라는 템플릿 파일 렌더링
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // req.app을 통해 app 객체에 접근
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
