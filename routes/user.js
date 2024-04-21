const express = require('express');
const { handleCreateUser, handleUserLogin, handleUserFollow, handleLike } = require('../controllers/user');
const { handlePostCreation } = require('../controllers/post');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res)=>{
    return res.render('login');
});

router.get('/signup', (req, res)=>{
    return res.render('signup');
});

router.get('/post', (req, res)=>{
    return res.render('post');
});

router.get('/explore', async(req, res)=>{
    const users = await User.find({});
    return res.render('explore', {users: users});
});
router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/');
});

router.post('/postlike/:id', handleLike);
router.post('/login', handleUserLogin);
router.post('/signup', handleCreateUser);
router.post('/post', handlePostCreation);
router.post('/explore', handleUserFollow);

module.exports = router;