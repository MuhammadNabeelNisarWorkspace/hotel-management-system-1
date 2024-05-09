import React, { useState, useEffect } from "react";

const UserForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch branches when component mounts
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/branches"
        );
        const data = await response.json();
        setBranches(data.branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/guests/${userId}`
        );
        const userData = await response.json();
        // Set the form data with user data
        setFormData({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
          branch: userData.branch,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

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
        `http://localhost:5000/api/admin/guests/edit/${userId}`,
        {
          // Add userId to the URL
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit user");
      }
      console.log("User edited successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        branch: "",
      });
    } catch (error) {
      console.error("Error editing user:", error.message);
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
        <div className="mb-4">
          <label htmlFor="role" className="block mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          >
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
            <option value="housekeeper">Housekeeper</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="branch" className="block mb-1">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 float-end text-white rounded-md border-green-900 border hover:bg-green-800 transition-effect hover:scale-105"
      >
        Edit
      </button>
    </>
  );
};

export default UserForm;
