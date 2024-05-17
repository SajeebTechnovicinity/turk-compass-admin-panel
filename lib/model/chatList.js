import mongoose from "mongoose";
const chatListModel=new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type:String,
    },
    image: {
        type:[String],
    },
    location: {
        type:String,
    },
    is_seen: {
        type: Boolean,
        default: 0,
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
export const ChatList=mongoose.models.chat_lists || mongoose.model("chat_lists",chatListModel)