const A = require('./globalA')
// globalA 모듈의 함수는 global.message 값 반환
// globalB에서는 global 객체의 message 속성에 값 대입하고 globalA 모듈 함수 호출

// 결과적으로 globalB에서 넣은 값을 globalA에서도 접근 가능
global.message = '안녕'
console.log(A())