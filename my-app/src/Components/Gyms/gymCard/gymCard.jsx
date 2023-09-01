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
    const accessToken = Cookies.get("access_token");
    
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
        `http://localhost:8080/api/gym/deleteGym/${props.id}`,
        config
      );

      if (response.status === 200) {
        alert("Gym deleted successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting Gym");
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    console.log(userID);
    console.log(props.creator);
    if (userID == props.creator) {
      setIsCurrentUserGym(true);
    } else {
      setIsCurrentUserGym(false);
    }
  }, [props.creator]);

  return (
    <div className="column">
      <div className="box">
        <NavLink to={`/getGymDetails/${props.id}`} className="nav-link">
          <img src={props.image} alt="!!!" className="gym1-box-1" />
        </NavLink>
        <div className="textOverlay">
          <p>
            {props.gymName}
            <br />
            Address: {props.region}
            <br />
            Phone number: {props.phoneNumber}
            <br />
          </p>
          {/* </NavLink> */}
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
                    onClick={() => {
                      handleDelete(props.id);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymCard;
