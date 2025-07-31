import { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import LogoBrand from '../components/LogoBrand';


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const res = await axios.post('http://localhost:8080/auth/register', { fullname, email, password, phone });
            const { token } = res.data;
            if (token) {
                localStorage.setItem('token', token);
                const decoded = jwt_decode(token);
                console.log('Decoded token:', decoded);
                navigate('/log-in');
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Server responded with error.');
            } else if (error.request) {
                setErrorMessage('No response received from server.');
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };




    return (
        <>
            <div className='px-5 pb-4' style={{ backgroundColor: "#F8F9FA", height: "auto" }}>
                <div style={{ width: "10%" }}>
                    <NavLink to='/' >
                        <LogoBrand />
                    </NavLink>
                </div>
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="login-form  py-3 px-4 shadow" style={{ width: '450px' }}>
                        <div className="d-flex justify-content-center">
                            <FaRegUser className="lock" />
                        </div>

                        <h2 className="text-center">Create Account</h2>
                        <p className='text-center fs-6 text-secondary'>Join Auto A62 and start your journey</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 mt-4 position-relative">
                                <label htmlFor="email" className="form-label">Full name</label>
                                <div className="input-wrapper">
                                    <FaRegUser className="input-icon" size={25} />
                                    <input
                                        type="text"

                                        className="form-control"
                                        placeholder="Full name"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 mt-4 position-relative">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-wrapper">
                                    <HiOutlineMail className="input-icon" size={25} />
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 mt-4 position-relative">
                                <label htmlFor="email" className="form-label">Phone number</label>
                                <div className="input-wrapper">
                                    <HiOutlineMail className="input-icon" size={25} />
                                    <input
                                        type="text"

                                        className="form-control"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 mt-2 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <HiOutlineLockClosed className="input-icon" size={25} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="input-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                    </span>
                                </div>
                            </div>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}


                            <div className='d-flex gap-2 align-items-center mt-4'>
                                <input type="checkbox" className='form-check-input' />
                                <p className='text-secondary  m-0 mt-1' style={{ fontSize: "12px" }}>I agree to the <NavLink style={{ color: "#FF9700" }}>Terms </NavLink>of Service and <NavLink style={{ color: "#FF9700" }}>Privacy Policy</NavLink></p>
                            </div>


                            <button type="submit" className="btn-search w-100 text-center mt-4">Create Account</button>
                        </form>

                        <div className="d-flex justify-content-center mt-4 gap-2">
                            <p style={{ color: "#888" }}>Already have an account?  </p>
                            <NavLink to="/log-in" style={{ color: "#FF9700", textDecoration: "none", fontWeight: "700" }}>Sign in here</NavLink>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className='fs-6' style={{ color: "#ABB2B6" }}>© 2025 Auto A62 Pro. All rights reserved. | Registered in Morocco</p>
                </div>
            </div>
        </>
    );
}
