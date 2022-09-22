import React from 'react';
import Home from "../pages/Home"
import { Navigate,useLocation } from "react-router-dom";
const Protected_home = () => {
  
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  const userid = window.localStorage.getItem('userid');
  const token = window.localStorage.getItem('token');
  const location = useLocation();

  if(isLoggedIn && userid && token){
    return(<Home />)
  }else{
    return (<Navigate to="/login" replace state={{ from: location }} />);
  }
};

export default Protected_home;