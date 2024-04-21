const express = require('express');
const { handleGetPostOfUserYouFollow } = require('../controllers/post');
 
const router = express.Router();

router.get('/', async(req, res)=>{
    const posts = await handleGetPostOfUserYouFollow(req, res);
    return res.render('home', {posts : posts});
})

module.exports = router;