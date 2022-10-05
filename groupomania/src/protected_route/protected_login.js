import { Navigate,useLocation } from "react-router-dom";

import Login from "../pages/Login";
const ProtectedLogin = () => {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  const location = useLocation();
  const userid = window.localStorage.getItem('userid');
  const token = window.localStorage.getItem('token');


  if(isLoggedIn && userid && token){
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