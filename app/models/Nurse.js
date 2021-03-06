const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const NurseSchema = new Schema({
    firstName: {
        type: String,
        required: "First name is required",
        trim: true
    },
    lastName: {
        type: String,
        required: "Last name is required",
        trim: true
    },
    username: {
        type: String,
        required: "Username is required",
        trim: true
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password && password.length > 6,
            "Password should be longer",
        ],
    }
});
// Set the 'fullname' virtual property
NurseSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
NurseSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
NurseSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
NurseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'HeatlhPractitioner' model out of the 'HeatlhPractitionerSchema'
mongoose.model("Nurse", NurseSchema);