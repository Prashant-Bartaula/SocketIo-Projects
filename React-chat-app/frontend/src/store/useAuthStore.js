import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import {toast} from 'react-hot-toast'

 export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:false,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data, isCheckingAuth:false})
        } catch (error) {
            console.log('error in checking authentication', error.message)
            set({authUser:null, isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post('/auth/signup', data);
            toast.success('Signed up successfully');
            set({authUser:res.data, isSigningUp:false})
        } catch (error) {
            toast.error(error.message);
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post('/auth/login', data);
            toast.success('Logged in successfully');
            set({authUser:res.data, isLoggingIn:false})
        } catch (error) {
            toast.error(error.message);
            set({isLoggingIn:false})
        }
    }
    
 }))