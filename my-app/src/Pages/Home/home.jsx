import HeaderImg from "../../Images/background deadlift.jpg";
import aboutUsimg from "../../Images/gym-girl image.jpg";
import { NavBar } from "../../Components";
import { NavLink } from "react-router-dom";
import React, { useRef } from "react";

import "./home.css";

const Home = () => {
  const scrollToRef = useRef(null);
  return (
    <>
      <NavBar />
      {/* intro paragraph */}
      <div className="header">
        <div className="img">
          <img src={HeaderImg} alt="" />
        </div>
        <div className="Overlay"></div>
        <div className="hearderContent">
          <h6>
            {" "}
            <span>R</span>each <span>Y</span>our <span>G</span>oal
          </h6>
          <p>With a click of a button</p>
          {/* <NavLink to="/GetGyms"> */}
            <button
              onClick={() =>
                scrollToRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              About Us
            </button>
          {/* </NavLink> */}
        </div>
      </div>

      {/* About us */}
      <div className="Aboutus_details" >
        <div className="row">
          {/* side image for aboutUS */}
          <div className="col-sm-6" >
            <img src={aboutUsimg} className="image_fluid" alt="" ref={scrollToRef}/>
          </div>

          {/* about us paragraph */}
          <div className="col-sm-6" >
            <h1>Attitude is Everything</h1>

            <h2>
              To Change <br /> Your Attitude Just
              <NavLink to="/login">
                <span> Join</span>
              </NavLink>
            </h2>

            <p>
              A wonderfull fitness website which tracks your location to present
              the best gyms near you, and gives the specifications
              of every gym and every PT outthere!!
            </p>
          </div>
        </div>
      </div>

      {/* 3 boxes at the bottom of homepage */}
      <div className="boxes">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="box">
                <h1>To be number one</h1>
                <p>
                  “ you have to train like you're number two.” - Maurice Green
                </p>
              </div>
            </div>
            <div className="col-sm-4 mid">
              <div className="box">
                <h1>It never gets easier,</h1>
                <p>you just get stronger.</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box">
                <h1>Strive for progress</h1>
                <p>not perfection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

