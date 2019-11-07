const mongoose = require('mongoose'); 

const reviewSchema = new mongoose.Schema({
	place: Number, // index of the array of cafeList 
	review: String 
})

const Review = mongoose.model('User', reivewSchema);

module.exports = Review