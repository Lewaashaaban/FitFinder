import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState } from "react";
import { useCookies } from "react-cookie";


function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/GetGyms");
      }

     
    } catch (error) {
      console.log(error);
      setInvalid(true);
      setPassword("");
    }
  };

  return (
    <>
      <form className="loginPage" onSubmit={handleSubmit}>
        <div className="center">
          <div className="popup">
            <div className="close-btn">
              <NavLink to="/">&times;</NavLink>
            </div>

            <div className="form">
              <h2>Log in</h2>

              <div className="form-element">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-element">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="pawsword"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-element">
                <input type="checkbox" className="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              {invalid && (
                <label id="invalid" className="invalid">
                  Invalid credentials, please enter correct email and password
                </label>
              )}

              <div className="form-element">
                <button>Sign in</button>
              </div>
              <div className="form-element">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="form-element">
                <label htmlFor="noAccount" className="noAccount">
                  You don't have an account?
                  <NavLink to="/GetGyms" className="nav1">
                    <span> Createone</span>
                  </NavLink>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default LogInPage;
