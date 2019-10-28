const mongoose = require('mongoose'); 



const placeSchema = new mongoose.Schema({
	name: String, 
	placeId: place_id from google places api
	outlets: Boolean,
	numberOfOutlets: null, 
	wifi: Boolean, 
	caffeinatedDrinks: Boolean,
 	alcohol: Boolean,
	dinner: Boolean,
	lunch: Boolean,
	gf: Boolean,
	vegan: Boolean, 
  	comfortableChairs: Boolean,
  	outdoorSeating: Boolean,
	howBusy: String, 
	smallBusinessOrCorporation: String,
	lighting: String,
	atmosphere: [],  
	atmosphereDesc: String,
	music: [],
	musicDesc: String
}); 



const Place = mongoose.model('Place', placeSchema)
module.exports = Place