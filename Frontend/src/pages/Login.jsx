import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import api from "../api/api"

function Login() {
    const[form,setForm] = useState({email:"",password:""});
    const navigate=useNavigate(); 
    const handleChange=(e)=>{
        const newForm={...form,[e.target.name]:e.target.value};
        setForm(newForm);
    };
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await api.post("/auth/login",form);
            localStorage.setItem("token",res.data.token);
            alert(res.data.message);
            navigate("/dashboard");
        }
        catch(err){
            alert(err.response?.data?.message || "Login Failed");
            console.log("Unable to Login ",err);
        }
    };
  return (
    <div className='min-h-screen flex items-center justify-center bg-yellow-100'>
        <form className='bg-white p-6 rounded-xl shadow-96' onSubmit={handleLogin}>
            <h1 className='text-2xl font-bold mb-4 '>Login</h1>
            <input type="email" name='email' placeholder='Enter Your Email' className='w-full border p-2 mb-3 rounded-full' onChange={handleChange}/>
            <input type="password" name='password' placeholder='Enter Your Password' className='w-full border p-2 mb-3 rounded-full' onChange={handleChange}/>
            <button className='bg-black text-white w-full l-full py-full rounded-full'>Login</button>
        </form>

    </div>
  )
}

export default Login;