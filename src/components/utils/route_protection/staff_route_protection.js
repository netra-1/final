import { Navigate } from "react-router-dom";

function StaffPrivateRoute({ children }) {
    var isAuth;
  if(localStorage.getItem('token') && localStorage.getItem('category')=="STAFF"){
      isAuth= true
  }
  else{
      isAuth= false
  }
  return isAuth ? children : <Navigate to="/" />;
}

export default StaffPrivateRoute;