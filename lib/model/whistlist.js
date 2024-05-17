import mongoose from 'mongoose';

const whishlistModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //user id
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, //product id
        required: true,
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

export const Whishlist=mongoose.models.Whishlist || mongoose.model("Whishlist",whishlistModel)