const mongoose = require('mongoose'); 

const reviewSchema = new mongoose.Schema({
	place: Number, 
	review: String 
})

const Review = mongoose.model('User', reivewSchema);

module.exports = Review