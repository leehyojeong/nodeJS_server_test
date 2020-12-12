const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }
        
        // MongoDB는 주소를 사용하여 연결
        mongoose.connect('mongodb://hyojung:temeraire@localhost:27017/admin', {
            dbName: 'nodejs',
        }, (error) => {
            if(error){
                console.log('몽고디비 연결 에러', error);
            } else{
                console.log('몽고디비 연결 성공');
            }
        });
    }; // const connect

    connect();
    
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect(); // 연결 재시도
    });

    // 연결할 user 스키마와 comment 스키마
    require('./user');
    require('./comment');
}