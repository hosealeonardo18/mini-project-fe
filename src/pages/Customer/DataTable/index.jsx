import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Datatable = ({ columns, data, progress, title }) => {
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!progress) {
      setPending(false);
    }

    // Ensure that the data is properly filtered when `data` is updated
    const filteredItems = data?.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.domisili.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(filteredItems);
  }, [data, progress, search]);

  const customStyles = {
    header: {
      style: {
        color: "black", // white text
        borderRadius: "0px", // Remove border-radius
      },
    },
    rows: {
      style: {
        minHeight: "30px", // optional, adjust row height
        border: "1px solid #ddd", // Adding border for all sides
        borderRadius: "0px", // Remove border-radius
      },
    },
    cells: {
      style: {
        padding: "8px", // Adjust padding
        color: "#073642", // default text color
        borderLeft: "1px solid #ddd", // Left border for cells
        borderRight: "1px solid #ddd", // Right border for cells
        borderRadius: "0px", // Remove border-radius
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
        color: "black", // white text
        borderRadius: "0px", // Remove border-radius
        border: "1px solid #ddd", // Border for header cells
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row, index) => index % 2 === 0, // even rows
      style: {
        backgroundColor: "#FFA500", // orange for even rows
        "&:hover": {
          backgroundColor: "#FFB347", // lighter orange on hover for even rows
        },
      },
    },
    {
      when: (row, index) => index % 2 !== 0, // odd rows
      style: {
        backgroundColor: "#FFFFFF", // white for odd rows
        "&:hover": {
          backgroundColor: "#F0F0F0", // light gray on hover for odd rows
        },
      },
    },
  ];

  return (
    <div className="card p-4">
      <input
        type="text"
        placeholder={`Cari ${title}`}
        className="form-control mb-3 col-lg-3 col-sm-12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        striped
        highlightOnHover
        pagination
        progressPending={pending}
      />
    </div>
  );
};

export default Datatable;
