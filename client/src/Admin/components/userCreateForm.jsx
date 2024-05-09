import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = ({ getAllData }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "guest",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      // Optionally, you can handle the success response here
      console.log("User created successfully");
      // Call the getAllData function passed as props
      getAllData();
      // Clear the form data
      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      // Show success toast message
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Show error toast message
      toast.error("Failed to create user");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-8 grid grid-cols-2 gap-8"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 float-end text-white rounded-md border-green-900 border hover:bg-green-800 transition-effect hover:scale-105"
      >
        Create
      </button>
      <ToastContainer />
    </>
  );
};

export default UserForm;
