var hello = function(name){
    return new Promise(function(resolve, reject){
        if(name===''){
            reject('이름이 입력되지 않았습니다')
        }
        resolve(name+'님 반갑습니다')
    })
}

hello('hyojung').then(function(result){
    console.log(result)
}).catch(function(e){
    console.log('error : '+e)
})