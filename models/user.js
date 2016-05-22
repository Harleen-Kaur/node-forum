var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/* The user schema attributes/ characteristics/ fields */
var UserSchema = new Schema({
	username : { type: String, unique: true},
	email : { type: String, lowercase: true},
	password : String, 

	profile: {
		name: { 
		firstname: { type: String, default: ''},
		lastname: { type: String, default: ''}
		},
		// gender: { type: String, default: ''},
		picture: { type: String, default: ''}
	},

	//for maintaining history of user
	history: [{
		date: Date
	}]
});


/* Hash the password before we even save it to the database */
UserSchema.pre('save', function(next){	//pre is for pre saving it before saving to DB
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){	//generate random data of mentioned characters
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});


/* Compare password in the database and the one that the user types in */
UserSchema.methods.comparePassword = function (password) { //.methods is for custom method
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.gravator = function(size){
	if(!this.size)
		size= 200;
	if(!this.username)
		return 'https://gravator.com/avatar/?s' + size + '&d=retro';
	var md5 = crypto.createHash('md5').update(this.username).digest('hex');
	return 'https://gravator.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

module.exports = mongoose.model('User', UserSchema);