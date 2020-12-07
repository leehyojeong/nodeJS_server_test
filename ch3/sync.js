// sync 메서드를 사용하면 요청이 수백 개 이상 들어왔을 때 성능 문제 발생
const fs = require('fs')

console.log('시작')

let data = fs.readFileSync('./readme2.txt')
console.log('1번', data.toString())
data = fs.readFileSync('./readme2.txt')
console.log('2번', data.toString())
data = fs.readFileSync('./readme2.txt')
console.log('3번', data.toString())

console.log('끝')