import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useChatStore=create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUsersLoading:true});

        try {
            const res=await axiosInstance.get('/messages/users');
            set({users:res.data})
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async()=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get('/messages');
            set({messages:res.data})
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            set({isMessagesLoading:false})
        }
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
    }

}))