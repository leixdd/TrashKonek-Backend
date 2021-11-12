const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    userDetails: {
        nickname: { type: String },
        firstname: { type: String },
        lastname: { type: String },
        birthdate: { type: Date },
        address: { type: String },
    },

    loginDetails: {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },

    verificationDetails: [{
        verification_date: { type: Date, default: Date.now() }
    }],

    notifications: [{
        notif_message: { type: String },
        notif_type: { type: Number },
        notif_date: { type: Date, default: Date.now() }
    }],

    otp: { type: Number },
    joinDate: { type: Date, default: Date.now() },

});

module.exports = mongoose.model('users', UserSchema);