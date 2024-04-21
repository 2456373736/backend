const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postImage : {
        type: String,
        default: '',
    },
    postTitle: {
        type: String,
        required: true,
    },
    postDescription: {
        type: String,
        required: true,
    },
    likes: [ { likedBy: { type: mongoose.Schema.Types.ObjectId } } ],
    comments: [ { commentedBy: { type: mongoose.Schema.Types.ObjectId }, comment: { type: String } } ],
    postOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;