const fs = require('fs')

// 경로, 옵션, 콜백
// F_OK : 파일 존재 여부, R_OK : 읽기 권한 여부, W_OK : 쓰기 권한 여부
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(err){
        if(err.code === 'ENOENT'){ // 파일/폴더가 없을 때 에러 코드
            console.log('폴더 없음')
        
            // 이미 폴더가 있다면 에러가 발생하므로 access()로 미리 확인
            fs.mkdir('./folder',(err)=>{
                if(err){
                    throw err
                }

                console.log('폴더 만들기 성공')

                // 파일이 없으면 파일 생성 후 아이디를 가져옴
                // 쓰려면 w, 읽으려면 r, 추가하려면 a
                fs.open('./folder/file.js', 'w', (err, fd) => {
                    if(err){
                        throw err
                    }

                    console.log('빈 파일 만들기 성공', fd)
                    fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
                        if(err){
                            throw err
                        }

                        console.log('이름 바꾸기 성공')
                    })
                })
            })
        } else {
            throw err
        }
    } else {
        console.log('이미 폴더 있음')
    }
})