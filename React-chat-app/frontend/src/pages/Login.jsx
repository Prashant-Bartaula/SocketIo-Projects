import React, {useState} from 'react'
import { useAuthStore } from "../store/useAuthStore";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error('Email is required');
    if(!formData.password.trim() || formData.password.length < 6) return toast.error('Password is required');

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if(isValid===true){
      console.log('i ram running')
      login(formData);
    } 
  };
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <form
        className="border p-5
       text-center flex flex-col gap-8"
      >
        <h1>Login</h1>

       
        <div className="text-start flex justify-between items-center gap-5">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="text-start flex justify-between items-center gap-5">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <h2>Don't have an account? <Link to='/signup' className="text-blue-500">Sign up </Link> </h2>
        <button onClick={(e)=>handleSubmit(e)} className="outline-none bg-purple-500 text-white w-fit mx-auto px-4 py-2 cursor-pointer rounded-2xl " disabled={isLoggingIn}>
          {isLoggingIn ? "Logging In..." : "Login"}
        </button>
      </form>

      <Toaster/>
    </div>
  );
}
