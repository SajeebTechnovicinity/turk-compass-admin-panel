const mongoose = require('mongoose');

const secretModel = new mongoose.Schema({
    secret: {
        type: String,
        required: false,
    },
});

export const Secret = mongoose.models.Secret || mongoose.model("Secret", secretModel)
