const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    quittingReason: {
        type: String, 
        min: 6,
        max: 255
    },
    // quittingReasonPhoto: {
        // data: Buffer,
        // contentType: String
    // },
    smokingTimesPerDay: Number,
    hoursStonedPerDay: Number,
    smokingCostPerWeek: Number,
    soberDate: Date,
    createdTime: {
        type: Date,
        default: Date.now
    },
    modifiedTime: {
        type: Date
    }
})

module.exports = mongoose.model('Profile', userSchema);