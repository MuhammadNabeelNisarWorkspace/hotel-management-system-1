import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";

const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  // Memoize filtered data length
  const filteredDataLength = useMemo(() => {
    return page.length;
  }, [page]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDataLength / pageSize);

  return (
    <>
      <div>
        <input
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value); // Apply the global filter immediately
          }}
          placeholder="Search..."
          className="p-2 border border-blue-600 rounded-md"
        />
      </div>

      <table
        {...getTableProps()}
        className="mt-5 border-2 w-full border-blue-800 "
      >
        <thead className="bg-blue-700 text-white ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="p-3" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="my-3 border-b-2 border-blue-800"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border-r-2 border-blue-400 p-3 max-w-40 overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-5">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="py-1 px-4 rounded-lg bg-gray-400 disabled:opacity-50 border-slate-900 border "
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="py-1 px-4 rounded-lg bg-slate-300 disabled:opacity-50 border-slate-900 border "
          >
            Next
          </button>
        </div>
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {totalPages}
            </strong>{" "}
            | Total rows: <strong>{filteredDataLength}</strong>
          </span>
        </div>
      </div>
    </>
  );
};

export default DataTable;
