const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    dailyLog: [{
        cravings: Number,
        irritability: Number,
        anxiety: Number,
        insomnia: Number,
        appetiteLoss: Number,
        moodSwings: Number,
        depression: Number,
        coldSweats: Number,
        confidence: Number,
        happiness: Number,
        motivation: Number,
        createdTime: {
            type: Date,
            default: Date.now
        }
    }],
    createdTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DailyLog', userSchema);