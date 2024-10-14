import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import StuffDataTable from "./DataTable";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalCreate from "../../components/Modal/create";
import ModalUpdate from "../../components/Modal/update";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Stuff = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const [product, setProduct] = useState({
    nama: "",
    kategori: "",
    harga: 0,
  });

  const [storeProduct, setStoreProduct] = useState({
    nama: "",
    kategori: "",
    harga: 0,
  });

  const [formattedHarga, setFormattedHarga] = useState("");

  const url = `${process.env.REACT_APP_URL}/api/barang`;
  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },

    {
      name: "Harga",
      cell: (row) => currency(row.harga),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex space-x">
          <button
            type="button"
            className="btn btn-sm btn-icon text-warning"
            onClick={() => handleUpate(row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <button
            type="button"
            className="btn btn-sm btn-icon text-danger"
            onClick={() => handleDelete(row.kode, row.nama)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleFetchData = (url, state) => {
    axios
      .get(url)
      .then(function (response) {
        if (!response.data.error) {
          setLoading(false);
          state(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetchData(url, setProducts);
  }, [url]);

  // handle delete
  const handleDelete = (uid, name) => {
    Swal.fire({
      title: `Ingin delete "${name}"?`,
      text: "Kamu tidak dapat mengembalikan data ini kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/${uid}`).then((res) => {
          Swal.fire({
            title: "Deleted!",
            text: res.data.message,
            icon: "success",
            timer: 2000,
            willClose: () => {
              handleFetchData(url, setProducts);
            },
          });
        });
      }
    });
  };

  // handleEdit
  const handleUpate = (data) => {
    setProduct({
      kode: data.kode,
      nama: data.nama,
      kategori: data.kategori,
      harga: data.harga,
    });

    setFormattedHarga(currency(data.harga));
    handleShowUpdateModal();
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", product.nama);
    formData.append("kategori", product.kategori);
    formData.append("harga", product.harga);
    formData.append("_method", "put");

    axios
      .post(`${url}/${product.kode}`, formData)
      .then((res) => {
        if (!res.data.false) {
          handleCloseUpdateModal(true);

          Swal.fire({
            title: "Successfully!",
            text: `${res.data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
            willClose: () => {
              handleFetchData(url, setProducts);

              setProduct({
                nama: "",
                kategori: "",
                harga: 0,
              });

              setFormattedHarga("");
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
        Swal.fire({
          title: "Failed!",
          text: err.message,
          icon: "failed",
        });
      });
  };

  const handleChangeUpdate = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateChangeCurrency = (e) => {
    let value = e.target.value;

    // Hapus semua karakter yang bukan angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Ubah menjadi format currency untuk ditampilkan
    const formattedValue = currency(numericValue);

    // Simpan nilai angka asli ke storeProduct
    setProduct({
      ...product,
      [e.target.name]: numericValue, // Simpan sebagai angka
    });

    // Simpan nilai terformat hanya untuk tampilan
    setFormattedHarga(formattedValue);
  };

  // handle Create
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setStoreProduct({
      ...storeProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCurrency = (e) => {
    let value = e.target.value;

    // Hapus semua karakter yang bukan angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Ubah menjadi format currency untuk ditampilkan
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue);

    // Simpan nilai angka asli ke storeProduct
    setStoreProduct({
      ...storeProduct,
      [e.target.name]: numericValue, // Simpan sebagai angka
    });

    // Simpan nilai terformat hanya untuk tampilan
    setFormattedHarga(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", storeProduct.nama);
    formData.append("kategori", storeProduct.kategori);
    formData.append("harga", storeProduct.harga);

    axios
      .post(url, formData)
      .then((res) => {
        if (!res.data.false) {
          handleClose(true);

          Swal.fire({
            title: "Successfully!",
            text: `${res.data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
            willClose: () => {
              handleFetchData(url, setProducts);

              setStoreProduct({
                nama: "",
                kategori: "",
                harga: 0,
              });

              setFormattedHarga("");
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
        Swal.fire({
          title: "Failed!",
          text: err.message,
          icon: "failed",
        });
      });
  };

  const currency = (value) => {
    const result = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

    return result;
  };
  return (
    <Content>
      <nav className="mb-4" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Master Data</li>
          <li className="breadcrumb-item active" aria-current="page">
            Barang
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Tambah Barang
        </Button>
      </div>

      <StuffDataTable
        columns={columns}
        data={products}
        title={`Barang`}
        progress={loading}
      />

      {/* modal create */}
      <ModalCreate
        show={show}
        handleClose={handleClose}
        title="Tambah Barang"
        handleSubmit={handleSubmit}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="form-group">
              <label for="tambah_nama">Nama</label>
              <input
                type="text"
                name="nama"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label for="tambah_kategori">Kategori</label>
              <input
                type="text"
                name="kategori"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label for="tambah_harga">Harga</label>
              <input
                type="text"
                name="harga"
                className="form-control"
                value={formattedHarga}
                onChange={handleChangeCurrency}
              />
            </div>
          </div>
        </form>
      </ModalCreate>

      {/* modal update */}

      <ModalUpdate
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        title="Update Barang"
        handleSubmit={handleSubmitUpdate}
        handleChange={handleChangeUpdate}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="form-group">
              <label for="update_nama">Nama</label>
              <input
                type="text"
                name="nama"
                className="form-control"
                value={product.nama}
                onChange={handleChangeUpdate}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label for="update_kategori">Kategori</label>
              <input
                type="text"
                name="kategori"
                className="form-control"
                value={product.kategori}
                onChange={handleChangeUpdate}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label for="update_harga">Harga</label>
              <input
                type="text"
                name="harga"
                className="form-control"
                value={formattedHarga}
                onChange={handleUpdateChangeCurrency}
              />
            </div>
          </div>
        </form>
      </ModalUpdate>
    </Content>
  );
};

export default Stuff;
