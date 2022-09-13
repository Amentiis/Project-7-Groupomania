import React from 'react';
import Home from "../pages/Home"
import { Navigate,useLocation } from "react-router-dom";
const Protected_home = () => {
  
  const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
  const userid = window.sessionStorage.getItem('userid');
  const token = window.sessionStorage.getItem('token');
  const location = useLocation();

  if(isLoggedIn && userid && token){
    return(<Home />)
  }else{
    return (<Navigate to="/login" replace state={{ from: location }} />);
  }
};

export default Protected_home;