const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertsSchema = new Schema({
    created:{
        type: Date,
        default: new Date(),
    },
    message: {
        type: String,
        required: "Message is required",
        trim: true
    },
    Patients: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    }
});
// Configure the 'HealthPractionerSchema' to use getters and virtuals when transforming to JSON
AlertsSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

// Create the 'HeatlhPractitioner' model out of the 'HeatlhPractitionerSchema'
mongoose.model("Alerts", AlertsSchema);