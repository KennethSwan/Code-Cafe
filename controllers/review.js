const express = require('express');
const router = express.Router();

const Review = require("../models/review.js")
const cafeList = require("../models/cafeList.js")
const User = require("../models/user.js")

// Notes from Fatima
	// make a query that takes the index in req.params and use that to find all of the review that reference that number
	// so in the review model that has a refrence to a number that will be the intdes number 
	// example of query: Find({find all the reviews where the place is the req.params.index})

// new route
router.get('/:cafeIndex/new', async (req, res) => {
	try {
		const oneCafe = cafeList[req.params.cafeIndex]
		// create session in post /login and post /register routes
		// use session to save userId
		// use session to find user as needed in next line
		// const foundUser = await User.findOne({'review': req.params.cafeIndex})
		res.render('review/new.ejs', {
			// user: foundUser,
			// review: foundUser.reviews[0],
			// cafeList: oneCafe,
			oneCafe: cafeList[req.params.cafeIndex],
			index: req.params.cafeIndex 
		})
		} catch(err){
			res.send(err)
		}
	})

//review create route 

router.post('/:cafeListIndex', async (req, res, next) => {
	try{

		const newReview = {
			place: req.params.cafeListIndex,
			review: req.body.review
		}

		const createReview = await Review.create(newReview);

		// find the user
		const foundUser = await User.findById(req.session.userId);
		// change the user reviews array to include new review
		await foundUser.reviews.push(createReview._id)
		// find user again to update with the user object that now has the new review
		// const updatedUser = await User.findByIdAndUpdate(req.session.userId, foundUser)
		// await updatedUser.save()
		res.redirect('/cafeList')
		// res.send(req.body)
	}catch(err){
		res.send(err)
	}	

})

// // router.post('/') aync (req, res, next) => {
// // 	try{
// // 		Review.findByIdAndUpdate(req.params.index,
// // 			req.body, 
// // 			{new: true},
// // 			(err))
// // 	} catch {

// // 	}
// // }

// // delete review route 

// router.delete('/review/:id', async (req, res) => {
// 	console.log('delete');
// 	try{
// 		const deleteReview = Review.findByIdAndRemove(req.params.id)
// 		const findUser = Review.findOne({'reviews': req.params.id})
// 		const [deletedReviewResponse, foundUser] = await Promise.all([deleteReview, findReview])
// 		console.log(foundUser, ' found user');
// 		foundUser.reviews.remove(req.params.id)
// 		await foundReview.save()
// 		res.redirect('/cafeList/show.ejs')
// 	} catch(err){
// 		res.send(err)
// 	}
// })

module.exports = router;