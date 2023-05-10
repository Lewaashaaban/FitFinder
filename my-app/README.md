import { useState } from "react";
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import {Box, IconButton , Typography , usertheme} from '@mui/material';

import { Link } from "react-router-dom";

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HeaderImg from '../../Images/background deadlift.jpg';






const SideBar = () =>{

    const [isCollapsed , setIsCollapsed] = useState(false);
    
return(
    <>
   <Sidebar collapsed={isCollapsed}>
    <Menu iconShape='square'>
        {/* logo and menu icon */}

       <MenuItem onClick={()=>setIsCollapsed(!isCollapsed)}
        icon={isCollapsed ? <MenuOutlinedIcon /> :undefined}
        style={{    
            margin: "10px 0 20px 0"  
        }}>

        </MenuItem>

        {!isCollapsed &&(
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            ml="15px">
                <Typography variant="h3" >
                    ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <PeopleOutlinedIcon />
                </IconButton>
            </Box>
     )}
        {/* user */}
            {!isCollapsed &&(
                <Box mb="25px">
                    <Box  display="flex" justifyContent="center" alignItems="center">
                        <img 
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        //  src={HeaderImg}
                        style={{cursor: "pointer",borderRadius:"50%"}}
                        />
                    </Box>

                    <Box textAlign="center">
                        <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{m: "10px 0 0 0"}}
                        // color
                        >
                            lewaa shaaban
                        </Typography>
                        <Typography variant="h5">
                            vp fancy admin
                        </Typography>
                    </Box>
                </Box>

            )};
    </Menu>
   </Sidebar>
    </>
);
};

 export default SideBar;



   return (
    <>
      <nav className="navbar active " style={navbarStyle}>
        <img className="navbar-logo" src={LogoImg} alt="" />
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                SignIn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/SignUp" className="nav-link">
                SignUp
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};