import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import DataTables from "./DataTable";

const Sales = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // select Option Customer
  const [selectedOptionCustomer, setSelectedOptionCustomer] = useState(null);
  const [optionCustomers, setOptionCustomers] = useState([]);

  // sales item
  const [salesItems, setSalesItems] = useState([
    { barang: "", name: "", qty: 0, harga: 0 },
  ]);

  // select Option Customer
  const [optionProducts, setOptionProducts] = useState([]);

  // get data Customer
  const urlCustomer = `${process.env.REACT_APP_URL}/api/pelanggan?limit=1000`;

  // get data product
  const urlProduct = `${process.env.REACT_APP_URL}/api/barang?limit=1000`;

  // post data transaction
  const urlTransaction = `${process.env.REACT_APP_URL}/api/penjualan`;

  // function get data for select option
  const getDataFromApi = (url, state) => {
    axios
      .get(url)
      .then((response) => {
        const resData = response.data;

        if (!resData.error) {
          const formattedOptions = resData.data.map((item) => ({
            value: item.uid || item.kode,
            label: item.nama,
            price: item.harga || "",
          }));

          state(formattedOptions);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // call customers
    getDataFromApi(urlCustomer, setOptionCustomers);

    // call products
    getDataFromApi(urlProduct, setOptionProducts);
  }, [urlCustomer, urlProduct]);

  const handleInputChange = (index, event, selectType = false) => {
    const newItems = [...salesItems];

    if (selectType === "barang") {
      newItems[index]["barang"] = event.value;
      newItems[index]["price"] = event.price;
      newItems[index]["name"] = event.label;
    } else {
      const { name, value } = event.target;

      if (name === "qty") {
        const price = newItems[index]["price"] || 0;
        const calculation = value * price;
        newItems[index]["harga"] = calculation;
      }

      newItems[index][name] = value;
    }

    setSalesItems(newItems); // Update state dengan data terbaru
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

  const handleChange = (option) => {
    setSelectedOptionCustomer(option);
  };

  const formatCurrency = (value, currency = "IDR") => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0, // Tidak ada desimal
    }).format(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("kode_pelanggan", selectedOptionCustomer.value);

    salesItems.forEach((item, index) => {
      formData.append(`barang[${index}][kode]`, item.barang);
      formData.append(`barang[${index}][qty]`, item.qty);
    });

    axios
      .post(urlTransaction, formData)
      .then((res) => {
        if (!res.data.false) {
          Swal.fire({
            title: "Successfully!",
            text: `${res.data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
            willClose: () => {
              setSalesItems([{ barang: "", name: "", qty: 0, harga: 0 }]);
              setOptionProducts([]);
              setOptionCustomers([]);
            },
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: res.data.message,
            icon: "failed",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>

        <div className="container p-0 m-0" style={{ fontSize: "0.9rem" }}>
          <div className="row">
            <div className="col-lg-8 mb-3">
              <div className="card p-4">
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="tambah_pelanggan">Pelanggan</label>
                    <Select
                      value={selectedOptionCustomer}
                      onChange={handleChange}
                      options={optionCustomers}
                      isSearchable={true}
                      placeholder="Pilih Pelanggan..."
                    />
                  </div>
                </div>

                <div className="container m-0 p-0">
                  {salesItems.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col-lg-4 mb-3">
                        <label>Barang</label>
                        <Select
                          name="barang"
                          value={optionProducts.find(
                            (opt) => opt.value === item.barang
                          )}
                          onChange={(selectedOption) =>
                            handleInputChange(index, selectedOption, "barang")
                          }
                          options={optionProducts}
                          isSearchable={true}
                          placeholder="Pilih Barang..."
                        />
                      </div>

                      <div className="col-lg-3 mb-3">
                        <label>Qty</label>
                        <input
                          type="number"
                          name="qty"
                          value={item.qty}
                          className="form-control"
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </div>
                      <div className="col-lg-3 mb-3">
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
                      <div className="col-lg-2 mb-3 d-flex align-items-end">
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
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card p-4">
                <h6 style={{ fontWeight: 700, color: "black" }}>Detail Item</h6>
                <hr />
                {salesItems && salesItems.length > 0
                  ? salesItems.map((item, index) => {
                      if (item.barang && item.qty && item.harga) {
                        return (
                          <div className="item-detail mb-3" key={index}>
                            <div className="d-flex justify-content-between">
                              <span>{item.name}</span>
                              <span>{item.qty}x</span>
                              <span>Rp. {item.harga}</span>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  : "Please add item"}

                <hr />
                <div className="d-flex justify-content-between total-harga">
                  <h6 style={{ fontWeight: 700, color: "black" }}>Sub Total</h6>
                  <h5 style={{ fontWeight: 700, color: "black" }}>
                    {formatCurrency(
                      salesItems
                        .filter((item) => item.barang && item.qty && item.harga)
                        .reduce((acc, item) => acc + item.harga, 0)
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="mb-5 mt-3">
        <h5 style={{ fontWeight: 700, color: "black" }}>List Penjualan</h5>
        <DataTables />
      </div>
    </Content>
  );
};

export default Sales;
