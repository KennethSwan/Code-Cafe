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
		console.log(oneCafe);
		for(let i = 0; i < oneCafe.review.length; i++){
			const foundReview = await Review.findById(oneCafe.review[i])
			reviewsArray.push(foundReview)
		}

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

// put route 
router.put('/:index', (req, res) => {
	cafeList[req.params.index] = req.body;
	res.redirect('/cafeList/')
})


module.exports = router;