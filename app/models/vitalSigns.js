const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const vitalSignsSchema = new Schema({
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
    },
    PatientUserName: {
        type: String,
        trim: true
    },
    Nurses: {
        type: Schema.Types.ObjectId,
        ref: 'Nurse'
    }
});
vitalSignsSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

// Create the 'HeatlhPractitioner' model out of the 'HeatlhPractitionerSchema'
mongoose.model("vitalSigns", vitalSignsSchema);