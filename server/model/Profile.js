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
    smokingTimesPerDay: {
        type: Number, 
        min: 0
    },
    smokingTimesPerWeek: {
        type: Number, 
        min: 0
    },
    smokingCostPerWeek: {
        type: Number, 
        min: 0
    },
    soberDate: {
        type: Date,
    },
    createdTime: {
        type: Date
    },
    modifiedTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Profile', userSchema);