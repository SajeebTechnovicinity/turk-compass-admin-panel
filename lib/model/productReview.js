const mongoose = require('mongoose');

const viewModel = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming product_id is a string, change it accordingly if it's a different type
        required: true,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming user_id is a string, change it accordingly if it's a different type
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming user_id is a string, change it accordingly if it's a different type
        required: true,
    },
    rating: {
        type: Number, // Assuming device_id is a string, change it accordingly if it's a different type
        required: true,
    },
    comment: {
        type: String, // Assuming device_id is a string, change it accordingly if it's a different type
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

export const ProductReview = mongoose.models.product_reviews || mongoose.model('product_reviews', viewModel);