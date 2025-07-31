import { useState } from 'react';
import {
    FaPhoneAlt, FaRegCommentDots, FaClock, FaLanguage, FaBolt,
    FaRegCalendarAlt, FaExclamationTriangle,
    FaMapMarkerAlt, FaCreditCard, FaCar, FaQuestionCircle,
    FaLocationArrow,
    FaEnvelope
} from 'react-icons/fa';
import { MdOutlineContactSupport } from "react-icons/md";

export default function ContactUs() {
    const [expanded, setExpanded] = useState(null);

    const questions = [
        {
            question: 'How can I change my reservation?',
            answer: 'You can modify your reservation directly from your customer area or by contacting our customer service.',
        },
        {
            question: 'Can I cancel my reservation for free?',
            answer: 'Cancellation is free within 24 hours of booking. After that, fees may apply.',
        },
        {
            question: 'What if the reserved vehicle is not available?',
            answer: 'If the reserved vehicle is not available, we will offer you a similar vehicle or a full refund.',
        },
    ];

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const link = `https://www.google.com/maps?q=${lat},${lon}`;
                    window.open(link, "_blank");
                },
                (error) => {
                    alert("Could not get location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <>
            <div className=" py-5 bg-light" style={{marginTop:"5rem", paddingBottom:"3rem", minHeight: "100vh"}}>
                <div className='container'>
                    <div className="text-center my-5">
                        <div className="d-flex justify-content-center mb-4">
                            <div className="help-icon shadow-lg">
                                <MdOutlineContactSupport className="fs-1 text-light" />
                            </div>
                        </div>
                        <h2 className="text-centre fw-bold mb-3">Support Center <span className="text-orange">Auto A62</span></h2>
                        <p className="text-muted mb-4 fs-5">
                            We’re here to support you at every step of your journey. <br />
                            Find instant answers, contact our experts, <br /> or access our 24/7 emergency assistance.
                        </p>
                        <div className="cta-buttons d-flex justify-content-center gap-3">
                            <button className="btn btn-chat">
                                <FaRegCommentDots className="me-2" /> support@autoa62.ma
                            </button>
                            <button className="btn btn-call">
                                <FaPhoneAlt className="me-2" />+212 607-523048
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaClock size={50} color="green" />
                                    <h5 className="mt-3">Support 24/7</h5>
                                    <p>Emergency assistance available at any time</p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaLanguage size={50} color="blue" />
                                    <h5 className="mt-3">Multilingual Support</h5>
                                    <p>French, English, German, Spanish</p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaBolt size={50} color="orange" />
                                    <h5 className="mt-3">Quick Response</h5>
                                    <p>Average response time &lt; 2 minutes</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        <div className='text-center'>
                            <h2 className="mb-4 fs-2" style={{ fontWeight: "700", color: "#2c3e50" }}>Quick Actions</h2>
                            <p className="mb-5 text-muted">Select your need to directly access the right resources</p>
                        </div>


                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaRegCalendarAlt size={40} color="orange" />
                                    <h5 className="mt-3">Modify my Reservation</h5>
                                    <p>Change your dates, vehicle or options</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaExclamationTriangle size={40} color="red" />
                                    <h5 className="mt-3">Emergency Assistance</h5>
                                    <p>Breakdown, accident or urgent problem</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaMapMarkerAlt size={40} color="blue" />
                                    <h5 className="mt-3">Recovery Information</h5>
                                    <p>Addresses, opening hours and procedures</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaCreditCard size={40} color="orange" />
                                    <h5 className="mt-3">Payment Problem</h5>
                                    <p>Billing, Refunds and Cards</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaCar size={40} color="gray" />
                                    <h5 className="mt-3">Vehicle Problem</h5>
                                    <p>Features, Damage or Return</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card card-suport text-center p-4 d-flex flex-column justify-content-center align-items-center">
                                    <FaQuestionCircle size={40} color="green" />
                                    <h5 className="mt-3">Insurance Questions</h5>
                                    <p>Coverage, claims and protections</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row p-4 mt-5 d-flex align-items-start" style={{ border: "2px solid #939393ff", borderRadius: "10px" }}>
                        <div className='col-md-1'>
                            <FaExclamationTriangle size={40} className='text-danger' />
                        </div>
                        <div className='col-md-11'>
                            <h5 className='text-danger fs-5'>24/7 Emergency</h5>
                            <p className='text-muted'>In case of emergency (accident, breakdown, theft), contact our assistance line immediately.</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-danger">
                                    <FaPhoneAlt className="me-2" /> Emergency: +212 607-523048
                                </button>
                                <button onClick={handleLocation} className="btn btn-outline-danger">
                                    <FaLocationArrow className="me-2" /> Share my location
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 text-center" style={{ marginRight: "180px", marginLeft: "180px" }}>
                        <h2 className='fs-2' style={{ fontWeight: "700", color: "#2c3e50" }}>Frequently Asked Questions</h2>
                        <p className='text-muted'>Quickly find answers to your most common questions</p>

                        <div className='mt-5'>
                            {questions.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div
                                        className="d-flex text-light justify-content-between align-items-center"
                                        style={{ cursor: 'pointer', backgroundColor: '#ff9900', padding: '20px', borderRadius: '10px' }}
                                        onClick={() => handleToggle(index)}
                                    >
                                        <h5>{item.question}</h5>
                                        <span>{expanded === index ? '-' : '+'}</span>
                                    </div>
                                    {expanded === index && (
                                        <div className="text-light" style={{ backgroundColor: '#ffa826ef', padding: '20px', borderRadius: "10px" }} >
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 py-5">
                        <div className='text-center'>
                            <h2 className='fs-2' style={{ fontWeight: "700", color: "#2c3e50" }}>Contact Us</h2>
                            <p className='text-muted'>Quickly find answers to your most common questions</p>
                        </div>

                        <div className="row mt-5">
                            {/* Left Column - Contact Form with Icon */}
                            <div className="col-md-6">
                                <div className="card p-4">
                                    <h4>Contact us</h4>
                                    <p>We would be happy to answer your questions!</p>

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Your name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Your email" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
                                        </div>
                                        <button type="submit" className="btn-search">Send</button>
                                    </form>

                                    {/* Contact Icons */}
                                    <div className="mt-4">
                                        <p><FaPhoneAlt color='#FF9700' /> Phone: +212 607-523048</p>
                                        <p><FaEnvelope color='#FF9700'/> Email: support@autoa62.ma</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Car Map */}
                            <div className="col-md-6">
                                <div className="card p-4">
                                    <h4>Location of our vehicles</h4>
                                    <p>See our vehicles available near you.</p>

                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2362.3869300865026!2d-6.580545483487881!3d31.95067562408276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda49a8b15b82733%3A0x233c01288788e8d8!2sAzilal!5e1!3m2!1sen!2sma!4v1753849349336!5m2!1sen!2sma" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    <div style={{ backgroundColor: '#e9ecef' }}>

                                        <FaMapMarkerAlt size={50} color="#FF9700" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                
                                        
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>





                </div>
            </div>

        </>
    )
}