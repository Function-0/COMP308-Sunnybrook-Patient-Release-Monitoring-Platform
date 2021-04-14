const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyTipsSchema = new Schema({
    message: {
        type: String,
        required: "Message is required",
        trim: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    }
});
// Configure the 'HealthPractionerSchema' to use getters and virtuals when transforming to JSON
dailyTipsSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

// Create the 'HeatlhPractitioner' model out of the 'HeatlhPractitionerSchema'
mongoose.model("dailyTips", dailyTipsSchema);