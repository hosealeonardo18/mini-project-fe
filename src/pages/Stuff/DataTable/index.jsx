import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  header: {
    style: {
      color: "black", // white text
      borderRadius: "0px", // Remove border-radius
    },
  },
  rows: {
    style: {
      minHeight: "45px", // optional, adjust row height
    },
  },

  headCells: {
    style: {
      textTransform: "uppercase",
    },
  },
};

const StuffDataTable = ({ columns, data, progress, title }) => {
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!progress) {
      setPending(false);
    }

    const filteredItems = data.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) || // Filter berdasarkan nama
        item.kategori.toLowerCase().includes(search.toLowerCase()) // Filter berdasarkan kategori
    );
    setFilteredData(filteredItems);
  }, [progress, search, data]);

  return (
    <div className="card p-4">
      <div className="">
        <p
          className="mb-2"
          style={{ fontWeight: 500, fontSize: "1rem", color: "black" }}
        >
          Search :{" "}
        </p>
        <input
          type="text"
          placeholder={`Cari ${title}`}
          className="form-control mb-3 col-lg-3 col-sm-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        striped
        highlightOnHover
        pagination
        progressPending={pending}
      />
    </div>
  );
};

export default StuffDataTable;
