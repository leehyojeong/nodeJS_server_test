const fs = require('fs')

fs.readFile('./readme.txt', (err, data)=>{
    if(err){
        throw err
    }

    console.log(data) // readFile의 결과물은 버퍼 형식으로 제공
    console.log(data.toString())
})