import React from "react";
import DataTable from "./datatable";

const Dashboard = () => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    // Add more columns as needed
  ];

  const data = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    // Add more data rows as needed
  ];
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full  bg-blue-700 text-center ">
        <h1 className="text-white text-2xl font-bold p-8 ">Dashboard</h1>
      </div>
      <div></div>
      <div className="bg-slate-100 p-12 rounded-xl mt-10 w-5/6 ">
        <button className="p-2 bg-blue-600 text-white rounded-md float-end">
          Create New
        </button>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
