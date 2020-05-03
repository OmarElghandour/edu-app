const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required : true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose.model('Subscriber', subscriberSchema);
