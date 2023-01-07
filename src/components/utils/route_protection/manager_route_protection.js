import { Navigate } from "react-router-dom";

function ManagerPrivateRoute({ children }) {
    var isAuth;
  if(localStorage.getItem('token') && localStorage.getItem('category')=="MANAGER"){
      isAuth= true
  }
  else{
      isAuth= false
  }
  return isAuth ? children : <Navigate to="/staff_dashboard" />;
}

export default ManagerPrivateRoute;