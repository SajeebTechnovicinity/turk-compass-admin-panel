const mongoose = require('mongoose');

const viewModel = new mongoose.Schema({
    product_id: {
        type: String, // Assuming product_id is a string, change it accordingly if it's a different type
        required: true,
    },
    user_id: {
        type: String, // Assuming user_id is a string, change it accordingly if it's a different type
        required: true,
    },
    device_id: {
        type: String, // Assuming user_id is a string, change it accordingly if it's a different type
        required: false,
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    is_delete: {
        type: Boolean,
        default: false, // Default value should be a boolean (true/false)
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const ProductView = mongoose.models.product_views || mongoose.model('product_views', viewModel);