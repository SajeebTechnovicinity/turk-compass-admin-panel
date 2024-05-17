const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    address:String,
    latitude:String,
    longitude:String,
    img:String,
    user_type:{
        type: String,
        required: true,
        enum: ['user','admin'],
    },
    facebook_id:String,
    google_id:String,
    active_lang:{
        type:String,
        default: 'ar',
        enum: ['ar','en'],
    },
    is_notification_on:{
        type: Number,
        default: 1, // Default value is set to 1=on 0=off
    },
    reset_password_code: {
        type: String,
        required: false,
    },
    email_verification_code: {
        type: String,
        required: false,
    },
    is_email_verified: {
        type: Boolean,
        default: 0, // Default value is set to 0 not verified
    },
    device_token: {
        type: String,
        default:null
    },
    rating: {
        type: Number,
        default: 0, // Default value is set to 0
    },
    status: {
        type: Number,
        default: 1, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  1=active, or 0=inactive
    },
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.models.User || mongoose.model("User", userModel)
