const crypto = require('crypto')

// randomBytes로 64바이트 길이의 문자열 생성
crypto.randomBytes(64,(err, buf)=>{
    const salt = buf.toString('base64')
    console.log('salt:',salt)

    // 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘
    crypto.pbkdf2('비밀번호:',salt,100000,64,'sha512',(erry,key)=>{
        console.log('password:',key.toString('base64'))
    })
})