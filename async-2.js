var hello = function(name){
    return new Promise(function(resolve, reject){
        if(name==''){
            reject('이름이 입력되지 않았습니다')
        }
        resolve(name+'님 반갑습니다')
    })
}

// 변수에 async 함수 저장
var asyncHello = async function(name){
    // try-catch를 사용하여 reject 대비
    try{
        // promise가 끝날 때까지 무조건 기다림
        var result = await hello(name)
        console.log(result)
        return '비동기함수 종료'
    }catch(e){
        return e
    }
}

// 비동기 함수는 종료 시 암묵적으로 promise 반환
asyncHello('hyojung').then(function(result){
    console.log(result)
})