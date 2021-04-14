// Load the module dependencies
const vitalSign = require('mongoose').model('vitalSigns');
const Patients = require('mongoose').model('Patients')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

// Create a new user
exports.createVitalSign = function (req, res, next) {

    // Create a new instance of the 'User' Mongoose model
    var vitalsigns = new vitalSign(req.body); //get data from React form
    console.log("body: " + req.body.username);

    // Use the 'User' instance's 'save' method to save a new user document
    vitalsigns.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(vitalsigns);
            
        }
    });
};

