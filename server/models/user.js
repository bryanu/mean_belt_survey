var mongoose = require('mongoose'),
		Schema 	 = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	first_name: {
		type: 		 String,
		required:  true,
		minlength: 2,
		maxlength: 25
	},
	_polls: [{
		type: Schema.Types.ObjectId,
		ref: 'polls'
	}],
})

UserSchema.methods.validUser = function(enteredName) {
	if (enteredName == this.first_name) {
		return true
	} else {
		return false
	}
}

mongoose.model('users', UserSchema)
