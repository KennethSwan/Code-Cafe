const express = require('express');
const router = express.Router();

const cafeList = require("../models/cafeList.js")
const User = require("../models/user.js")

router.get('/', (req, res) => {
	res.render('cafeList/index.ejs', {
		cafeList: cafeList,
	})
})

// new route
router.get('/new', (req, res) => {
	res.render('cafeList/new.ejs')
})

// show route - where you can see reviews of cafe
router.get('/:id', (req, res) => {
	const oneCafe = cafeList[req.params.id]
	res.render('cafeList/show.ejs', {
		cafeList: oneCafe,
		i: req.params.id
	})
})

// post route - create route
router.post('/', (req, res) => {
	cafeList.push(req.body);
	res.redirect('/cafeList/')
})

// edit route 
router.get('/:index/edit', (req, res) => {
	res.render('cafeList/edit.ejs', {
		// use query to find review 
		// use a loop to add and edit reviews 
		oneCafe: cafeList[req.params.index],
		index: req.params.index 
	})
})

// put route 
router.put('/:index', (req, res) => {
	cafeList[req.params.index] = req.body;
	res.redirect('/cafeList/')
})

//delete cafe 
// router.delete('/:index', (req, res) => {
// 	cafeList.splice(req.params.index, 1)
// 	res.redirect('/cafeList/')
// })

module.exports = router;