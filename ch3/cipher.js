const crypto = require('crypto')


const cipher = crypto.createCipher('aes-256-cbc', '열쇠') // 암호화 알고리즘과 키 입력
let result = cipher.update('암호화할 문장', 'utf8', 'base64') // 암호화할 대상, 대상의 인코딩, 출력 결과물의 인코딩
result += cipher.final('base64') // 출력 결과물의 인코딩을 넣으면 암호화 완료
console.log('암호화:', result)

const decipher = crypto.createDecipher('aes-256-cbc', '열쇠') // 암호화할 때 사용했던 알고리즘과 키를 그대로 입력
let result2 = decipher.update(result, 'base64', 'utf8') // 암호화된 문장, 문장의 인코딩, 복호화할 인코딩
result2 += decipher.final('utf8') // 복화화 결과물의 인코딩을 넣으면 완료
console.log('복호화:', result2)