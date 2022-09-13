import { Navigate,useLocation } from "react-router-dom";

import Register from "../pages/Register";
const ProtectedRegister = () => {
  const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
  const location = useLocation();
  return isLoggedIn ? (
    <Navigate to="/accueil" replace state={{ from: location }} />
  ) : (
    <Register />
  );
};

export default ProtectedRegister;


