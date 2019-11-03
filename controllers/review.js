const express = require('express');
const router = express.Router();
const Review = require("../models/review")
const superAgent = require('superagent')






// direct to page to create review 
router.get('/new', (req, res) => {
	res.render('reviews/new.ejs')
})




// this grabs information from the Google API 
router.get('/new/:place_id', async (req, res, next) => {
	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL

	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;

	try{
		const dataFromGoogle = await superAgent.get(url)
		res.render('reviews/new.ejs', {
			dataFromGoogle: dataFromGoogle.body.result
		})

	} catch(err){
		next(err)
	}

})


// this is our create route 
// if the user has checked criteria, it will show up on show2.ejs
router.post('/:place_id', async(req, res, next) => {
	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key"+ process.env.API_KEY;
	
	try {
		const dataFromGoogle = await superAgent.get(url)
		
		// this is an object we will add to the database
		const placeToAdd = {}

		if(req.body.wifi === 'on') {
			placeToAdd.wifi = true;
		} else {
			placeToAdd.wifi = false;
		}

		if(req.body.caffeinatedDrinks === 'on'){	
			placeToAdd.caffeinatedDrinks = true;
 		} else {
			placeToAdd.caffeinatedDrinks = false;
		} 

		if (req.body.alcohol === 'on') {
			placeToAdd.alcoholicDrinks = true; 
		} else {
			placeToAdd.alcoholicDrinks = false;
		}

		if(req.body.breakfast === 'on') {
			placeToAdd.breakfast = true;
		} else {
			placeToAdd.breakfast = false;
		}

		if (req.body.lunch === 'on'){
			placeToAdd.lunch = true;
		} else {
			placeToAdd.lunch = false;
		}

		if (req.body.dinner === 'on'){
			placeToAdd.dinner = true;
		} else {
		 	placeToAdd.dinner = false;
		}

		if (req.body.vegan === 'on'){
			placeToAdd.vegan = true;
		} else {
			placeToAdd.vegan = false;
		}

		if (req.body.glutenFree === 'on'){
			placeToAdd.glutenFree = true;
		} else {
			placeToAdd.glutenFree = false;
		}

		if (req.body.lactoseIntolerant === 'on'){
			placeToAdd.lactoseIntolerant = true;
		} else{
			placeToAdd.lactoseIntolerant = false;
		}


		if (req.body.comfortableChairs === 'on'){
			placeToAdd.comfortableChairs = true;
		} else{
			placeToAdd.comfortableChairs = false;
		}

		if (req.body.outdoorSeating === 'on'){
			placeToAdd.outdoorSeating = true;
		} else {
			placeToAdd.outdoorSeating = false;

		}

		if (req.body.busy === 'on'){
			placeToAdd.busy = true;
		} else {
			placeToAdd.busy = false; 
		}

		if (req.body.relaxed === 'on'){
			placeToAdd.relaxed = true;
		} else {
			placeToAdd.relaxed = false;
		}

		if (req.body.stuffy === 'on'){
			placeToAdd.stuffy = true;
		} else {
			placeToAdd.stuffy = false;
		}

		if (req.body.hip === 'on'){
			placeToAdd.hip = true;
		} else {
			placeToAdd.hip = false;
		}

		if (req.body.soft === 'on'){
			placeToAdd.soft = true;
		} else {
			placeToAdd.soft = false;
		}

		if (req.body.energizing === 'on'){
			placeToAdd.energizing = true;
		} else {
			placeToAdd.energizing = false;
		}

		if (req.body.intense === 'on'){
			placeToAdd.intense = true;
		} else {
			placeToAdd.intense = false;
		}

		placeToAdd.placeId = req.params.place_id

		const addedPlace = await Place.create(placeToAdd)

		
		const reviewToAdd = {
			user: req.session.user._id,
			place: addedPlace._id,
			text: req.body.reviewText	
		}
		console.log(reviewToAdd);


		const addedReview = await Review.create(reviewToAdd)


		res.render('places/show2.ejs', {
			dataFromGoogle: dataFromGoogle.body.result, 
			foundPlace: addedPlace,
			foundReview: addedReview

		})

	} catch(err){
		next(err)
	}
	
})

// this is our edit route 
// this edit route will have old information from the database (from the update route)
// to hit this route when button is clicked. it is going to edit an old review with the 
// older checkboxes visible to change 
router.get('/:place_id/edit/:review_id', async (req, res, next) => {

	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
	const placeToAdd = {}
	placeToAdd.placeId = req.params.place_id
	const addedPlace = await Place.create(placeToAdd)
	const foundPlace = await Place.findOne({ placeId: req.params.place_id })
	const foundReviews = await Review.find({ place: foundPlace._id })
	const foundReviewId = await Review.find(foundReviews.id)

	try{

		const dataFromGoogle = await superAgent.get(url)

		Review.findById(
			req.params._id,
			(err, addedReview) => {
				if(err){
					res.send(err);
				} else {
					res.render('places/edit2.ejs', { 
						dataFromGoogle: dataFromGoogle.body.result, 
						foundPlace: addedPlace,
						foundReview: addedReview,
				})
		}
	})
	} catch (err) {
		next(err)
	}
	
})



// this is our update route 
// this is going to update the data base
router.put('/:place_id', async(req, res, next) => {

	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
	const placeToAdd = {}
	placeToAdd.placeId = req.params.place_id
	const addedPlace = await Place.create(placeToAdd)
	const addedReview = await Review.create(reviewToAdd)


	try{

		const dataFromGoogle = await superAgent.get(url)

		Review.findByIdAndUpdate(req.params._id,
		 foundPlace.wifi,
		 foundPlace.caffeinatedDrinks,
		 foundPlace.alcoholicDrinks,
		 foundPlace.breakfast,
		 foundPlace.lunch,
		 foundPlace.dinner,
		 foundPlace.vegan,
		 foundPlace.glutenFree,
		 foundPlace.lactoseIntolerant,
		 foundPlace.comfortableChairs,
		 foundPlace.outdoorSeating,
		 foundPlace.busy,
		 foundPlace.relaxed,
		 foundPlace.stuffy,
		 foundPlace.hip,
		 foundPlace.soft,
		 foundPlace.energizing,
		 foundPlace.intense,
			(err, updatedReview) => {
				if(err){
					res.send(err);
				} else {
					res.render('show2.ejs', { 
						dataFromGoogle: dataFromGoogle.body.result, 
						foundPlace: addedPlace,
						foundReview: addedReview

				})
		}
	})
	} catch (err) {
		next(err)
	}
})

// this is our delete route 
// it will delete reviews that are already saved in the database 
router.delete('/show/:place_id/:review_id', async (req, res, next) => {
	
    try {
    	const placeId = req.params.place_id
		const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
		const placeToAdd = {}
		placeToAdd.placeId = req.params.place_id;
		const deletedReview = await Review.findByIdAndDelete(req.params.review_id);
		console.log("this is the deleted review")
		console.log(deletedReview);
        
		res.redirect('/places/' + placeId);
    } catch (err){
        next(err);
    }
})




module.exports = router