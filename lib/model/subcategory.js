import mongoose from 'mongoose';

// Define the schema for the subcategory
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Referring to the 'Category' model
    },
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

// Define and export the SubCategory model
export const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subcategorySchema);
