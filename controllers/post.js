const User = require('../models/user');
const Post = require('../models/post');
const { getUser } = require('../services/auth');

async function handlePostCreation(req, res){
    const { postImage, postTitle, postDescription } = req.body;
    await Post.create({
        postImage,
        postTitle,
        postDescription,
        postOwner: req.user._id,
    })
    return res.redirect('/');
}

async function handleGetPostOfUserYouFollow(req, res){
    const token = req.cookies?.token;
    const user = getUser(token).user;
    const followingIds = user.following.map(obj => obj.userId);
    const postsPromises = followingIds.map(userId => {
        return Post.find({ postOwner: userId }).populate('postOwner');
    });
    const postsResults = await Promise.all(postsPromises);
    return postsResults.flat();
}

module.exports = {
    handlePostCreation,
    handleGetPostOfUserYouFollow,
}