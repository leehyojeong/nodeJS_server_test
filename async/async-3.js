// promise 패턴과 비교하기 위한 async 패턴
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

// 작업을 하나하나 기다리기 때문에 어떤 비동기 작업이라도 
// 코드를 작성한 순서대로 실행
var worker = async function(){
    console.log(await work_1())
    console.log(await work_2())
    console.log(await work_3())
    return '작업 완료'
}

worker().then(function(result){
    console.log(result)
})