const express = require('express');
const multer = require('multer'); // 미들웨어 역할
// 앱 전체에 붙는 미들웨어는 아니지만 multipart 데이터를 업로드하는 라우터에 붙음
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 이미지를 업로드할 uploads 폴더가 없을 때 uploads 폴더 생성 
fs.readdir('uploads', (error) => {
    if(error){
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

// upload는 미들웨어를 만드는 객체가 됨
const upload = multer({
    // Multer 모듈에 옵션으로 storage와 limits 속성을 줌
    storage: multer.diskStorage({ // 이미지가 서버 디스크에 저장됨
        destination(req, file, cb){ // 저장 경로를 nodebird 폴더 아래 uploads 폴더로 지정
            cb(null, 'uploads/');
        },
        filename(req, file, cb){ 
            // 기존 이름(file.originalname)에 업로드 날짜값과 기존 확장자를 붙임
            // 업로드 날짜값을 붙이면 파일명 중복을 막을 수 있음
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }), // storage에는 파일 저장 방식과 경로, 파일명 등을 설정할 수 있음
    limits: { fileSize: 5*1024*1024 }, // 최대 이미지 파일 용량 허용치(바이트 단위)
});

// 이미지 업로드 처리하는 라우터
router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{
    // upload.single은 이미지를 처리하고 req.file 객체에 결과 저장
    console.log(req.file);
    // req.file.filename을 클라이언트로 보내서 게시글 등록 시 사용할 수 있게 함
    res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags){
            // 위에서 정규식으로 추출한 해시태그들을 데이터베이스에 저장
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
            })));
            // 저장 후 post.addHashtags 메서드로 게시글과 해시태그 관계를 PostHashtag 테이블에 추가
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

// 해시태그로 조회하는 /post/hashtag 라우터
router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag; // 쿼리스트링으로 해시태그 이름을 받고 
    if(!query){ // 해시태그가 빈 문자열인 경우 메인페이지로 돌려보냄
        return res.rendirect('/');
    }

    try{
        // 데이터베이스에서 해당 해시태그가 존재하는지 검색
        const hashtag = await Hashtag.findOne({ where: { title: query }});
        let posts = [];
        if(hashtag){
            // 시퀄라이즈에서 제공하는 getPosts 메서드로 모든 게시글 가져옴
            // 가져올 때 작성자 정보 JOIN
            posts = await hashtag.getPosts({ include: [{ model: User }]});
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: posts, // 전체 게시글 대신 조회된 게시글만 twits에 넣어 렌더링
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;