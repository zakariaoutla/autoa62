import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoBrand from '../components/LogoBrand'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const res = await axios.post('http://localhost:8080/auth/login', { email, password });
            const { token, user } = res.data;

            if (token && user) {
                const decoded = jwt_decode(token);

                const fullUser = {
                    ...user,
                    role: decoded.role
                };

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(fullUser));

                const allowedFrom = location.state?.from === '/book' ? '/book' : null;

                if (decoded.role === 'admin') {
                    navigate('/admin');
                } else if (allowedFrom) {
                    navigate('/book');
                } else {
                    navigate('/');
                }
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };



    return (
        <>
            <div className='px-5 pb-4' style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
                <div className='container'>
                    <div style={{ width: "10%" }}>
                    <NavLink to='/' >
                        <LogoBrand />
                    </NavLink>
                    </div>
                    

                    <div className="d-flex justify-content-center align-items-center">

                        <div className="login-form p-5 shadow" style={{ width: '450px' }}>
                            <div className="d-flex justify-content-center">
                                <HiOutlineLockClosed className="lock" />
                            </div>
                            <h2 className="text-center">Welcome Back</h2>
                            <p className='text-center fs-6 text-secondary'>Sign in to your account to continue</p>

                            <form onSubmit={handleSubmit}>
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

                                <div className='d-flex justify-content-between mt-3'>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="checkbox" className='form-check-input' />
                                        <p className='text-secondary m-0'>Remember me</p>
                                    </div>
                                    <NavLink to="/forgot-password" style={{ textDecoration: "none", color: "#FF9700" }}>Forgot password?</NavLink>
                                </div>

                                <button type="submit" className="btn-search w-100 text-center mt-4">Sign In</button>
                            </form>

                            <div className="d-flex justify-content-center mt-4 gap-2">
                                <p style={{ color: "#888" }}>Don't have an account? </p>
                                <NavLink to="/singup" style={{ color: "#FF9700", textDecoration: "none", fontWeight: "700" }}>Sign up here</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p className='fs-6' style={{ color: "#ABB2B6" }}>© 2025 Auto A62 Pro. All rights reserved. | Registered in Morocco</p>
                    </div>
                </div>

            </div>
        </>
    );
}
