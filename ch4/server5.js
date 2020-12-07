// server4.js 코드를 변경하여 서버가 사용자 정보를 관리하도록 만듦

const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring');
const { parse } = require('path');

const parseCookie = (cookie='') =>
    cookie
    .split(';')
    .map(v=>v.split('='))
    .map(([k,...vs])=>[k, vs.join('=')])
    .reduce((acc, [k,v])=>{
        acc[k.trim()] = decodeURIComponent(v)
        return acc
    }, {});

const session = {};

http.createServer((req, res)=>{
    const cookies = parseCookie(req.headers.cookie)
    
    if(req.url.startsWith('/login')){ 
        const {query} = url.parse(req.url)
        const {name} = qs.parse(query)
        const expires = new Date()
        expires.setMinutes(expires.getMinutes()+5)

        const randomInt = +new Date()
        // 사용자의 이름과 만료 시간은 session 객체에 대신 저장
        session[randomInt] = {
            name, 
            expires,
        };

        // 쿠키에 이름을 담아서 보내는 대신, randomInt라는 임의의 숫자 전송
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        // cookies.session이 존재하고 만료 기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져옴
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`)
    } else {
        fs.readFile('./server4.html', (err, data)=>{
            if(err) { throw err }
            res.end(data)
        })
    }
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중')
})
