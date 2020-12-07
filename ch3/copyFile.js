// 노드 8.5 버전에서 파일 복사 방법 새롭게 추가
// createReadStream과 createWriteStream을 pipe하지 않아도 됨

const fs = require('fs')

// readme4.txt와 동일한 내용의 writeme4.txt 파일 생성
fs.copyFile('readme4.txt', 'writeme4.txt', (err)=>{
    if(err){
        return console.log(err)
    }

    console.log('복사 완료')
})