// spread syntax trick 4
// optional spreading

const available = true

const obj = {
    user: 'James',
    age: 16,
    ...available && {key: 'password'}
}
// && 연산에서 available 값이 true이기 때문에 뒤의 key값이 반환되고 
// 이후 전개 구문(...)이 실행될 때 key 값이 저장됨

console.log(obj)