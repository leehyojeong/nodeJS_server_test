const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// 클러스터에는 마스터 프로세스와 워커 프로세스 존재
if(cluster.isMaster){
    // 마스터 프로세스는 CPU 개수만큼 워커 프로세스 만들고 8080 포트에서 대기
    console.log(`마스터 프로세스 아이디: ${process.pid}` );
    // CPU 개수만큼 워커 생산
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }

    // 워커가 종료되었을 때 
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다`);

        // 워커가 죽을 때마다 새로운 워커가 하나씩 생성
        // 이렇게 오류를 막는 것은 좋지 않은 방법이지만 
        // 예기치 못한 에러로 서버가 종료되는 현상을 막을 수 있음
        cluster.fork();
    });
}else{
    // 요청이 들어오면 만들어진 워커 프로세스에 요청 분배
    // 워커 프로세스가 실질적인 일을 하는 프로세스
    // 워커들이 포트에서 대기
    http.createServer((req, res)=>{
        res.write('<h1>Hello Node</h1>');
        res.end('<p>Hello Cluster</p>');

        // 1초 후 워커가 종료되게 만듦
        // 내 컴퓨터는 코어 개수가 8개이기 때문에 워커 개수 8개 생성
        // 8번까지는 오류가 발생해도 서버가 정상 작동
        setTimeout(()=>{
            process.exit();
        }, 1000);
    }).listen(8080);

    console.log(`${process.pid}번 워커 실행`);
}