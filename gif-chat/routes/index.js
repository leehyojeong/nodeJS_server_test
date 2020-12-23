const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

// router.get('/', (req, res)=>{
//     res.render('index');
// });

// 채팅방 목록이 보이는 메인 화면을 렌더링하는 라우터
router.get('/', async(req, res, next)=>{
    try{
        const rooms = await Room.find({});
        res.render('main', { rooms, title: 'GIF 채팅방', error: req.flash('roomError') });
    }catch(error){
        console.error(error);
        next(error);
    }
});

// 채팅방 생성 화면을 렌더링하는 라우터
router.get('/room', (req, res)=>{
    res.render('room', { title: 'GIF 채팅방 생성'} );
});

// 채팅방을 만드는 라우터
router.post('/room', async(req, res, next)=>{
    try{
        const room = new Room({
            title: req.body.title, 
            max: req.body.max,
            owner: req.session.color,
            password: req.body.password,
        });

        const newRoom = await room.save();
        const io = req.app.get('io');

        io.of('/room').emit('newRoom', newRoom); // room 네임스페이스에 연결한 모든 클라이언트에게 데이터를 보내는 메서드
        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    }catch(error){
        console.error(error);
        next(error);
    }
});

// 채팅방을 렌더링하는 라우터
router.get('/room/:id', async(req, res, next)=>{
    try{
        const room = await Room.findOne({ _id: req.params.id });
        const io = req.app.get('io');
        if(!room){ // 방이 존재하는지 확인
            req.flash('roomError', '존재하지 않는 방입니다.');
            return res.redirect('/');
        }
        if(room.password && room.password !== req.query.password){ // 비밀방인 경우 비밀번호가 맞는지 확인
            req.flash('roomError', '비밀번호가 틀렸습니다.');
            return res.redirect('/');
        }

        const { rooms } = io.of('/chat').adapter; // 방 목록
        // ... adapter.rooms[req.params.id]로 해당 방의 소켓 목록을 알 수 있음
        // 소켓의 수를 세서 참가 인원의 수를 알아냄
        if(rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length){ // 허용 인원 확인
            req.flash('roomError', '허용 인원이 초과하였습니다.');
            return res.redirect('/');
        }
        return res.render('chat', {
            room,
            title: room.title,
            chats: [],
            user: req.session.color,
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
});

// 채팅방 삭제 라우터
router.delete('/room/:id', async(req, res, next)=>{
    try{
        // 채팅방과 내용 삭제
        await Room.remove({ _id: req.params.id });
        await Chat.remove({ room: req.params.id });
        req.send('ok');
        
        // 삭제 후 2초 뒤에 웹 소켓으로 room 네임스페이스에 방이 삭제되었음을 알림
        setTimeout(()=>{
            req.app.get('io').of('/room').emit('removeRoom', req.params.id);
        }, 2000);
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;