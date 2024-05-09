import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "./datatable";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Branches = () => {
  const [branches, setBranches] = useState([]);
  const getAllData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/branches", {
        method: "GET",
      });
      const data = await response.json();
      const branchesWithCount = data.branches.map((guest, index) => ({
        ...guest,
        count: index + 1,
      }));
      setBranches(branchesWithCount);
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
      Header: "Name",
      accessor: "branchName",
    },
    {
      Header: "Edit",
      Cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <Link to={`edit/${row.original._id}`}>
            <button className="px-4 py-2 rounded-lg text-center trnasition-effect text-black bg-slate-300 border-2 border-slate-600 hover:bg-green-600 hover:scale-110 hover:text-white ">
              <FaEdit />
            </button>
          </Link>
        </div>
      ),
    },
    {
      Header: "Delete",
      Cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <Link to={`delete/${row.original._id}`}>
            <button className="px-4 py-2 rounded-lg text-center trnasition-effect text-white bg-zinc-900 border-2 border-blue-900 hover:bg-blue-900 hover:scale-105">
              <MdDelete />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full  bg-blue-700 text-center ">
          <h1 className="text-white text-2xl font-bold p-8 ">Branches</h1>
        </div>
        <div></div>
        <div className="bg-slate-100 p-12 rounded-xl mt-10 w-5/6 ">
          <Link to="create">
            <button className="p-2 bg-blue-600 text-white rounded-md float-end trnasition-effect hover:scale-105 hover:bg-blue-500">
              Create New
            </button>
          </Link>
          <DataTable columns={columns} data={branches} />
        </div>
      </div>
    </>
  );
};

export default Branches;
