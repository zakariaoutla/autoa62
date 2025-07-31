import { useEffect, useState } from "react";
import { FaUserCircle, FaHome, FaCar, FaCalendarAlt, FaChartBar, FaInfoCircle, FaHeadset, FaPhone } from "react-icons/fa";
import { HiArrowCircleDown } from "react-icons/hi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import LogoBrand from "../LogoBrand";

export default function NavBar() {
    const [activeLink, setActiveLink] = useState("home");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    return (
        <div className="container-fluid heronavbar fixed-top shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light p-3">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="/">
                        <LogoBrand />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto" style={{ marginLeft: "110px" }}>
                            <li className="nav-item custom-li">
                                <NavLink to="/" className={`nav-link ${activeLink === "home" ? "active text-warning fw-bold" : ""}`} onClick={() => setActiveLink("home")}>
                                    <FaHome className="me-1" /> Home
                                </NavLink>
                            </li>
                            <li className="nav-item custom-li">
                                <NavLink to="/cars" className={`nav-link ${activeLink === "cars" ? "active text-warning fw-bold" : ""}`} onClick={() => setActiveLink("cars")}>
                                    <FaCar className="me-1" /> Cars
                                </NavLink>
                            </li>

                            <li className="nav-item custom-li">
                                <NavLink to="/about-us" className={`nav-link ${activeLink === "about" ? "active text-warning fw-bold" : ""}`} onClick={() => setActiveLink("about")}>
                                    <FaInfoCircle className="me-1" /> About
                                </NavLink>
                            </li>
                            <li className="nav-item custom-li">
                                <NavLink to="/support" className={`nav-link ${activeLink === "support" ? "active text-warning fw-bold" : ""}`} onClick={() => setActiveLink("support")}>
                                    <FaHeadset className="me-1" /> Support
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center" style={{ marginRight: "90px" }}>
                            <span className="me-3 p-2" style={{ border: "1px solid black", borderRadius: "7px", fontWeight: "500" }}>
                                <FaPhone className="me-1" /> +212 607-523048
                            </span>
                            <div className="d-flex align-items-center gap-3">
                                {user ? (
                                    <>
                                        <FaUserCircle size={25} />
                                        <NavLink to={user.role === 'admin' ? "/admin" : `/myaccount/${user.id}`} className="text-black fw-bold" style={{ textDecoration: "none" }}>
                                            {user.fullname}
                                        </NavLink>
                                        <button className="btn nav-link" onClick={handleLogout}>
                                            <RiLogoutBoxRLine size={27} color="red" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/log-in" className="btn text-light me-2" style={{ backgroundColor: "#FF9700", fontWeight: "700" }}>Login</NavLink>
                                        <NavLink to="/singup" className="btn btnSingUp">Sign up</NavLink>
                                    </>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
