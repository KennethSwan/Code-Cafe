const express = require('express'); 
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcryptjs')


//checking if user is registered, if not, redirecting them to register
router.get('/login,' , async (req, res) => {
	try{
		const foundUser = await User.find({username: req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				req.session.message = '';
				req.username = foundUser.username
				req.session.logged = true;
				res.redirect('/places')
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


router.get('/registration', async(req, res) => {
	//hashing password
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	//creating object for db 
	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash

	const createdUser = await User.create(userDbEntry);
	console.log(createdUser);
	req.session.username = createdUser.username;
	req.session.logged = true; 
	res.redirect('/places')	
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