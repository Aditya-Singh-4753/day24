import React, { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const newForm = { ...editForm, [e.target.name]: e.target.value };
    setEditForm(newForm);
  };

  const handleEditClick = (post) => {
    setEditId(post._id);
    setEditForm({ title: post.title, content: post.content });
  };
  const handleCancel = () => {
    setEditId(null);
    setEditForm({ title: "", content: "" });
  };

  const getPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data.posts);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/posts/update/${id}`, editForm);
      alert(res.data.message);
      handleCancel();
      getPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to Update Post");
    }
  };

  const handleDelete = async (id) => {
    const confirmation=confirm("Are you sure?");
    if(!confirmation) return;
    try {
      const res = await api.delete(`/posts/delete/${id}`);
      alert(res.data.message);
      getPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to Delete");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-5">All Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div className="bg-white shadow p-4 rounded-xl border">
            {editId === post._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={editForm.title}
                  className="w-full border p-2 mb-3 rounded"
                />
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleChange}
                  className="w-full border p-2 mb-3 rounded"
                />
                <div className="flex gap-4">
                  <button
                    className="bg-green-600 text-white rounded px-4 py-2"
                    onClick={() => {
                      handleUpdate(post._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white rounded px-4 py-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p className="text-gray-600">{post.content}</p>
                <p className="text-sm mt-2">{post.user?.name}</p>
                <div className="flex gap-4">
                  <button
                    className="bg-blue-500 text-white px-5 py-3 rounded-full p-5"
                    onClick={() => {
                      handleEditClick(post);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-3 rounded-full p-5"
                    onClick={() => {
                      handleDelete(post._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
