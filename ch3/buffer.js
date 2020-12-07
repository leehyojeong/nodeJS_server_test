const buffer = Buffer.from('버퍼로 바꿀 내용')
console.log(buffer)
console.log(buffer.length)
console.log(buffer.toString())

// Buffer.from() : 문자열을 버퍼로 만듦
const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
const buffer2 = Buffer.concat(array)
console.log(buffer2.toString())

const buffer3 = Buffer.alloc(5)
console.log(buffer3)