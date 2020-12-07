// 콜백 함수 패턴과 프로미스 패턴을 비교하기 위한 코드
var log = function(msg, result){
    console.log('Log : ', msg)
    result(msg)
}

log('부팅 시작', function(result){
    log('네트워크 설정 중...', function(result){
        log('유저 프로필 설정 중...',function(result){
            log('반갑습니다',function(result){
                console.log('마지막 로그 : ',result)
            })
        })
    })
})