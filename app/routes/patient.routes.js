// Load the 'users' controller
var Patients = require('../../app/controllers/patientSignUp');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /users path
    // and list users when /users link is selected
    app.get("/patients",Patients.requiresLogin,Patients.list); //go to http://localhost:3000/users to see the list
    //handle a post request made to root path
    app.post('/patients', Patients.create);
    //
    // Set up the 'users' parameterized routes 
	app.route('/patients/:userId')
    .get(Patients.read)
    .put(Patients.update)
    .delete(Patients.delete)
    // Set up the 'userId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('userId', Patients.userByID);
    //authenticate user
    app.post('/psignin', Patients.authenticate);
    app.get('/psignout', Patients.signout);
    app.get('/read_cookie', Patients.isSignedIn);

    //path to a protected page
	app.get('/pwelcome',Patients.welcome);
    
};

