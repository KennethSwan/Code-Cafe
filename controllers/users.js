const express = require('express'); 
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcryptjs')


//checking if user is registered, if not, redirecting them to register
router.post('/login,' , async(req, res) => {
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
			req.session.message = 'Username or password is incorrect'
		}
	} catch(err){
		res.send(err);
	}	
});










module.exports = router;