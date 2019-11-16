const mongoose = require('mongoose'); 


const placeSchema = new mongoose.Schema({
	name: String, 
	placeId: String, // from Google
	outlets: String, 
	wifi: Boolean, 
	caffeinatedDrinks: Boolean,
 	alcoholicDrink: Boolean,
	breakfast: Boolean,
	lunch: Boolean,
	dinner: Boolean,
	vegan: Boolean,
	glutenFree: Boolean,
	lactoseIntolerant: Boolean,
  	comfortableChairs: Boolean,
  	outdoorSeating: Boolean,
	busy: Boolean,
	relaxed: Boolean,
	stuffy: Boolean,
	hip: Boolean,
	soft: Boolean,
	energizing: Boolean,
	intense: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	additionalInfo: String
	// name -- from google
	// address -- from google 
}); 



const Place = mongoose.model('Place', placeSchema)
module.exports = Place