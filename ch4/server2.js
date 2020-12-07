const http = require('http')
const fs = require('fs')

http.createServer((req,res)=>{
    fs.readFile('./server2.html', (err, data)=>{
        if(err){ throw err }
        res.end(data)
    })
}).listen(8080, ()=>{
    // 포트만 다르게 해서 동시에 여러 노드 서버 실행 가능
    // 현재 예제 서버는 클라이언트가 누군지 모르는 상태
    // 요청이 올 때 모두에게 같은 응답
    console.log('8080번 포트에서 서버 대기 중')
})