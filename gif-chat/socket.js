const SocketIO = require('socket.io');

module.exports = (server) => {
    // socket.io를 불러와서 익스프레스 서버와 연결
    // 두 번째 옵션 객체로 클라이언트와 연결할 수 있는 경로를 넣음
    const io  = SocketIO(server, { path: '/socket.io' }); // path 옵션

    io.on('connection', (socket)=>{ // 클라이언트가 접속했을 때 발생
        // connection 이벤트는 콜백으로 소켓 객체 제공
        
        const req = socket.request; // request 속성으로 요청 객체에 접근
        // socket.request.res로는 응답 객체에 접근 가능

        const ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip); // socket.id로 소켓 고유의 아이디 가져올 수 있음
        
        socket.on('disconnect', () => { // 클라이언트가 연결을 끊을 때 
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) => {
            console.error(error);
        });
        socket.on('reply', (data) => { // 사용자가 직접 만든 이벤트
            console.log(data);
        });
        socket.interval = setInterval(() => {
            // 데이터를 클라이언트한테 보냄
            // 클라이언트가 아래 이벤트를 받으려면 news 이벤트 리스터를 갖고 있어야 함
            socket.emit('news', 'Hello Socket.IO'); // 이벤트 이름, 데이터
        }, 3000);
    });
};