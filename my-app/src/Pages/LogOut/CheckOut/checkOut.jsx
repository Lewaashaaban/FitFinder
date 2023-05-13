import React from "react";
import "./checkOut.css";
import { Link } from "react-router-dom";
// import MySnackbar from "../../../Components/snackBar";

 import { useCookies } from "react-cookie";
// const [openSnackbar, setOpenSnackbar] = useState(false);
// const [snackbarMessage, setSnackbarMessage] = useState("");
// const [snackbarSeverity, setSnackbarSeverity] = useState("success");
const CheckOut = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    console.log("Logout successful!");
  };

  return (
    <div className="CheckOut">
      <div id="centerr">
        <div className="popupp">
          <div id="header">
            <h2>Are you sure you want to logout?</h2>
          </div>
          <div id="footer">
            <Link id="btn-content" onClick={handleLogout} to="/">
              {" "}
              <button className="btnn">Yes</button>
            </Link>
            <Link id="btn-content" to="/GetGyms">
              {" "}
              <button className="btnn">No</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
