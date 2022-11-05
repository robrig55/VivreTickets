const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    last_update: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Content', ContentSchema)