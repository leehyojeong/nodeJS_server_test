const http = require('http')
const fs = require('fs')

const users = {};

http.createServer((req, res)=>{
    if(req.method==='GET'){
        if(req.url==='/'){
            // 페이지를 요청하는 것이므로 HTML 파일 읽어서 전송
            return fs.readFile('./restFront.html', (err, data)=>{
                if(err){ throw err; }
                res.end(data);
            });
        }else if(req.url==='/about'){
            // 페이지를 요청하는 것이므로 HTML 파일 읽어서 전송
            return fs.readFile('./about.html', (err, data)=>{
                if(err) {throw err;}
                res.end(data);
            });
        }else if(req.url==='/users'){
            // ajax 요청을 처리하는 /users에서는 users 데이터를 전송
            return res.end(JSON.stringify(users));
        }

        // 그 외의 GET 요청은 css, js 파일을 요청하는 것으로 찾아서 보내주고
        // 없으면 404 NOT FOUND 에러 응답
        return fs.readFile(`.${req.url}`, (err, data)=>{
            if(err){
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
    }else if(req.method==='POST'){
        // post와 put 메서드는 클라이언트로부터 데이터를 받으므로 특별한 처리 필요
        if(req.url==='/users'){
            let body = '';
            req.on('data', (data)=>{
                body+=data;
            });
            return req.on('end', ()=>{
                console.log('POST 본문(Body):', body);
                // 문자열인 body를 JSON으로 만드는 과정 필요
                const {name} = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        }
    }else if(req.method==='PUT'){
        if(req.url.startsWith('/users/')){
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data)=>{
                body += data;
            });
            return req.on('end', ()=>{
                console.log('PUT 본문(Body):', body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        }
    }else if(req.method==='DELETE'){
        if(req.url.startsWith('/users/')){
            // 주소에 들어 있는 키에 해당하는 사용자 제거
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    // 해당하는 주소가 없는 경우 404 NOT FOUND 에러 응답
    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중')
})