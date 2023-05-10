import React from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        {
          userName: userName,
          fullName: userName,
          email:email,
          phoneNumber:phoneNumber,
          password: password,
          passwordConfirm: Confirmpassword,
        }
      );
      if (response.status === 201) {
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setInvalid(true);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <form className="signUppage" onSubmit={handleSubmit}>
        <div className="center">
          <div className="popupSignup">
            <div className="close-btn">
              <NavLink to="/">&times;</NavLink>
            </div>

            <div className="form">
              <h2>Signup</h2>
              <div className="form-element">
                <label htmlFor="fullname">FullName</label>
                <input
                  type="text"
                  className="email"
                  value={fullName}
                  placeholder="Enter your Full name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-element">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-element">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className="Username"
                  value={userName}
                  placeholder="Enter your Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="form-element">
                <label htmlFor="email">Phone number</label>
                <input
                  type="text"
                  className="email"
                  placeholder="+961 ********"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="form-element">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="password"
                  value={password}
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-element">
                <label htmlFor="Confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  value={Confirmpassword}
                  className="Confirmpawsword"
                  placeholder="Confirm your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {invalid && (
                <label id="invalid" className="invalid">
                  Invalid credentials
                </label>
              )}
              <div className="form-element">
                <button>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
