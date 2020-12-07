const http = require('http')

// 쿠키가 name=zerocho;year=1994처럼 문자열 형식으로 오기 때문에
// 이를 { name; 'zerocho', year: '1994' }와 같이 객체로 바꾸는 함수
const parseCookies = (cookie = '') => {
    cookie
        .split(';') // ['mycookie=test']
        .map(v => v.split('=')) // [ ['mycookie', 'test'] ]
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k,v]) => {
            // console.log(acc, [k,v]) // {} [ 'mycookie', 'test' ]
            acc[k.trim()] = decodeURIComponent(v) // trim() 공백 제거 
            // console.log(acc) // { mycookie: 'test' }
            return acc
        }, {});
    
}

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie)
    // console.log(req.url, cookies)

    res.writeHead(200, { 'Set-Cookie': 'mycookie=test'})
    res.end('Hello Cookie')
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중')
})