const fs = require('fs')

// 쓰기 스트림 생성
const writeStream = fs.createWriteStream('./writeme2.txt')
// finish 이벤트 리스너
// 파일 쓰기가 종료되면 콜백 함수 호출
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료')
})

writeStream.write('처음 쓴 글\n')
writeStream.write('그 다음에 쓴 글')

// 데이터를 다 썼다면 end 메서드로 종료를 알림
// 이 때 finish 이벤트 발생
writeStream.end()