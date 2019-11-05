const express = require('express');
const router = express.Router();

const cafeList = require("./models/cafeList.js")
const User = require("../models/user.js")

const superAgent = require('superagent')


// show the user a search page
router.get('/search', (req, res) => {
	res.render('review/search.ejs')
})

// storing all reviews in foundReviews
router.get('/', async(req, res) => {
	try{
		const foundReviews = await Review.find({})
		res.render('show.ejs', {
			reviews: foundReviews
		})
	} catch(err){
		res.send(err)
	}

})

// retrieving all places and storing them in a variable called allPlaces 
router.get('/new', async (req, res) => {
	try{
		const allUsers = await User.find();
		res.render('new.ejs', {
			users: allUsers
		})
	} catch (err){
		res.send(err)
	}
})
// reviews show route
router.get('/:id', async (req, res) => {
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
//reviews edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const allUsers = await User.find({})
		const foundUserReview = await User.findOne({'reviews': req.params.id})
		.populate({path: 'reviews', match: {_id: req.params.id}})
		.exec()

		res.render('edit.ejs', {
			review: foundUserReview.reviews[0],
			users: allUsers,
			userReview: foundUserReview
		})
	} catch (err){
		re.send(err)
	}
})

//reviews create route 

router.post('/', async (req,res) => {
	try{
		const findUser = User.findById(req.body.userId);
		const createReview = Review.create(req.body);
		const[foundUser, createdReview] = await Promise.all([findUser, createReview])
		foundUser.reviews.push(createReview)
		await foundUser.save();
		res.redirect('show.ejs')
	}catch(err){
		res.send(err)
	}	


router.delete('/:id', async (req, res) => {
	console.log('delete');
	try{
		const deleteReview = Review.findByIdAndRemove(req.params.id)
		const findUser = Review.findOne({'reviews': req.params.id})
		const [deletedReviewResponse, foundUser] = await Promise.all([deleteReview, findReview])
		console.log(foundUser, ' found user');
		foundUser.reviews.remove(req.params.id)
		await foundReview.save()
		res.redirect('show.ejs')
	} catch(err){
		res.send(err)
	}
})

router.put('/:id', async (req, res) => {
	try {
		const findUpdatedReview = Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
		const findFoundUser = User.findOne({'reviews': req.params.id});

		const [updatedReview, foundUser] = await Promise.all([findUpdatedReview, findFoundUser])

		if(foundUser._id.toString() != req.body.userId){
			foundUser.reviews.remove(req.params.id)
			await foundUser.save();
			const newUser = await User.findById(req.body.userId)
			newUser.reviews.push(updatedReview);
			const savedNewUser = await newUser.save()
			res.render('show.ejs' + req.params.id)
		}else{
			res.redirect('show.ejs' + req.params.id)
		}
	}catch (err){
		console.log(err);
		res.send(err)
	}

})
})


module.exports = router;