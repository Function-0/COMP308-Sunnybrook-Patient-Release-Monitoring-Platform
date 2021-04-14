// Load the module dependencies
const vitalSign = require('mongoose').model('vitalSigns');
const Patients = require('mongoose').model('Patients')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;


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


async function init() {
    console.log(1);
    await sleep(1000);
    console.log(2);
  }

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

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


    // var features = req.body;
    // for (var currFeature in features) {
    //     features[currFeature] = 
    // }

    // const processedFeatures = rawFeatures.map((feature) => [
    //     feature.Age === 'on' ? 1 : 2,
    // ]);
};