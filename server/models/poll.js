var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PollSchema = new mongoose.Schema({
	poll: {
		type: 		 String,
		required:  true,
		minlength: 8
	},
	_options: [{
		type: Schema.Types.ObjectId,
		ref:  'options'
	}],
	_user: {
		type: String
	}
}, {
	timestamps: true
})
mongoose.model('polls', PollSchema)
