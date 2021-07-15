const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    imageName: {
        type: String, 
        default: 'none'
    },
    imageData: {
        type: String
    },
    type: {
        type: String
    },
    modifiedTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Image', userSchema);