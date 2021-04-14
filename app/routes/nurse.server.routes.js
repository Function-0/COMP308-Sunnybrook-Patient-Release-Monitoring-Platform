// Load the 'users' controller
var nurses = require('../../app/controllers/nurse.server.controller');
var patients = require('../../app/controllers/patients.server.controller');

var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
  
    app.post('/vitalsigns', nurses.createVitalSign);
    app.get('/vitalsigns', patients.listVitals);
    app.post('/setquote', nurses.createQuote);

};

