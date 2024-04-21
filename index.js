//imports
const express = require('express');
const connectDB = require('./connect');
const path = require('path');
const staticRouter = require('./routes/staticRoute');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly } = require('./middlewere/auth');

//variable
const app = express();
const port = 3000;

//setters
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleweres
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', restrictToLoggedInUserOnly , staticRouter);
app.use('/user', userRouter);

//function calls
connectDB('mongodb://localhost:27017/SharePie');

//routes

//listen
app.listen(port, ()=>{
    console.log(`Server listening at : http://localhost:${port}`);
})