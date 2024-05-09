import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomCreateForm = ({ getAllData }) => {
  const [formData, setFormData] = useState({
    type: "",
    person: 0,
    availability: false,
    status: "",
    price: 0,
    branchId: "",
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
        "http://localhost:5000/api/admin/rooms/create",
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
        type: "",
        person: 0,
        availability: false,
        status: "",
        price: 0,
        branchId: "",
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
          <label htmlFor="type" className="block mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select type</option>
            <option value="basic">Basic</option>
            <option value="average">Average</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="person" className="block mb-1">
            Person
          </label>
          <input
            type="number"
            id="person"
            name="person"
            value={formData.person}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="block mb-1">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select status</option>
            <option value="maintenance">Maintenance</option>
            <option value="occupied">Occupied</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="branchId" className="block mb-1">
            Branch ID
          </label>
          <input
            type="text"
            id="branchId"
            name="branchId"
            value={formData.branchId}
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

export default RoomCreateForm;
