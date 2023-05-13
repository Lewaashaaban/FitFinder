import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./gymCardDetails.css";
import Cookies from "js-cookie";

const GymCardDetails = () => {
  const [gym, setGym] = useState({});
  const { GymID } = useParams();

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
          `http://localhost:8080/api/gym//getGymDetails/${GymID}`,
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
  }, [GymID]);

  return (
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
            <p>Location: {gym.location}</p>
          </div>
        </div>
        <div className="description">
          {gym.description}
        </div>
      </div>
    </div>
  );
};

export default GymCardDetails;
