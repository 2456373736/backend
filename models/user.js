const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    following : [ { userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }}],
    followers : [ { userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }}],
}, { timestamps : true });

const User = mongoose.model('user', userSchema);

module.exports = User;