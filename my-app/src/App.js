import React from "react";
import "./App.css";
import { SideBar,LogOut,CheckOut ,MySnackbar} from "./Components";
import {
  Home,
  LogInPage,
  GetGyms,
  SignUp,
  CreateGymPopup,
  CreateGym,
  GetGymDetails,
  UpdateGym
} from "./Pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

const App = () => {
  return (
    <ProSidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/GetGyms" element={<GetGyms />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/CreateGymPopup" element={<CreateGymPopup />}></Route>
          <Route path="/logout" element={<LogOut />} onLogout />
          <Route path="/CheckOut" element={<CheckOut />} onLogout />
          <Route path={`/getGymDetails/:id`} element={<GetGymDetails/>}/>
          <Route path={`/UpdateGym/:id`} element={<UpdateGym/>}></Route>
          {/* <Route path="/MySnackbar" element={<MySnackbar />} onLogout /> */}


          {/* <Route path="/CreateGym" element={<CreateGym />}></Route> */}
        </Routes>
      </Router>
    </ProSidebarProvider>
  );
};

export default App;
