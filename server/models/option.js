var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OptionSchema = new mongoose.Schema({
	option: {
		type: 		 String,
		required:  true,
		minlength: 3
	},
	like: {
		type: 	 Number,
		default: 0
	},
	_poll: {
		type: Schema.Types.ObjectId,
		ref:  'polls'
	}
})
mongoose.model('options', OptionSchema)
