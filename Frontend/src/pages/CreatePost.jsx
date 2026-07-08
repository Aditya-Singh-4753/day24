import React, { useState } from "react";
import api from "../api/api";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
  };
  const createPost=async(e)=>{
    e.preventDefault();
        try{
            const res=await api.post("/posts",form);
            alert(res.data.message);
            setForm({content:"",title:""})
        }
        catch(err){
            alert(err.response?.data?.message || "Create Post Failed");
            console.log("Unable to Create Post ",err);
        }
  };
  return (
    <div className="p-6 min-h-screen flex justify-center items-center bg-yellow-100">
      <form className="bg-white p-5 rounded-xl shadow max-w-lg" onSubmit={createPost}>
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <input
          type="text"
          name="title"
          placeholder="Enter Post Title"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Enter Your Content"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        ></textarea>
        <button className="bg-black rounded-full w-full text-white p-2">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
