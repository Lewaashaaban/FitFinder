// Images imported From Images File
import img from "../../../Images/girl-ties-hair-resized.jpg";
import { NavBar } from "../../../Components"; //import navbar
import "./GetGymsByRegion.css"; //to link the css
import { GymCards } from "../../../Components";
import { GymCardsByRegion } from "../../../Components";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";

const GetGyms = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Gyms");
  // const RegionToPass = selectedRegion;
  // console.log("region to pass", RegionToPass);
  // console.log("selected region", selectedRegion);

  const handleSearch = () => {
    // handleSelectChange();
    // renderSelectedPage();  
    handleScrollClick();
   
    // console.log("region to pass", RegionToPass);
    // console.log("selected region", selectedRegion);
  };

  const handleSelectChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const scrollToRef = useRef(null);

  const handleScrollClick = () => {
    const yOffset = 100; // adjust this value to your liking
    const y =
      scrollToRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const renderSelectedPage = () => {
    switch (selectedRegion) {
      case "All Gyms":
        return <GymCards />;
      case "Beirut":
        return <GymCardsByRegion value="Beirut" />;
      case "Mount Lebanon":
        return <GymCardsByRegion value="Mount Lebanon" />;
      case "North Lebanon":
        return <GymCardsByRegion value="North Lebanon" />;
      case "Baalbek-Hermel":
        return <GymCardsByRegion value="Baalbek-Hermel" />;
      case "the Beqaa":
        return <GymCardsByRegion value="the Beqaa" />;
      default:
        return <GymCards />;
    }
  };

  return (
    <>
      <NavBar />

      {/* intro paragraph */}
      <div className="gymheader">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="Overlay"></div>

        <div className="hearderContent">
          <p>Drop down the region </p>

          <div>
            <select
              name="regions"
              value={selectedRegion}
              onChange={handleSelectChange}
            >
              <option value="All gyms">All Gyms</option>
              <option value="Beirut ">Beirut </option>
              <option value="Mount Lebanon">Mount Lebanon</option>
              <option value="North Lebanon">North Lebanon</option>
              <option value="Baalbek-Hermel">Baalbek-Hermel</option>
              <option value="the Beqaa">the Beqaa</option>
            </select>

            <button onClick={handleSearch}>{<SearchOutlinedIcon />}</button>
          </div>
        </div>
      </div>

      {/* container */}
      <div className="container-gyms">
        <div className="content">
          <h1 ref={scrollToRef}>
            Check Out <span> Gyms</span>
          </h1>
        </div>

        {/* <div className="row">
          <div className="column">
            <div className="box">
              <img src={props.image} alt="!!!" className="gym1-box-1" />
              <div className="textOverlay">
                <p>
                  {props.gymName}
                  <br />
                  address: {props.region}
                  <br />
                  Phone number: {props.phoneNumber}
                </p>
                {isCurrentUserGym && (
              <DeleteIcon
                id="delete-btn"
                onClick={() => handleDelete(props.id)}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <img src={ChampsFitness} alt="" className="gym1-box-2" />
              <div className="textOverlay">
                <p>
                  Champs fiteness Development center
                  <br />
                  address: Emile lahoud highway, Facing alfa, hazmieh
                  <br />
                  Rating: 4.5 stars
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <img src={goodLife} alt="" className="gym1-box-3" />
              <div className="textOverlay">
                <p>
                  Goodlife Fitness
                  <br />
                  address: Aley- Ras Al Jabal
                  <br />
                  Rating: 4.5 stars
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <img src={Magnumgym} alt="" className="gym1-box-4" />
              <div className="textOverlay">
                <p>
                  Magnum Gym
                  <br />
                  address: Aley- Al saray
                  <br />
                  Rating: 3.9 stars
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <img src={goldenlili} alt="" className="gym1-box-5" />
              <div className="textOverlay">
                <p>
                  Golden Lili Resort & Spa
                  <br />
                  address: Antelyas
                  <br />
                  Rating: 3.2 stars
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <img src={GoldGym} alt="" className="gym1-box-6" />
              <div className="textOverlay">
                <p>
                  Gold Gym
                  <br />
                  address: Aley- alzohoor street
                  <br />
                  Rating: 4 stars
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* </div>  */}

        <div className="Properties">
          {renderSelectedPage()}</div>

        <p>{errorMessage}</p>
      </div>

      {/* ending part  */}
      <div className="createGym">
        <div className="createGym-inner">
          <div className="advice">
            <h2>
              Are you a gym owner? <br />
              Let us help you find new members!!{" "}
            </h2>
          </div>
          <div className="add-your-gym">
            <NavLink to="/CreateGymPopup">
              {" "}
              <button>Add your gym!</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetGyms;
