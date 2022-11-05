const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    eventTitle:{
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Array,
        required: true
    },
    orderId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Activity', ActivitySchema)