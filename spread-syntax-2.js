// spread syntax trick 2
// immutable data pattern

const a = {
    name: 'Tom',
    age: 10
}

// console.log(a.name)

// 아래 코드는 a와 b 모두의 name을 Jerry로 변경
const b = a
b.name = 'Jerry'

// a가 참조하고 있는 객체를 얕은 복사하여 c에 할당
// a가 참조하고 있는 객체 내부에 원시값이 아닌 다른 객체(nested object)가 있다면
// 해당 객체의 참조는 그대로 유지되기 때문에 얕은 복사
const c = {...a}

console.log(a===b) // true
console.log(a===c) // false

c.name = 'Angela'

console.log(a.name)
console.log(b.name)

console.log(c.name)
console.log(a.name)