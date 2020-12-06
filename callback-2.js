// path에는 문자열, done에는 함수
var loading = function(path, done){
    console.log('전달받은 경로 : ', path)
    // 콜백함수 done 호출
    done(path+'sample.txt')
}

// 실제 호출
loading('./folder/', function(result){
    console.log('완료 : ', result)
})