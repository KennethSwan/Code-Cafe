const mongoose = require('mongoose'); 

const cafeList = [
	{ 
		name: "Goddess and the Baker",
		address: "33 W Wabash Avenue",
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}] 
	},
	{
		name: "Dollop Coffee",
		address: "801 S Financial Place",
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review' 
		}]  
	}, 
	{
		name: "The Wormhole Coffee",
		address: "1462 N Milwaukee Avenue",
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}]
	},
	{
		name: "Swada Coffee",
		address: "112 N Green Street",
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review' 
		}]
	},
	{
		name: "Cafe Integral at Freehand Chicago",
		address: "19 E Ohio St",
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review' 
		}]
	},
	{
		name: "Stumptown Coffee Roasters",
		address: "311 N Morgan St", 
		review: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}] 
	}
];

module.exports = cafeList