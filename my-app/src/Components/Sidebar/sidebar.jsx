import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, usertheme } from "@mui/material";
import { Link } from "react-router-dom";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HeaderImg from "../../Images/background deadlift.jpg";

import "./sidebar.css";
import { red } from "@mui/material/colors";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      className="item-menuitem"
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home Page");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${red} !important`,
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px",
        },

        "& .pro-inner-item:hover": {
          color: "#fff !important",
        },

        "& .pro-menu-item.active": {
          color: "rgb(0, 0, 0) important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          zIndex: 999,
          backgroundColor: "var(--main)",
        }}
      >
        <Menu iconShape="square">
          {/* logo and menu icon */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3">ADMINS</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <PeopleOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* user */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  //  src={HeaderImg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  // color
                >
                  lewaa shaaban
                </Typography>
                <Typography variant="h5">vp fancy admin</Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box className="box2" padding={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home Page"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              className="item"
              title="Gym Page"
              to="/Gym"
              icon={<FitnessCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              className="item"
              title="Home Page"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              className="item"
              title="User information"
              to="/"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
