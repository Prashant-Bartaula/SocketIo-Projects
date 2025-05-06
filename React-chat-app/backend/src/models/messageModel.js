import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',//referencing the user model
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    text:{
        type:String,
    },
     image:{
        type:String,
     }
}, {timestamps:true})

export default mongoose.model("message", messageSchema);