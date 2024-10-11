import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Sales from "../pages/Sales";
import Customer from "../pages/Customer";
import Stuff from "../pages/Stuff";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route index element={<Home />} />

        <Route path="/penjualan" index element={<Sales />} />
        <Route path="/barang" index element={<Stuff />} />
        <Route path="/pelanggan" index element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
