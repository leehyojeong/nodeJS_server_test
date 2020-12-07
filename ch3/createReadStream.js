const fs = require('fs')

// 첫 번째 인자 : 읽을 파일 경로
// 두 번째 인자 : 버퍼의 크기를 지정할 수 있는 옵션 객체(기본값 64KB)
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16}); // 16B
const data = []

// readStream은 이벤트 리스너를 붙여서 사용(data, end, error)
// 16B씩 읽도록 설정했으므로 파일의 크기가 16B보다 크다면 여러 번 발생
readStream.on('data', (chunk)=>{
    data.push(chunk)
    console.log('data:', chunk, chunk.length)
})

// 파일을 다 읽으면 end 이벤트 발생
readStream.on('end', ()=>{
    console.log('end:', Buffer.concat(data).toString())
})

readStream.on('error',(err)=>{
    console.log('error:', err)
})