const mongoose = require('mongoose'); 

const reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	place: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Place'
	},
	text: String, 
	// timestamp: 
	recommend: Boolean, 
	rating: Number
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
