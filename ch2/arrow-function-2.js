var relationship1 = {
    name: 'zero',
    friends: ['nero','hero','xero'],
    logFriends: function(){
        var that = this // relationship1을 가리키는 this를 that에 저장

        // 각자 다른 함수 스코프의 this를 가지므로 that 변수를 사용하여 
        // relationship1에 간접적으로 접근
        this.friends.forEach(function(friend){
            console.log(that.name, friend)
        })
    }
}
relationship1.logFriends()

const relationship2 = {
    name: 'zero',
    friends: ['nero','hero','xero'],
    logFriends(){
        // 화살표 함수를 사용하여 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있음
        // 상위 스코프의 this를 물려받는 것
        this.friends.forEach(friend=>{
            console.log(this.name, friend)
        })
    }
}
relationship2.logFriends()