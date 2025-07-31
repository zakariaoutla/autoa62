import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/log-in" replace state={{ from: location }} />;
  }

  try {
    const decoded = jwt_decode(token);
    if (allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      
      return <Navigate to="/" replace />;
    }
  } catch (error) {
   
    return <Navigate to="/log-in" replace />;
  }
}
