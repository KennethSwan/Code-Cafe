const express = require('express');
const router = express.Router();
const Review = require("../models/reviews")
// console.log(Review);
const superAgent = require('superagent')










router.get('/new', (req, res) => {
	res.render('reviews/new.ejs')
})













router.get('/new/:place_id', async (req, res, next) => {
	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";

	// log data to make sure it's good 
	console.log("\n here's the url in place details search");
	console.log(url);
	console.log(req.params.place_id);

	try{
		const dataFromGoogle = await superAgent.get(url)
		// console.log("\n here's the result from google");
		res.render('reviews/new.ejs', {
			dataFromGoogle: dataFromGoogle.body.result
		})

	} catch(err){
		next(err)
	}

})













router.post('/:place_id', async(req, res, next) => {
	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";
	

	try {
		// const dataFromGoogle = await superAgent.get(url)
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

		console.log(placeToAdd);


		// 
		 const addReview = Review.create(placeToAdd)

		 console.log(req.body);
		 console.log(addReview);
		
		// const userReviewDbEntry = {}; 




		// const userReview = await Review.create()
		// console.log(userReview);


		// console.log("\nwe hit the route.  here is theplace id ", req.params.place_id);
		// console.log("\n here's req.body ", req.body);
		res.send('hit POST /reviews/new/:place_id -- check terminal')

	} catch(err){
		next(err)
	}
	
})


// create a new collection to be added to mongodb for the reviews 

// use .create to add information to db 

// use place_id to add the place to our db

// add the review to our db

// render another page that shows the information/ review that we created as well as the information brought in with the google API. 

// user should be able to see information that they've added as well as what was there before. 









module.exports = router