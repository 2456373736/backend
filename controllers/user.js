const Post = require('../models/post');
const User = require('../models/user');
const { setUser } = require('../services/auth');

async function handleCreateUser(req, res){
    const { username, password } = req.body;
    await User.create({
        username,
        password,
    });
    return res.redirect('/user/login');
}

async function handleUserLogin(req, res){
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.json({ error : 'User not found '});
    if(!(user.password === password)) return res.json({error : 'Wrong password' });
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
}

async function handleUserFollow(req, res){
    const userToFollow = JSON.parse(req.body.userToFollow);
    const didSomething = await User.findOneAndUpdate({
        _id: userToFollow._id,
    }, {
        $push: {
            followers: {
                userId : req.user._id,
            }
        }
    })
    const alsoDidSomething = await User.findOneAndUpdate({
        _id: req.user._id,
    }, {
        $push : {
            following : {
                userId: userToFollow._id,
            }
        }
    })
    return res.redirect('/');
}

async function handleLike(req, res){
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        // Check if the user has already liked the post
        const post = await Post.findById(postId);
        if (post.likes.some(like => like.likedBy.equals(userId))) {
            return res.status(400).json({ error: "User has already liked this post." });
        }

        // If the user hasn't liked the post, update the database
        await Post.findByIdAndUpdate(postId, {
            $push : {
                likes: {
                    likedBy: userId,
                }
            }
        });
        
        return res.redirect('/');
    } catch (error) {
        console.error('Error handling like:', error);
        return res.status(500).json({ error: "Internal server error." });
    }
}




module.exports = {
    handleCreateUser,
    handleUserLogin,
    handleUserFollow,
    handleLike,
}