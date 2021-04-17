const mongoose = require('mongoose');
const patientRoutes = require('../routes/patient.routes');
const DailyInfos = mongoose.model('dailyInfos');
const User = require('mongoose').model('User');
const Patient = require ('mongoose').model("Patients");
const mongo = require('mongoose');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.addDailyInfos = function (req, res) {
    

    var patientId = req.cookies["id"]

    //article.creator = req.body.username;
    console.log("================================")
    console.log(req.body)
    console.log("==========================")
    
    Patient.findById(patientId, (err, patient) => {
        if (err) {
            return res.status(500).send(err).end();
        } else  {
            if (patient) {

                const dailyInfos = new DailyInfos();
                dailyInfos.heartRate = req.body.heartRate;
                dailyInfos.SBP = req.body.SBP;
                dailyInfos.DBP = req.body.DBP;
                dailyInfos.DBP = req.body.DBP;
                dailyInfos.weight = req.body.weight;
                dailyInfos.temperature = req.body.temperature;
                dailyInfos.respiratoryRate = req.body.respiratoryRate;

                dailyInfos.Patients = mongo.Types.ObjectId(patientId);

                dailyInfos.save((err) => {
                    if (err) {
                        console.log('error', getErrorMessage(err))
        
                        return res.status(400).send({
                            message: getErrorMessage(err)
                        });
                    } else {
                        res.status(200).json(dailyInfos);
                    }
                });

            }
        }
    })

};
//
exports.list = function (req, res) {
 
        DailyInfos.find({}).populate({
            path: 'Patients',
            match: {'_id': mongo.Types.ObjectId(req.cookies.id)}
        }).exec(function (err, test) {
            console.log(test)
    
            res.send(test[test.length - 1].message);
        });
     
      
     
    
};
//
exports.dailyInfosByID = function (req, res, next, id) {
    DailyInfos.findById(id).populate('creator', 'firstName lastName fullName').exec((err, dailyInfos) => {if (err) return next(err);
    if (!dailyInfos) return next(new Error('Failed to load article '
            + id));
        req.dailyInfos = dailyInfos;
        console.log('in dailyInfosByID:', req.dailyInfos)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.dailyInfos);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.article)
    const dailyInfos = req.dailyInfos;
    dailyInfos.heartRate = req.body.heartRate;
    dailyInfos.SBP = req.body.SBP;
    dailyInfos.DBP = req.body.DBP;
    dailyInfos.DBP = req.body.DBP;
    dailyInfos.weight = req.body.weight;
    dailyInfos.temperature = req.body.temperature;
    dailyInfos.respiratoryRate = req.body.respiratoryRate;
    dailyInfos.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(dailyInfos);
        }
    });
};
//
exports.delete = function (req, res) {
    const dailyInfos = req.dailyInfos;
    dailyInfos.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(dailyInfos);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.dailyInfos.creator)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.dailyInfos.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
