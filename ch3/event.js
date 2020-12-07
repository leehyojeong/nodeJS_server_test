const EventEmitter = require('events')

const myEvent = new EventEmitter()

// on과 동일
myEvent.addListener('event1', ()=>{
    console.log('이벤트 1')
})
// on(이벤트명, 콜백) : 이벤트 이름과 발생 시의 콜백 연결 = 이벤트 리스닝
// event2처럼 이벤트 하나에 여러 개를 달 수 있음
myEvent.on('event2', ()=>{
    console.log('이벤트 2')
})
myEvent.on('event2', ()=>{
    console.log('이벤트 2 추가')
})

// 이벤트 호출 메서드
// 이벤트 이름을 인자로 주면 등록되어 있떤 이벤트 콜백 실행
myEvent.emit('event1')
myEvent.emit('event2')

// 한 번만 실행되는 이벤트
myEvent.once('event3', ()=>{
    console.log('이벤트 3')
})
myEvent.emit('event3')
myEvent.emit('event3')

myEvent.on('event4', ()=>{
    console.log('이벤트 4')
})
// 이벤트에 연결된 모든 이벤트 리스너 제거
myEvent.removeAllListeners('event4')
myEvent.emit('event4')

const listener = ()=>{
    console.log('이벤트 5')
}
myEvent.on('event5', listener)
// 이벤트에 연결된 리스너를 하나씩 제거
// off와 동일
myEvent.removeListener('event5', listener)
myEvent.emit('event5')

// 현재 연결된 리스너 개수
console.log(myEvent.listenerCount('event2'))