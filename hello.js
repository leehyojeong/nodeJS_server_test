var express = require('express');

// 애플리케이션 생성
var app = express();
// 로컬 3000번 포트에서 동작하는 웹서버
var port = 3000;
// app.get() 함수로 와일드카드 라우팅 정의
app.get('*', function(req, res){
    res.end('Hello World');
});
// 문자열 형식으로 URL 패턴에 대한 정규 표현식을 받음
// 이 예제에서는 와일드카드 * 문자로 모든 URL 처리

app.listen(port, function(){
    console.log('The server is running, '+
    ' please, open your browser at http://localhost:%s', port);
});
