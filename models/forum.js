var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForumSchema = new Schema({
	category: { type: Schema.Types.ObjectId, ref: 'Category'},
	title: { type: String, unique: true},
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now },
	active: Boolean
});

module.exports = mongoose.model('Forum', ForumSchema);