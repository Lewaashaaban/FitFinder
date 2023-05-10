import LogoImg from "../../Images/image 1.png";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { LogInPage } from "../../Pages";
import {  useLocation } from "react-router-dom";

// matrial icon 
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


const NavBar = () => {
  const [scrollPos, setScrollPos] = useState(0);
  
  // const [loginPopup, setLoginPopup] = useState(false);
//function to change the color of navbar from transparent to black when we scroll down
  useEffect(() => {
    
    function handleScroll() {
      setScrollPos(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: scrollPos > 0 ? "black" : "transparent", 
    transition: "background-color 0.2s ease", 
  };

  // function to check the page opened
  function Checklogin() {
    const location = useLocation();
    if (location.pathname === "/") {
      return (
        <nav>
          <div className="navbar-nav">
            <p className="nav-item">
              <NavLink to="/login" className="nav-link">
                SignIn
              </NavLink>
            </p>
            <p className="nav-item">
              <NavLink to="/SignUp" className="nav-link">
                SignUp
              </NavLink>
            </p>
          </div>
        </nav>
      );
    } else if (location.pathname === "/GetGyms") {
      return (
        <nav>
          <div className="navbar-nav">
            <p className="nav-item">

              <NavLink to="/" className="nav-link">
               <LogoutOutlinedIcon fontSize="large" /> Logout
              </NavLink>
            </p>
            </div>
        </nav>
      );
    }
  }

  return (
    <>
      <nav className="navbar active " style={navbarStyle}>
        <div className="logo-container">
          <img className="navbar-logo" src={LogoImg} alt="" />
        </div>

        <div>
          <Checklogin />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
