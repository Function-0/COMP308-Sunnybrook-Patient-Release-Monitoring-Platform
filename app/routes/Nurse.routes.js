// Load the 'users' controller
var Nurse = require('../../app/controllers/NurseSignUp');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /users path
    // and list users when /users link is selected
    app.get("/Nurses",Nurse.requiresLogin,Nurse.list); //go to http://localhost:3000/users to see the list
    //handle a post request made to root path
    app.post('/Nurses', Nurse.create);
    //
    // Set up the 'users' parameterized routes 
	app.route('/Nurses/:userId')
    .get(Nurse.read)
    .put(Nurse.update)
    .delete(Nurse.delete)
    // Set up the 'userId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('userId', Nurse.userByID);
    //authenticate user
    app.post('/signin', Nurse.authenticate);
    app.get('/signout', Nurse.signout);
    app.get('/read_cookie', Nurse.isSignedIn);

    //path to a protected page
	app.get('/welcome',Nurse.welcome);
    
};

