const express = require('express'); 
const router = express.Router();
const Place = require('../models/places')
const superAgent = require('superagent')


// router.get('/', (req, res) => {
// 	res.render('/places/edits.ejs')
// })

router.get('/:zip', async(req, res, next) => {
	const zip = req.params.zip
	const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffeeshops+in+"+zip+"&key=AIzaSyBHFRhxiNyFGr1xAOPOwOdtTY9PI3HEdDE";
	try{
		const dataFromGoogle = await superAgent.get(url)
		console.log("\n here's the data back from google");
		console.log(dataFromGoogle.body.results);
		res.render('places/index.ejs', {
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