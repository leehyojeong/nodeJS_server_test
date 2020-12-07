const fs = require('fs')

fs.writeFile('./writeme.txt', '입력한 내용', (err)=>{
    if(err){
        throw err
    }

    fs.readFile('./writeme.txt',(err,data)=>{
        if(err){
            throw err
        }

        console.log(data.toString())
    })
})