const express = require('express');
const router = express.Router();
const Review = require("../models/reviews")

router.get('/new', (req, res) => {
	res.render('reviews/new.ejs')
})

module.exports = router