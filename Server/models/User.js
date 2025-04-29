const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    roles: {
        type: String, 
        enum: ['lacturer', 'student'],
        default: 'lacturer'
    },
});

module.exports = mongoose.model('User', UserSchema);
