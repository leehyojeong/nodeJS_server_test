const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware)=>{
    const io = SocketIO(server, { path : '/socket.io' });
    app.set('io', io); // 라우터에서 io 객체를 쓸 수 있게 저장

    // of는 socket.io에 네임스페이스를 부여하는 메서드 
    // 같은 네임스페이스끼리만 데이터 전달
    const room = io.of('/room');
    const chat = io.of('/chat');

    // 모든 웹 소켓 연결 시마다 실행
    io.use((socket, next)=>{ // io.use 메서드에 미들웨어 장착 가능
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connection', (socket)=>{
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', ()=>{
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket)=>{
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer }} = req;
        const roomId = referer
            .split('/')[referer.split('/').length-1]
            .replace(/\?.+/,'');
        socket.join(roomId); // room에 들어가는 메서드
        socket.to(roomId).emit('join', { // to 메서드로 특정 방에 데이터를 보낼 수 있음
            user: 'system', 
            chat: `${req.session.color}님이 입장하셨습니다.`, // 세션 미들웨어와 socket.io를 연결했으므로 웹 소켓에서 세션 사용 가능
        });
        
        socket.on('disconnect', ()=>{
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId); // room에서 나가는 메서드

            const currentRoom = socket.adapter.rooms[roomId]; // 현재 방
            const userCount = currentRoom ? currentRoom.length : 0; // 현재 방 사람 수
            if(userCount === 0){ // 0명이면 방 제거 HTTP 요청 전송
                axios.delete(`http://localhost:8005/room/${roomId}`)
                    .then(()=>{
                        console.log('방 제거 요청 성공');
                    })
                    .catch((error)=>{
                        console.error(error);
                    });
            }else{ // 0명이 아니면 퇴장 데이터 전송
                socket.to(roomId).emit('exit', {
                    user: 'system', 
                    chat: `${req.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
    });
};