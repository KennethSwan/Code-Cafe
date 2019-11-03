const express = require('express'); 
const router = express.Router();
const User = require('../models/user')
const Review = require("../models/review")
const superAgent = require('superagent')
const bcrypt = require('bcryptjs')


//checking if user is registered, if not, redirecting them to register
router.post('/login' , async (req, res) => {
	try{
		const foundUser = await User.findOne({username: req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				req.session.message = '';
				req.session.user = foundUser
				req.session.logged = true;
				res.redirect('/places/search')
			} else {
				req.session.message = 'Username or password is incorrect';
				res.redirect('/')
			}
		} else {
			req.session.message = 'Username or password is incorrect';
			res.redirect('/')
		}
	} catch(err){
		res.send(err);
	}	
});

// this allows user to register and gives access to the site
router.post('/registration', async (req, res) => {

	//hashing password
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	//creating object for db 
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash

	// creating a user in the db - query
	const createdUser = await User.create(userDbEntry);
	console.log("\nhere is the user we created");
	console.log(createdUser);

	req.session.user = createdUser;
	req.session.logged = true; 

	res.redirect('/places/search')	
})

// creates a new cookie! 
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send(err);
		} else {
			res.redirect('/')
		}
	})
})






module.exports = router;