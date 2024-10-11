import { useEffect } from "react";
import Router from "./router";
import $ from "jquery";
import "./assets/css/sb-admin-2.css";

function App() {
  useEffect(() => {
    // Set jQuery dan $ sebagai global variable
    window.jQuery = window.$ = $;

    // Memuat Bootstrap JS
    const bootstrap = require("./assets/vendor/bootstrap/js/bootstrap.bundle.min.js");

    // Memuat sb-admin-2.js setelah jQuery tersedia di global
    const sbAdmin = require("./assets/js/sb-admin-2.js");

    $(document).ready(function () {
      console.log("jQuery is ready");
    });
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
