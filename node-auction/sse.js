const SSE = require('sse');

module.exports = (server)=>{
    const sse = new SSE(server); // 서버 객체 생성
    sse.on('connection', (client)=>{ // 클라이언트와 연결 시
        setInterval(()=>{
            // 1초마다 접속한 클라이언트에게 서버 시간 타임스탬프를 보냄(단, 문자열만 가능)
            client.send(new Date().valueOf().toString());
        }, 1000);
    });
};