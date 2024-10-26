import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ExpandedComponent = ({ data }) => (
  <div style={{ padding: "10px 20px" }}>
    <table
      className="striped"
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th
            style={{
              borderBottom: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
            }}
          >
            Nama
          </th>
          <th
            style={{
              borderBottom: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
            }}
          >
            Qty
          </th>
          <th
            style={{
              borderBottom: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
            }}
          >
            Harga
          </th>
        </tr>
      </thead>
      <tbody>
        {data.item_penjualan.map((item, index) => (
          <tr key={index}>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {item.barang.nama}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {item.qty}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {item.barang.harga}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DataTables = ({ columns, data, progress, title }) => {
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
        item.pelanggan.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.id_nota.toLowerCase().includes(search.toLowerCase())
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
        minHeight: "45px", // optional, adjust row height
      },
    },

    headCells: {
      style: {
        textTransform: "uppercase",
      },
    },
  };

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
        fixedHeader
        fixedHeaderScrollHeight="350px"
        expandableRows
        expandableRowsComponent={({ data }) => (
          <ExpandedComponent data={data} />
        )}
      />
    </div>
  );
};

export default DataTables;
