import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import HomePage from "../Logged/HomePage";
import RegisterDoctor from "../Logged/RegisterDoctor";
import UnautorizedPage from "../Logged/Unautorized";
import LoginPage from "../UnLogged/LoginPage";



  const Router = () => {



    return(
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/registerdoctor' element={<RegisterDoctor/>}/>
        <Route path='/unatorized' element={<UnautorizedPage/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router;