import React, { useState, useEffect } from "react";
import "./gymCards.css";
import axios from "axios";
import GymCard from "../gymCard/gymCard";
import Cookies from "js-cookie";
// import { useState } from "react";

const GymCards = (props) => {
  const [gyms, setGyms] = useState([]);
  const [isCurrentUserGym,setIsCurrentUserGym] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        const userID = localStorage.getItem("userID");
        // console.log(userID);
        // console.log(props.creator);
        // if(userID == props.creator)
        // {
        //   setIsCurrentUserGym(true);
        // }

        if (!accessToken) {
          throw new Error("Authentication token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`, // set the Authorization header with the token
          },
        };
        const response = await axios.get(
          `http://localhost:8080/api/gym/getGyms`,
          config
        );

        if (response.status === 200) {
          // console.log("sorna bel gym cards");
          setGyms(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // return (
  //   <div className="GymCards">
  //     <div>test1</div>
  //     {gyms.map((gym, index) => (
  //       <div className="parentContainer" key={index}>
  //         console.log(gym);
  //         <GymCard
  //           gymName={gym.gymName}
  //           image={gym.image}
  //           region={gym.region}
  //           // address={gym.address}
  //           id={gym._id}
  //           isCurrentUserGym={true}
  //         />
  //         <p>test2</p>
  //       </div>
  //     ))}
  //   </div>
  // );
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
              isCurrentUserGym={true}
            />
          </div>
        ))}
        
    </div>
  );
};

export default GymCards;
