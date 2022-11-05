const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    confirmationCode: {
        type: String,
        unique: true
    }
});

module.exports =  mongoose.model('Users', UserSchema);
