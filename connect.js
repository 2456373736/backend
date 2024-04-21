const mongoose = require('mongoose');

function connectDB(URL){
    mongoose.connect(URL)
    .then(console.log('MongoDB Connect Successfully'));
}

module.exports = connectDB;