const express = require('express');
const axios = require('axios');
const router = express.Router();

// 사용자가 토큰 인증 과정을 테스트해보는 라우터
router.get('/test', async(req, res, next)=>{
    try{
        if(!req.session.jwt){ // 세션에 토큰이 없는 경우
            const tokenResult = await axios.post('http://localhost:8002/v1/token', { // post ~ 라우터로부터 토큰 발급받음
                clientSecret: process.env.CLIENT_SECRET, // 이 때 http 요청 본문에 클라이언트 비밀키를 실어 보냄
            });
            if(tokenResult.data && tokenResult.data.code === 200){ // 토큰 발급 성공
                req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
            }
            else{ // 토큰 발급 실패
                return res.json(tokenResult.data); // 발급 실패 사유 응답
            }
        }

        // 발급받은 토큰 테스트
        // 다른 서버로 요청을 보내는 데 axios 패키지 사용
        const result = await axios.get('http://localhost:8002/v1/test', { 
            // 해당 주소에 헤더와 함께 GET 요청을 보냄
            headers: { authorization: req.session.jwt },
        });
        return res.json(result.data); // 응답 결과
    } catch(error) {
        console.error(error);
        if(error.response.status === 419){ // 토큰 만료
            return res.json(error.response.data);
        }
        return next(error);
    }
});

module.exports = router;