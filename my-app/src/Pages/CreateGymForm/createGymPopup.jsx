import React from "react";
import { useState } from "react";
import "./createGymPopup.css";
import { NavLink } from "react-router-dom";
import { Calendar } from "../../Components";
import axios from "axios";

const CreateGymPopup = () => {
  const [gymName, setGymName] = useState("");
  const [gymRegion, setGymRegion] = useState("");
  const [classes, setCLasses] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [url, setUrl] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState("type");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsValid(isValidUrl(event.target.value));
  };

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  const getIsFormValid = () => {
    return (
      gymName &&
      gymAddress &&
      isValid &&
      gymRegion &&
      type !== "type"
    );
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

    // const accessToken = Cookies.get("access_token");
    // const userID = localStorage.getItem('userID');

    // if (!accessToken) {
    //   throw new Error("Authentication token not found!");
    // }

   

    try {
      const response = await axios.post(
        "http://localhost:3000/api/gym/CreateGyms",
        {
          gymName: gymName,
          region: gymRegion,
          address: gymAddress,
          phoneNumber: phoneNumber,
          gymClasses: classes,
          image: url,
          description: "Demo Description",
        },
        
      );
      if (response.status === 200) {
        alert("Property added successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error adding property");
    }
    clearForm();
  };

  return (
    <>
      <div className="CreateGympage">
        <div className="left">
          {/* <button className="show-login">Login</button> */}

          <div className="popupCreateGym">
            <div className="close-btn">
              <NavLink to="/GetGyms">&times;</NavLink>
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
                  placeholder="https://example"
                  required
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
              <div className="form-element">
                <NavLink to="/createGym">
                  <button disabled={!getIsFormValid()}>Create Gym</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <h3>Set the schedule of your classes </h3>
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default CreateGymPopup;

/*
function Form(props) {
  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [propertyLocation, setPropertyLocation] = useState("");
  const [type, setType] = useState("type");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsValid(isValidUrl(event.target.value));
  };

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const getIsFormValid = () => {
    return (
      propertyName &&
      propertyValue &&
      isValid &&
      propertyLocation &&
      type !== "type"
    );
  };

  const clearForm = () => {
    setPropertyName("");
    setPropertyValue("");
    setUrl("");
    setPropertyLocation("");
    setType("type");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");
    const userID = localStorage.getItem('userID');

    if(!accessToken){
      throw new Error("Authentication token not found!");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try{
      const response = await axios.post(
        "http://localhost:8080/api/v1/properties/createProperty",
        {
          title: propertyName,
          description: "Demo Description",
          propertyType: type,
          location: propertyLocation,
          price: propertyValue,
          photo: url,
          creator: userID,
        },
        config
      );
      if(response.status === 200){
        alert("Property added successfully");
      }
    }
    catch(error){
      console.log(error);
      alert("Error adding property")
    }
    clearForm();
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="formHeader">
            <h2>Property Creation Form</h2>
            <button
              className="close-modal"
              onClick={props.toggleModal}
              id="close-button"
            >
              X
            </button>
          </div>
          <div className="Field">
            <label>
              Property name <sup>*</sup>
            </label>
            <input
              value={propertyName}
              onChange={(e) => {
                setPropertyName(e.target.value);
              }}
              placeholder="Property name"
            />
          </div>
          <div className="Field">
            <label>
              Property Value <sup>*</sup>
            </label>
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => {
                setPropertyValue(e.target.value);
              }}
              placeholder="Property value"
            />
          </div>
          <div className="Field">
            <label>
              Property Image <sup>*</sup>
            </label>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="Property Image should be entered as a valid URL"
            />
          </div>
          <div className="Field">
            <label>
              Location <sup>*</sup>
            </label>
            <input
              value={propertyLocation}
              type="text"
              onChange={(e) => {
                setPropertyLocation(e.target.value);
              }}
              placeholder="ex: 1100, brown street, metropolis NY"
            />
          </div>
          <div className="Field">
            <label>
              Type <sup>*</sup>
            </label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="role">Type</option>
              <option value="individual">Renting</option>
              <option value="business">Leasing</option>
              <option value="business">Management</option>
              <option value="business">Concession</option>
              <option value="business">License</option>
              <option value="business">Tenancy</option>
              <option value="business">Sale-Leaseback</option>
              <option value="business">Other</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Add Property
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;*/
