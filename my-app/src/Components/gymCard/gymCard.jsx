import React, { useState } from "react";
import "./gymCard.css";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const GymCard = (props) => {
  const [isCurrentUserGym, setIsCurrentUserGym] = useState(false);

  const handleDelete = async (e) => {
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
      const response = await axios.delete(
        `http://localhost:8080/api/gym/deleteGym/${props.id}`
        ,config
      );
      if (response.status === 200) {
        alert("Gym deleted successfully");
      }
      // if (response.status === 400){
      //   alert("Recheck the GymID frontend");
      // }
    } catch (error) {
      console.log(error);
      alert("Error deleting Gym");
    }
  };

  useEffect(() => {
    setIsCurrentUserGym(props.isCurrentUserGym);
  }, []);

  return (
    <div className="parent">
      <Link
        to={`/`}
        key={props.id}
        className="PropertyCard"
      >
        <img src={props.image} alt="!!!!" />
        <div className="card-content">
          <div className="title-value">
            <span>{props.gymName}</span>
            <span className="value">${props.phoneNumber}</span>
          </div>
          <div className="foot">
            <span>{props.region}</span>
            {isCurrentUserGym && (
              <DeleteIcon
                id="delete-btn"
                onClick={() => handleDelete(props.id)}
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GymCard;