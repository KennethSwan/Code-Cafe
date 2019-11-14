const express = require('express');
const router = express.Router();

const cafeList = require("../models/cafeList.js")
const User = require("../models/user.js")
const Review = require("../models/review.js")

router.get('/', (req, res) => {
	res.render('cafeList/index.ejs', {
		cafeList: cafeList,
	})
})

// new route
router.get('/new', (req, res) => {
	res.render('cafeList/new.ejs')
})

// show route - where you can see reviews of cafe
router.get('/:id', async (req, res, next) => {
	try {
		const oneCafe = cafeList[req.params.id]
		const reviewsArray = []
		for(let i = 0; i < oneCafe.review.length; i++){
			const foundReview = await Review.findById(oneCafe.review[i])
			reviewsArray.push(foundReview.review)
		}
		// const reviewContentArray = await oneCafe.review.map(async reviewId => {
		// 	const foundReview = await Review.findById(reviewId)
		// 	return foundReview.review
		// })
		// console.log("this is reviewContentArray array of reviews for the cafe")
		// console.log(reviewContentArray)
		res.render('cafeList/show.ejs', {
			oneCafe: oneCafe,
			i: req.params.id,
			foundReviews: reviewsArray
		})

	}
	catch (err) {
		next(err)
	}

})

// post route - create route
router.post('/', (req, res) => {
	cafeList.push(req.body);
	res.redirect('/cafeList/')
})

// edit route 
router.get('/:index/edit', (req, res) => {
	res.render('cafeList/edit.ejs', {
		// use query to find review 
		// use a loop to add and edit reviews 
		oneCafe: cafeList[req.params.index],
		index: req.params.index 
	})
})

// put route 
router.put('/:index', (req, res) => {
	cafeList[req.params.index] = req.body;
	res.redirect('/cafeList/')
})


module.exports = router;