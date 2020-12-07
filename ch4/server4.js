// 이 방법은 application 탭에서 쿠키가 노출되어 있기 때문에 위험함
// 쿠키가 조작될 위험도 있ㅇ므
// 이름과 같은 민감한 개인정보는 쿠키에 넣지 않는 것이 좋음

const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const parseCookies = (cookie = '') => 
    cookie.split(';')
        .map(v=>v.split('='))
        .map(([k, ...vs])=>[k, vs.join('=')])
        .reduce((acc, [k,v])=>{
            acc[k.trim()] = decodeURIComponent(v)
            return acc
        }, {});

http.createServer((req, res)=>{
    const cookies = parseCookies(req.headers.cookie)
    // 주소가 /logi과 /로 시작하는 것까지 두 개이기 때문에 주소별로 분기 처리
    if(req.url.startsWith('/login')){
        // 각 주소와 주소에 딸려오는 쿼리 분석
        const { query } = url.parse(req.url)
        const { name } = qs.parse(query)
        
        // 쿠키 만료 시간 5분 후로 설정
        const expires = new Date()
        expires.setMinutes(expires.getMinutes()+5)

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
            // 브라우저는 이 응답 코드를 보고 해당 주소로 리다이렉트
        });
        res.end()
    } 
    // 주소가 /로 시작할 때로 cookie가 먼저 있는지 확인
    else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`)
    } else {
        // 쿠키가 없다면 로그인할 수 있는 페이지 전송
        fs.readFile('./server4.html', (err, data)=>{
            if(err) { throw err }
            res.end(data)
        });
    }
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중')
})