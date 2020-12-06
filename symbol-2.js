Number.isNumber = arg => {
    return typeof arg === 'number'? '숫자' : '숫자 아님'
}

const num = 10
console.log(Number.isNumber(num))

// 위와 같이 만들어서 사용하다가 표준으로 만들어진 isNumber 함수에서 
// 반환값이 true, false로 바뀌면 모두 다시 표준에 맞춰 다시 작성해야함(문제)

// symbol을 쓰는 경우 라이브러리 개발 전에 symbol이 있었다면 
// 아래와 같이 구현하여 고유하게 구분 가능
const isNumber_s = Symbol()

Number[isNumber_s] = arg => {
    return typeof arg === 'number'? '숫자' : '숫자 아님'
}

const num_s = 20
if(Number[isNumber_s](num) === '숫자'){
    console.log(num_s+'는 숫자입니다')
}
// symbol을 객체의 property로 지정하면 고유하게 지정되기 때문에 
// isNumber_s가 표준으로 채택된다고 해도 사용자들은 그대로 symbol을 통해 접근하여 문제 없음
