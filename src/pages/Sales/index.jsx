import React, { useState } from "react";
import Content from "../../components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Sales = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [salesItems, setSalesItems] = useState([
    { barang: "", qty: 0, harga: 0 },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...salesItems];

    if (name == "qty") {
      const calculation = value * 10000;
      newItems[index]["harga"] = calculation; // Update the specific field in the row
    }

    newItems[index][name] = value; // Update the specific field in the row
    setSalesItems(newItems); // Update the state
  };

  // Function to add a new row
  const addRow = () => {
    setSalesItems([...salesItems, { barang: "", qty: 0, harga: 0 }]);
  };

  // Function to remove a row by index
  const removeRow = (index) => {
    const newItems = salesItems.filter((_, i) => i !== index);
    setSalesItems(newItems);
  };

  const handleChange = () => {};
  return (
    <Content>
      <nav className="mb-4" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Master Data</li>
          <li className="breadcrumb-item active" aria-current="page">
            Penjualan
          </li>
        </ol>
      </nav>

      <div className="container p-0 m-0" style={{ fontSize: "0.9rem" }}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4">
              <div className="mb-3">
                <div className="form-group">
                  <label for="tambah_pelanggan">Pelanggan</label>
                  <input
                    type="text"
                    name="kode_pelanggan"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container m-0 p-0">
                <form>
                  {salesItems.map((item, index) => (
                    <div className="row mb-3" key={index}>
                      <div className="col-4">
                        <label>Barang</label>
                        <input
                          type="text"
                          name="barang"
                          value={item.barang}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="col-3">
                        <label>Qty</label>
                        <input
                          type="number"
                          name="qty"
                          value={item.qty}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="col-3">
                        <label>Harga</label>
                        <input
                          type="text"
                          name="harga"
                          value={item.harga}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, e)}
                          disabled
                        />
                      </div>
                      <div className="col-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeRow(index)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addRow}
                  >
                    Tambah Field
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-4"></div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Sales;
