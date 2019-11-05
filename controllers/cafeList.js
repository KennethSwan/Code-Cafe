const express = require('express');
const router = express.Router();

const cafeList = require("./models/cafeList.js")
const User = require("../models/user.js")

router.get('/', (req, res) => {
	res.render('cafeList/index.ejs', {
		cafeList: cafeList,
	})

router.get('/cafeList/new', (req, res) => {
	res.render('new.ejs')
})


module.exports = router;