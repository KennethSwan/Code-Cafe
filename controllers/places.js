const express = require('express'); 
const router = express.Router();
const Place = require('../models/places')
const superAgent = require('superagent')


// show the user a search page
router.get('/search', (req, res) => {
	res.render('places/search.ejs')
})

router.post('/search', async (req, res, next) => {
	const zip = req.body.zipcode
	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key="+process.env.API_KEY;
	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's data from google in POST /search dataFromGoogle", dataFromGoogle.body.results);
		res.render('places/index.ejs', {
			dataFromGoogle: dataFromGoogle.body.results

		})
	} catch (err) {
		next(err);
	}
}); 



router.get('/search/:place_id', async (req, res, next) => {

	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id --  build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
	// log data make sure it's good
	console.log("\n here's the url in place details search");
	console.log(url);
	console.log(req.params.place_id);


	// later: see if there is any info in our DB and if so, include it here
	// don't forget to add more info below

	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the result from google ", );
		res.render('places/show.ejs', {
			dataFromGoogle: dataFromGoogle.body.result

		})
	} catch(err){
		next(err)
	}

})






// places show route
// get google info for place with this id
// GET /places/:place_id
router.get('/:place_id', async (req, res, next) => {
	const placeId = req.params.place_id

	// use req.params.place_id -- build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;

	// log data to make sure it's good 
	console.log("\n here's the url in place details search");
	console.log(url);
	console.log(req.params.place_id);

	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the result from google");
		console.log(dataFromGoogle.body.result);


		// find your place in DB -- your data -- find One
		const foundPlace = await Place.findOne({ placeId: req.params.place_id })

		// find all (.find()) reviews where the place === the _id of the place you just found (your ids, not google )
		const foundReviews = await Review.find({ place: foundPlace._id })

		console.log("\nhere is foundPlace")
		console.log(foundPlace);
		console.log("\nhere is foundReviews")
		console.log(foundReviews);

		// render a diff place show template (create a new template for this)
		res.render('places/show2.ejs', {
			dataFromGoogle: dataFromGoogle.body.result,
			foundPlace: foundPlace.body.result,
			foundReviews: foundReview.body.result 
		})

	} catch(err){
		next(err)
	}
})















// this route will allow our user to be able to CUD their own review as well as Read those of others, given that others have left a review for this coffee shop.

// to do this, we may need to "change" some data from the google places api

// we may be able to do this all with one route, which would be ideal. 
module.exports = router;