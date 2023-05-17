import React from "react";
import { useState } from "react";
import "./createGymPopup.css";
import { NavLink } from "react-router-dom";
import { Calendar } from "../../../Components";
import axios from "axios";
import Cookies from "js-cookie";

const CreateGymPopup = () => {
  const [gymName, setGymName] = useState("");
  const [gymRegion, setGymRegion] = useState("");
  const [classes, setCLasses] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [url, setUrl] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState("type");
  const [gymDescription, setGymDescription] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsValid(isValidUrl(event.target.value));
  };

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  const getIsFormValid = () => {
    return gymName && gymAddress && isValid && gymRegion && type !== "type";
  };

  const clearForm = () => {
    setGymName("");
    setGymAddress("");
    setUrl("");
    setGymRegion("");
    setType("type");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");
    const userID = localStorage.getItem("userID");
    console.log(userID);
    console.log(accessToken);

    if (!accessToken) {
      throw new Error("Authentication token not found!");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/gym/CreateGyms",
        {
          gymName: gymName,
          region: gymRegion,
          address: gymAddress,
          phoneNumber: phoneNumber,
          gymClasses: classes,
          image: url,
          description: gymDescription,
          creator: userID
        },
        config
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Gym Updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error adding property");
    }
    // clearForm();
  };

  return (
    <>
      <form className="CreateGympage" onSubmit={handleSubmit}>
        <div className="left">
          {/* <button className="show-login">Login</button> */}

          <div className="popupCreateGym">
            <div className="closebtnn">
              <div className="close-btn">
                <NavLink to="/GetGyms">&times;</NavLink>
              </div>
            </div>

            <div className="form">
              <h2>Add Your Gym</h2>
              <div className="form-element">
                <label htmlFor="GymName">GymName</label>
                <input
                  type="text"
                  className="GymName"
                  placeholder="Enter your GymName"
                  required
                  value={gymName}
                  onChange={(e) => {
                    setGymName(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label htmlFor="email">Region</label>
                <input
                  type="text"
                  className="Region"
                  placeholder="Beirut"
                  required
                  value={gymRegion}
                  onChange={(e) => {
                    setGymRegion(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="Address"
                  placeholder="beirut, hamra street,rue12"
                  required
                  value={gymAddress}
                  onChange={(e) => {
                    setGymAddress(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label htmlFor="PhoneNumber">Phone number</label>
                <input
                  type="text"
                  className="phoneNumber"
                  placeholder="+961 ********"
                  value={phoneNumber}
                  required
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label htmlFor="classes">Gym classes </label>
                <input
                  type="text"
                  className="classes"
                  placeholder="class1,class2,class3"
                  required
                  value={classes}
                  onChange={(e) => {
                    setCLasses(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label>Upload gym image(s)</label>
                <br />
                <input
                  type="text"
                  className="classes"
                  placeholder="https://example.jpg"
                  required
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
              <div className="form-element">
                <label>
                  Description <sup id="optional">Optional</sup>
                </label>
                <br />
                <textarea
                  id="mytextarea"
                  style={{ height: "40px" }}
                  cols="10"
                  rows="2"
                  value={gymDescription}
                  onChange={(e) => {
                    setGymDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-element">
                {/* <NavLink to="/GetGyms"> */}
                <button type="submit">Create Gym</button>
                {/* </NavLink> */}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <h3>Set the schedule of your classes </h3>
          <Calendar />
        </div>
      </form>
    </>
  );
};

export default CreateGymPopup;
