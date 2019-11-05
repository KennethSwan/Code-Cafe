const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		requireed: true
	},
	password:{
		type: String, 
		required: true
	} 
	//review 
})

const User = mongoose.model('User', userSchema);

module.exports = User; 