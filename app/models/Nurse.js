const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NurseSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
});
// Configure the 'HealthPractionerSchema' to use getters and virtuals when transforming to JSON
NurseSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

// Create the 'HeatlhPractitioner' model out of the 'HeatlhPractitionerSchema'
mongoose.model("Nurse", NurseSchema);