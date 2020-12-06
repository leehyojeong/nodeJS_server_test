const s1 = Symbol()
const s2 = Symbol()
const aSymbol_1 = Symbol('a')
const aSymbol_2 = Symbol('a')

// 둘 다 false
console.log(s1===s2)
console.log(aSymbol_1===aSymbol_2)

// Symbol()로부터 반환되는 값은 항상 고유

// 같은 symbol을 사용하고 싶은 경우
// 1번 방법
const s3 = Symbol()
const s4 = s3
console.log(s3===s4)

// 2번 방법
const s5 = Symbol.for('symbol test')
const s6 = Symbol.for('symbol test')
console.log(s5===s6)

// symbol은 객체 고유의 property 값으로 사용하는 목적으로 쓰임
const a = Symbol()

const obj = {
    a: 'a입니다',
    [a]: '조금 다른 a 입니다'
}

console.log(obj.a)
console.log(obj[a])
