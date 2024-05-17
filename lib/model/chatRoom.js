import mongoose from "mongoose";
const chatRoomModel=new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
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
})
export const ChatRoom=mongoose.models.chat_rooms || mongoose.model("chat_rooms",chatRoomModel)