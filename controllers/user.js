const express = require('express'); 
const router = express.Router();
const User = require('../models/user')
const cafeList = require("../models/cafeList.js")
const bcrypt = require('bcryptjs')

router.get('/new', (req, res) => {

	let messageToShow = ""

	if(req.session.message) {
		messageToShow = req.session.message
		req.session.message = "" // keep message from displaying twice
	} 
	// .render() knows it should look in the views folder
	res.render('user/new.ejs', {
		message: messageToShow
	})
})

// this route shows login form
router.get('/login', (req, res) => {
	let messageToShow = ""

	if(req.session.message) {
		messageToShow = req.session.message
		req.session.message = "" 
	} 

	res.render('user/login.ejs', {
		message: messageToShow
	})
})

router.post('/login', async (req, res, next) => {
	try {
	 	// see if username exists in db
	 	const foundUsers = await User.find({
	 	// set a property on the session called username and set 
	 	// it equal to the username sent from the form 
	 		username: req.body.username
	 	})
	 	// foundUsers should be [] if user not there, [foundUsers] if one user is there

		// if username does not exist
		if(foundUsers.length === 0) {
			console.log("Username does not exist")
			// add message to session: 
			req.session.message = "Invalid username or password"
			// redirect to /login
			res.redirect('/user/login')
		}
	 	// if username exists in db
	 	else {
	 		// check password
	 		const pw = req.body.password

	 		console.log(foundUsers[0]);
	 		// if pw is good
			if(bcrypt.compareSync(pw, foundUsers[0].password)) {

			 	// set logged in in session
			 	req.session.loggedIn = true
			 	req.session.username = foundUsers[0].username
			 	// redirect to /  (home)
			 	res.redirect('/')
			}
			// if pw is bad
			else {
				console.log("bad password");
				// add message to session: 
				req.session.message = "Invalid username or password"
				// redirect to /login
				res.redirect('/user/login')
			}

	 	}
	  
	} catch(err) {
	  next(err)
	}

})

// registration/user "create" route
router.post('/', async (req, res, next) => {

	// does a user with that username exist already? if so...
	const username = req.body.username

	try {
		const user = await User.findOne({
			username: username
		})
		console.log("\nhere is what we found when trying to see if user name exists POST /users");
		console.log(user);	  

		if(user !== null) {
			console.log("username taken");
			// tell them NO -- send a message
			req.session.message = "Username taken!"
			// redirect to reg page
			res.redirect('/user/new')
		}

		// if not
		else {
			// encrypt pw
			const pw = req.body.password
			const hashedPassword = bcrypt.hashSync(
				pw,
				bcrypt.genSaltSync(10)
			) 
			console.log(hashedPassword);
			
			const createdUser = await User.create({
				username: username,
				password: hashedPassword
			})

			console.log("\nhere is the created user in POST /users");
			console.log(createdUser);

			// use session to make user be "logged in"
			req.session.loggedIn = true
			// use the username from the db
			req.session.username = createdUser.username
			
			// redirect back to different page
			res.redirect('/')
		}

	} catch(err) {
	  	next(err)
	}

})






module.exports = router;