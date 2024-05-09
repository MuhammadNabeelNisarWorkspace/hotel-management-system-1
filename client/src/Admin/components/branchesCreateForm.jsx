import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BranchesCreateForm = ({ getAllData }) => {
  const [formData, setFormData] = useState({
    branchName: "",
    country: "",
    address: "",
    city: "",
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
      const response = await fetch(
        "http://localhost:5000/api/admin/branches/create",
        {
          // Adjusted endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create room");
      }
      console.log("Room created successfully");
      getAllData();
      setFormData({
        branchName: "",
        country: "",
        address: "",
        city: "",
      });
      toast.success("Room created successfully");
    } catch (error) {
      console.error("Error creating room:", error.message);
      toast.error("Failed to create room");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-8 grid grid-cols-2 gap-8"
      >
        <div className="mb-4">
          <label htmlFor="branchName" className="block mb-1">
            Branch Name
          </label>
          <input
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1">
            Country
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1">
            City
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
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

export default BranchesCreateForm;
