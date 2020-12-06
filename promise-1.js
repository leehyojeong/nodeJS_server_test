// 변수에 함수 저장
var loading = function(path){
    // 함수 실행 시 새 promise 객체 생성
    // promise 생성 시 반드시 2개의 매개변수를 갖는 콜백함수 전달
    // 성공 시 resolve 호출, 실패 시 reject 호출
    return new Promise(function(resolve, reject){
        console.log('전달받은 경로 : ',path)

        if(path==='/system/'){
            reject('시스템에는 접근이 불가능합니다.')
        }

        resolve(path+'sample.txt')
    })
    // 생성은 되었지만 아직 작업이 진행되지 않았으므로 현재 pending 상태
}

// loading().then().catch() 형태
loading('/system/').then(function(result){
    console.log('완료 : ', result)
}).catch(function(error){
    console.log('error : ',error)
})