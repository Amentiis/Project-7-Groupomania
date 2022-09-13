import { Navigate,useLocation } from "react-router-dom";

import Login from "../pages/Login";
const ProtectedLogin = () => {
  const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
  const location = useLocation();
  const userid = window.sessionStorage.getItem('userid');
  const token = window.sessionStorage.getItem('token');


  if(isLoggedIn && userid && token){
    console.log(isLoggedIn)
    return(<Navigate to="/accueil" replace state={{ from: location }} />)
  }else{
    return (<Login />);
  }

};

export default ProtectedLogin;


  // return isLoggedIn? (
  //   <Navigate to="/accueil" replace state={{ from: location }} />
  // ) : (
  //   <Login />
  // );