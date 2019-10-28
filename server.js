const express = require('express') 
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override'); 
const session = require('express-session')


require('./db/db');

app.use(session({
	secret: "this is a random secret string",
	resave: false,
	saveUnitialized: false
}));

app.use(methodOverride('_method')); 
app.use(bodyParser.urlencoded({extended: false})); 

const secretInfo = require('./secretInfo.js')

const usersController = require('./controllers/users.js');
app.use('/users', usersController) 


// home 
app.get('/', (req, res) => {
	console.log(req.session, 'home route');
	res.render('index.ejs', {
		logOut: req.session.logOutMsg
	})
})










app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
})