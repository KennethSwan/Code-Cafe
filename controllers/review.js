const express = require('express');
const router = express.Router();

const Review = require("../models/review.js")
const cafeList = require("../models/cafeList.js")
const User = require("../models/user.js")


// new route
router.get('/:cafeIndex/new', async (req, res) => {
	try {
		const oneCafe = cafeList[req.params.cafeIndex]
		
		res.render('review/new.ejs', {
			
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
	
		res.redirect('/cafeList/');
	}
	catch (err) {
		next(err)
	}
})

// delete review route 

router.delete('/:index', async (req, res, next) => {
	try {
		const deletedReview = await Review.findByIdAndDelete(req.params.index)
		res.redirect('/cafeList/');
	}
	catch (err) {
		next(err)
	}
})


module.exports = router;