import { FaTachometerAlt, FaCar, FaCalendarAlt, FaUsers, FaCog } from 'react-icons/fa';
import { MdOutlinePayments } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import LogoBrand from "../LogoBrand"
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";



export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/log-in");
    };

    return (
        <div className="admin-sidebar">
            <div>
                <LogoBrand />
            </div>
            <ul className="nav flex-column pt-3">
                <li className="nav-item">
                    <NavLink
                        to="/admin/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link admin-sidebar-link admin-active'
                                : 'nav-link admin-sidebar-link'
                        }
                    >
                        <FaTachometerAlt />
                        <span className="ms-2">Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/vehicles"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link admin-sidebar-link admin-active'
                                : 'nav-link admin-sidebar-link'
                        }
                    >
                        <FaCar />
                        <span className="ms-2">Vehicles</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/rentals"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link admin-sidebar-link admin-active'
                                : 'nav-link admin-sidebar-link'
                        }
                    >
                        <FaCalendarAlt />
                        <span className="ms-2">Rentals</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/customers"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link admin-sidebar-link admin-active'
                                : 'nav-link admin-sidebar-link'
                        }
                    >
                        <FaUsers />
                        <span className="ms-2">Customers</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/payments"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link admin-sidebar-link admin-active'
                                : 'nav-link admin-sidebar-link'
                        }
                    >
                        <MdOutlinePayments />
                        <span className="ms-2">Payments</span>
                    </NavLink>
                </li>


            </ul>
            <div style={{ marginTop: "12rem" }}>
                <button
                    onClick={handleLogout}
                    
                    style={{border:"none", padding:"5px 30px 5px 40px" ,borderRadius:"10px"}}
                >
                        <RiLogoutBoxLine color='red' fontSize={18}/>
                        <span className="ms-2 text-danger fs-6">Logout</span>

                </button>

            </div>

        </div>
    );
}
