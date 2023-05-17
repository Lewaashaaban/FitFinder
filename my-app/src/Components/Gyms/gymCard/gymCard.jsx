import React, { useState } from "react";
import "./gymCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { GetGymDetails } from "../../Pages";
import { NavLink } from "react-router-dom";

const GymCard = (props) => {
  const [isCurrentUserGym, setIsCurrentUserGym] = useState(true);
  // console.log(props.id); 
  
  
  // function to delete a selected gym
  const handleDelete = async (e) => {
    e.preventDefault();
const accessToken = Cookies.get("access_token");
  const userID = localStorage.getItem("userID");
  
  console.log(userID);
  console.log(props.creator);
  if (userID == props.creator) {
    setIsCurrentUserGym(true);
  }
    if (!accessToken) {
      throw new Error("Authentication token not found!");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/gym//deleteGym/${props.id}`,
        config
      );
      console.log(props.creator);

      if (response.status === 200) {
        alert("Gym deleted successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting Gym");
    }
  };
  
  // // function to update a selected gym
  // const handleEdit = async (e) => {
  //   e.preventDefault();

  //   const accessToken = Cookies.get("access_token");
  //   const userID = localStorage.getItem("userID");
  //   console.log(userID);
  //   if (!accessToken) {
  //     throw new Error("Authentication token not found!");
  //   }

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };

  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:8080/api/gym/updateGym/${props.id}`,
  //       config
  //     );
  //     console.log(props.creator);

  //     if (userID == props.creator) {
  //       setIsCurrentUserGym(true);
  //     }

  //     if (response.status === 200) {
  //       alert("Gym update successfully");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error updating Gym");
  //   }
  // };

  // useEffect(() => {}, []);

  return (
    <div className="column">
      <NavLink to={`/getGymDetails/${props.id}`} className="nav-link">
        <div className="box">
          <img src={props.image} alt="!!!" className="gym1-box-1" />

          <div className="textOverlay">
            <p>
              {props.gymName}
              <br />
              Address: {props.region}
              <br />
              Phone number: {props.phoneNumber}
              <br />
            </p>

            <div id="delete-btnn">
              {isCurrentUserGym && (
                <>
                  <div>
                    <NavLink to={`/UpdateGym/${props.id}`} className="nav-link">
                      <EditIcon id="edit-btn" sx={{ fontSize: 25 }}></EditIcon>
                    </NavLink>

                    <DeleteIcon
                      sx={{ fontSize: 25 }}
                      id="delete-btn"
                      onClick={() => handleDelete(props.id)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default GymCard;
