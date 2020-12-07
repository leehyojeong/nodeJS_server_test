const fs = require('fs')

const readStream  = fs.createReadStream('readme4.txt')
const writeStream = fs.createWriteStream('writeme3.txt')

// readStream으로 파일을 읽고 그 스트림을 전달받아 
// writeStream으로 파일을 쓸 수 있음
// 스트림끼리 연결하는 것을 "파이핑"이라고 함
readStream.pipe(writeStream)