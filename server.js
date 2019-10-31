// require dotenv at the top of this file -- as soon as 
require('dotenv').config()
console.log(process.env);

const express = require('express') 
const app = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const methodOverride = require('method-override'); 
const session = require('express-session')


require('./db/db');

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(methodOverride('_method')); 
app.use(bodyParser.urlencoded({extended: false})); 


const usersController = require('./controllers/users.js');
app.use('/users', usersController) 

// everything that should be handled by places controller
const placesController = require('./controllers/places.js'); 
// so urls should start with /places
app.use('/places', placesController)

// everything that should be handled by reviews controller
const reviewsController = require('./controllers/reviews.js'); 
// so urls should start with /reviews
app.use('/reviews', reviewsController)


// home 
app.get('/', (req, res) => {
	console.log(req.session, 'home route');
	res.render('users/index.ejs', {
		logOut: req.session.logOutMsg
	})
})










app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
})