import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Datatable from "./DataTable";
import axios from "axios";
import ModalCreate from "../../components/Modal/create";
import Swal from "sweetalert2";

const Customer = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pelanggans, setPelanggans] = useState([]);
  const [formInput, setFormInput] = useState({
    nama: "",
    domisili: "",
    jenis_kelamin: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch data pelanggan
  const url = `${process.env.REACT_APP_URL}/api/pelanggan`;
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
    handleFetchData(url, setPelanggans);
  }, [url]);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", formInput.nama);
    formData.append("domisili", formInput.domisili);
    formData.append("jenis_kelamin", formInput.jenis_kelamin);

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
              // Fetch updated data after submission
              handleFetchData(url, setPelanggans);

              // Reset the form
              setFormInput({
                nama: "",
                domisili: "",
                jenis_kelamin: "",
              });
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
          if (!res.data.error) {
            Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success",
              timer: 2000,
              willClose: () => {
                handleFetchData(url, setPelanggans);
              },
            });
          }
        });
      }
    });
  };

  const handleUpdate = () => {};

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Jenis Kelamin",
      cell: (row) => {
        let badge = "";
        let context = "";

        if (row.jenis_kelamin === "pria") {
          badge = "bg-warning";
          context = "Pria";
        } else {
          badge = "bg-success";
          context = "Wanita";
        }

        return <span className={`badge ${badge} p-2`}>{context}</span>;
      },
      sortable: true,
    },

    {
      name: "Domisili",
      selector: (row) => row.domisili,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex space-x">
          <button
            type="button"
            className="btn btn-sm btn-icon text-warning"
            onClick={() => handleUpdate(row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <button
            type="button"
            className="btn btn-sm btn-icon text-danger"
            onClick={() => handleDelete(row.uid, row.nama)}
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

  return (
    <Content>
      <nav className="mb-4" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Master Data</li>
          <li className="breadcrumb-item active" aria-current="page">
            Pelanggan
          </li>
        </ol>
      </nav>
      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Pelanggan
        </Button>
      </div>

      <Datatable
        columns={columns}
        data={pelanggans}
        title={`pelanggan`}
        progress={loading}
      />

      {/* modal create */}
      <ModalCreate
        show={show}
        handleClose={handleClose}
        title="Tambah Pelanggan"
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
              <label for="tambah_domisili">Domisili</label>
              <input
                type="text"
                name="domisili"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label for="tambah_domisili">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                className="form-control"
                onChange={handleChange}
                data-placeholder="Pilih jenis kelamin"
              >
                <option value="" disabled selected hidden>
                  Pilih jenis kelamin
                </option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
              </select>
            </div>
          </div>
        </form>
      </ModalCreate>
    </Content>
  );
};

export default Customer;
