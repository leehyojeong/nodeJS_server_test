// async 패턴과 비교하기 위한 promise 패턴
var work_1 = function(){
    return new Promise(function(resolve, reject){
        resolve('첫 번째 작업 완료')
    })
}

var work_2 = function(){
    return new Promise(function(resolve, reject){
        resolve('두 번째 작업 완료')
    })
}

var work_3 = function(){
    return new Promise(function(resolve, reject){
        resolve('세 번째 작업 완료')
    })
}

work_1().then(function(result1){
    console.log(result1)
    return work_2()
}).then(function(result2){
    console.log(result2)
    return work_3()
}).then(function(result3){
    console.log(result3)
    console.log('작업 완료')
})