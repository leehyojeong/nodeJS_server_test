const WebSocket = require('ws');

module.exports = (server) => {
    // 익스프레스 서버를 웹 소켓 서버와 연결
    const wss = new WebSocket.Server({ server });

    // 웹 소켓은 이벤트 기반으로 작동
    // 실시간으로 데이터를 전달받으므로 항상 대기
    wss.on('connection', (ws, req)=>{ // connection 이벤트는 클라이언트가 서버와 웹 소켓 연결을 맺을 때 발생
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // 클라이언트의 IP를 알아내는 방법 중 하나

        console.log('새로운 클라이언트 접속', ip);

        ws.on('message', (message)=>{
            console.log(message);
        });
        ws.on('error', (error)=>{
            console.error(error);
        });
        ws.on('close', ()=>{
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        const interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){ // 웹 소켓의 네 가지 상태 : CONNECTING, OPEN, CLOSING, CLOSED
                // OPEN일 때만 에러 없이 메시지를 보낼 수 있음
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        }, 3000);

        ws.interval = interval;        
    });
};