var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
	forum: { type: Schema.Types.ObjectId, ref: 'Forum'},
	title: String,
	description: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	comments: [{ 
		body: String, 
		posted_date: Date, 
		posted_by: {type: Schema.Types.ObjectId, ref: 'User'} 
	}],
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now },
	active: { type: Boolean, default: 1 },
	status: { type: Boolean, default: 1 }
});

module.exports = mongoose.model('Topic', TopicSchema);