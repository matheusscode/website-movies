import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Outlet />
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
