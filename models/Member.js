const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    firtsName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Member', memberSchema);