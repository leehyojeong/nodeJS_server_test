const fs = require('fs')

// 폴더 안의 내용물 확인
fs.readdir('./folder', (err, dir)=>{
    if(err){
        throw err
    }
    console.log('폴더 내용 확인', dir)

    // 파일이 없으면 에러가 발생하므로 있는지 먼저 확인
    fs.unlink('./folder/newFile.js', (err)=>{
        if(err){
            throw err
        }
        console.log('파일 삭제 성공')

        // 폴더 안에 파일이 있다면 에러가 발생하므로 내부 파일을 모두 지우고 호출
        fs.rmdir('./folder', (err)=>{
            if(err) { throw err }
            console.log('폴더 삭제 성공')
        })
    })
})