import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./gymCardDetails.css";
import Cookies from "js-cookie";

const GetGymDetails = () => {
  const [gym, setGym] = useState({});
  // const  GymID  = useParams();
  // console.log(GymID);

  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const lastPart = parts[parts.length - 1];
  

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
          
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData();
  }, [lastPart]);

  return (
    <div className="fullPage">
      <div className="PropertyDetails">
        <div className="inner">
          <div className="image">
            <img src={gym.image} alt="" />
          </div>
          <div className="mid-info">
            <div className="titleprice">
              <h1>{gym.gymName}</h1>
              <p className="p-value">Region: {gym.region}</p>
            </div>
            <div>
              <p>Location: {gym.address}</p>
              {/* <br /> */}
              <p>Phone Number: {gym.phoneNumber}</p>
              {/* <br /> */}
              <p>Classes : {gym.gymClasses}</p>
              <p>CreatorI: {gym.creator}</p>
            </div>
          </div>
          <div className="description">{gym.description}</div>
          <div className="ending">
          <div className="button">
            <p>
              Subscribe To the gym through our Website to get 5 PT sessions for
              FREE !!
            </p><br />
            <button className="buttonssss">Subscribe Now</button>
          </div></div>
        </div>
      </div>
    </div>
  );
};

export default GetGymDetails;
