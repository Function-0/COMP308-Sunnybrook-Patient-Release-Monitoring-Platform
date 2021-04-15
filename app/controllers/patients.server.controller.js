// Load the module dependencies
const vitalSign = require('mongoose').model('vitalSigns');
const Patients = require('mongoose').model('Patients')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;
const quote = require('mongoose').model('dailyTips');


exports.listPatients = function (req, res) {
    Patients.find().exec((err, patients) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(patients);
        console.log(patients)
    }
});
};

exports.listVitals = function (req, res) {
    vitalSign.find().exec((err, vitals) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(vitals);
        console.log(vitals)
    }
});
};

exports.vitalSignByPatientId = function (req, res, next, id) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	vitalSign.findOne({
        _id: id
	}, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.user = user;
            console.log(user);
			// Call the next middleware
			next();
		}
	});
};

exports.listQuote = function (req, res) {
   
    	// Use the 'User' static 'findOne' method to retrieve a specific user
        var id = "dsafsdfsa"
        console.log("id", id)
        
        // Patients.findById(req.cookies["id"], (err, patient) => {
        //     if (err) {
        //         return res.status(500).send(err).end();
        //     } else {

        //         quote.findOne()({
        //             Patients: patient
        //         }, (err, quote) => {
        //             if (err) {
        //                 console.log(err)
        //                 // Call the next middleware with an error message
        //                 return next(err);
        //             } else {
        //                 // Set the 'req.user' property
        //                 req.quote = quote;
        //                 console.log(quote);
        //                 res.status(200).send({"quote": quote.message});

        //                 // Call the next middleware
        //                 next();
        //             }
                
        //         })
            
//             }




// })
}