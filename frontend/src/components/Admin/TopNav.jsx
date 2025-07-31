import { FaBars, FaUserCircle } from 'react-icons/fa';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

export default function TopNav({ toggleSidebar }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <div className="border-bottom border-secondary fixed-top px-3 p-3" style={{ zIndex: 1040, backgroundColor: "#242832" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center h-100">


        <div>
          <button className="btn text-light d-md-none" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <div className="d-flex align-items-center gap-3">
          <FaUserCircle size={24} className="text-light" />
          <div className="text-start">
               <small className='text-light'>{user?.fullname || "User"}</small>
          
          </div>

        </div>


      </div>
    </div>
  );
}
