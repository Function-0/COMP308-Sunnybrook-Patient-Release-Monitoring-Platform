// Load the module dependencies
const vitalSign = require('mongoose').model('vitalSigns');
const quote = require('mongoose').model('dailyTips');
const mongo = require('mongoose')
const alerts = require('mongoose').model('Alerts');

const Patients = require('mongoose').model('Patients')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

exports.createVitalSign = function (req, res, next) {

    //Create a new instance of the 'User' Mongoose model
    var vitalsigns = new vitalSign(req.body); //get data from React form
    console.log("body: " + req.body);

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

exports.createQuote = function (req, res, next) {

    // Create a new instance of the 'User' Mongoose model
    var dailyQuote = new quote(); //get data from React form
    console.log(req.body.id);





    Patients.findById(req.body.id, (err, patient) => {
        if (err) {
            return res.status(500).send(err).end();
        } else {
            if (patient) {
              console.log(patient);
                dailyQuote.Patients = mongo.Types.ObjectId(req.body.id);
                dailyQuote.message = req.body.message;

               
                dailyQuote.save((err) => {
                    if (err) {
                        return res.status(500).send({
                            message: "There was an Error Creating the practitioner.",
                            err: err
                        }).end();
                    } 
                        
                    
                });
            }
        }})
    }

    exports.getallalerts = function(req, res){

        // quote.find({}).populate({

        //     path: 'Patients',
    
        //     match: {'_id': mongo.Types.ObjectId(req.cookies.id)}
        // }).exec(function (err, test) {
        //     console.log(test)
        //     res.send(test[test.length - 1].message);
    
        // });

        alerts.find({}).populate({path: 'Patients'}).exec((err, alert) => {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
        
            } else {
                res.send(alert);
                console.log("--------------------")
                console.log(alert)
                console.log("--------------------")


            }
        
        });
    }

    // Use the 'User' instance's 'save' method to save a new user document
   