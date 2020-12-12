var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

// 게시글 다큐먼트 조회
router.get('/:id', function(req, res, next){
    // 먼저 댓글을 쓴 사용자의 아이디로 댓글 조회 후
    // populate 메서드로 관련있는 컬렉션의 다큐먼트를 불러옴

    // Comment 스키마 commenter 필드의 ref가 User로 되어 있기 때문에 
    // 알아서 users 컬렉션에서 사용자 다큐먼트를 찾아 합침
    // commenter 필드가 사용자 다큐먼트로 치환됨
    // commenter 필드는 이제 ObjectId가 아니라 그 ObjectId를 가진 사용자 다큐먼트가 됨
    Comment.find({ commenter: req.params.id }).populate('commenter')
        .then((comments)=>{
            console.log(comments);
            res.json(comments);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

// 다큐먼트 등록
router.post('/', function(req, res, next){
    const comment = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    });

    comment.save()
        .then((result)=>{
            // 프로미스 결과로 반환된 result 객체를 
            // populate 메서드로 User 스키마와 합침
            // path 옵션으로 어떤 필드를 합칠지 설정
            return Comment.populate(result, { path: 'commenter' });
        })
        .then((result)=>{
            res.status(201).json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

// 다큐먼트 수정
router.patch('/:id', function(req, res, next){
    // 시퀄라이즈와 달리 $set 연산자를 사용하지 않아도 기입한 필드만 바꿔주기 때문에
    // 실수로 다큐먼트 전체를 변경할 일이 없어 안전함
    Comment.update({ _id: req.params.id }, { comment: req.body.comment })
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

// 다큐먼트 삭제
router.delete('/:id', function(req, res, next){
    Comment.remove({ _id: req.params.id })
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

module.exports = router;