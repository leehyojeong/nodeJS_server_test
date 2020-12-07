// listen 메서드에 콜백 함수를 넣는 대신
// 서버에 listening 이벤트 리스너를 붙여도 됨

const http = require('http')

const server = http.createServer((req, res)=>{
    // 클라이언트로 보낼 데이터
    // 지금은 html 문자열을 보냈지만 버퍼를 보낼 수도 있음
    // 여러 번 호출 가능
    res.write('<h1>Hello Node</h1>')
    // 응답을 종료하는 베서드
    // 인자가 있다면 해당 데이터를 클라이언트로 보내고 응답 종료
    res.end('<p>Hello Server</p>')
})

server.listen(8080)
server.on('listening', ()=>{
    console.log('8080번 포트에서 서버 대기 중')
})
server.on('error', (err)=>{
    console.log(err)
})