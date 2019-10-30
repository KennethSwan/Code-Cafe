const express = require('express');
const router = express.Router();
const Review = require("../models/reviews")
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
		console.log("\n here's the result from google");
		res.render('reviews/new.ejs', {
			dataFromGoogle: dataFromGoogle.body.result
		})

	} catch(err){
		next(err)
	}

})













router.post('/:place_id', async(req, res, next) => {
	console.log("\nwe hit the route.  here is theplace id ", req.params.place_id);
	res.send('hit POST /reviews/new/:place_id -- check terminal')
})

// create a new collection to be added to mongodb for the reviews 

// use .create to add information to db 

// use place_id to add the place to our db

// add the review to our db

// render another page that shows the information/ review that we created as well as the information brought in with the google API. 

// user should be able to see information that they've added as well as what was there before. 









module.exports = router