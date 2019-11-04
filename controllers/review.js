const express = require('express');
const router = express.Router();
const Review = require("../models/review")
const User = require("..models/user")
const superAgent = require('superagent')

<<<<<<< HEAD:controllers/review.js
// show the user a search page
router.get('/search', (req, res) => {
	res.render('review/search.ejs')
})

// this shows list of cafes and addresses after user types in zipcode 
router.post('/search', async (req, res, next) => {
	const zip = req.body.zipcode
	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key="+process.env.API_KEY;
	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's data from google in POST /search dataFromGoogle", dataFromGoogle.body.results);
		res.render('reivew/new.ejs', {
			dataFromGoogle: dataFromGoogle.body.results

		})
	} catch (err) {
		next(err);
	}
}); 

// shows basic information about cafe supplied by Google API 
// after user types in zip code  
router.get('/search/:place_id', async (req, res, next) => {

	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id --  build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
	// log data make sure it's good

	try{
		const dataFromGoogle = await superAgent.get(url);
		res.render('review/show.ejs', {
			dataFromGoogle: dataFromGoogle.body.result

		})
	} catch(err){
		next(err)
	}

=======
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
>>>>>>> 0399f78b736d1894d4d2ed5a218c906a8e224333:controllers/reviews.js
})

// retrieving all places and storing them in a variable called allPlaces 
router.get('/new', async (req, res) => {
	try{
		const allPlaces = await Place.find();
		res.render('new.ejs', {
			places: allPlaces
		})
	} catch (err){
		res.send(err)
	}
})
// reviews show route
router.get('/:id', async (req, res) => {
	try {
		const foundPlace = await Place.findOne({'reviews': req.params.id})
		.populate({
			path: 'reviews',
			match: {_id: req.params.id}
		})
		.exec()
		res.render('show.ejs', {
			place: foundPlace,
			review: foundPlace.reviews[0]
		})
		} catch(err){
			res.send(err)
		}
	})
//reviews edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const allPlaces = await Place.find({})
		const foundPlaceReview = await Place.findOne({'reviews': req.params.id})
		.populate({path: 'reviews', match: {_id: req.params.id}})
		.exec()

		res.render('places/edit.ejs', {
			review: foundPlaceReview.reviews[0],
			places: allPlaces,
			placeReview: foundPlaceReview
		})
	} catch (err){
		re.send(err)
	}
})

//reviews create route 

router.post('/', async (req,res) => {
	try{
		const findPlace = Place.findById(req.body.placeId);
		const createReview = Review.create(req.body);
		const[foundPlace, createdReview] = await Promise.all([findPlace, createReview])
		foundPlace.reviews.push(createReview)
		await foundPlace.save();
		res.redirect('/show.ejs')

<<<<<<< HEAD:controllers/review.js
// direct to page to create review 
router.get('/new', (req, res) => {
	res.render('review/new2.ejs')
=======
	} catch(err){
		console.log('error');
		res.send(err)
	}
})

router.delete('/:id', async (req, res) => {
	console.log('delete');
	try{
		const deleteReview = Review.findByIdAndRemove(req.params.id)
		const findPlace = Review.findOne({'reviews': req.params.id})
		const [deletedReviewResponse, foundPlace] = await Promise.all([deleteReview, findReview])
		console.log(foundPlace, ' found place');
		foundPlace.reviews.remove(req.params.id)
		await foundReview.save()
		res.redirect('/reviews')
	} catch(err){
		res.send(err)
	}
})

router.put('/:id', async (req, res) => {
	try {
		const findUpdatedReview = Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
		const findFoundPlace = Place.findOne({'reviews': req.params.id});

		const [updatedReview, foundPlace] = await Promise.all([findUpdatedReview, findFoundPlace])

		if(foundPlace._id.toString() != req.body.placeId){
			foundPlace.reviews.remove(req.params.id)
			await foundPlace.save();
			const newPlace = await Place.findById(req.body.authorId)
			newPlace.reviews.push(updatedArticle);
			const savedNewPlace = await newPlace.save()
			res.render('show.ejs' + req.params.id)
		}else{
			res.redirect('show.ejs' + req.params.id)
		}
	}catch (err){
		console.log(err);
		res.send(err)
	}
>>>>>>> 927d718624c0e71f38856caaed1199a85488228b:controllers/reviews.js
})

// shows user basic information about place 
// this grabs information from the Google API 
router.get('/new/:place_id', async (req, res, next) => {
	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

// // this grabs information from the Google API 
// router.get('/new/:place_id', async (req, res, next) => {
// 	// get data from google Place Details -- info about one place
// 	const placeId = req.params.place_id


// 	// use req.params.place_id -- build a URL

// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;

	try{
		const dataFromGoogle = await superAgent.get(url)
		res.render('review/new2.ejs', {
			dataFromGoogle: dataFromGoogle.body.result
		})

// 	try{
// 		const dataFromGoogle = await superAgent.get(url)
// 		res.render('reviews/new.ejs', {
// 			dataFromGoogle: dataFromGoogle.body.result
// 		})

// 	} catch(err){
// 		next(err)
// 	}

// })


// this is our create route 
// if the user has checked criteria, it will show up on show2.ejs
// router.post('/:place_id', async(req, res, next) => {
// 	// get data from google Place Details -- info about one place
// 	const placeId = req.params.place_id

// 	// use req.params.place_id -- build a URL
// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key"+ process.env.API_KEY;
	
// 	try {
// 		const dataFromGoogle = await superAgent.get(url)
		
// 		// this is an object we will add to the database
// 		const placeToAdd = {}

// 		if(req.body.wifi === 'on') {
// 			placeToAdd.wifi = true;
// 		} else {
// 			placeToAdd.wifi = false;
// 		}

// 		if(req.body.caffeinatedDrinks === 'on'){	
// 			placeToAdd.caffeinatedDrinks = true;
//  		} else {
// 			placeToAdd.caffeinatedDrinks = false;
// 		} 

// 		if (req.body.alcohol === 'on') {
// 			placeToAdd.alcoholicDrinks = true; 
// 		} else {
// 			placeToAdd.alcoholicDrinks = false;
// 		}

// 		if(req.body.breakfast === 'on') {
// 			placeToAdd.breakfast = true;
// 		} else {
// 			placeToAdd.breakfast = false;
// 		}

// 		if (req.body.lunch === 'on'){
// 			placeToAdd.lunch = true;
// 		} else {
// 			placeToAdd.lunch = false;
// 		}

// 		if (req.body.dinner === 'on'){
// 			placeToAdd.dinner = true;
// 		} else {
// 		 	placeToAdd.dinner = false;
// 		}

// 		if (req.body.vegan === 'on'){
// 			placeToAdd.vegan = true;
// 		} else {
// 			placeToAdd.vegan = false;
// 		}

// 		if (req.body.glutenFree === 'on'){
// 			placeToAdd.glutenFree = true;
// 		} else {
// 			placeToAdd.glutenFree = false;
// 		}

// 		if (req.body.lactoseIntolerant === 'on'){
// 			placeToAdd.lactoseIntolerant = true;
// 		} else{
// 			placeToAdd.lactoseIntolerant = false;
// 		}


// 		if (req.body.comfortableChairs === 'on'){
// 			placeToAdd.comfortableChairs = true;
// 		} else{
// 			placeToAdd.comfortableChairs = false;
// 		}

// 		if (req.body.outdoorSeating === 'on'){
// 			placeToAdd.outdoorSeating = true;
// 		} else {
// 			placeToAdd.outdoorSeating = false;

// 		}

// 		if (req.body.busy === 'on'){
// 			placeToAdd.busy = true;
// 		} else {
// 			placeToAdd.busy = false; 
// 		}

// 		if (req.body.relaxed === 'on'){
// 			placeToAdd.relaxed = true;
// 		} else {
// 			placeToAdd.relaxed = false;
// 		}

// 		if (req.body.stuffy === 'on'){
// 			placeToAdd.stuffy = true;
// 		} else {
// 			placeToAdd.stuffy = false;
// 		}

// 		if (req.body.hip === 'on'){
// 			placeToAdd.hip = true;
// 		} else {
// 			placeToAdd.hip = false;
// 		}

// 		if (req.body.soft === 'on'){
// 			placeToAdd.soft = true;
// 		} else {
// 			placeToAdd.soft = false;
// 		}

// 		if (req.body.energizing === 'on'){
// 			placeToAdd.energizing = true;
// 		} else {
// 			placeToAdd.energizing = false;
// 		}

// 		if (req.body.intense === 'on'){
// 			placeToAdd.intense = true;
// 		} else {
// 			placeToAdd.intense = false;
// 		}

// 		placeToAdd.placeId = req.params.place_id

// 		const addedPlace = await Place.create(placeToAdd)

		
// 		const reviewToAdd = {
// 			user: req.session.user._id,
// 			place: addedPlace._id,
// 			text: req.body.reviewText	
// 		}
// 		console.log(reviewToAdd);


// 		const addedReview = await Review.create(reviewToAdd)


<<<<<<< HEAD:controllers/review.js
		res.render('review/show2.ejs', {
			dataFromGoogle: dataFromGoogle.body.result, 
			foundPlace: addedPlace,
			foundReview: addedReview
=======
// 		res.render('places/show2.ejs', {
// 			dataFromGoogle: dataFromGoogle.body.result, 
// 			foundPlace: addedPlace,
// 			foundReview: addedReview
>>>>>>> 927d718624c0e71f38856caaed1199a85488228b:controllers/reviews.js

// 		})

// 	} catch(err){
// 		next(err)
// 	}
	
// })

// this is our edit route 
// this edit route will have old information from the database (from the update route)
// to hit this route when button is clicked. it is going to edit an old review with the 
// older checkboxes visible to change 
// router.get('/:place_id/edit/:review_id', async (req, res, next) => {

// 	// get data from google Place Details -- info about one place
// 	const placeId = req.params.place_id

// 	// use req.params.place_id -- build a URL
// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
// 	const placeToAdd = {}
// 	placeToAdd.placeId = req.params.place_id
// 	const addedPlace = await Place.create(placeToAdd)
// 	const foundPlace = await Place.findOne({ placeId: req.params.place_id })
// 	const foundReviews = await Review.find({ place: foundPlace._id })
// 	const foundReviewId = await Review.find(foundReviews.id)

// 	try{

// 		const dataFromGoogle = await superAgent.get(url)

<<<<<<< HEAD:controllers/review.js
		Review.findById(
			req.params._id,
			(err, addedReview) => {
				if(err){
					res.send(err);
				} else {
					res.render('reivew/edit2.ejs', { 
						dataFromGoogle: dataFromGoogle.body.result, 
						foundPlace: addedPlace,
						foundReview: addedReview,
				})
		}
	})
	} catch (err) {
		next(err)
	}
=======
// 		Review.findById(
// 			req.params._id,
// 			(err, addedReview) => {
// 				if(err){
// 					res.send(err);
// 				} else {
// 					res.render('places/edit2.ejs', { 
// 						dataFromGoogle: dataFromGoogle.body.result, 
// 						foundPlace: addedPlace,
// 						foundReview: addedReview,
// 				})
// 		}
// 	})
// 	} catch (err) {
// 		next(err)
// 	}
>>>>>>> 0399f78b736d1894d4d2ed5a218c906a8e224333:controllers/reviews.js
	
// })


// gets info from google API for place with this id
// shows results from google of specific place with the criteria we have set on show.ejs
router.get('/:place_id', async (req, res, next) => {
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;

	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the result from google");
		console.log(dataFromGoogle.body.result);


		// find your place in DB -- your data -- find One
		const foundPlace = await Place.findOne({ placeId: req.params.place_id })

		// find all (.find()) reviews where the place === the _id of the place you just found (your ids, not google )
		const foundReviews = await Review.find({ place: foundPlace._id })

		res.render('review/show2.ejs', {
			dataFromGoogle: dataFromGoogle.body.result,
			foundPlace: foundPlace.body.result,
			foundReviews: foundReview.body.result 
		})

	} catch(err){
		next(err)
	}
})


// this is our update route 
// this is going to update the data base
// router.put('/:place_id', async(req, res, next) => {

// 	// get data from google Place Details -- info about one place
// 	const placeId = req.params.place_id

// 	// use req.params.place_id -- build a URL
// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
// 	const placeToAdd = {}
// 	placeToAdd.placeId = req.params.place_id
// 	const addedPlace = await Place.create(placeToAdd)
// 	const addedReview = await Review.create(reviewToAdd)


// 	try{

// 		const dataFromGoogle = await superAgent.get(url)

// 		Review.findByIdAndUpdate(req.params._id,
// 		 foundPlace.wifi,
// 		 foundPlace.caffeinatedDrinks,
// 		 foundPlace.alcoholicDrinks,
// 		 foundPlace.breakfast,
// 		 foundPlace.lunch,
// 		 foundPlace.dinner,
// 		 foundPlace.vegan,
// 		 foundPlace.glutenFree,
// 		 foundPlace.lactoseIntolerant,
// 		 foundPlace.comfortableChairs,
// 		 foundPlace.outdoorSeating,
// 		 foundPlace.busy,
// 		 foundPlace.relaxed,
// 		 foundPlace.stuffy,
// 		 foundPlace.hip,
// 		 foundPlace.soft,
// 		 foundPlace.energizing,
// 		 foundPlace.intense,
// 			(err, updatedReview) => {
// 				if(err){
// 					res.send(err);
// 				} else {
// 					res.render('show2.ejs', { 
// 						dataFromGoogle: dataFromGoogle.body.result, 
// 						foundPlace: addedPlace,
// 						foundReview: addedReview

// 				})
// 		}
// 	})
// 	} catch (err) {
// 		next(err)
// 	}
// })

// this is our delete route 
// it will delete reviews that are already saved in the database 
// router.delete('/show/:place_id/:review_id', async (req, res, next) => {
	
//     try {
//     	const placeId = req.params.place_id
// 		const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
// 		const placeToAdd = {}
// 		placeToAdd.placeId = req.params.place_id;
// 		const deletedReview = await Review.findByIdAndDelete(req.params.review_id);
// 		console.log("this is the deleted review")
// 		console.log(deletedReview);
        
<<<<<<< HEAD:controllers/review.js
		res.redirect('/review/' + placeId);
    } catch (err){
        next(err);
    }
})
=======
// 		res.redirect('/places/' + placeId);
//     } catch (err){
//         next(err);
//     }
// })
>>>>>>> 0399f78b736d1894d4d2ed5a218c906a8e224333:controllers/reviews.js




module.exports = router