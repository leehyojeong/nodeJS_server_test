const zlib = require('zlib')
const fs = require('fs')

const readStream = fs.createReadStream('readme4.txt')
const zlibStream = zlib.createGzip()
const writeStream = fs.createWriteStream('readme4.txt.gz')

// 압축을 거친 후 파일로 쓰여짐
readStream.pipe(zlibStream).pipe(writeStream)