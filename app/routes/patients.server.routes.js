// Load the 'users' controller
var patients = require('../../app/controllers/patients.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
  
    app.get('/listpatients', patients.listPatients);

};

