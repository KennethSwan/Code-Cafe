const express = require('express'); 
const router = express.Router();
const Place = require('../models/places')
const superAgent = require('superagent')


router.get('/', (req, res) => {
	res.render('places/search.ejs')
})

router.post('/search', async(req, res, next) => {
	const zip = req.body.zipcode
	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";
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

// router.get('/search', (req, res) => {
// // 	res.render('/places/show.ejs')
// });

// router.get('/show', async(req, res, next) => {
// 	try {
// 		const allCoffee = await dataFromGoogle.body.results
// 		res.render('places/show.ejs', {
// 			data: allCoffee
// 		});
// 	} catch(err) {
// 		next(err)
// 	}
// });

router.get('/search/:place_id', async (req, res, next) => {

	// get data from google Place Details -- info about one place
	const placeId = req.params.place_id

	// use req.params.place_id --  build a URL
	const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";
	// log data make sure it's good
	console.log("\n here's the url in place details search");
	console.log(url);
	console.log(req.params.place_id);


	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the result from google ", );
		res.render('places/show.ejs', {
			dataFromGoogle: dataFromGoogle.body.result
		})
		// res.render('places/show.ejs', { dataFromGoogle: cafe })
	} catch(err){
		next(err)
	}

})



module.exports = router;