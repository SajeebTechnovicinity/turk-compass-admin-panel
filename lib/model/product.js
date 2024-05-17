const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User is the model for users
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Assuming Category is the model for categories
    subcategory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }, // Assuming Subcategory is the model for subcategories
    images: [String], // Array of image URLs or metadata
    slug: String,
    description: String,
    price: {
        type: Number,
        required: true,
    },
    is_negotiable: Boolean,
    rating: {
        type: Number,
        default: 0,
    },
    is_sold: {
        type: Boolean,
        default: false,
    },
    access_range: {
        type: Number,
        default: 0,
        ref: 'in km',
    },
    shipping_type: {
        type: Number,
        default: 1,
        enum: [1, 2, 3],//shipping_type value 1=receive  priority= product access range,2=deliver  priority= client access range.3=both  priority= product access range
    },
    amount_of_view: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Define and export the Product model
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

