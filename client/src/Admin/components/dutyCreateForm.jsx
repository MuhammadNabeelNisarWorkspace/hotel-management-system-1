import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DutyCreateForm = ({ getAllData }) => {
  const [formData, setFormData] = useState({
    staffId: "",
    roomId: "",
    task: "",
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
      console.log(formData);
      const response = await fetch(
        "http://localhost:5000/api/admin/duties/create",
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
        staffId: "",
        roomId: "",
        task: "",
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
          <label htmlFor="staffId" className="block mb-1">
            staffId
          </label>
          <input
            id="staffId"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roomId" className="block mb-1">
            roomId
          </label>
          <input
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="task" className="block mb-1">
            task
          </label>
          <input
            id="task"
            name="task"
            value={formData.task}
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

export default DutyCreateForm;
