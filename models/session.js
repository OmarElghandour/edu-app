const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    sessionOwner : {
        type: {},
        required: true,
        default: {}
    },
    sessionSubscribers : {
        type: [],
        required: false,
        default: []
    }
});
module.exports = mongoose.model('Session', sessionSchema);
