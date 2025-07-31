import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import LogoBrand from '../LogoBrand';

export default function Footer() {
    return (
        <footer className="text-white pt-5 py-2 ">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-4">
                        <div className="footer-logo">
                           <LogoBrand/>
                        </div>
                        <p className="footer-description fs-6" style={{ color: "#ABB2B6" }}>
                            Moroccan premier car rental platform, offering luxury vehicles
                            and exceptional service across 50+ cities. Experience automotive
                            excellence with every journey.
                        </p>
                    </div>


                    <div className="col-md-2 mb-4">
                        <h5>Services</h5>
                        <ul className="list-unstyled mb-4" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Premium Fleet</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Business Rentals</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Long-term Leasing</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Chauffeur Service</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Airport Pickup</NavLink></li>
                        </ul>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h5>Legal</h5>
                        <ul className="list-unstyled" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Terms of Service</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Privacy Policy</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Cookie Policy</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>GDPR Compliance</NavLink></li>
                            <li><NavLink style={{ color: "#ABB2B6" }}>Insurance Info</NavLink></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <div className="info-box d-flex align-items-center w-100 gap-3">
                            <div className='p-3' style={{ backgroundColor: "#425262", borderRadius: "10px" }}>
                                <FaPhoneAlt size={30} />
                            </div>

                            <ul className='navbar-nav'>
                                <li>24/7 Support</li>
                                <li style={{ color: "#ABB2B6" }}>+212 607-523048</li>
                                <li style={{ color: "#ABB2B6" }}>Available in 12 languages</li>
                            </ul>
                        </div>
                        <div className="info-box d-flex align-items-center w-100 gap-3">
                            <div className='p-3' style={{ backgroundColor: "#425262", borderRadius: "10px" }}>
                                <FaEnvelope size={30} />
                            </div>
                            <ul className='navbar-nav'>
                                <li>Email Support</li>
                                <li style={{ color: "#ABB2B6" }}>support@autoa62.ma</li>
                                <li style={{ color: "#ABB2B6" }}>Response within 2 hours</li>
                            </ul>
                        </div>
                        <div className="info-box d-flex align-items-center w-100 gap-3">
                            <div className='p-3' style={{ backgroundColor: "#425262", borderRadius: "10px" }}>
                                <FaMapMarkerAlt size={30} />
                            </div>
                            <ul className='navbar-nav'>
                                <li>Headquarters</li>
                                <li style={{ color: "#ABB2B6" }}>Hay tichibit rue 46 N15</li>
                                <li style={{ color: "#ABB2B6" }}>22000 Azilal, Morocco</li>
                            </ul>
                        </div>

                        <div className="social-links mt-5">
                            <NavLink className="social-icon"><FaFacebookF /></NavLink>
                            <NavLink className="social-icon"><FaTwitter /></NavLink>
                            <NavLink className="social-icon"><FaInstagram /></NavLink>
                            <NavLink className="social-icon"><FaLinkedinIn /></NavLink>
                        </div>
                    </div>

                </div>



            </div>

            <div className="col text-center mt-5">
                <hr />
                <p style={{ color: "#ABB2B6" }}>© 2025 Auto A62 Pro. All rights reserved. | Registered in Morocco</p>
            </div>

        </footer >
    );
};
