const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyInfosSchema = new Schema({
    created:{
        type: Date,
        default: new Date(),
    },
    heartRate:{
        type: Number,
        required: "heartRate is required",
        trim: true
    },
    SBP:{
        type: Number,
        required: "SBP is required",
        trim: true
    },
    DBP:{
        type: Number,
        required: "DBP is required",
        trim: true
    },
    weight:{
        type: Number,
        required: "Weight is required",
        trim: true
    },
    temperature:{
        type: Number,
        required: "Temperature is required",
        trim: true
    },
    respiratoryRate:{
        type: Number,
        required: "espiratoryRate is required",
        trim: true
    },
    Patients: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    }
});

// Configure the 'AccountSchema' to use getters and virtuals when transforming to JSON
dailyInfosSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

mongoose.model('dailyInfos', dailyInfosSchema);