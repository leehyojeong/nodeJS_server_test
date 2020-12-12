var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();
// id에 따른 댓글 조회
router.get('/:id', function(req, res, next){
    Comment.findAll({
        include: {
            model: User, 
            where: { id: req.params.id }, 
        },
    })
        .then((comments)=>{
            console.log(comments);
            res.json(comments);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        }); 
});

// 댓글 생성 라우터
router.post('/', function(req, res, next){
    Comment.create({
        // 사용자와 댓글 연결
        commenter: req.body.id,
        comment: req.body.comment,
    })
        .then((result)=>{
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

// 수정
router.patch('/:id', function(req, res, next){
    Comment.update({ comment: req.body.comment }, { where: { id: req.params.id }})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

// 삭제
router.delete('/:id', function(req, res, next){
    Comment.destroy({ where: { id: req.params.id }})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

module.exports = router;