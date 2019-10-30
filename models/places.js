const mongoose = require('mongoose'); 


const placeSchema = new mongoose.Schema({
	name: String, 
	placeId: String, // from Google
	outlets: Boolean,
	numberOfOutlets: Number, 
	wifi: Boolean, 
	caffeinatedDrinks: Boolean,
 	alcohol: Boolean,
	dinner: Boolean,
	lunch: Boolean,
	gf: Boolean,
	vegan: Boolean, 
  	comfortableChairs: Boolean,
  	outdoorSeating: Boolean,
	atmosphere: [],  
	atmosphereDesc: String,
	music: [],
	musicDesc: String
}); 



const Place = mongoose.model('Place', placeSchema)
module.exports = Place