// import { ConnectionStates } from 'mongoose';
import React from 'react'
import { useState } from "react";


function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    getUserByEmail(formData.email);
    console.log("Submitted data:", formData);
  };


  const getUserByEmail = async (email) => {
    console.log(email)
    try {
      const url = `http://127.0.0.1:5000/api/users/email/${email}`; // Backend API endpoint
      console.log("Fetching user with URL:", url); // Log the full URL
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("User not found");
      }
  
      const user = await response.json();
      console.log("User data:", user);
      handleLoginAttempt(user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const handleLoginAttempt = (user) => {
    console.log("Login successful for user:", user);
    if 
    localStorage.setItem('petconnect_user', JSON.stringify(user));
    console.log("User ID stored in localStorage:", user._id);
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage