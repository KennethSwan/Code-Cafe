const express = require('express') 
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override'); 



require('./db/db');


app.use(methodOverride('_method')); 
app.use(bodyParser.urlencoded({extended: false})); 

const usersController = require('./controllers/users.js');
app.use('/auth', usersController) 














app.listen(PORT, () => {
	console.log("Server is listening on port " + PORT);
})