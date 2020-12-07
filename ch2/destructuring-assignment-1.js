// 비구조화 할당
var candyMachine = {
    status: {
        name: 'node',
        count: 5
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    }
};

var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count

// 다음과 같이 바꿀 수 있음
const candyMachine2 = {
    status: {
        name: 'node',
        count: 5
    },
    getCandy2(){
        this.status.connt--;
        return this.status.connt;
    }
};

const { getCandy, status: {count}} = candyMachine;