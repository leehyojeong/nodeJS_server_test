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
    // result에는 await 후 돌아오는 결과가 저장됨
    // 오른쪽의 hello가 기다려야할 기능
    // promise가 resolve되면 결과값이 왼쪽 변수에 대입
    // promise가 아닌 경우 해당 값 자체가 반환됨
    var result = await hello(name)
    console.log(result)

    // promise가 reject되면 결과가 저장되지 않고
    // 해당 오류를 그 자리에서 throw
    // try-catch를 사용하여 reject 대비
}

asyncHello('hyojung')

// 에러 발생
// asyncHello('')