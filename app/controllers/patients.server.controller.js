// Load the module dependencies
const vitalSign = require('mongoose').model('vitalSigns');
const Patients = require('mongoose').model('Patients')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;
const quote = require('mongoose').model('dailyTips');
const mongo = require('mongoose')
const alerts = require('mongoose').model('Alerts');

exports.predictHepatitis = async function (req, res) {
    const tf = require('@tensorflow/tfjs');
    const path = require('path');
    require('@tensorflow/tfjs-node');

    console.log(req.body);

    var parsedFeatures = [];
    Object.entries(req.body).forEach(([key, value]) => {
      parsedFeatures.push(parseFloat(value));
    });

    console.log(parsedFeatures);

    const inputData = tf.tensor2d(parsedFeatures, [1, 19])

    var model = await tf.loadLayersModel('file://' + path.join(__dirname, "..", "..", "ml-model-hepatitis", "model.json"))
    var results = model.predict(inputData)
    console.log(results)
    console.log("----------------")
    results.print()
    console.log("----------------")

    results.array().then((array) => {
      var diePercent = array[0][0];
      var livePercent = array[0][1];

      var finalResultMsg;
      var dieBool;
      
      const warnSign = "⚠";
      const safeSign = "✅";

      if (diePercent > livePercent) {
        finalResultMsg = warnSign + " Danger: You are highly likely to die from Hepatitis."
        dieBool = true;
      } else {
        finalResultMsg = safeSign + " Safe: You are highly unlikely to die from Hepatitis."
        dieBool = false;
      }
  
      res.status(200).send({"result": finalResultMsg, "isDie": dieBool});
    })
};

exports.createAlert = function (req, res, next) {

     // Create a new instance of the 'User' Mongoose model
     var newAlert = new alerts(); //get data from React form
     console.log(req.cookies.id);
 
 
     Patients.findById(req.cookies.id, (err, alert1) => {
         if (err) {
             return res.status(500).send(err).end();
         } else {
             if (alert1) {
               console.log(alert1);
                newAlert.Patients = mongo.Types.ObjectId(req.cookies.id);
                newAlert.message = req.body.message;
 
                
                newAlert.save((err) => {
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



    quote.find({}).populate({
        path: 'Patients',
        match: {'_id': mongo.Types.ObjectId(req.cookies.id)}
    }).exec(function (err, test) {
        console.log(test)
        
        res.send(test[test.length - 1].message);
    });

  

};