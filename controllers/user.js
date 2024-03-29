const express = require('express'); 
const router = express.Router();

const User = require('../models/user')
const cafeList = require("../models/cafeList.js")
const Review = require("../models/review.js")

const bcrypt = require('bcryptjs')


router.get('/new', (req, res) => {
	// .render() knows it should look in the views folder
	res.render('user/new.ejs', {
	})
})

// this route shows login form
router.get('/login', (req, res) => {
	res.render('user/login.ejs', {
	})
})

router.post('/login', async (req, res, next) => {
	try {
	 	// see if username exists in db
	 	const foundUsers = await User.find({
	 		username: req.body.username
	 	})
	 	
		// if username does not exist
		if(foundUsers.length === 0) {
			// redirect to /login
			res.redirect('/user/login')
		}
	 	// if username exists in db
	 	else {
	 		// check password
	 		const pw = req.body.password
	 		// if pw is good
			if(bcrypt.compareSync(pw, foundUsers[0].password)) {
			 	// redirect to /  (home)
			 	// add session here 
			 	req.session.userId = foundUsers[0]._id; // for now, assume it's the first user in array
				req.session.logged = true; 
			 	res.redirect('/cafeList/')
			}
			// if pw is bad
			else {
				// redirect to /login
				res.redirect('/user/login')
			}

	 	}
	  
	} catch(err) {
	  next(err)
	}

})

// registration/user "create" route
router.post('/register', async (req, res, next) => {

	// does a user with that username exist already? if so...
	const username = req.body.username

	try {
		const user = await User.findOne({
			username: username
		})

		if(user !== null) {

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

			res.redirect('/')
		}

	} catch(err) {
	  	next(err)
	}

})




module.exports = router;