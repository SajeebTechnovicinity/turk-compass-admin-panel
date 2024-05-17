import mongoose from 'mongoose';

// Define the schema for the category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ar_name: {
        type: String,
        required: true,
    },
    slug: String,
    status: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    is_delete: {
        type: Boolean,
        default: false, // Default value is set to false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Define and export the Category model
export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
