import React from "react";
import { useState, useEffect } from "react";
import "./updateGym.css";
import { NavLink } from "react-router-dom";
import { Calendar } from "../../../Components";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateGym = () => {
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const lastPart = parts[parts.length - 1];

  const [gym, setGym] = useState({});
  // console.log(gym);
  // console.log(gym.gymName,"gym.gymname");

  const [gymName, setGymName] = useState();
  const [gymRegion, setGymRegion] = useState();
  const [classes, setCLasses] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [url, setUrl] = useState();
  const [gymAddress, setGymAddress] = useState();
  const [gymDescription, setGymDescription] = useState();
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState("type");

  const [isCurrentUserGym, setIsCurrentUserGym] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsValid(isValidUrl(event.target.value));
  };

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const clearForm = () => {
    setGymName("");
    setGymAddress("");
    setUrl("");
    setGymRegion("");
    setType("type");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          throw new Error("Authentication token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer: ${accessToken}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/api/gym/getGymDetails/${lastPart}`,
          config
        );

        if (response.status === 200) {
          console.log(response.data);
          setGym(response.data);
          console.log(response.data);
          setGym(response.data);
          setGymName(response.data.gymName);
          setGymRegion(response.data.region);
          setCLasses(response.data.gymClasses);
          setPhoneNumber(response.data.phoneNumber);
          setUrl(response.data.image);
          setGymAddress(response.data.address);
          setGymDescription(response.data.description);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [lastPart]);

  // function to update a selected gym
  const handleEdit = async (e) => {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");
    const userID = localStorage.getItem("userID");

    if (!accessToken) {
      throw new Error("Authentication token not found!");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/gym/updateGym/${lastPart}`,
        {
          gymName: gymName,
          region: gymRegion,
          address: gymAddress,
          phoneNumber: phoneNumber,
          gymClasses: classes,
          image: url,
          description: gymDescription,
        },
        config
      );
      console.log(gym.creator);

      if (userID == gym.creator) {
        setIsCurrentUserGym(true);
      }

      if (response.status === 200) {
        console.log(response.data);
        setGym(response.data);
        alert("Gym updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating Gym");
    }
  };

  return (
    <>
      <form className="UpdateGympage" onSubmit={handleEdit}>
        <div className="left">
          {/* <button className="show-login">Login</button> */}

          <div className="popupCreateGym">
            <div className="closebtnn">
              <div className="close-btn">
                <NavLink to="/GetGyms">&times;</NavLink>
              </div>
            </div>

            <div className="form">
              <h2>Update Your Gym</h2>
              <div className="form-element">
                <label htmlFor="GymName">GymName</label>
                <input
                  type="text"
                  className="GymName"
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
                  required
                  value={classes}
                  onChange={(e) => {
                    setCLasses(e.target.value);
                  }}
                />
              </div>
              <div className="form-element">
                <label>Update gym image(s)</label>
                <br />
                <input
                  type="text"
                  className="classes"
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
                  style={{ height: "60px" }}
                  cols="10"
                  rows="4"
                  value={gymDescription}
                  onChange={(e) => {
                    setGymDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-element">
                {/* <NavLink to="/GetGyms"> */}
                <button type="submit">Update Gym</button>
                {/* </NavLink> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="right">
          <h3>Set the schedule of your classes </h3>
          <Calendar />
        </div> */}
      </form>
    </>
  );
};

export default UpdateGym;
