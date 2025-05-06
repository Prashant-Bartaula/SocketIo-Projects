import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
export const getUsersForSidebar=async(req, res)=>{
    try {
        const loggedInUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select('-password');//find all users except the logged in user


        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'internal server error '})
    }
}

export const getMessages=async(req, res)=>{
    try {
        const {id:userToChatId}=req.params;//id:userToChatId(renaming simply) is the id of the user whose messages are to be fetched

        const senderId=req.user._id;//sender id is the one who is logged in 

        const messages=await Message.find({
            $or:[
                {senderId:senderId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:senderId}
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'internal server error '})
    }
}
export const sendMessage= async(req, res)=>{
    try {
        const {text}=req.body;
        const {id:receiverId}=req.params;

        const senderId=req.user._id;

        const newMessage= new Message({
            senderId,
            receiverId,
            text
        })

        await newMessage.save();

        //realtime funtionality with socket io

        res.status(200).json(newMessage);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: 'internal server error '})
    }
}