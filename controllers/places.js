const express = require('express'); 
const router = express.Router();
const Place = require('../models/places')
const Review = require('../models/reviews')
const superAgent = require('superagent')

router.get('/new', (req, res) => {
	res.render('new.ejs')
})

// send user to a new page to add a review
router.get('/', (req, res) => {
	Place.find({}, (err, allPlaces) => {
	res.render('new.ejs', {
		places: allPlaces
	})
})
})
// allow user to create a review
router.post('/', (req, res) => {
	Place.create(req.body, (err, createdPlace) => {
		if(err){
			console.log(err);
		} else {
			res.render('/show')
		}
	})
})
// show the user a page of all reviews so far
router.get('/:id', (req, res) => {
	Place.findById(req.params.id, (err, foundPlace) => {
		if(err){
			res.send(err);
		} else {
	res.send('show.ejs', {
		places: foundPlace

	})
}
})
})
router.get('/:id/edit', (req, res) => {
	Place.findById(req.params.id, (err, foundPlace) => {
		res.render('edit.ejs', {
			place: foundPlace
		})
	})
})
// router.get('/show3', (req, res) => {
// 	res.render('show3.ejs')
// })

// // user is able to searh cafe by zipcode 
// router.post('/search', async (req, res, next) => {
// 	const zip = req.body.zipcode
// 	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key="+process.env.API_KEY;
// 	try{
// 		const dataFromGoogle = await superAgent.get(url)
// 		console.log("\n here's data from google in POST /search dataFromGoogle", dataFromGoogle.body.results);
// 		res.render('places/index.ejs', {
// 			dataFromGoogle: dataFromGoogle.body.results

// 		})
// 	} catch (err) {
// 		next(err);
// 	}
// }); 


// // shows user information from google API  
// router.get('/search/:place_id', async (req, res, next) => {

// 	// get data from google Place Details -- info about one place
// 	const placeId = req.params.place_id

// 	// use req.params.place_id --  build a URL
// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;
// 	// log data make sure it's good

// 	try{
// 		const dataFromGoogle = await superAgent.get(url);
// 		res.render('places/show.ejs', {
// 			dataFromGoogle: dataFromGoogle.body.result

// 		})
// 	} catch(err){
// 		next(err)
// 	}

// })


// // gets info from google API for place with this id
// // shows results from google of specific place with the criteria we have set on show.ejs
// router.get('/:place_id', async (req, res, next) => {
// 	const placeId = req.params.place_id

// 	// use req.params.place_id -- build a URL
// 	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key="+process.env.API_KEY;

// 	try{
// 		const dataFromGoogle = await superAgent.get(url)
// 		console.log("\n here's the result from google");
// 		console.log(dataFromGoogle.body.result);


// 		// find your place in DB -- your data -- find One
// 		const foundPlace = await Place.findOne({ placeId: req.params.place_id })

// 		// find all (.find()) reviews where the place === the _id of the place you just found (your ids, not google )
// 		const foundReviews = await Review.find({ place: foundPlace._id })

// 		res.render('places/show2.ejs', {
// 			dataFromGoogle: dataFromGoogle.body.result,
// 			foundPlace: foundPlace.body.result,
// 			foundReviews: foundReview.body.result 
// 		})

// 	} catch(err){
// 		next(err)
// 	}
// })

module.exports = router;