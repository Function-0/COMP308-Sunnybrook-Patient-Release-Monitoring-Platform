const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
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
    userName: {
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
    },
    type: {
        type: String,
        enum: ['PATIENT', 'NURSE']
    }
});

// Configure the 'AccountSchema' to use getters and virtuals when transforming to JSON
AccountSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

mongoose.model('Account', AccountSchema);