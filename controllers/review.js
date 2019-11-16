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
			oneCafe: oneCafe,
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

		console.log(createReview)

		// find the user
		const foundUser = await User.findById(req.session.userId);
		// change the user reviews array to include new review
		const reviewArray = foundUser.review
		reviewArray.push(createReview._id)

		console.log(reviewArray)

		const updatedUser = {
			username: foundUser.username,
			password: foundUser.password,
			review: reviewArray
		}

		// User.findOneAndReplace({_id: req.session.userId}, updatedUser)


		// add review ID to the place review array
		const reviewedCafe = cafeList[req.params.cafeListIndex]
		reviewedCafe.review.push(createReview._id)

		// find user again to update with the user object that now has the new review
		// const updatedUser = await User.findByIdAndUpdate(req.session.userId, foundUser)
		// await updatedUser.save()
		res.redirect('/cafeList/' + req.params.cafeListIndex)
	}catch(err){
		console.dir(err)
		res.send("err")
	}	

})

// edit route 
router.get('/:index/edit', async (req, res, next) => {
	//findbyid
	try {
		const foundReview = await Review.findById(req.params.index)
		const oneCafe = cafeList[foundReview.place]
		res.render('cafeList/edit.ejs', {
			// use query to find review 
			// use a loop to add and edit reviews 
			oneCafe: oneCafe,
			review: foundReview.review,
			index: req.params.index 
		})
	}
	catch (err) {
		next(err)
	}
})

// review update 
router.put('/:index', async (req, res, next) => {
	try {
		const reviewToUpdate = await Review.findByIdAndUpdate(req.params.index, req.body, {new: true});
		await reviewToUpdate.save();
		console.log(reviewToUpdate);
		// finds the review by the id, replacing the one found in the db with the information from the form.
		// console.log("this is what is in req.body");
		// console.log(req.body);
		// const updatedReview = await Review.findByIdAndUpdate(req.params.index)
		res.redirect('/cafeList/');
	}
	catch (err) {
		next(err)
	}
})

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