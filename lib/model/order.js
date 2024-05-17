const mongoose = require('mongoose');

const orderModel=new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //buyer id
        required: true,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    bidding_pric:{
        type:Number,
        required: true,
    },
    order_status:{
        type: Number,
        default: 1, // Default value if not provided
        enum: [1,2,3], // Example: Only allow values  1=bidding order, or 2=bidding accept 3=completed
    },
    shipping_address:{
        type: String,
        required: true,
    },
    billing_address:{
        type: String,
        required: true,
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

// export const Product = mongoose.models.products || mongoose.model("products", productModel);
export const Order=mongoose.models.orders||mongoose.model("orders",orderModel)