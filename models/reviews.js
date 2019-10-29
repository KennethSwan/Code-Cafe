const mongoose = require('mongoose'); 

const reviewSchema = new.mongoose.Schema({
	reviewerName: String,
	name: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Place'
	}]
	text: String, 
	// timestamp: 
	recommend: Boolean, 
	rating: Number
})

const Review = mongoose.model('Review', reviewSchema)