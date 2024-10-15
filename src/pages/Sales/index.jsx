import React, { useState } from "react";
import Content from "../../components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Sales = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Penjualan
        </Button>
      </div>
    </Content>
  );
};

export default Sales;
