process.on('uncaughtException', (err)=>{
    console.log('예기치 못한 에러', err)
})

setInterval(()=>{
    throw new Error('서버 고장')
},1000)

setTimeout(()=>{
    console.log('정상 작동')
},1500)