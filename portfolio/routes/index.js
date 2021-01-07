const express = require('express');

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        res.render('index', { title: 'GERONIMO' });
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;