require('dotenv').config()
const express = require('express')
const app = express()
const router = express.Router();// 
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const methodOverride = require('method-override'); 
const session = require('express-session')


require('./db/db');

app.use('/css', express.static('css'));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));//must come before our routes
app.use(bodyParser.urlencoded({extended: false}));

const cafeList = require("./controllers/cafeList.js")
app.use('/cafeList', cafeList)

const userController = require('./controllers/user.js');
app.use('/user', userController);

const reviewController = require('./controllers/review.js')
app.use('/review', reviewController)


// home page
app.get('/',(req, res) => {
  res.render('home.ejs')
});


app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
})