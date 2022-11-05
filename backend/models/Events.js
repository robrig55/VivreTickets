const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    banner_url: {
        type: String,
        required: true
    },
    seatplan_url: {
        type: String,
        required: true
    },
    paypal_email: {
        type: String,
        required: true
    },
    seat_name: {
        type: Array,
        required: true
    },
    seat_price: {
        type: Array,
        required: true
    },
    seat_ticket_count: {
        type: Array,
        required: true
    },
    seat_ticket_sale_count: {
        type: Array,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = mongoose.model('Events', EventSchema)