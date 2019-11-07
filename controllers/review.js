const express = require('express');
const router = express.Router();

const cafeList = require("./models/cafeList.js")
const User = require("../models/user.js")

// Notes from Fatima
	// make a query that takes the index in req.params and use that to find all of the review that reference that number
	// so in the review model that has a refrence to a number that will be the intdes number 
	// example of query: Find({find all the reviews where the place is the req.params.index})



// reviews show route
router.get('review/:id', async (req, res) => {
	try {
		const foundUser = await User.findOne({'reviews': req.params.id})
		.populate({
			path: 'reviews',
			match: {_id: req.params.id}
		})
		.exec()
		res.render('show.ejs', {
			user: foundUser,
			review: foundUser.reviews[0]
		})
		} catch(err){
			res.send(err)
		}
	})

//edit route 

//review create route 

router.post('/' aync (req, res, next) => {
	try{
		const findUser = User.findById(req.body.userId);
		const createReview = Review.create(req.body);
		const[foundUser, createdReview] = await Promise.all([findUser, createReview])
		foundUser.reviews.push(createReview)
		await foundUser.save();
		res.redirect('/cafeList')
	}catch(err){
		res.send(err)
	}	

})

// delete review route 

router.delete('/review/:id', async (req, res) => {
	console.log('delete');
	try{
		const deleteReview = Review.findByIdAndRemove(req.params.id)
		const findUser = Review.findOne({'reviews': req.params.id})
		const [deletedReviewResponse, foundUser] = await Promise.all([deleteReview, findReview])
		console.log(foundUser, ' found user');
		foundUser.reviews.remove(req.params.id)
		await foundReview.save()
		res.redirect('/cafeList/show.ejs')
	} catch(err){
		res.send(err)
	}
})

module.exports = router;