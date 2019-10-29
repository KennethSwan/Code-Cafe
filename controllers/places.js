const express = require('express'); 
const router = express.Router();
const Place = require('../models/places')
const superAgent = require('superagent')


router.get('/', (req, res) => {
	res.render('./places/search.ejs')
})

router.post('/search', async(req, res, next) => {
	console.log("\n here's req.body (req.body) in POST /places/search");
	console.log(req.body);
	const zip = req.body.zipcode
	console.log("\n here's zip (req.body.zip) in POST /places/search");
	console.log(zip);
	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";
	console.log("\n here's URL we're going to search in POST /places/search");
	console.log(url);
	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the data back from google");
		console.log(dataFromGoogle.body.results);
		res.render('./places/index.ejs', {
			dataFromGoogle: dataFromGoogle.body.results
		})
	} catch (err) {
		next(err);
	}

}); 

router.get('/show', async(req, res, next) => {
	try {
		const allCoffee = await dataFromGoogle.body.results
		res.render('places/show.ejs', {
			data: allCoffee
		});

	} catch(err) {
		next(err)
	}
});



module.exports = router;