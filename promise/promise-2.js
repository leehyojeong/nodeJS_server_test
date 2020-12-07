var log = function(msg){
    return new Promise(function(resolve, reject){
        console.log('Log : ',msg)
        resolve(msg)
    })
}

log('부팅 시작').then(function(result){
    return log('네트워크 설정 중...')
}).then(function(result){
    return log('유저 프로필 설정 중...')
}).then(function(result){
    return log('반갑습니다')
}).then(function(result){
    console.log('마지막 로그 : ',result)
}).catch(function(error){
    console.log(error)
})