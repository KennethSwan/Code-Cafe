const express = require('express');
const router = express.Router();

const cafeList = require("../models/cafeList.js")
const User = require("../models/user.js")

router.get('/', (req, res) => {
	res.render('cafeList/index.ejs', {
		cafeList: cafeList,
	})

// new route
router.get('/cafeList/new', (req, res) => {
	res.render('new.ejs')
})

// show route 
router.get('/cafeList/:id', (req, res) => {
	const oneCafe = cafeList[req.params.id]
	res.render('show.ejs', {
		cafeList: oneCafe,
		i: req.params.id
	})
})

// post route 
router.post('/', (req, res) => {
	cafeList.push(req.body);
	res.redirect('/cafeList/')
})

// edit route 
router.get('/cafeList/:index/edit', (req, res) => {
	res.render('edit.ejs', {
		oneCafe: cafeList[req.params.index],
		index: req.params.index
	})
})

// put route 
router.put('/cafeList/:index', (req, res) => {
	cafeList[req.params.index] = req.body;
	res.redirect('/cafeList/')
})

app.delete('cafeList/:index', (req, res) => {
	cafeList.splice(req.params.index, 1)
	res.redirect('/cafeList/')
})
})

module.exports = router;