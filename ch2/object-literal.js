// 객체 리터럴
var sayNode = function(){
    console.log('Node')
}

var es = 'ES'
var oldObject = {
    sayJS: function(){
        console.log('JS')
    },
    sayNode: sayNode
}

oldObject[es+6] = 'Fantastic'

oldObject.sayNode()
oldObject.sayJS()
console.log(oldObject.ES6)

// oldObject 객체에 동적으로 속성 추가 
// 앞의 코드를 다음과 같이 다시 쓸 수 있음
const newObject = {
    sayJS(){
        console.log('JS')
    },
    sayNode,
    [es+6]: 'Fantastic'
}

newObject.sayJS()
newObject.sayNode()
console.log(newObject.ES6)