import React, { useEffect, useState } from "react";
import DataTable from "./datatable";
import ConfirmationModal from "./confirmationModal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UserCreateForm from "./userCreateForm";
import UserEditForm from "./userEditForm";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleConfirmationModal = (userId) => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
    setDeleteUserId(userId);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/admin/guests/delete/${deleteUserId}`,
        {
          method: "DELETE",
        }
      );
      // Refresh guest list after deletion
      getAllData();
    } catch (error) {
      console.log(error);
    }
    setIsConfirmationModalOpen(false);
  };

  const getAllData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/guests", {
        method: "GET",
      });
      const data = await response.json();
      const guestsWithCount = data.guests.map((guest, index) => ({
        ...guest,
        count: index + 1,
      }));
      setGuests(guestsWithCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    {
      Header: "S.no",
      accessor: "count",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phoneNumber",
    },
    {
      Header: "Password",
      accessor: "password",
    },
    {
      Header: "Edit",
      Cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <button
            onClick={() => toggleEditModal(row.original)}
            className="px-4 py-2 rounded-lg text-center transition-effect text-black bg-slate-300 border-2 border-slate-600 hover:bg-green-600 hover:scale-110 hover:text-white "
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
    {
      Header: "Delete",
      Cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <button
            onClick={() => toggleConfirmationModal(row.original._id)}
            className="px-4 py-2 rounded-lg text-center transition-effect text-white bg-zinc-900 border-2 border-blue-900 hover:bg-blue-900 hover:scale-105"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full bg-blue-700 text-center ">
          <h1 className="text-white text-2xl font-bold p-8 ">Guests</h1>
        </div>
        <div></div>
        <div className="bg-slate-100 p-12 rounded-xl my-14 w-5/6 drop-shadow-2xl">
          <button
            onClick={toggleCreateModal}
            className="p-2 bg-blue-600 text-white rounded-md float-end transition-effect hover:scale-105 hover:bg-blue-500"
          >
            Create New
          </button>

          <DataTable columns={columns} data={guests} />
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-slate-100 p-8 rounded-xl modal-pop-up">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Create New Guest
            </h2>
            <UserCreateForm getAllData={getAllData} />
            <button
              onClick={toggleCreateModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-md mr-2 border border-blue-900 hover:bg-blue-800 transition-effect hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-slate-100 p-8 rounded-xl modal-pop-up">
            <h2 className="text-2xl font-bold mb-8 text-center">Edit Guest</h2>
            <UserEditForm userId={selectedUser._id} />
            <button
              onClick={() => toggleEditModal(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md mr-2 border border-blue-900 hover:bg-blue-800 transition-effect hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={() => toggleConfirmationModal(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Guests;
