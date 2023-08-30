import React, { useState, useEffect } from "react";
import "./GymCardsByRegion.css";
import axios from "axios";
import GymCard from "../gymCard/gymCard";
import Cookies from "js-cookie";

const GymCardsByRegion = (props) => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        const userID = localStorage.getItem("userID");

        if (!accessToken) {
          throw new Error("Authentication token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`, // set the Authorization header with the token
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/gym/getGymsByRegion/${props.value}`,
          config
        );

        if (response.status === 200) {
          setGyms(response.data);
          console.log(props.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="GymCards">
      {Array.isArray(gyms) &&
        gyms.map((gym, index) => (
          <div className="parentContainer" key={index}>
            <GymCard  
              gymName={gym.gymName}
              image={gym.image}
              region={gym.region}
              phoneNumber={gym.phoneNumber}
              creator={gym.creator}
              // address={gym.address}
              id={gym._id}
              isCurrentUserGym={false}
            />
          </div>
        ))}
        
    </div>
  );
};

export default GymCardsByRegion;
