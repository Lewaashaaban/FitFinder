import React from "react";
import "./LogOut.css";
import CheckOut from "./CheckOut/checkOut";

const LogOut = ({ onLogout }) => {
  return (
    <div className="Logout">
      <div className="overlay"></div>
      <div className="modal-content">
        <CheckOut onLogout />
      </div>
    </div>
  );
};

export default LogOut;
